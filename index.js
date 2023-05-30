// Place logos in the center of their divs
function setLogoPositions(event) {
  var pairs = [
    { logo: lau_logo, description: lau_description },
    { logo: dox_logo, description: dox_description },
    { logo: bmw_logo, description: bmw_description },
  ];
  pairs.forEach((pair) => {
    pair.logo.style.opacity = 1;
    var dim = pair.description.getBoundingClientRect();
    pair.logo.style.top =
      dim.top +
      wrapper.scrollTop +
      (dim.bottom - dim.top) / 2 -
      pair.logo.offsetHeight / 2;
  });
}

// Store all text elements to fade them in
function getTextElements() {
  var paragraphs = document.getElementsByTagName("p");
  var unorderedLists = document.getElementsByTagName("li");
  var animatedElements = [
    { element: document.getElementById("profilePic"), animated: false },
  ];
  for (p of paragraphs) {
    animatedElements.push({ element: p, animated: false });
  }
  for (li of unorderedLists) {
    animatedElements.push({ element: li, animated: false });
  }
  return animatedElements;
}

// Fade in text elements
function fadeInElements(animatedElements) {
  animatedElements.forEach(({ element, animated }, index) => {
    if (!animated && element.getBoundingClientRect().top < window.innerHeight) {
      animatedElements[index].animated = true;
      element.animate(
        [
          {
            transform: "translate(0, 40px)",
            opacity: 0,
          },
          {
            transform: "none",
            opacity: 1,
          },
        ],
        {
          duration: 700,
          fill: "both",
          easing: "ease-in-out",
        }
      );
    }
  });
}

// Show/hide horizontal scroll buttons and scroll on mouse hold
var enableProjectScroll = "none";

setInterval(() => {
  if (enableProjectScroll === "right") {
    projects.scrollLeft = projects.scrollLeft + 10;
  } else if (enableProjectScroll === "left") {
    projects.scrollLeft = projects.scrollLeft - 10;
  }
  if (projects.scrollLeft !== 0) scrollLeft.style.display = "flex";
  else scrollLeft.style.display = "none";

  if (projects.scrollLeft + window.innerWidth + 1 >= projects.scrollWidth)
    scrollRight.style.display = "none";
  else scrollRight.style.display = "flex";
}, 10);

window.addEventListener("load", (event) => {
  projects.style.display = "flex"; // Load project gifs
  loading.style.display = "none";

  setLogoPositions();

  var animatedElements = getTextElements();
  fadeInElements(animatedElements);

  wrapper.addEventListener("scroll", (event) =>
    fadeInElements(animatedElements)
  );

  scrollRight.addEventListener(
    "mousedown",
    () => (enableProjectScroll = "right")
  );
  scrollLeft.addEventListener("mousedown", () => {
    if (projects.scrollLeft !== 0) enableProjectScroll = "left";
  });
  scrollRight.addEventListener("mouseup", () => (enableProjectScroll = "none"));
  scrollLeft.addEventListener("mouseup", () => (enableProjectScroll = "none"));
  scrollRight.addEventListener(
    "mouseleave",
    () => (enableProjectScroll = "none")
  );
  scrollLeft.addEventListener(
    "mouseleave",
    () => (enableProjectScroll = "none")
  );
});

window.addEventListener("resize", setLogoPositions);
