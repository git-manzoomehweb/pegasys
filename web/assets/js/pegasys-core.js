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
  const fetchContentArticle = document.querySelector(".fetch-content-article");
  const questionLi = document.querySelectorAll(".question-li");

  if (fetchContentArticle) {
    async function firstContent() {
      const firstResponse = await fetch("/article-load-items.bc?catid=213680");
      const firstData = await firstResponse.text();
      fetchContentArticle.innerHTML = firstData;
    }
    firstContent();

    questionLi.forEach((item) => {
      item.addEventListener("click", function () {
        questionLi.forEach((li) => {
          li.style.backgroundColor = "";
          li.style.color = "";
        });

        item.style.backgroundColor = "#FB8901";
        item.style.color = "#000";

        let cmsQuery = item.getAttribute("data-id");

        async function secondContent() {
          try {
            const firstResponse = await fetch(
              `/article-load-items.bc?catid=${cmsQuery}`
            );
            if (!firstResponse.ok) {
              throw new Error(`HTTP error! Status: ${firstResponse.status}`);
            }
            const firstData = await firstResponse.text();
            fetchContentArticle.innerHTML = firstData;

          } catch (error) {
            fetchContentArticle.innerHTML =
              "<p>مشکلی در دریافت اطلاعات رخ داد: " + error.message + "</p>";
          }
        }
        secondContent();
      });
    });

    fetchContentArticle.addEventListener("click", function (event) {
      const button = event.target.closest(".faq-box");
      if (!button) return;

      const faqBtn = button.querySelector(".faq-btn");
      const faqAnswer = button.querySelector(".faq-answer"); // فرض: `.faq-answer` بعد از `.faq-box` قرار داره

      faqBtn.classList.toggle("rotate-180");
      button.style.backgroundColor = "#FFF3E0";
      button.style.border = "1px solid #FFDFB1";

      if (faqAnswer.classList.contains("max-h-0")) {
        faqAnswer.classList.remove("max-h-0", "opacity-0");
        faqAnswer.classList.add("max-h-screen", "opacity-100");
      } else {
        faqAnswer.classList.add("max-h-0", "opacity-0");
        faqAnswer.classList.remove("max-h-screen", "opacity-100");

        button.style.backgroundColor = "";
        button.style.border = "";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const fetchContentFlight = document.querySelector(".fetch-content-flight");
  const flightLi = document.querySelectorAll(".flight-li");

  if (fetchContentFlight) {
    async function firstContent() {
      fetchContentFlight.innerHTML = '<div class="loading-text">Loading...</div>';
      try {
        const firstResponse = await fetch("/flight-load-items.bc?catid=213670");
        if (!firstResponse.ok) {
          throw new Error(`HTTP error! Status: ${firstResponse.status}`);
        }
        const firstData = await firstResponse.text();
        fetchContentFlight.innerHTML = firstData;
      } catch (error) {
        console.error("Fetch failed:", error);
        fetchContentFlight.innerHTML =
          "<p>Error loading data: " + error.message + "</p>";
      }
    }
    firstContent();

    flightLi.forEach((item) => {
      item.addEventListener("click", function () {
        flightLi.forEach((li) => {
          li.style.backgroundColor = "";
          li.style.color = "";
        });

        item.style.backgroundColor = "#FB8901";
        item.style.color = "#000";

        let cmsQuery = item.getAttribute("data-id");

        async function secondContent() {
          fetchContentFlight.innerHTML =
            '<div class="loading-text">Loading...</div>';
          try {
            const firstResponse = await fetch(
              `/flight-load-items.bc?catid=${cmsQuery}`
            );
            if (!firstResponse.ok) {
              throw new Error(`HTTP error! Status: ${firstResponse.status}`);
            }
            const firstData = await firstResponse.text();
            fetchContentFlight.innerHTML = firstData;
          } catch (error) {
            console.error("Fetch failed:", error);
            fetchContentFlight.innerHTML =
              "<p>Error loading data: " + error.message + "</p>";
          }
        }
        secondContent();
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  try {
    var xhrobj = new XMLHttpRequest();
    xhrobj.open("GET", "search-engine.bc");
    xhrobj.send();

    xhrobj.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var container = document.getElementById("search-box");
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
          document.head
            .appendChild(scriptTag)
            .parentNode.removeChild(scriptTag);
        }
      }
    };
  } catch (error) {
    // console.error('مشکلی رخ داده است لطفا صبور باشید.', error);
  }
});

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
if (document.querySelector(".swiper-fly-mobile")) {
  var swiperFlyMobile = new Swiper(".swiper-fly-mobile", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 30,
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
  });
}
if (document.querySelector(".swiper-article-mobile")) {
  var swiperArticleMobile = new Swiper(".swiper-article-mobile", {
    slidesPerView: 3,
    direction: "vertical",
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
  });
}
if (document.querySelector(".swiper-other-news-mobile")) {
  var swiperArticleMobile = new Swiper(".swiper-other-news-mobile", {
    slidesPerView: 2,
    direction: "vertical",
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
  });
}
if (document.querySelector(".swiper-other-news-article")) {
  var swiperArticle = new Swiper(".swiper-other-news-article", {
    slidesPerView: 2,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 24,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
  });
}
