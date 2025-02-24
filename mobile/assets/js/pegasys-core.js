const headerMenu = document.querySelector(".header-menu");
const headerMenuClose = document.querySelector(".header-menu-close");
const bars3 = document.querySelector(".bars3");

if (window.innerWidth >= 1024) {
  headerMenuClose.addEventListener("click", function () {
    headerMenu.style.visibility = "hidden";
    headerMenu.style.opacity = "0";
    // headerMenu.style.display = "none";
  });
  bars3.addEventListener("click", function () {
    headerMenu.style.visibility = "visible";
    headerMenu.style.opacity = "1";
    // headerMenu.style.display = "block";
  });
} else {
  headerMenuClose.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(1024px)";
  });
  bars3.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(0)";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleDropdowns = document.querySelectorAll(".toggle-dropdown");
  const dropdownIcons = document.querySelectorAll(".dropdown-icon");

  toggleDropdowns.forEach((toggle, index) => {
    const submenu = toggle.nextElementSibling;
    const dropdownIcon = dropdownIcons[index];

    toggle.addEventListener("click", function () {

      dropdownIcon.classList.toggle("rotate-180");

      if (submenu.style.maxHeight) {
        submenu.style.maxHeight = null;
        submenu.style.opacity = "0";
      } else {

        submenu.style.maxHeight = (submenu.scrollHeight*2) + "px"; 
        submenu.style.opacity = "1";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const faqBox = document.querySelectorAll(".faq-box");
  const faqBtns = document.querySelectorAll(".faq-btn");
  const faqAnswers = document.querySelectorAll(".faq-answer");

  faqBox.forEach((button, index) => {
    button.addEventListener("click", function () {
      const faqAnswer = faqAnswers[index];
      const faqBtn = faqBtns[index];

      faqBtn.classList.toggle("rotate-180");
      button.style.backgroundColor = "#FFF3E0";
      button.style.border = "1px solid #FFDFB1";

      if (faqAnswer.classList.contains("max-h-0")) {
        faqAnswer.classList.remove("max-h-0", "opacity-0");
        faqAnswer.classList.add("max-h-screen", "opacity-100");
      } else {
        faqAnswer.classList.add("max-h-0", "opacity-0");
        faqAnswer.classList.remove("max-h-screen", "opacity-100");

        // بازگشت به حالت اولیه بلافاصله بعد از بسته شدن
        button.style.backgroundColor = ""; // یا رنگ اولیه
        button.style.border = ""; // یا رنگ اولیه
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".email-icon")) {
    const emailIcon = document.querySelectorAll(".email-icon");
    const emailPopup = document.querySelector(".email-popup");
    const closeIcon = document.querySelector(".close-icon");

    // تغییرات مربوط به پاپ‌آپ برای موبایل و دسکتاپ
    emailIcon.forEach((icon) => {
      icon.addEventListener("click", function () {
        if (window.innerWidth < 1024) {
          emailPopup.style.opacity = "1";
          emailPopup.style.transform = "translateX(0)";
          emailPopup.style.pointerEvents = "auto";
        } else {
          emailPopup.style.position = "fixed";
          emailPopup.style.top = "50%";
          emailPopup.style.left = "50%";
          emailPopup.style.transform = "translate(-40%, -50%)";
          emailPopup.style.opacity = "1";
          emailPopup.style.pointerEvents = "auto";
        }
      });
    });

    closeIcon.addEventListener("click", function () {
      if (window.innerWidth < 1024) {
        emailPopup.style.opacity = "0";
        emailPopup.style.transform = "translateX(100%)";
        emailPopup.style.pointerEvents = "none";
      } else {
        emailPopup.style.opacity = "0";
        emailPopup.style.pointerEvents = "none";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  try {
 var xhrobj = new XMLHttpRequest();
 xhrobj.open('GET', 'search-engine.bc');
 xhrobj.send();


 xhrobj.onreadystatechange = function () {
     if (this.readyState == 4 && this.status == 200) {
         var container = document.getElementById('search-box');
         container.innerHTML = xhrobj.responseText;


         var scripts = container.getElementsByTagName("script");
         for (var i = 0; i < scripts.length; i++) {
             var scriptTag = document.createElement("script");
             if (scripts[i].src) {
                 scriptTag.src = scripts[i].src;
                 scriptTag.async = false;
             } else {
                 scriptTag.text = scripts[i].textContent;
             }
             document.head.appendChild(scriptTag).parentNode.removeChild(scriptTag);
         }
     }
 };
} catch (error) {
 // console.error('مشکلی رخ داده است لطفا صبور باشید.', error);
}
})


// swiper
if (document.querySelector(".swiper-article")) {
  var swiperArticle = new Swiper(".swiper-article", {
    slidesPerView: 3,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 24,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
  });
}
if (document.querySelector(".swiper-other-news")) {
  var swiperArticle = new Swiper(".swiper-other-news", {
    slidesPerView: 2,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 24,
    grabCursor: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
  });
}
