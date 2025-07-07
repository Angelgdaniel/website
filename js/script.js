document.addEventListener("DOMContentLoaded", function () {
  let spinnerContainer = document.createElement("div");
  spinnerContainer.classList.add("spinner-container");

  let dotSpinner = document.createElement("div");
  dotSpinner.classList.add("dot-spinner");

  for (let i = 0; i < 8; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot-spinner__dot");
    dotSpinner.appendChild(dot);
  }

  spinnerContainer.appendChild(dotSpinner);
  document.body.appendChild(spinnerContainer);

  window.onload = function () {
    spinnerContainer.style.display = "none";
  };

  const images = document.querySelectorAll(".reveal-img");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  images.forEach((img) => {
    observer.observe(img);
  });

  if (document.getElementById("vertical-carousel")) {
    new Splide("#vertical-carousel", {
      type: "loop",
      direction: "ttb",
      height: "62vh",
      perPage: 2,
      focus: "center",
      gap: "1rem",
      autoplay: true,
      interval: 3000,
      speed: 800,
      pauseOnHover: true,
      wheel: true,
      breakpoints: {
        768: { height: "62vh", perPage: 1 },
      },
    }).mount();

    const closeIcon = document.querySelector(".close-icon");

    closeIcon?.addEventListener("click", () => {
      const container = document.querySelector(".container-mini-img");
      if (container) container.remove();
    });
  }
});

document.querySelectorAll(".social-icon-gmail").forEach((icon) => {
  icon.addEventListener("click", (event) => {
    event.preventDefault();
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let mailToLinkMobile =
      "mailto:angeldaniel.dev@gmail.com?subject=Hola%20soy%20[NOMBRE]&body=Estimado%20Daniel,%0D%0A%0D%0AEspero%20que%20este%20mensaje%20le%20encuentre%20bien.%20Me%20gustar%C3%ADa%20hablar%20con%20usted%20sobre%20una%20posible%20entrevista%20de%20desarrollo%20web.%20He%20estado%20revisando%20su%20perfil%20y%20me%20ha%20impresionado%20su%20trabajo.%0D%0A%0D%0A%C2%BFPodr%C3%ADamos%20coordinar%20una%20reuni%C3%B3n%20para%20discutir%20esto%20con%20m%C3%A1s%20detalle?%0D%0A%0D%0AQuedo%20a%20la%20espera%20de%20su%20respuesta.%0D%0A%0D%0ASaludos%20cordiales,%0D%0A[NOMBRE]";
    let mailToLinkDesktop =
      "https://mail.google.com/mail/?view=cm&fs=1&to=angeldaniel.dev@gmail.com&su=Hola%20soy%20%5BNOMBRE%5D&body=Estimado%20Daniel%2C%0D%0A%0D%0AEspero%20que%20este%20mensaje%20le%20encuentre%20bien.%20Me%20gustar%C3%ADa%20hablar%20con%20usted%20sobre%20una%20posible%20entrevista%20de%20desarrollo%20web.%20He%20estado%20revisando%20su%20perfil%20y%20me%20ha%20impresionado%20su%20trabajo.%0D%0A%0D%0A%C2%BFPodr%C3%ADamos%20coordinar%20una%20reuni%C3%B3n%20para%20discutir%20esto%20con%20m%C3%A1s%20detalle%3F%0D%0A%0D%0AQuedo%20a%20la%20espera%20de%20su%20respuesta.%0D%0A%0D%0ASaludos%20cordiales%2C%0D%0A%5BNOMBRE%5D";
    let mailToLink = isMobile ? mailToLinkMobile : mailToLinkDesktop;
    window.open(mailToLink, "_blank");
  });
});

document.querySelectorAll(".contact-social-icon").forEach((icon) => {
  let dataTooltip = icon.getAttribute("data-tooltip-contact");
  tippy(icon, {
    content: dataTooltip,
    placement: "top",
    trigger: "mouseenter",
    theme: "translucent",
    animation: "shift-away",
    allowHTML: true,
  });
});

let menuButton = document.querySelector(".navbar-menu");
let offCanvas = document.getElementById("offCanvas");

if (menuButton && offCanvas) {
  function checkScreenWidth() {
    if (window.innerWidth > 992) {
      offCanvas.classList.remove("active");
    }
  }

  checkScreenWidth();

  menuButton.addEventListener("click", function () {
    offCanvas.classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    if (
      !offCanvas.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      offCanvas.classList.remove("active");
    }
  });

  window.addEventListener("resize", checkScreenWidth);
}

let tabButtons = document.querySelectorAll(".tab-button");
let tabPanes = document.querySelectorAll(".tab-pane");

tabButtons.forEach((button) => {
  button.addEventListener("click", function () {
    let targetTab = this.getAttribute("data-tab");
    showTab(targetTab);
  });
});

function showTab(tabId) {
  tabPanes.forEach((tab) => {
    tab.classList.remove("active");
  });

  tabButtons.forEach((button) => {
    button.classList.remove("active");
  });

  let selectedTab = document.getElementById(tabId);
  selectedTab.classList.add("active");

  let selectedButton = Array.from(tabButtons).find(
    (button) => button.getAttribute("data-tab") === tabId
  );
  selectedButton.classList.add("active");
}

function handleInnerNavigation(typeLink) {
  document.querySelectorAll(typeLink).forEach((navLink) => {
    navLink.addEventListener("click", () => {
      document
        .querySelectorAll(typeLink)
        .forEach((link) => link.classList.remove("active"));
      navLink.classList.add("active");
    });
  });
}

handleInnerNavigation(".nav-link");
handleInnerNavigation(".off-canvas-link");

let currentDate = new Date().getFullYear();
let footerElement = document.querySelector(".footer-text");
footerElement.innerHTML = footerElement.innerHTML.replace(/\d{4}/, currentDate);

let scrollToTopBtn = document.querySelector(".scroll-to-top");

let handleScroll = () => {
  if (window.scrollY > window.innerHeight / 2) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

let scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

if (scrollToTopBtn) {
  window.addEventListener("scroll", handleScroll);
  scrollToTopBtn.addEventListener("click", scrollToTop);
}

function updateImageAndTextByViewport() {
  const img = document.querySelector(".img-click");
  const span = document.querySelector(".text-mini-img");

  if (window.innerWidth <= 768) {
    if (img && span) {
      img.src = "./assets/images/hand-touch.png";
      span.textContent = "Toca en el certificado para descargar";
    }
  } else {
    if (img && span) {
      img.src = "./assets/images/arrow-click.png";
      span.textContent = "Haz click en el certificado para descargar";
    }
  }
}

updateImageAndTextByViewport();

window.addEventListener("resize", updateImageAndTextByViewport);

const btn = document.getElementById('button');
const form = document.getElementById('form');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    btn.value = 'Enviando...';
    emailjs.sendForm("default_service", "template_6u6pkeh", this)
      .then(() => {
        btn.value = 'Mensaje enviado';
        this.reset();
        window.location.href = 'thank-page.html';
      }, (err) => {
        btn.value = 'Enviar mensaje';
        alert(JSON.stringify(err));
      });
  });
}