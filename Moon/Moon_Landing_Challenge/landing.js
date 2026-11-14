"use strict";

(() => {
  if (window.__moonLandingChallengeInitialized) return;
  window.__moonLandingChallengeInitialized = true;

  const missions = [
    {
      id: "apollo-11",
      name: "Apollo 11",
      craft: "Eagle Lunar Module",
      location: "Sea of Tranquility",
      terrain: "mare",
      objective: "Guide Eagle down gently into the Sea of Tranquility.",
      clues: [
        "I travelled to Earth's closest natural neighbour.",
        "My historic landing happened in July 1969.",
        "My mission carried the first humans to successfully land on the Moon.",
        "My lunar module was named Eagle."
      ],
      fact: "Eagle touched down in the Sea of Tranquility on July 20, 1969."
    },
    {
      id: "apollo-12",
      name: "Apollo 12",
      craft: "Intrepid Lunar Module",
      location: "Oceanus Procellarum",
      terrain: "rolling",
      objective: "Guide Intrepid to its landing zone near Surveyor 3.",
      clues: [
        "I was the second crewed mission to successfully land on the Moon.",
        "My astronauts landed near an earlier robotic lunar spacecraft.",
        "My crew visited that spacecraft and brought some of its components back to Earth.",
        "My lunar module was named Intrepid."
      ],
      fact: "Apollo 12 landed near Surveyor 3, allowing its crew to visit and bring selected parts of the lander back to Earth."
    },
    {
      id: "apollo-15",
      name: "Apollo 15",
      craft: "Falcon Lunar Module",
      location: "Hadley–Apennine region",
      terrain: "highlands",
      objective: "Guide Falcon down in the Hadley–Apennine region.",
      clues: [
        "My astronauts explored the Moon in 1971.",
        "My mission introduced the first Lunar Roving Vehicle used by astronauts on the Moon.",
        "I explored the Hadley–Apennine region.",
        "My lunar module was named Falcon."
      ],
      fact: "Apollo 15's Lunar Module Falcon landed at Hadley–Apennine in 1971; the crew used a Lunar Roving Vehicle to explore farther from the landing site."
    },
    {
      id: "surveyor-3",
      name: "Surveyor 3",
      craft: "Surveyor robotic lander",
      location: "Oceanus Procellarum",
      terrain: "cratered",
      objective: "Guide the uncrewed Surveyor lander to a gentle robotic touchdown.",
      clues: [
        "I travelled to the Moon without carrying astronauts.",
        "I made a robotic soft landing in April 1967.",
        "Astronauts from a later Apollo mission visited me.",
        "I carried a television camera and equipment to investigate lunar soil."
      ],
      fact: "Surveyor 3 was an uncrewed lander. Apollo 12 later landed nearby, and its astronauts examined the Surveyor spacecraft."
    }
  ];

  const byId = id => document.getElementById(id);
  const identificationStage = byId("identification-stage");
  const landingStage = byId("landing-stage");
  const choicesElement = byId("mission-choices");
  const clueList = byId("clue-list");
  const feedback = byId("guess-feedback");
  const missionReveal = byId("mission-reveal");
  const revealedMissionName = byId("revealed-mission-name");
  const revealedSpacecraft = byId("revealed-spacecraft");
  const beginLandingButton = byId("begin-landing");
  const canvas = byId("flight-canvas");
  const context = canvas.getContext("2d");
  const resultOverlay = byId("landing-result");
  const controlButtons = [...document.querySelectorAll("[data-control]")];
  const input = { left: false, right: false, increase: false, decrease: false };
  let missionDeck = [];
  let lastMissionId = null;
  let previousChoiceOrder = "";
  const state = {
    mission: null,
    x: .5,
    y: .2,
    vx: 0,
    vy: .02,
    throttle: .28,
    fuel: 100,
    phase: "identification",
    lastFrame: 0,
    lastHudUpdate: 0,
    frameId: 0,
    width: 0,
    height: 0,
    pixelRatio: 1,
    stars: [],
    craters: [],
    ridges: []
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function shuffle(items) {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    return shuffled;
  }

  function selectNextMission() {
    if (!missionDeck.length) {
      missionDeck = shuffle(missions);
      if (missionDeck.length > 1 && missionDeck[0].id === lastMissionId) {
        [missionDeck[0], missionDeck[1]] = [missionDeck[1], missionDeck[0]];
      }
    }
    const mission = missionDeck.shift();
    lastMissionId = mission.id;
    return mission;
  }

  function setFeedback(message, kind = "") {
    feedback.textContent = message;
    feedback.classList.toggle("is-correct", kind === "correct");
    feedback.classList.toggle("is-incorrect", kind === "incorrect");
  }

  function showClues() {
    const fragment = document.createDocumentFragment();
    state.mission.clues.forEach((clue, index) => {
      const item = document.createElement("li");
      item.className = "clue-item";
      const label = document.createElement("span");
      label.className = "clue-label";
      label.textContent = `CLUE ${index + 1}`;
      const text = document.createElement("p");
      text.textContent = clue;
      item.append(label, text);
      fragment.appendChild(item);
    });
    clueList.replaceChildren(fragment);
  }

  function startMission(mission) {
    state.mission = mission;
    state.phase = "flight";
    identificationStage.hidden = true;
    landingStage.hidden = false;
    byId("landing-title").textContent = mission.name;
    byId("landing-objective").textContent = mission.objective;
    byId("landing-craft").textContent = `${mission.craft} · ${mission.location}`;
    resizeCanvas();
    resetFlight();
    canvas.focus({ preventScroll: true });
  }

  function chooseMission(event) {
    const button = event.target.closest("[data-mission-id]");
    if (!button || state.phase !== "identification") return;
    const mission = missions.find(item => item.id === button.dataset.missionId);
    if (!mission) return;
    choicesElement.querySelectorAll(".is-wrong").forEach(choice => choice.classList.remove("is-wrong"));

    if (mission.id === state.mission.id) {
      state.phase = "identified";
      setFeedback("Excellent work, Lunar Explorer!", "correct");
      choicesElement.querySelectorAll("button").forEach(choice => {
        choice.disabled = true;
        if (choice.dataset.missionId === mission.id) choice.classList.add("is-right");
      });
      revealedMissionName.textContent = mission.name;
      revealedSpacecraft.textContent = `${mission.craft} · ${mission.location}`;
      missionReveal.hidden = false;
      return;
    }

    button.classList.add("is-wrong");
    setFeedback("Good try, Little Explorer! Look carefully at the clues and try again.", "incorrect");
  }

  function beginLanding() {
    if (state.phase !== "identified" || !state.mission) return;
    missionReveal.hidden = true;
    startMission(state.mission);
  }

  function buildMissionChoices() {
    const fragment = document.createDocumentFragment();
    const choices = shuffle(missions);
    let order = choices.map(mission => mission.id).join("|");
    if (order === previousChoiceOrder) {
      [choices[0], choices[1]] = [choices[1], choices[0]];
      order = choices.map(mission => mission.id).join("|");
    }
    previousChoiceOrder = order;
    choices.forEach(mission => {
      const button = document.createElement("button");
      button.className = "mission-choice";
      button.type = "button";
      button.dataset.missionId = mission.id;
      button.textContent = mission.name;
      fragment.appendChild(button);
    });
    choicesElement.replaceChildren(fragment);
  }

  function resetFlightState() {
    if (state.frameId) window.cancelAnimationFrame(state.frameId);
    state.frameId = 0;
    Object.keys(input).forEach(key => {
      input[key] = false;
    });
    controlButtons.forEach(button => button.classList.remove("is-pressed"));
    state.mission = null;
    state.phase = "identification";
    state.x = .5;
    state.y = .17;
    state.vx = 0;
    state.vy = .015;
    state.throttle = .28;
    state.fuel = 100;
    state.lastFrame = 0;
    state.lastHudUpdate = 0;
    resultOverlay.hidden = true;
    byId("result-icon").textContent = "";
    byId("result-title").textContent = "";
    byId("result-message").textContent = "";
    byId("result-fact").textContent = "";
    byId("result-fact").hidden = true;
    byId("landing-title").textContent = "";
    byId("landing-objective").textContent = "";
    byId("landing-craft").textContent = "";
    byId("flight-status").textContent = "Guide your spacecraft toward the glowing landing zone.";
    updateHud(performance.now());
  }

  function beginEvaluation() {
    resetFlightState();
    state.mission = selectNextMission();
    identificationStage.hidden = false;
    landingStage.hidden = true;
    missionReveal.hidden = true;
    revealedMissionName.textContent = "";
    revealedSpacecraft.textContent = "";
    beginLandingButton.disabled = false;
    setFeedback("");
    buildMissionChoices();
    showClues();
    choicesElement.querySelector("button")?.focus({ preventScroll: true });
  }

  function resetFlight() {
    if (!state.mission || state.phase === "success") return;
    const targetX = .5;
    const offset = state.width < 500 ? .1 : .12;
    state.x = targetX + (Math.random() < .5 ? -offset : offset);
    state.y = .17;
    state.vx = 0;
    state.vy = .015;
    state.throttle = .28;
    state.fuel = 100;
    state.phase = "flight";
    state.lastFrame = 0;
    resultOverlay.hidden = true;
    byId("flight-status").textContent = "Use short control presses to line up and slow your descent.";
    updateHud(performance.now());
    startAnimationLoop();
  }

  function updateHud(now) {
    const altitude = clamp((.86 - state.y) / (.86 - .17), 0, 1);
    const speed = Math.abs(state.vy);
    byId("altitude-hud").textContent = `Altitude: ${Math.round(altitude * 100)}%`;
    byId("speed-hud").textContent = `Descent: ${speed < .12 ? "gentle" : speed < .24 ? "steady" : "fast"}`;
    byId("drift-hud").textContent = `Drift: ${Math.abs(state.vx) < .035 ? "steady" : state.vx < 0 ? "left" : "right"}`;
    byId("alignment-hud").textContent = `Aim: ${Math.abs(state.x - .5) < .04 ? "centered" : state.x < .5 ? "steer right" : "steer left"}`;
    byId("thrust-hud").textContent = `Thrust: ${Math.round(state.throttle * 100)}%`;
    byId("fuel-hud").textContent = `${Math.ceil(state.fuel)}%`;
    byId("fuel-bar").style.width = `${state.fuel}%`;
    state.lastHudUpdate = now;
  }

  function resizeCanvas() {
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const previousWidth = state.width;
    const previousHeight = state.height;
    state.width = bounds.width;
    state.height = bounds.height;
    state.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(state.width * state.pixelRatio);
    canvas.height = Math.round(state.height * state.pixelRatio);
    context.setTransform(state.pixelRatio, 0, 0, state.pixelRatio, 0, 0);

    if (previousWidth && previousHeight) {
      state.vx *= previousWidth / state.width;
      state.vy *= previousHeight / state.height;
    }

    state.stars = Array.from({ length: Math.max(35, Math.floor(state.width / 8)) }, () => ({
      x: Math.random() * state.width,
      y: Math.random() * state.height * .67,
      radius: .5 + Math.random() * 1.3,
      alpha: .35 + Math.random() * .55
    }));
    const craterCount = Math.max(
      state.mission?.terrain === "cratered" ? 11 : 6,
      Math.floor(state.width / (state.mission?.terrain === "cratered" ? 48 : 78))
    );
    state.craters = Array.from({ length: craterCount }, (_, index) => ({
      x: (index + .5) * state.width / craterCount,
      radiusX: 12 + Math.random() * 20,
      radiusY: 3 + Math.random() * 7
    }));
    const ridgeScale = state.mission?.terrain === "highlands"
      ? .21
      : state.mission?.terrain === "rolling" ? .13 : .07;
    state.ridges = Array.from({ length: 8 }, (_, index) => ({
      x: index * state.width / 7,
      height: 5 + Math.random() * state.height * ridgeScale
    }));
    drawScene();
  }

  function drawEarth() {
    const x = state.width * .82;
    const y = state.height * .17;
    const radius = Math.max(13, Math.min(28, state.width * .035));
    const gradient = context.createRadialGradient(x - radius * .35, y - radius * .4, 1, x, y, radius);
    gradient.addColorStop(0, "#d4f4ff");
    gradient.addColorStop(.38, "#3c9bce");
    gradient.addColorStop(1, "#12365f");
    context.save();
    context.shadowColor = "rgba(102, 205, 255, .5)";
    context.shadowBlur = 18;
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
    context.restore();
    context.fillStyle = "rgba(236, 250, 255, .75)";
    context.font = "11px sans-serif";
    context.textAlign = "center";
    context.fillText("Earth", x, y + radius + 15);
  }

  function surfaceY() {
    return state.height * .84;
  }

  function getTerrain() {
    switch (state.mission?.terrain) {
      case "mare": return "#343b43";
      case "rolling": return "#252f3a";
      case "highlands": return "#182431";
      case "cratered": return "#252b32";
      default: return "#303740";
    }
  }

  function drawTerrain() {
    const horizon = surfaceY();
    const gradient = context.createLinearGradient(0, horizon - 30, 0, state.height);
    gradient.addColorStop(0, "#67717c");
    gradient.addColorStop(.16, getTerrain());
    gradient.addColorStop(1, "#101820");
    context.beginPath();
    context.moveTo(0, horizon);
    state.ridges.forEach((ridge, index) => {
      const nextX = state.ridges[index + 1]?.x ?? state.width;
      context.quadraticCurveTo(ridge.x + (nextX - ridge.x) * .5, horizon - ridge.height, nextX, horizon);
    });
    context.lineTo(state.width, state.height);
    context.lineTo(0, state.height);
    context.closePath();
    context.fillStyle = gradient;
    context.fill();

    state.craters.forEach(crater => {
      const x = crater.x;
      const y = horizon + 16 + crater.radiusY;
      context.fillStyle = "rgba(6, 12, 19, .45)";
      context.strokeStyle = "rgba(213, 227, 238, .28)";
      context.lineWidth = 1.4;
      context.beginPath();
      context.ellipse(x, y, crater.radiusX, crater.radiusY, 0, 0, Math.PI * 2);
      context.fill();
      context.stroke();
    });
  }

  function drawTarget() {
    const x = state.width * .5;
    const y = surfaceY();
    const width = Math.max(76, Math.min(138, state.width * .18));
    const pulse = .65 + Math.sin(performance.now() * .003) * .2;
    const glow = context.createLinearGradient(0, y - 70, 0, y);
    glow.addColorStop(0, "rgba(92, 225, 230, 0)");
    glow.addColorStop(1, `rgba(92, 225, 230, ${pulse * .34})`);
    context.fillStyle = glow;
    context.fillRect(x - width / 2, y - 70, width, 70);
    context.fillStyle = "rgba(28, 122, 129, .68)";
    context.strokeStyle = "#72e8f2";
    context.lineWidth = 2;
    context.beginPath();
    context.roundRect(x - width / 2, y - 5, width, 10, 5);
    context.fill();
    context.stroke();
    context.fillStyle = "#eaffff";
    context.font = "bold 10px sans-serif";
    context.textAlign = "center";
    context.fillText("LAND HERE", x, y + 22);
  }

  function drawLunarModule(x, y, width, height, craftName) {
    context.save();
    context.translate(x, y);
    const bodyWidth = width * .62;
    const bodyHeight = height * .38;
    context.strokeStyle = "#d9c58f";
    context.lineWidth = Math.max(2, width * .045);
    context.beginPath();
    context.moveTo(-bodyWidth * .42, bodyHeight * .42);
    context.lineTo(-width * .48, height * .48);
    context.lineTo(-width * .58, height * .48);
    context.moveTo(bodyWidth * .42, bodyHeight * .42);
    context.lineTo(width * .48, height * .48);
    context.lineTo(width * .58, height * .48);
    context.stroke();
    context.fillStyle = "#c8aa61";
    context.fillRect(-bodyWidth / 2, bodyHeight * .02, bodyWidth, bodyHeight * .42);
    context.fillStyle = "#ead79b";
    context.beginPath();
    context.moveTo(-bodyWidth * .42, bodyHeight * .02);
    context.lineTo(-bodyWidth * .32, -bodyHeight * .32);
    context.lineTo(bodyWidth * .32, -bodyHeight * .32);
    context.lineTo(bodyWidth * .42, bodyHeight * .02);
    context.closePath();
    context.fill();
    context.fillStyle = "#67bfd6";
    context.fillRect(-bodyWidth * .23, -bodyHeight * .19, bodyWidth * .46, bodyHeight * .17);
    context.fillStyle = "#f4e3b2";
    context.fillRect(-width * .1, -bodyHeight * .55, width * .2, bodyHeight * .23);
    context.fillStyle = "#fff4d5";
    context.font = "bold 8px sans-serif";
    context.textAlign = "center";
    context.fillText(craftName.split(" ")[0].toUpperCase(), 0, -height * .62);
    context.restore();
  }

  function drawSurveyorLander(x, y, width, height) {
    context.save();
    context.translate(x, y);
    context.strokeStyle = "#c9d1d6";
    context.lineWidth = Math.max(2, width * .04);
    context.beginPath();
    context.moveTo(-width * .2, height * .02);
    context.lineTo(-width * .48, height * .47);
    context.lineTo(-width * .58, height * .47);
    context.moveTo(width * .2, height * .02);
    context.lineTo(width * .48, height * .47);
    context.lineTo(width * .58, height * .47);
    context.moveTo(-width * .4, -height * .04);
    context.lineTo(-width * .58, -height * .46);
    context.moveTo(width * .4, -height * .04);
    context.lineTo(width * .58, -height * .46);
    context.stroke();
    context.fillStyle = "#d7dce0";
    context.beginPath();
    context.moveTo(-width * .42, -height * .2);
    context.lineTo(-width * .28, -height * .42);
    context.lineTo(width * .28, -height * .42);
    context.lineTo(width * .42, -height * .2);
    context.lineTo(width * .34, height * .04);
    context.lineTo(-width * .34, height * .04);
    context.closePath();
    context.fill();
    context.fillStyle = "#52677b";
    context.fillRect(-width * .12, -height * .16, width * .24, height * .15);
    context.strokeStyle = "#e7edf0";
    context.beginPath();
    context.moveTo(0, -height * .42);
    context.lineTo(0, -height * .64);
    context.lineTo(width * .2, -height * .7);
    context.stroke();
    context.restore();
  }

  function drawSpacecraft() {
    const width = clamp(state.width * .074, 30, 52);
    const height = width * 1.16;
    const x = state.x * state.width;
    const y = state.y * state.height;
    if (state.mission?.id === "surveyor-3") {
      drawSurveyorLander(x, y, width, height);
    } else {
      drawLunarModule(x, y, width, height, state.mission?.craft || "Lunar Module");
    }

    if (state.phase === "flight" && state.throttle > .08) {
      context.save();
      context.globalAlpha = Math.min(.85, state.throttle);
      const plume = context.createLinearGradient(x, y + height * .3, x, y + height * .75);
      plume.addColorStop(0, "#fff4c2");
      plume.addColorStop(.45, "#ffd166");
      plume.addColorStop(1, "rgba(255, 129, 70, 0)");
      context.fillStyle = plume;
      context.beginPath();
      context.moveTo(x - width * .11, y + height * .32);
      context.lineTo(x + width * .11, y + height * .32);
      context.lineTo(x, y + height * (.42 + state.throttle * .3));
      context.closePath();
      context.fill();
      context.restore();
    }
  }

  function drawScene() {
    if (!state.width || !state.height) return;
    const background = context.createLinearGradient(0, 0, 0, state.height);
    background.addColorStop(0, "#040b19");
    background.addColorStop(.78, "#152235");
    background.addColorStop(1, "#333b45");
    context.fillStyle = background;
    context.fillRect(0, 0, state.width, state.height);

    state.stars.forEach(star => {
      context.globalAlpha = star.alpha;
      context.fillStyle = "#edf8ff";
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();
    });
    context.globalAlpha = 1;
    drawEarth();
    drawTerrain();
    drawTarget();

    if (state.phase === "flight") {
      context.save();
      context.setLineDash([5, 6]);
      context.strokeStyle = "rgba(114, 232, 242, .42)";
      context.beginPath();
      context.moveTo(state.x * state.width, state.y * state.height + 16);
      context.lineTo(state.width / 2, surfaceY());
      context.stroke();
      context.restore();
    }
    if (state.mission) drawSpacecraft();
  }

  function showResult(success, message) {
    state.phase = success ? "success" : "failed";
    input.left = false;
    input.right = false;
    input.increase = false;
    input.decrease = false;
    controlButtons.forEach(button => button.classList.remove("is-pressed"));
    byId("result-icon").textContent = success ? "✦" : "↻";
    byId("result-title").textContent = success ? "Successful landing!" : "Let’s try that again";
    byId("result-message").textContent = message;
    byId("result-fact").textContent = state.mission.fact;
    byId("result-fact").hidden = !success;
    byId("retry-landing").hidden = success;
    byId("continue-challenge").hidden = !success;
    resultOverlay.hidden = false;
    byId("flight-status").textContent = success
      ? "Touchdown complete. Your mission fact is ready."
      : "Flight ended. Read the tip, then try another landing.";
    drawScene();
    (success ? byId("continue-challenge") : byId("retry-landing")).focus();
  }

  function land() {
    const horizontalSpeed = Math.abs(state.vx);
    const verticalSpeed = Math.max(0, state.vy);
    const padHalfWidth = .105;
    const craftHalfWidth = .035;
    const insidePad = Math.abs(state.x - .5) + craftHalfWidth <= padHalfWidth;
    const safeVerticalSpeed = .2;
    const safeHorizontalSpeed = .13;

    if (insidePad && verticalSpeed <= safeVerticalSpeed && horizontalSpeed <= safeHorizontalSpeed) {
      state.x = clamp(state.x, .5 - padHalfWidth + craftHalfWidth, .5 + padHalfWidth - craftHalfWidth);
      state.vx = 0;
      state.vy = 0;
      showResult(true, `${state.mission.craft} made a gentle touchdown at ${state.mission.location}.`);
      return;
    }

    if (!insidePad) {
      showResult(false, "You landed outside the glowing zone. Steer toward the target before you reach the surface.");
    } else if (verticalSpeed > safeVerticalSpeed) {
      showResult(false, state.fuel <= 0
        ? "The descent was too fast and the fuel ran out. Use short thrust bursts earlier to save fuel and slow down."
        : "The descent was too fast. Add thrust earlier to slow down before touchdown.");
    } else {
      showResult(false, "There was too much sideways drift. Release the steering controls and line up over the target.");
    }
  }

  function updateFlight(delta) {
    const dt = Math.min(delta, .04);
    if (input.increase && state.fuel > 0) state.throttle = clamp(state.throttle + dt * .72, 0, .92);
    if (input.decrease) state.throttle = clamp(state.throttle - dt * .9, 0, .92);

    if (state.throttle > .04 && state.fuel > 0) {
      state.fuel = Math.max(0, state.fuel - dt * (1.25 + state.throttle * 3.1));
    }
    if (input.left || input.right) state.fuel = Math.max(0, state.fuel - dt * .45);

    const gravity = .115;
    const lift = state.fuel > 0 ? state.throttle * .245 : 0;
    state.vy = clamp(state.vy + (gravity - lift) * dt, -.22, .39);
    const steer = (Number(input.right) - Number(input.left)) * .24;
    state.vx = clamp((state.vx + steer * dt) * Math.pow(.72, dt), -.34, .34);
    state.x = clamp(state.x + state.vx * dt, .035, .965);
    state.y += state.vy * dt;
    if (state.y + .038 >= .84) {
      state.y = .84 - .038;
      land();
    }
  }

  function animate(now) {
    state.frameId = 0;
    if (state.phase === "flight") {
      const delta = state.lastFrame ? (now - state.lastFrame) / 1000 : 0;
      state.lastFrame = now;
      updateFlight(delta);
      if (now - state.lastHudUpdate > 180) updateHud(now);
    }
    drawScene();
    if (state.phase === "flight") state.frameId = window.requestAnimationFrame(animate);
  }

  function startAnimationLoop() {
    if (!state.frameId) {
      state.lastFrame = 0;
      state.frameId = window.requestAnimationFrame(animate);
    }
  }

  function setControl(name, pressed) {
    if (!(name in input) || state.phase !== "flight") return;
    input[name] = pressed;
    controlButtons.forEach(button => {
      if (button.dataset.control === name) button.classList.toggle("is-pressed", pressed);
    });
  }

  function handleKey(event, pressed) {
    const keys = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "increase",
      ArrowDown: "decrease",
      a: "left",
      A: "left",
      d: "right",
      D: "right",
      w: "increase",
      W: "increase",
      s: "decrease",
      S: "decrease"
    };
    const control = keys[event.key];
    if (!control) return;
    event.preventDefault();
    setControl(control, pressed);
  }

  function bindTouchControls() {
    controlButtons.forEach(button => {
      const control = button.dataset.control;
      const release = () => setControl(control, false);
      button.addEventListener("pointerdown", event => {
        event.preventDefault();
        setControl(control, true);
      });
      button.addEventListener("pointerup", release);
      button.addEventListener("pointercancel", release);
      button.addEventListener("pointerleave", release);
    });
  }

  function exitChallenge() {
    if (window.parent !== window) {
      window.parent.postMessage(
        { type: "moon-landing-challenge-exit" },
        window.location.origin === "null" ? "*" : window.location.origin
      );
      return;
    }
    window.location.href = "../moon.html";
  }

  choicesElement.addEventListener("click", chooseMission);
  beginLandingButton.addEventListener("click", beginLanding);
  byId("retry-landing").addEventListener("click", resetFlight);
  byId("continue-challenge").addEventListener("click", exitChallenge);
  byId("restart-evaluation").addEventListener("click", beginEvaluation);
  byId("exit-challenge").addEventListener("click", exitChallenge);
  window.addEventListener("keydown", event => handleKey(event, true));
  window.addEventListener("keyup", event => handleKey(event, false));
  window.addEventListener("blur", () => {
    Object.keys(input).forEach(key => setControl(key, false));
  });
  window.addEventListener("pagehide", () => {
    if (state.frameId) window.cancelAnimationFrame(state.frameId);
  }, { once: true });
  if ("ResizeObserver" in window) {
    new ResizeObserver(resizeCanvas).observe(canvas);
  } else {
    window.addEventListener("resize", resizeCanvas);
  }

  bindTouchControls();
  resizeCanvas();
  beginEvaluation();
})();
