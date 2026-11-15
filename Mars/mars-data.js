"use strict";

window.MARS_ARCHIVE = {
  title: "The Red Planet Archive",
  guide: "Dr. Fredrick",
  visitor: "Leo",
  chapters: [
    {
      id: "prologue",
      title: "The Red Planet Archive",
      label: "Prologue",
      status: "OVERVIEW",
      statusDetail: "Five places to investigate.",
      setting: "Mars archive overview",
      location: {
        mission: "Mars archive overview",
        spacecraft: "Multiple missions",
        body: "Mars",
        locationType: "Overview — no single landing location",
        note: "Choose a mission in the Index to view its specific destination."
      },
      evidenceTask: "Selecting a site opens an archive card with mission status, timeline, NASA image, location map and a “View evidence” control. Do not imply continuous live telemetry; show only documented communication events.",
      lines: [
        { speaker: "leo", text: "Why are we looking for silent machines? If they stopped working, isn’t their story already over?", image: null },
        { speaker: "avery", text: "Their missions may be over. That is not the same as their stories being over. Some left cameras, instruments, tracks and samples behind. Those records changed what we know about Mars.", image: null },
        { speaker: "leo", text: "So the signal can disappear, but the evidence stays?", image: null },
        { speaker: "avery", text: "Exactly. We’ll investigate five places. At each one, we’ll ask when the signal ended, what remains, what the machine discovered, and what we can learn from it.", image: null },
        { speaker: "leo", text: "Then don’t just tell me. Show me the evidence.", image: null }
      ]
    },
    {
      id: "viking",
      title: "Viking 1 — The First Long Conversation",
      label: "Viking 1",
      status: "COMPLETED",
      statusDetail: "Landed 20 July 1976 · Communications ended 13 November 1982.",
      setting: "Chryse Planitia",
      location: {
        mission: "Viking 1",
        spacecraft: "Viking 1 lander",
        body: "Mars",
        locationType: "Robotic landing",
        latitude: 22.27,
        longitude: 312.05,
        latitudeLabel: "22.27° N",
        longitudeLabel: "312.05° E (47.95° W)",
        verified: true,
        sourceUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075C",
        color: [184, 89, 46],
        note: "NASA NSSDCA reports 22.27° N, 312.05° E (planetocentric)."
      },
      evidenceTask: "Show the first surface image beside the last-contact timeline. Compare the planned mission duration with the actual operating period. A “What did Viking find about life?” panel must distinguish chemical reactivity from confirmed life.",
      lines: [
        { speaker: "leo", text: "This lander has been here since the 1970s. Was it really the first machine to work on Mars?", image: null },
        {
          speaker: "avery",
          text: "Viking 1 was the first successful U.S. spacecraft to land and operate on Mars. On July 20, 1976, it began sending images from Chryse Planitia. The mission was designed for about 90 days, but the lander worked for more than six years.",
          image: {
            src: "https://assets.science.nasa.gov/content/dam/science/psd/photojournal/pia/pia00/pia00381/PIA00381.jpg",
            alt: "Viking 1's first photograph from the Martian surface, with a lander footpad and nearby rocks",
            sourceUrl: "https://science.nasa.gov/photojournal/first-photograph-taken-on-mars-surface/"
          }
        },
        { speaker: "leo", text: "What did it look for?", image: null },
        { speaker: "avery", text: "Among other things, Viking carried biology experiments. They produced unexpected chemical results, but did not provide definitive evidence of living microorganisms. The result was important — and unresolved.", image: null },
        { speaker: "leo", text: "And what finally happened?", image: null },
        { speaker: "avery", text: "NASA records say a faulty command interrupted communications in November 1982. Attempts to regain contact failed. The lander was later named the Thomas A. Mutch Memorial Station, after the leader of the Viking imaging team.", image: null },
        { speaker: "leo", text: "So we know when the conversation ended, but we shouldn’t invent exactly what went wrong.", image: null },
        { speaker: "avery", text: "That’s the discipline of an archive: tell what the evidence supports, and mark the rest as unknown.", image: null }
      ]
    },
    {
      id: "pathfinder",
      title: "Pathfinder & Sojourner — The Machine That Rolled",
      label: "Pathfinder & Sojourner",
      status: "COMPLETED",
      statusDetail: "Landed 4 July 1997 · Last data 27 September 1997 · Mission ended 10 March 1998.",
      setting: "Ares Vallis",
      location: {
        mission: "Mars Pathfinder & Sojourner",
        spacecraft: "Carl Sagan Memorial Station (Pathfinder lander)",
        body: "Mars",
        locationType: "Robotic landing; Sojourner deployed nearby",
        latitude: 19.33,
        longitude: -33.55,
        latitudeLabel: "19.33° N",
        longitudeLabel: "33.55° W",
        verified: true,
        sourceUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-068A",
        color: [184, 89, 46],
        note: "Coordinates mark the Pathfinder lander. Sojourner roved nearby; its deployment point is not separately plotted."
      },
      evidenceTask: "Let users inspect a NASA landing image and toggle labels for the lander, deflated airbags, rover and terrain. A second panel shows Sojourner’s path and APXS target images. Keep landing reconstructions separate from actual photographs.",
      lines: [
        { speaker: "leo", text: "This white material around the lander looks like a deflated balloon. Did NASA really bounce a spacecraft onto Mars?", image: null },
        {
          speaker: "avery",
          text: "Yes. Pathfinder used a protective airbag system. It was not twenty-four separate beach balls: four large multi-lobed bags, each made from interconnected smaller spheres, cushioned the lander. It bounced at least fifteen times before coming to rest.",
          image: {
            src: "./mars_images'''/Pathfinder_1.png",
            alt: "Pathfinder's rover and deflated airbags on the Martian terrain shortly after landing",
            sourceUrl: "https://science.nasa.gov/photojournal/pathfinders-rover-airbags-and-martian-terrain/"
          }
        },
        { speaker: "leo", text: "And that tiny rover on the ramp?", image: null },
        {
          speaker: "avery",
          text: "Sojourner. It was the first wheeled rover to operate on another planet. Planned for seven days, it explored for 83. Its Alpha Proton X-ray Spectrometer examined rocks and soil, including a rock called Yogi.",
          image: {
            src: "./mars_images'''/Pathfinder_4.png",
            alt: "Sojourner rover using its Alpha Proton X-ray Spectrometer on the rock Yogi",
            sourceUrl: "https://science.nasa.gov/photojournal/sojourner-and-yogi/"
          }
        },
        {
          speaker: "leo",
          text: "Did the rocks prove a giant flood?",
          image: {
            src: "./mars_images'''/Pathfinder_3.png",
            alt: "Portions of Pathfinder's deflated airbags and lander petal amid Martian soil and rocks",
            sourceUrl: "https://science.nasa.gov/photojournal/lander-airbags-and-martian-terrain/"
          }
        },
        {
          speaker: "avery",
          text: "Pathfinder’s landscape and rock observations supported the interpretation that powerful floods shaped Ares Vallis. But one instrument reading or one rounded rock is not a complete reconstruction of the whole river system. We show the evidence and its limits.",
          image: null
        },
        { speaker: "leo", text: "When did the signal stop?", image: null },
        { speaker: "avery", text: "The last data transmission from Pathfinder was received on September 27, 1997. NASA later ended the mission on March 10, 1998, after attempts to restore communication.", image: null }
      ]
    },
    {
      id: "spirit-opportunity",
      title: "Spirit & Opportunity — Twin Detectives of the Red Desert",
      label: "Spirit & Opportunity",
      status: "COMPLETED",
      statusDetail: "Landed 3 January 2004 · Missions ended 2010 and 2018.",
      setting: "Gusev Crater & Meridiani Planum",
      location: {
        mission: "Spirit & Opportunity",
        spacecraft: "Spirit and Opportunity rovers",
        body: "Mars",
        locationType: "Dual robotic landings",
        note: "The twin rovers explored different Martian terrains while carrying the same kinds of rock-analysis tools."
      },
      evidenceTask: "Compare rover motion, instrument work and mineral clues from both landing sites. Link each observation to the larger story of ancient water on Mars.",
      lines: [
        {
          speaker: "avery",
          text: "Two robotic explorers arrived on Mars in January 2004, each with a mission to investigate the planet's past. Their names were Spirit and Opportunity, and they were designed to work for just 90 Martian days. But they went on exploring for years!",
          media: [
            {
              id: "S1",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S1.png",
              alt: "Spirit and Opportunity on the Martian surface during the early mission",
              sourceUrl: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/"
            },
            {
              id: "S1(1)",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S1(1).png",
              alt: "The pair of Mars rovers in the desert-like terrain of the planet",
              sourceUrl: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/"
            }
          ]
        },
        {
          speaker: "avery",
          text: "They lasted far longer than expected! Martian winds sometimes swept dust off their solar panels, helping them collect more sunlight and continue exploring.",
          media: [
            {
              id: "S2",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S2.png",
              alt: "A rover solar array coated in dust against the Martian horizon",
              sourceUrl: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/"
            },
            {
              id: "S2(1)",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S2(1).png",
              alt: "The twin rover mission surviving longer than planned thanks to sunlight and dust-clearing winds",
              sourceUrl: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/"
            }
          ]
        },
        {
          speaker: "avery",
          text: "Scientists wanted to know whether Mars once had lakes, rivers or other watery environments where life might have existed. To find clues, they needed mobile robots that could travel across the surface, climb hills and study rocks in different locations.",
          media: [
            {
              id: "S3",
              type: "video",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S3.mp4",
              poster: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S3.png",
              alt: "Opportunity driving across the Martian terrain",
              sourceUrl: "https://science.nasa.gov/photojournal/rear-view-of-opportunitys-drive/"
            },
            {
              id: "S3(1)",
              type: "video",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S3(1).mp4",
              poster: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S3(1).png",
              alt: "Spirit and Opportunity move through rough terrain",
              sourceUrl: "https://science.nasa.gov/photojournal/rover-takes-a-sunday-drive/"
            },
            {
              id: "S3(2)",
              type: "video",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S3(2).mp4",
              poster: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S3(2).png",
              alt: "Rover exploration footage of the red desert surface",
              sourceUrl: "https://science.nasa.gov/photojournal/rear-view-of-opportunitys-drive/"
            },
            {
              id: "S3(3)",
              type: "video",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S3(3).mp4",
              poster: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S3(3).png",
              alt: "A close rover pass across the Martian landscape",
              sourceUrl: "https://science.nasa.gov/photojournal/rover-takes-a-sunday-drive/"
            },
            {
              id: "S3(4)",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S3(4).png",
              alt: "Martian landscape waiting for rover investigation",
              sourceUrl: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/"
            },
            {
              id: "S3(5)",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S3(5).png",
              alt: "Wide rover path across the surface of Mars",
              sourceUrl: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/"
            }
          ]
        },
        {
          speaker: "avery",
          text: "These rover twins carried special science instruments to examine Martian rocks. Both rovers carried a Rock Abrasion Tool (RAT) with a diamond-tipped grinder to scrape away dusty rock surfaces. Then, X-ray instruments and other scientific tools helped identify the minerals and discover how water had changed the rocks. They also carried Mössbauer and alpha particle X-ray spectrometers to investigate what the Martian rocks were made of.",
          media: [
            {
              id: "S4",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S4.png",
              alt: "A rover calibration and inspection shot with its tools and instruments",
              sourceUrl: "https://science.nasa.gov/photojournal/spring-cleaning/"
            },
            {
              id: "S4(1)",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S4(1).png",
              alt: "A rover tool scrape on a rocky Martian surface",
              sourceUrl: "https://science.nasa.gov/photojournal/spring-cleaning/"
            },
            {
              id: "S4(2)",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S4(2).png",
              alt: "A microscope image showing the grain structure of a rock after inspection",
              sourceUrl: "https://science.nasa.gov/photojournal/martian-microscope/"
            },
            {
              id: "S4(3)",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S4(3).png",
              alt: "Rock formation posing a scientific mystery on Mars",
              sourceUrl: "https://science.nasa.gov/photojournal/mars-rock-formation-poses-mystery-2/"
            },
            {
              id: "S4(4)",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S4(4).png",
              alt: "Close view of a rock after abrasion by the Opportunity rover",
              sourceUrl: "https://science.nasa.gov/photojournal/close-up-of-esperance-after-abrasion-by-opportunity/"
            }
          ]
        },
        {
          speaker: "avery",
          text: "They found exciting clues! Opportunity discovered tiny, round formations called 'blueberries', rich in a mineral called hematite. Spirit found rocks rich in silica, suggesting that ancient hot springs or steam vents once existed on Mars!",
          media: [
            {
              id: "S5",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S5.png",
              alt: "Opportunity's blueberry-like Martian formations, rich in hematite",
              sourceUrl: "https://science.nasa.gov/resource/martian-blueberries-2/"
            },
            {
              id: "S5(1)",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S5(1).png",
              alt: "The hematite-rich concretions nicknamed blueberries on Mars",
              sourceUrl: "https://science.nasa.gov/resource/martian-blueberries-2/"
            },
            {
              id: "S5(2)",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S5(2).png",
              alt: "Silica-rich soil excavated by Spirit reveals evidence of hot springs or steam vents",
              sourceUrl: "https://science.nasa.gov/photojournal/silica-rich-soil-found-by-spirit/"
            },
            {
              id: "S5(3)",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S5(3).png",
              alt: "Spirit's bright silica excavation trench on the Martian surface",
              sourceUrl: "https://science.nasa.gov/photojournal/rovers-wheel-churns-up-bright-martian-soil/"
            }
          ]
        },
        {
          speaker: "avery",
          text: "Spirit and Opportunity discovered strong evidence that Mars once had liquid water and environments that could have supported life. Spirit explored for over six years, while Opportunity travelled about 28 miles over nearly 15 years. Their discoveries completely changed how scientists understood the Red Planet!",
          media: [
            {
              id: "S6",
              type: "video",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S6.mp4",
              poster: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S6.png",
              alt: "A panoramic overview of Opportunity's long journey and legacy",
              sourceUrl: "https://science.nasa.gov/resource/opportunity-legacy-pan/"
            },
            {
              id: "S6(1)",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S6(1).png",
              alt: "Opportunity's wide legacy panorama across the Martian desert",
              sourceUrl: "https://science.nasa.gov/resource/opportunitys-marathon-journey/"
            },
            {
              id: "S6(2)",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S6(2).png",
              alt: "A long-distance mission route showing the rover's marathon journey",
              sourceUrl: "https://science.nasa.gov/resource/opportunitys-marathon-journey/"
            },
            {
              id: "S6(3)",
              type: "image",
              src: "./mars_images/Spirit and Opportunity/Spirit and Opportunity S6(3).png",
              alt: "Legacy view of the rover mission and scientific exploration on Mars",
              sourceUrl: "https://science.nasa.gov/resource/opportunity-legacy-pan/"
            }
          ]
        }
      ]
    },
    {
      id: "opportunity",
      title: "Opportunity — A Long Journey Into the Storm",
      label: "Opportunity",
      status: "COMPLETED",
      statusDetail: "Landed 25 January 2004 · Final communication 10 June 2018 · Mission ended 13 February 2019.",
      setting: "Meridiani Planum",
      location: {
        mission: "Opportunity",
        spacecraft: "Opportunity rover",
        body: "Mars",
        locationType: "Robotic landing",
        latitude: -1.946,
        longitude: 354.473,
        latitudeLabel: "1.946° S",
        longitudeLabel: "354.473° E",
        verified: true,
        sourceUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A",
        color: [184, 89, 46],
        note: "NASA NSSDCA reports IAU 2000 body-centered coordinates."
      },
      evidenceTask: "Animate the traverse as a route line, not as a live moving rover. Provide a close-up of hematite concretions, what the mineral indicates, and the timeline from landing to final communication. Avoid invented battery gauges and fictional last-message quotations.",
      lines: [
        { speaker: "leo", text: "This rover was designed for only 90 days. Why is its route so long?", image: null },
        { speaker: "avery", text: "Opportunity worked for almost fifteen years and travelled more than 45 kilometres. Its journey turned a short mission into a long investigation of Martian rocks and ancient environments.", image: null },
        { speaker: "leo", text: "What are these little round stones?", image: null },
        { speaker: "avery", text: "They are hematite-rich concretions, nicknamed blueberries. Hematite commonly forms in the presence of water. Opportunity’s observations showed that water altered these rocks in the past — including acidic, salty conditions. That is evidence of ancient water, not proof of a planet-wide ocean.", image: null },
        { speaker: "leo", text: "What happened in 2018?", image: null },
        { speaker: "avery", text: "A severe, planet-wide dust storm darkened the rover’s location. Opportunity depended on sunlight for power. Its final communication reached Earth on June 10, 2018. After months of recovery attempts, NASA declared the mission complete in February 2019.", image: null },
        { speaker: "leo", text: "The rover stopped, but the route and the rock evidence are still here.", image: null },
        { speaker: "avery", text: "Yes. A journey can end and still leave a map for everyone who follows.", image: null }
      ]
    },
    {
      id: "curiosity",
      title: "Curiosity — The Living Laboratory",
      label: "Curiosity",
      status: "ACTIVE",
      statusDetail: "Landed 6 August 2012 · Active mission.",
      setting: "Gale Crater",
      location: {
        mission: "Curiosity",
        spacecraft: "Curiosity rover",
        body: "Mars",
        locationType: "Robotic landing",
        sourceUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2011-070A",
        color: [184, 89, 46],
        note: "NASA confirms the Gale Crater landing, but this record does not provide verified latitude and longitude; no marker is shown."
      },
      evidenceTask: "Use a Sky Crane sequence as an explicitly labelled reconstruction. Switch to a real drilling image and a simple lake-environment diagram. A wheel-damage slider may compare images, but do not imply the rover is abandoned.",
      lines: [
        { speaker: "leo", text: "This rover is still moving. Why is it in a museum about abandoned machines?", image: null },
        { speaker: "avery", text: "It is not abandoned. Curiosity is our living contrast: a rover still exploring, using lessons from earlier missions. Its landing system — the Sky Crane — lowered a car-sized laboratory to the surface on tethers.", image: null },
        { speaker: "leo", text: "What did it find in Gale Crater?", image: null },
        { speaker: "avery", text: "Curiosity found geological and chemical evidence that Gale Crater once contained environments with liquid water and conditions that could have supported microbial life. At Yellowknife Bay, the rocks preserve evidence of an ancient lake environment.", image: null },
        { speaker: "leo", text: "Could someone have drunk that water?", image: null },
        { speaker: "avery", text: "We cannot say that. The science question is whether the ancient environment was habitable for microbes, not whether it was safe or drinkable for people. Habitable does not mean human-ready.", image: null },
        { speaker: "leo", text: "And the holes in its wheels?", image: null },
        { speaker: "avery", text: "Sharp rocks damaged the wheels as Curiosity crossed the terrain. Engineers adapted driving strategies and software. That is another legacy: every mission teaches the next one how to explore more carefully.", image: null }
      ]
    },
    {
      id: "perseverance",
      title: "Perseverance & Ingenuity — A Rover, a Helicopter, and a Cache",
      label: "Perseverance & Ingenuity",
      status: "ACTIVE",
      statusDetail: "Landed 18 February 2021 · Ingenuity Flight 72: 18 January 2024 · Retired technology demonstration.",
      setting: "Jezero Crater",
      location: {
        mission: "Perseverance & Ingenuity",
        spacecraft: "Perseverance rover landing site",
        body: "Mars",
        locationType: "Robotic landing; Ingenuity deployed separately",
        sourceUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2020-052A",
        color: [184, 89, 46],
        note: "NASA confirms the Jezero Crater landing but this record does not provide verified coordinates. Ingenuity's deployment location is distinct and is not plotted."
      },
      evidenceTask: "Provide two linked cards: “Active explorer — Perseverance” and “Retired technology demonstrator — Ingenuity.” Distinguish the sample depot from samples still carried by the rover. Any sample-return visual must be labelled conceptual and contingent.",
      lines: [
        { speaker: "leo", text: "This rover is still working, but the helicopter beside it is no longer flying?", image: null },
        { speaker: "avery", text: "Correct. Perseverance remains an active explorer. Ingenuity completed 72 flights, far beyond its original five-flight technology demonstration. It proved powered, controlled flight was possible in the thin Martian atmosphere.", image: null },
        { speaker: "leo", text: "Why did Ingenuity stop?", image: null },
        { speaker: "avery", text: "During Flight 72, the helicopter made an anomalous landing and rotor damage was later confirmed. NASA’s investigation found that navigation data became unreliable over relatively featureless terrain, likely contributing to the chain of events. We should describe that as the investigation’s conclusion, not as a simple single-point failure.", image: null },
        { speaker: "leo", text: "And the little tubes Perseverance leaves behind?", image: null },
        { speaker: "avery", text: "They contain carefully selected samples of Martian rock and regolith. Some were placed in a documented depot at Three Forks. They are stored for possible future retrieval and study. A return to Earth is not something this exhibit should promise as guaranteed.", image: null },
        { speaker: "leo", text: "So one machine is still collecting evidence, while another has finished proving a new way to fly.", image: null },
        { speaker: "avery", text: "And both are part of the same archive — one still growing, one already changing what engineers can attempt next.", image: null }
      ]
    },
    {
      id: "finale",
      title: "The Archive Is Still Being Written",
      label: "Finale",
      status: "ARCHIVE",
      statusDetail: "Completed missions fade; active explorers remain at work.",
      setting: "A global view of Mars",
      location: {
        mission: "Mars archive finale",
        spacecraft: "Multiple missions",
        body: "Mars",
        locationType: "Overview — no single landing location",
        note: "Choose a mission in the Index to view its specific destination."
      },
      evidenceTask: "Ask learners to select one claim and identify the image, measurement or mission record that supports it.",
      uncertainty: "Do not turn ambiguous biology results, likely failure causes or future sample-return plans into certainty.",
      lines: [
        { speaker: "leo", text: "Viking taught us how to land. Pathfinder gave us a rover. Opportunity showed how much a small machine could do. Curiosity is still reading the rocks. Perseverance is collecting samples. And Ingenuity showed that flight on another world was possible.", image: null },
        { speaker: "avery", text: "That is the archive. Not a graveyard of failed machines, but a record of questions, experiments, discoveries and lessons. Some missions ended. Some are still working. Every one changed what we can ask next.", image: null },
        { speaker: "leo", text: "Then the important question isn’t only what was left behind. It’s what we can learn from it.", image: null },
        { speaker: "avery", text: "Exactly. Choose an object. Open its evidence. Follow its signal as far as the record allows — and no further.", image: null },
        { speaker: "leo", text: "The next discovery starts with a better question.", image: null }
      ]
    }
  ]
};
