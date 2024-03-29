const html = String.raw;

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

var currentSize = "";

const resetExperiencesOnResize = () => {
  const resetExperiences = () => {
    const experiences = document.getElementsByClassName("experience");

    if (window.innerWidth < 992 && currentSize !== "sm") {
      currentSize = "sm";
      for (const mainExperience of experiences) {
        mainExperience.animate([{ width: "100%" }], {
          duration: 10,
          fill: "both",
        });

        const allListChildren = mainExperience.getElementsByTagName("ul");
        for (const child of allListChildren) {
          child.animate([{ marginTop: "30px", opacity: 1, textWrap: "wrap" }], {
            duration: 10,
            fill: "both",
          });
        }
      }
    } else if (window.innerWidth >= 992 && currentSize !== "lg") {
      currentSize = "lg";
      for (const mainExperience of experiences) {
        mainExperience.animate([{ width: `${100 / experiences.length}%` }], {
          duration: 10,
          fill: "both",
        });

        const allListChildren = mainExperience.getElementsByTagName("ul");
        for (const child of allListChildren) {
          child.animate(
            [
              {
                marginTop: `-${child.offsetHeight}px`,
                opacity: 0,
                textWrap: "nowrap",
              },
            ],
            {
              duration: 10,
              fill: "both",
            }
          );
        }
      }
    }
  };
  resetExperiences();
  window.addEventListener("resize", resetExperiences);
};

const projectList = [
  {
    id: "sketch-follower",
    title: "Sketch Follower",
    link: "https://github.com/khaledjalloul/sketch-follower_ros",
    tags: ["Robotics", "Gazebo", "Moveit", "Python"],
    description:
      "A 4-DOF robot arm Gazebo simulation created to learn CAD modeling, inverse kinematics, and ROS Control.",
    img: "sketch-follower.png",
  },
  {
    id: "robocop",
    title: "RoboCop",
    link: "https://github.com/Charbel199/robocop",
    tags: ["Robotics", "Raspberry Pi", "Computer Vision", "Fuzzy Logic"],
    description:
      "Autonomous rover that chases a speeding car using object detection, ROS, and fuzzy logic.",
    img: "robocop.jpg",
  },
  {
    id: "fyp",
    title: "Bachelor Senior Year Project: FLYSMART",
    link: "https://github.com/HalaSaadeh/flysmart-ar-app",
    tags: ["Robotics", "Arduino", "AR", "Unity"],
    description:
      "Wearable glove that controls a drone in an Augmented Reality environment using hand gestures.",
    img: "fyp.jpg",
  },
  {
    id: "rrt-star-dubins",
    title: "RRT* Dubins Path Planning",
    link: "https://github.com/khaledjalloul/rrt-star-dubins",
    tags: ["Path Planning", "Python"],
    description:
      "Path planner that uses the RRT* algorithm to obtain a Dubins path while avoiding static obstacles.",
    img: "rrt-star-dubins.png",
  },
  {
    id: "firefighter-robot",
    title: "Firefighter Robot",
    link: "https://github.com/khaledjalloul/mce-rover-project",
    tags: ["Robotics", "Raspberry Pi"],
    description:
      "Four-wheel robot that detects a fire using heat sensors and attempts to put it out.",
    img: "firefighter-robot.jpg",
  },
  {
    id: "snake-game",
    title: "ReactJS Snake Game",
    link: "https://github.com/khaledjalloul/snake-game_react",
    tags: ["ReactJS", "Path Finding"],
    description:
      "The classic snake game recreated in ReactJS with an autosolve feature.",
    img: "snake-game.jpg",
  },
];

const projectMouseEnter = (projectId) => {
  const project = projectList.find((x) => x.id === projectId);
  const projectDiv = document.getElementById(projectId);

  const projectTitle = document.getElementById("project-title");
  const projectTags = document.getElementById("project-tags");
  const projectDescription = document.getElementById("project-description");
  const projectDetailsDiv = document.getElementById("project-details");
  const createdProjects = document.getElementsByClassName("project");

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
};

const projectMouseLeave = (projectId) => {
  const project = projectList.find((x) => x.id === projectId);

  const projectDetailsDiv = document.getElementById("project-details");
  const createdProjects = document.getElementsByClassName("project");

  for (const createdProject of createdProjects) {
    if (createdProject.getAttribute("id") !== project.id)
      createdProject.classList.remove("blur");
  }

  projectDetailsDiv.classList.remove("visible");
};

const projectClick = (projectId) => {
  const project = projectList.find((x) => x.id === projectId);
  window.open(project.link, "_blank");
};

const displayProjects = () => {
  const projectsDiv = document.getElementById("projects");
  projectList.forEach((project) => {
    const projectWrapperDiv = document.createElement("div");
    projectWrapperDiv.className = "project-wrapper";
    projectWrapperDiv.innerHTML = html`
      <div
        id=${project.id}
        class="project"
        style="background-image: url('./assets/projects/${project.img}')"
        onmouseenter="projectMouseEnter('${project.id}')"
        onmouseleave="projectMouseLeave('${project.id}')"
        onclick="projectClick('${project.id}')"
      ></div>
      <div class="sm-project-details">
        <p>${project.title}</p>
        <p>${project.description}</p>
      </div>
    `;

    projectsDiv.appendChild(projectWrapperDiv);
  });
};

window.addEventListener("load", (event) => {
  createExperiencesEffect();
  displayProjects();
  resetExperiencesOnResize();

  var fadeInElements = getFadeInElements();
  fadeIn(fadeInElements);
  window.addEventListener("scroll", (event) => fadeIn(fadeInElements));
  wrapper.addEventListener("scroll", (event) => fadeIn(fadeInElements));
});
