"use strict";

(() => {
  const imageFrame = document.querySelector(".story-image-frame");
  const imageSourceControl = document.getElementById("mission-image-source-link");
  const imageSourceIcon = imageSourceControl?.querySelector("svg");
  const imageSourceLabel = imageSourceControl?.querySelector("span");
  let observedImageFrame = imageFrame;

  function getTrustedReference(referenceUrl) {
    if (!referenceUrl) return null;
    try {
      const parsed = new URL(referenceUrl, window.location.href);
      if (parsed.protocol === "https:"
        && /(^|\.)nasa\.gov$|(^|\.)jpl\.nasa\.gov$|(^|\.)esa\.int$/.test(parsed.hostname)) {
        return parsed.href;
      }
    } catch (error) {
      console.error("Mission reference URL is invalid.", error);
    }
    return null;
  }

  function updateImageSourcePosition() {
    if (!imageSourceControl || imageSourceControl.hidden) return;
    const activeImageFrame = document.querySelector(".story-image-frame");
    if (!activeImageFrame) return;
    if (activeImageFrame !== observedImageFrame) {
      observedImageFrame = activeImageFrame;
      imageFrameObserver?.disconnect();
      imageFrameObserver?.observe(activeImageFrame);
    }

    const frame = activeImageFrame.getBoundingClientRect();
    const control = imageSourceControl.getBoundingClientRect();
    if (!frame.width || !frame.height || !control.width || !control.height) return;

    const margin = 8;
    const gap = 8;
    const left = Math.max(margin, Math.min(
      frame.right - control.width,
      window.innerWidth - control.width - margin
    ));
    const belowTop = frame.bottom + gap;
    const top = belowTop + control.height <= window.innerHeight - margin
      ? belowTop
      : Math.max(margin, frame.top - gap - control.height);
    imageSourceControl.style.left = `${Math.round(left)}px`;
    imageSourceControl.style.top = `${Math.round(top)}px`;
  }

  function scheduleImageSourcePosition() {
    updateImageSourcePosition();
    window.requestAnimationFrame(() => {
      updateImageSourcePosition();
      window.requestAnimationFrame(updateImageSourcePosition);
    });
  }

  function updateImageSourceAfterFrameMotion(event) {
    const activeImageFrame = document.querySelector(".story-image-frame");
    const target = event.target;
    if (activeImageFrame && target instanceof Element
      && (activeImageFrame === target || activeImageFrame.contains(target) || target.contains(activeImageFrame))) {
      scheduleImageSourcePosition();
    }
  }

  function setImageSource(imageUrl, sourceUrl, scientificReferenceUrl, sourceDescription = "original image source") {
    if (!imageSourceControl || !imageSourceIcon || !imageSourceLabel) return;
    if (!imageUrl) {
      imageSourceControl.hidden = true;
      return;
    }

    imageSourceControl.hidden = false;
    const isAiGenerated = /ai[\s_-]*(?:generated|geberated)/i.test(imageUrl);
    const trustedReference = getTrustedReference(isAiGenerated ? scientificReferenceUrl : sourceUrl);
    imageSourceControl.dataset.aiGenerated = String(isAiGenerated);
    imageSourceControl.removeAttribute("role");
    imageSourceControl.removeAttribute("tabindex");

    if (trustedReference) {
      imageSourceControl.href = trustedReference;
      imageSourceControl.removeAttribute("aria-disabled");
      imageSourceControl.setAttribute(
        "aria-label",
        isAiGenerated ? "Open scientific reference for AI-generated image" : `Open ${sourceDescription}`
      );
      imageSourceControl.title = isAiGenerated
        ? "AI-generated image; open scientific reference"
        : sourceDescription;
      imageSourceLabel.textContent = isAiGenerated ? "AI GENERATED" : "";
      imageSourceLabel.hidden = !isAiGenerated;
    } else {
      imageSourceControl.removeAttribute("href");
      imageSourceControl.setAttribute("aria-disabled", "true");
      imageSourceControl.setAttribute("role", "status");
      imageSourceControl.setAttribute("tabindex", "-1");
      imageSourceControl.setAttribute(
        "aria-label",
        isAiGenerated ? "AI-generated image" : ""
      );
      imageSourceControl.title = isAiGenerated ? "AI-generated image" : "";
      imageSourceControl.hidden = !isAiGenerated;
      imageSourceLabel.hidden = !isAiGenerated;
      imageSourceLabel.textContent = isAiGenerated ? "AI GENERATED" : "";
    }

    imageSourceIcon.hidden = false;
    scheduleImageSourcePosition();
  }

  window.addEventListener("resize", scheduleImageSourcePosition);
  window.visualViewport?.addEventListener("resize", scheduleImageSourcePosition);
  window.addEventListener("scroll", updateImageSourcePosition, { passive: true });
  document.addEventListener("load", updateImageSourceAfterFrameMotion, true);
  document.addEventListener("transitionend", updateImageSourceAfterFrameMotion, true);
  document.addEventListener("animationend", updateImageSourceAfterFrameMotion, true);

  let imageFrameObserver = null;
  if ("ResizeObserver" in window) {
    imageFrameObserver = new ResizeObserver(updateImageSourcePosition);
    if (imageFrame) imageFrameObserver.observe(imageFrame);
  }

  window.museumLocationView = { setImageSource };
})();
