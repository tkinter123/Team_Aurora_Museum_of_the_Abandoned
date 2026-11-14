"use strict";

window.DEEP_SPACE_EVIDENCE_SOURCES = {
  "dsn-signal": [
    {
      title: "What is the Deep Space Network?",
      organization: "NASA",
      url: "https://www.nasa.gov/communicating-with-missions/dsn/",
      supports: "Three geographically separated antenna complexes maintain spacecraft communications as Earth rotates.",
      status: "partial",
      statusText: "The page does not verify the narration's specific signal-noise processing explanation."
    }
  ],
  "six-outposts": [
    {
      title: "Pioneer 10",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/pioneer-10/",
      supports: "Pioneer 10 mission and its Jupiter flyby."
    },
    {
      title: "Galileo",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/galileo/",
      supports: "Galileo mission and deliberate Jupiter disposal."
    },
    {
      title: "Cassini: About the Mission",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/cassini/about-the-mission/",
      supports: "Cassini-Huygens mission, partners, Saturn and Titan."
    },
    {
      title: "Dawn",
      organization: "NASA NSSDCA",
      url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2007-043A",
      supports: "Dawn's Vesta and Ceres mission."
    },
    {
      title: "Kepler / K2",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/kepler/",
      supports: "Kepler and K2 exoplanet mission."
    },
    {
      title: "Double Asteroid Redirection Test (DART)",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/dart/",
      supports: "DART's kinetic-impact mission."
    }
  ],
  "pioneer-belt": [
    {
      title: "Pioneer 10",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/pioneer-10/",
      supports: "Launch, asteroid-belt crossing, Jupiter encounter, and spacecraft mission history."
    }
  ],
  "pioneer-jupiter": [
    {
      title: "Pioneer 10",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/pioneer-10/",
      supports: "Pioneer 10's Jupiter encounter and images.",
      status: "conflict",
      statusText: "NASA lists closest approach as Dec. 4, 1973; this narration says Dec. 3. The date discrepancy is flagged, not changed."
    }
  ],
  "pioneer-plaque": [
    {
      title: "Pioneer Plaque",
      organization: "NASA Science / NASA Ames",
      url: "https://science.nasa.gov/resource/pioneer-plaque/",
      supports: "The plaques carried by Pioneer 10 and 11, their human figures, and the message's location information.",
      status: "partial",
      statusText: "This page does not verify all design credits or the narration's hydrogen-transition detail."
    }
  ],
  "pioneer-last-signal": [
    {
      title: "Pioneer 10",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/pioneer-10/",
      supports: "Final signal received Jan. 23, 2003, and the spacecraft's general direction."
    },
    {
      title: "JPL Horizons Ephemeris: Pioneer 10, Jan. 23–24, 2003",
      organization: "NASA/JPL Solar System Dynamics",
      url: "https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND=-23&OBJ_DATA=YES&MAKE_EPHEM=YES&EPHEM_TYPE=VECTORS&CENTER=500%4010&START_TIME=2003-01-23&STOP_TIME=2003-01-24&STEP_SIZE=1d&VEC_TABLE=2",
      supports: "Heliocentric trajectory vectors place Pioneer 10 at approximately 82.1 AU from the Sun on Jan. 23–24, 2003.",
      status: "partial",
      statusText: "The ephemeris covers the calendar day, not the exact signal-reception instant."
    },
    {
      title: "Pioneer Plaque",
      organization: "NASA Science",
      url: "https://science.nasa.gov/resource/pioneer-plaque/",
      supports: "Pioneer 10's projected direction toward Aldebaran.",
      status: "partial",
      statusText: "This is a projected direction, not a targeted rendezvous."
    }
  ],
  "galileo-antenna": [
    {
      title: "Galileo",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/galileo/",
      supports: "Launch, high-gain antenna deployment failure, data-handling workaround, and use of the low-gain antenna."
    }
  ],
  "galileo-europa": [
    {
      title: "Galileo",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/galileo/",
      supports: "Galileo's Europa observations and evidence for a possible subsurface ocean."
    },
    {
      title: "Europa's Ocean",
      organization: "NASA Science",
      url: "https://science.nasa.gov/missions/apollo/europas-ocean/",
      supports: "Galileo magnetic-field observations and the scientific interpretation of a possible ocean beneath Europa's ice."
    }
  ],
  "galileo-life": [
    {
      title: "Galileo",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/galileo/",
      supports: "Galileo's Europa ocean evidence and the scope of its discoveries.",
      status: "partial",
      statusText: "The source describes evidence for a possible ocean; it does not report a life detection."
    }
  ],
  "galileo-disposal": [
    {
      title: "Galileo",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/galileo/",
      supports: "Galileo's intentional impact into Jupiter on Sept. 21, 2003, to protect Europa."
    }
  ],
  "cassini-titan": [
    {
      title: "Cassini: About the Mission",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/cassini/about-the-mission/",
      supports: "NASA, ESA, and ASI partnership; Cassini orbiter and ESA Huygens lander."
    },
    {
      title: "Huygens",
      organization: "ESA Planetary Science Archive",
      url: "https://www.cosmos.esa.int/web/psa/huygens",
      supports: "Huygens mission, Titan landing, and the archived descent and landing data."
    }
  ],
  "huygens-titan": [
    {
      title: "Cassini: About the Mission",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/cassini/about-the-mission/",
      supports: "Huygens' Titan descent, landing, returned images, and methane-wet surface description."
    },
    {
      title: "Huygens",
      organization: "ESA Planetary Science Archive",
      url: "https://www.cosmos.esa.int/web/psa/huygens",
      supports: "Titan landing date and Huygens descent and landing data archive."
    }
  ],
  "cassini-enceladus": [
    {
      title: "Enceladus",
      organization: "NASA Science",
      url: "https://science.nasa.gov/saturn/moons/enceladus/",
      supports: "Cassini's water-rich plumes, sampled material, and evidence for a subsurface ocean."
    },
    {
      title: "Cassini: About the Mission",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/cassini/about-the-mission/",
      supports: "Cassini's Enceladus plume discovery and mission findings."
    }
  ],
  "cassini-grand-finale": [
    {
      title: "Cassini: About the Mission",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/cassini/about-the-mission/",
      supports: "Cassini's final Titan flyby, Grand Finale orbits, and Sept. 15, 2017 atmospheric entry."
    },
    {
      title: "Grand Finale Overview",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/cassini/grand-finale/overview/",
      supports: "Cassini's final ring-gap orbits and planned end of mission."
    }
  ],
  "dawn-ion-drive": [
    {
      title: "Dawn",
      organization: "NASA NSSDCA",
      url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2007-043A",
      supports: "Dawn's xenon ion-propulsion system and visits to Vesta and Ceres."
    }
  ],
  "dawn-vesta-ceres": [
    {
      title: "Dawn at Vesta",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/dawn/science/vesta/",
      supports: "Dawn's gravity-field measurements and evidence that Vesta underwent extensive early melting and differentiation.",
      status: "partial",
      statusText: "NASA's 2025 interior study revisits how completely Vesta differentiated; the narration reflects the long-standing interpretation."
    },
    {
      title: "Global Mineral Map of Vesta (PIA15669)",
      organization: "NASA/JPL-Caltech/UCLA/INAF/MPS/DLR/IDA",
      url: "https://science.nasa.gov/photojournal/global-mineral-map-of-vesta/",
      supports: "Dawn's spectral map distinguishes mineral-rich upper- and lower-crust regions."
    },
    {
      title: "NASA Studies Reveal Hidden Secrets About Interiors of Moon, Vesta",
      organization: "NASA",
      url: "https://www.nasa.gov/solar-system/asteroids/vesta/nasa-studies-reveal-hidden-secrets-about-interiors-of-moon-vesta/",
      supports: "Recent inertia measurements and uncertainty about Vesta's core and internal structure.",
      status: "conflict",
      statusText: "Newer results allow a mostly homogeneous interior, so the exact degree of differentiation remains under study."
    }
  ],
  "dawn-ceres-deposits": [
    {
      title: "Stars on Occator's Floor (PIA22980)",
      organization: "NASA/JPL-Caltech/UCLA/MPS/DLR/IDA/PSI",
      url: "https://science.nasa.gov/photojournal/stars-on-occators-floor/",
      supports: "Occator's Vinalia Faculae are salt deposits, particularly sodium carbonate, possibly extruded through fractures from a deep salty-liquid reservoir.",
      status: "partial",
      statusText: "The proposed fracture and reservoir connection is an interpretation, not a directly observed process."
    },
    {
      title: "Vinalia Faculae Up Close (PIA22478)",
      organization: "NASA/JPL-Caltech/UCLA/MPS/DLR/IDA",
      url: "https://science.nasa.gov/photojournal/vinalia-faculae-up-close/",
      supports: "The bright material is mostly sodium carbonate, and its exposure on the crater floor involved a liquid source.",
      status: "partial",
      statusText: "The source does not establish that brine is currently rising."
    }
  ],
  "dawn-ceres-orbit": [
    {
      title: "Dawn",
      organization: "NASA NSSDCA",
      url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2007-043A",
      supports: "Dawn's Ceres mission and spacecraft status."
    }
  ],
  "dawn-ahuna-mons": [
    {
      title: "NASA Discovers 'Lonely Mountain' on Ceres Likely a Salty-Mud Cryovolcano",
      organization: "NASA",
      url: "https://www.nasa.gov/missions/nasa-discovers-lonely-mountain-on-ceres-likely-a-salty-mud-cryovolcano/",
      supports: "Ahuna Mons likely formed as a salty-mud volcano, based on Dawn observations and its volcanic-dome-like features.",
      status: "partial",
      statusText: "Cryovolcanism is a scientific interpretation; no eruption was observed."
    },
    {
      title: "Ahuna Mons Seen from LAMO",
      organization: "NASA/JPL-Caltech/UCLA/MPS/DLR/IDA/PSI",
      url: "https://science.nasa.gov/photojournal/ahuna-mons-seen-from-lamo/",
      supports: "Dawn's image and measured topography of Ahuna Mons.",
      status: "partial",
      statusText: "The Photojournal caption says formation processes are under investigation; it does not verify a cryovolcanic interpretation."
    }
  ],
  "kepler-transit": [
    {
      title: "Kepler / K2",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/kepler/",
      supports: "Kepler's transit method, repeated dips in stellar brightness, and exoplanet discoveries."
    }
  ],
  "kepler-k2": [
    {
      title: "Kepler / K2",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/kepler/",
      supports: "Reaction-wheel failures, sunlight-pressure pointing strategy, and the K2 observing mission."
    }
  ],
  "kepler-habitable-zone": [
    {
      title: "Kepler / K2",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/kepler/",
      supports: "Kepler exoplanet discoveries, habitable-zone context, and retirement after fuel depletion."
    },
    {
      title: "NASA Exoplanet Archive",
      organization: "NASA Exoplanet Science Institute / Caltech",
      url: "https://exoplanetarchive.ipac.caltech.edu/",
      supports: "NASA's searchable exoplanet catalog and Kepler/K2 mission products."
    }
  ],
  "dart-intro": [
    {
      title: "Double Asteroid Redirection Test (DART)",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/dart/",
      supports: "DART's kinetic-impact objective, launch, target, and impact date."
    }
  ],
  "dart-target": [
    {
      title: "Double Asteroid Redirection Test (DART)",
      organization: "NASA Science",
      url: "https://science.nasa.gov/mission/dart/",
      supports: "Didymos and Dimorphos target system and DART's impact objective."
    },
    {
      title: "NASA Confirms DART Mission Impact Changed Asteroid's Motion in Space",
      organization: "Johns Hopkins Applied Physics Laboratory",
      url: "https://dart.jhuapl.edu/News-and-Resources/article.php?id=20221011",
      supports: "The Didymos system posed no hazard to Earth."
    }
  ],
  "dart-final-approach": [
    {
      title: "NASA Confirms DART Mission Impact Changed Asteroid's Motion in Space",
      organization: "Johns Hopkins Applied Physics Laboratory",
      url: "https://dart.jhuapl.edu/News-and-Resources/article.php?id=20221011",
      supports: "DART's terminal approach, impact, and ejecta observations."
    }
  ],
  "dart-two-seconds": [
    {
      title: "NASA Confirms DART Mission Impact Changed Asteroid's Motion in Space",
      organization: "Johns Hopkins Applied Physics Laboratory",
      url: "https://dart.jhuapl.edu/News-and-Resources/article.php?id=20221011",
      supports: "DART's terminal-approach imagery and intentional impact."
    }
  ],
  "dart-orbit-measurement": [
    {
      title: "NASA Confirms DART Mission Impact Changed Asteroid's Motion in Space",
      organization: "Johns Hopkins Applied Physics Laboratory",
      url: "https://dart.jhuapl.edu/News-and-Resources/article.php?id=20221011",
      supports: "The initial 32-minute orbital-period reduction, approximately ±2-minute uncertainty, and ejecta recoil."
    }
  ],
  "dart-defense-limits": [
    {
      title: "NASA Confirms DART Mission Impact Changed Asteroid's Motion in Space",
      organization: "Johns Hopkins Applied Physics Laboratory",
      url: "https://dart.jhuapl.edu/News-and-Resources/article.php?id=20221011",
      supports: "The need to learn more about asteroid physical properties before predicting future deflection performance."
    },
    {
      title: "Hera",
      organization: "European Space Agency",
      url: "https://www.esa.int/Space_Safety/Hera",
      supports: "Follow-up study of the DART impact and asteroid system."
    }
  ],
  "dart-ejecta": [
    {
      title: "Light Italian Cubesat for Imaging of Asteroids (LICIACube)",
      organization: "Italian Space Agency",
      url: "https://www.asi.it/en/planets-stars-universe/solar-system-and-beyond/liciacube/",
      supports: "LICIACube's role and post-impact imaging of the DART target."
    },
    {
      title: "NASA Confirms DART Mission Impact Changed Asteroid's Motion in Space",
      organization: "Johns Hopkins Applied Physics Laboratory",
      url: "https://dart.jhuapl.edu/News-and-Resources/article.php?id=20221011",
      supports: "Ejecta observations and recoil contribution to the impact."
    }
  ],
  "dart-hubble": [
    {
      title: "NASA Confirms DART Mission Impact Changed Asteroid's Motion in Space",
      organization: "Johns Hopkins Applied Physics Laboratory",
      url: "https://dart.jhuapl.edu/News-and-Resources/article.php?id=20221011",
      supports: "Hubble observations of the debris plume after impact."
    }
  ],
  "evidence-legacy": [
    {
      title: "NASA Planetary Data System",
      organization: "NASA",
      url: "https://pds.nasa.gov/",
      supports: "Long-term archive for NASA planetary mission data."
    },
    {
      title: "NASA Exoplanet Archive",
      organization: "NASA Exoplanet Science Institute / Caltech",
      url: "https://exoplanetarchive.ipac.caltech.edu/",
      supports: "Kepler and K2 exoplanet catalog and mission products."
    },
    {
      title: "NASA Photojournal",
      organization: "NASA",
      url: "https://science.nasa.gov/photojournal/",
      supports: "NASA planetary image and media archive; this is not a primary science-data archive."
    },
    {
      title: "Huygens",
      organization: "ESA Planetary Science Archive",
      url: "https://www.cosmos.esa.int/web/psa/huygens",
      supports: "Archived Huygens descent and landing data."
    }
  ]
};

