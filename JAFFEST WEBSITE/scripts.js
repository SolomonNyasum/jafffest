// ================= NAVBAR =================
const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

// Sticky effect
window.addEventListener("scroll", () => {
  if (navbar && window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else if (navbar) {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });
}

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
  });
});


// ================= HERO SLIDER =================
const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;

if (slides.length > 0) {

  function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
  }

  if (next && prev) {
    next.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      showSlide(index);
    });

    prev.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    });
  }

  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 5000);
}


// ================= COUNTDOWN =================
const festivalDate = new Date("Dec 26, 2026 10:00:00").getTime();

if (document.getElementById("days")) {

  const timer = setInterval(() => {

    const now = new Date().getTime();
    const distance = festivalDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (distance < 0) {
      clearInterval(timer);
      document.querySelector(".countdown").innerHTML = "The Festival Has Started!";
    }

  }, 1000);
}


// ================= FAQ =================
const questions = document.querySelectorAll(".faq-question");

questions.forEach(question => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;

    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});


// ================= LIGHTBOX =================
const images = document.querySelectorAll(".gallery-img, .gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close-lightbox");

if (images.length > 0 && lightbox) {

  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      lightbox.style.display = "none";
    }
  });
}


// ================= BACK TO TOP =================
const backToTop = document.getElementById("backToTop");

if (backToTop) {

  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 400 ? "flex" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

}


// ================= ACTIVE NAV LINK =================
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;

    if (scrollY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

});


// ================= PAYSTACK =================
function payWithPaystack() {

  let email = document.querySelector('input[type="email"]').value;
  let booth = document.getElementById("booth-type").value;

  if (email === "" || booth === "") {
    alert("Please fill all required fields");
    return;
  }

  let amount = booth * 100;

  let handler = PaystackPop.setup({
    key: 'pk_live_9bd1184ded9776f6ec4292e5f0ce5db01daa89ac',
    email: email,
    amount: amount,
    currency: "NGN",

    callback: function (response) {
      alert("Payment successful! Ref: " + response.reference);
    },

    onClose: function () {
      alert("Transaction cancelled");
    }
  });

  handler.openIframe();
}


// ================= COUNTER =================
const counters = document.querySelectorAll(".stat-number");

if (counters.length > 0) {

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const counter = entry.target;
        const target = +counter.getAttribute("data-target");

        let count = 0;

        const update = () => {
          const increment = target / 100;
          count += increment;

          if (count < target) {
            counter.innerText = Math.ceil(count);
            setTimeout(update, 20);
          } else {
            counter.innerText = target + "+";
          }
        };

        update();
        observer.unobserve(counter);
      }

    });

  });

  counters.forEach(counter => observer.observe(counter));
}

const filterBtns = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {

    // REMOVE ACTIVE FROM ALL
    filterBtns.forEach(b => b.classList.remove("active"));

    // ADD ACTIVE TO CLICKED
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    galleryItems.forEach(item => {
      const category = item.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

  });
});

const texts = [
"A celebration of flavor, style and culture",
"Experience Northern Nigeria like never before",
"Food. Fashion. Music. Culture.",
"The biggest lifestyle festival in Jalingo"
];

let textIndex = 0;

setInterval(() => {

const textElement = document.getElementById("changing-text");

textElement.style.opacity = 0;

setTimeout(() => {
textIndex = (textIndex + 1) % texts.length;
textElement.innerText = texts[textIndex];
textElement.style.opacity = 1;
}, 400);

}, 4000);

let startX = 0;
let endX = 0;

const carousel = document.querySelector(".carousel");

carousel.addEventListener("touchstart", (e) => {
startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", (e) => {
endX = e.changedTouches[0].clientX;

if(startX > endX + 50){
next.click(); // swipe left
}

if(startX < endX - 50){
prev.click(); // swipe right
}
});

