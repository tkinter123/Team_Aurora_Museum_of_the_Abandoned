"use strict";

window.MUSEUM_MISSION_ATLAS_DATA = {
  world: "Mars",
  missions: [
    {
      id: "viking-1",
      exhibitStageIndex: 1,
      name: "Viking 1",
      spacecraft: "Viking 1 lander",
      destination: "Chryse Planitia, Mars",
      body: "Mars",
      visualization: "surface",
      color: [184, 89, 46],
      summary: "Viking 1's lander returned the first images from the surface of Mars.",
      sourceUrl: "https://science.nasa.gov/mission/viking-1/",
      coordinateSourceUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075C",
      coordinates: {
        latitude: 22.27,
        longitude: 312.05,
        latitudeLabel: "22.27° N",
        longitudeLabel: "312.05° E",
        referenceFrame: "NASA NSSDCA planetocentric coordinates",
        type: "landing"
      },
      events: [
        { date: "1975-08-20", type: "launch", title: "Launch", description: "Viking 1 launched toward Mars." },
        { date: "1976-06-19", type: "orbit", title: "Mars orbit insertion", description: "The Viking 1 spacecraft entered orbit around Mars." },
        { date: "1976-07-20", type: "landing", title: "Lander touchdown", description: "The Viking 1 lander touched down at Chryse Planitia.", surfaceEvent: true },
        { date: "1982-11-11", type: "last-contact", title: "Lander stops operating", description: "NASA's Viking 1 mission history dates the faulty-command shutdown to this day." }
      ]
    },
    {
      id: "mars-pathfinder",
      exhibitStageIndex: 2,
      name: "Mars Pathfinder & Sojourner",
      spacecraft: "Carl Sagan Memorial Station and Sojourner rover",
      destination: "Ares Vallis, Mars",
      body: "Mars",
      visualization: "surface",
      color: [184, 89, 46],
      summary: "Mars Pathfinder landed a stationary lander and deployed the Sojourner rover at Ares Vallis.",
      sourceUrl: "https://science.nasa.gov/mission/mars-pathfinder/",
      coordinateSourceUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-068A",
      coordinates: {
        latitude: 19.33,
        longitude: -33.55,
        latitudeLabel: "19.33° N",
        longitudeLabel: "33.55° W",
        referenceFrame: "NASA NSSDCA coordinates",
        type: "landing"
      },
      events: [
        { date: "1996-12-04", type: "launch", title: "Launch", description: "Mars Pathfinder launched toward Mars." },
        { date: "1997-07-04", type: "landing", title: "Pathfinder lands at Ares Vallis", description: "The lander touched down and later deployed Sojourner nearby.", surfaceEvent: true },
        { date: "1997-09-27", type: "last-contact", title: "Last data transmission", description: "The final Pathfinder data transmission was received on Earth." },
        { date: "1998-03-10", type: "mission-end", title: "Mission concluded", description: "NASA ended the mission after attempts to restore communication." }
      ]
    },
    {
      id: "opportunity",
      exhibitStageIndex: 3,
      name: "Opportunity",
      spacecraft: "Opportunity rover",
      destination: "Meridiani Planum, Mars",
      body: "Mars",
      visualization: "surface",
      color: [184, 89, 46],
      summary: "Opportunity was a solar-powered rover that explored Meridiani Planum.",
      sourceUrl: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/",
      coordinateSourceUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A",
      coordinates: {
        latitude: -1.946,
        longitude: 354.473,
        latitudeLabel: "1.946° S",
        longitudeLabel: "354.473° E",
        referenceFrame: "NASA NSSDCA IAU 2000 body-centered coordinates",
        type: "landing"
      },
      events: [
        { date: "2003-07-07", type: "launch", title: "Launch", description: "Opportunity launched as one of NASA's Mars Exploration Rovers." },
        { date: "2004-01-25", type: "landing", title: "Opportunity lands at Meridiani Planum", description: "Opportunity landed on Mars and began its surface mission.", surfaceEvent: true },
        { date: "2018-06-10", type: "last-contact", title: "Final communication", description: "Earth received Opportunity's last communication during a planet-wide dust storm." },
        { date: "2019-02-13", type: "mission-end", title: "Mission declared complete", description: "NASA declared the Opportunity mission complete after recovery attempts." }
      ]
    },
    {
      id: "curiosity",
      exhibitStageIndex: 4,
      name: "Curiosity",
      spacecraft: "Curiosity rover",
      destination: "Gale Crater, Mars",
      body: "Mars",
      visualization: "surface",
      color: [184, 89, 46],
      summary: "Curiosity is an active rover exploring Gale Crater.",
      sourceUrl: "https://science.nasa.gov/mission/msl-curiosity/",
      coordinates: null,
      events: [
        { date: "2011-11-26", type: "launch", title: "Launch", description: "The Mars Science Laboratory launched with the Curiosity rover." },
        { date: "2012-08-06", type: "landing", title: "Curiosity lands in Gale Crater", description: "The Curiosity rover landed in Gale Crater and began its surface mission.", surfaceEvent: true }
      ]
    },
    {
      id: "perseverance-ingenuity",
      exhibitStageIndex: 5,
      name: "Perseverance & Ingenuity",
      spacecraft: "Perseverance rover and Ingenuity helicopter",
      destination: "Jezero Crater, Mars",
      body: "Mars",
      visualization: "surface",
      color: [184, 89, 46],
      summary: "Perseverance is an active rover; Ingenuity completed its flight demonstration after 72 flights.",
      sourceUrl: "https://science.nasa.gov/mission/mars-2020-perseverance/",
      coordinates: null,
      events: [
        { date: "2020-07-30", type: "launch", title: "Launch", description: "The Mars 2020 mission launched with Perseverance and Ingenuity." },
        { date: "2021-02-18", type: "landing", title: "Perseverance lands in Jezero Crater", description: "Perseverance landed in Jezero Crater; Ingenuity was later deployed from the rover.", surfaceEvent: true },
        { date: "2024-01-18", type: "flight", title: "Ingenuity Flight 72", description: "Ingenuity completed its final flight after rotor damage ended the technology demonstration." }
      ]
    }
  ]
};
