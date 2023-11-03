const getFadeInElements = () => {
  var paragraphs = document.getElementsByTagName("p");
  var unorderedLists = document.getElementsByTagName("li");
  var images = document.getElementsByTagName("img");
  var elements = [
    { element: document.getElementById("profile-pic"), animated: false },
  ];
  for (const p of paragraphs) {
    elements.push({ element: p, animated: false });
  }
  for (const li of unorderedLists) {
    elements.push({ element: li, animated: false });
  }
  for (const image of images) {
    elements.push({ element: image, animated: false });
  }
  return elements;
};

const fadeIn = (elements) => {
  elements.forEach(({ element, animated }, index) => {
    if (!animated && element.getBoundingClientRect().top < window.innerHeight) {
      elements[index].animated = true;
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
};

const createExperiencesEffect = () => {
  const experiences = document.getElementsByClassName("experience");

  for (const mainExperience of experiences) {
    const allListChildren = mainExperience.getElementsByTagName("ul");
    for (const child of allListChildren) {
      child.style.marginTop = `-${child.offsetHeight}px`;
    }

    mainExperience.addEventListener("mouseenter", () => {
      mainExperience.animate(
        [
          {
            width: `${100 - 10 * (experiences.length - 1)}%`,
          },
        ],
        {
          duration: 1000,
          fill: "both",
          easing: "ease-in-out",
        }
      );
      const listChildren = mainExperience.getElementsByTagName("ul");
      for (const child of listChildren) {
        child.animate(
          [
            {
              offset: 0.7,
              opacity: 0,
              marginTop: `-${child.offsetHeight}px`,
              textWrap: "nowrap",
            },
            {
              offset: 0.71,
              opacity: 0,
              marginTop: `-${child.offsetHeight}px`,
              textWrap: "wrap",
            },
            {
              opacity: 1,
              marginTop: "30px",
              textWrap: "wrap",
            },
          ],
          {
            duration: 1000,
            fill: "both",
            easing: "ease-in-out",
          }
        );
      }
      for (const otherExperience of experiences) {
        if (
          otherExperience.getAttribute("id") !==
          mainExperience.getAttribute("id")
        ) {
          otherExperience.animate(
            [
              {
                width: "10%",
              },
            ],
            {
              duration: 1000,
              fill: "both",
              easing: "ease-in-out",
            }
          );
          const children = otherExperience.getElementsByTagName("p");
          for (const child of children) {
            child.animate(
              [
                {
                  offset: 0.4,
                  opacity: 0,
                  height: "auto",
                },
                {
                  offset: 0.41,
                  opacity: 0,
                  height: "0px",
                },
                {
                  opacity: 0,
                  height: "0px",
                },
              ],
              {
                duration: 1000,
                fill: "both",
                easing: "ease-in-out",
              }
            );
          }
        }
      }
    });
    mainExperience.addEventListener("mouseleave", () => {
      mainExperience.animate(
        [
          {
            width: `${100 / experiences.length}%`,
          },
        ],
        {
          duration: 500,
          fill: "both",
          easing: "ease-out",
        }
      );
      const listChildren = mainExperience.getElementsByTagName("ul");
      for (const child of listChildren) {
        child.animate(
          [
            {
              textWrap: "wrap",
            },
            {
              offset: 0.3,
              opacity: 0,
              textWrap: "wrap",
            },
            {
              offset: 0.31,
              opacity: 0,
              marginTop: `-${child.offsetHeight}px`,
              textWrap: "nowrap",
            },
            {
              opacity: 0,
              marginTop: `-${child.offsetHeight}px`,
              textWrap: "nowrap",
            },
          ],
          {
            duration: 500,
            fill: "both",
            easing: "ease-in-out",
          }
        );
      }
      for (const otherExperience of experiences) {
        if (
          otherExperience.getAttribute("id") !==
          mainExperience.getAttribute("id")
        ) {
          otherExperience.animate(
            [
              {
                width: `${100 / experiences.length}%`,
              },
            ],
            {
              duration: 500,
              fill: "both",
              easing: "ease-out",
            }
          );
          const children = otherExperience.getElementsByTagName("p");
          for (const child of children) {
            child.animate(
              [
                {
                  offset: 0.3,
                  opacity: 0,
                  height: "auto",
                },
                {
                  opacity: 1,
                  height: "auto",
                },
              ],
              {
                duration: 500,
                fill: "both",
                easing: "ease-in",
              }
            );
          }
        }
      }
    });
  }
};

const resetExperiencesOnResize = () => {
  window.addEventListener("resize", () => {
    const experiences = document.getElementsByClassName("experience");

    if (window.innerWidth < 992) {
      for (const mainExperience of experiences) {
        mainExperience.animate([{ width: "100%" }], {
          duration: 10,
          fill: "both",
        });
      }
    } else {
      for (const mainExperience of experiences) {
        mainExperience.animate([{ width: `${100 / experiences.length}%` }], {
          duration: 10,
          fill: "both",
        });
      }
    }
  });
};

const projectList = [
  {
    id: "fyp",
    title: "Senior Year Project: FLYSMART",
    link: "https://github.com/HalaSaadeh/flysmart-ar-app",
    tags: ["Robotics", "Arduino", "AR", "Unity"],
    hasGIF: true,
    description:
      "Wearable glove that controls a drone in an Augmented Reality environment using hand gestures.",
  },
  {
    id: "robocop",
    title: "RoboCop",
    link: "https://github.com/Charbel199/robocop",
    tags: ["Robotics", "Raspberry Pi", "ML", "Fuzzy Logic"],
    hasGIF: true,
    description:
      "Autonomous rover that chases a speeding car using object detection, ROS, and fuzzy logic.",
  },
  {
    id: "sketch-follower",
    title: "Sketch Follower",
    link: "https://github.com/khaledjalloul/sketch-follower_ros",
    tags: ["Robotics", "Gazebo", "Moveit", "C++"],
    hasGIF: true,
    description:
      "A 2-DOF robot arm Gazebo simulation that mimics a drawn sketch using Moveit for inverse kinematics.",
  },
  {
    id: "snake-game",
    title: "ReactJS Snake Game",
    link: "https://github.com/khaledjalloul/snake-game_react",
    tags: ["ReactJS", "Path Finding"],
    hasGIF: true,
    description:
      "The classic snake game recreated in ReactJS with an autosolve feature.",
  },
  {
    id: "firefighter-robot",
    title: "Firefighter Robot",
    link: "https://github.com/khaledjalloul/mce-rover-project",
    tags: ["Robotics", "Raspberry Pi"],
    hasGIF: true,
    description:
      "Four-wheel robot that detects a fire using heat sensors and attempts to put it out.",
  },
  {
    id: "khedne-maak",
    title: "University Carpooling Mobile Application",
    link: "https://github.com/hadiyouness10/drives_frontend",
    tags: ["React Native", "ExpressJS", "Google Maps API"],
    hasGIF: false,
    description:
      "React Native mobile app that allows students to organize or join rides to their universities.",
  },
];

const displayProjects = () => {
  const projectTitle = document.getElementById("project-title");
  const projectTags = document.getElementById("project-tags");
  const projectDescription = document.getElementById("project-description");

  const projectsDiv = document.getElementById("projects");
  const projectDetailsDiv = document.getElementById("project-details");

  projectList.forEach((project) => {
    const projectDiv = document.createElement("div");
    projectDiv.setAttribute("id", project.id);
    projectDiv.className = "project";
    projectDiv.style.backgroundImage = `url("./assets/projects/${project.id}.jpg")`;
    if (!project.hasGIF) projectDiv.classList.add("project-static-background");

    projectDiv.addEventListener("mouseenter", () => {
      const createdProjects = document.getElementsByClassName("project");

      // if (project.hasGIF)
      //   projectDiv.style.backgroundImage = `url("./assets/projects/${project.id}.gif")`;

      for (const createdProject of createdProjects) {
        if (createdProject.getAttribute("id") !== project.id)
          createdProject.classList.add("blur");
      }

      const x = projectDiv.offsetLeft + projectDiv.offsetWidth / 2;
      if (x < window.innerWidth / 2) {
        projectDetailsDiv.style.right = 0;
        projectDetailsDiv.style.left = "auto";
      } else {
        projectDetailsDiv.style.right = "auto";
        projectDetailsDiv.style.left = 0;
      }

      projectTitle.innerText = project.title;
      projectDescription.innerText = project.description;

      projectTags.innerHTML = "";
      const tags = project.tags.map((tag) => {
        const tagP = document.createElement("p");
        tagP.className = "project-tag";
        tagP.innerHTML = tag;
        return tagP;
      });
      for (const tag of tags) projectTags.appendChild(tag);

      projectDetailsDiv.classList.add("visible");
    });

    projectDiv.addEventListener("mouseleave", () => {
      const createdProjects = document.getElementsByClassName("project");

      // if (project.hasGIF)
      //   projectDiv.style.backgroundImage = `url("./assets/projects/${project.id}.jpg")`;

      for (const createdProject of createdProjects) {
        if (createdProject.getAttribute("id") !== project.id)
          createdProject.classList.remove("blur");
      }

      projectDetailsDiv.classList.remove("visible");
    });

    projectDiv.addEventListener("click", () => {
      window.open(project.link, "_blank");
    });

    projectsDiv.appendChild(projectDiv);
  });
};

window.addEventListener("load", (event) => {
  var fadeInElements = getFadeInElements();
  fadeIn(fadeInElements);
  window.addEventListener("scroll", (event) => fadeIn(fadeInElements));
  wrapper.addEventListener("scroll", (event) => fadeIn(fadeInElements));

  createExperiencesEffect();
  displayProjects();
  resetExperiencesOnResize();
});