window.DEEP_SPACE_IMAGE_SOURCE_RECORDS = {
  "deepspace_images/deepspace_images/Cassini_Huygens/Sl22.jpg": {
    imageFile: "Sl22.jpg",
    title: "Launch of Cassini Orbiter and Huygens Probe on Titan IV (PIA01051)",
    organization: "NASA/JPL/KSC",
    url: "https://science.nasa.gov/photojournal/launch-of-cassini-orbiter-and-huygens-probe-on-titan-iv-2/",
    imageType: "Launch photograph",
    statusText: "Verified by exact byte match to the selected source file and its NASA Photojournal record."
  },
  "deepspace_images/deepspace_images/Cassini_Huygens/Sl25.jpg": {
    imageFile: "Sl25.jpg",
    title: "Fountains of Enceladus (PIA07758)",
    organization: "NASA/JPL/Space Science Institute",
    url: "https://science.nasa.gov/photojournal/fountains-of-enceladus/",
    imageType: "Cassini image",
    statusText: "Verified by exact byte match to the selected source file and its NASA Photojournal record."
  },
  "deepspace_images/deepspace_images/Cassini_Huygens/Sl26.jpg": {
    imageFile: "Sl26.jpg",
    title: "Fountains of Enceladus (PIA07758)",
    organization: "NASA/JPL/Space Science Institute",
    url: "https://science.nasa.gov/photojournal/fountains-of-enceladus/",
    imageType: "Cassini image",
    statusText: "Verified by exact byte match to the selected source file and its NASA Photojournal record."
  },
  "deepspace_images/deepspace_images/Dawn/Sl32.jpg": {
    imageFile: "Sl32.jpg",
    title: "Global Mineral Map of Vesta (PIA15669)",
    organization: "NASA/JPL-Caltech/UCLA/INAF/MPS/DLR/IDA",
    url: "https://science.nasa.gov/photojournal/global-mineral-map-of-vesta/",
    imageType: "Scientific mineral-distribution map",
    statusText: "Verified by exact byte match to the selected source file and its NASA Photojournal record."
  },
  "deepspace_images/deepspace_images/Dawn/Sl32_alt1.jpg": {
    imageFile: "Sl32_alt1.jpg",
    title: "Dawn Takes a Closer Look at Occator (PIA19889)",
    organization: "NASA/JPL-Caltech/UCLA/MPS/DLR/IDA",
    url: "https://science.nasa.gov/photojournal/dawn-takes-a-closer-look-at-occator/",
    imageType: "Composite crater image",
    statusText: "Verified by exact byte match to the selected source file and its NASA Photojournal record."
  },
  "deepspace_images/deepspace_images/Dawn/Sl33.jpg": {
    imageFile: "Sl33.jpg",
    title: "Dawn Takes a Closer Look at Occator (PIA19889)",
    organization: "NASA/JPL-Caltech/UCLA/MPS/DLR/IDA",
    url: "https://science.nasa.gov/photojournal/dawn-takes-a-closer-look-at-occator/",
    imageType: "Composite crater image",
    statusText: "Verified by exact byte match to the selected source file and its NASA Photojournal record."
  },
  "deepspace_images/deepspace_images/Dawn/Sl34.jpg": {
    imageFile: "Sl34.jpg",
    title: "Dawn Takes a Closer Look at Occator (PIA19889)",
    organization: "NASA/JPL-Caltech/UCLA/MPS/DLR/IDA",
    url: "https://science.nasa.gov/photojournal/dawn-takes-a-closer-look-at-occator/",
    imageType: "Composite crater image",
    statusText: "Verified by exact byte match to the selected source file and its NASA Photojournal record."
  },
  "deepspace_images/deepspace_images/Dawn/Sl34_alt1.jpg": {
    imageFile: "Sl34_alt1.jpg",
    title: "Ahuna Mons Seen from LAMO (PIA20348)",
    organization: "NASA/JPL-Caltech/UCLA/MPS/DLR/IDA/PSI",
    url: "https://science.nasa.gov/photojournal/ahuna-mons-seen-from-lamo/",
    imageType: "Image mosaic",
    statusText: "Verified by exact byte match to the selected source file and its NASA Photojournal record."
  },
  "deepspace_images/deepspace_images/Dawn/Sl54_alt4.jpg": {
    imageFile: "Sl54_alt4.jpg",
    title: "Dawn Takes a Closer Look at Occator (PIA19889)",
    organization: "NASA/JPL-Caltech/UCLA/MPS/DLR/IDA",
    url: "https://science.nasa.gov/photojournal/dawn-takes-a-closer-look-at-occator/",
    imageType: "Composite crater image",
    statusText: "Verified by exact byte match to the selected source file and its NASA Photojournal record."
  },
  "deepspace_images/deepspace_images/Dawn/Sl55_alt4.jpg": {
    imageFile: "Sl55_alt4.jpg",
    title: "Dawn Takes a Closer Look at Occator (PIA19889)",
    organization: "NASA/JPL-Caltech/UCLA/MPS/DLR/IDA",
    url: "https://science.nasa.gov/photojournal/dawn-takes-a-closer-look-at-occator/",
    imageType: "Composite crater image",
    statusText: "Verified by exact byte match to the selected source file and its NASA Photojournal record."
  },
  "deepspace_images/deepspace_images/Dawn/Sl56_alt4.jpg": {
    imageFile: "Sl56_alt4.jpg",
    title: "Dawn Takes a Closer Look at Occator (PIA19889)",
    organization: "NASA/JPL-Caltech/UCLA/MPS/DLR/IDA",
    url: "https://science.nasa.gov/photojournal/dawn-takes-a-closer-look-at-occator/",
    imageType: "Composite crater image",
    statusText: "Verified by exact byte match to the selected source file and its NASA Photojournal record."
  },
  "deepspace_images/deepspace_images/Galileo/Sl12.jpg": {
    imageFile: "Sl12.jpg",
    title: "Deployment of Galileo and the IUS (PIA00727)",
    organization: "NASA/JPL/KSC",
    url: "https://science.nasa.gov/photojournal/deployment-of-galileo-and-the-ius/",
    imageType: "Documentary photograph",
    statusText: "Verified by exact byte match to the selected source file and its NASA Photojournal record."
  },
  "deepspace_images/deepspace_images/Galileo/Sl17.jpg": {
    imageFile: "Sl17.jpg",
    title: "Natural and False Color Views of Europa (PIA00502)",
    organization: "NASA/JPL/DLR",
    url: "https://science.nasa.gov/missions/europa-clipper/europa-clipper-resources/natural-and-false-color-views-of-europa/",
    imageType: "Natural- and false-color composite",
    statusText: "Verified by exact byte match to the selected source file and its NASA image record."
  },
  "deepspace_images/deepspace_images/Galileo/Sl18.jpg": {
    imageFile: "Sl18.jpg",
    title: "Natural and False Color Views of Europa (PIA00502)",
    organization: "NASA/JPL/DLR",
    url: "https://science.nasa.gov/missions/europa-clipper/europa-clipper-resources/natural-and-false-color-views-of-europa/",
    imageType: "Natural- and false-color composite",
    statusText: "Verified by exact byte match to the selected source file and its NASA image record."
  },
  "deepspace_images/deepspace_images/Kepler_K2/Sl37.jpg": {
    imageFile: "Sl37.jpg",
    title: "Host to 'Hot Jupiter' (PIA11985)",
    organization: "NASA/JPL-Caltech",
    url: "https://science.nasa.gov/photojournal/host-to-hot-jupiter/",
    imageType: "Kepler star-field image",
    statusText: "Verified by exact byte match to the selected source file and its NASA Photojournal record."
  },
  "deepspace_images/deepspace_images/Kepler_K2/Sl54_alt5.jpg": {
    imageFile: "Sl54_alt5.jpg",
    title: "Host to 'Hot Jupiter' (PIA11985)",
    organization: "NASA/JPL-Caltech",
    url: "https://science.nasa.gov/photojournal/host-to-hot-jupiter/",
    imageType: "Kepler star-field image",
    statusText: "Verified by exact byte match to the selected source file and its NASA Photojournal record."
  },
  "deepspace_images/deepspace_images/Kepler_K2/Sl55_alt5.jpg": {
    imageFile: "Sl55_alt5.jpg",
    title: "Host to 'Hot Jupiter' (PIA11985)",
    organization: "NASA/JPL-Caltech",
    url: "https://science.nasa.gov/photojournal/host-to-hot-jupiter/",
    imageType: "Kepler star-field image",
    statusText: "Verified by exact byte match to the selected source file and its NASA Photojournal record."
  },
  "deepspace_images/deepspace_images/Kepler_K2/Sl56_alt5.jpg": {
    imageFile: "Sl56_alt5.jpg",
    title: "Host to 'Hot Jupiter' (PIA11985)",
    organization: "NASA/JPL-Caltech",
    url: "https://science.nasa.gov/photojournal/host-to-hot-jupiter/",
    imageType: "Kepler star-field image",
    statusText: "Verified by exact byte match to the selected source file and its NASA Photojournal record."
  },
  "deepspace_images/deepspace_images/Kepler_K2/Sl43.jpg": {
    imageFile: "Sl43.jpg",
    title: "Kepler-186f, the First Earth-size Planet in the Habitable Zone (Artist's Concept) (PIA17999)",
    organization: "NASA/Ames/SETI Institute/JPL-Caltech",
    url: "https://science.nasa.gov/photojournal/kepler-186f-the-first-earth-size-planet-in-the-habitable-zone-artists-concept/",
    imageType: "Artist's concept",
    statusText: "Verified by exact byte match to the selected source file and its NASA Photojournal record."
  }
};
