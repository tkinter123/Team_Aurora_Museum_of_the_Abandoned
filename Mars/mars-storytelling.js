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
  const missionImageViewport = document.getElementById("mission-image-visual");
  if (!missionImageFrame) {
    throw new Error("Mars mission image frame is missing from mars.html.");
  }

  function updateMissionImageFit(image) {
    if (!image?.naturalWidth || !image.naturalHeight) return;
    const frameRect = missionImageFrame.getBoundingClientRect();
    const viewportRect = missionImageViewport.getBoundingClientRect();
    const frameWidth = frameRect.width;
    const frameHeight = frameRect.height;
    const controls = getComputedStyle(document.documentElement);
    const value = (name, fallback) => {
      const parsed = Number.parseFloat(controls.getPropertyValue(`--mars-mission-image-${name}`));
      return Number.isFinite(parsed) ? parsed : fallback;
    };
    const ratio = image.naturalWidth / image.naturalHeight;
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
    image.style.setProperty("--mars-mission-image-fit-width", `${width}px`);
    image.style.setProperty("--mars-mission-image-fit-height", `${height}px`);
    image.style.setProperty("--mars-mission-image-center-x", `${centerOffsetX}px`);
    image.style.setProperty("--mars-mission-image-center-y", `${centerOffsetY}px`);
    image.style.setProperty("--mars-mission-image-fit-offset-x", `${offsetX}px`);
    image.style.setProperty("--mars-mission-image-fit-offset-y", `${offsetY}px`);

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
      ? `Mars image settings are limited to keep the full image inside the screen: ${constrainedSettings.join(", ")}.`
      : "";
    if (limitMessage !== image.dataset.limitMessage) {
      if (limitMessage) console.warn(limitMessage);
      image.dataset.limitMessage = limitMessage;
      if (limitMessage) {
        missionImageFrame.setAttribute("aria-description", limitMessage);
      } else {
        missionImageFrame.removeAttribute("aria-description");
      }
    }
  }

  function updateAllMissionImageFits() {
    elements.images.forEach(updateMissionImageFit);
  }

  elements.images.forEach(image => {
    image.addEventListener("load", () => updateMissionImageFit(image));
    if (image.complete) updateMissionImageFit(image);
  });
  if ("ResizeObserver" in window) {
    new ResizeObserver(updateAllMissionImageFits).observe(missionImageViewport);
  }
  window.addEventListener("resize", updateAllMissionImageFits);
  new MutationObserver(updateAllMissionImageFits).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style"]
  });

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
    visitorRevealTimer: 0
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
      scientificReferenceUrl: value.scientificReferenceUrl
    };
  }

  function preloadImage(value) {
    const details = imageDetails(value);
    if (!details) {
      return Promise.resolve(null);
    }

    return new Promise(resolve => {
      const image = new Image();
      image.addEventListener("load", () => resolve({ ...details, loaded: true }), { once: true });
      image.addEventListener("error", () => {
        console.error(`Mars mission image could not be loaded: ${details.src}`);
        resolve({ ...details, loaded: false });
      }, { once: true });
      image.src = details.src;
    });
  }

  function clearImages() {
    state.imageGeneration += 1;
    if (state.imageTransitionTimer) {
      window.clearTimeout(state.imageTransitionTimer);
      state.imageTransitionTimer = 0;
    }
    elements.images.forEach(image => {
      image.classList.remove("is-visible", "is-leaving");
      image.hidden = true;
      image.removeAttribute("src");
      image.alt = "";
    });
    state.activeImageIndex = -1;
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
    if (activeImage && activeImage.getAttribute("src") === preparedImage.src) {
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
    nextImage.src = preparedImage.src;
    nextImage.alt = preparedImage.alt;
    nextImage.hidden = false;

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
      detail.textContent = `${chapter.status} · ${chapter.statusDetail}`;
      button.append(number, title, detail);
      elements.missionIndex.append(button);
    });

    elements.missionIndexButton.setAttribute("aria-expanded", String(!elements.missionIndex.hidden));
  }

  function updateMissionMetadata(slide) {
    const { chapter } = slide;
    elements.title.textContent = chapter.title;
    elements.missionStatus.textContent = chapter.status;
    elements.missionStatus.dataset.status = chapter.status;
    elements.indicator.textContent = `${chapter.label} · ${chapter.setting} · ${chapter.statusDetail}`;
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
      elements.askButton.textContent = "Ask Dr. Avery";
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
      : state.questionSpeechPending ? "Speaking…" : "Ask Dr. Avery";
    elements.askButton.disabled = isOpening || !state.controlsReady || state.questionSpeechPending;
    if (state.questionVoiceUnavailable) {
      elements.askButton.disabled = !state.controlsReady;
    }
    elements.nextButton.textContent = state.slideIndex === slides.length - 1
      ? "Replay archive"
      : isAskStep ? "Ask" : "Next";
    elements.nextButton.setAttribute("aria-label", isAskStep ? "Ask Dr. Avery and continue" : elements.nextButton.textContent);
  }

  function renderSlide(slideIndex, preparedImage, imageAlreadyShown = false) {
    state.slideIndex = slideIndex;
    state.controlsReady = false;
    state.textReady = false;
    const slide = currentSlide();
    state.narrationReady = slide.line.speaker === "leo";
    updateMissionMetadata(slide);
    const displayedImage = imageAlreadyShown ? preparedImage : imageDetails(slide.line.image);
    window.museumLocationView?.setImageSource(
      displayedImage?.src,
      displayedImage?.sourceUrl,
      displayedImage?.scientificReferenceUrl
    );
    setSpeakerStage(slide);
    updateEvidence(slide);
    elements.speechStatus.textContent = "";
    const chapterSlideIndex = chapterSlides[slide.chapterIndex].indexOf(slide) + 1;
    const partStatus = slide.partCount > 1 ? ` · line part ${slide.partIndex + 1} of ${slide.partCount}` : "";
    setStatus(`${slide.chapter.label} · slide ${chapterSlideIndex} of ${chapterSlides[slide.chapterIndex].length}${partStatus}`);
    updateControls();

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

    const preparedImage = preloadImage(slide.line.image);
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
      elements.speechStatus.textContent = "Question narration stopped. Continue without voice to hear Dr. Avery's response.";
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
