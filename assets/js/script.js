// Embedded skills data
const skillsData = [
    {
        name: "ReactJS",
        icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png"
    },
    {
        name: "ExpressJS",
        icon: "https://img.icons8.com/fluency/48/000000/node-js.png"
    },
    {
        name: "NodeJS",
        icon: "https://img.icons8.com/color/48/000000/nodejs.png"
    },
    {
        name: "HTML5",
        icon: "https://img.icons8.com/color/48/000000/html-5--v1.png"
    },
    {
        name: "CSS3",
        icon: "https://img.icons8.com/color/48/000000/css3.png"
    },
    {
        name: "JavaScript",
        icon: "https://img.icons8.com/color/48/000000/javascript--v1.png"
    },
    {
        name: "Java",
        icon: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo--v1.png"
    },
    {
        name: "Python",
        icon: "https://img.icons8.com/color/48/000000/python--v1.png"
    },
    {
        name: "MongoDB",
        icon: "https://img.icons8.com/color/48/000000/mongodb.png"
    },
    {
        name: "MySQL",
        icon: "https://img.icons8.com/fluency/48/000000/mysql-logo.png"
    },
    {
        name: "PostgreSQL",
        icon: "https://img.icons8.com/color/48/000000/postgreesql.png"
    },
    {
        name: "Git",
        icon: "https://img.icons8.com/color/48/000000/git.png"
    },
    {
        name: "GitHub",
        icon: "https://img.icons8.com/glyph-neue/48/ffffff/github.png"
    },
    {
        name: "Pandas",
        icon: "https://img.icons8.com/color/48/000000/pandas.png"
    },
    {
        name: "AWS",
        icon: "https://img.icons8.com/color/48/000000/amazon-web-services.png"
    },
    {
        name: "TensorFlow",
        icon: "https://img.icons8.com/color/48/000000/tensorflow.png"
    },
    {
        name: "Scikit-learn",
        icon: "https://icon.icepanel.io/Technology/svg/scikit-learn.svg"
    },
    {
        name: "Linux",
        icon: "https://img.icons8.com/color/48/000000/linux.png"
    }
];

// Fallback projects data in case projects.json is unavailable
const fallbackProjects = [
    {
        name: "Sample Project",
        desc: "A sample project for demonstration purposes.",
        category: "web",
        image: "sample",
        links: {
            view: "https://example.com",
            code: "https://github.com/example"
        }
    }
];

async function fetchData(type = "skills") {
    try {
        if (type === "skills") {
            return Promise.resolve(skillsData);
        } else {
            const response = await fetch("./projects.json"); // Ensure correct path
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error(`Failed to fetch ${type}:`, error);
        if (type === "projects") {
            console.warn("Using fallback projects data");
            return fallbackProjects; // Return fallback data
        }
        throw error; // Rethrow for skills to handle in catch block
    }
}

$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // Scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50,
        }, 500, 'linear');
    });

    // EmailJS contact form submission
    $("#contact-form").submit(function (event) {
        event.preventDefault(); // Moved preventDefault to start
        emailjs.init("Q9oJ8KinwIctX2yBw");

        emailjs.sendForm('service_m5sjxuk', 'template_7hlpt8h', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.error('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
    });
});

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Nikitha Sai";
        $("#favicon").attr("href", "./assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        // $("#favicon").attr("href", "./assets/images/favhand.png");
    }
});

// Typed.js effect
var typed = new Typed(".typing-text", {
    strings: ["frontend development", "backend development", "Machine Learning", "Data Science"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" style="width:48px; height:48px;" />
                <span>${skill.name}</span>
            </div>
        </div>`;
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    const projectsContainer = document.querySelector("#work .box-container");
    const fallbackImage = "https://placehold.co/300x200";
    const defaultImage = "./assets/images/projects/default.png"; // Ensure correct path

    let projectHTML = "";
    projects
        .slice(0, 10)
        .filter(project => project.category !== "android")
        .forEach(project => {
            const imageSrc = project.image
                ? `./assets/images/projects/${project.image.toLowerCase()}.png`
                : defaultImage;

            projectHTML += `
            <div class="box tilt">
                <img draggable="false"
                     src="${imageSrc}"
                     alt="${project.name}"
                     onerror="this.onerror=null; this.src='${fallbackImage}'; console.warn('Fallback image used for: ${project.name}');" />
                <div class="content">
                    <div class="tag">
                        <h3>${project.name}</h3>
                    </div>
                    <div class="desc">
                        <p>${project.desc}</p>
                        <div class="btns">
                            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                        </div>
                    </div>
                </div>
            </div>`;
        });

    projectsContainer.innerHTML = projectHTML;

    // Initialize VanillaTilt
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });

    // Initialize ScrollReveal for projects
    ScrollReveal().reveal('.work .box', {
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true,
        interval: 200
    });
}

// Load skills and projects
fetchData().then(data => {
    showSkills(data);
}).catch(error => {
    console.error("Failed to load skills:", error);
    alert("Failed to load skills. Please try again later.");
});

fetchData("projects").then(data => {
    showProjects(data);
}).catch(error => {
    console.error("Failed to load projects:", error);
    alert("Failed to load projects. Displaying sample project.");
    showProjects(fallbackProjects); // Show fallback projects
});

// Disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123 || 
        (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) ||
        (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) ||
        (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) ||
        (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        return false;
    }
};

// Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();

Tawk_API.customStyle = {
    visibility: {
        desktop: {
            position: 'bl',
            xOffset: 20,
            yOffset: 20
        },
        mobile: {
            position: 'bl',
            xOffset: 10,
            yOffset: 20
        }
    }
};

(function(){
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/683874bc58576e1911972e48/1ise8g0bf';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

Tawk_API.onLoad = function(){
    setTimeout(function() {
        var customStyles = document.createElement('style');
        customStyles.innerHTML = `
            .tawk-button {
                background-color: #FFD700 !important;
                box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4) !important;
            }
            .tawk-chat-bubble {
                background: linear-gradient(135deg, #FFD700, #FFA500) !important;
            }
        `;
        document.head.appendChild(customStyles);
        
        var tawkElements = document.querySelectorAll('[id*="tawk"]');
        tawkElements.forEach(function(element) {
            element.style.left = '20px';
            element.style.right = 'auto';
        });
    }, 1000);
};

Tawk_API.onChatMaximized = function(){
    setTimeout(function() {
        var tawkFrame = document.querySelector('#tawk-chat-widget-frame');
        if (tawkFrame) {
            tawkFrame.style.left = '20px';
            tawkFrame.style.right = 'auto';
        }
    }, 100);
};

/* ScrollReveal Animations */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });
srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });

/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });