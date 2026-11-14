"use strict";

window.DEEP_SPACE_STORY_STAGES = [
  {
    id: "prologue",
    title: "The Edge of the Solar System",
    shortLabel: "Prologue",
    location: {
      mission: "Deep Space archive overview",
      spacecraft: "Multiple missions",
      body: "Deep space",
      locationType: "Overview — no single mission location",
      note: "Choose a mission in the Index to view its destination or mission trajectory."
    },
    image: "deepspace_images/deepspace_images/bg.png",
    alt: "Stylized cosmic archive environment; not mission imagery",
    visualDescription: "A schematic Solar System and Deep Space Network signal path; distances are not to scale.",
    source: "NASA/JPL Deep Space Network; NASA Eyes on the Solar System",
    nodes: [
      {
        id: "dsn-signal",
        slideTitle: "Listening across deep space",
        image: "deepspace_images/deepspace_images/bg.png",
        alt: "Stylized cosmic archive environment; not mission imagery",
        narration: "Welcome to the Deep Space Archive, USER. Humanity's robotic explorers have travelled far beyond Earth—to Jupiter, Saturn, distant asteroids, and even toward the space between the stars.",
        response: "If they are so far away, how can we still communicate with them? And what happens when a spacecraft can no longer answer?",
        responseImageSequence: [],
        answer: "We listen with the Deep Space Network: giant radio antennas spread across Earth. As Earth turns, stations in different locations help maintain contact. The signals are incredibly faint, so engineers must point carefully, listen patiently, and separate a spacecraft's message from the noise. Try the signal challenge: adjust antenna pointing and listening time to recover a weak trace from noise. This is a teaching simulation.",
        answerImage: null,
        interaction: "Signal challenge: adjust antenna pointing and integration time to recover a simplified signal trace from noise.",
        visualDescription: "A schematic signal trace buried in noise and Deep Space Network antennas.",
        source: "NASA/JPL Deep Space Network overview"
      },
      {
        id: "six-outposts",
        slideTitle: "Six journeys beyond Earth",
        imageSequence: [
          { image: "deepspace_images/deepspace_images/Pioneer_10/Sl4.jpg", alt: "Pioneer 10 spacecraft diagram" }
        ],
        narration: "Some missions ended by design. Some spacecraft became silent in orbit. Others completed their work and left behind hardware that still tells us how far exploration has come. Let's meet six of them.",
        response: "",
        answer: ""
      }
    ]
  },
  {
    id: "pioneer-10",
    title: "Pioneer 10 — The First Messenger to Jupiter",
    shortLabel: "Exhibit 01",
    location: {
      mission: "Pioneer 10",
      spacecraft: "Pioneer 10",
      body: "Jupiter system",
      locationType: "Jupiter flyby; no surface landing",
      visualization: "flyby",
      note: "Pioneer 10 flew past Jupiter and continued on an outbound trajectory. It did not land."
    },
    timeline: "Launched 2 March 1972 • Jupiter flyby 3 December 1973 • Last signal 23 January 2003",
    image: "deepspace_images/deepspace_images/Pioneer_10/Sl5.jpg",
    alt: "Pioneer 10 during pre-launch assembly",
    visualDescription: "Pioneer 10 pre-launch photograph; the asteroid belt comparison is schematic and sparse.",
    source: "NASA NSSDC Master Catalog; NASA/JPL Pioneer 10 mission history",
    nodes: [
      {
        id: "pioneer-belt",
        slideTitle: "Crossing the asteroid belt",
        image: "deepspace_images/deepspace_images/Pioneer_10/Sl5.jpg",
        alt: "Pioneer 10 during pre-launch assembly",
        answerImage: null,
        answerAlt: "",
        narration: "In 1972, Pioneer 10 set out for Jupiter. It was the first spacecraft to travel through the asteroid belt and the first to send us close-up views of the giant planet. People sometimes imagine the belt as a crowded wall of rocks. In reality, the distances between asteroids are enormous.",
        response: "So how did it get through without hitting anything?",
        answer: "The real challenge was not dodging a wall of rocks. It was building a spacecraft that could survive the long journey, operate reliably, and pass through Jupiter's intense radiation environment. Compare a true-scale model with a crowded science-fiction version: the real belt is vast and sparse.",
        interaction: "Scale inspection: compare a sparse, true-relative-scale asteroid belt with an intentionally crowded science-fiction version.",
        visualDescription: "Pioneer 10 pre-launch photograph. Do not depict the asteroid belt as crowded.",
        source: "NASA/JPL Pioneer 10 mission history"
      },
      {
        id: "pioneer-jupiter",
        slideTitle: "First close-up views of Jupiter",
        image: "deepspace_images/deepspace_images/Pioneer_10/Sl8.webp",
        alt: "Close-up image of Jupiter associated with Pioneer 10's encounter",
        narration: "On 3 December 1973, Pioneer 10 flew past Jupiter and returned the first close-up images of the planet. Its instruments measured the environment around Jupiter and helped prepare the way for later missions.",
        response: "",
        answer: "",
        visualDescription: "Pioneer 10 Jupiter encounter image. Verify its original caption before production.",
        source: "NASA Pioneer 10 mission overview; local image provenance is unverified."
      },
      {
        id: "pioneer-plaque",
        slideTitle: "A message carried from Earth",
        image: "deepspace_images/deepspace_images/Pioneer_10/Sl9.jpg",
        alt: "Pioneer 10 plaque; source attribution is unverified",
        narration: "Now inspect the golden plaque attached to Pioneer 10.",
        response: "What is the golden plaque attached to it?",
        answerImage: "deepspace_images/deepspace_images/Pioneer_10/Sl10.jpg",
        answerAlt: "Pioneer 10 plaque; source attribution is unverified",
        answer: "The plaque was designed by Carl Sagan and Frank Drake, with artwork by Linda Salzman Sagan. It was a message from Earth: a diagram of a hydrogen transition, drawings of a human woman and man, and a map showing the Sun's location using pulsars. It was a symbolic greeting, not a message we know anyone will receive. Zoom into each region and consider what an unknown recipient might understand—or find impossible to decode.",
        interaction: "Plaque inspection: examine the hydrogen symbol, human figures, and pulsar map; consider what an unknown recipient might or might not decode.",
        visualDescription: "Selected plaque image; its identity and source attribution remain unverified.",
        source: "NASA Ames / NASA Science Pioneer plaque material"
      },
      {
        id: "pioneer-last-signal",
        slideTitle: "A final signal, a continuing path",
        image: "deepspace_images/deepspace_images/Pioneer_10/Sl11.jpg",
        alt: "AI-generated conceptual view of Pioneer 10 travelling outward; not a photograph or trajectory",
        narration: "Pioneer 10's transmission eventually became too weak to hear. Inspect the last-signal record and the spacecraft's distance from the Sun.",
        response: "When did it stop talking to Earth?",
        answer: "NASA received Pioneer 10's final very weak signal on 23 January 2003, when it was about 82 astronomical units from the Sun. The spacecraft continues along its path, generally in the direction of Aldebaran, but it is not on a targeted rendezvous with that star. Reaching the star's neighbourhood would take millions of years. Sort the clues into measured or recorded evidence, mission facts, and future trajectory estimates. The Jupiter encounter image and last-signal date are records. Aldebaran describes a projected direction, not a planned arrival.",
        interaction: "Evidence classification: distinguish recorded Jupiter and signal evidence from the projected Aldebaran direction.",
        visualDescription: "AI-generated conceptual scene, not a photograph or trajectory. Aldebaran is a projected direction, not a targeted destination.",
        source: "NASA NSSDC Master Catalog; NASA Ames / NASA Science Pioneer plaque material"
      }
    ]
  },
  {
    id: "galileo",
    title: "Galileo — The Wounded Explorer of Jupiter",
    shortLabel: "Exhibit 02",
    location: {
      mission: "Galileo",
      spacecraft: "Galileo orbiter and atmospheric probe",
      body: "Jupiter",
      locationType: "Orbiter; atmospheric probe entry (not a surface landing)",
      visualization: "orbit",
      note: "The orbiter was intentionally sent into Jupiter’s atmosphere in 2003. Jupiter has no solid surface landing site."
    },
    timeline: "Launched 18 October 1989 • Jupiter orbit 7 December 1995 • Mission ended 21 September 2003",
    image: "deepspace_images/deepspace_images/Galileo/Sl12_alt1.jpg",
    alt: "Labeled Galileo spacecraft diagram",
    visualDescription: "Galileo deployment from Atlantis; spacecraft antenna diagrams must show the high-gain antenna not fully deployed.",
    source: "NASA Galileo mission overview and end-of-mission record",
    nodes: [
      {
        id: "galileo-antenna",
        slideTitle: "A wounded antenna, a rescued mission",
        imageSequence: [
          { image: "deepspace_images/deepspace_images/Galileo/Sl12_alt1.jpg", alt: "Labeled Galileo spacecraft diagram" }
        ],
        responseImage: "deepspace_images/deepspace_images/Galileo/Sl13.jpg",
        responseAlt: "Labeled Galileo spacecraft diagram",
        alt: "Labeled Galileo spacecraft diagram",
        narration: "Galileo began its journey in 1989. It was built to orbit Jupiter and study the planet and its moons. But after launch, its large high-gain antenna failed to fully open. That meant it could not send data as quickly as planned.",
        response: "Was the mission over before it even reached Jupiter?",
        answerImage: "deepspace_images/deepspace_images/Galileo/Sl14.jpg",
        answerAlt: "Labeled Galileo spacecraft diagram",
        answer: "Not at all. Engineers changed how Galileo stored and compressed its data. They sent commands across millions of kilometres and found ways to return valuable science through the spacecraft's smaller low-gain antenna. The mission became a remarkable example of problem-solving under pressure. Try the bandwidth challenge: choose which science data to compress or send first. The antenna problem was never completely fixed.",
        interaction: "Bandwidth challenge: prioritize or compress science data for a narrow data link; do not imply the antenna was repaired.",
        visualDescription: "Galileo deployment; the antenna did not fully open.",
        source: "NASA Galileo mission overview"
      },
      {
        id: "galileo-europa",
        slideTitle: "Europa: evidence beneath the ice",
        image: "deepspace_images/deepspace_images/Galileo/Sl15.jpg",
        alt: "Fractured icy plains on Jupiter's moon Europa",
        narration: "Inspect Europa's fractured icy surface, then compare it with a visualization of Galileo's magnetic-field measurements. The magnetic-field response is measured data; an ocean beneath the ice is the scientific interpretation.",
        response: "What did Galileo discover at Europa?",
        answerImage: null,
        answerAlt: "",
        answer: "Galileo found strong evidence that a global salty ocean lies beneath Europa's icy shell. It did not photograph that ocean or sample its water. Measurements of Jupiter's changing magnetic field near Europa were consistent with an electrically conducting layer—most likely salty liquid water—beneath the ice.",
        interaction: "Evidence inspection: trace surface cracks and compare them with magnetic-field measurements; separate measured data from the ocean interpretation.",
        visualDescription: "Galileo image of Europa's fractured surface; the subsurface ocean was inferred, not photographed or sampled.",
        source: "NASA/JPL Europa ocean evidence; NASA Photojournal PIA00502"
      },
      {
        id: "galileo-life",
        slideTitle: "A possibility, not a life detection",
        image: "deepspace_images/deepspace_images/Galileo/Sl17.jpg",
        alt: "Europa surface views; no life detection is implied",
        narration: "Galileo's discoveries at Europa raise one more question.",
        response: "Did Galileo find life there?",
        answerImageSequence: [
          { image: "deepspace_images/deepspace_images/Galileo/Sl18.jpg", alt: "Europa surface view; Galileo did not detect life" }
        ],
        answerAlt: "Europa surface views; no life detection is implied",
        answer: "No. It found evidence for an ocean that may provide conditions of interest to astrobiologists. That is an important discovery, but it is not a detection of life. Galileo also studied Io, a moon shaped by intense volcanic activity, and released an atmospheric probe into Jupiter. The orbiter transformed our understanding of the Jupiter system.",
        interaction: "Inspect Europa evidence and distinguish the possibility of habitability from a life detection; Galileo also studied volcanic Io.",
        visualDescription: "Europa surface image for the life question; no life detection is implied. The answer also mentions Galileo's Io observations.",
        source: "NASA Galileo mission archive"
      },
      {
        id: "galileo-disposal",
        slideTitle: "Protecting Europa at mission's end",
        image: "deepspace_images/deepspace_images/Galileo/Sl20.jpg",
        alt: "Artist's concept of Galileo entering Jupiter",
        narration: "By 2003, Galileo's propellant was running low. Engineers could no longer guarantee its future path.",
        response: "Why did NASA deliberately send it into Jupiter?",
        answerImage: "deepspace_images/deepspace_images/Galileo/Sl21.jpg",
        answerAlt: "Artist's concept of Galileo entering Jupiter",
        answer: "To reduce the risk of an uncontrolled impact contaminating Europa, NASA directed Galileo into Jupiter's atmosphere on 21 September 2003. Its mission ended where its long exploration had begun: at Jupiter. Consider the choice between an uncertain future orbit and a planned disposal, then ask what uncertainty remains in any long-term prediction.",
        interaction: "Mission decision: compare an uncertain low-fuel orbit with deliberate disposal to protect Europa.",
        visualDescription: "Conceptual mission-end visualization only; not a documentary photograph.",
        source: "NASA Galileo end-of-mission record"
      }
    ]
  },
  {
    id: "cassini-huygens",
    title: "Cassini–Huygens — The Worlds of Saturn",
    shortLabel: "Exhibit 03",
    location: {
      mission: "Cassini–Huygens",
      spacecraft: "Huygens lander",
      body: "Titan",
      locationType: "Lander touchdown",
      color: [149, 101, 55],
      note: "Huygens landed on Titan. A precise latitude/longitude and matching coordinate source have not been verified here, so no marker is shown."
    },
    timeline: "Launched 15 October 1997 • Saturn orbit 1 July 2004 • Huygens landed on Titan 14 January 2005 • Cassini ended 15 September 2017",
    image: "deepspace_images/deepspace_images/Cassini_Huygens/Sl22.jpg",
    alt: "Cassini–Huygens launch",
    visualDescription: "Cassini–Huygens launch; distinguish NASA's Cassini orbiter from ESA's Huygens lander.",
    source: "NASA Cassini mission archive; ESA Huygens mission archive",
    nodes: [
      {
        id: "cassini-titan",
        slideTitle: "Cassini and Huygens set out for Saturn",
        imageSequence: [
          { image: "deepspace_images/deepspace_images/Cassini_Huygens/Sl22.jpg", alt: "Cassini–Huygens launch image" }
        ],
        alt: "Cassini–Huygens launch image",
        narration: "In 1997, NASA, the European Space Agency, and the Italian Space Agency sent a spacecraft toward Saturn. Cassini would explore Saturn and its rings. Attached to it was Huygens, a lander built by ESA to descend through the atmosphere of Titan.",
        response: "",
        answer: "",
        visualDescription: "Cassini–Huygens launch image; Cassini was the orbiter and ESA's Huygens was the lander.",
        source: "NASA Cassini mission archive; ESA Huygens mission archive"
      },
      {
        id: "huygens-titan",
        slideTitle: "Huygens descends to Titan",
        imageSequence: [
          { image: "deepspace_images/deepspace_images/Cassini_Huygens/Sl23_alt1.jpg", alt: "Low-resolution Huygens surface composite; source attribution is unverified" }
        ],
        alt: "Low-resolution Huygens surface composite; source attribution is unverified",
        narration: "Begin with Huygens' hazy descent images, then reveal the surface image. Compare rounded stones with river-worn pebbles on Earth, as an analogy.",
        response: "What did Huygens find beneath Titan's orange haze?",
        answerImage: "deepspace_images/deepspace_images/Cassini_Huygens/Sl24.jpg",
        answerAlt: "Low-resolution Huygens surface composite; source attribution is unverified",
        answer: "On 14 January 2005, Huygens parachuted through Titan's thick atmosphere and reached the surface. It sent back images of branching channels and rounded icy pebbles. On Titan, methane and ethane can play roles in weather and surface cycles that water plays on Earth. Huygens was the first spacecraft to land on Titan—and the first landing on a moon in the outer Solar System.",
        interaction: "Image reveal: compare Huygens descent and surface evidence; pebble shapes are an analogy to river-worn stones on Earth.",
        visualDescription: "The descent visual is AI-generated; the Huygens surface composite is low resolution and its source is unverified.",
        source: "ESA Huygens archive; NASA Photojournal PIA07231. Verify the original image and caption before production."
      },
      {
        id: "cassini-enceladus",
        slideTitle: "Sampling Enceladus's plumes",
        image: "deepspace_images/deepspace_images/Cassini_Huygens/Sl25.jpg",
        alt: "Water-ice plumes rising from Enceladus, backlit by the Sun",
        narration: "Inspect Cassini's observations of Enceladus's south-polar plumes.",
        response: "Did Cassini find an ocean too?",
        answerImage: "deepspace_images/deepspace_images/Cassini_Huygens/Sl26.jpg",
        answerAlt: "Backlit Enceladus plume view; it does not show the subsurface ocean",
        answer: "Cassini discovered jets of water-rich material escaping from fractures near the moon's south pole. The spacecraft flew through the plumes and analysed their particles and gases. Those measurements showed that Enceladus has a subsurface ocean and chemistry that makes it a compelling place to study the possibility of habitability. Cassini did not detect life. Inspect the plume evidence and its composition: water vapour, ice grains, salts, and organic compounds. Which findings are direct measurements, and which conclusions do scientists draw from them?",
        interaction: "Plume evidence lab: inspect plume imagery and composition; identify direct measurements versus scientific conclusions.",
        visualDescription: "Cassini backlit Enceladus plume image.",
        source: "NASA Photojournal PIA07758; NASA Cassini mission archive",
        imageSourceUrl: "https://photojournal.jpl.nasa.gov/catalog/PIA07758"
      },
      {
        id: "cassini-grand-finale",
        slideTitle: "A planned end at Saturn",
        image: "deepspace_images/deepspace_images/Cassini_Huygens/Sl27.jpg",
        alt: "AI-generated conceptual reconstruction of Cassini near Saturn",
        narration: "Cassini had nearly used up the fuel needed to control its path. Leaving it in orbit could eventually risk an accidental impact with Enceladus or Titan.",
        response: "Why did Cassini have to end by diving into Saturn?",
        answerImage: "deepspace_images/deepspace_images/Cassini_Huygens/Sl28.jpg",
        answerAlt: "AI-generated conceptual reconstruction of Cassini near Saturn",
        answer: "NASA chose a controlled end: Cassini entered Saturn's atmosphere on 15 September 2017, sending data until its signal was lost. That final dive protected the moons it had helped us learn to appreciate. Compare an uncontrolled future orbit with planned disposal; do not assume an unverified exact count of ring-gap dives.",
        interaction: "Grand Finale trajectory: compare an uncontrolled future orbit with planned disposal and follow the final plunge.",
        visualDescription: "AI-generated conceptual reconstruction; not Cassini's final photograph.",
        source: "NASA Cassini Grand Finale timeline; NASA Photojournal; ESA Huygens archive"
      }
    ]
  },
  {
    id: "dawn",
    title: "Dawn — The Ion-Powered Traveller",
    shortLabel: "Exhibit 04",
    location: {
      mission: "Dawn",
      spacecraft: "Dawn spacecraft",
      body: "Ceres and Vesta",
      locationType: "Orbiter; no surface landing",
      visualization: "orbit",
      note: "Dawn orbited Vesta and Ceres. It did not land on either body."
    },
    timeline: "Launched 27 September 2007 • Vesta orbit 2011–2012 • Ceres orbit 2015–2018 • Mission ended 1 November 2018",
    image: "deepspace_images/deepspace_images/Dawn/Sl34_alt1.jpg",
    alt: "Dawn image of Ahuna Mons on Ceres",
    visualDescription: "Dawn spacecraft diagram and ion propulsion system; ion exhaust is faint, not a bright rocket flame.",
    source: "NASA Dawn mission archive; NASA/JPL ion propulsion explainer",
    nodes: [
      {
        id: "dawn-ion-drive",
        slideTitle: "A gentle push over a long time",
        imageSequence: [
          { image: "deepspace_images/deepspace_images/Dawn/Sl30.jpg", alt: "Infographic explaining Dawn's ion propulsion system" }
        ],
        alt: "Infographic explaining Dawn's ion propulsion system",
        narration: "Dawn travelled to two very different worlds: Vesta and Ceres. Instead of relying only on large chemical burns, it used ion propulsion. The engine accelerated charged xenon atoms, producing a tiny thrust that could continue for long periods.",
        response: "How can such a gentle push move a spacecraft across space?",
        answerImage: "deepspace_images/deepspace_images/Dawn/Sl31.jpg",
        answerAlt: "Infographic explaining Dawn's ion propulsion system",
        answer: "An ion engine does not push hard like a launch rocket. It pushes gently but efficiently for a long time. That allowed Dawn to change its orbit and visit both Vesta and Ceres—something no spacecraft had done before. Compare a short strong push with a tiny continuous push over time; this is a simplified physics model.",
        interaction: "Thrust comparison: use a time slider to compare the accumulated effect of a strong short push and a gentle continuous push.",
        visualDescription: "Dawn ion propulsion infographic; conceptual diagrams should not show a conventional chemical-rocket flame.",
        source: "NASA/JPL ion propulsion explainer; NASA Dawn mission archive"
      },
      {
        id: "dawn-vesta-ceres",
        slideTitle: "Vesta: a differentiated world",
        image: "deepspace_images/deepspace_images/Dawn/Sl32.jpg",
        alt: "Global mineral map of Vesta",
        narration: "At Vesta, Dawn mapped enormous impact features and found evidence of a differentiated interior: a world that had separated into layers early in its history.",
        response: "",
        answer: "",
        visualDescription: "Global mineral map of Vesta showing its distinct surface and impact features.",
        source: "NASA Dawn at Vesta; NASA Photojournal PIA15669."
      },
      {
        id: "dawn-ceres-deposits",
        slideTitle: "Ceres: bright salt deposits",
        image: "deepspace_images/deepspace_images/Dawn/Sl32_alt1.jpg",
        alt: "Dawn view of Occator Crater on Ceres",
        narration: "At Ceres, Dawn found bright deposits, especially inside Occator Crater. Scientists identified these deposits as salts, including sodium carbonate, associated with briny material rising from below the surface.",
        response: "Were those white spots ice volcanoes?",
        responseImage: "deepspace_images/deepspace_images/Dawn/Sl33.jpg",
        responseAlt: "Dawn view of Occator Crater on Ceres",
        answerImageSequence: [
          { image: "deepspace_images/deepspace_images/Dawn/Sl34.jpg", alt: "Dawn view of Occator Crater and bright salt-rich deposits on Ceres" }
        ],
        answerAlt: "Ahuna Mons mosaic on Ceres; interpretation is not a direct photograph of an eruption",
        answer: "The bright spots are salt-rich deposits, not simply exposed ice. Dawn also studied Ahuna Mons, a mountain interpreted as a likely cryovolcanic feature. These findings show that Ceres has had geological activity involving briny material. Compare Vesta's giant impact basin and differentiated interior with Ceres' salt deposits and Ahuna Mons.",
        interaction: "Compare worlds: inspect Vesta's impact features and Ceres' salt deposits/Ahuna Mons, then consider what the differences suggest about their histories.",
        visualDescription: "Dawn view of Occator Crater and bright salt-rich deposits on Ceres.",
        source: "NASA Photojournal PIA19889; NASA Dawn mission archive"
      },
      {
        id: "dawn-ceres-orbit",
        slideTitle: "Dawn's quiet orbit around Ceres",
        image: "deepspace_images/deepspace_images/Dawn/Sl35.jpg",
        alt: "AI-generated conceptual view of Dawn in orbit around Ceres",
        narration: "Dawn's mission ended after it ran out of hydrazine fuel in 2018. It remains in orbit around Ceres. The spacecraft is expected to stay there for decades, and its orbit is not a landing or a crash.",
        response: "Where is Dawn now?",
        answerImage: "deepspace_images/deepspace_images/Dawn/Sl36.jpg",
        answerAlt: "AI-generated conceptual view of Dawn in orbit around Ceres",
        answer: "Dawn is an inactive spacecraft in orbit around Ceres. Its orbit changed during the mission and the long-term orbit evolves, so we should not give one fixed altitude as its permanent final orbit.",
        interaction: "Orbit and legacy: identify Dawn's status as inactive and orbiting Ceres, not landed or crashed.",
        visualDescription: "AI-generated conceptual view of Dawn in orbit around Ceres; it is not documentary imagery.",
        source: "NASA Dawn mission archive; NASA Photojournal PIA19889"
      },
      {
        id: "dawn-ahuna-mons",
        slideTitle: "Ahuna Mons",
        image: "deepspace_images/deepspace_images/Dawn/Sl34_alt1.jpg",
        alt: "Dawn image of Ahuna Mons on Ceres",
        narration: "Inspect Ahuna Mons, a mountain interpreted as a likely cryovolcanic feature. A scientific interpretation is built from observations; it is not the same as a direct photograph of an eruption.",
        response: "",
        answer: "",
        interaction: "Inspect Ahuna Mons and distinguish the observed terrain from the cryovolcanic interpretation.",
        visualDescription: "Ahuna Mons on Ceres; label the feature clearly and distinguish interpretation from observation.",
        source: "NASA Photojournal PIA20348"
      }
    ]
  },
  {
    id: "kepler-k2",
    title: "Kepler / K2 — The Planet Hunter",
    shortLabel: "Exhibit 05",
    location: {
      mission: "Kepler / K2",
      spacecraft: "Kepler space telescope",
      body: "Sun–Earth trailing heliocentric orbit",
      locationType: "Space observatory orbit; no surface landing",
      visualization: "heliocentric",
      note: "Kepler observed from space and did not reach a planetary surface."
    },
    timeline: "Launched 6 March 2009 • Reaction-wheel failures 2013 • K2 2014–2018 • Retired 30 October 2018",
    image: "deepspace_images/deepspace_images/Kepler_K2/Sl37.jpg",
    alt: "Kepler's First Light star field",
    visualDescription: "Kepler First Light and field-of-view imagery; transit and light-curve animations are conceptual.",
    source: "NASA Kepler and K2 mission archive; NASA Exoplanet Archive",
    nodes: [
      {
        id: "kepler-transit",
        slideTitle: "Finding planets in a dip of light",
        image: "deepspace_images/deepspace_images/Kepler_K2/Sl37.jpg",
        alt: "A small portion of Kepler's field of view",
        narration: "Not every deep-space explorer travelled to a planet. Kepler was a space telescope designed to answer a profound question: how common are planets around other stars? It watched the brightness of many stars, looking for tiny, repeating dips.",
        response: "How can a tiny dip reveal a planet that is too far away to see?",
        responseImage: "deepspace_images/deepspace_images/Kepler_K2/Sl38.jpg",
        responseAlt: "AI-generated conceptual transit and light-curve diagram, not Kepler telemetry",
        answerImage: "deepspace_images/deepspace_images/Kepler_K2/Sl39.jpg",
        answerAlt: "AI-generated conceptual transit and light-curve diagram, not Kepler telemetry",
        answer: "When a planet passes in front of its star from our point of view, it blocks a little of the star's light. This is called the transit method. A repeated pattern can reveal a planet's size relative to its star and how long it takes to orbit. Inspect three light curves and look for the repeated transit signal; astronomers also rule out other explanations before confirming a planet.",
        interaction: "Transit detective: inspect three light curves and identify the repeating transit signal.",
        visualDescription: "Kepler field-of-view image; the transit and light-curve activity is a conceptual model.",
        source: "NASA Kepler mission archive"
      },
      {
        id: "kepler-k2",
        slideTitle: "K2: a careful pointing strategy",
        image: "deepspace_images/deepspace_images/Kepler_K2/Sl40.jpg",
        alt: "AI-generated conceptual K2 solar-pressure diagram, not mission telemetry",
        narration: "In 2013, two of Kepler's reaction wheels had failed, leaving it unable to point as precisely as before. Engineers developed a new observing strategy called K2. By carefully balancing the spacecraft against pressure from sunlight and using its remaining reaction wheels, Kepler continued collecting useful data along different regions of the sky.",
        response: "So sunlight helped keep the telescope pointed?",
        responseImage: "deepspace_images/deepspace_images/Kepler_K2/Sl41.jpg",
        responseAlt: "AI-generated conceptual K2 solar-pressure diagram, not mission telemetry",
        answerImage: "deepspace_images/deepspace_images/Kepler_K2/Sl42.jpg",
        answerAlt: "AI-generated conceptual K2 solar-pressure diagram, not mission telemetry",
        answer: "Yes—but it was a delicate engineering workaround, not a simple solar sail. The team used the pressure of sunlight as part of the spacecraft's pointing strategy. K2 extended the mission and added many more discoveries.",
        interaction: "Inspect the K2 pointing strategy. Solar pressure was part of a careful control method, not a simple solar sail.",
        visualDescription: "AI-generated conceptual K2 pointing diagram; do not present it as Kepler telemetry.",
        source: "NASA Kepler and K2 mission archive"
      },
      {
        id: "kepler-habitable-zone",
        slideTitle: "Worlds and the habitable zone",
        image: "deepspace_images/deepspace_images/Kepler_K2/Sl43.jpg",
        alt: "Artist's concept of Kepler-186f",
        narration: "Kepler's observations led to thousands of confirmed exoplanets and showed that planets are common in our galaxy. Some orbit in regions where liquid water could exist on a planet's surface, depending on its atmosphere and other conditions. That does not mean those planets are inhabited.",
        response: "What happened when Kepler finally stopped observing?",
        responseImage: "deepspace_images/deepspace_images/Kepler_K2/Sl44.webp",
        responseAlt: "Illustration of the retired Kepler spacecraft",
        answerImage: "deepspace_images/deepspace_images/Kepler_K2/Sl45.webp",
        answerAlt: "Illustration of the retired Kepler spacecraft",
        answer: "NASA retired Kepler in 2018 after it ran out of fuel needed for further operations. It remains in orbit around the Sun, trailing Earth. Its telescope is silent, but its data continues to help scientists study distant worlds.",
        interaction: "Habitable-zone reasoning: compare star brightness, orbital distance, and a simplified temperature range; this does not establish life.",
        visualDescription: "Artist's concept of Kepler-186f; this is not a photograph.",
        source: "NASA Kepler mission archive; NASA Exoplanet Archive; NASA Ames retirement announcement"
      }
    ]
  },
  {
    id: "dart",
    title: "DART — A Test of Planetary Defense",
    shortLabel: "Exhibit 06",
    location: {
      mission: "DART",
      spacecraft: "DART impactor",
      body: "Dimorphos (Didymos binary asteroid system)",
      locationType: "Impact",
      color: [117, 110, 97],
      note: "DART impacted Dimorphos. A verified latitude/longitude for the small-body impact point was not available here, so no marker is shown."
    },
    timeline: "Launched 24 November 2021 • Impacted Dimorphos 26 September 2022 at 23:14 UTC",
    image: "deepspace_images/deepspace_images/Dart/Sl47.png",
    alt: "DART launch on a Falcon 9 rocket from Vandenberg",
    visualDescription: "DART launch and Didymos–Dimorphos imagery; the binary system was a safe, non-threatening test target.",
    source: "NASA DART mission archive and impact result; Johns Hopkins Applied Physics Laboratory DART pages; NASA Photojournal PIA25442–PIA25445; ESA Hera mission page",
    nodes: [
      {
        id: "dart-intro",
        slideTitle: "A kinetic-impact test",
        imageSequence: [
          { image: "deepspace_images/deepspace_images/Dart/Sl46.jpg", alt: "DART launch on a Falcon 9 rocket from Vandenberg" }
        ],
        narration: "Our final spacecraft did something very different. DART—the Double Asteroid Redirection Test—was sent to test whether a spacecraft could deliberately change an asteroid's motion. It was humanity's first full-scale demonstration of the kinetic impactor technique.",
        response: "",
        answer: "",
        visualDescription: "DART launch on a Falcon 9 rocket from Vandenberg.",
        source: "NASA DART mission archive"
      },
      {
        id: "dart-target",
        slideTitle: "A safe target for a kinetic-impact test",
        image: "deepspace_images/deepspace_images/Dart/Sl47.png",
        alt: "Didymos and its smaller moonlet Dimorphos before DART impact",
        narration: "Inspect the Didymos binary asteroid system. Dimorphos is the smaller moonlet; the target was not a threat to Earth.",
        response: "Was Dimorphos going to hit Earth?",
        answerImage: "deepspace_images/deepspace_images/Dart/Sl48.png",
        answerAlt: "Didymos and Dimorphos; the binary system was not a threat to Earth",
        answer: "No. The Didymos system was not a threat to Earth. It was a safe target for an experiment. DART's goal was to hit Dimorphos, the smaller body orbiting the asteroid Didymos, and measure how the impact changed its orbit. Select Didymos or Dimorphos on the labelled model to identify the impact target and the orbit that was measured.",
        interaction: "Target identification: distinguish Didymos from Dimorphos and identify which body's orbit was measured; mark the system non-threatening.",
        visualDescription: "Real Didymos–Dimorphos approach image; Dimorphos is the smaller moonlet.",
        source: "NASA DART mission archive; NASA Photojournal PIA25442–PIA25445"
      },
      {
        id: "dart-final-approach",
        slideTitle: "The final approach",
        image: "deepspace_images/deepspace_images/Dart/Sl49.png",
        alt: "DART image from two seconds before impact, showing only a surface patch",
        narration: "On 26 September 2022, DART struck Dimorphos at about 6.1 kilometres per second. Its camera sent images right up to the final moments. The impact threw material off the asteroid. That escaping debris added a recoil push, helping change Dimorphos's motion.",
        response: "",
        answer: "",
        visualDescription: "Two-second pre-impact image showing a surface patch, not the entire asteroid.",
        source: "NASA DART mission archive; Johns Hopkins Applied Physics Laboratory"
      },
      {
        id: "dart-two-seconds",
        slideTitle: "Two seconds before impact",
        image: "deepspace_images/deepspace_images/Dart/Sl49.png",
        alt: "DART image from two seconds before impact, showing only a surface patch",
        narration: "This final image was taken two seconds before impact. It shows a close surface patch, not the whole asteroid. Compare it with DART's last complete image; the two views are different evidence.",
        response: "",
        answer: "",
        visualDescription: "Two-second image: a surface patch, not a view of the entire asteroid.",
        source: "NASA DART mission archive"
      },
      {
        id: "dart-orbit-measurement",
        slideTitle: "Measuring the orbital change",
        image: "deepspace_images/deepspace_images/Dart/Sl50.jpg",
        alt: "Observation graphic showing the measured change in Dimorphos's orbit",
        narration: "Before impact, Dimorphos took about 11 hours and 55 minutes to orbit Didymos. After impact, the orbital period became shorter. Use the observation graphic to compare the measured periods.",
        response: "Did the collision actually change its orbit?",
        answerImage: "deepspace_images/deepspace_images/Dart/Sl51.jpg",
        answerAlt: "Observation chart showing the measured change in Dimorphos's orbit",
        answer: "Yes. The initial measurement showed a reduction of roughly 32 minutes. The result demonstrated that a kinetic impact can change an asteroid's orbit—an important step in developing planetary-defense methods. Calculate the difference from the displayed values; the precise value depends on the analysis and measurement period.",
        interaction: "Before-and-after orbit lab: compare the measured orbital period and calculate the difference; the precise value depends on analysis and measurement period.",
        visualDescription: "Actual orbital-period observation graphic; not the rejected AI-generated telemetry graph.",
        source: "NASA DART impact-result graphic; NASA Photojournal"
      },
      {
        id: "dart-defense-limits",
        slideTitle: "A test, not a universal solution",
        image: "deepspace_images/deepspace_images/Dart/Sl47.png",
        alt: "Didymos and its smaller moonlet Dimorphos before DART impact",
        narration: "DART demonstrated one planetary-defense technique. It did not solve every asteroid hazard.",
        response: "Does this mean we can stop any asteroid?",
        answer: "Not every asteroid, and not without warning. A real response would depend on an object's size, composition, orbit, and how much time we had. Think through fictional scenarios with different warning times and sizes, and ask what more scientists would need to know.",
        interaction: "Decision scenario: consider fictional objects with varied warning times and sizes; identify needed information without treating the exercise as operational advice.",
        visualDescription: "Decision-making scenario, not an operational response plan.",
        source: "NASA DART mission archive; ESA Hera mission page"
      },
      {
        id: "dart-ejecta",
        slideTitle: "LICIACube observes the ejecta",
        image: "deepspace_images/deepspace_images/Dart/Sl49_alt1.jpeg",
        alt: "Italian Space Agency LICIACube image taken after DART impacted Dimorphos",
        narration: "LICIACube, built by the Italian Space Agency, captured this separate view a few minutes after DART collided with Dimorphos.",
        response: "",
        answer: "",
        visualDescription: "LICIACube observation; keep separate from Hubble's view.",
        source: "Italian Space Agency / ASI LICIACube; NASA DART mission archive"
      },
      {
        id: "dart-hubble",
        slideTitle: "Hubble observes the material tail",
        image: "deepspace_images/deepspace_images/Dart/Sl49_alt2.jpeg",
        alt: "Hubble observation of the material tail behind Dimorphos",
        narration: "NASA's Hubble Space Telescope separately captured the material tail behind Dimorphos. This is a different observation from LICIACube's image.",
        response: "",
        answer: "",
        visualDescription: "NASA Hubble observation; not LICIACube imagery.",
        source: "NASA / ESA Hubble Space Telescope; NASA DART mission archive"
      },
    ]
  },
  {
    id: "finale",
    title: "The Eternal Outposts",
    shortLabel: "Finale",
    location: {
      mission: "Deep Space archive finale",
      spacecraft: "Multiple missions",
      body: "Deep space",
      locationType: "Overview — no single mission location",
      note: "Choose a mission in the Index to view its destination or mission trajectory."
    },
    image: "deepspace_images/deepspace_images/bg.png",
    alt: "Stylized cosmic archive environment; not mission imagery",
    visualDescription: "Schematic Solar System model with each mission's final status labelled; not to scale.",
    source: "NASA Planetary Data System; NASA Exoplanet Archive; NASA Photojournal; NASA Eyes; ESA Huygens archive",
    nodes: [
      {
        id: "evidence-legacy",
        slideTitle: "A mission can end; discovery continues",
        imageSequence: [
          { image: "deepspace_images/deepspace_images/bg.png", alt: "Stylized cosmic archive environment; not mission imagery" }
        ],
        alt: "Stylized cosmic archive environment; not mission imagery",
        narration: "Look at what these machines left behind, USER. Pioneer 10 carried a message from Earth and opened the way to Jupiter. Galileo revealed a world of icy moons and evidence for an ocean beneath Europa. Cassini and Huygens transformed our understanding of Saturn and Titan. Dawn showed us the different histories of Vesta and Ceres. Kepler found planets around distant stars. And DART tested a way to change an asteroid's motion.",
        response: "Some are silent, some were destroyed on purpose, and some are still circling their destinations. But their discoveries are still being used?",
        responseImageSequence: [
          { image: "deepspace_images/deepspace_images/bg.png", alt: "Stylized cosmic archive environment; not mission imagery" }
        ],
        answer: "Exactly. Their hardware tells us how far our engineering reached. Their measurements, images, and archived data continue to guide new questions and new missions. Exploration does not end when a spacecraft falls silent. Choose a discovery and open its primary NASA or ESA data archive. The archive is open. The next question belongs to you: what will you discover, and what evidence will you use to prove it? A mission can end. Discovery doesn't have to.",
        answerImageSequence: [
          { image: "deepspace_images/deepspace_images/bg.png", alt: "Stylized cosmic archive environment; not mission imagery" }
        ],
        finalAnswerImage: "deepspace_images/deepspace_images/bg.png",
        finalAnswerAlt: "Stylized cosmic archive environment; not mission imagery",
        interaction: "Choose an evidence trail: NASA Planetary Data System, NASA Exoplanet Archive, NASA Photojournal, NASA Eyes, ESA Huygens archive, or DART/Hera resources.",
        visualDescription: "Mission paths illuminate in sequence. Final statuses: last signal, planned atmospheric disposal, inactive orbit, retired solar orbit, or completed impact.",
        source: "NASA Planetary Data System; NASA Exoplanet Archive; NASA Photojournal; NASA Eyes; ESA Huygens archive"
      }
    ]
  }
];
