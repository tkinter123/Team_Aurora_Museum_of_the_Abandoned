"use strict";

(() => {
  const voiceSelection = window.museumVoiceSelection;
  if (!voiceSelection) {
    throw new Error("Shared voice selection is unavailable. Check that voice-selection.js loads first.");
  }

  const apollo11EagleMedia = [
    {
      src: "./moon_images/Apollo11/Sl7_AI_Gen.png",
      alt: "Diagram of the Apollo Lunar Module Eagle and its stages"
    },
    {
      src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl7(Ai generated).png",
      alt: "Apollo Lunar Module Eagle on the lunar surface"
    }
  ];

  const storyStages = [
    {
      title: "The Silent Outposts",
      shortLabel: "Prologue",
      location: {
        mission: "Moon archive overview",
        spacecraft: "Multiple missions",
        body: "Moon",
        locationType: "Overview - no single landing location",
        note: "Choose a mission in the Index to view its specific destination."
      },
      image: null,
      alt: "",
      nodes: [
        {
          image: "./moon_images/Prologue/Sl1.jpg",
          alt: "Global map showing the Moon's geological regions",
          narration: "Welcome to the Off-World Archive, Explorer. Look closely at the Moon on your screen. To most people on Earth, it looks like a dead, gray sphere of dust and craters. But its surface holds a record of human engineering.",
          response: "Wait a second, Dr. Fredrick. Are there really machines still sitting on the Moon? Were they too heavy to bring home?",
          answer: "Many objects were left by design, while other hardware came to rest after planned impacts. Apollo crews also left equipment that was never meant to return. A small passive laser reflector can still return some laser pulses when observing conditions allow; it needs no battery. These are not simply forgotten machines: each left evidence or a scientific record. Ready to meet the first one? Let's tune our signal to Mare Cognitum."
        }
      ]
    },
    {
      title: "Ranger 7 \u2014 The Terminal Plunge",
      shortLabel: "Ranger 7",
      location: {
        mission: "Ranger 7",
        spacecraft: "Ranger 7 impact spacecraft",
        body: "Moon",
        locationType: "Impact",
        latitude: -10.633333,
        longitude: -20.6,
        latitudeLabel: "10 deg 38 min S",
        longitudeLabel: "20 deg 36 min W",
        verified: true,
        sourceUrl: "https://science.nasa.gov/mission/ranger-7/",
        texture: "./data/wac_preview.png",
        color: [118, 116, 108],
        note: "NASA reports the impact point at 10 deg 38 min S, 20 deg 36 min W."
      },
      image: null,
      alt: "",
      nodes: [
        {
          image: "./moon_images/Apollo15/abc.jpeg",
          alt: "Ranger 7 spacecraft infographic",
          narration: "The year is 1964. The Cold War is blazing, and President Kennedy has promised to land humans on the Moon before 1970. But there was a terrifying problem: scientists had no idea what the lunar surface was actually made of.",
          response: "Wait, seriously? They were building giant Saturn V rockets, and they didn't even know if the Moon was solid rock or quicksand?",
          answer: "Some researchers raised the dust-bowl concern: billions of years of impacts might have created deep, loose dust. A lander could sink into it, putting a crewed landing at risk. Telescopes on Earth could not resolve objects smaller than a football stadium. NASA needed extreme close-up photographs, so it built Ranger 7."
        },
        {
          image: "./moon_images/Ranger7/Sl1.jpg",
          alt: "Ranger 7 spacecraft infographic",
          narration: "",
          response: "Hold on: if they needed pictures, why not put on retro-rockets and gently orbit the Moon? Why build a probe designed to smash itself to pieces?",
          answer: "Weight and speed, Leo. In 1964, rocket engines could not carry enough fuel to brake a spacecraft into orbit and still carry six high-resolution television cameras. Engineers aimed Ranger 7 toward the surface so its cameras could get close enough to photograph it. Six vidicon cameras transmitted analog television signals to the Goldstone Tracking Station in California. On July 31, 1964, Ranger 7 struck Mare Cognitum at 2.62 kilometres per second. In its final seventeen minutes, it sent 4,316 images. Its last image came from about 400 metres above the surface, just 2.3 seconds before impact."
        },
        {
          image: "./moon_images/Ranger7/Sl2.jpg",
          alt: "Map showing the Ranger 7 impact location",
          narration: "",
          response: "Two point three seconds before impact?! That's crazy! But did those photos actually answer the question, or did it just blow up for nothing?",
          answer: "The images changed what scientists could see. They showed small impact craters and surface details, and helped planners assess possible Apollo landing areas. They did not directly measure the ground's bearing strength or prove a continuous basalt layer; Surveyor later performed direct soil tests. Ranger 7 ended in an impact, leaving debris at its site and images and mission records here on Earth."
        }
      ]
    },
    {
      title: "Apollo 11",
      shortLabel: "Apollo 11",
      location: {
        mission: "Apollo 11",
        spacecraft: "Apollo 11 Lunar Module Eagle",
        body: "Moon",
        locationType: "Crewed landing",
        latitude: 0.67416,
        longitude: 23.47314,
        latitudeLabel: "0.67416 deg N",
        longitudeLabel: "23.47314 deg E",
        verified: true,
        sourceUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C",
        texture: "./data/wac_preview.png",
        color: [118, 116, 108],
        note: "NASA NSSDCA coordinates use the DE 421 mean Earth/polar rotation axis reference frame."
      },
      image: null,
      alt: "",
      nodes: [
        {
          section: "What",
          storySlideNumber: 1,
          answerSlideNumber: 2,
          media: [
            {
              src: "./moon_images/Apollo11/Sl1.jpg",
              alt: "Apollo 11 astronaut standing beside the Lunar Module on the Moon"
            },
            {
              src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl1.png",
              alt: "Apollo 11 astronaut beside the Lunar Module"
            },
            {
              src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl1_.png",
              alt: "Apollo 11 astronaut portrait against a lunar backdrop"
            }
          ],
          narration: "Meet Apollo 11, the first mission to land humans on the Moon. On July 20, 1969, humanity walked on another world for the first time in history.",
          response: "Wow! People actually walked on the Moon? What was it like?",
          answer: "Yes! The Moon had soft, grey dust, and because of its low gravity, the astronauts could take big, bouncy steps!"
        },
        {
          section: "Why",
          storySlideNumber: 3,
          media: [
            {
              src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl3.png",
              alt: "Earth above the lunar horizon"
            },
            {
              src: "./moon_images/Apollo11/Apollo 11/ Apollo 11 Sl3_png.png",
              alt: "Apollo Lunar Module descending over the Moon"
            }
          ],
          narration: "Previous Apollo missions had helped NASA learn how to travel to and orbit the Moon. Apollo 11 was the next step: to land humans on the Moon, explore its surface, and safely return them to Earth.",
          answer: ""
        },
        {
          section: "How",
          storySlideNumber: 4,
          media: [
            {
              src: "./moon_images/Apollo11/Sl4.webp",
              alt: "Saturn V rocket launching"
            },
            {
              src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl4.png",
              alt: "Saturn V rocket launching"
            }
          ],
          narration: "The journey began with the powerful Saturn V rocket, which carried the astronauts towards the Moon.",
          answer: ""
        },
        {
          section: "How",
          storySlideNumber: 5,
          answerSlideNumber: 6,
          media: [
            {
              src: "./moon_images/Apollo11/Sl5.jpg",
              alt: "Apollo 11 crew portrait"
            },
            {
              src: "./moon_images/Apollo11/Sl5'.jpg",
              alt: "Apollo 11 astronaut working on the lunar surface"
            },
            {
              src: "./moon_images/Apollo11/Sl5''.jpg",
              alt: "Black-and-white photograph of several men examining a display"
            },
            {
              src: "./moon_images/Apollo11/Sl5'''.jpg",
              alt: "Lunar Laser Ranging Retroreflector on the Moon"
            },
            {
              src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl5.png",
              alt: "Apollo 11 crew portrait"
            },
            {
              src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl5_.png",
              alt: "Apollo 11 astronaut portrait"
            },
            {
              src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl5_(1).png",
              alt: "Apollo 11 astronaut portrait"
            },
            {
              src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl5_(2).png",
              alt: "Apollo 11 astronaut portrait"
            }
          ],
          narration: "Armstrong and Aldrin entered the Lunar Module, Eagle, and used its engines and landing radar to reach the surface. Meanwhile, Collins remained in lunar orbit aboard Columbia. After exploring the Moon, Neil Armstrong and Buzz Aldrin launched back into orbit, reunited with Collins, and began their journey home.",
          response: "Hold on! If two astronauts went down to the Moon, how did they get back up? Wasn't there any rocket waiting for them?",
          answer: "Actually, Eagle had its own small rocket engine! It lifted Armstrong and Aldrin back into orbit, where Collins was waiting for them."
        },
        {
          section: "Hardware",
          storySlideNumber: 7,
          answerSlideNumber: 8,
          media: apollo11EagleMedia,
          mediaGroup: "apollo11-eagle",
          narration: "This is Apollo Lunar Module: Eagle. It was specially designed to fly in the Moon's airless, low-gravity environment. Its descent engine could be throttled to control the landing speed, while its landing radar measured the spacecraft's height and speed above the surface.",
          response: "Wait, how did it land without a runway or air to slow it down?",
          answer: "Its rocket engine pushed against the lunar surface's gravity, slowing the spacecraft for a gentle landing. Special landing legs absorbed the impact and kept Eagle stable on the uneven ground!"
        },
        {
          section: "Outcome",
          storySlideNumber: 8,
          media: apollo11EagleMedia,
          mediaGroup: "apollo11-eagle",
          narration: "",
          response: "What else did we achieve from this mission?",
          answer: "The outcome section."
        },
        {
          section: "Outcome",
          storySlideNumber: 9,
          media: [
            {
              src: "./moon_images/Apollo11/Sl9.jpeg",
              alt: "Apollo 11 astronaut working on the Moon"
            },
            {
              src: "./moon_images/Apollo11/Sl9'.jpeg",
              alt: "Black-and-white photograph of several men examining a lunar display"
            },
            {
              src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl9.png",
              alt: "Apollo 11 astronaut on the lunar surface"
            },
            {
              src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl9_.png",
              alt: "Black-and-white photograph of men examining a lunar display"
            }
          ],
          narration: "Apollo 11 brought back about 21.6 kilograms of Moon rocks and soil, helping scientists understand the Moon's history.",
          answer: ""
        },
        {
          section: "Outcome",
          storySlideNumber: 10,
          media: [
            {
              src: "./moon_images/Apollo11/Sl10.jpeg",
              alt: "Apollo 11 Lunar Laser Ranging Retroreflector on the Moon"
            }
          ],
          narration: "The astronauts also left scientific instruments behind, including a laser reflector that is still used to measure the distance between Earth and the Moon. Most importantly, the mission proved that humans could land on another world, explore it, and return safely.",
          answer: ""
        }
      ]
    },
    {
      title: "Surveyor 3 & Intrepid \u2014 The Robotic Reunion",
      shortLabel: "Surveyor 3 & Intrepid",
      location: {
        mission: "Surveyor 3",
        spacecraft: "Surveyor 3 lander",
        body: "Moon",
        locationType: "Robotic soft landing",
        sourceUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A",
        texture: "./data/wac_preview.png",
        color: [118, 116, 108],
        note: "NASA confirms the Oceanus Procellarum site and that Apollo 12 landed within about 180 m. Surveyor 3's own coordinates were not verified here, so no marker is shown."
      },
      image: null,
      alt: "",
      nodes: [
        {
          image: "./moon_images/Surveyor3/Sl1.png",
          alt: "Surveyor 3 spacecraft infographic",
          answerImage: "./moon_images/Surveyor3/Sl2.jpg",
          answerAlt: "Surveyor 3 on the lunar surface",
          narration: "Two years before Apollo 11, in April 1967, NASA landed an uncrewed robotic probe called Surveyor 3 in the Ocean of Storms. Its landing radar and thrusters did not produce a perfectly smooth touchdown; the spacecraft bounced before settling.",
          response: "If a probe bounces thirty feet in low gravity, how didn't it smash its instruments? Did it actually do any useful science before dying?",
          answer: "It was tougher than anyone expected. Surveyor 3 had a motorized mechanical arm with a digging scoop. Ground operators commanded it to dig four trenches and conduct bearing tests, pressing into the soil with about ten pounds per square inch of force. Those tests provided direct evidence about the surface. Surveyor 3 operated for about two weeks before its radio went silent, then remained at the site until Apollo 12 arrived about thirty-one months later."
        },
        {
          image: "./moon_images/Surveyor3/Sl3.jpg",
          alt: "Surveyor 3 and Apollo 12 Intrepid landing-site map",
          narration: "",
          response: "Wait, if Surveyor 3 was already dead and silent, why did NASA make Apollo 12 land right next to it? Wasn't landing next to an obstacle incredibly dangerous?",
          answer: "It was a challenging landing, Leo, but the precision approach was part of the mission. Apollo 11 had landed several miles from its target; future missions needed to demonstrate more precise navigation. Pete Conrad brought Intrepid down about 180 metres from Surveyor 3, according to NASA's mission record. On their second moonwalk, Conrad and Alan Bean crossed the crater area to examine the older spacecraft."
        },
        {
          image: null,
          alt: "",
          narration: "",
          response: "They took bolt cutters to an alien world?! What did they do, steal parts off the robot? What could they possibly learn from an old camera?",
          answer: "They removed Surveyor's television camera, soil-sampling scoop, and sections of aluminum tubing, then returned them to Earth for examination. NASA's curatorial report documented changes to the hardware after more than two and a half years on the lunar surface, including discoloration of optical coatings and micrometeoroid effects on exposed materials. These returned parts gave engineers direct evidence of how real spacecraft hardware aged in the lunar environment."
        }
      ]
    },
    {
      title: "Apollo 15 Lunar Rover \u2014 The Chariot at Hadley",
      shortLabel: "Apollo 15 Lunar Rover",
      location: {
        mission: "Apollo 15",
        spacecraft: "Apollo 15 Lunar Module Falcon",
        body: "Moon",
        locationType: "Crewed landing",
        latitude: 26.13239,
        longitude: 3.6333,
        latitudeLabel: "26.13239 deg N",
        longitudeLabel: "3.63330 deg E",
        verified: true,
        sourceUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C",
        texture: "./data/wac_preview.png",
        color: [118, 116, 108],
        note: "NASA NSSDCA coordinates use the DE 421 mean Earth/polar rotation axis reference frame."
      },
      image: null,
      alt: "",
      nodes: [
        {
          image: "./moon_images/Apollo15/Sl1.png",
          alt: "Lunar Roving Vehicle components",
          answerImage: "./moon_images/Apollo15/Sl2.jpg",
          answerAlt: "Apollo 15 Lunar Rover deployment sequence",
          narration: "By 1971, NASA had proved that astronauts could land and work on the Moon. But Apollo 11, 12, and 14 crews were limited by how far they could walk in spacesuits while carrying life-support equipment. To reach more geological features, the next mission needed wheels.",
          response: "How on Earth did they pack an entire electric car into an Apollo lunar lander? Those things looked crammed enough with just two astronauts!",
          answer: "Mechanical origami. Boeing and General Motors built a rover with a folding aluminum chassis that fit into a compact space on the outside of Lunar Module Falcon. Dave Scott and Jim Irwin released it after landing, and it unfolded on the surface. The rover weighed about 460 pounds on Earth and used four independent electric motors. Its wire-mesh wheels were designed for the lunar surface and vacuum."
        },
        {
          image: "./moon_images/Apollo15/Sl4.jpg",
          alt: "Hadley Delta and Hadley Rille terrain at the Apollo 15 site",
          narration: "",
          response: "Driving twenty-eight kilometers across mountains sounds like an incredible road trip, but what did that mobility actually discover that walkers couldn't have found?",
          answer: "The rover helped the crew reach geological sites such as Spur Crater, where Dave Scott collected sample 15415, nicknamed the Genesis Rock. The anorthosite is about 4.1 billion years old and supports the Lunar Magma Ocean hypothesis. One rock is important evidence, but it does not prove that hypothesis by itself."
        },
        {
          image: null,
          alt: "",
          narration: "",
          response: "And when they left, why park the rover with its TV camera pointing right at the lander?",
          answer: "So viewers on Earth could watch the ascent. Ground controller Ed Fendell remotely operated the rover's color camera from Houston and tilted it to film Falcon's ascent stage. NASA's mission history places the rover about 500 feet, or roughly 150 metres, from the Lunar Module, not 300 metres. The rover remained at the site after travelling about 27.9 kilometres. Its engineering demonstrated the value of lunar surface mobility; future Artemis vehicle schedules are not established by this mission."
        }
      ]
    },
    {
      title: "LCROSS & Centaur \u2014 Cracking the Cold Traps",
      shortLabel: "LCROSS & Centaur",
      location: {
        mission: "LCROSS",
        spacecraft: "Centaur upper stage impact; LCROSS spacecraft followed",
        body: "Moon",
        locationType: "Impact at Cabeus crater",
        sourceUrl: "https://science.nasa.gov/mission/lcross/",
        texture: "./data/wac_preview.png",
        color: [118, 116, 108],
        note: "NASA confirms the impacts in Cabeus crater near the lunar south pole. Exact coordinates were not verified here, so no marker is shown."
      },
      image: null,
      alt: "",
      nodes: [
        {
          image: "./moon_images/LCROSS/Sl3.jpg",
          alt: "Permanently shadowed regions near the lunar south pole",
          answerImage: "./moon_images/LCROSS/Sl1.jpg",
          answerAlt: "LCROSS spacecraft and Centaur upper stage infographic",
          narration: "For decades, scientists asked whether water ice could survive near the lunar poles. Some craters are permanently shadowed: sunlight does not reach their floors, and temperatures can remain extremely low.",
          response: "If a crater is pitched in absolute darkness and colder than Pluto, how could any satellite see inside? You can't take a picture of pitch black!",
          answer: "You don't take a picture, Leo. You send an impactor. In 2009, NASA launched the Lunar Crater Observation and Sensing Satellite, or LCROSS. Its Centaur upper stage was deliberately directed into Cabeus Crater near the lunar south pole so instruments could examine material lifted by the impact."
        },
        {
          image: null,
          alt: "",
          answerImage: "./moon_images/LCROSS/Sl2.jpg",
          answerAlt: "Lunar south-pole map showing the LCROSS impact location",
          narration: "",
          response: "They deliberately crashed a two-ton rocket into the Moon at nine thousand kilometers per hour?! What did that explosion actually do?",
          answer: "On October 9, 2009, the Centaur struck Cabeus at about 9,000 kilometres per hour. NASA reported that the impact excavated roughly 350 metric tons of material and created a crater about 20 metres wide. The plume rose into sunlight. Four minutes later, the LCROSS shepherding spacecraft flew through it with nine spectrometers recording data before it too struck the Moon."
        },
        {
          image: null,
          alt: "",
          answerImage: "./moon_images/LCROSS/Sl4.jpeg",
          answerAlt: "South-pole sunlight path and illumination visual",
          narration: "",
          response: "Wait, how do you prove there's water just by flying through a cloud of dust? Wouldn't the explosion destroy it?",
          answer: "Spectroscopy, Leo. Compounds absorb and reflect particular wavelengths of light. As sunlight illuminated the plume, LCROSS's near-infrared spectrometer recorded absorption features associated with water and hydroxyl. Analyses estimated water ice at about 5.5 percent by mass in material from Cabeus; that is an estimate for the sampled region, not a measurement for every lunar crater. NASA also reported about 155 kilograms of water in the plume."
        },
        {
          image: null,
          alt: "",
          narration: "",
          response: "So the Moon isn't bone-dry after all! But why does finding ice inside a freezing crater matter so much for future astronauts?",
          answer: "Water ice could be useful if it can be located, extracted, and processed. It could potentially provide water for crews and feed systems that produce oxygen or propellant. Those possibilities are not guaranteed resources: the amount, accessibility, and practicality of harvesting ice still require investigation. LCROSS provided evidence of water in a lunar cold trap; it did not turn the Moon into a ready-made filling station."
        }
      ]
    },
    {
      title: "The Monuments of the Next Frontier",
      shortLabel: "Finale",
      location: {
        mission: "Lunar archive finale",
        spacecraft: "Multiple missions",
        body: "Moon",
        locationType: "Overview - no single landing location",
        note: "Choose a mission in the Index to view its specific destination."
      },
      image: null,
      alt: "",
      nodes: [
        {
          image: "./moon_images/Finale/Sl1.jpg",
          alt: "Global map of lunar mission locations from different countries",
          narration: "Take a step back, Leo. Ranger 7 sent images until impact and helped planners assess lunar terrain. Apollo 11 left a descent stage and a passive laser reflector. Surveyor 3 tested the soil, and Apollo 12 returned some of its hardware. The Apollo 15 rover reached geological sites beyond walking distance. LCROSS used a deliberate impact to investigate a permanently shadowed crater.",
          response: "So when the Artemis astronauts touch down at the South Pole, they won't be landing on an empty world at all, will they?",
          answer: "They will arrive at a world already explored by decades of robotic and human missions. Their batteries may be cold and their transmitters silent, but the evidence they sent home remains. The greatest monument on the lunar surface is not only hardware; it is the open data waiting in our archives for the next generation to examine and build upon."
        }
      ]
    }
  ];

  const slideSourceCatalog = {
    0: {
      0: {
        scientificReferenceUrl: "https://trek.nasa.gov/moon/",
        imageSourceUrl: "https://trek.nasa.gov/moon/",
        imageCredit: "NASA Moon Trek / NASA PDS lunar data",
        label: "[SCIENTIFIC SOURCE ↗]"
      }
    },
    1: {
      0: {
        scientificReferenceUrl: "https://science.nasa.gov/mission/ranger-7/",
        imageSourceUrl: "https://science.nasa.gov/resource/ranger-7-moon-close-up/",
        imageCredit: "NASA / JPL Ranger 7 mission photography",
        label: "[SCIENTIFIC SOURCE ↗]"
      },
      1: {
        scientificReferenceUrl: "https://science.nasa.gov/resource/ranger-7-moon-close-up/",
        imageSourceUrl: "https://science.nasa.gov/resource/ranger-7-moon-close-up/",
        imageCredit: "NASA / JPL Ranger 7 mission photography",
        label: "[SCIENTIFIC SOURCE ↗]"
      },
      2: {
        scientificReferenceUrl: "https://science.nasa.gov/mission/ranger-7/",
        imageSourceUrl: "https://www.lpi.usra.edu/resources/ranger/",
        imageCredit: "Lunar and Planetary Institute Ranger archive",
        label: "[SCIENTIFIC SOURCE ↗]"
      }
    },
    2: {
      0: {
        scientificReferenceUrl: "https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11ov.html",
        imageSourceUrl: "https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11ov.html",
        imageCredit: "NASA Apollo 11 mission archive",
        label: "[SCIENTIFIC SOURCE ↗]"
      },
      1: {
        scientificReferenceUrl: "https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/A11_PAOMissionReport.html",
        imageSourceUrl: "https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/A11_PAOMissionReport.html",
        imageCredit: "NASA Apollo 11 mission report",
        label: "[SCIENTIFIC SOURCE ↗]"
      },
      6: {
        scientificReferenceUrl: "https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/A11_PAOMissionReport.html",
        imageSourceUrl: "https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/A11_PAOMissionReport.html",
        imageCredit: "NASA Apollo 11 mission report",
        label: "[SCIENTIFIC SOURCE ↗]"
      },
      7: {
        scientificReferenceUrl: "https://ilrs.cddis.eosdis.nasa.gov/science/scienceContributions/lunar_data.html",
        imageSourceUrl: "https://ilrs.cddis.eosdis.nasa.gov/science/scienceContributions/lunar_data.html",
        imageCredit: "NASA CDDIS / ILRS lunar laser ranging archive",
        label: "[SCIENTIFIC SOURCE ↗]"
      }
    },
    3: {
      0: {
        scientificReferenceUrl: "https://science.nasa.gov/mission/surveyor-3/",
        imageSourceUrl: "https://science.nasa.gov/mission/surveyor-3/",
        imageCredit: "NASA Surveyor 3 mission archive",
        label: "[SCIENTIFIC SOURCE ↗]"
      },
      1: {
        scientificReferenceUrl: "https://www.nasa.gov/missions/lunar-reconnaissance-orbiter-looks-at-apollo-12-surveyor-3-landing-sites/",
        imageSourceUrl: "https://www.nasa.gov/missions/lunar-reconnaissance-orbiter-looks-at-apollo-12-surveyor-3-landing-sites/",
        imageCredit: "NASA LRO Apollo 12 / Surveyor 3 landing-site overview",
        label: "[SCIENTIFIC SOURCE ↗]"
      },
      2: {
        scientificReferenceUrl: "https://ntrs.nasa.gov/citations/19710008092",
        imageSourceUrl: "https://ntrs.nasa.gov/citations/19710008092",
        imageCredit: "NASA NTRS Surveyor 3 returned-parts report",
        label: "[SCIENTIFIC SOURCE ↗]"
      }
    },
    4: {
      0: {
        scientificReferenceUrl: "https://www.nasa.gov/wp-content/uploads/static/history/alsj/WOTM/WOTM-LRVPerformance.html",
        imageSourceUrl: "https://www.nasa.gov/wp-content/uploads/static/history/alsj/WOTM/WOTM-LRVPerformance.html",
        imageCredit: "NASA Apollo 15 Lunar Roving Vehicle archive",
        label: "[SCIENTIFIC SOURCE ↗]"
      },
      1: {
        scientificReferenceUrl: "https://an.rsl.wustl.edu/apollo/data/A15/pages/resources.html",
        imageSourceUrl: "https://an.rsl.wustl.edu/apollo/data/A15/pages/resources.html",
        imageCredit: "Washington University Apollo 15 analyst's notebook",
        label: "[SCIENTIFIC SOURCE ↗]"
      },
      2: {
        scientificReferenceUrl: "https://ntrs.nasa.gov/citations/19720021182",
        imageSourceUrl: "https://ntrs.nasa.gov/citations/19720021182",
        imageCredit: "NASA Apollo 15 mission report",
        label: "[SCIENTIFIC SOURCE ↗]"
      }
    },
    5: {
      0: {
        scientificReferenceUrl: "https://science.nasa.gov/mission/lcross/",
        imageSourceUrl: "https://science.nasa.gov/mission/lcross/",
        imageCredit: "NASA LCROSS mission archive",
        label: "[SCIENTIFIC SOURCE ↗]"
      },
      1: {
        scientificReferenceUrl: "https://science.nasa.gov/mission/lcross/",
        imageSourceUrl: "https://science.nasa.gov/mission/lcross/",
        imageCredit: "NASA LCROSS mission archive",
        label: "[SCIENTIFIC SOURCE ↗]"
      },
      2: {
        scientificReferenceUrl: "https://science.nasa.gov/mission/lcross/",
        imageSourceUrl: "https://science.nasa.gov/mission/lcross/",
        imageCredit: "NASA LCROSS mission archive",
        label: "[SCIENTIFIC SOURCE ↗]"
      },
      3: {
        scientificReferenceUrl: "https://science.nasa.gov/mission/lcross/",
        imageSourceUrl: "https://science.nasa.gov/mission/lcross/",
        imageCredit: "NASA LCROSS mission archive",
        label: "[SCIENTIFIC SOURCE ↗]"
      }
    },
    6: {
      0: {
        scientificReferenceUrl: "https://science.nasa.gov/solar-system/",
        imageSourceUrl: "https://trek.nasa.gov/moon/",
        imageCredit: "NASA Moon Trek / Solar System archive",
        label: "[SCIENTIFIC SOURCE ↗]"
      }
    }
  };

  function getSlideSourceMeta(slide) {
    if (!slide) return null;
    const stageEntries = slideSourceCatalog[slide.stageIndex];
    if (!stageEntries) return null;
    return stageEntries[slide.nodeIndex] || null;
  }

  function renderEvidenceLink(slide) {
    if (!dialogueWrap) return;
    const sourceMeta = getSlideSourceMeta(slide);
    const existing = dialogueWrap.querySelector(".story-evidence");
    if (!sourceMeta?.scientificReferenceUrl) {
      existing?.remove();
      return;
    }
    if (!existing) {
      const evidence = document.createElement("div");
      evidence.className = "story-evidence";
      dialogueWrap.appendChild(evidence);
    }
    const evidence = dialogueWrap.querySelector(".story-evidence");
    if (!evidence) return;
    evidence.innerHTML = `
      <a href="${sourceMeta.scientificReferenceUrl}" target="_blank" rel="noopener noreferrer">${sourceMeta.label || "[SCIENTIFIC SOURCE ↗]"}</a>
    `;
  }

  function splitNarration(text, maxCharacters = 260) {
    const segments = [];
    text.split(/\n+/).forEach((paragraph) => {
      const sentences = paragraph.trim().split(/(?<=[.!?])\s+/u).filter(Boolean);
      let segment = "";
      sentences.forEach((sentence) => {
        if (sentence.length > maxCharacters) {
          if (segment) segments.push(segment);
          segment = "";
          sentence.split(/\s+/).forEach((word) => {
            const combined = segment ? `${segment} ${word}` : word;
            if (segment && combined.length > maxCharacters) {
              segments.push(segment);
              segment = word;
            } else {
              segment = combined;
            }
          });
          return;
        }
        const combined = segment ? `${segment} ${sentence}` : sentence;
        if (segment && combined.length > maxCharacters) {
          segments.push(segment);
          segment = sentence;
        } else {
          segment = combined;
        }
      });
      if (segment) segments.push(segment);
    });
    return segments;
  }

  function getSlideVisual(slide) {
    const { stage, node } = slide;
    const hasImage = node.image !== undefined;
    const hasAnswerImage = node.answerImage !== undefined;
    if (slide.conversationState === "answer" && hasAnswerImage) {
      return {
        image: node.answerImage,
        alt: node.answerAlt === undefined ? node.alt || stage.alt || "" : node.answerAlt
      };
    }
    if (Array.isArray(node.media) && node.media.length > 0) {
      const activeMedia = node.media[state.activeMediaIndex % node.media.length];
      return {
        image: activeMedia.src,
        alt: activeMedia.alt || node.alt || stage.alt || ""
      };
    }
    const explanationImage = hasImage
      ? node.image
      : hasAnswerImage ? null : stage.image;
    const imageAlt = node.alt || stage.alt || "";
    return { image: explanationImage, alt: imageAlt };
  }

  const missionOverviewByStage = {
    "Ranger 7": {
      image: "../Breakdown_Images/Moon Misssions Breakdown/Ranger_7_3.jpg",
      alt: "Ranger 7 mission overview"
    },
    "Surveyor 3 & Intrepid": {
      image: "../Breakdown_Images/Moon Misssions Breakdown/Surveyor3_3_.png",
      alt: "Surveyor 3 mission overview"
    },
    "Apollo 15 Lunar Rover": {
      image: "../Breakdown_Images/Moon Misssions Breakdown/Apollo15(LRV)_3_.png",
      alt: "Apollo 15 Lunar Roving Vehicle mission overview"
    },
    "LCROSS & Centaur": {
      image: "../Breakdown_Images/Moon Misssions Breakdown/LCROSS_3_.jpg",
      alt: "LCROSS and Centaur mission overview"
    }
  };

  /* =========================================
     MANUAL MISSION IMAGE POSITION CONTROLS
     Coordinates use a 1920 x 1080 virtual canvas in CSS-pixel units.
     x/y mark each image box's top-left; width/height scale with the canvas.
     Set height to "auto" to use the source's aspect ratio. Images use contain.
     visible: "on-slide" follows existing navigation, true keeps an image
     visible across slides, and false hides it.
  ========================================= */
  const missionImageCoordinateSystem = { width: 1920, height: 1080 };
  const missionImageControls = {
    prologueMoonMap: {
      src: "./moon_images/Prologue/Sl1.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    ranger7OpeningInfographic: {
      src: "./moon_images/Apollo15/abc.jpeg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    ranger7ImpactApproach: {
      src: "./moon_images/Ranger7/Sl1.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    ranger7LunarSurface: {
      src: "./moon_images/Ranger7/Sl2.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    ranger7MissionOverview: {
      src: "../Breakdown_Images/Moon Misssions Breakdown/Ranger_7_3.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11Opening: {
      src: "./moon_images/Apollo11/Sl1.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11OpeningArchive: {
      src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl1.png",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11OpeningArchivePortrait: {
      src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl1_.png",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11WhyOverview: {
      src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl3.png",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11WhyLunarModule: {
      src: "./moon_images/Apollo11/Apollo 11/ Apollo 11 Sl3_png.png",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11SaturnV: {
      src: "./moon_images/Apollo11/Sl4.webp",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11SaturnVArchive: {
      src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl4.png",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11JourneyCrew: {
      src: "./moon_images/Apollo11/Sl5.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11JourneySurface: {
      src: "./moon_images/Apollo11/Sl5'.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11JourneyDisplay: {
      src: "./moon_images/Apollo11/Sl5''.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11JourneyReflector: {
      src: "./moon_images/Apollo11/Sl5'''.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11JourneyCrewArchive: {
      src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl5.png",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11JourneyPortraitArchive: {
      src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl5_.png",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11JourneyPortraitArchiveTwo: {
      src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl5_(1).png",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11JourneyPortraitArchiveThree: {
      src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl5_(2).png",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11Eagle: {
      src: "./moon_images/Apollo11/Sl7_AI_Gen.png",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11EagleArchive: {
      src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl7(Ai generated).png",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11OutcomeSurface: {
      src: "./moon_images/Apollo11/Sl9.jpeg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11OutcomeDisplay: {
      src: "./moon_images/Apollo11/Sl9'.jpeg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11OutcomeSurfaceArchive: {
      src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl9.png",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11OutcomeDisplayArchive: {
      src: "./moon_images/Apollo11/Apollo 11/Apollo 11 Sl9_.png",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo11OutcomeReflector: {
      src: "./moon_images/Apollo11/Sl10.jpeg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    surveyor3Spacecraft: {
      src: "./moon_images/Surveyor3/Sl1.png",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    surveyor3SurfacePhoto: {
      src: "./moon_images/Surveyor3/Sl2.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    surveyor3LandingSite: {
      src: "./moon_images/Surveyor3/Sl3.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    surveyor3MissionOverview: {
      src: "../Breakdown_Images/Moon Misssions Breakdown/Surveyor3_3_.png",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo15RoverDiagram: {
      src: "./moon_images/Apollo15/Sl1.png",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo15RoverDeployment: {
      src: "./moon_images/Apollo15/Sl2.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo15LunarRover: {
      src: "./moon_images/Apollo15/Sl4.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    apollo15MissionOverview: {
      src: "../Breakdown_Images/Moon Misssions Breakdown/Apollo15(LRV)_3_.png",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    lcrossLunarOrbit: {
      src: "./moon_images/LCROSS/Sl3.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    lcrossImpactDiagram: {
      src: "./moon_images/LCROSS/Sl1.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    lcrossImpactPhoto: {
      src: "./moon_images/LCROSS/Sl2.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    lcrossImpactResult: {
      src: "./moon_images/LCROSS/Sl4.jpeg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    lcrossMissionOverview: {
      src: "../Breakdown_Images/Moon Misssions Breakdown/LCROSS_3_.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    },
    finaleMoonImage: {
      src: "./moon_images/Finale/Sl1.jpg",
      x: 503, y: 254, width: 896, height: 376, visible: "on-slide"
    }
  };
  const missionImageControlBySource = new Map(
    Object.values(missionImageControls).map(control => [control.src, control])
  );

  const storySlides = [];
  storyStages.forEach((stage, stageIndex) => {
    stage.nodes.forEach((node, nodeIndex) => {
      const narrationParts = splitNarration(node.narration);
      if (narrationParts.length === 0 && node.response) {
        storySlides.push({
          stage,
          stageIndex,
          node,
          nodeIndex,
          conversationState: "explanation",
          narration: "",
          sourceSlideNumber: node.storySlideNumber,
          partIndex: 0,
          partCount: 1,
          response: node.response,
          isFinalSlide: false
        });
      }
      narrationParts.forEach((narration, partIndex) => {
        const isQuestionSlide = partIndex === narrationParts.length - 1 && Boolean(node.response);
        storySlides.push({
          stage,
          stageIndex,
          node,
          nodeIndex,
          conversationState: "explanation",
          narration,
          sourceSlideNumber: node.storySlideNumber,
          partIndex,
          partCount: narrationParts.length,
          response: isQuestionSlide ? node.response : "",
          isFinalSlide: false
        });
      });
      const answerParts = splitNarration(node.answer);
      answerParts.forEach((narration, partIndex) => {
        storySlides.push({
          stage,
          stageIndex,
          node,
          nodeIndex,
          conversationState: "answer",
          narration,
          sourceSlideNumber: node.answerSlideNumber || node.storySlideNumber,
          partIndex,
          partCount: answerParts.length,
          response: "",
          isFinalSlide: stageIndex === storyStages.length - 1
            && nodeIndex === stage.nodes.length - 1
            && partIndex === answerParts.length - 1
        });
      });
    });
    const overview = missionOverviewByStage[stage.shortLabel];
    if (overview) {
      const node = {
        id: `${stage.shortLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-overview`,
        ...overview,
        narration: "",
        answer: ""
      };
      storySlides.push({
        stage,
        stageIndex,
        node,
        nodeIndex: stage.nodes.length,
        conversationState: "overview",
        narration: "",
        evidenceSources: [],
        partIndex: 0,
        partCount: 1,
        response: "",
        isFinalSlide: false,
        isOverview: true
      });
    }
  });
  const stageSlides = storyStages.map((_, stageIndex) =>
    storySlides.filter((slide) => slide.stageIndex === stageIndex)
  );

  const root = document.getElementById("ranger-story");
  const archive = document.getElementById("archive-interface");
  const storyButton = document.getElementById("ranger-archive-button");
  const missionIndex = document.getElementById("story-mission-index");
  const storyTitle = document.getElementById("story-title");
  const storySubtitle = document.querySelector(".story-heading p");
  const dialogue = document.getElementById("ranger-dialogue");
  const dialogueSpeaker = document.getElementById("dialogue-speaker");
  const dialogueProgress = document.getElementById("dialogue-progress");
  const speechStatus = document.getElementById("speech-status");
  const repeatButton = document.getElementById("repeat-dialogue");
  const playNarrationButton = document.getElementById("play-narration");
  const continueReadingButton = document.getElementById("continue-reading");
  const storyMissionIndexButton = document.getElementById("story-mission-index-button");
  const hardwareImage = document.querySelector(".story-hardware");
  const missionMediaControls = document.getElementById("mission-media-controls");
  const previousMissionMediaButton = document.getElementById("mission-media-previous");
  const nextMissionMediaButton = document.getElementById("mission-media-next");
  const missionMediaCount = document.getElementById("mission-media-count");
  const missionImageFrame = document.querySelector(".story-image-frame");
  const missionImageFrameLayer = document.querySelector(".mission-image-layer");
  const missionImagePositionLayer = document.getElementById("mission-image-position-layer");
  const missionImageCoordinateSpaceElement = document.getElementById("mission-image-coordinate-space");
  const persistentMissionImageElements = new Map();
  const visitorImage = document.getElementById("visitor-character");
  const visitorCaption = document.getElementById("visitor-caption");
  const guideCharacter = document.querySelector(".story-guide");
  const visitorCharacter = document.querySelector(".story-listener");
  const guideDialogue = document.getElementById("ranger-dialogue");
  const guideRow = document.querySelector(".story-guide-row");
  const guideDialogueLayer = document.getElementById("guide-dialogue-layer");
  const userRow = document.querySelector(".story-user-row");

  function getMissionImageControl(source) {
    const control = missionImageControlBySource.get(source);
    if (!control) {
      throw new Error(`Manual Moon image controls are missing for "${source}".`);
    }
    return control;
  }

  function applyMissionImagePosition(image, control) {
    const scaleX = missionImageCoordinateSpaceElement.clientWidth / missionImageCoordinateSystem.width;
    const scaleY = missionImageCoordinateSpaceElement.clientHeight / missionImageCoordinateSystem.height;
    image.style.setProperty("left", `${control.x * scaleX}px`, "important");
    image.style.setProperty("top", `${control.y * scaleY}px`, "important");
    image.style.setProperty(
      "width",
      control.width === "auto" ? "auto" : `${control.width * scaleX}px`,
      "important"
    );
    image.style.setProperty(
      "height",
      control.height === "auto" ? "auto" : `${control.height * scaleY}px`,
      "important"
    );
  }

  function updateMissionImageFrame() {
    const image = hardwareImage;
    const imageRect = image.getBoundingClientRect();
    const layerRect = missionImageFrameLayer.getBoundingClientRect();
    if (
      image.hidden
      || !image.complete
      || !image.naturalWidth
      || !image.naturalHeight
      || !imageRect.width
      || !imageRect.height
    ) {
      missionImageFrame.classList.add("is-unavailable");
      return;
    }

    const imageScale = Math.min(
      imageRect.width / image.naturalWidth,
      imageRect.height / image.naturalHeight
    );
    const contentWidth = image.naturalWidth * imageScale;
    const contentHeight = image.naturalHeight * imageScale;
    const contentLeft = imageRect.left + (imageRect.width - contentWidth) / 2;
    const contentTop = imageRect.top + (imageRect.height - contentHeight) / 2;
    const frameWidth = (contentWidth + 12) / 0.936;
    const frameHeight = (contentHeight + 12) / 0.956;
    const frameLeft = contentLeft - 6 - frameWidth * 0.032;
    const frameTop = contentTop - 6 - frameHeight * 0.022;

    missionImageFrame.style.setProperty("left", `${frameLeft - layerRect.left}px`, "important");
    missionImageFrame.style.setProperty("top", `${frameTop - layerRect.top}px`, "important");
    missionImageFrame.style.setProperty("width", `${frameWidth}px`, "important");
    missionImageFrame.style.setProperty("height", `${frameHeight}px`, "important");
    missionImageFrame.classList.remove("is-unavailable");
  }

  function updateMissionImagePositions(activeSource = hardwareImage.getAttribute("src")) {
    if (activeSource) {
      const activeControl = getMissionImageControl(activeSource);
      applyMissionImagePosition(hardwareImage, activeControl);
      hardwareImage.hidden = activeControl.visible === false;
    }
    persistentMissionImageElements.forEach((image, source) => {
      applyMissionImagePosition(image, getMissionImageControl(source));
    });
    updateMissionImageFrame();
  }

  function syncPersistentMissionImages(activeSource) {
    Object.values(missionImageControls).forEach(control => {
      if (control.visible !== true) return;
      let image = persistentMissionImageElements.get(control.src);
      if (!image) {
        image = document.createElement("img");
        image.className = "mission-image-item mission-image-overlay";
        image.alt = "";
        image.setAttribute("aria-hidden", "true");
        image.addEventListener("error", () => {
          console.error(`Persistent Moon mission image failed to load: ${control.src}`);
        });
        image.src = control.src;
        missionImageCoordinateSpaceElement.appendChild(image);
        persistentMissionImageElements.set(control.src, image);
      }
      applyMissionImagePosition(image, control);
      image.hidden = control.src === activeSource;
    });
  }

  if (
    !missionImagePositionLayer
    || !missionImageCoordinateSpaceElement
    || !hardwareImage
    || !missionImageFrame
    || !missionImageFrameLayer
  ) {
    throw new Error("Moon mission image positioning layer is missing from moon.html.");
  }
  updateMissionImagePositions();
  syncPersistentMissionImages(hardwareImage.getAttribute("src"));
  hardwareImage.addEventListener("load", updateMissionImageFrame);
  hardwareImage.addEventListener("error", updateMissionImageFrame);
  if ("ResizeObserver" in window) {
    const missionImagePositionObserver = new ResizeObserver(() => updateMissionImagePositions());
    missionImagePositionObserver.observe(missionImageCoordinateSpaceElement);
  }
  window.addEventListener("resize", () => updateMissionImagePositions());
  if (archive) {
    archive.hidden = true;
    archive.setAttribute("aria-hidden", "true");
    archive.inert = true;
  }

  if (storyButton) {
    storyButton.hidden = true;
  }

  function updateVisitorCharacter() {
    const visitorName = sessionStorage.getItem("museumVisitorName") || "You";
    const selectedAvatar = sessionStorage.getItem("museumSelectedAvatar");
    const isBoy = selectedAvatar === "leo";
    if (visitorImage) {
      visitorImage.src = isBoy ? "../images/Boy_user_listening.png" : "../images/Girl_user_listening.png";
      visitorImage.alt = `${visitorName}, listening to the guide`;
    }
    if (visitorCaption) visitorCaption.textContent = visitorName;
    requestAnimationFrame(syncCharacterSizes);
  }

  updateVisitorCharacter();
  window.addEventListener("storage", updateVisitorCharacter);
  window.addEventListener("pageshow", updateVisitorCharacter);
  window.addEventListener("focus", updateVisitorCharacter);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) updateVisitorCharacter();
  });

  const transitionLayer = document.createElement("div");
  transitionLayer.className = "story-transition";
  transitionLayer.setAttribute("aria-hidden", "true");
  transitionLayer.innerHTML = '<div class="mission-intro-effect" aria-hidden="true"><span class="spark"></span><span class="mission-particle particle-one"></span><span class="mission-particle particle-two"></span><span class="mission-particle particle-three"></span><span class="mission-particle particle-four"></span><span class="mission-particle particle-five"></span><span class="mission-particle particle-six"></span><span class="mission-particle particle-seven"></span><span class="mission-particle particle-eight"></span><span class="mission-particle particle-nine"></span><span class="mission-particle particle-ten"></span><span class="mission-particle particle-eleven"></span><span class="mission-particle particle-twelve"></span></div><p class="mission-intro-title" role="status" aria-live="polite"></p>';
  document.body.appendChild(transitionLayer);
  const missionIntroTitle = transitionLayer.querySelector(".mission-intro-title");

  const chatbot = document.createElement("div");
  chatbot.className = "mars-chatbot moon-chatbot";
  chatbot.innerHTML = '<button class="mars-chatbot-button" type="button" aria-label="Open chatbot" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2a8.8 8.8 0 0 0-7.64 13.17L3.4 20.6l4.23-.96A8.8 8.8 0 1 0 12 3.2Z"/><circle cx="8.7" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="15.3" cy="12" r="1"/></svg></button><p class="mars-chatbot-message" role="status" aria-live="polite">Coming soon...</p>';
  document.body.appendChild(chatbot);
  const chatbotButton = chatbot.querySelector(".mars-chatbot-button");
  const chatbotMessage = chatbot.querySelector(".mars-chatbot-message");
  chatbotButton.addEventListener("click", () => {
    const isOpen = chatbot.classList.toggle("is-open");
    chatbotButton.setAttribute("aria-expanded", String(isOpen));
    chatbotMessage.textContent = isOpen ? "Coming soon..." : "";
  });

  const responsePanel = document.getElementById("response-panel");
  const dialogueWrap = document.querySelector(".story-dialogue");

  function showSpeakerScene(speaker) {
    const showGuide = speaker === "guide";
    root?.classList.toggle("is-student-speaking", !showGuide);
    if (guideRow) {
      guideRow.hidden = !showGuide;
      guideRow.setAttribute("aria-hidden", String(!showGuide));
    }
    if (guideDialogueLayer) {
      guideDialogueLayer.hidden = !showGuide;
      guideDialogueLayer.setAttribute("aria-hidden", String(!showGuide));
    }
    if (userRow) {
      userRow.hidden = showGuide;
      userRow.setAttribute("aria-hidden", String(showGuide));
    }
    updateMissionMediaControls();
    requestAnimationFrame(syncCharacterSizes);
  }

  const state = {
    slideIndex: 0,
    navigationFloor: 0,
    transitionLocked: false,
    isMissionOpening: false,
    missionOpeningRequest: 0,
    imageTransitionRequest: 0,
    speechRequest: 0,
    speechTimeout: null,
    currentNarration: "",
    narrationEnabled: false,
    narrationPending: false,
    resumeNarrationGate: null,
    indexOpen: false,
    renderedImage: null,
    activeMediaNodeKey: null,
    activeMediaIndex: 0,
    preloadedMediaImages: new Map(),
    controlsReady: false,
    questionSpeechRequest: 0,
    questionSpeechPending: false,
    questionVoiceUnavailable: false,
    questionAsked: false,
    slideAnimationRequest: 0,
    slideAnimationTimers: new Set(),
    transitionTimer: null
  };

  function getSlideMedia(slide) {
    return Array.isArray(slide?.node.media) ? slide.node.media : [];
  }

  function updateMissionMediaControls(slide = getCurrentSlide()) {
    if (!missionMediaControls) return;
    const media = getSlideMedia(slide);
    const canNavigate = media.length > 1
      && !state.transitionLocked
      && !root.classList.contains("is-student-speaking")
      && slide?.conversationState !== "answer";
    missionMediaControls.hidden = !canNavigate;
    if (missionMediaCount && media.length > 0) {
      const activeIndex = state.activeMediaIndex % media.length;
      missionMediaCount.textContent = `${activeIndex + 1} / ${media.length}`;
      missionMediaCount.setAttribute("aria-label", `Image ${activeIndex + 1} of ${media.length}`);
    } else if (missionMediaCount) {
      missionMediaCount.textContent = "";
      missionMediaCount.removeAttribute("aria-label");
    }
  }

  function preloadNextMissionMedia(slide) {
    const media = getSlideMedia(slide);
    if (media.length < 2) return;
    const nextSource = media[(state.activeMediaIndex + 1) % media.length]?.src;
    if (!nextSource || state.preloadedMediaImages.has(nextSource)) return;
    const image = new Image();
    image.src = nextSource;
    state.preloadedMediaImages.set(nextSource, image);
  }

  function changeMissionMedia(offset) {
    const slide = getCurrentSlide();
    const media = getSlideMedia(slide);
    if (media.length < 2
      || state.transitionLocked
      || root.classList.contains("is-student-speaking")
      || slide?.conversationState === "answer") return;
    state.activeMediaIndex = (state.activeMediaIndex + offset + media.length) % media.length;
    const visual = getSlideVisual(slide);
    setCurrentImage(slide.stage, visual.image, { transition: true, alt: visual.alt });
    updateMissionMediaControls(slide);
    preloadNextMissionMedia(slide);
  }

  const GUIDE_CHARACTER_SCALE = 2.25;
  const USER_CHARACTER_SCALE = 2.25;
  const GUIDE_CHARACTER_VERTICAL_OFFSET = 0;
  const USER_CHARACTER_VERTICAL_OFFSET = 0;

  function sizeCharacterToMessage(figure, image, message) {
    if (!figure || !image || !message || message.hidden || !image.naturalWidth || !image.naturalHeight) return;
    const text = message.matches(".story-message")
      ? message.querySelector(".story-user-content p")
      : message;
    if (message.dataset.characterCapped === "true") {
      message.style.height = "";
      message.style.minHeight = "";
      message.style.maxHeight = "";
      message.style.overflow = "";
      message.style.overflowY = "";
      if (text) {
        text.style.maxHeight = "";
        text.style.overflowY = "";
        text.style.overscrollBehavior = "";
      }
      message.dataset.characterCapped = "false";
    }
    const messageHeight = message.matches(".story-message")
      ? message.getBoundingClientRect().height
      : Math.max(message.scrollHeight, message.getBoundingClientRect().height);
    const row = figure.closest(".story-guide-row, .story-user-row") || figure.parentElement;
    if (!messageHeight || !row) return;
    const gap = Number.parseFloat(window.getComputedStyle(row).columnGap) || 0;
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const minimumMessageWidth = mobile ? 145 : 240;
    const maxCharacterWidth = Math.max(48, row.clientWidth - minimumMessageWidth - gap);
    const aspectRatio = image.naturalWidth / image.naturalHeight;
    const isGuide = figure.classList.contains("story-guide");
    const characterScale = isGuide ? GUIDE_CHARACTER_SCALE : USER_CHARACTER_SCALE;
    const verticalOffset = isGuide
      ? GUIDE_CHARACTER_VERTICAL_OFFSET
      : USER_CHARACTER_VERTICAL_OFFSET;
    const imageHeight = Math.min(
      messageHeight * characterScale,
      maxCharacterWidth / aspectRatio
    );
    const width = imageHeight * aspectRatio;
    const caption = figure.querySelector("figcaption");
    const captionHeight = caption ? Math.max(20, caption.getBoundingClientRect().height) : 0;
    if (!isGuide) {
      const columnWidth = Math.min(130, mobile ? 150 : 130);
      const cappedHeight = Math.min(
        imageHeight,
        Math.max(105, row.clientHeight - captionHeight),
        columnWidth / aspectRatio
      );
      const cappedWidth = cappedHeight * aspectRatio;
      figure.style.width = `${cappedWidth}px`;
      figure.style.height = `${row.clientHeight}px`;
      if (figure.parentElement?.classList.contains("story-listeners")) {
        figure.parentElement.style.width = `${cappedWidth}px`;
        figure.parentElement.style.height = `${row.clientHeight}px`;
        figure.parentElement.style.marginTop = "0";
        figure.parentElement.style.transform = "none";
      }
      return;
    }
    const positioningContainer = figure.parentElement?.classList.contains("story-listeners")
      ? figure.parentElement
      : figure;
    positioningContainer.style.transform = "none";
    positioningContainer.style.marginTop = "";

    figure.style.width = `${width}px`;
    figure.style.height = `${imageHeight + captionHeight}px`;
    if (figure.parentElement?.classList.contains("story-listeners")) {
      figure.parentElement.style.width = `${width}px`;
      figure.parentElement.style.height = `${imageHeight + captionHeight}px`;
    }
    const messageBounds = message.getBoundingClientRect();
    const containerBounds = positioningContainer.getBoundingClientRect();
    const imageTop = messageBounds.top - containerBounds.top
      + (messageBounds.height - imageHeight) / 2
      + verticalOffset;
    const containerHeight = Math.max(imageHeight + captionHeight, imageTop + imageHeight + captionHeight);
    figure.style.height = `${containerHeight}px`;
    if (figure.parentElement?.classList.contains("story-listeners")) {
      figure.parentElement.style.height = `${containerHeight}px`;
    }
  }

  let characterSizeFrame = 0;
  function syncCharacterSizes() {
    if (characterSizeFrame) cancelAnimationFrame(characterSizeFrame);
    characterSizeFrame = requestAnimationFrame(() => {
      characterSizeFrame = 0;
      sizeCharacterToMessage(guideCharacter, guideCharacter?.querySelector("img"), guideDialogue);
      sizeCharacterToMessage(visitorCharacter, visitorImage, responsePanel?.querySelector(".story-message"));
    });
  }

  if ("ResizeObserver" in window) {
    const characterResizeObserver = new ResizeObserver(syncCharacterSizes);
    if (guideDialogue) characterResizeObserver.observe(guideDialogue);
    if (responsePanel) characterResizeObserver.observe(responsePanel);
  }
  guideCharacter?.querySelector("img")?.addEventListener("load", syncCharacterSizes);
  visitorImage?.addEventListener("load", syncCharacterSizes);
  dialogue?.addEventListener("animationend", syncCharacterSizes);
  responsePanel?.addEventListener("animationend", syncCharacterSizes);
  window.addEventListener("resize", () => {
    [guideDialogue, responsePanel?.querySelector(".story-message")].forEach((message) => {
      if (!message) return;
      message.dataset.characterCapped = "false";
      message.style.height = "";
      message.style.minHeight = "";
      message.style.maxHeight = "";
      message.style.overflow = "";
      message.style.overflowY = "";
      const text = message.matches(".story-message")
        ? message.querySelector(".story-user-content p")
        : null;
      if (text) {
        text.style.maxHeight = "";
        text.style.overflowY = "";
        text.style.overscrollBehavior = "";
      }
    });
    syncCharacterSizes();
  });

  function wait(milliseconds) {
    return new Promise(resolve => window.setTimeout(resolve, milliseconds));
  }

  function waitForImage(image) {
    if (image.complete) {
      return image.naturalWidth > 0
        ? Promise.resolve()
        : Promise.reject(new Error(`Image failed to load: ${image.currentSrc || image.src}`));
    }
    return new Promise((resolve, reject) => {
      const handleLoad = () => {
        cleanup();
        resolve();
      };
      const handleError = () => {
        cleanup();
        reject(new Error(`Image failed to load: ${image.currentSrc || image.src}`));
      };
      const cleanup = () => {
        image.removeEventListener("load", handleLoad);
        image.removeEventListener("error", handleError);
      };
      image.addEventListener("load", handleLoad, { once: true });
      image.addEventListener("error", handleError, { once: true });
    });
  }

  function preloadImage(source) {
    const image = new Image();
    image.src = source;
    return waitForImage(image);
  }

  function setCurrentImage(stage, image, { transition = false, alt = stage?.alt || "" } = {}) {
    if (!stage || !hardwareImage) return Promise.resolve(false);
    const assignedImage = image;
    hardwareImage.alt = alt;
    if (assignedImage && state.renderedImage === assignedImage) {
      updateMissionImagePositions(assignedImage);
      syncPersistentMissionImages(assignedImage);
      return waitForImage(hardwareImage).then(() => true).catch(error => {
        console.error("Moon mission image failed to load", error);
        if (speechStatus) speechStatus.textContent = "The mission image could not be loaded.";
        return false;
      });
    }

    const request = ++state.imageTransitionRequest;
    hardwareImage.classList.remove("is-image-fading-out", "is-image-materializing");
    if (!assignedImage) {
      const clearImage = () => {
        if (request !== state.imageTransitionRequest) return false;
        hardwareImage.hidden = true;
        hardwareImage.removeAttribute("src");
        state.renderedImage = null;
        syncPersistentMissionImages(null);
        return true;
      };
      if (!transition || hardwareImage.hidden || !state.renderedImage) return Promise.resolve(clearImage());
      const fadeOutDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 150 : 300;
      hardwareImage.classList.add("is-image-fading-out");
      return wait(fadeOutDuration).then(() => {
        hardwareImage.classList.remove("is-image-fading-out");
        return clearImage();
      });
    }

    if (!transition || !state.renderedImage) {
      hardwareImage.src = assignedImage;
      state.renderedImage = assignedImage;
      updateMissionImagePositions(assignedImage);
      syncPersistentMissionImages(assignedImage);
      return waitForImage(hardwareImage).then(() => true).catch(error => {
        console.error("Moon mission image failed to load", error);
        if (speechStatus) speechStatus.textContent = "The mission image could not be loaded.";
        return false;
      });
    }

    return preloadImage(assignedImage).then(() => {
      if (request !== state.imageTransitionRequest) return false;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const fadeOutDuration = reducedMotion ? 150 : 300;
      const fadeInDuration = reducedMotion ? 150 : 600;
      hardwareImage.classList.add("is-image-fading-out");
      return wait(fadeOutDuration).then(() => {
        if (request !== state.imageTransitionRequest) return false;
        hardwareImage.src = assignedImage;
        state.renderedImage = assignedImage;
        updateMissionImagePositions(assignedImage);
        syncPersistentMissionImages(assignedImage);
        hardwareImage.classList.remove("is-image-fading-out");
        if (!hardwareImage.hidden) hardwareImage.classList.add("is-image-materializing");
        return waitForImage(hardwareImage).then(() => new Promise(resolve => {
          window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
            if (request !== state.imageTransitionRequest) {
              resolve(false);
              return;
            }
            hardwareImage.classList.remove("is-image-materializing");
            wait(fadeInDuration).then(() => resolve(true));
          }));
        }));
      });
    }).catch(error => {
      if (request === state.imageTransitionRequest) {
        hardwareImage.classList.remove("is-image-fading-out", "is-image-materializing");
        if (speechStatus) speechStatus.textContent = "The next mission image could not be loaded.";
      }
      console.error("Moon mission image transition failed", error);
      return false;
    });
  }

  function getCurrentSlide() {
    return storySlides[state.slideIndex] || null;
  }

  function renderMissionIndex() {
    if (!missionIndex) return;
    const currentStageIndex = getCurrentSlide()?.stageIndex ?? 0;
    missionIndex.innerHTML = storyStages.map((stage, index) => {
      const current = index === currentStageIndex;
      const done = index < currentStageIndex;
      const upcoming = index > currentStageIndex;
      const available = stageSlides[index].length > 0;
      const label = stage.shortLabel;
      return `
        <button class="index-tab story-mission-entry ${current ? "current" : done ? "done" : "upcoming"}" type="button" data-story-stage-index="${index}" ${available ? "" : "disabled"} aria-current="${current ? "step" : "false"}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${label}</strong>
          <small>${available ? stage.title : "Story unavailable"}</small>
        </button>
      `;
    }).join("");
    missionIndex.hidden = !state.indexOpen;
    missionIndex.setAttribute("aria-label", "Choose a mission");
    missionIndex.classList.toggle("story-progress", state.indexOpen);
    if (storyMissionIndexButton) {
      storyMissionIndexButton.setAttribute("aria-expanded", String(state.indexOpen));
    }
  }

  function toggleMissionIndex() {
    state.indexOpen = !state.indexOpen;
    renderMissionIndex();
  }

  missionIndex?.addEventListener("click", (event) => {
    const entry = event.target.closest("[data-story-stage-index]");
    if (!entry || entry.disabled) return;
    event.stopPropagation();
    const targetStageIndex = Number(entry.dataset.storyStageIndex);
    const targetSlides = stageSlides[targetStageIndex];
    if (!Number.isInteger(targetStageIndex) || !targetSlides?.length || state.transitionLocked) return;
    const targetSlideIndex = storySlides.indexOf(targetSlides[0]);
    if (targetSlideIndex < 0) return;

    state.navigationFloor = targetSlideIndex;
    state.indexOpen = false;
    renderMissionIndex();
    startTransition(targetSlideIndex);
  });

  function setNarrationText(text) {
    if (!dialogue) return;
    dialogue.setAttribute("aria-label", text);
    dialogue.style.minHeight = "";
    dialogue.textContent = text;
    dialogue.style.minHeight = `${dialogue.getBoundingClientRect().height}px`;
    dialogue.textContent = "";
    dialogue.classList.remove("is-entering");
    requestAnimationFrame(() => dialogue.classList.add("is-entering"));
  }

  const currentUserName = () => (sessionStorage.getItem("museumVisitorName") || "You");

  function personalizeDialogue(text) {
    return text.replace(/\bLeo\b/g, currentUserName());
  }

  function renderInteractionUI(slide) {
    if (!responsePanel) return;
    responsePanel.replaceChildren();
    const message = document.createElement("div");
    message.className = "story-message is-user";
    message.classList.add("is-pending");
    const speaker = document.createElement("span");
    speaker.className = "message-meta";
    speaker.textContent = currentUserName();
    const content = document.createElement("div");
    content.className = "story-user-content";
    if (slide.response) {
      const text = document.createElement("p");
      text.setAttribute("aria-label", personalizeDialogue(slide.response));
      text.textContent = personalizeDialogue(slide.response);
      content.appendChild(text);
    }
    const actions = document.createElement("div");
    actions.className = "story-interaction-actions";
    const previousButton = document.createElement("button");
    previousButton.id = "previous-slide";
    previousButton.className = "dialogue-previous";
    previousButton.type = "button";
    previousButton.textContent = "Previous Page";
    previousButton.setAttribute("aria-label", "Previous story slide");
    previousButton.disabled = !state.controlsReady || state.transitionLocked || state.slideIndex <= state.navigationFloor;
    previousButton.addEventListener("click", handlePreviousSlide);
    actions.appendChild(previousButton);
    const advanceButton = document.createElement("button");
    advanceButton.id = "advance-slide";
    advanceButton.className = "dialogue-continue";
    advanceButton.type = "button";
    advanceButton.textContent = slide.response ? "Ask" : "Next";
    advanceButton.setAttribute("aria-label", advanceButton.textContent === "Ask" ? "Ask and continue to the next slide" : "Next story slide");
    advanceButton.disabled = !state.controlsReady || state.transitionLocked;
    advanceButton.addEventListener("click", () => {
      if (slide.response && !state.questionAsked) {
        handleAskQuestion();
        return;
      }
      handleNextSlide();
    });
    actions.appendChild(advanceButton);
    const questionFallbackButton = document.createElement("button");
    questionFallbackButton.id = "continue-question-without-voice";
    questionFallbackButton.className = "dialogue-question-fallback";
    questionFallbackButton.type = "button";
    questionFallbackButton.textContent = "Continue without voice";
    questionFallbackButton.hidden = true;
    questionFallbackButton.addEventListener("click", continueWithoutQuestionVoice);
    actions.appendChild(questionFallbackButton);
    content.appendChild(actions);
    message.append(speaker, content);
    responsePanel.appendChild(message);
    const messageText = message.querySelector(".story-user-content p");
    if (messageText) messageText.textContent = "";
    message.hidden = true;
    requestAnimationFrame(syncCharacterSizes);
  }

  function updateInteractionControls() {
    const previousButton = document.getElementById("previous-slide");
    const advanceButton = document.getElementById("advance-slide");
    const bottomPreviousButton = document.getElementById("story-previous-slide");
    const bottomAdvanceButton = document.getElementById("story-advance-slide");
    if (previousButton) {
      previousButton.disabled = !state.controlsReady || state.transitionLocked || state.slideIndex <= state.navigationFloor;
    }
    if (advanceButton) {
      advanceButton.disabled = !state.controlsReady
        || state.transitionLocked
        || state.questionSpeechPending
        || state.questionVoiceUnavailable;
      const hasQuestion = Boolean(getCurrentSlide()?.response);
      advanceButton.textContent = hasQuestion
        ? (state.questionAsked ? "Continue" : "Ask")
        : "Next";
      advanceButton.setAttribute(
        "aria-label",
        hasQuestion
          ? (state.questionAsked ? "Continue to the guide's response" : "Ask the question aloud")
          : "Next story slide"
      );
    }
    if (bottomPreviousButton) {
      bottomPreviousButton.disabled = !state.controlsReady || state.transitionLocked || state.slideIndex <= state.navigationFloor;
    }
    if (bottomAdvanceButton) {
      bottomAdvanceButton.disabled = !state.controlsReady
        || state.transitionLocked
        || state.questionSpeechPending
        || state.questionVoiceUnavailable;
    }
    requestAnimationFrame(syncCharacterSizes);
  }

  function cancelSlideAnimations() {
    state.slideAnimationRequest += 1;
    state.slideAnimationTimers.forEach((timerId) => window.clearTimeout(timerId));
    state.slideAnimationTimers.clear();
    return state.slideAnimationRequest;
  }

  function scheduleSlideAnimation(callback, delay, requestId) {
    const timerId = window.setTimeout(() => {
      state.slideAnimationTimers.delete(timerId);
      if (requestId === state.slideAnimationRequest) callback();
    }, delay);
    state.slideAnimationTimers.add(timerId);
  }

  function revealWords(element, text, requestId, onComplete, interval = 300) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.textContent = text;
      onComplete();
      return;
    }
    const words = text.match(/\S+\s*/g) || [];
    const leadingWhitespace = text.match(/^\s*/)?.[0] || "";
    element.replaceChildren();
    element.setAttribute("aria-label", text);
    if (leadingWhitespace) element.appendChild(document.createTextNode(leadingWhitespace));

    let wordIndex = 0;
    const revealNextWord = () => {
      if (requestId !== state.slideAnimationRequest) return;
      if (wordIndex >= words.length) {
        onComplete();
        return;
      }
      element.appendChild(document.createTextNode(words[wordIndex]));
      if (element.scrollHeight > element.clientHeight) {
        element.scrollTop = element.scrollHeight;
      }
      const currentWord = words[wordIndex];
      wordIndex += 1;
      if (wordIndex < words.length) {
        const punctuationPause = /[.!?]["'”’)]*$/.test(currentWord)
          ? 140
          : /[,;:]["'”’)]*$/.test(currentWord)
            ? 70
            : 0;
        scheduleSlideAnimation(revealNextWord, interval + punctuationPause, requestId);
      } else {
        onComplete();
      }
    };
    revealNextWord();
  }

  function sequenceSlideMessages(slide, narration, requestId) {
    const userMessage = responsePanel.querySelector(".story-message");
    const userText = userMessage?.querySelector(".story-user-content p");
    const userFullText = slide.response ? personalizeDialogue(slide.response) : "";
    let narrationTextComplete = false;
    let narrationVoiceComplete = false;
    let userMessageScheduled = false;
    state.narrationPending = true;
    state.controlsReady = false;
    if (repeatButton) repeatButton.disabled = true;
    setAutoplayFallbackVisible(false);
    updateInteractionControls();

    const revealUserMessage = () => {
      if (requestId !== state.slideAnimationRequest || !userMessage) return;
      showSpeakerScene("student");
      userMessage.hidden = false;
      userMessage.classList.remove("is-pending");
      userMessage.classList.add("is-entering");

      const finishUserEntrance = () => {
        if (requestId !== state.slideAnimationRequest) return;
        userMessage.classList.remove("is-entering");
        if (userText && userFullText) {
          revealWords(userText, userFullText, requestId, () => {
            if (requestId !== state.slideAnimationRequest) return;
            state.controlsReady = true;
            updateInteractionControls();
          }, 300);
        } else {
          state.controlsReady = true;
          updateInteractionControls();
        }
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finishUserEntrance();
      } else {
        scheduleSlideAnimation(finishUserEntrance, 380, requestId);
      }
    };

    const maybeScheduleUserMessage = () => {
      if (requestId !== state.slideAnimationRequest
        || !narrationTextComplete
        || !narrationVoiceComplete) return;
      if (!userFullText) {
        state.controlsReady = true;
        updateInteractionControls();
        return;
      }
      if (userMessageScheduled) return;
      userMessageScheduled = true;
      scheduleSlideAnimation(revealUserMessage, 1000, requestId);
    };

    if (!narration.trim()) {
      state.narrationPending = false;
      state.resumeNarrationGate = null;
      if (repeatButton) repeatButton.disabled = true;
      revealUserMessage();
      return;
    }

    state.resumeNarrationGate = () => {
      if (requestId !== state.slideAnimationRequest) return;
      narrationVoiceComplete = true;
      state.narrationPending = false;
      setAutoplayFallbackVisible(false);
      maybeScheduleUserMessage();
    };

    const handleNarrationResult = ({ status }) => {
      if (requestId !== state.slideAnimationRequest) return;
      if (status === "blocked" || status === "failed" || status === "unavailable") {
        if (repeatButton) repeatButton.disabled = true;
        setAutoplayFallbackVisible(true, status);
        return;
      }
      state.resumeNarrationGate();
      if (repeatButton) repeatButton.disabled = false;
    };

    revealWords(dialogue, narration, requestId, () => {
      narrationTextComplete = true;
      maybeScheduleUserMessage();
    }, 300);
    speakNarration(narration, {
      onComplete: handleNarrationResult,
      onStart: () => {
        if (requestId !== state.slideAnimationRequest) return;
        setAutoplayFallbackVisible(false);
      }
    });
  }

  function setAutoplayFallbackVisible(visible, status = "") {
    if (playNarrationButton) {
      playNarrationButton.hidden = !visible || status === "unavailable";
    }
    if (continueReadingButton) continueReadingButton.hidden = !visible;
    if (!speechStatus) return;
    if (!visible) {
      speechStatus.textContent = "";
    } else if (status === "blocked") {
      speechStatus.textContent = "";
    } else if (status === "unavailable") {
      speechStatus.textContent = "";
    } else {
      speechStatus.textContent = "";
    }
  }

  function continueWithoutNarration() {
    cancelNarration();
    if (repeatButton) repeatButton.disabled = true;
    state.resumeNarrationGate?.();
  }

  let landingChallengeFrame = null;
  let landingChallengeStartButton = null;

  function openLandingChallenge() {
    if (landingChallengeFrame) return;
    const frame = document.createElement("iframe");
    frame.title = "Little Lunar Explorer landing challenge";
    frame.setAttribute("aria-label", frame.title);
    frame.style.cssText = "position:fixed;inset:0;width:100%;height:100%;border:0;z-index:2147483647;background:#030711";
    frame.addEventListener("load", () => frame.contentWindow?.focus(), { once: true });
    frame.src = new URL("./Moon_Landing_Challenge/landing.html", window.location.href).href;
    landingChallengeFrame = frame;
    root.inert = true;
    document.body.appendChild(frame);
  }

  window.addEventListener("message", event => {
    const frame = landingChallengeFrame;
    if (!frame || event.source !== frame.contentWindow) return;
    const challengeUrl = new URL(frame.src);
    const challengeOrigin = challengeUrl.protocol === "file:" ? "null" : challengeUrl.origin;
    if (event.origin !== challengeOrigin) return;
    if (event.data?.type !== "moon-landing-challenge-exit") return;
    frame.remove();
    landingChallengeFrame = null;
    root.inert = false;
    landingChallengeStartButton?.focus();
  });

  function showFinalCta() {
    if (!dialogueWrap) return;
    let cta = document.getElementById("final-cta");
    if (!cta) {
      landingChallengeStartButton = document.createElement("button");
      landingChallengeStartButton.id = "start-moon-landing-challenge";
      landingChallengeStartButton.className = "dialogue-play";
      landingChallengeStartButton.type = "button";
      landingChallengeStartButton.textContent = "Begin the landing challenge";
      landingChallengeStartButton.addEventListener("click", openLandingChallenge);
      dialogueWrap.querySelector(".dialogue-actions")?.appendChild(landingChallengeStartButton);

      cta = document.createElement("button");
      cta.id = "final-cta";
      cta.className = "dialogue-play";
      cta.type = "button";
      cta.textContent = "Return to mission selection";
      cta.addEventListener("click", () => {
        if (!state.indexOpen) toggleMissionIndex();
        storyMissionIndexButton?.focus();
      });
      dialogueWrap.querySelector(".dialogue-actions")?.appendChild(cta);
    }
    cta.hidden = false;
    if (landingChallengeStartButton) landingChallengeStartButton.hidden = false;
    if (speechStatus) speechStatus.textContent = "Finale complete. Choose a mission from the index.";
  }

  function renderCurrentSlide({ deferNarration = false, imageTransition = false } = {}) {
    const animationRequest = cancelSlideAnimations();
    const slide = getCurrentSlide();
    if (!slide) return;
    const { stage } = slide;
    const mediaNodeKey = `${slide.stageIndex}:${slide.node.mediaGroup || slide.nodeIndex}`;
    if (state.activeMediaNodeKey !== mediaNodeKey) {
      state.activeMediaNodeKey = mediaNodeKey;
      state.activeMediaIndex = 0;
    }
    showSpeakerScene(slide.narration.trim() ? "guide" : "student");

    if (storyTitle) {
      storyTitle.textContent = slide.isOverview
        ? `${stage.shortLabel} Mission Overview`
        : stage.title;
    }
    if (storySubtitle) {
      storySubtitle.textContent = stage.shortLabel === "Apollo 11" && slide.node.section
        ? slide.node.section
        : "Moon missions";
    }
    if (dialogueSpeaker) dialogueSpeaker.textContent = "Dr. Fredrick";
    const currentStageSlides = stageSlides[slide.stageIndex];
    const missionSlide = currentStageSlides.indexOf(slide) + 1;
    if (hardwareImage) {
      hardwareImage.dataset.mission = stage.location?.mission || stage.shortLabel;
      hardwareImage.dataset.slide = String(missionSlide);
      hardwareImage.dataset.node = String(slide.nodeIndex + 1);
      hardwareImage.dataset.state = slide.conversationState;
    }
    if (repeatButton) {
      repeatButton.textContent = "Repeat message";
      repeatButton.setAttribute("aria-label", "Repeat Dr. Fredrick's narration");
    }
    if (dialogueProgress) {
      const missionName = stage.shortLabel;
      const currentSlideNumber = slide.sourceSlideNumber;
      dialogueProgress.textContent = stage.shortLabel === "Apollo 11" && currentSlideNumber
        ? `${missionName} slide: ${String(currentSlideNumber).padStart(2, "0")}/10`
        : `${missionName} slide: ${String(missionSlide).padStart(2, "0")}/${String(currentStageSlides.length).padStart(2, "0")}`;
    }

    const visual = getSlideVisual(slide);
    const sourceMeta = getSlideSourceMeta(slide);
    const imageSource = sourceMeta?.imageSourceUrl
      ?? slide.node.imageSourceUrl
      ?? stage.imageSourceUrl
      ?? stage.location?.sourceUrl
      ?? null;
    const scientificSource = sourceMeta?.scientificReferenceUrl
      ?? slide.node.scientificReferenceUrl
      ?? stage.scientificReferenceUrl
      ?? stage.location?.sourceUrl
      ?? null;
    const imageCredit = sourceMeta?.imageCredit || "NASA mission archive";
    const imageReady = setCurrentImage(
      stage,
      visual.image,
      { transition: imageTransition, alt: visual.alt }
    );
    preloadNextMissionMedia(slide);
    window.museumLocationView?.setLocation(stage.location);
    window.museumLocationView?.setImageSource(
      visual.image,
      imageSource,
      scientificSource,
      imageCredit
    );
    renderEvidenceLink(slide);
    const narration = personalizeDialogue(slide.narration);
    state.currentNarration = narration;
    state.questionAsked = false;
    setNarrationText(narration);
    speechStatus.textContent = "";
    renderInteractionUI(slide);
    if (!deferNarration) sequenceSlideMessages(slide, narration, animationRequest);
    const cta = document.getElementById("final-cta");
    if (cta) cta.hidden = true;
    if (landingChallengeStartButton) landingChallengeStartButton.hidden = true;
    renderMissionIndex();
    return { slide, narration, animationRequest, imageReady };
  }

  function cancelNarration() {
    state.speechRequest += 1;
    if (state.speechTimeout !== null) {
      window.clearTimeout(state.speechTimeout);
      state.speechTimeout = null;
    }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    window.backgroundMusic?.setSpeechActive(false);
    root.classList.remove("is-speaking");
  }

  function waitForQuestionVoice() {
    return voiceSelection.waitForVisitorVoice();
  }

  function isCurrentQuestionRequest(request, animationRequest, slideIndex) {
    return state.questionSpeechPending
      && request === state.questionSpeechRequest
      && animationRequest === state.slideAnimationRequest
      && slideIndex === state.slideIndex;
  }

  function showQuestionSpeechFallback() {
    state.questionSpeechPending = false;
    state.questionVoiceUnavailable = true;
    if (repeatButton) repeatButton.disabled = false;
    const fallbackButton = document.getElementById("continue-question-without-voice");
    if (fallbackButton) fallbackButton.hidden = false;
    if (speechStatus) {
      speechStatus.textContent = "Your question could not be spoken. Select Continue without voice, then Continue or Next to proceed.";
    }
    updateInteractionControls();
  }

  function continueWithoutQuestionVoice() {
    if (!state.questionVoiceUnavailable || state.transitionLocked || !state.controlsReady) return;
    state.questionVoiceUnavailable = false;
    state.questionAsked = true;
    const fallbackButton = document.getElementById("continue-question-without-voice");
    if (fallbackButton) fallbackButton.hidden = true;
    if (speechStatus) speechStatus.textContent = "";
    updateInteractionControls();
  }

  function speakQuestionBeforeAdvance(slide) {
    if (state.questionSpeechPending || state.questionVoiceUnavailable) return;
    const question = personalizeDialogue(slide.response);
    if (!question) {
      state.questionAsked = true;
      updateInteractionControls();
      return;
    }

    state.questionSpeechPending = true;
    state.questionVoiceUnavailable = false;
    const request = ++state.questionSpeechRequest;
    const animationRequest = state.slideAnimationRequest;
    const slideIndex = state.slideIndex;
    if (repeatButton) repeatButton.disabled = true;
    cancelNarration();
    updateInteractionControls();

    waitForQuestionVoice().then((voice) => {
      if (!isCurrentQuestionRequest(request, animationRequest, slideIndex)) return;
      if (!voice) {
        showQuestionSpeechFallback();
        return;
      }

      const isBoy = sessionStorage.getItem("museumSelectedAvatar") === "leo";
      speakNarration(question, {
        voice,
        speaker: "visitor",
        rate: 0.94,
        pitch: isBoy ? 0.94 : 1.08,
        onStart: () => {
          if (isCurrentQuestionRequest(request, animationRequest, slideIndex) && speechStatus) {
            speechStatus.textContent = "Your question is being spoken.";
          }
        },
        onComplete: ({ status }) => {
          if (!isCurrentQuestionRequest(request, animationRequest, slideIndex)) return;
          if (status !== "complete") {
            showQuestionSpeechFallback();
            return;
          }
          state.questionSpeechPending = false;
          state.questionAsked = true;
          state.questionSpeechRequest += 1;
          if (repeatButton) repeatButton.disabled = !state.currentNarration.trim();
          if (speechStatus) speechStatus.textContent = "";
          updateInteractionControls();
        }
      });
    }).catch(() => {
      if (isCurrentQuestionRequest(request, animationRequest, slideIndex)) {
        showQuestionSpeechFallback();
      }
    });
  }

  function speakNarration(text = state.currentNarration, {
    onComplete = () => {},
    onStart = () => {},
    userInitiated = false,
    voice = null,
    speaker = "guide",
    rate = 0.94,
    pitch = 0.92
  } = {}) {
    if (!("speechSynthesis" in window)
      || !window.speechSynthesis
      || typeof window.SpeechSynthesisUtterance !== "function") {
      onComplete({ status: "unavailable" });
      return;
    }
    cancelNarration();
    state.speechRequest += 1;
    const requestCode = state.speechRequest;
    let utterance;
    let completed = false;
    const finish = (status = "complete") => {
      if (completed || requestCode !== state.speechRequest) return;
      completed = true;
      if (state.speechTimeout !== null) {
        window.clearTimeout(state.speechTimeout);
        state.speechTimeout = null;
      }
      window.backgroundMusic?.setSpeechActive(false);
      root.classList.remove("is-speaking");
      onComplete({ status });
    };
    const startSpeech = selectedVoice => {
      if (requestCode !== state.speechRequest) return;
      if (!selectedVoice || (speaker === "visitor" && !voice)) {
        finish("unavailable");
        return;
      }
      try {
        utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.voice = selectedVoice;
        utterance.onstart = () => {
          if (requestCode === state.speechRequest) {
            if (state.speechTimeout !== null) window.clearTimeout(state.speechTimeout);
            if (speaker === "guide") root.classList.add("is-speaking");
            window.backgroundMusic?.setSpeechActive(true);
            if (userInitiated) state.narrationEnabled = true;
            onStart();
            const estimatedPlaybackMs = text.trim().split(/\s+/).length * 900;
            state.speechTimeout = window.setTimeout(
              () => finish("failed"),
              Math.min(90000, Math.max(30000, estimatedPlaybackMs))
            );
          }
        };
        utterance.onend = () => finish("complete");
        utterance.onerror = (event) => finish(event.error === "not-allowed" ? "blocked" : "failed");
        window.speechSynthesis.speak(utterance);
      } catch {
        finish("failed");
      }
    };

    state.speechTimeout = window.setTimeout(() => finish("failed"), 10000);
    if (voice) {
      startSpeech(voice);
    } else if (speaker === "visitor") {
      finish("unavailable");
    } else {
      voiceSelection.waitForEnglishVoices()
        .then(voices => startSpeech(voiceSelection.getMoonGuideVoice(voices)))
        .catch(() => finish("unavailable"));
    }
  }

  function handleNextSlide() {
    if (state.transitionLocked || !state.controlsReady || state.questionSpeechPending || state.questionVoiceUnavailable) return;
    advanceToNextSlide();
  }

  function handleAskQuestion() {
    if (state.transitionLocked || !state.controlsReady || state.questionSpeechPending || state.questionVoiceUnavailable) return;
    const currentSlide = getCurrentSlide();
    if (!currentSlide?.response || state.questionAsked) return;
    speakQuestionBeforeAdvance(currentSlide);
  }

  function advanceToNextSlide() {
    if (state.transitionLocked || !state.controlsReady) return;
    const currentSlide = getCurrentSlide();
    if (!currentSlide) return;
    if (state.slideIndex >= storySlides.length - 1 || currentSlide.isFinalSlide) {
      showFinalCta();
      return;
    }
    startTransition(state.slideIndex + 1);
  }

  function handlePreviousSlide() {
    if (state.transitionLocked || !state.controlsReady) return;
    if (state.slideIndex <= state.navigationFloor) return;
    startTransition(state.slideIndex - 1);
  }

  function scheduleTransition(callback, delay) {
    if (state.transitionTimer !== null) {
      window.clearTimeout(state.transitionTimer);
    }
    state.transitionTimer = window.setTimeout(() => {
      state.transitionTimer = null;
      if (state.transitionLocked) callback();
    }, delay);
  }

  function getMissionIntroName(stage) {
    return stage.shortLabel || stage.title;
  }

  async function startMissionOpening(targetSlideIndex, stage, reducedMotion) {
    const request = ++state.missionOpeningRequest;
    state.isMissionOpening = true;
    root.classList.add("is-mission-opening");
    state.slideIndex = targetSlideIndex;
    let renderedSlide;

    try {
      renderedSlide = renderCurrentSlide({ deferNarration: true });
      await Promise.all([wait(1000), renderedSlide.imageReady]);
      if (request !== state.missionOpeningRequest) return;

      showSpeakerScene("student");
      root.classList.add("is-mission-materializing");
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        if (request === state.missionOpeningRequest) {
          root.classList.add("is-mission-materialized");
        }
      }));
      await wait(reducedMotion ? 180 : 680);
      if (request !== state.missionOpeningRequest) return;

      root.classList.remove("is-mission-opening", "is-mission-materializing", "is-mission-materialized");
      showSpeakerScene("guide");
      if (renderedSlide) {
        sequenceSlideMessages(
          renderedSlide.slide,
          renderedSlide.narration,
          renderedSlide.animationRequest
        );
      }
    } catch (error) {
      console.error("Moon mission opening failed", error);
    } finally {
      if (request === state.missionOpeningRequest) {
        state.isMissionOpening = false;
        root.classList.remove("is-mission-opening", "is-mission-materializing", "is-mission-materialized");
        root.inert = false;
        state.transitionLocked = false;
        updateInteractionControls();
      }
    }
  }

  function startMissionIntroduction(targetSlideIndex, stage, reducedMotion) {
    const darkenDuration = reducedMotion ? 180 : 360;
    const titleDuration = reducedMotion ? 650 : 1700;
    const revealDuration = reducedMotion ? 180 : 460;
    transitionLayer.classList.remove("is-mission-intro");
    missionIntroTitle.textContent = `Let's visit ${getMissionIntroName(stage)}`;
    transitionLayer.setAttribute("aria-hidden", "false");
    transitionLayer.classList.add("is-active");

    scheduleTransition(() => {
      transitionLayer.classList.add("is-mission-intro");
      scheduleTransition(() => {
        state.slideIndex = targetSlideIndex;
        const renderedSlide = renderCurrentSlide({ deferNarration: true });
        transitionLayer.classList.remove("is-mission-intro", "is-active");
        scheduleTransition(() => {
          root.inert = false;
          transitionLayer.setAttribute("aria-hidden", "true");
          if (renderedSlide) {
            sequenceSlideMessages(
              renderedSlide.slide,
              renderedSlide.narration,
              renderedSlide.animationRequest
            );
          }
          state.transitionLocked = false;
          updateInteractionControls();
        }, revealDuration);
      }, titleDuration);
    }, darkenDuration);
  }

  function startTransition(targetSlideIndex) {
    if (state.transitionLocked || targetSlideIndex < 0 || targetSlideIndex >= storySlides.length) return;
    state.transitionLocked = true;
    updateMissionMediaControls();
    state.questionSpeechRequest += 1;
    state.questionSpeechPending = false;
    state.questionVoiceUnavailable = false;
    root.inert = true;
    cancelSlideAnimations();
    cancelNarration();
    state.controlsReady = false;
    updateInteractionControls();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const currentSlide = getCurrentSlide();
    const targetSlide = storySlides[targetSlideIndex];
    const changesScene = currentSlide.stageIndex !== targetSlide.stageIndex;
    const entersMission = changesScene
      && targetSlide.stageIndex > 0
      && targetSlide.stageIndex < storyStages.length - 1;
    if (entersMission) {
      startMissionOpening(targetSlideIndex, targetSlide.stage, reducedMotion);
      return;
    }
    if (changesScene && targetSlide.stageIndex === storyStages.length - 1) {
      startMissionIntroduction(targetSlideIndex, targetSlide.stage, reducedMotion);
      return;
    }
    if (changesScene && !reducedMotion) {
      transitionLayer.classList.add("is-active");
    }
    const delay = changesScene && !reducedMotion ? 360 : 0;
    setTimeout(() => {
      state.slideIndex = targetSlideIndex;
      const renderedSlide = renderCurrentSlide({
        imageTransition: !changesScene && currentSlide.stageIndex === targetSlide.stageIndex
      });
      if (changesScene) transitionLayer.classList.remove("is-active");
      Promise.resolve(renderedSlide?.imageReady).finally(() => {
        setTimeout(() => {
          state.transitionLocked = false;
          root.inert = false;
          updateMissionMediaControls();
          updateInteractionControls();
        }, changesScene && !reducedMotion ? 220 : 100);
      });
    }, delay);
  }

  if (storyMissionIndexButton) {
    storyMissionIndexButton.addEventListener("click", toggleMissionIndex);
  }

  previousMissionMediaButton?.addEventListener("click", () => changeMissionMedia(-1));
  nextMissionMediaButton?.addEventListener("click", () => changeMissionMedia(1));

  if (playNarrationButton) playNarrationButton.addEventListener("click", () => {
    const slideRequest = state.slideAnimationRequest;
    speakNarration(state.currentNarration, {
      userInitiated: true,
      onStart: () => {
        if (slideRequest !== state.slideAnimationRequest) return;
        setAutoplayFallbackVisible(false);
      },
      onComplete: ({ status }) => {
        if (slideRequest !== state.slideAnimationRequest) return;
        if (status !== "complete") {
          setAutoplayFallbackVisible(true, status);
          return;
        }
        if (repeatButton) repeatButton.disabled = false;
        state.resumeNarrationGate?.();
      }
    });
  });

  if (continueReadingButton) continueReadingButton.addEventListener("click", continueWithoutNarration);

  if (repeatButton) {
    repeatButton.setAttribute("aria-label", "Repeat Dr. Fredrick's narration");
  }

  if (playNarrationButton) {
    playNarrationButton.setAttribute("aria-label", "Play Dr. Fredrick's narration");
  }

  if (continueReadingButton) {
    continueReadingButton.setAttribute("aria-label", "Continue the story without voice narration");
  }

  const detachStoryAudio = () => {
    state.missionOpeningRequest += 1;
    state.isMissionOpening = false;
    state.imageTransitionRequest += 1;
    root.classList.remove("is-mission-opening", "is-mission-materializing", "is-mission-materialized");
    hardwareImage?.classList.remove("is-image-fading-out", "is-image-materializing");
    state.questionSpeechRequest += 1;
    state.questionSpeechPending = false;
    cancelNarration();
    cancelSlideAnimations();
  };
  window.addEventListener("pagehide", detachStoryAudio);

  if (repeatButton) {
    repeatButton.addEventListener("click", () => {
      speakNarration(state.currentNarration, {
        onStart: () => setAutoplayFallbackVisible(false),
        onComplete: ({ status }) => {
          if (status !== "complete") setAutoplayFallbackVisible(true, status);
        }
      });
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && "speechSynthesis" in window) {
      if (state.questionSpeechPending) {
        state.questionSpeechRequest += 1;
        state.questionSpeechPending = false;
        showQuestionSpeechFallback();
      }
      cancelNarration();
      if (state.narrationPending && !state.transitionLocked) {
        setAutoplayFallbackVisible(true, "failed");
      }
    }
  });

  const bottomPreviousButton = document.getElementById("story-previous-slide");
  const bottomAdvanceButton = document.getElementById("story-advance-slide");
  bottomPreviousButton?.addEventListener("click", handlePreviousSlide);
  bottomAdvanceButton?.addEventListener("click", handleNextSlide);
  renderCurrentSlide();
})();
