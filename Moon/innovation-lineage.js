"use strict";

(() => {
  const exhibit = document.getElementById("moon-innovation-lineage");
  if (!exhibit) {
    throw new Error("Innovation Lineage markup is unavailable.");
  }

  const P = (d, x) => `<path d="${d}" ${x || ""}/>`;
  const I = {
    lander: P("M16 12h16l4 14H12z") + P("M14 30l-7 11M34 30l7 11M5 41h10M33 41h10", "fill='none' stroke='currentColor' stroke-width='3' stroke-linecap='round'"),
    radar: P("M24 36a4 4 0 100-.1", "") + P("M12 28a16 16 0 0124 0M6 22a24 24 0 0136 0", "fill='none' stroke='currentColor' stroke-width='3' stroke-linecap='round'"),
    flow: P("M6 24h28", "fill='none' stroke='currentColor' stroke-width='4' stroke-linecap='round'") + P("M30 12l14 12-14 12z"),
    suit: '<circle cx="24" cy="12" r="8"/>' + P("M12 24h24v14H12z") + P("M12 26l-6 10M36 26l6 10", "fill='none' stroke='currentColor' stroke-width='5' stroke-linecap='round'"),
    pack: '<rect x="12" y="8" width="24" height="32" rx="6"/><rect x="18" y="14" width="12" height="8" rx="2" fill="#0d1330"/>',
    box: '<rect x="8" y="14" width="32" height="24" rx="3"/><rect x="14" y="8" width="8" height="6"/><circle cx="30" cy="26" r="5" fill="#0d1330"/>',
    refl: P("M8 8h32v32z") + P("M8 8l22 22", "fill='none' stroke='#0d1330' stroke-width='2'"),
    rock: P("M8 34l6-16 12-6 12 8 4 14z") + P("M14 18l10 8 14-6", "fill='none' stroke='#0d1330' stroke-width='2'"),
    lens: '<circle cx="21" cy="21" r="12" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="21" cy="21" r="5"/>' + P("M30 30l12 12", "stroke='currentColor' stroke-width='5' stroke-linecap='round'"),
    wave: P("M4 24h8l4-14 6 28 6-24 4 10h12", "fill='none' stroke='currentColor' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'"),
    laser: P("M6 38l22-22", "stroke='currentColor' stroke-width='4' stroke-linecap='round'") + '<circle cx="38" cy="10" r="7"/>',
    ruler: '<rect x="4" y="16" width="40" height="16" rx="3"/>' + P("M12 16v7M20 16v10M28 16v7M36 16v10", "stroke='#0d1330' stroke-width='2'"),
    orbit: '<ellipse cx="24" cy="24" rx="20" ry="9" fill="none" stroke="currentColor" stroke-width="3" transform="rotate(-25 24 24)"/><circle cx="24" cy="24" r="7"/><circle cx="41" cy="16" r="3"/>',
    stack: '<rect x="8" y="30" width="32" height="8" rx="2"/><rect x="8" y="19" width="32" height="8" rx="2" opacity=".75"/><rect x="8" y="8" width="32" height="8" rx="2" opacity=".5"/>',
    star: P("M24 5l5.5 12 13 1.5-9.7 9 2.7 12.8L24 33l-11.5 7.3 2.7-12.8-9.7-9 13-1.5z")
  };
  const icon = name => `<svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">${I[name]}</svg>`;
  const T = (i, t, d, l, p, w, u, c) => ({ i, t, d, l, p, w, u, c: c || [] });
  const A11 = {
    hw: [
      T("lander", "Eagle descent stage", "Carried landing propulsion, guidance and landing radar.", 0, 0, 0, 0, [
        T("flow", "Landing propulsion", "Controls speed and attitude while saving propellant.", "Provides thrust", 0, "It had to leave enough propellant for a safe touchdown.", 0),
        T("radar", "Guidance and radar", "Computer guidance and radar steer the final descent.", "Adds guidance", "During final descent the crew used computer guidance together with visual judgement. The landing system had to control speed and attitude while keeping propellant for a safe touchdown.", 0, 0, [
          T("star", "Reference for later landers", "Became a reference point for precision lunar landing design.", "Becomes a reference", 0, 0, "A reference point for later precision lunar landing design; not a direct commercial spin-off.")
        ])
      ]),
      T("box", "Early Apollo Science Package", "Compact instruments left working beyond the astronauts’ short visit.", 0, 0, "Extended the mission beyond the astronauts’ short visit.", 0, [
        T("refl", "Laser Ranging Retroreflector", "Returns laser pulses sent from Earth.", "Includes", 0, 0, 0, [
          T("laser", "Ranging target today", "Remains a target for laser-ranging measurements.", "Stays on the Moon", 0, 0, "The retroreflector remains a target for lunar laser-ranging.")
        ]),
        T("star", "Solar wind foil", "Collector foil exposed to solar particles, then returned.", "Includes", "The collector foil was exposed to solar particles on the Moon. It was then returned to Earth for laboratory analysis.", 0, 0, [
          T("lens", "Solar wind lab record", "Gave a direct laboratory record of the near-Earth solar wind.", "Analysed on Earth")
        ])
      ])
    ],
    sci: [
      T("rock", "Returned lunar samples", "About 21.6 kg of lunar material came back.", 0, 0, 0, "Samples remain in curated collections for continuing analysis.", [
        T("lens", "Mare basalt", "Laboratory study identified mare basalts.", "Studied in labs", "Scientists could test interpretations of the lunar surface against physical samples rather than photographs alone. Laboratory study identified the mare basalts.", 0, 0, [
          T("star", "Lunar volcanism", "Direct evidence about volcanism on the Moon.", "Gives evidence")
        ]),
        T("lens", "Impact breccia", "Laboratory study identified impact breccias.", "Studied in labs", 0, 0, 0, [
          T("star", "Impact processing", "Direct evidence about impact processing of the surface.", "Gives evidence")
        ]),
        T("orbit", "Surface age", "Samples showed the age of surface materials.", "Gives evidence")
      ]),
      T("wave", "Passive seismometer", "Recorded lunar seismic activity after deployment.", 0, 0, 0, "Operated for a limited period.", [
        T("star", "Moonquakes exist", "Observations helped establish that the Moon has moonquakes.", "Records show"),
        T("lens", "Probing interiors", "Seismic methods can probe another world’s interior.", "Shows method works", 0, 0, 0, [
          T("stack", "Long-lived stations", "Later Apollo stations built a more extensive network.", "Leads to", 0, "Demonstrated the value of long-lived geophysical stations.")
        ])
      ])
    ]
  };

  const S3 = {
    hw: [
      T("ruler", "Remote surface sampler", "Reached about 1.5 m and dug roughly 18 cm.", 0, 0, 0, 0, [
        T("lens", "Trenches and tests", "Four trenches, four bearing tests and thirteen impact tests.", "Commanded from Earth", "Operators commanded the sampler from Earth to dig trenches and press into the soil. A camera watched while it manipulated lunar material.", 0, 0, [
          T("star", "Small soil laboratory", "Turned a remote lander into a geotechnical laboratory.", "Became")
        ])
      ]),
      T("lander", "Terminal descent", "Reflective rocks confused the radar; it bounced twice before settling.", 0, 0, "Gave flight evidence of the difficulty of radar-guided descent.", 0)
    ],
    sci: [
      T("rock", "Soil tests", "The sampler pressed into and dug the lunar soil.", 0, 0, 0, 0, [
        T("star", "Bearing strength", "About 98 kPa, enough to support an Apollo Lunar Module.", "Measured", 0, 0, "A local measurement, not a global average for the Moon."),
        T("lens", "Wet-sand behaviour", "Soil acted partly like wet sand despite the dry vacuum.", "Also showed"),
        T("orbit", "Apollo 12 recovery", "Apollo 12 landed about 180 m away and retrieved parts.", "Later", 0, 0, "Allowed lab study of long exposure to vacuum, radiation, temperature cycling and dust.")
      ])
    ]
  };

  const A15 = {
    hw: [
      T("lander", "Lunar Roving Vehicle", "Battery-powered four-wheel rover extending how far crews could travel.", 0, 0, 0, 0, [
        T("star", "Geological traverses", "Carried tools, samples and TV across Hadley–Apennine terrain.", "Enabled"),
        T("orbit", "Mobility lessons", "Showed human-operated mobility in low gravity, vacuum and abrasive dust.", "Taught", 0, 0, "Lessons remain relevant to rover navigation, power budgeting and crew-robot teamwork.")
      ]),
      T("suit", "Extended suit and life support", "Supported three excursions totalling 18 hours 37 minutes.", 0, 0, 0, 0, [
        T("star", "Longer surface stays", "Tested the integrated human system for longer stays.", "Tested")
      ]),
      T("box", "ALSEP and lunar drill", "Drill installed heat-flow probes in boreholes.", 0, 0, 0, 0, [
        T("stack", "Continuing geophysical station", "Turned a brief landing into a continuing station.", "Became")
      ])
    ],
    sci: [
      T("rock", "Genesis Rock 15415", "Anorthosite about four billion years old, from the primordial crust.", 0, 0, 0, 0, [
        T("star", "Magma-ocean model", "Supported the idea that early molten material formed the crust.", "Supports")
      ]),
      T("wave", "Heat-flow probes", "Measured temperature and thermal properties below the surface.", 0, 0, 0, 0, [
        T("orbit", "Thermal evolution", "Helped estimate heat escaping the lunar interior.", "Contributes to")
      ])
    ]
  };

  const missions = [
    { id: "s3", n: "Surveyor 3", y: "1967", g: "Soft-land and test how lunar soil behaves.", i: "lander", d: S3 },
    { id: "a11", n: "Apollo 11", y: "1969", g: "First crewed lunar landing and return.", i: "star", d: A11 },
    { id: "a15", n: "Apollo 15", y: "1971", g: "Extended-stay mission with a lunar rover.", i: "rock", d: A15 }
  ];
  const NA = "Not stated in the PDF.";
  const $ = selector => exhibit.querySelector(selector);
  const sleep = ms => new Promise(resolve => window.setTimeout(resolve, ms));
  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stage = $("#moon-innovation-lineage-stage");
  const sheet = $("#moon-innovation-lineage-sheet");
  let activeCardTrigger = null;

  function node(data) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "node item";
    button.innerHTML = icon(data.i) + `<div><b>${data.t}</b><span>${data.d}</span></div>`;
    button.addEventListener("click", () => card(data, button));
    return button;
  }

  function kidsOf(data, branch) {
    if (!data.c.length) return null;
    const kids = document.createElement("div");
    kids.className = "kids";
    const process = document.createElement("div");
    process.className = "proc";
    process.innerHTML = "<div><p></p></div>";
    kids.appendChild(process);
    const row = document.createElement("div");
    row.className = "krow";
    const count = data.c.length;

    data.c.forEach((child, index) => {
      const kid = document.createElement("div");
      kid.className = "kid";
      const x = 50 + (count - 1 - 2 * index) * 50;
      kid.innerHTML = `<div class="cn"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><line x1="${x}" y1="0" x2="50" y2="100"/></svg></div><div class="ar"><span>${child.l || ""}</span>${child.p ? '<button class="info" type="button" aria-expanded="false" aria-label="Learn how"><i>i</i></button>' : ""}</div>`;
      const infoButton = kid.querySelector(".info");
      if (infoButton) {
        infoButton.addEventListener("click", () => {
          const same = process.classList.contains("open") && process.dataset.k === String(index);
          branch.querySelectorAll(".proc.open").forEach(item => item.classList.remove("open"));
          branch.querySelectorAll(".info").forEach(button => button.setAttribute("aria-expanded", "false"));
          if (!same) {
            process.querySelector("p").innerHTML = `<b>${child.l}.</b> ${child.p}`;
            process.dataset.k = index;
            process.classList.add("open");
            infoButton.setAttribute("aria-expanded", "true");
          }
        });
      }

      kid.appendChild(node(child));
      const descendants = kidsOf(child, branch);
      if (descendants) kid.appendChild(descendants);
      row.appendChild(kid);
    });

    kids.appendChild(row);
    return kids;
  }

  function build(trees, branch) {
    trees.forEach(data => {
      const tree = document.createElement("div");
      tree.className = "tree";
      tree.appendChild(node(data));
      const children = kidsOf(data, branch);
      if (children) tree.appendChild(children);
      branch.appendChild(tree);
    });
  }

  function panel(mission) {
    const element = document.createElement("section");
    element.className = "mp";
    element.innerHTML = `<div class="rootc">${icon(mission.i)}<div><h2>${mission.n} <small>${mission.y}</small></h2><p>${mission.g}</p></div></div><div class="btns"><button type="button" style="--c:var(--hw)" aria-pressed="false">${icon("box")}Hardware</button><button type="button" style="--c:var(--sci)" aria-pressed="false">${icon("orbit")}Science</button></div><button class="replay" type="button">↻ Replay</button><div class="wrap"><div class="in"><div class="branch hw"></div></div></div><div class="wrap"><div class="in"><div class="branch sci"></div></div></div>`;
    const wraps = element.querySelectorAll(".wrap");
    const branches = element.querySelectorAll(".branch");
    const buttons = element.querySelectorAll(".btns button");
    const categories = {
      hw: { wrap: wraps[0], button: buttons[0], branch: branches[0], token: 0 },
      sci: { wrap: wraps[1], button: buttons[1], branch: branches[1], token: 0 }
    };
    build(mission.d.hw, branches[0]);
    build(mission.d.sci, branches[1]);
    let active = null;
    let last = "hw";

    function reset(category) {
      category.branch.querySelectorAll(".node, .kid, .kids").forEach(item => item.classList.remove("on", "show"));
      category.branch.querySelectorAll(".proc.open").forEach(item => item.classList.remove("open"));
      category.branch.querySelectorAll(".info").forEach(button => button.setAttribute("aria-expanded", "false"));
    }

    function collapse(key) {
      const category = categories[key];
      category.token += 1;
      const token = category.token;
      category.wrap.classList.remove("open");
      category.button.setAttribute("aria-pressed", "false");
      category.branch.querySelectorAll(".proc.open").forEach(item => item.classList.remove("open"));
      sleep(reducedMotion() ? 0 : 450).then(() => {
        if (category.token === token) reset(category);
      });
    }

    async function reveal(key, delay) {
      const category = categories[key];
      category.token += 1;
      const token = category.token;
      reset(category);
      category.wrap.classList.add("open");
      category.button.setAttribute("aria-pressed", "true");
      if (delay) await sleep(delay);
      if (category.token !== token) return;
      for (const item of category.branch.querySelectorAll(".node, .kid")) {
        item.classList.add("on");
        if (item.classList.contains("kid")) item.parentElement.parentElement.classList.add("on");
        void item.offsetWidth;
        window.requestAnimationFrame(() => item.classList.add("show"));
        item.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "nearest" });
        await sleep(reducedMotion() ? 60 : 400);
        if (category.token !== token) return;
      }
    }

    function pick(key) {
      if (active === key) {
        collapse(key);
        active = null;
        return;
      }
      if (active) {
        collapse(active);
        reveal(key, reducedMotion() ? 0 : 300);
      } else {
        reveal(key, 0);
      }
      active = key;
      last = key;
    }

    buttons[0].addEventListener("click", () => pick("hw"));
    buttons[1].addEventListener("click", () => pick("sci"));
    element.querySelector(".replay").addEventListener("click", () => {
      const key = active || last;
      if (active) collapse(key);
      const wasActive = Boolean(active);
      active = key;
      last = key;
      reveal(key, wasActive ? (reducedMotion() ? 0 : 480) : 0);
    });
    return element;
  }

  const cache = {};
  let selectedMissions = ["a11"];
  const chips = missions.map(mission => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${mission.n} ${mission.y}`;
    button.addEventListener("click", () => {
      if (selectedMissions.includes(mission.id)) {
        if (selectedMissions.length > 1) selectedMissions = selectedMissions.filter(id => id !== mission.id);
      } else {
        selectedMissions.push(mission.id);
        if (selectedMissions.length > 2) selectedMissions.shift();
      }
      render();
    });
    $("#moon-innovation-lineage-chips").appendChild(button);
    return button;
  });

  function render() {
    chips.forEach((button, index) => button.setAttribute("aria-pressed", String(selectedMissions.includes(missions[index].id))));
    stage.classList.toggle("two", selectedMissions.length > 1);
    stage.replaceChildren(...selectedMissions.map(id => cache[id] || (cache[id] = panel(missions.find(mission => mission.id === id)))));
  }

  function card(data, trigger) {
    const branch = trigger.closest(".branch");
    sheet.style.setProperty("--c", branch && branch.classList.contains("sci") ? "var(--sci)" : "var(--hw)");
    $("#moon-innovation-lineage-sheet-body").innerHTML = `<h2>${data.t}</h2><dl><dt>What it is</dt><dd>${data.d}</dd><dt>Why it was needed</dt><dd>${data.w || NA}</dd><dt>Where it’s used today</dt><dd>${data.u || NA}</dd></dl>`;
    activeCardTrigger = trigger;
    sheet.classList.add("open");
    sheet.setAttribute("aria-hidden", "false");
    $("#moon-innovation-lineage-backdrop").classList.add("open");
    $("#moon-innovation-lineage-close").focus();
  }

  function closeCard() {
    sheet.classList.remove("open");
    sheet.setAttribute("aria-hidden", "true");
    $("#moon-innovation-lineage-backdrop").classList.remove("open");
    activeCardTrigger?.focus();
  }

  $("#moon-innovation-lineage-close").addEventListener("click", closeCard);
  $("#moon-innovation-lineage-backdrop").addEventListener("click", closeCard);
  window.addEventListener("keydown", event => {
    if (event.key === "Escape" && !sheet.classList.contains("open")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeCard();
    }
  });
  render();

  const story = document.getElementById("ranger-story");
  const status = $("#moon-innovation-lineage-status");
  let allowEvaluation = false;
  let finaleWasVisible = false;

  function openExhibit() {
    exhibit.hidden = false;
    exhibit.setAttribute("aria-hidden", "false");
    story.inert = true;
    $("#moon-innovation-lineage-previous").focus();
  }

  function returnToStory() {
    exhibit.hidden = true;
    exhibit.setAttribute("aria-hidden", "true");
    story.inert = false;
    const finaleButton = document.getElementById("start-moon-landing-challenge");
    (finaleButton || document.getElementById("story-advance-slide")).focus();
  }

  document.addEventListener("click", event => {
    const entryButton = event.target.closest("#start-moon-landing-challenge");
    if (!entryButton || allowEvaluation) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openExhibit();
  }, true);

  const finaleObserver = new MutationObserver(() => {
    const finale = document.getElementById("final-cta");
    const isFinaleVisible = Boolean(finale && !finale.hidden);
    if (isFinaleVisible && !finaleWasVisible) {
      openExhibit();
    }
    finaleWasVisible = isFinaleVisible;
  });
  finaleObserver.observe(story, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["hidden"]
  });

  $("#moon-innovation-lineage-previous").addEventListener("click", returnToStory);
  $("#moon-innovation-lineage-continue").addEventListener("click", () => {
    const entryButton = document.getElementById("start-moon-landing-challenge");
    if (!entryButton) {
      status.textContent = "The existing Evaluation entry is unavailable.";
      console.error("Innovation Lineage cannot open Evaluation: landing challenge entry button is missing.");
      return;
    }
    allowEvaluation = true;
    try {
      entryButton.click();
    } finally {
      allowEvaluation = false;
    }
  });

  window.addEventListener("message", event => {
    if (event.data?.type === "moon-landing-challenge-exit" && !exhibit.hidden) {
      story.inert = true;
    }
  });
})();
