"use strict";

window.MUSEUM_MISSION_ATLAS_DATA = {
  world: "Deep Space",
  missions: [
    {
      id: "pioneer-10",
      exhibitStageIndex: 1,
      name: "Pioneer 10",
      spacecraft: "Pioneer 10",
      destination: "Jupiter flyby, then outbound trajectory",
      body: "Jupiter",
      visualization: "flyby",
      texture: "./deepspace_images/deepspace_images/Pioneer_10/Sl8.webp",
      color: [179, 132, 87],
      textureNote: "Mission image used illustratively; it is not a georeferenced planetary map.",
      trajectories: [
        { startDate: "1973-12-04", endDate: "1973-12-04", kind: "flyby", sourceUrl: "https://science.nasa.gov/mission/pioneer-10/" }
      ],
      summary: "Pioneer 10 flew past Jupiter and continued outward. No current spacecraft position is asserted.",
      sourceUrl: "https://science.nasa.gov/mission/pioneer-10/",
      coordinates: null,
      events: [
        { date: "1972-03-02", type: "launch", title: "Launch", description: "Pioneer 10 launched toward Jupiter." },
        { date: "1972-07-15", type: "arrival", title: "Asteroid belt entry", description: "Pioneer 10 entered the main asteroid belt; it emerged in February 1973." },
        { date: "1973-12-04", type: "flyby", title: "Jupiter closest approach", description: "Pioneer 10 flew past Jupiter. This was a flyby, not an orbit insertion or landing." },
        { date: "1997-03-31", type: "last-contact", title: "Routine contact ended", description: "Routine contact ended; intermittent signals were received later." },
        { date: "2003-01-23", type: "last-contact", title: "Last signal received", description: "Earth received Pioneer 10's final signal. Its precise present position is not shown." }
      ]
    },
    {
      id: "galileo",
      exhibitStageIndex: 2,
      name: "Galileo",
      spacecraft: "Galileo orbiter and atmospheric probe",
      destination: "Jupiter and its moons",
      body: "Jupiter",
      visualization: "orbit",
      texture: "./deepspace_images/deepspace_images/Pioneer_10/Sl8.webp",
      color: [179, 132, 87],
      textureNote: "Pioneer 10's Jupiter encounter image is reused for Galileo's destination; it is not a Galileo image or georeferenced map.",
      orbitalPhases: [
        { startDate: "1995-12-07", endDate: "2003-09-21", sourceUrl: "https://science.nasa.gov/mission/galileo/", model: "schematic-equatorial" }
      ],
      summary: "Galileo orbited Jupiter. Its separate atmospheric probe entered Jupiter's atmosphere; the orbiter was later disposed of in Jupiter.",
      sourceUrl: "https://science.nasa.gov/mission/galileo/",
      coordinates: null,
      events: [
        { date: "1989-10-18", type: "launch", title: "Launch", description: "Galileo launched from Space Shuttle Atlantis." },
        { date: "1995-07-13", type: "deployment", title: "Atmospheric probe released", description: "Galileo released its atmospheric probe before arriving at Jupiter." },
        { date: "1995-12-07", type: "orbit", title: "Jupiter orbit insertion", description: "Galileo entered orbit around Jupiter; its atmospheric probe descended into the planet the same day." },
        { date: "1997-12-07", type: "mission", title: "Primary mission completed", description: "The primary science mission ended and extended operations followed." },
        { date: "2003-09-21", type: "mission-end", title: "Planned Jupiter disposal", description: "Galileo deliberately entered Jupiter's atmosphere. Jupiter has no solid surface landing location." }
      ]
    },
    {
      id: "cassini-huygens",
      exhibitStageIndex: 3,
      name: "Cassini–Huygens",
      spacecraft: "Cassini orbiter and Huygens lander",
      destination: "Saturn system; Huygens landed on Titan",
      body: "Saturn",
      visualization: "orbit",
      texture: null,
      color: [180, 161, 122],
      orbitalPhases: [
        { startDate: "2004-07-01", endDate: "2017-09-15", sourceUrl: "https://science.nasa.gov/mission/cassini-huygens/", model: "schematic-equatorial" }
      ],
      summary: "Cassini orbited Saturn. Huygens separated and landed on Titan; Cassini ended with a planned Saturn entry.",
      sourceUrl: "https://science.nasa.gov/mission/cassini-huygens/",
      coordinates: null,
      events: [
        { date: "1997-10-15", type: "launch", title: "Launch", description: "Cassini–Huygens launched from Cape Canaveral." },
        { date: "2004-07-01", type: "orbit", title: "Saturn orbit insertion", description: "Cassini entered orbit around Saturn." },
        { date: "2004-12-25", type: "deployment", title: "Huygens released", description: "Cassini released ESA's Huygens probe for its descent to Titan." },
        { date: "2005-01-14", type: "landing", title: "Huygens lands on Titan", body: "Titan", visualization: "surface", description: "Huygens descended through Titan's atmosphere and reached its surface. No coordinate marker is shown because this record lacks a verified landing coordinate.", surfaceEvent: true },
        { date: "2017-09-15", type: "mission-end", title: "Cassini enters Saturn", description: "Cassini ended its mission in a planned entry into Saturn's atmosphere." }
      ]
    },
    {
      id: "dawn",
      exhibitStageIndex: 4,
      name: "Dawn",
      spacecraft: "Dawn spacecraft",
      destination: "Vesta and Ceres",
      body: "Ceres",
      visualization: "orbit",
      texture: "./deepspace_images/deepspace_images/Dawn/Sl33.jpg",
      color: [125, 115, 107],
      textureNote: "Ceres' Occator image is illustrative only and is not a georeferenced global map.",
      orbitalPhases: [
        { startDate: "2011-07-16", endDate: "2012-09-05", sourceUrl: "https://science.nasa.gov/mission/dawn/", body: "Vesta", model: "schematic-equatorial" },
        { startDate: "2015-03-06", endDate: "2018-11-01", sourceUrl: "https://science.nasa.gov/mission/dawn/", body: "Ceres", model: "schematic-equatorial" }
      ],
      summary: "Dawn orbited both Vesta and Ceres. It remained in orbit around Ceres when its mission ended.",
      sourceUrl: "https://science.nasa.gov/mission/dawn/",
      coordinates: null,
      events: [
        { date: "2007-09-27", type: "launch", title: "Launch", description: "Dawn launched toward the asteroid belt." },
        { date: "2011-07-16", type: "orbit", title: "Vesta orbit insertion", body: "Vesta", description: "Dawn became the first spacecraft to orbit Vesta." },
        { date: "2015-03-06", type: "orbit", title: "Ceres orbit insertion", body: "Ceres", description: "Dawn entered orbit around dwarf planet Ceres." },
        { date: "2018-11-01", type: "mission-end", title: "Mission ended", description: "Dawn's mission ended after it depleted its hydrazine; it remains in orbit around Ceres." }
      ]
    },
    {
      id: "kepler-k2",
      exhibitStageIndex: 5,
      name: "Kepler / K2",
      spacecraft: "Kepler space telescope",
      destination: "Sun–Earth trailing heliocentric orbit",
      body: "Solar System",
      visualization: "heliocentric",
      color: [43, 62, 103],
      textureNote: "Schematic orbital view; no exact spacecraft position or path is plotted.",
      trajectories: [
        { startDate: "2009-03-06", endDate: "2018-10-30", kind: "heliocentric", sourceUrl: "https://science.nasa.gov/mission/kepler/" }
      ],
      summary: "Kepler observed stars from space. It did not travel to or land on a planet.",
      sourceUrl: "https://science.nasa.gov/mission/kepler/",
      coordinates: null,
      events: [
        { date: "2009-03-06", type: "launch", title: "Launch", description: "Kepler launched to search for planets by measuring repeated changes in starlight." },
        { date: "2013-05", type: "mission", title: "Original mission changes", description: "A second reaction-wheel failure ended the original pointing mode. NASA's cited record establishes May 2013, not an exact day." },
        { date: "2014", type: "mission", title: "K2 observations begin", description: "The repurposed K2 mission began observations using a modified pointing strategy. The cited record establishes the year, not an exact day." },
        { date: "2018-10-30", type: "mission-end", title: "Retired", description: "NASA retired Kepler after it ran out of fuel." }
      ]
    },
    {
      id: "dart",
      exhibitStageIndex: 6,
      name: "DART",
      spacecraft: "DART impactor",
      destination: "Dimorphos, in the Didymos asteroid system",
      body: "Dimorphos",
      visualization: "impact",
      texture: null,
      color: [112, 99, 82],
      trajectories: [
        { startDate: "2022-09-26", endDate: "2022-09-26", kind: "impact", sourceUrl: "https://science.nasa.gov/mission/dart/" }
      ],
      summary: "DART deliberately impacted Dimorphos in a planetary-defense test. It was not a landing.",
      sourceUrl: "https://science.nasa.gov/mission/dart/",
      coordinates: null,
      events: [
        { date: "2021-11-24", type: "launch", title: "Launch", description: "DART launched from Vandenberg Space Force Base." },
        { date: "2022-09-11", type: "deployment", title: "LICIACube deployed", description: "The Italian Space Agency's companion CubeSat separated ahead of DART's impact." },
        { date: "2022-09-26", type: "impact", title: "Dimorphos impact", description: "DART deliberately struck Dimorphos at 23:14 UTC to test kinetic impact. No landing coordinates are plotted.", surfaceEvent: true }
      ]
    }
  ]
};
