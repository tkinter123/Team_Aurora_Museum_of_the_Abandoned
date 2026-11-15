(() => {
  const welcomeDialog = document.querySelector("#guide-welcome");
  const welcomeMessage = document.querySelector("#guide-welcome-message");
  const libraryEntry = document.querySelector("#library-entry");
  const bookHotspots = document.querySelector(".library-books");
  const libraryImage = new Image();
  libraryImage.src = "./space_images/bg.png";
  const visitorName = sessionStorage.getItem("museumVisitorName") || "Explorer";
  welcomeMessage.textContent = `Hi, ${visitorName} and Marry, welcome to the Museum of the Abandoned. I'm your guide Dr. Fredrick. Today, we are gonna have a nice time together. Before we go, first choose a book to dive into the depth.`;
  setTimeout(() => welcomeDialog.showModal(), 2000);

  function positionBookHotspots() {
    if (!libraryImage.naturalWidth || !libraryEntry || !bookHotspots) return;

    const { width, height } = libraryEntry.getBoundingClientRect();
    const isMobile = matchMedia("(max-width: 760px), (max-aspect-ratio: 4/3)").matches;
    const scaleX = width / libraryImage.naturalWidth;
    const scaleY = height / libraryImage.naturalHeight;
    const scale = isMobile ? Math.min(scaleX, scaleY) : Math.max(scaleX, scaleY);
    const renderedWidth = libraryImage.naturalWidth * scale;
    const renderedHeight = libraryImage.naturalHeight * scale;

    bookHotspots.style.left = `${(width - renderedWidth) / 2}px`;
    bookHotspots.style.top = `${isMobile ? height - renderedHeight : (height - renderedHeight) / 2}px`;
    bookHotspots.style.width = `${renderedWidth}px`;
    bookHotspots.style.height = `${renderedHeight}px`;
  }

  libraryImage.addEventListener("load", positionBookHotspots);
  new ResizeObserver(positionBookHotspots).observe(libraryEntry);
  addEventListener("resize", positionBookHotspots);
})();
