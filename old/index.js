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

const projectList = [
  {
    id: "fyp",
    title: "Senior Year Project: FLYSMART",
    link: "https://github.com/HalaSaadeh/flysmart-ar-app",
    tags: ["Robotics", "Arduino", "AR", "Unity"],
    description:
      "Wearable glove that controls a drone in an Augmented Reality environment using hand gestures.",
  },
  {
    id: "robocop",
    title: "RoboCop",
    link: "https://github.com/Charbel199/robocop",
    tags: ["Robotics", "Raspberry Pi", "ML", "Fuzzy Logic"],
    description:
      "Autonomous rover that chases a speeding car using object detection, ROS, and fuzzy logic.",
  },
  {
    id: "sketch-follower",
    title: "Sketch Follower",
    link: "https://github.com/khaledjalloul/sketch-follower_ros",
    tags: ["Robotics", "Gazebo", "Moveit", "C++"],
    description:
      "A 2-DOF robot arm Gazebo simulation that mimics a drawn sketch using Moveit for inverse kinematics.",
  },
  {
    id: "snake-game",
    title: "ReactJS Snake Game",
    link: "https://github.com/khaledjalloul/snake-game_react",
    tags: ["ReactJS", "Path Finding"],
    description:
      "The classic snake game recreated in ReactJS with an autosolve feature.",
  },
  {
    id: "firefighter-robot",
    title: "Firefighter Robot",
    link: "https://github.com/khaledjalloul/mce-rover-project",
    tags: ["Robotics", "Raspberry Pi"],
    description:
      "Four-wheel robot that detects a fire using heat sensors and attempts to put it out.",
  },
  {
    id: "khedne-maak",
    title: "University Carpooling Mobile Application",
    link: "https://github.com/hadiyouness10/drives_frontend",
    tags: ["React Native", "ExpressJS", "Google Maps API"],
    description:
      "React Native mobile app that allows students to organize or join rides to their universities.",
  },
];

var currentUI = "large";
var currentProjectDiv = null;

window.addEventListener("load", (event) => {
  projects.style.display = "grid"; // Load project gifs
  loading.style.display = "none";
  wrapper.style.overflowX = "hidden";

  if (window.innerWidth <= 800) currentUI = "small";
  setLogoPositions();

  var animatedElements = getTextElements();
  fadeInElements(animatedElements);

  wrapper.addEventListener("scroll", (event) =>
    fadeInElements(animatedElements)
  );

  const projectTitle = document.getElementById("project-title");
  const projectTags = document.getElementById("project-tags");
  const projectDescription = document.getElementById("project-description");

  projectList.forEach((project) => {
    const projectDiv = document.createElement("div");
    projectDiv.setAttribute("id", project.id);
    projectDiv.className = "project";

    if (window.innerWidth > 800)
      projectDiv.setAttribute(
        "onclick",
        `window.open('${project.link}', '_blank');`
      );

    projectDiv.addEventListener("mouseover", () => {
      projectTitle.innerText = project.title;
      projectDescription.innerText = project.description;

      projectTags.innerHTML = project.tags.map(
        (tag) => `<p class="project-tag" style="opacity: 1">${tag}</p>`
      );
    });

    // Require double pressing to redirect when on mobile
    projectDiv.addEventListener("click", () => {
      projectTitle.innerText = project.title;
      projectDescription.innerText = project.description;

      projectTags.innerHTML = project.tags.map(
        (tag) => `<p class="project-tag" style="opacity: 1">${tag}</p>`
      );

      if (window.innerWidth <= 800 && currentProjectDiv !== projectDiv) {
        if (currentProjectDiv) currentProjectDiv.removeAttribute("onclick");
        currentProjectDiv = projectDiv;
        projectDiv.setAttribute(
          "onclick",
          `window.open('${project.link}', '_blank');`
        );
      }
    });

    projects.appendChild(projectDiv);
  });

  // Display first project's tags
  projectList[0].tags.forEach((tag) => {
    const tagP = document.createElement("p");
    tagP.className = "project-tag";
    tagP.innerHTML = tag;

    projectTags.appendChild(tagP);
    animatedElements.push({ element: tagP, animated: false });
  });

  // Remove onclick attribute from projects when on mobile
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 800 && currentUI === "large") {
      currentUI = "small";
      const projectDivs = document.getElementsByClassName("project");
      Array.from(projectDivs).forEach((projectDiv, index) => {
        projectDiv.removeAttribute("onclick");
      });
    } else if (window.innerWidth > 800 && currentUI === "small") {
      currentUI = "large";
      const projectDivs = document.getElementsByClassName("project");
      Array.from(projectDivs).forEach((projectDiv, index) => {
        projectDiv.setAttribute(
          "onclick",
          `window.open('${projectList[index].link}', '_blank');`
        );
      });
    }
  });
});

window.addEventListener("resize", setLogoPositions);
