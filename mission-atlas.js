"use strict";

(() => {
  const dialog = document.getElementById("landing-location-view");
  if (!dialog) return;

  const canvas = dialog.querySelector("canvas");
  const mapStage = dialog.querySelector("[data-atlas-map-stage]");
  const markerLayer = dialog.querySelector("[data-atlas-marker-layer]");
  const selection = dialog.querySelector("[data-atlas-selection]");
  const selectionName = dialog.querySelector("[data-atlas-selection-name]");
  const selectionDetails = dialog.querySelector("[data-atlas-selection-details]");
  const visualizationNote = dialog.querySelector("[data-atlas-visualization-note]");
  const worldLabel = dialog.querySelector("[data-atlas-world-label]");
  const yearLabel = dialog.querySelector("[data-atlas-year-label]");
  const eventCount = dialog.querySelector("[data-atlas-event-count]");
  const yearSlider = dialog.querySelector("[data-atlas-year-slider]");
  const timelineRail = dialog.querySelector("[data-atlas-timeline-rail]");
  const yearEvents = dialog.querySelector("[data-atlas-year-events]");
  const closeButton = dialog.querySelector("[data-location-close]");
  const resetButton = dialog.querySelector("[data-atlas-reset-view]");
  const exhibitButton = dialog.querySelector("[data-atlas-exhibit-link]");
  const previousYear = dialog.querySelector("[data-atlas-year-previous]");
  const nextYear = dialog.querySelector("[data-atlas-year-next]");
  const records = window.MUSEUM_MISSION_ATLAS_DATA?.missions || [];
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    depth: true,
    powerPreference: "high-performance"
  });
  const fallback = gl ? null : canvas.getContext("2d");
  let useTexture = false;
  let textureUrl = null;
  let textureRequest = 0;
  let program = null;
  let lineProgram = null;
  let sphereBuffer = null;
  let sphereIndexBuffer = null;
  let surfaceTexture = null;
  let rotationX = 0;
  let rotationY = 0;
  let initialRotationX = 0;
  let initialRotationY = 0;
  let selectedYear = 0;
  let selectedMission = null;
  let selectedEvent = null;
  let returnFocus = null;
  let pointerStart = null;
  let frameRequest = 0;
  let isOpen = false;

  const vertexShaderSource = `
    attribute vec3 aPosition;
    attribute vec2 aUv;
    uniform vec2 uRotation;
    uniform float uAspect;
    uniform float uScale;
    varying vec3 vNormal;
    varying vec2 vUv;
    void main() {
      float cy = cos(uRotation.y);
      float sy = sin(uRotation.y);
      float cx = cos(uRotation.x);
      float sx = sin(uRotation.x);
      vec3 p;
      p.x = aPosition.x * cy + aPosition.z * sy;
      float rz = -aPosition.x * sy + aPosition.z * cy;
      p.y = aPosition.y * cx - rz * sx;
      p.z = aPosition.y * sx + rz * cx;
      vNormal = normalize(p);
      vUv = aUv;
      gl_Position = vec4(p.x * uAspect * uScale, p.y * uScale, -p.z * 0.5, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    uniform sampler2D uMap;
    uniform bool uUseTexture;
    uniform bool uLine;
    uniform int uProfile;
    uniform float uLighting;
    uniform float uContrast;
    uniform vec4 uLineColor;
    varying vec3 vNormal;
    varying vec2 vUv;

    float hash3(vec3 p) {
      p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    float noise3(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(mix(hash3(i), hash3(i + vec3(1.0, 0.0, 0.0)), f.x),
            mix(hash3(i + vec3(0.0, 1.0, 0.0)), hash3(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
        mix(mix(hash3(i + vec3(0.0, 0.0, 1.0)), hash3(i + vec3(1.0, 0.0, 1.0)), f.x),
            mix(hash3(i + vec3(0.0, 1.0, 1.0)), hash3(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
        f.z
      );
    }

    void main() {
      if (uLine) {
        gl_FragColor = uLineColor;
        return;
      }

      vec3 n = normalize(vNormal);
      vec3 base;
      float terrain = noise3(n * 18.0) * 0.58 + noise3(n * 47.0) * 0.28 + noise3(n * 103.0) * 0.14;
      vec2 cell = floor(vUv * vec2(88.0, 44.0));
      vec2 local = fract(vUv * vec2(88.0, 44.0));
      float seed = hash3(vec3(cell, float(uProfile) + 2.0));
      vec2 craterCenter = vec2(0.2 + 0.6 * hash3(vec3(cell, 3.1)), 0.2 + 0.6 * hash3(vec3(cell, 7.7)));
      float craterDistance = length(local - craterCenter);
      float craterRadius = mix(0.14, 0.36, seed);
      float bowl = 1.0 - smoothstep(craterRadius * 0.3, craterRadius, craterDistance);
      float rim = 1.0 - smoothstep(0.0, 0.055, abs(craterDistance - craterRadius));
      float relief = clamp(terrain * 0.58 + bowl * 0.2 + rim * 0.15, 0.0, 1.0);

      if (uProfile == 0) {
        float moon = uUseTexture ? texture2D(uMap, vUv).r : relief;
        moon = clamp((moon - 0.5) * uContrast + 0.5, 0.0, 1.0);
        base = mix(vec3(0.17, 0.18, 0.19), vec3(0.79, 0.80, 0.81), moon * 0.72 + relief * 0.28);
      } else if (uProfile == 1) {
        float dust = noise3(n * 12.0) * 0.5 + noise3(n * 36.0) * 0.5;
        base = mix(vec3(0.22, 0.075, 0.035), vec3(0.82, 0.38, 0.18), dust * 0.62 + relief * 0.28);
        base *= 0.82 + terrain * 0.35;
      } else if (uProfile == 2 || uProfile == 3) {
        float bands = sin((vUv.y * 64.0 + noise3(n * 8.0) * 3.0) * 6.28318) * 0.5 + 0.5;
        vec3 darkBand = uProfile == 2 ? vec3(0.32, 0.17, 0.10) : vec3(0.39, 0.31, 0.20);
        vec3 lightBand = uProfile == 2 ? vec3(0.84, 0.62, 0.40) : vec3(0.86, 0.74, 0.54);
        base = mix(darkBand, lightBand, bands * 0.64 + terrain * 0.22);
      } else if (uProfile == 5) {
        base = mix(vec3(0.72, 0.16, 0.025), vec3(1.0, 0.73, 0.24), terrain);
      } else if (uProfile == 6) {
        base = mix(vec3(0.24, 0.10, 0.05), vec3(0.82, 0.48, 0.21), terrain * 0.72 + relief * 0.2);
      } else {
        base = mix(vec3(0.16, 0.15, 0.14), vec3(0.69, 0.62, 0.51), relief);
      }

      float latPosition = fract(vUv.y * 12.0);
      float lonPosition = fract(vUv.x * 24.0);
      float latLines = 1.0 - smoothstep(0.0, 0.025, min(latPosition, 1.0 - latPosition));
      float lonLines = 1.0 - smoothstep(0.0, 0.025, min(lonPosition, 1.0 - lonPosition));
      float grid = max(latLines, lonLines) * 0.19;
      float diffuse = max(0.0, dot(n, normalize(vec3(-0.45, 0.35, 0.84))));
      float light = uProfile == 5 ? 1.18 : mix(0.2, 1.0, diffuse) * uLighting;
      vec3 color = base * light;
      color = mix(color, vec3(0.72, 0.91, 0.96), grid);
      float limb = pow(1.0 - max(0.0, dot(n, vec3(0.0, 0.0, 1.0))), 2.4);
      if (uProfile == 1 || uProfile == 6) color += vec3(0.46, 0.18, 0.07) * limb * 0.24;
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  function getAtlasSettings() {
    const style = getComputedStyle(dialog);
    const read = (name, fallbackValue) => {
      const value = Number.parseFloat(style.getPropertyValue(name));
      return Number.isFinite(value) ? value : fallbackValue;
    };
    return {
      rotationSpeed: read("--atlas-rotation-speed", 1),
      lighting: read("--atlas-lighting-intensity", 1),
      contrast: read("--atlas-texture-contrast", 1),
      orbitLineWidth: read("--atlas-orbit-line-width", 2),
      orbitMarkerSize: read("--atlas-orbit-marker-size", 8)
    };
  }

  function compileShader(type, sourceCode) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, sourceCode);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Mission Atlas shader compilation failed: ${message}`);
    }
    return shader;
  }

  function createProgram(vertexSource, fragmentSource) {
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, compileShader(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(shaderProgram, compileShader(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      throw new Error(`Mission Atlas shader link failed: ${gl.getProgramInfoLog(shaderProgram)}`);
    }
    return shaderProgram;
  }

  function createSphereMesh() {
    const latitudeSteps = 64;
    const longitudeSteps = 112;
    const vertices = [];
    const indices = [];
    for (let latitude = 0; latitude <= latitudeSteps; latitude += 1) {
      const v = latitude / latitudeSteps;
      const phi = Math.PI * v;
      for (let longitude = 0; longitude <= longitudeSteps; longitude += 1) {
        const u = longitude / longitudeSteps;
        const theta = 2 * Math.PI * u;
        vertices.push(
          Math.sin(phi) * Math.sin(theta),
          Math.cos(phi),
          Math.sin(phi) * Math.cos(theta),
          (u + 0.5) % 1,
          v
        );
      }
    }
    for (let latitude = 0; latitude < latitudeSteps; latitude += 1) {
      for (let longitude = 0; longitude < longitudeSteps; longitude += 1) {
        const a = latitude * (longitudeSteps + 1) + longitude;
        const b = a + longitudeSteps + 1;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
    sphereBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    sphereIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    return indices.length;
  }

  let sphereIndexCount = 0;
  if (gl) {
    try {
      program = createProgram(vertexShaderSource, fragmentShaderSource);
      lineProgram = createProgram(vertexShaderSource, fragmentShaderSource);
      sphereIndexCount = createSphereMesh();
      gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      surfaceTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, surfaceTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([128, 128, 128, 255]));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    } catch (error) {
      console.error("Mission Atlas WebGL initialization failed.", error);
      program = null;
      lineProgram = null;
    }
  }

  function normalizeName(value) {
    return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  function findMission(value) {
    const name = normalizeName(value?.mission || value?.name || value?.title);
    return records.find(record => {
      const normalized = normalizeName(record.name);
      return name && (name === normalized || name.includes(normalized) || normalized.includes(name));
    }) || records[0] || null;
  }

  function getEvents(record) {
    return (record?.events || []).filter(event => Number.isFinite(getEventYear(event)));
  }

  function getEventYear(event) {
    const date = typeof event === "string" ? event : event?.date;
    return Number(String(date || "").slice(0, 4));
  }

  function allEvents() {
    return records.flatMap(record => getEvents(record).map(event => ({ record, event })));
  }

  function dateValue(date) {
    const normalized = String(date || "");
    if (/^\d{4}$/.test(normalized)) return Date.UTC(Number(normalized), 0, 1);
    if (/^\d{4}-\d{2}$/.test(normalized)) return Date.UTC(Number(normalized.slice(0, 4)), Number(normalized.slice(5, 7)) - 1, 1);
    const timestamp = Date.parse(`${normalized}T00:00:00Z`);
    return Number.isFinite(timestamp) ? timestamp : 0;
  }

  function formatDate(date) {
    const match = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(String(date || ""));
    if (!match) return String(date || "");
    if (!match[2]) return match[1];
    if (!match[3]) {
      return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1))
        .toLocaleDateString("en", { month: "short", year: "numeric", timeZone: "UTC" });
    }
    return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])))
      .toLocaleDateString("en", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  }

  function eventType(event) {
    return String(event?.type || "event").replaceAll("-", " ").toUpperCase();
  }

  function eventForMission(record) {
    return getEvents(record).find(item => item.surfaceEvent)
      || getEvents(record).find(item => ["landing", "impact", "orbit", "flyby"].includes(item.type))
      || getEvents(record)[0]
      || null;
  }

  function getCoordinates(record) {
    const coordinates = record?.coordinates;
    if (!coordinates || !Number.isFinite(coordinates.latitude) || !Number.isFinite(coordinates.longitude)) return null;
    return coordinates;
  }

  function getProfile(body) {
    const normalized = normalizeName(body);
    if (normalized.includes("moon")) return 0;
    if (normalized.includes("mars")) return 1;
    if (normalized.includes("jupiter")) return 2;
    if (normalized.includes("saturn")) return 3;
    if (normalized.includes("sun") || normalized.includes("solar")) return 5;
    if (normalized.includes("titan")) return 6;
    return 4;
  }

  function bindSurfaceTexture(url) {
    if (url === textureUrl) return;
    textureUrl = url || null;
    const request = ++textureRequest;
    if (!gl || !url) {
      useTexture = false;
      return;
    }
    const image = new Image();
    image.addEventListener("load", () => {
      if (request !== textureRequest || !gl || !surfaceTexture) return;
      gl.bindTexture(gl.TEXTURE_2D, surfaceTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      useTexture = true;
      drawScene();
    }, { once: true });
    image.addEventListener("error", () => {
      if (request !== textureRequest) return;
      console.error(`Mission Atlas map texture could not be loaded: ${url}`);
      useTexture = false;
      drawScene();
    }, { once: true });
    image.src = url;
  }

  function setUniforms(shaderProgram, profile, lineMode, lineColor) {
    gl.useProgram(shaderProgram);
    const positionLocation = gl.getAttribLocation(shaderProgram, "aPosition");
    const uvLocation = gl.getAttribLocation(shaderProgram, "aUv");
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 20, 0);
    gl.enableVertexAttribArray(uvLocation);
    gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 20, 12);
    gl.uniform2f(gl.getUniformLocation(shaderProgram, "uRotation"), rotationX, rotationY);
    gl.uniform1f(gl.getUniformLocation(shaderProgram, "uAspect"), canvas.height / canvas.width);
    gl.uniform1f(gl.getUniformLocation(shaderProgram, "uScale"), 0.88);
    gl.uniform1i(gl.getUniformLocation(shaderProgram, "uProfile"), profile);
    gl.uniform1i(gl.getUniformLocation(shaderProgram, "uUseTexture"), Boolean(useTexture && profile === 0));
    gl.uniform1i(gl.getUniformLocation(shaderProgram, "uLine"), lineMode);
    gl.uniform1f(gl.getUniformLocation(shaderProgram, "uLighting"), getAtlasSettings().lighting);
    gl.uniform1f(gl.getUniformLocation(shaderProgram, "uContrast"), getAtlasSettings().contrast);
    gl.uniform4fv(gl.getUniformLocation(shaderProgram, "uLineColor"), lineColor);
    gl.uniform1i(gl.getUniformLocation(shaderProgram, "uMap"), 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, surfaceTexture);
  }

  function rotatePoint(point) {
    const cy = Math.cos(rotationY);
    const sy = Math.sin(rotationY);
    const cx = Math.cos(rotationX);
    const sx = Math.sin(rotationX);
    const x = point[0] * cy + point[2] * sy;
    const z1 = -point[0] * sy + point[2] * cy;
    const y = point[1] * cx - z1 * sx;
    const z = point[1] * sx + z1 * cx;
    return [x, y, z];
  }

  function drawLine(points, profile, color, dashed) {
    if (!gl || points.length < 2) return;
    const vertices = [];
    points.forEach(point => vertices.push(point[0], point[1], point[2], 0, 0));
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    setUniforms(lineProgram, profile, true, color);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const positionLocation = gl.getAttribLocation(lineProgram, "aPosition");
    const uvLocation = gl.getAttribLocation(lineProgram, "aUv");
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 20, 0);
    gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 20, 12);
    gl.lineWidth(getAtlasSettings().orbitLineWidth);
    gl.drawArrays(dashed ? gl.LINES : gl.LINE_STRIP, 0, points.length);
    gl.deleteBuffer(buffer);
  }

  function makeOrbitPath() {
    const points = [];
    for (let step = 0; step <= 240; step += 1) {
      const angle = step / 240 * Math.PI * 2;
      points.push([1.28 * Math.cos(angle), 0.22 * Math.sin(angle), 0.91 * Math.sin(angle)]);
    }
    return points;
  }

  function makeFlybyPath(impact) {
    const points = [];
    for (let step = 0; step <= 100; step += 1) {
      const t = step / 100;
      const oneMinus = 1 - t;
      const endX = impact ? 0.18 : 1.4;
      const endY = impact ? -0.02 : 0.48;
      const endZ = impact ? 0.97 : 0.2;
      const x = oneMinus ** 3 * -1.55 + 3 * oneMinus ** 2 * t * -0.3 + 3 * oneMinus * t ** 2 * 0.25 + t ** 3 * endX;
      const y = oneMinus ** 3 * 0.5 + 3 * oneMinus ** 2 * t * 1.25 + 3 * oneMinus * t ** 2 * -1.05 + t ** 3 * endY;
      const z = oneMinus ** 3 * -0.1 + 3 * oneMinus ** 2 * t * 0.75 + 3 * oneMinus * t ** 2 * 0.75 + t ** 3 * endZ;
      points.push([x, y, z]);
    }
    return points;
  }

  function makeSolarPath() {
    const points = [];
    for (let step = 0; step <= 240; step += 1) {
      const angle = step / 240 * Math.PI * 2;
      points.push([1.3 * Math.cos(angle), 0.22 * Math.sin(angle), 0.82 * Math.sin(angle)]);
    }
    return points;
  }

  function renderBody(mission, event) {
    if (!gl || !program || !lineProgram) {
      drawFallback(mission);
      return;
    }
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(rect.width * pixelRatio));
    const height = Math.max(1, Math.round(rect.height * pixelRatio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereIndexBuffer);

    const bodyProfile = getProfile(event?.body || mission?.body);
    setUniforms(program, bodyProfile, false, [0, 0, 0, 1]);
    gl.drawElements(gl.TRIANGLES, sphereIndexCount, gl.UNSIGNED_SHORT, 0);

    const matchingPhases = records.filter(record => record.orbitalPhases?.some(phase => {
      if (normalizeName(phase.body || record.body) !== normalizeName(event?.body || mission?.body)) return false;
      const selectedDate = event?.date || `${selectedYear}-12-31`;
      return dateValue(selectedDate) >= dateValue(phase.startDate) && dateValue(selectedDate) <= dateValue(phase.endDate);
    }));
    matchingPhases.forEach(record => {
      const points = record.trajectory?.kind === "heliocentric" ? makeSolarPath() : makeOrbitPath();
      drawLine(points, bodyProfile, [0.34, 0.86, 1.0, 0.88], false);
      const phase = record.orbitalPhases.find(item =>
        normalizeName(item.body || record.body) === normalizeName(event?.body || mission?.body)
        && dateValue(event?.date || `${selectedYear}-12-31`) >= dateValue(item.startDate)
        && dateValue(event?.date || `${selectedYear}-12-31`) <= dateValue(item.endDate)
      );
      const fraction = Math.max(0, Math.min(1, (selectedYear - getEventYear(phase.startDate)) / Math.max(1, getEventYear(phase.endDate) - getEventYear(phase.startDate))));
      const pointIndex = Math.floor(fraction * (points.length - 1));
      const markerScale = 1 + getAtlasSettings().orbitMarkerSize / 100;
      drawLine([points[pointIndex], [points[pointIndex][0] * markerScale, points[pointIndex][1] * markerScale, points[pointIndex][2] * markerScale]], bodyProfile, [1.0, 0.83, 0.34, 1], false);
    });

    records.forEach(record => {
      const selectedDate = event?.date || `${selectedYear}-12-31`;
      const path = record.trajectories?.find(item =>
        normalizeName(record.body) === normalizeName(event?.body || mission?.body)
        && dateValue(selectedDate) >= dateValue(item.startDate)
        && dateValue(selectedDate) <= dateValue(item.endDate)
      );
      if (!path) return;
      if (path.kind === "heliocentric") {
        drawLine(makeSolarPath(), bodyProfile, [0.34, 0.86, 1.0, 0.88], false);
        return;
      }
      drawLine(makeFlybyPath(path.kind === "impact"), bodyProfile, [1.0, 0.58, 0.28, 0.9], false);
    });

    const hasSaturnRings = bodyProfile === 3;
    if (hasSaturnRings) {
      const rings = [];
      for (let step = 0; step <= 360; step += 1) {
        const angle = step / 360 * Math.PI * 2;
        rings.push([1.14 * Math.cos(angle), 0, 1.14 * Math.sin(angle)]);
      }
      drawLine(rings, bodyProfile, [0.86, 0.73, 0.52, 0.68], false);
      const outerRings = rings.map(point => [point[0] * 1.18, point[1], point[2] * 1.18]);
      drawLine(outerRings, bodyProfile, [0.75, 0.62, 0.44, 0.56], false);
    }
  }

  function drawFallback(mission) {
    if (!fallback) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * ratio));
    canvas.height = Math.max(1, Math.round(rect.height * ratio));
    fallback.setTransform(ratio, 0, 0, ratio, 0, 0);
    fallback.clearRect(0, 0, rect.width, rect.height);
    const radius = Math.min(rect.width, rect.height) * 0.43;
    const gradient = fallback.createRadialGradient(rect.width * 0.38, rect.height * 0.34, radius * 0.1, rect.width * 0.5, rect.height * 0.5, radius);
    gradient.addColorStop(0, mission?.color?.length ? `rgb(${mission.color.join(",")})` : "#8a8580");
    gradient.addColorStop(0.85, "#3a3b3d");
    gradient.addColorStop(1, "#101216");
    fallback.beginPath();
    fallback.arc(rect.width / 2, rect.height / 2, radius, 0, Math.PI * 2);
    fallback.fillStyle = gradient;
    fallback.fill();
    fallback.save();
    fallback.beginPath();
    fallback.arc(rect.width / 2, rect.height / 2, radius, 0, Math.PI * 2);
    fallback.clip();
    fallback.strokeStyle = "rgba(230,240,245,.26)";
    fallback.lineWidth = 1;
    for (let latitude = -60; latitude <= 60; latitude += 30) {
      const points = [];
      for (let longitude = -180; longitude <= 180; longitude += 4) {
        const lat = latitude * Math.PI / 180;
        const lon = longitude * Math.PI / 180;
        const rotated = rotatePoint([Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)]);
        if (rotated[2] <= 0) continue;
        points.push([
          rect.width / 2 + rotated[0] * radius,
          rect.height / 2 - rotated[1] * radius
        ]);
      }
      fallback.beginPath();
      points.forEach((point, index) => {
        if (index) fallback.lineTo(point[0], point[1]);
        else fallback.moveTo(point[0], point[1]);
      });
      fallback.stroke();
    }
    fallback.restore();
    fallback.strokeStyle = "rgba(240,245,247,.16)";
    fallback.lineWidth = 1;
    fallback.beginPath();
    fallback.arc(rect.width / 2, rect.height / 2, radius, 0, Math.PI * 2);
    fallback.stroke();
  }

  function drawScene() {
    if (!selectedMission) return;
    const selectedEventForBody = selectedEvent || eventForMission(selectedMission);
    renderBody(selectedMission, selectedEventForBody);
    renderMapMarkers();
  }

  function formatCoordinate(value, positive, negative) {
    const absolute = Math.abs(value);
    return `${absolute.toFixed(5)}° ${value < 0 ? negative : positive}`;
  }

  function pointForCoordinates(latitude, longitude, rect) {
    const lat = latitude * Math.PI / 180;
    const lon = longitude * Math.PI / 180;
    const point = [Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)];
    const rotated = rotatePoint(point);
    if (rotated[2] <= 0) return null;
    const radius = Math.min(rect.width, rect.height) * 0.44;
    return {
      x: rect.width / 2 + rotated[0] * radius,
      y: rect.height / 2 - rotated[1] * radius,
      depth: rotated[2]
    };
  }

  function getActiveSurfaceSites() {
    const sites = [];
    records.forEach(record => {
      const coordinates = getCoordinates(record);
      if (!coordinates || normalizeName(record.body) !== normalizeName(selectedEvent?.body || selectedMission?.body)) return;
      const surfaceEvents = getEvents(record)
        .filter(event => event.surfaceEvent && getEventYear(event) <= selectedYear)
        .sort((left, right) => dateValue(right.date) - dateValue(left.date));
      if (!surfaceEvents.length) return;
      sites.push({ record, event: surfaceEvents[0], coordinates });
    });
    return sites;
  }

  function focusCoordinates(latitude, longitude) {
    const lat = latitude * Math.PI / 180;
    const lon = longitude * Math.PI / 180;
    const point = [Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)];
    rotationY = -Math.atan2(point[0], point[2]);
    rotationX = Math.atan2(point[1], Math.sqrt(point[0] ** 2 + point[2] ** 2));
    drawScene();
  }

  function selectEvent(record, event) {
    selectedMission = record;
    selectedEvent = event;
    selectedYear = getEventYear(event);
    yearSlider.value = String(selectedYear);
    updateSelectedOverlay();
    updateTimeline();
    const coordinates = getCoordinates(record);
    if (event.surfaceEvent && coordinates) {
      focusCoordinates(coordinates.latitude, coordinates.longitude);
    } else {
      drawScene();
    }
  }

  function renderMapMarkers() {
    markerLayer.replaceChildren();
    const rect = mapStage.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const sites = getActiveSurfaceSites()
      .map(site => ({ ...site, position: pointForCoordinates(site.coordinates.latitude, site.coordinates.longitude, canvasRect) }))
      .filter(site => site.position);

    sites.sort((left, right) => left.position.x - right.position.x || left.position.y - right.position.y);
    const labelRows = [];
    sites.forEach(site => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "atlas-map-marker";
      button.dataset.eventType = site.coordinates.type || site.event.type || "landing";
      button.setAttribute("aria-label", `${site.record.name}, ${site.coordinates.type || "surface event"}, ${site.coordinates.latitudeLabel || formatCoordinate(site.coordinates.latitude, "N", "S")}, ${site.coordinates.longitudeLabel || formatCoordinate(site.coordinates.longitude, "E", "W")}`);
      if (site.record.id === selectedMission?.id) button.setAttribute("aria-current", "location");
      const dot = document.createElement("span");
      dot.className = "atlas-marker-dot";
      const label = document.createElement("span");
      label.className = "atlas-marker-label";
      const name = document.createElement("strong");
      name.textContent = site.record.name;
      const coords = document.createElement("small");
      const latitudeLabel = site.coordinates.latitudeLabel || formatCoordinate(site.coordinates.latitude, "N", "S");
      const longitudeLabel = site.coordinates.longitudeLabel || formatCoordinate(site.coordinates.longitude, "E", "W");
      coords.textContent = `${String(site.coordinates.type || site.event.type).toUpperCase()} · ${latitudeLabel}, ${longitudeLabel}`;
      label.append(name, coords);
      button.append(dot, label);
      button.style.left = `${canvasRect.left - rect.left + site.position.x}px`;
      button.style.top = `${canvasRect.top - rect.top + site.position.y}px`;

      let row = 0;
      while (labelRows.some(item => item.row === row && Math.abs(item.x - site.position.x) < 190)) row += 1;
      labelRows.push({ x: site.position.x, row });
      label.style.setProperty("--atlas-label-row", String(row));
      button.addEventListener("click", () => selectEvent(site.record, site.event));
      markerLayer.append(button);
    });
  }

  function updateSelectedOverlay() {
    if (!selectedMission) {
      selection.hidden = true;
      return;
    }
    const coordinates = getCoordinates(selectedMission);
    const coordinateText = selectedEvent?.surfaceEvent && coordinates
      ? `${coordinates.latitudeLabel || formatCoordinate(coordinates.latitude, "N", "S")} · ${coordinates.longitudeLabel || formatCoordinate(coordinates.longitude, "E", "W")}`
      : selectedEvent?.surfaceEvent
        ? "Surface event · exact coordinates unverified"
        : selectedEvent?.body || selectedMission.body;
    selectionName.textContent = selectedMission.name;
    selectionDetails.textContent = `${selectedEvent ? eventType(selectedEvent) : "MISSION"} · ${coordinateText}`;
    selection.hidden = false;
    exhibitButton.disabled = !Number.isInteger(selectedMission.exhibitStageIndex);
  }

  function updateVisualizationNote() {
    const bodyProfile = getProfile(selectedEvent?.body || selectedMission?.body);
    const phases = selectedMission?.orbitalPhases || [];
    const path = selectedMission?.trajectories || [];
    let note = "";
    if (!gl) note = "WEBGL UNAVAILABLE · SIMPLIFIED SPHERE";
    else if (bodyProfile === 1 && !selectedMission?.texture) note = "PROCEDURAL MARS SURFACE · ILLUSTRATIVE, NOT A GEOGRAPHIC IMAGE";
    else if (bodyProfile === 0 && selectedMission?.textureSource) note = "LRO WAC GLOBAL MAP";
    else if (selectedMission?.textureNote) note = "ILLUSTRATIVE BODY SURFACE";
    if (phases.length || path.length) {
      const active = phases.some(phase =>
        dateValue(selectedEvent?.date || `${selectedYear}-12-31`) >= dateValue(phase.startDate)
        && dateValue(selectedEvent?.date || `${selectedYear}-12-31`) <= dateValue(phase.endDate)
      ) || path.some(item => getEventYear({ date: item.startDate }) <= selectedYear && getEventYear({ date: item.endDate }) >= selectedYear);
      if (active) note = "SCHEMATIC TRAJECTORY · NOT TO SCALE OR A RECONSTRUCTION";
    }
    visualizationNote.textContent = note;
    visualizationNote.hidden = !note;
  }

  function updateTimeline() {
    const events = allEvents();
    const years = events.map(item => getEventYear(item.event));
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    yearSlider.min = String(minYear);
    yearSlider.max = String(maxYear);
    yearSlider.value = String(selectedYear);
    yearLabel.textContent = String(selectedYear);

    timelineRail.replaceChildren();
    const rowsByYear = new Map();
    events.forEach(({ record, event }) => {
      const year = getEventYear(event);
      const marker = document.createElement("button");
      marker.type = "button";
      marker.className = `atlas-timeline-marker atlas-event-${event.type || "event"}`;
      marker.style.left = `${maxYear === minYear ? 50 : ((year - minYear) / (maxYear - minYear)) * 100}%`;
      const row = rowsByYear.get(year) || 0;
      rowsByYear.set(year, row + 1);
      marker.style.setProperty("--atlas-marker-row", String(row % 3));
      marker.setAttribute("aria-label", `${record.name}: ${event.title}, ${formatDate(event.date)}`);
      marker.title = `${record.name} · ${event.title} · ${formatDate(event.date)}`;
      if (year === selectedYear) marker.setAttribute("aria-current", "date");
      marker.addEventListener("click", () => selectEvent(record, event));
      timelineRail.append(marker);
    });

    const currentYearEvents = events.filter(item => getEventYear(item.event) === selectedYear);
    eventCount.textContent = `${currentYearEvents.length} EVENT${currentYearEvents.length === 1 ? "" : "S"}`;
    yearEvents.replaceChildren();
    currentYearEvents.forEach(({ record, event }) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "atlas-event-chip";
      chip.dataset.eventType = event.type || "event";
      if (selectedMission?.id === record.id && selectedEvent === event) chip.setAttribute("aria-current", "true");
      chip.setAttribute("aria-label", `${record.name}: ${event.title}, ${formatDate(event.date)}`);
      const missionName = document.createElement("strong");
      missionName.textContent = record.name;
      const titleText = document.createElement("span");
      titleText.textContent = `${formatDate(event.date)} · ${event.title}`;
      chip.append(missionName, titleText);
      chip.addEventListener("click", () => selectEvent(record, event));
      yearEvents.append(chip);
    });
    updateVisualizationNote();
  }

  function setLocation(value) {
    selectedMission = findMission(value);
    if (!selectedMission) return;
    selectedEvent = eventForMission(selectedMission);
    selectedYear = getEventYear(selectedEvent) || getEventYear(getEvents(selectedMission)[0]);
    const minYear = Math.min(...allEvents().map(item => getEventYear(item.event)));
    if (!Number.isFinite(selectedYear)) selectedYear = minYear;
    const world = window.MUSEUM_MISSION_ATLAS_DATA?.world || "Mission";
    worldLabel.textContent = `${world.toUpperCase()} ATLAS`;
    rotationX = 0;
    rotationY = 0;
    initialRotationX = 0;
    initialRotationY = 0;
    const coordinate = selectedEvent?.surfaceEvent ? getCoordinates(selectedMission) : null;
    if (coordinate) {
      const lat = coordinate.latitude * Math.PI / 180;
      const lon = coordinate.longitude * Math.PI / 180;
      rotationY = -Math.atan2(Math.cos(lat) * Math.sin(lon), Math.cos(lat) * Math.cos(lon));
      rotationX = Math.atan2(Math.sin(lat), Math.sqrt((Math.cos(lat) * Math.sin(lon)) ** 2 + (Math.cos(lat) * Math.cos(lon)) ** 2));
    }
    initialRotationX = rotationX;
    initialRotationY = rotationY;
    updateSelectedOverlay();
    updateTimeline();
    const textureUrl = selectedMission.body === "Moon" ? selectedMission.texture : null;
    bindSurfaceTexture(textureUrl);
    drawScene();
  }

  function openExhibit() {
    if (!Number.isInteger(selectedMission?.exhibitStageIndex)) return;
    const mission = selectedMission;
    closeButton.click();
    window.setTimeout(() => {
      const indexButton = document.getElementById("story-mission-index-button");
      const index = document.getElementById("story-mission-index");
      if (!indexButton || !index) return;
      if (index.hidden) indexButton.click();
      window.setTimeout(() => {
        const entry = index.querySelector(`[data-story-stage-index="${mission.exhibitStageIndex}"], [data-chapter-index="${mission.exhibitStageIndex}"]`);
        entry?.click();
      }, 0);
    }, 0);
  }

  document.getElementById("landing-location-button")?.addEventListener("click", event => {
    returnFocus = event.currentTarget;
    dialog.hidden = false;
    dialog.setAttribute("aria-hidden", "false");
    isOpen = true;
    closeButton.focus();
    drawScene();
  });
  closeButton.addEventListener("click", () => {
    dialog.hidden = true;
    dialog.setAttribute("aria-hidden", "true");
    isOpen = false;
    returnFocus?.focus();
  });
  resetButton.addEventListener("click", () => {
    rotationX = initialRotationX;
    rotationY = initialRotationY;
    drawScene();
  });
  exhibitButton.addEventListener("click", openExhibit);
  yearSlider.addEventListener("input", () => {
    selectedYear = Number(yearSlider.value);
    const matchingEvents = allEvents().filter(item => getEventYear(item.event) === selectedYear);
    if (matchingEvents.length && !matchingEvents.some(item => item.record.id === selectedMission?.id && item.event === selectedEvent)) {
      selectedMission = matchingEvents[0].record;
      selectedEvent = matchingEvents[0].event;
      bindSurfaceTexture(selectedMission.body === "Moon" ? selectedMission.texture : null);
      updateSelectedOverlay();
    }
    updateTimeline();
    drawScene();
  });
  previousYear.addEventListener("click", () => {
    yearSlider.value = String(Math.max(Number(yearSlider.min), Number(yearSlider.value) - 1));
    yearSlider.dispatchEvent(new Event("input", { bubbles: true }));
  });
  nextYear.addEventListener("click", () => {
    yearSlider.value = String(Math.min(Number(yearSlider.max), Number(yearSlider.value) + 1));
    yearSlider.dispatchEvent(new Event("input", { bubbles: true }));
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !dialog.hidden) closeButton.click();
  });
  canvas.addEventListener("pointerdown", event => {
    pointerStart = { x: event.clientX, y: event.clientY, rotationX, rotationY };
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointermove", event => {
    if (!pointerStart) return;
    const speed = getAtlasSettings().rotationSpeed;
    const scale = 2 * Math.PI / Math.max(1, Math.min(canvas.clientWidth, canvas.clientHeight));
    rotationY = pointerStart.rotationY + (event.clientX - pointerStart.x) * scale * speed;
    rotationX = Math.max(-Math.PI / 2, Math.min(
      Math.PI / 2,
      pointerStart.rotationX + (event.clientY - pointerStart.y) * scale * speed
    ));
    drawScene();
  });
  canvas.addEventListener("pointerup", () => { pointerStart = null; });
  canvas.addEventListener("pointercancel", () => { pointerStart = null; });
  window.addEventListener("resize", () => {
    if (frameRequest) cancelAnimationFrame(frameRequest);
    frameRequest = requestAnimationFrame(() => {
      frameRequest = 0;
      if (isOpen) drawScene();
    });
  });

  window.museumLocationView = {
    ...window.museumLocationView,
    setLocation,
    setImageSource: window.museumLocationView?.setImageSource
  };
})();
