"use strict";

(() => {
  const archive = window.MARS_ARCHIVE;
  if (!archive || !Array.isArray(archive.chapters) || archive.chapters.length === 0) {
    throw new Error("Mars archive data is unavailable. Check that mars-data.js loads first.");
  }
  const voiceSelection = window.museumVoiceSelection;
  if (!voiceSelection) {
    throw new Error("Shared voice selection is unavailable. Check that voice-selection.js loads first.");
  }

  const root = document.getElementById("ranger-story");
  const elements = {
    title: document.getElementById("story-title"),
    missionStatus: document.getElementById("story-mission-status"),
    missionIndexButton: document.getElementById("story-mission-index-button"),
    missionIndex: document.getElementById("story-mission-index"),
    indicator: document.getElementById("story-mission-indicator"),
    guideStage: document.getElementById("guide-stage"),
    studentStage: document.getElementById("student-stage"),
    guideCharacter: document.getElementById("guide-character"),
    visitorCharacter: document.getElementById("visitor-character"),
    visitorCaption: document.getElementById("visitor-caption"),
    guideDialogue: document.getElementById("ranger-dialogue"),
    studentDialogue: document.getElementById("student-dialogue-copy"),
    guideSpeaker: document.getElementById("dialogue-speaker"),
    studentSpeaker: document.getElementById("student-speaker"),
    guideProgress: document.getElementById("dialogue-progress"),
    studentProgress: document.getElementById("student-progress"),
    askButton: document.getElementById("ask-student-question"),
    guidePlayButton: document.getElementById("play-narration"),
    guideRepeatButton: document.getElementById("repeat-dialogue"),
    guideContinueButton: document.getElementById("continue-reading"),
    studentPlayButton: document.getElementById("play-student-narration"),
    studentRepeatButton: document.getElementById("repeat-student-dialogue"),
    studentContinueButton: document.getElementById("continue-student-reading"),
    speechStatus: document.getElementById("speech-status"),
    storyStatus: document.getElementById("story-status"),
    previousButton: document.getElementById("story-previous-slide"),
    nextButton: document.getElementById("story-advance-slide"),
    locationButton: document.getElementById("landing-location-button"),
    evidenceToggle: document.getElementById("mission-evidence-toggle"),
    evidencePanel: document.getElementById("mission-evidence-panel"),
    uncertaintyToggle: document.getElementById("uncertainty-toggle"),
    uncertaintyPanel: document.getElementById("uncertainty-panel"),
    finalMantra: document.getElementById("final-mantra"),
    images: [
      document.getElementById("story-hardware-primary"),
      document.getElementById("story-hardware-secondary")
    ]
  };

  if (!root) {
    throw new Error("Mars story root is missing from mars.html.");
  }

  const storyTopbar = root.querySelector(".story-topbar");
  if (!storyTopbar) {
    throw new Error("Mars story header is missing from mars.html.");
  }

  const missingElements = Object.entries(elements)
    .filter(([name, element]) => name !== "images" && !element)
    .map(([name]) => name);
  if (missingElements.length || elements.images.some(image => !image)) {
    throw new Error(`Mars story markup is incomplete: ${missingElements.concat(elements.images.some(image => !image) ? ["image slots"] : []).join(", ")}.`);
  }

  function updateMissionIndicatorPosition() {
    if (window.matchMedia("(max-width: 760px)").matches) {
      elements.indicator.style.top = `${Math.ceil(storyTopbar.getBoundingClientRect().bottom + 8)}px`;
    } else {
      elements.indicator.style.removeProperty("top");
    }
  }

  function scheduleMissionIndicatorPositionUpdate() {
    updateMissionIndicatorPosition();
    window.setTimeout(updateMissionIndicatorPosition, 0);
  }

  if ("ResizeObserver" in window) {
    new ResizeObserver(updateMissionIndicatorPosition).observe(storyTopbar);
  }
  window.addEventListener("resize", scheduleMissionIndicatorPositionUpdate);
  scheduleMissionIndicatorPositionUpdate();

  const missionImageFrame = document.querySelector(".story-image-frame");
  if (!missionImageFrame) {
    throw new Error("Mars mission image frame is missing from mars.html.");
  }
  const missionImageVisual = document.getElementById("mission-image-visual");
  if (!missionImageVisual) {
    throw new Error("Mars mission image positioning area is missing from mars.html.");
  }

  const mediaNavigation = document.createElement("div");
  mediaNavigation.className = "mars-media-navigation";
  mediaNavigation.hidden = true;
  mediaNavigation.setAttribute("aria-live", "polite");

  const watchVideoButton = document.createElement("button");
  watchVideoButton.type = "button";
  watchVideoButton.className = "mars-watch-video-button";
  watchVideoButton.textContent = "Watch Video";
  watchVideoButton.hidden = true;
  watchVideoButton.setAttribute("aria-label", "Watch the current mission video");

  const mediaPreviousButton = document.createElement("button");
  mediaPreviousButton.type = "button";
  mediaPreviousButton.className = "mars-media-control mars-media-control--previous";
  mediaPreviousButton.textContent = "‹";
  mediaPreviousButton.setAttribute("aria-label", "Previous media item");

  const mediaNextButton = document.createElement("button");
  mediaNextButton.type = "button";
  mediaNextButton.className = "mars-media-control mars-media-control--next";
  mediaNextButton.textContent = "›";
  mediaNextButton.setAttribute("aria-label", "Next media item");

  mediaNavigation.append(mediaPreviousButton, mediaNextButton);
  missionImageFrame.append(watchVideoButton, mediaNavigation);

  const videoModal = document.createElement("div");
  videoModal.className = "mars-video-modal";
  videoModal.hidden = true;
  videoModal.setAttribute("role", "dialog");
  videoModal.setAttribute("aria-modal", "true");
  videoModal.setAttribute("aria-label", "Mission video player");

  const videoDialog = document.createElement("div");
  videoDialog.className = "mars-video-dialog";

  const videoElement = document.createElement("video");
  videoElement.className = "mars-video-player";
  videoElement.controls = true;
  videoElement.preload = "metadata";
  videoElement.playsInline = true;

  const videoCloseButton = document.createElement("button");
  videoCloseButton.type = "button";
  videoCloseButton.className = "mars-video-close";
  videoCloseButton.textContent = "Close";
  videoCloseButton.setAttribute("aria-label", "Close video");

  const videoError = document.createElement("p");
  videoError.className = "mars-video-error";
  videoError.hidden = true;
  videoError.textContent = "This video could not be loaded. Please close this window and continue the mission.";

  videoDialog.append(videoElement, videoCloseButton, videoError);
  videoModal.append(videoDialog);
  document.body.append(videoModal);

  const slides = [];
  function splitDialogue(text, maxCharacters = 260) {
    const segments = [];
    text.split(/\n+/).forEach(paragraph => {
      const sentences = paragraph.trim().split(/(?<=[.!?])\s+/u).filter(Boolean);
      let segment = "";
      sentences.forEach(sentence => {
        if (sentence.length > maxCharacters) {
          if (segment) segments.push(segment);
          segment = "";
          sentence.split(/\s+/).forEach(word => {
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
    return segments.length ? segments : [text];
  }

  archive.chapters.forEach((chapter, chapterIndex) => {
    if (!Array.isArray(chapter.lines) || chapter.lines.length === 0) {
      throw new Error(`Mars chapter "${chapter.id}" has no dialogue lines.`);
    }
    chapter.lines.forEach((line, lineIndex) => {
      if (!["leo", "avery"].includes(line.speaker) || typeof line.text !== "string" || !line.text.trim()) {
        throw new Error(`Mars chapter "${chapter.id}" contains an invalid dialogue line at ${lineIndex + 1}.`);
      }
      const parts = splitDialogue(line.text);
      parts.forEach((text, partIndex) => {
        slides.push({ chapter, chapterIndex, line, lineIndex, text, partIndex, partCount: parts.length });
      });
    });
  });

  if (slides.length === 0) {
    throw new Error("Mars archive contains no dialogue.");
  }

  const chapterSlides = archive.chapters.map((chapter, chapterIndex) =>
    slides.filter(slide => slide.chapterIndex === chapterIndex)
  );
  const state = {
    slideIndex: 0,
    mediaIndex: 0,
    navigationGeneration: 0,
    imageGeneration: 0,
    openingTimer: 0,
    activeImageIndex: -1,
    imageTransitionTimer: 0,
    utterance: null,
    speechRequest: 0,
    speechTimeout: 0,
    openingMaterializationTimer: 0,
    controlsReady: false,
    textReady: false,
    narrationReady: false,
    animationRequest: 0,
    animationTimers: new Set(),
    questionSpeechPending: false,
    questionVoiceUnavailable: false,
    visitorName: archive.visitor,
    selectedAvatar: "",
    chapterIntroActive: false,
    chapterIntroText: "",
    introTextComplete: false,
    introNarrationComplete: false,
    openingImage: null,
    visitorRevealTimer: 0,
    activeVideoItem: null
  };

  const OPENING_DURATION_MS = 1000;
  const IMAGE_FADE_OUT_MS = 320;
  const MATERIALIZATION_DURATION_MS = 680;
  const MISSION_VISITOR_DELAY_MS = 600;

  function personalizeDialogue(text) {
    return text.replace(/\bLeo\b/g, state.visitorName);
  }

  function updateVisitorCharacter() {
    state.visitorName = sessionStorage.getItem("museumVisitorName") || archive.visitor || "You";
    state.selectedAvatar = sessionStorage.getItem("museumSelectedAvatar") || "";
    const isBoy = state.selectedAvatar === "leo"
      || (!state.selectedAvatar && String(archive.visitor || "").toLowerCase() === "leo");
    elements.visitorCharacter.src = isBoy
      ? "../images/Boy_user_listening.png"
      : "../images/Girl_user_listening.png";
    elements.visitorCaption.textContent = state.visitorName;
    elements.visitorCharacter.alt = `${state.visitorName} exploring the Mars archive`;
    elements.guideCharacter.alt = `${archive.guide}, Mars mission scientist`;
    const slide = currentSlide();
    if (slide?.line.speaker === "leo") {
      elements.studentSpeaker.textContent = state.visitorName;
      elements.studentDialogue.setAttribute("aria-label", personalizeDialogue(slide.text));
    }
    if (slide && !root.classList.contains("is-mission-opening")) {
      const activeDialogue = slide.line.speaker === "leo" ? elements.studentDialogue : elements.guideDialogue;
      const activeStage = slide.line.speaker === "leo" ? elements.studentStage : elements.guideStage;
      if (!activeStage.hidden) {
        cancelSlideAnimation();
        activeDialogue.textContent = personalizeDialogue(slide.text);
        state.textReady = true;
        if (slide.line.speaker === "leo") {
          state.controlsReady = true;
        } else {
          state.controlsReady = state.narrationReady;
        }
        updateControls();
      }
    }
  }

  updateVisitorCharacter();
  window.addEventListener("storage", updateVisitorCharacter);
  window.addEventListener("pageshow", updateVisitorCharacter);
  window.addEventListener("focus", updateVisitorCharacter);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      updateVisitorCharacter();
      return;
    }
    if (state.questionSpeechPending) {
      state.questionSpeechPending = false;
      state.questionVoiceUnavailable = true;
      elements.speechStatus.textContent = "Question narration stopped. Continue without voice to hear the response.";
      updateControls();
    }
    cancelSpeech();
    if (currentSlide().line.speaker === "avery") {
      elements.guidePlayButton.hidden = false;
      elements.guideContinueButton.hidden = !state.controlsReady;
    } else {
      elements.studentPlayButton.hidden = false;
    }
  });

  function currentSlide() {
    return slides[state.slideIndex];
  }

  function setStatus(message) {
    elements.storyStatus.textContent = message;
  }

  function cancelSpeech() {
    state.speechRequest += 1;
    if (state.speechTimeout) {
      window.clearTimeout(state.speechTimeout);
      state.speechTimeout = 0;
    }
    if ("speechSynthesis" in window && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    state.utterance = null;
    elements.guideContinueButton.hidden = true;
    elements.studentContinueButton.hidden = true;
    elements.guidePlayButton.hidden = true;
    elements.studentPlayButton.hidden = true;
  }

  function cancelOpening() {
    if (state.openingTimer) {
      window.clearTimeout(state.openingTimer);
      state.openingTimer = 0;
    }
    if (state.openingMaterializationTimer) {
      window.clearTimeout(state.openingMaterializationTimer);
      state.openingMaterializationTimer = 0;
    }
    if (state.visitorRevealTimer) {
      window.clearTimeout(state.visitorRevealTimer);
      state.visitorRevealTimer = 0;
    }
    root.classList.remove("is-mission-materializing");
  }

  function cancelSlideAnimation() {
    state.animationRequest += 1;
    state.animationTimers.forEach(timer => window.clearTimeout(timer));
    state.animationTimers.clear();
  }

  function scheduleSlideAnimation(callback, delay, request) {
    const timer = window.setTimeout(() => {
      state.animationTimers.delete(timer);
      if (request === state.animationRequest) callback();
    }, delay);
    state.animationTimers.add(timer);
  }

  function revealDialogue(element, text, request, onComplete) {
    const personalizedText = personalizeDialogue(text);
    element.setAttribute("aria-label", personalizedText);
    element.textContent = "";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.textContent = personalizedText;
      onComplete();
      return;
    }
    const words = personalizedText.match(/\S+\s*/g) || [];
    let wordIndex = 0;
    const revealNextWord = () => {
      if (request !== state.animationRequest) return;
      if (wordIndex >= words.length) {
        onComplete();
        return;
      }
      element.append(document.createTextNode(words[wordIndex]));
      wordIndex += 1;
      if (wordIndex < words.length) {
        scheduleSlideAnimation(revealNextWord, 45, request);
      } else {
        onComplete();
      }
    };
    revealNextWord();
  }

  function imageDetails(value) {
    if (!value) {
      return null;
    }
    if (typeof value === "string") {
      return { src: value, alt: "Mars mission image" };
    }
    if (typeof value.src !== "string" || !value.src.trim()) {
      throw new Error("A Mars mission image must include a non-empty src.");
    }
    return {
      src: value.src,
      alt: typeof value.alt === "string" ? value.alt : "Mars mission image",
      sourceUrl: value.sourceUrl,
      scientificReferenceUrl: value.scientificReferenceUrl,
      preview: value.preview,
      poster: value.poster,
      type: value.type,
      title: value.title,
      configKey: value.configKey
    };
  }

  const STORY_IMAGE_LAYOUT_CONFIG = {
    // Only explicitly configured per-image overrides belong here.
    // Root CSS variables provide all default values.
    items: {}
  };
  const EMBEDDED_SCREEN_ARTWORK_PATH_PREFIX = "./mars_images/Spirit and Opportunity/";
  const EMBEDDED_SCREEN_ARTWORK_CLASS = "story-hardware--embedded-screen-artwork";
  const STORY_IMAGE_LAYOUT_STORAGE_KEY = "mars-story-image-layouts-v1";
  const storyImageLayoutKeys = new Set();
  const persistedStoryImageLayouts = (() => {
    try {
      const saved = window.localStorage.getItem(STORY_IMAGE_LAYOUT_STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : {};
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return {};
      }
      Object.entries(parsed).forEach(([key, settings]) => {
        if (!settings || typeof settings !== "object" || Array.isArray(settings)) {
          return;
        }
        if (settings.maxWidth === undefined && settings.width !== undefined) {
          settings.maxWidth = settings.width;
        }
        if (settings.maxHeight === undefined && settings.height !== undefined) {
          settings.maxHeight = settings.height;
        }
        delete settings.width;
        delete settings.height;
        parsed[key] = settings;
      });
      return parsed;
    } catch (error) {
      console.error("Mars slide image settings could not be restored from local storage.", error);
      return {};
    }
  })();

  function makeStoryImageLayoutKey(slide, mediaId, mediaIndex) {
    return `${slide.chapter.id}:${slide.lineIndex}:${mediaId}:${mediaIndex}`;
  }

  function normalizeStoryImageLayoutPatch(patch) {
    if (!patch || typeof patch !== "object" || Array.isArray(patch)) {
      throw new TypeError("Mars slide image settings must be an object.");
    }
    const normalized = {};
    const cssProperties = {
      x: "left",
      y: "top",
      maxWidth: "max-width",
      maxHeight: "max-height",
      width: "max-width",
      height: "max-height"
    };
    Object.entries(patch).forEach(([name, value]) => {
      if (Object.prototype.hasOwnProperty.call(cssProperties, name)) {
        const cssValue = typeof value === "number" ? `${value}px` : String(value).trim();
        if (!cssValue || !window.CSS.supports(cssProperties[name], cssValue)) {
          throw new TypeError(`Invalid Mars slide image ${name} value: ${value}`);
        }
        normalized[name === "width" ? "maxWidth" : name === "height" ? "maxHeight" : name] = cssValue;
        return;
      }
      if (name === "scale" || name === "rotation") {
        const numericValue = Number(value);
        if (!Number.isFinite(numericValue)) {
          throw new TypeError(`Mars slide image ${name} must be a finite number.`);
        }
        normalized[name] = numericValue;
        return;
      }
      if (name === "visible" && typeof value === "boolean") {
        normalized.visible = value;
        return;
      }
      throw new TypeError(`Unknown Mars slide image setting: ${name}`);
    });
    return normalized;
  }

  function getStoryImageLayout(key) {
    const image = elements.images.find(
      item => item.dataset.layoutKey === key
    );

    const rootStyles = window.getComputedStyle(document.documentElement);
    const readCss = property =>
      rootStyles.getPropertyValue(property).trim();
    const scale = Number(readCss("--mars-mission-image-scale"));
    const rotation = Number.parseFloat(readCss("--mars-mission-image-rotation"));

    const cssDefaults = {
      x: readCss("--mars-mission-image-offset-x") || "0px",
      y: readCss("--mars-mission-image-offset-y") || "0px",
      maxWidth: readCss("--mars-mission-image-max-width") || "1000px",
      maxHeight: readCss("--mars-mission-image-max-height") || "800px",
      scale: Number.isFinite(scale) ? scale : 1,
      rotation: Number.isFinite(rotation) ? rotation : 0,
      visible: true
    };

    const inlineOverrides = {};

    if (image) {
      const properties = {
        x: "--mars-story-image-offset-x",
        y: "--mars-story-image-offset-y",
        maxWidth: "--mars-story-image-max-width",
        maxHeight: "--mars-story-image-max-height",
        scale: "--mars-story-image-scale",
        rotation: "--mars-story-image-rotation"
      };

      Object.entries(properties).forEach(([setting, property]) => {
        const value = image.style.getPropertyValue(property).trim();
        if (value) inlineOverrides[setting] = value;
      });

      if (image.style.visibility === "hidden") {
        inlineOverrides.visible = false;
      }
    }

    return {
      ...cssDefaults,
      ...STORY_IMAGE_LAYOUT_CONFIG.items[key],
      ...persistedStoryImageLayouts[key],
      ...inlineOverrides
    };
  }

  const missionImageFitProbes = new WeakMap();
  const missionImageFitProbeImages = new WeakMap();
  let missionImageFitObserver = null;

  function getMissionImageFitProbe(image) {
    let probe = missionImageFitProbes.get(image);
    if (probe) {
      return probe;
    }

    probe = document.createElement("div");
    probe.setAttribute("aria-hidden", "true");
    probe.style.position = "absolute";
    probe.style.top = "0";
    probe.style.left = "0";
    probe.style.width = "100%";
    probe.style.height = "100%";
    probe.style.maxWidth = "var(--mars-story-image-max-width, var(--mars-mission-image-max-width))";
    probe.style.maxHeight = "var(--mars-story-image-max-height, var(--mars-mission-image-max-height))";
    probe.style.visibility = "hidden";
    probe.style.pointerEvents = "none";
    missionImageVisual.append(probe);
    missionImageFitProbes.set(image, probe);
    missionImageFitProbeImages.set(probe, image);
    missionImageFitObserver?.observe(probe);
    return probe;
  }

  function resolveMissionImageLimit(image, property) {
    const probe = getMissionImageFitProbe(image);
    const probeStyles = window.getComputedStyle(probe);
    const value = probeStyles.getPropertyValue(property).trim();
    if (!value || !window.CSS.supports(property, value)) {
      throw new TypeError(`Invalid Mars mission image ${property}: ${value}`);
    }
    const measuredSize = property === "max-width" ? probeStyles.width : probeStyles.height;
    const limit = Number.parseFloat(measuredSize);
    if (!limit) {
      throw new RangeError(`Mars mission image ${property} resolved to a zero-sized fit area.`);
    }
    return limit;
  }

  function updateMissionImageFit(image, naturalWidth = image.naturalWidth, naturalHeight = image.naturalHeight) {
    if (!naturalWidth || !naturalHeight) {
      return;
    }

    if (!missionImageVisual.clientWidth || !missionImageVisual.clientHeight) {
      return;
    }

    const maxWidth = resolveMissionImageLimit(image, "max-width");
    const maxHeight = resolveMissionImageLimit(image, "max-height");
    const styles = window.getComputedStyle(image);
    const isEmbeddedScreenArtwork = image.classList.contains(EMBEDDED_SCREEN_ARTWORK_CLASS);
    const cropWidth = isEmbeddedScreenArtwork
      ? Number.parseFloat(styles.getPropertyValue("--mars-story-embedded-screen-crop-width")) / 100
      : 1;
    const cropHeight = isEmbeddedScreenArtwork
      ? Number.parseFloat(styles.getPropertyValue("--mars-story-embedded-screen-crop-height")) / 100
      : 1;
    if (!Number.isFinite(cropWidth) || cropWidth <= 0 || cropWidth > 1
      || !Number.isFinite(cropHeight) || cropHeight <= 0 || cropHeight > 1) {
      throw new RangeError("Mars mission image crop dimensions must be percentages between 0 and 100.");
    }
    const imageScaleValue = Number.parseFloat(styles.getPropertyValue("--mars-story-image-scale")
      || styles.getPropertyValue("--mars-mission-image-scale"));
    const rotationValue = Number.parseFloat(styles.getPropertyValue("--mars-story-image-rotation")
      || styles.getPropertyValue("--mars-mission-image-rotation"));
    const imageScale = Number.isFinite(imageScaleValue) ? imageScaleValue : 1;
    const rotation = Number.isFinite(rotationValue) ? rotationValue : 0;
    const radians = rotation * Math.PI / 180;
    const visibleWidth = naturalWidth * cropWidth;
    const visibleHeight = naturalHeight * cropHeight;
    const scaledWidth = visibleWidth * Math.abs(imageScale);
    const scaledHeight = visibleHeight * Math.abs(imageScale);
    const rotatedWidth = Math.abs(Math.cos(radians)) * scaledWidth
      + Math.abs(Math.sin(radians)) * scaledHeight;
    const rotatedHeight = Math.abs(Math.sin(radians)) * scaledWidth
      + Math.abs(Math.cos(radians)) * scaledHeight;
    const fitScale = Math.min(
      1,
      maxWidth / visibleWidth,
      maxHeight / visibleHeight,
      maxWidth / rotatedWidth,
      maxHeight / rotatedHeight
    );
    image.style.setProperty("--mars-story-image-fit-width", `${naturalWidth * fitScale}px`);
    image.style.setProperty("--mars-story-image-fit-height", `${naturalHeight * fitScale}px`);
  }

  function clearMissionImageFit(image) {
    image.style.removeProperty("--mars-story-image-fit-width");
    image.style.removeProperty("--mars-story-image-fit-height");
  }

  function updateAllMissionImageFits() {
    elements.images.forEach(image => updateMissionImageFit(image));
  }

  let missionImageFitTimer = 0;
  function scheduleMissionImageFitUpdate() {
    window.clearTimeout(missionImageFitTimer);
    missionImageFitTimer = window.setTimeout(() => {
      missionImageFitTimer = 0;
      updateAllMissionImageFits();
    }, 0);
  }

  function applyStoryImageLayout(image, key) {
    const overrides = {
      ...STORY_IMAGE_LAYOUT_CONFIG.items[key],
      ...persistedStoryImageLayouts[key]
    };
    image.dataset.layoutKey = key;
    const properties = {
      x: "--mars-story-image-offset-x",
      y: "--mars-story-image-offset-y",
      maxWidth: "--mars-story-image-max-width",
      maxHeight: "--mars-story-image-max-height",
      scale: "--mars-story-image-scale",
      rotation: "--mars-story-image-rotation"
    };
    Object.entries(properties).forEach(([setting, property]) => {
      if (Object.prototype.hasOwnProperty.call(overrides, setting)) {
        const value = setting === "rotation"
          ? `${overrides[setting]}deg`
          : String(overrides[setting]);

        image.style.setProperty(property, value);
      } else {
        image.style.removeProperty(property);
      }
    });
    const fitProbe = getMissionImageFitProbe(image);
    [["maxWidth", "--mars-story-image-max-width"], ["maxHeight", "--mars-story-image-max-height"]]
      .forEach(([setting, property]) => {
        if (Object.prototype.hasOwnProperty.call(overrides, setting)) {
          fitProbe.style.setProperty(property, image.style.getPropertyValue(property));
        } else {
          fitProbe.style.removeProperty(property);
        }
      });
    if (Object.prototype.hasOwnProperty.call(overrides, "visible")) {
      image.style.visibility = overrides.visible ? "visible" : "hidden";
    } else {
      image.style.removeProperty("visibility");
    }
    updateMissionImageFit(image);
  }

  elements.images.forEach(image => {
    image.addEventListener("load", () => updateMissionImageFit(image));
  });
  if ("ResizeObserver" in window) {
    missionImageFitObserver = new ResizeObserver(entries => {
      const affectedImages = new Set();
      let visualAreaResized = false;
      entries.forEach(entry => {
        if (entry.target === missionImageVisual || entry.target === missionImageFrame) {
          visualAreaResized = true;
          return;
        }
        const image = missionImageFitProbeImages.get(entry.target);
        if (image) {
          affectedImages.add(image);
        }
      });
      if (visualAreaResized) {
        updateAllMissionImageFits();
      } else {
        affectedImages.forEach(image => updateMissionImageFit(image));
      }
    });
    missionImageFitObserver.observe(missionImageVisual);
    missionImageFitObserver.observe(missionImageFrame);
  }
  window.addEventListener("resize", scheduleMissionImageFitUpdate);
  new MutationObserver(updateAllMissionImageFits).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style", "class"]
  });

  function normalizeMediaItems(slide) {
    if (!slide) {
      return [];
    }
    const line = slide.line || {};
    const itemList = Array.isArray(line.media) && line.media.length > 0 ? line.media : [];
    if (itemList.length > 0) {
      return itemList.map((media, index) => {
        if (typeof media === "string") {
          return {
            id: `media-${index + 1}`,
            configKey: makeStoryImageLayoutKey(slide, `media-${index + 1}`, index),
            type: "image",
            src: media,
            alt: "Mars mission image"
          };
        }
        const src = typeof media.src === "string" ? media.src.trim() : "";
        if (!src) {
          return null;
        }
        const normalizedType = String(media.type || "").toLowerCase();
        const explicitType = normalizedType === "video" || normalizedType === "image" ? normalizedType : null;
        const inferredType = /\.(mp4|webm|ogg)(?:[?#]|$)/i.test(src) ? "video" : "image";
        return {
          id: media.id || `media-${index + 1}`,
          configKey: makeStoryImageLayoutKey(slide, media.id || `media-${index + 1}`, index),
          type: explicitType || inferredType,
          src,
          poster: media.poster || media.preview || (inferredType === "video" ? src.replace(/\.(mp4|webm|ogg)(?:[?#]|$)/i, ".png") : ""),
          alt: typeof media.alt === "string" && media.alt.trim() ? media.alt : "Mars mission image",
          sourceUrl: media.sourceUrl,
          scientificReferenceUrl: media.scientificReferenceUrl,
          title: typeof media.title === "string" ? media.title : "",
          video: media.video === true || inferredType === "video"
        };
      }).filter(Boolean);
    }
    const fallback = imageDetails(line.image);
    if (!fallback) {
      return [];
    }
    return [{
      id: "primary-media",
      configKey: makeStoryImageLayoutKey(slide, "primary-media", 0),
      type: "image",
      src: fallback.src,
      alt: fallback.alt,
      sourceUrl: fallback.sourceUrl,
      scientificReferenceUrl: fallback.scientificReferenceUrl,
      title: fallback.title || ""
    }];
  }

  slides.forEach(slide => {
    normalizeMediaItems(slide).forEach(mediaItem => {
      storyImageLayoutKeys.add(mediaItem.configKey);
      if (!STORY_IMAGE_LAYOUT_CONFIG.items[mediaItem.configKey]) {
        STORY_IMAGE_LAYOUT_CONFIG.items[mediaItem.configKey] = {};
      }
    });
  });

  function persistStoryImageLayouts() {
    try {
      window.localStorage.setItem(
        STORY_IMAGE_LAYOUT_STORAGE_KEY,
        JSON.stringify(persistedStoryImageLayouts)
      );
    } catch (error) {
      console.error("Mars slide image settings could not be saved to local storage.", error);
      throw error;
    }
  }

  window.marsStoryImageControls = Object.freeze({
    list: () => Array.from(storyImageLayoutKeys),
    get: key => {
      if (!storyImageLayoutKeys.has(key)) {
        throw new RangeError(`Unknown Mars slide image configuration: ${key}`);
      }
      return { ...getStoryImageLayout(key) };
    },
    set: (key, patch) => {
      if (!storyImageLayoutKeys.has(key)) {
        throw new RangeError(`Unknown Mars slide image configuration: ${key}`);
      }
      Object.assign(persistedStoryImageLayouts[key] ||= {}, normalizeStoryImageLayoutPatch(patch));
      persistStoryImageLayouts();
      elements.images
        .filter(image => image.dataset.layoutKey === key)
        .forEach(image => applyStoryImageLayout(image, key));
    },
    reset: key => {
      if (!storyImageLayoutKeys.has(key)) {
        throw new RangeError(`Unknown Mars slide image configuration: ${key}`);
      }
      delete persistedStoryImageLayouts[key];
      persistStoryImageLayouts();
      elements.images
        .filter(image => image.dataset.layoutKey === key)
        .forEach(image => applyStoryImageLayout(image, key));
    }
  });

  function getCurrentMediaItems() {
    return normalizeMediaItems(currentSlide());
  }

  function getCurrentMediaItem() {
    const mediaItems = getCurrentMediaItems();
    if (!mediaItems.length) {
      return null;
    }
    if (state.mediaIndex < 0) {
      state.mediaIndex = 0;
    }
    if (state.mediaIndex >= mediaItems.length) {
      state.mediaIndex = mediaItems.length - 1;
    }
    return mediaItems[state.mediaIndex] || mediaItems[0];
  }

  function updateMediaNavigationControls() {
    const mediaItems = getCurrentMediaItems();
    const requiresNavigation = mediaItems.length > 1;
    mediaNavigation.hidden = !requiresNavigation;
    mediaPreviousButton.hidden = !requiresNavigation;
    mediaNextButton.hidden = !requiresNavigation;
    if (!requiresNavigation) {
      return;
    }
    mediaPreviousButton.disabled = state.mediaIndex <= 0;
    mediaNextButton.disabled = state.mediaIndex >= mediaItems.length - 1;
  }

  function closeVideoPlayback() {
    if (state.activeVideoItem) {
      videoElement.pause();
      videoElement.removeAttribute("src");
      videoElement.load();
      state.activeVideoItem = null;
    }
    videoError.hidden = true;
    videoModal.hidden = true;
    videoModal.setAttribute("aria-hidden", "true");
  }

  function openVideoPlayback(mediaItem) {
    if (!mediaItem || mediaItem.type !== "video") {
      return;
    }
    const source = mediaItem.src || "";
    if (!source) {
      videoError.hidden = false;
      return;
    }
    state.activeVideoItem = mediaItem;
    videoElement.src = source;
    videoElement.poster = mediaItem.poster || "";
    videoElement.load();
    videoError.hidden = true;
    videoModal.hidden = false;
    videoModal.setAttribute("aria-hidden", "false");
    videoElement.focus();
  }

  function preloadImage(value) {
    const details = imageDetails(value);
    if (!details) {
      return Promise.resolve(null);
    }

    return new Promise(resolve => {
      const image = new Image();
      image.addEventListener("load", () => resolve({
        ...details,
        loaded: true,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight
      }), { once: true });
      image.addEventListener("error", () => {
        console.error(`Mars mission image could not be loaded: ${details.src}`);
        resolve({ ...details, loaded: false });
      }, { once: true });
      image.src = details.src;
    });
  }

  function renderCurrentMediaSelection() {
    const mediaItems = getCurrentMediaItems();
    const mediaItem = mediaItems[state.mediaIndex] || mediaItems[0] || null;
    updateMediaNavigationControls();

    if (!mediaItem) {
      clearImages();
      return;
    }

    const displaySource = mediaItem.type === "video"
      ? (mediaItem.poster || mediaItem.src)
      : mediaItem.src;
    const imageData = {
      src: displaySource,
      alt: mediaItem.alt || mediaItem.title || "Mars mission image",
      sourceUrl: mediaItem.sourceUrl,
      scientificReferenceUrl: mediaItem.scientificReferenceUrl,
      configKey: mediaItem.configKey
    };

    const generation = state.navigationGeneration;
    preloadImage(imageData).then(image => {
      if (generation !== state.navigationGeneration || !currentSlide()) {
        return;
      }
      showPreparedImage(image);
    });

    const showsVideo = mediaItem.type === "video";
    watchVideoButton.hidden = !showsVideo;
    if (showsVideo) {
      watchVideoButton.setAttribute("aria-label", `Watch ${mediaItem.title || "mission video"}`);
    }
    window.museumLocationView?.setImageSource(
      imageData.src,
      imageData.sourceUrl,
      imageData.scientificReferenceUrl
    );
  }

  function clearImages() {
    state.imageGeneration += 1;
    if (state.imageTransitionTimer) {
      window.clearTimeout(state.imageTransitionTimer);
      state.imageTransitionTimer = 0;
    }
    elements.images.forEach(image => {
      image.classList.remove("is-visible", "is-leaving");
      image.classList.remove(EMBEDDED_SCREEN_ARTWORK_CLASS);
      image.hidden = true;
      image.removeAttribute("src");
      image.alt = "";
      delete image.dataset.layoutKey;
      clearMissionImageFit(image);
    });
    state.activeImageIndex = -1;
    watchVideoButton.hidden = true;
  }

  function fadeImageOut() {
    const imageIndex = state.activeImageIndex;
    if (imageIndex < 0) {
      return;
    }
    const generation = ++state.imageGeneration;
    const activeImage = elements.images[imageIndex];
    activeImage.classList.remove("is-visible");
    activeImage.classList.add("is-leaving");
    state.activeImageIndex = -1;
    state.imageTransitionTimer = window.setTimeout(() => {
      if (generation !== state.imageGeneration) {
        return;
      }
      activeImage.hidden = true;
      activeImage.removeAttribute("src");
      activeImage.alt = "";
      activeImage.classList.remove("is-leaving");
      activeImage.classList.remove(EMBEDDED_SCREEN_ARTWORK_CLASS);
      clearMissionImageFit(activeImage);
      state.imageTransitionTimer = 0;
    }, IMAGE_FADE_OUT_MS);
  }

  function showPreparedImage(preparedImage) {
    if (!preparedImage) {
      fadeImageOut();
      return;
    }
    if (!preparedImage.loaded) {
      clearImages();
      window.museumLocationView?.setImageSource(null);
      elements.speechStatus.textContent = "The mission image could not be loaded.";
      setStatus("Mission image unavailable.");
      return;
    }

    const activeImage = elements.images[state.activeImageIndex];
    if (activeImage
      && activeImage.getAttribute("src") === preparedImage.src
      && activeImage.dataset.layoutKey === preparedImage.configKey) {
      activeImage.alt = preparedImage.alt;
      return;
    }

    const generation = ++state.imageGeneration;
    if (state.imageTransitionTimer) {
      window.clearTimeout(state.imageTransitionTimer);
      state.imageTransitionTimer = 0;
    }
    const previousIndex = state.activeImageIndex;
    const nextIndex = previousIndex === 0 ? 1 : 0;
    const nextImage = elements.images[nextIndex];
    nextImage.classList.remove("is-visible", "is-leaving");
    nextImage.classList.toggle(
      EMBEDDED_SCREEN_ARTWORK_CLASS,
      preparedImage.src.startsWith(EMBEDDED_SCREEN_ARTWORK_PATH_PREFIX)
    );
    if (preparedImage.configKey) {
      applyStoryImageLayout(nextImage, preparedImage.configKey);
    }
    nextImage.src = preparedImage.src;
    nextImage.alt = preparedImage.alt;
    nextImage.hidden = false;
    updateMissionImageFit(nextImage, preparedImage.naturalWidth, preparedImage.naturalHeight);

    const revealImage = () => {
      if (generation !== state.imageGeneration) {
        return;
      }
      nextImage.classList.add("is-visible");
    };
    const revealTimer = window.setTimeout(revealImage, 60);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.clearTimeout(revealTimer);
        revealImage();
      });
    });

    if (previousIndex >= 0) {
      const previousImage = elements.images[previousIndex];
      previousImage.classList.remove("is-visible");
      previousImage.classList.add("is-leaving");
      state.imageTransitionTimer = window.setTimeout(() => {
        if (generation !== state.imageGeneration) {
          return;
        }
        previousImage.hidden = true;
        previousImage.removeAttribute("src");
        previousImage.alt = "";
        previousImage.classList.remove("is-leaving");
        previousImage.classList.remove(EMBEDDED_SCREEN_ARTWORK_CLASS);
        clearMissionImageFit(previousImage);
        state.imageTransitionTimer = 0;
      }, IMAGE_FADE_OUT_MS);
    }
    state.activeImageIndex = nextIndex;
  }

  function updateMissionIndex() {
    const activeSlide = currentSlide();
    elements.missionIndex.replaceChildren();

    archive.chapters.forEach((chapter, chapterIndex) => {
      const button = document.createElement("button");
      const number = document.createElement("span");
      const title = document.createElement("strong");
      const detail = document.createElement("small");
      button.type = "button";
      button.className = "index-tab";
      button.dataset.chapterIndex = String(chapterIndex);
      button.setAttribute("aria-current", chapterIndex === activeSlide.chapterIndex ? "step" : "false");
      number.className = "index-tab-number";
      number.textContent = String(chapterIndex + 1).padStart(2, "0");
      title.className = "index-tab-title";
      title.textContent = chapter.label;
      detail.className = "index-tab-detail";
      const isSpiritOpportunity = chapter.id === "spirit-opportunity";
      detail.hidden = isSpiritOpportunity;
      if (!isSpiritOpportunity) {
        detail.textContent = `${chapter.status} · ${chapter.statusDetail}`;
      }
      button.classList.toggle("index-tab--metadata-free", isSpiritOpportunity);
      button.append(number, title, detail);
      elements.missionIndex.append(button);
    });

    elements.missionIndexButton.setAttribute("aria-expanded", String(!elements.missionIndex.hidden));
  }

  function updateMissionMetadata(slide) {
    const { chapter } = slide;
    const isSpiritOpportunity = chapter.id === "spirit-opportunity";
    root.classList.toggle("is-spirit-opportunity", isSpiritOpportunity);
    elements.title.textContent = chapter.title;
    elements.missionStatus.textContent = chapter.status;
    elements.missionStatus.dataset.status = chapter.status;
    elements.indicator.hidden = isSpiritOpportunity;
    elements.indicator.textContent = isSpiritOpportunity
      ? ""
      : `${chapter.label} · ${chapter.setting} · ${chapter.statusDetail}`;
    scheduleMissionIndicatorPositionUpdate();
    const location = chapter.location;
    const hasLandingLocation = Boolean(location?.mission
      && !/^overview\b/i.test(location.locationType || ""));
    elements.locationButton.hidden = !hasLandingLocation;
    if (hasLandingLocation) {
      window.museumLocationView?.setLocation(location);
    }
    document.title = `${chapter.title} — Project Ghost Signal`;
    updateMissionIndex();
  }

  function setSpeakerStage(slide) {
    const isLeo = slide.line.speaker === "leo";
    elements.studentStage.hidden = !isLeo;
    elements.guideStage.hidden = isLeo;
    elements.visitorCaption.textContent = state.visitorName;
    elements.visitorCharacter.alt = `${state.visitorName} exploring Mars with ${archive.guide}`;
    elements.guideCharacter.alt = `${archive.guide}, Mars mission scientist`;

    const missionSlides = chapterSlides[slide.chapterIndex];
    const count = missionSlides.length;
    const progress = `${String(missionSlides.indexOf(slide) + 1).padStart(2, "0")}/${String(count).padStart(2, "0")}`;
    if (isLeo) {
      elements.studentSpeaker.textContent = state.visitorName;
      elements.studentProgress.textContent = progress;
      elements.studentDialogue.textContent = "";
      const nextSlide = slides[state.slideIndex + 1];
      const canAsk = slide.partIndex === slide.partCount - 1
        && nextSlide
        && nextSlide.chapterIndex === slide.chapterIndex
        && nextSlide.line.speaker === "avery";
      elements.askButton.hidden = !canAsk;
      elements.askButton.disabled = false;
      elements.askButton.textContent = "Ask Dr. Fredrick";
      elements.studentPlayButton.hidden = false;
    } else {
      elements.guideSpeaker.textContent = archive.guide;
      elements.guideProgress.textContent = progress;
      elements.guideDialogue.textContent = "";
      elements.guidePlayButton.hidden = true;
    }

    const visibleRow = isLeo ? elements.studentStage : elements.guideStage;
    visibleRow.classList.remove("is-materializing");
    void visibleRow.offsetWidth;
    visibleRow.classList.add("is-materializing");
    visibleRow.addEventListener("animationend", () => {
      visibleRow.classList.remove("is-materializing");
    }, { once: true });
    const dialogue = isLeo ? elements.studentDialogue : elements.guideDialogue;
    dialogue.classList.remove("is-materializing");
    void dialogue.offsetWidth;
    if (!root.classList.contains("is-mission-opening")) {
      dialogue.classList.add("is-materializing");
    }
    dialogue.addEventListener("animationend", () => {
      dialogue.classList.remove("is-materializing");
    }, { once: true });
  }

  function updateEvidence(slide) {
    elements.evidencePanel.textContent = slide.chapter.evidenceTask || "";
    elements.evidenceToggle.hidden = !slide.chapter.evidenceTask;
    elements.evidencePanel.hidden = true;
    elements.evidenceToggle.setAttribute("aria-expanded", "false");

    const showUncertainty = slide.chapter.id === "finale" && Boolean(slide.chapter.uncertainty);
    elements.uncertaintyToggle.hidden = !showUncertainty;
    elements.uncertaintyToggle.setAttribute("aria-expanded", "false");
    elements.uncertaintyPanel.hidden = true;
    elements.uncertaintyPanel.textContent = showUncertainty ? slide.chapter.uncertainty : "";

    const isFinalSlide = state.slideIndex === slides.length - 1;
    elements.finalMantra.hidden = !isFinalSlide;
  }

  function getMissionIntroText(chapter) {
    return [chapter.title, chapter.setting].filter(Boolean).join(". ");
  }

  function maybeRevealFirstVisitorLine() {
    if (!state.chapterIntroActive || !state.introTextComplete
      || !state.introNarrationComplete || state.visitorRevealTimer) {
      return;
    }

    state.controlsReady = false;
    updateControls();
    state.visitorRevealTimer = window.setTimeout(() => {
      state.visitorRevealTimer = 0;
      if (!state.chapterIntroActive) return;
      const slideIndex = state.slideIndex;
      const openingImage = state.openingImage;
      state.chapterIntroActive = false;
      state.chapterIntroText = "";
      state.openingImage = null;
      renderSlide(slideIndex, openingImage, false);
    }, MISSION_VISITOR_DELAY_MS);
  }

  function speakMissionIntro() {
    if (!state.chapterIntroActive) return;
    if (state.visitorRevealTimer) {
      window.clearTimeout(state.visitorRevealTimer);
      state.visitorRevealTimer = 0;
    }
    state.introNarrationComplete = false;
    state.controlsReady = false;
    state.narrationReady = false;
    updateControls();

    const slideIndex = state.slideIndex;
    speakCurrentLine("avery", {
      automatic: true,
      textOverride: state.chapterIntroText,
      onComplete: status => {
        if (!state.chapterIntroActive || state.slideIndex !== slideIndex) return;
        if (status === "complete") {
          state.introNarrationComplete = true;
          state.controlsReady = false;
          updateControls();
          maybeRevealFirstVisitorLine();
        }
      }
    });
  }

  function renderMissionIntroduction(slideIndex, openingImage) {
    const slide = slides[slideIndex];
    state.chapterIntroActive = true;
    state.chapterIntroText = getMissionIntroText(slide.chapter);
    state.introTextComplete = false;
    state.introNarrationComplete = false;
    state.openingImage = openingImage;
    state.controlsReady = false;
    state.textReady = false;
    state.narrationReady = false;

    elements.guideStage.hidden = false;
    elements.studentStage.hidden = true;
    elements.guideSpeaker.textContent = archive.guide;
    elements.guideProgress.textContent = "MISSION INTRO";
    elements.guideDialogue.textContent = "";
    elements.studentDialogue.textContent = "";
    elements.askButton.hidden = true;
    elements.guideCharacter.alt = `${archive.guide}, Mars mission scientist`;
    elements.speechStatus.textContent = "";
    setStatus(`${slide.chapter.label} · Mission introduction`);
    updateEvidence(slide);

    elements.guideStage.classList.remove("is-materializing");
    void elements.guideStage.offsetWidth;
    elements.guideStage.classList.add("is-materializing");
    elements.guideStage.addEventListener("animationend", () => {
      elements.guideStage.classList.remove("is-materializing");
    }, { once: true });
    elements.guideDialogue.classList.remove("is-materializing");
    void elements.guideDialogue.offsetWidth;
    elements.guideDialogue.classList.add("is-materializing");
    elements.guideDialogue.addEventListener("animationend", () => {
      elements.guideDialogue.classList.remove("is-materializing");
    }, { once: true });

    const animationRequest = state.animationRequest;
    revealDialogue(elements.guideDialogue, state.chapterIntroText, animationRequest, () => {
      if (!state.chapterIntroActive || slideIndex !== state.slideIndex) return;
      state.introTextComplete = true;
      state.textReady = true;
      maybeRevealFirstVisitorLine();
    });
    updateControls();
    speakMissionIntro();
  }

  function updateControls() {
    const isOpening = root.classList.contains("is-mission-opening");
    const nextSlide = slides[state.slideIndex + 1];
    const isAskStep = !state.chapterIntroActive
      && currentSlide().line.speaker === "leo"
      && currentSlide().partIndex === currentSlide().partCount - 1
      && nextSlide
      && nextSlide.chapterIndex === currentSlide().chapterIndex
      && nextSlide.line.speaker === "avery";
    const disabled = isOpening || !state.controlsReady || state.questionSpeechPending || state.questionVoiceUnavailable;
    elements.previousButton.disabled = state.slideIndex === 0 || disabled;
    elements.nextButton.disabled = disabled;
    elements.askButton.textContent = state.questionVoiceUnavailable
      ? "Continue without voice"
      : state.questionSpeechPending ? "Speaking…" : "Ask Dr. Fredrick";
    elements.askButton.disabled = isOpening || !state.controlsReady || state.questionSpeechPending;
    if (state.questionVoiceUnavailable) {
      elements.askButton.disabled = !state.controlsReady;
    }
    elements.nextButton.textContent = state.slideIndex === slides.length - 1
      ? "Replay archive"
      : isAskStep ? "Ask" : "Next";
    elements.nextButton.setAttribute("aria-label", isAskStep ? "Ask Dr. Fredrick and continue" : elements.nextButton.textContent);
  }

  function renderSlide(slideIndex, preparedImage, imageAlreadyShown = false) {
    state.slideIndex = slideIndex;
    state.mediaIndex = 0;
    state.controlsReady = false;
    state.textReady = false;
    const slide = currentSlide();
    state.narrationReady = slide.line.speaker === "leo";
    updateMissionMetadata(slide);
    setSpeakerStage(slide);
    updateEvidence(slide);
    elements.speechStatus.textContent = "";
    const chapterSlideIndex = chapterSlides[slide.chapterIndex].indexOf(slide) + 1;
    const partStatus = slide.partCount > 1 ? ` · line part ${slide.partIndex + 1} of ${slide.partCount}` : "";
    setStatus(`${slide.chapter.label} · slide ${chapterSlideIndex} of ${chapterSlides[slide.chapterIndex].length}${partStatus}`);
    updateControls();

    const mediaItems = getCurrentMediaItems();
    if (!mediaItems.length) {
      const displayedImage = imageAlreadyShown ? preparedImage : imageDetails(slide.line.image);
      window.museumLocationView?.setImageSource(
        displayedImage?.src,
        displayedImage?.sourceUrl,
        displayedImage?.scientificReferenceUrl
      );
      if (arguments.length > 1) {
        if (!imageAlreadyShown) {
          showPreparedImage(preparedImage);
        }
      } else {
        const generation = state.navigationGeneration;
        preloadImage(slide.line.image).then(image => {
          if (generation !== state.navigationGeneration || slideIndex !== state.slideIndex) {
            return;
          }
          showPreparedImage(image);
        });
      }
    } else {
      renderCurrentMediaSelection();
    }

    const animationRequest = state.animationRequest;
    const isLeo = slide.line.speaker === "leo";
    const dialogue = isLeo ? elements.studentDialogue : elements.guideDialogue;
    revealDialogue(dialogue, slide.text, animationRequest, () => {
      if (animationRequest !== state.animationRequest || slideIndex !== state.slideIndex) {
        return;
      }
      state.textReady = true;
      if (isLeo) {
        state.controlsReady = true;
      } else {
        state.controlsReady = state.narrationReady;
      }
      if (state.controlsReady) {
        updateControls();
      }
    });

    if (!isLeo) {
      speakCurrentLine("avery", { automatic: true });
    } else {
      elements.speechStatus.textContent = "";
    }
    if (arguments.length > 1) {
      return;
    }
  }

  function openMission(slideIndex) {
    cancelOpening();
    cancelSpeech();
    cancelSlideAnimation();
    state.questionSpeechPending = false;
    state.questionVoiceUnavailable = false;
    state.chapterIntroActive = false;
    state.chapterIntroText = "";
    state.introTextComplete = false;
    state.introNarrationComplete = false;
    state.openingImage = null;
    const generation = ++state.navigationGeneration;
    state.slideIndex = slideIndex;
    const slide = currentSlide();
    updateMissionMetadata(slide);
    root.classList.add("is-mission-opening");
    clearImages();
    state.controlsReady = false;
    state.textReady = false;
    state.narrationReady = false;
    state.questionVoiceUnavailable = false;
    elements.guideStage.hidden = true;
    elements.studentStage.hidden = true;
    elements.speechStatus.textContent = "";
    setStatus(`Entering ${slide.chapter.label}…`);
    updateControls();

    const mediaItems = getCurrentMediaItems();
    const openingMedia = mediaItems[0] || null;
    const preparedImage = openingMedia
      ? preloadImage({
          src: openingMedia.type === "video" ? (openingMedia.poster || openingMedia.src) : openingMedia.src,
          alt: openingMedia.alt || openingMedia.title || "Mars mission image",
          sourceUrl: openingMedia.sourceUrl,
        scientificReferenceUrl: openingMedia.scientificReferenceUrl,
        configKey: openingMedia.configKey
        })
      : preloadImage(slide.line.image);
    const minimumOpening = new Promise(resolve => {
      state.openingTimer = window.setTimeout(() => {
        state.openingTimer = 0;
        resolve();
      }, OPENING_DURATION_MS);
    });

    Promise.all([minimumOpening, preparedImage]).then(([, image]) => {
      if (generation !== state.navigationGeneration) {
        return;
      }
      root.classList.add("is-mission-materializing");
      showPreparedImage(image);
      state.openingMaterializationTimer = window.setTimeout(() => {
        state.openingMaterializationTimer = 0;
        if (generation !== state.navigationGeneration) {
          return;
        }
        root.classList.remove("is-mission-opening", "is-mission-materializing");
        renderMissionIntroduction(slideIndex, image);
      }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 180 : MATERIALIZATION_DURATION_MS);
    });
  }

  function navigateWithinMission(slideIndex) {
    cancelSpeech();
    cancelSlideAnimation();
    state.questionSpeechPending = false;
    state.questionVoiceUnavailable = false;
    const generation = ++state.navigationGeneration;
    renderSlide(slideIndex);
    if (generation !== state.navigationGeneration) {
      return;
    }
  }

  function navigateToSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= slides.length) {
      return;
    }
    if (root.classList.contains("is-mission-opening")) {
      openMission(slideIndex);
      return;
    }
    if (slides[slideIndex].chapterIndex !== currentSlide().chapterIndex) {
      openMission(slideIndex);
    } else {
      navigateWithinMission(slideIndex);
    }
  }

  function advanceStory() {
    if (root.classList.contains("is-mission-opening") || !state.controlsReady
      || state.questionSpeechPending || state.questionVoiceUnavailable) {
      return;
    }
    if (state.slideIndex === slides.length - 1) {
      openMission(0);
      return;
    }
    const slide = currentSlide();
    const nextSlide = slides[state.slideIndex + 1];
    if (slide.line.speaker === "leo"
      && slide.partIndex === slide.partCount - 1
      && nextSlide
      && nextSlide.chapterIndex === slide.chapterIndex
      && nextSlide.line.speaker === "avery") {
      askQuestion();
      return;
    }
    navigateToSlide(state.slideIndex + 1);
  }

  function previousStoryStep() {
    if (state.slideIndex > 0 && state.controlsReady
      && !root.classList.contains("is-mission-opening")
      && !state.questionSpeechPending
      && !state.questionVoiceUnavailable) {
      navigateToSlide(state.slideIndex - 1);
    }
  }

  function getEnglishVoices() {
    return voiceSelection.getEnglishVoices();
  }

  function getSelectedVisitorAvatar() {
    return state.selectedAvatar
      || (String(archive.visitor || "").toLowerCase() === "leo" ? "leo" : "girl");
  }

  function getSpeakerVoice(speaker, voices = getEnglishVoices()) {
    return speaker === "avery"
      ? voiceSelection.getGuideVoice(voices)
      : voiceSelection.getVisitorVoice(voices, getSelectedVisitorAvatar());
  }

  function speakCurrentLine(speaker, {
    automatic = false,
    onComplete = () => {},
    textOverride = null
  } = {}) {
    const sourceText = textOverride
      || (state.chapterIntroActive && speaker === "avery" ? state.chapterIntroText : currentSlide().text);
    const text = personalizeDialogue(sourceText);
    const continueButton = speaker === "leo" ? elements.studentContinueButton : elements.guideContinueButton;
    const playButton = speaker === "leo" ? elements.studentPlayButton : elements.guidePlayButton;
    let request = 0;
    let settled = false;
    const finish = status => {
      if (settled || (request && request !== state.speechRequest)) return;
      settled = true;
      state.utterance = null;
      if (state.speechTimeout) {
        window.clearTimeout(state.speechTimeout);
        state.speechTimeout = 0;
      }
      continueButton.hidden = true;
      if (automatic && speaker === "avery" && status === "complete") {
        state.narrationReady = true;
        state.controlsReady = state.textReady;
        elements.speechStatus.textContent = "Narration complete.";
        updateControls();
      } else if (status !== "complete") {
        playButton.hidden = false;
        continueButton.hidden = false;
        elements.speechStatus.textContent = status === "unavailable"
          ? "Voice narration is unavailable. Continue reading or try another browser."
          : status === "blocked"
            ? "Voice playback is blocked. Continue reading or try again."
            : "Voice playback failed. Continue reading or try again.";
        updateControls();
      } else {
        elements.speechStatus.textContent = "Narration complete.";
      }
      onComplete(status);
    };

    if (!("speechSynthesis" in window) || !window.speechSynthesis || typeof window.SpeechSynthesisUtterance !== "function") {
      finish("unavailable");
      return;
    }

    cancelSpeech();
    request = state.speechRequest;
    continueButton.hidden = false;
    playButton.hidden = true;
    elements.speechStatus.textContent = "Preparing voice narration.";

    const startSpeech = voice => {
      if (request !== state.speechRequest || settled) return;
      if (!voice) {
        finish("unavailable");
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.96;
      utterance.pitch = 1;
      utterance.voice = voice;
      state.utterance = utterance;
      elements.speechStatus.textContent = "Voice narration is playing.";
      const completeOnce = status => {
        if (request !== state.speechRequest || state.utterance !== utterance || settled) return;
        finish(status);
      };
      utterance.onend = () => completeOnce("complete");
      utterance.onerror = event => {
        if (request !== state.speechRequest || state.utterance !== utterance) return;
        completeOnce(event.error === "not-allowed" ? "blocked" : "failed");
        console.error(`Mars ${speaker} voice narration failed: ${event.error}`);
      };
      utterance.onstart = () => {
        if (request !== state.speechRequest) return;
        if (state.speechTimeout) window.clearTimeout(state.speechTimeout);
        const estimate = text.trim().split(/\s+/).length * 900;
        state.speechTimeout = window.setTimeout(
          () => completeOnce("failed"),
          Math.min(90000, Math.max(30000, estimate))
        );
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        completeOnce("failed");
        console.error(`Mars ${speaker} voice narration could not start.`, error);
      }
    };

    state.speechTimeout = window.setTimeout(() => finish("failed"), 10000);
    const voicePromise = speaker === "avery"
      ? voiceSelection.waitForEnglishVoices().then(voices => getSpeakerVoice(speaker, voices))
      : voiceSelection.waitForVisitorVoice(getSelectedVisitorAvatar());
    voicePromise
      .then(startSpeech)
      .catch(error => {
        console.error(`Mars ${speaker} voice selection failed.`, error);
        finish("unavailable");
      });
  }

  function stopNarration() {
    if (state.chapterIntroActive) {
      cancelSpeech();
      elements.speechStatus.textContent = "Continuing to visitor dialogue.";
      state.introNarrationComplete = true;
      maybeRevealFirstVisitorLine();
      return;
    }

    const wasAutomaticGuideNarration = currentSlide().line.speaker === "avery" && !state.controlsReady;
    cancelSpeech();
    if (state.questionSpeechPending) {
      state.questionSpeechPending = false;
      state.questionVoiceUnavailable = true;
      elements.askButton.disabled = false;
      elements.askButton.textContent = "Continue without voice";
      elements.speechStatus.textContent = "Question narration stopped. Continue without voice to hear Dr. Fredrick's response.";
      updateControls();
      return;
    }
    elements.speechStatus.textContent = "Narration stopped. Continue reading or move on.";
    if (wasAutomaticGuideNarration) {
      state.narrationReady = true;
      state.controlsReady = state.textReady;
      updateControls();
    }
  }

  function askQuestion() {
    const slide = currentSlide();
    const nextSlide = slides[state.slideIndex + 1];
    if (state.questionSpeechPending || !state.controlsReady
      || slide.line.speaker !== "leo"
      || slide.partIndex !== slide.partCount - 1
      || !nextSlide
      || nextSlide.chapterIndex !== slide.chapterIndex
      || nextSlide.line.speaker !== "avery") {
      return;
    }
    if (state.questionVoiceUnavailable) {
      state.questionVoiceUnavailable = false;
      navigateToSlide(state.slideIndex + 1);
      return;
    }
    state.questionSpeechPending = true;
    elements.askButton.textContent = "Speaking…";
    elements.speechStatus.textContent = "Your question is being spoken.";
    updateControls();
    speakCurrentLine("leo", {
      onComplete: status => {
        state.questionSpeechPending = false;
        if (status === "complete") {
          state.questionVoiceUnavailable = false;
          navigateToSlide(state.slideIndex + 1);
          return;
        }
        state.questionVoiceUnavailable = true;
        elements.askButton.disabled = false;
        elements.askButton.textContent = "Continue without voice";
        updateControls();
      }
    });
  }

  function playVisitorNarration() {
    if (!state.questionVoiceUnavailable) {
      speakCurrentLine("leo");
      return;
    }
    state.questionVoiceUnavailable = false;
    state.questionSpeechPending = true;
    elements.askButton.textContent = "Speaking…";
    elements.speechStatus.textContent = "Retrying your question narration.";
    updateControls();
    speakCurrentLine("leo", {
      onComplete: status => {
        state.questionSpeechPending = false;
        if (status === "complete") {
          navigateToSlide(state.slideIndex + 1);
          return;
        }
        state.questionVoiceUnavailable = true;
        elements.askButton.disabled = false;
        elements.askButton.textContent = "Continue without voice";
        updateControls();
      }
    });
  }

  function cycleMedia(direction) {
    const mediaItems = getCurrentMediaItems();
    if (!mediaItems.length) {
      return;
    }
    state.mediaIndex = (state.mediaIndex + direction + mediaItems.length) % mediaItems.length;
    renderCurrentMediaSelection();
  }

  function togglePanel(button, panel) {
    const isOpen = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(isOpen));
    panel.hidden = !isOpen;
  }

  elements.missionIndexButton.addEventListener("click", () => {
    elements.missionIndex.hidden = !elements.missionIndex.hidden;
    elements.missionIndexButton.setAttribute("aria-expanded", String(!elements.missionIndex.hidden));
  });

  elements.missionIndex.addEventListener("click", event => {
    const button = event.target.closest("button[data-chapter-index]");
    if (!button) {
      return;
    }
    const chapterIndex = Number(button.dataset.chapterIndex);
    const firstSlide = chapterSlides[chapterIndex][0];
    if (!firstSlide) {
      return;
    }
    elements.missionIndex.hidden = true;
    navigateToSlide(slides.indexOf(firstSlide));
  });

  watchVideoButton.addEventListener("click", () => {
    const mediaItem = getCurrentMediaItem();
    if (mediaItem?.type === "video") {
      openVideoPlayback(mediaItem);
    }
  });
  mediaPreviousButton.addEventListener("click", () => cycleMedia(-1));
  mediaNextButton.addEventListener("click", () => cycleMedia(1));
  videoCloseButton.addEventListener("click", closeVideoPlayback);
  videoModal.addEventListener("click", event => {
    if (event.target === videoModal) {
      closeVideoPlayback();
    }
  });
  videoElement.addEventListener("ended", closeVideoPlayback);
  videoElement.addEventListener("error", () => {
    videoError.hidden = false;
  });

  elements.previousButton.addEventListener("click", previousStoryStep);
  elements.nextButton.addEventListener("click", advanceStory);
  elements.askButton.addEventListener("click", askQuestion);
  elements.evidenceToggle.addEventListener("click", () => togglePanel(elements.evidenceToggle, elements.evidencePanel));
  elements.uncertaintyToggle.addEventListener("click", () => togglePanel(elements.uncertaintyToggle, elements.uncertaintyPanel));

  elements.guidePlayButton.addEventListener("click", () => {
    if (state.chapterIntroActive) {
      speakMissionIntro();
      return;
    }
    speakCurrentLine("avery", { automatic: !state.controlsReady });
  });
  elements.guideRepeatButton.addEventListener("click", () => {
    if (state.chapterIntroActive) {
      speakMissionIntro();
      return;
    }
    speakCurrentLine("avery");
  });
  elements.guideContinueButton.addEventListener("click", stopNarration);
  elements.studentPlayButton.addEventListener("click", playVisitorNarration);
  elements.studentRepeatButton.addEventListener("click", () => speakCurrentLine("leo"));
  elements.studentContinueButton.addEventListener("click", stopNarration);

  window.addEventListener("pagehide", () => {
    state.navigationGeneration += 1;
    cancelOpening();
    cancelSlideAnimation();
    cancelSpeech();
    clearImages();
  });

  document.addEventListener("keydown", event => {
    if (event.altKey || event.ctrlKey || event.metaKey
      || (event.target instanceof Element && event.target.closest("button, a, input, textarea, select"))) {
      return;
    }
    if (event.key === "ArrowRight") {
      advanceStory();
    } else if (event.key === "ArrowLeft") {
      previousStoryStep();
    }
  });

  openMission(0);
})();
