"use strict";

(() => {
  const voiceSelection = window.museumVoiceSelection;
  if (!voiceSelection) {
    throw new Error("Shared voice selection is unavailable. Check that voice-selection.js loads first.");
  }

  const storyStages = window.DEEP_SPACE_STORY_STAGES;
  const requiredStageTitles = [
    'The Edge of the Solar System',
    'Pioneer 10 — The First Messenger to Jupiter',
    'Galileo — The Wounded Explorer of Jupiter',
    'Cassini–Huygens — The Worlds of Saturn',
    'Dawn — The Ion-Powered Traveller',
    'Kepler / K2 — The Planet Hunter',
    'DART — A Test of Planetary Defense',
    'The Eternal Outposts'
  ];
  if (!Array.isArray(storyStages) || storyStages.length !== requiredStageTitles.length
    || storyStages.some((stage, index) => stage.title !== requiredStageTitles[index])) {
    throw new Error('Deep Space story data is missing or out of sequence.');
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
    const firstImage = images => images?.find(item => item?.image) || null;
    const directImage = (image, alt) => image ? { image, alt } : null;
    const answerImage = slide.conversationState === "answer"
      ? (slide.partIndex === slide.partCount - 1
        && directImage(node.finalAnswerImage, node.finalAnswerAlt))
        || directImage(node.answerImage, node.answerAlt)
        || firstImage(node.answerImageSequence)
        || directImage(node.responseImage, node.responseAlt)
        || firstImage(node.responseImageSequence)
      : null;
    const selectedImage = answerImage
      || firstImage(node.imageSequence)
      || directImage(node.image, node.alt)
      || directImage(node.responseImage, node.responseAlt)
      || firstImage(node.responseImageSequence)
      || directImage(stage.image, stage.alt);
    const normalizedImages = selectedImage
      ? [{ image: selectedImage.image, alt: selectedImage.alt || node.alt || stage.alt || "" }]
      : [];
    return {
      images: normalizedImages,
      image: normalizedImages[0]?.image || null,
      alt: normalizedImages[0]?.alt || ""
    };
  }

  const storySlides = [];
  storyStages.forEach((stage, stageIndex) => {
    stage.nodes.forEach((node, nodeIndex) => {
      const narrationParts = splitNarration(node.narration);
      narrationParts.forEach((narration, partIndex) => {
        const isQuestionSlide = partIndex === narrationParts.length - 1 && Boolean(node.response);
        storySlides.push({
          stage,
          stageIndex,
          node,
          nodeIndex,
          conversationState: "explanation",
          narration,
          evidenceSources: node.evidenceSources
            || window.DEEP_SPACE_EVIDENCE_SOURCES?.[node.id]
            || [],
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
          evidenceSources: node.evidenceSources
            || window.DEEP_SPACE_EVIDENCE_SOURCES?.[node.id]
            || [],
          partIndex,
          partCount: answerParts.length,
          response: "",
          isFinalSlide: stageIndex === storyStages.length - 1
            && nodeIndex === stage.nodes.length - 1
            && partIndex === answerParts.length - 1
        });
      });
    });
  });
  const stageSlides = storyStages.map((_, stageIndex) =>
    storySlides.filter((slide) => slide.stageIndex === stageIndex)
  );
  stageSlides.forEach((slides) => {
    slides.forEach((slide, index) => {
      slide.slideNumber = index + 1;
    });
  });

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
  const missionImageFrame = document.querySelector(".story-image-frame");
  const missionImageViewport = document.getElementById("mission-image-visual");
  const missionImageCaption = document.getElementById("mission-image-caption");
  const missionImageSourceControl = document.getElementById("mission-image-source-link");
  const scientificSourcesList = document.getElementById("scientific-sources-list");
  const scientificSourcesEmpty = document.getElementById("scientific-sources-empty");
  const imageCreditsList = document.getElementById("image-credits-list");
  const imageCreditsEmpty = document.getElementById("image-credits-empty");
  const visitorImage = document.getElementById("visitor-character");
  const visitorCaption = document.getElementById("visitor-caption");
  const guideCharacter = document.querySelector(".story-guide");
  const visitorCharacter = document.querySelector(".story-listener");
  const guideDialogue = document.getElementById("ranger-dialogue");
  const guideRow = document.querySelector(".story-guide-row");
  const userRow = document.querySelector(".story-user-row");

  function updateMissionImageFit() {
    if (!missionImageFrame || !hardwareImage?.naturalWidth || !hardwareImage.naturalHeight) return;
    const frameRect = missionImageFrame.getBoundingClientRect();
    const viewportRect = missionImageViewport.getBoundingClientRect();
    const frameWidth = frameRect.width;
    const frameHeight = frameRect.height;
    const controls = getComputedStyle(document.documentElement);
    const value = (name, fallback) => {
      const parsed = Number.parseFloat(controls.getPropertyValue(`--deepspace-mission-image-${name}`));
      return Number.isFinite(parsed) ? parsed : fallback;
    };
    const ratio = hardwareImage.naturalWidth / hardwareImage.naturalHeight;
    const requestedScale = Math.max(0, value("scale", 1));
    const fitWidth = Math.max(0, Math.min(
      value("max-width", 700),
      frameWidth,
      value("max-height", 500) * ratio,
      frameHeight * ratio
    ));
    const fitHeight = fitWidth / ratio;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const frameCenterX = frameRect.left + frameWidth / 2;
    const frameCenterY = frameRect.top + frameHeight / 2;
    const maximumScale = fitWidth && fitHeight
      ? Math.max(0, Math.min(
        (2 * Math.min(frameCenterX, viewportWidth - frameCenterX)) / fitWidth,
        (2 * Math.min(frameCenterY, viewportHeight - frameCenterY)) / fitHeight
      ))
      : requestedScale;
    const scale = Math.min(requestedScale, maximumScale);
    const width = fitWidth * scale;
    const height = fitHeight * scale;
    const minOffsetX = width / 2 - frameCenterX;
    const maxOffsetX = viewportWidth - width / 2 - frameCenterX;
    const minOffsetY = height / 2 - frameCenterY;
    const maxOffsetY = viewportHeight - height / 2 - frameCenterY;
    const requestedOffsetX = value("offset-x", 0);
    const requestedOffsetY = value("offset-y", 0);
    const centerOffsetX = frameCenterX - (viewportRect.left + viewportRect.width / 2);
    const centerOffsetY = frameCenterY - (viewportRect.top + viewportRect.height / 2);
    const offsetX = Math.max(minOffsetX, Math.min(requestedOffsetX, maxOffsetX));
    const offsetY = Math.max(minOffsetY, Math.min(requestedOffsetY, maxOffsetY));
    hardwareImage.style.setProperty("--deepspace-mission-image-fit-width", `${width}px`);
    hardwareImage.style.setProperty("--deepspace-mission-image-fit-height", `${height}px`);
    hardwareImage.style.setProperty("--deepspace-mission-image-center-x", `${centerOffsetX}px`);
    hardwareImage.style.setProperty("--deepspace-mission-image-center-y", `${centerOffsetY}px`);
    hardwareImage.style.setProperty("--deepspace-mission-image-fit-offset-x", `${offsetX}px`);
    hardwareImage.style.setProperty("--deepspace-mission-image-fit-offset-y", `${offsetY}px`);

    const constrainedSettings = [];
    if (Math.abs(requestedOffsetX - offsetX) > 0.1) {
      constrainedSettings.push(`horizontal offset ${requestedOffsetX}px (safe range ${minOffsetX.toFixed(1)}px to ${maxOffsetX.toFixed(1)}px)`);
    }
    if (Math.abs(requestedOffsetY - offsetY) > 0.1) {
      constrainedSettings.push(`vertical offset ${requestedOffsetY}px (safe range ${minOffsetY.toFixed(1)}px to ${maxOffsetY.toFixed(1)}px)`);
    }
    if (requestedScale - scale > 0.001) {
      constrainedSettings.push(`scale ${requestedScale} (maximum safe scale ${scale.toFixed(2)})`);
    }
    const limitMessage = constrainedSettings.length
      ? `Deep Space image settings are limited to keep the full image inside the screen: ${constrainedSettings.join(", ")}.`
      : "";
    if (limitMessage !== hardwareImage.dataset.limitMessage) {
      if (limitMessage) console.warn(limitMessage);
      hardwareImage.dataset.limitMessage = limitMessage;
      if (limitMessage) {
        missionImageFrame.setAttribute("aria-description", limitMessage);
      } else {
        missionImageFrame.removeAttribute("aria-description");
      }
    }
  }

  if (!missionImageFrame) {
    throw new Error("Deep Space mission image frame is missing from deepspace.html.");
  }
  hardwareImage.addEventListener("load", updateMissionImageFit);
  if (hardwareImage.complete) updateMissionImageFit();
  if ("ResizeObserver" in window) {
    new ResizeObserver(updateMissionImageFit).observe(missionImageViewport);
  }
  window.addEventListener("resize", updateMissionImageFit);
  new MutationObserver(updateMissionImageFit).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style"]
  });

  if (archive) {
    archive.hidden = true;
    archive.setAttribute("aria-hidden", "true");
    archive.inert = true;
  }

  if (storyButton) {
    storyButton.hidden = true;
  }

  function updateVisitorCharacter() {
    const visitorName = "USER";
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
    if (userRow) {
      userRow.hidden = showGuide;
      userRow.setAttribute("aria-hidden", String(showGuide));
    }
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
    controlsReady: false,
    questionSpeechRequest: 0,
    questionSpeechPending: false,
    questionVoiceUnavailable: false,
    slideAnimationRequest: 0,
    slideAnimationTimers: new Set(),
    transitionTimer: null,
    renderedSlide: null
  };

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
        if (image.naturalWidth > 0) resolve();
        else reject(new Error(`Image failed to load: ${image.currentSrc || image.src}`));
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

  function isCurrentSlideRender(slide, renderRequest) {
    return renderRequest === state.slideAnimationRequest
      && getCurrentSlide() === slide;
  }

  function cancelCurrentImageSequence() {
    state.imageTransitionRequest += 1;
  }

  function reportImageLoadError(error, request, slide, renderRequest) {
    if (request !== state.imageTransitionRequest
      || !isCurrentSlideRender(slide, renderRequest)) return;
    console.error("Deep Space image failed to load", error);
    if (speechStatus) speechStatus.textContent = "The mission image could not be loaded.";
  }

  function getEvidenceSources(slide) {
    return slide.evidenceSources || [];
  }

  function getImageSourceRecord(image) {
    return window.DEEP_SPACE_IMAGE_SOURCE_RECORDS?.[image.image]
      || window.DEEP_SPACE_IMAGE_SOURCE_RECORDS?.[image.image.split("/").pop()]
      || null;
  }

  function appendSourceListItem(source, fallbackTitle) {
    const item = document.createElement("li");
    const title = source.title || fallbackTitle;
    if (source.url && source.status !== "unverified") {
      const link = document.createElement("a");
      link.href = source.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = title;
      item.appendChild(link);
    } else {
      const label = document.createElement("span");
      label.textContent = title;
      item.appendChild(label);
    }

    if (source.statusText) {
      const status = document.createElement("span");
      status.className = "source-verification-status";
      status.textContent = source.statusText;
      item.appendChild(status);
    } else if (!source.url || source.status === "unverified") {
      const status = document.createElement("span");
      status.className = "source-verification-status";
      status.textContent = "Coming Soon";
      item.appendChild(status);
    }

    if (source.organization) {
      const organization = document.createElement("span");
      organization.className = "source-organization";
      organization.textContent = source.organization;
      item.appendChild(organization);
    }
    if (source.supports) {
      const supports = document.createElement("span");
      supports.className = "source-supports";
      supports.textContent = source.supports;
      item.appendChild(supports);
    }
    return item;
  }

  function updateSlideReferences(slide, image = null) {
    if (!scientificSourcesList || !imageCreditsList) return;
    scientificSourcesList.replaceChildren();
    imageCreditsList.replaceChildren();
    const evidenceSources = getEvidenceSources(slide);
    evidenceSources.forEach(source => {
      scientificSourcesList.appendChild(
        appendSourceListItem(source, "Untitled scientific source")
      );
    });
    if (scientificSourcesEmpty) {
      scientificSourcesEmpty.hidden = evidenceSources.length > 0;
      if (!evidenceSources.length) {
        scientificSourcesEmpty.textContent = slide.node.source
          ? `References not yet verified: ${slide.node.source}`
          : "No verified factual source is attached to this slide.";
      }
    }

    const imageRecord = image ? getImageSourceRecord(image) : null;
    if (image) {
      const imageSource = imageRecord || {
        imageFile: image.image,
        title: image.alt || image.image.split("/").pop(),
        organization: "Creator not identified in project records",
        imageType: /AI-generated/i.test(image.alt)
          ? "AI-generated conceptual image"
          : /artist.?s concept/i.test(image.alt)
            ? "Artist's concept"
            : "Image type unverified",
        status: "unverified",
        statusText: "Original image record and creator are unverified."
      };
      const sourceItem = appendSourceListItem(
        imageSource,
        imageSource.title || imageSource.imageFile || image.image
      );
      const filename = document.createElement("span");
      filename.className = "source-image-filename";
      filename.textContent = `File: ${image.image.split("/").pop()}`;
      sourceItem.appendChild(filename);
      if (imageSource.imageType) {
        const type = document.createElement("span");
        type.className = "source-image-type";
        type.textContent = imageSource.imageType;
        sourceItem.appendChild(type);
      }
      imageCreditsList.appendChild(sourceItem);
    }
    if (imageCreditsEmpty) {
      imageCreditsEmpty.hidden = Boolean(image);
      if (!image) {
        imageCreditsEmpty.textContent = "No image is assigned to this slide.";
      }
    }
    window.museumLocationView?.setImageSource(
      image?.image || null,
      imageRecord?.url || null,
      null
    );
    if ((!imageRecord?.url || imageRecord.status === "unverified")
      && missionImageSourceControl?.getAttribute("aria-disabled") === "true") {
      const sourceLabel = missionImageSourceControl.querySelector("span");
      if (sourceLabel) sourceLabel.textContent = "Coming Soon";
      missionImageSourceControl.setAttribute("aria-label", "Image source coming soon");
      missionImageSourceControl.title = "Image source coming soon";
    }
  }

  function setCurrentImage(slide, renderRequest, image, {
    transition = false,
    alt = slide.stage.alt
  } = {}) {
    if (!hardwareImage || !isCurrentSlideRender(slide, renderRequest)) {
      return Promise.resolve(false);
    }
    const assignedImage = image === undefined ? slide.stage.image : image;
    const request = ++state.imageTransitionRequest;
    if (!assignedImage) {
      hardwareImage.alt = alt;
      hardwareImage.hidden = true;
      hardwareImage.style.display = "none";
      hardwareImage.removeAttribute("src");
      hardwareImage.classList.remove("is-image-fading-out", "is-image-materializing");
      state.renderedImage = null;
      state.renderedSlide = slide;
      updateSlideReferences(slide, null);
      return Promise.resolve(true);
    }
    if (state.renderedImage === assignedImage) {
      hardwareImage.hidden = false;
      hardwareImage.style.display = "";
      hardwareImage.alt = alt;
      state.renderedSlide = slide;
      updateSlideReferences(slide, { image: assignedImage, alt });
      return waitForImage(hardwareImage).then(() =>
        request === state.imageTransitionRequest
          && isCurrentSlideRender(slide, renderRequest)
      ).catch(error => {
        reportImageLoadError(error, request, slide, renderRequest);
        return false;
      });
    }

    if (transition && state.renderedImage && state.renderedSlide !== slide) {
      hardwareImage.hidden = true;
      hardwareImage.style.display = "none";
      hardwareImage.classList.remove("is-image-fading-out", "is-image-materializing");
      return preloadImage(assignedImage).then(() => {
        if (request !== state.imageTransitionRequest
          || !isCurrentSlideRender(slide, renderRequest)) return false;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const fadeInDuration = reducedMotion ? 150 : 600;
        hardwareImage.hidden = false;
        hardwareImage.style.display = "";
        hardwareImage.alt = alt;
        hardwareImage.src = assignedImage;
        state.renderedImage = assignedImage;
        state.renderedSlide = slide;
        updateSlideReferences(slide, { image: assignedImage, alt });
        hardwareImage.classList.add("is-image-materializing");
        return new Promise(resolve => {
          window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
            if (request !== state.imageTransitionRequest
              || !isCurrentSlideRender(slide, renderRequest)) {
              resolve(false);
              return;
            }
            hardwareImage.classList.remove("is-image-materializing");
            wait(fadeInDuration).then(() => resolve(true));
          }));
        });
      }).catch(error => {
        if (request === state.imageTransitionRequest
          && isCurrentSlideRender(slide, renderRequest)) {
          state.renderedImage = null;
          state.renderedSlide = slide;
          hardwareImage.removeAttribute("src");
          reportImageLoadError(error, request, slide, renderRequest);
        }
        return false;
      });
    }

    hardwareImage.hidden = false;
    hardwareImage.style.display = "";
    hardwareImage.classList.remove("is-image-fading-out", "is-image-materializing");
    if (!transition || !state.renderedImage) {
      hardwareImage.alt = alt;
      hardwareImage.src = assignedImage;
      state.renderedImage = assignedImage;
      state.renderedSlide = slide;
      updateSlideReferences(slide, { image: assignedImage, alt });
      return waitForImage(hardwareImage).then(() =>
        request === state.imageTransitionRequest
          && isCurrentSlideRender(slide, renderRequest)
      ).catch(error => {
        reportImageLoadError(error, request, slide, renderRequest);
        return false;
      });
    }

    return preloadImage(assignedImage).then(() => {
      if (request !== state.imageTransitionRequest
        || !isCurrentSlideRender(slide, renderRequest)) return false;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const fadeOutDuration = reducedMotion ? 150 : 300;
      const fadeInDuration = reducedMotion ? 150 : 600;
      hardwareImage.classList.add("is-image-fading-out");
      return wait(fadeOutDuration).then(() => {
        if (request !== state.imageTransitionRequest
          || !isCurrentSlideRender(slide, renderRequest)) return false;
        hardwareImage.alt = alt;
        hardwareImage.src = assignedImage;
        state.renderedImage = assignedImage;
        state.renderedSlide = slide;
        updateSlideReferences(slide, { image: assignedImage, alt });
        hardwareImage.classList.remove("is-image-fading-out");
        hardwareImage.classList.add("is-image-materializing");
        return waitForImage(hardwareImage).then(() => new Promise(resolve => {
          window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
            if (request !== state.imageTransitionRequest
              || !isCurrentSlideRender(slide, renderRequest)) {
              resolve(false);
              return;
            }
            hardwareImage.classList.remove("is-image-materializing");
            wait(fadeInDuration).then(() => resolve(true));
          }));
        }));
      });
    }).catch(error => {
      if (request === state.imageTransitionRequest
        && isCurrentSlideRender(slide, renderRequest)) {
        hardwareImage.classList.remove("is-image-fading-out", "is-image-materializing");
        if (speechStatus) speechStatus.textContent = "The next mission image could not be loaded.";
        console.error("Deep Space image transition failed", error);
      }
      return false;
    });
  }

  function displayImageSequence(slide, images, {
    transition = false,
    renderRequest
  } = {}) {
    if (!isCurrentSlideRender(slide, renderRequest)) return Promise.resolve(false);
    cancelCurrentImageSequence();
    const selectedImage = images[0];
    return setCurrentImage(
      slide,
      renderRequest,
      selectedImage?.image || null,
      { transition, alt: selectedImage?.alt || "" }
    );
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

  const currentUserName = () => "USER";

  function personalizeDialogue(text) {
    return text.replace(/\bUSER\b/g, currentUserName());
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
    previousButton.textContent = "Previous Slide";
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
    advanceButton.addEventListener("click", handleNextSlide);
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
      const responseImages = slide.node.responseImageSequence?.length
        ? slide.node.responseImageSequence
        : slide.node.responseImage
          ? [{ image: slide.node.responseImage, alt: slide.node.responseAlt }]
          : null;
      if (responseImages) {
        displayImageSequence(slide, responseImages, {
          transition: true,
          renderRequest: requestId
        });
      }
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

  function showFinalCta() {
    if (!dialogueWrap) return;
    let cta = document.getElementById("final-cta");
    if (!cta) {
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
    if (speechStatus) speechStatus.textContent = "Finale complete. Choose a mission from the index.";
  }

  function renderCurrentSlide({ deferNarration = false, imageTransition = false } = {}) {
    const animationRequest = cancelSlideAnimations();
    const slide = getCurrentSlide();
    if (!slide) return;
    const { stage } = slide;
    showSpeakerScene("guide");

    if (storyTitle) storyTitle.textContent = slide.node.slideTitle || stage.title;
    window.museumLocationView?.setLocation(stage.location);
    if (storySubtitle) storySubtitle.textContent = "The Cosmic Frontier Chronicles";
    if (dialogueSpeaker) dialogueSpeaker.textContent = "Dr. Fredrick";
    if (repeatButton) {
      repeatButton.textContent = "Repeat message";
      repeatButton.setAttribute("aria-label", "Repeat Dr. Fredrick's narration");
    }
    if (dialogueProgress) {
      const currentStageSlides = stageSlides[slide.stageIndex];
      const missionName = stage.shortLabel;
      const missionSlide = slide.slideNumber;
      dialogueProgress.textContent = `${missionName} slide: ${String(missionSlide).padStart(2, "0")}/${String(currentStageSlides.length).padStart(2, "0")}`;
    }
    const visual = getSlideVisual(slide);
    const selectedImage = visual.images[0] || null;
    updateSlideReferences(
      slide,
      selectedImage ? { image: selectedImage.image, alt: selectedImage.alt } : null
    );
    if (missionImageCaption) {
      missionImageCaption.textContent = selectedImage?.alt || "";
      missionImageCaption.hidden = !selectedImage;
    }
    const imageReady = displayImageSequence(
      slide,
      visual.images,
      { transition: imageTransition, renderRequest: animationRequest }
    );
    const narration = personalizeDialogue(slide.narration);
    state.currentNarration = narration;
    setNarrationText(narration);
    speechStatus.textContent = "";
    renderInteractionUI(slide);
    if (!deferNarration) sequenceSlideMessages(slide, narration, animationRequest);
    const cta = document.getElementById("final-cta");
    if (cta) cta.hidden = true;
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
      speechStatus.textContent = "Your question could not be spoken. Select Continue without voice to keep going.";
    }
    updateInteractionControls();
  }

  function continueWithoutQuestionVoice() {
    if (!state.questionVoiceUnavailable || state.transitionLocked || !state.controlsReady) return;
    state.questionVoiceUnavailable = false;
    const fallbackButton = document.getElementById("continue-question-without-voice");
    if (fallbackButton) fallbackButton.hidden = true;
    if (speechStatus) speechStatus.textContent = "";
    advanceToNextSlide();
  }

  function speakQuestionBeforeAdvance(slide) {
    if (state.questionSpeechPending || state.questionVoiceUnavailable) return;
    const question = personalizeDialogue(slide.response);
    if (!question) {
      advanceToNextSlide();
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
          state.questionSpeechRequest += 1;
          if (speechStatus) speechStatus.textContent = "";
          advanceToNextSlide();
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
    pitch = 1
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
        .then(voices => startSpeech(voiceSelection.getGuideVoice(voices)))
        .catch(() => finish("unavailable"));
    }
  }

  function handleNextSlide() {
    if (state.transitionLocked || !state.controlsReady || state.questionSpeechPending || state.questionVoiceUnavailable) return;
    const currentSlide = getCurrentSlide();
    if (!currentSlide) return;
    if (currentSlide.response) {
      speakQuestionBeforeAdvance(currentSlide);
      return;
    }
    advanceToNextSlide();
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
    return stage.title;
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
      console.error("Deep Space mission opening failed", error);
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
    state.questionSpeechRequest += 1;
    state.questionSpeechPending = false;
    state.questionVoiceUnavailable = false;
    root.inert = true;
    cancelSlideAnimations();
    cancelCurrentImageSequence();
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
          updateInteractionControls();
        }, changesScene && !reducedMotion ? 220 : 100);
      });
    }, delay);
  }

  if (storyMissionIndexButton) {
    storyMissionIndexButton.addEventListener("click", toggleMissionIndex);
  }

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
    cancelCurrentImageSequence();
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
