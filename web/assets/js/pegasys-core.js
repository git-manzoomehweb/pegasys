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
        submenu.style.maxHeight = (submenu.scrollHeight*10) + "px"; 
        submenu.style.opacity = "1";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const fetchContentArticle = document.querySelector(".fetch-content-article");
  const questionLi = document.querySelectorAll(".question-li");

  if (fetchContentArticle) {
    async function firstContent() {
      const firstResponse = await fetch("/article-load-items.bc?catid=213681");
      const firstData = await firstResponse.text();
      fetchContentArticle.innerHTML = firstData;
      if (questionLi.length > 0) {
        questionLi[0].style.backgroundColor = "#FB8901";
        questionLi[0].style.color = "#000";
      }
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
              `/article-load-items.bc?id=${cmsQuery}`
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
      const faqAnswer = button.querySelector(".faq-answer"); 

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
      fetchContentFlight.innerHTML =
        '<div class="flex justify-center mx-auto max-lg:w-[90%] max-xl:w-[97%] xl:w-[1280px]"><span class="flight-loader"></span></div>';
      try {
        const firstResponse = await fetch("/flight-load-items.bc?catid=213671");
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
      if (flightLi.length > 0) {
        flightLi[0].style.backgroundColor = "#FB8901";
        flightLi[0].style.color = "#000";
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
            '<div class="flex justify-center mx-auto max-lg:w-[90%] max-xl:w-[97%] xl:w-[1280px]"><span class="flight-loader"></span></div>';
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
            fetchContentFlight.innerHTML =
              "<p>Error loading data: " + error.message + "</p>";
          }
        }
        secondContent();
      });
    });
  }
});

let i = document.querySelectorAll(".ticket-article");
  i.forEach((e) => {
    let t = e.querySelector(".flight-type-article").innerText.trim(),
      r = e.querySelector(".dep-text").innerText.trim(),
      i = e.querySelector(".dep-id").innerText.trim(),
      a = e.querySelector(".des-text").innerText.trim(),
      l = e.querySelector(".des-id").innerText.trim();
    e.querySelector(".set-ticket").addEventListener("click", () => {
      if (window.location.href.endsWith("/")) {
        (document.querySelector("#r-flight #flightSearch #departure1").value =
          r),
          (document.querySelector(
            "#r-flight #flightSearch .departure-route .locationId"
          ).value = i),
          (document.querySelector(
            "#r-flight #flightSearch .destination-route #destination1"
          ).value = a),
          (document.querySelector(
            "#r-flight #flightSearch .destination-route .locationId"
          ).value = l),
          t.includes("اکونومی") &&
            ((document.querySelector("#r-flight .FlightClass-text").innerText =
              "اکونومی"),
            (document.querySelector("#r-flight #FlightClass1").value =
              "Economy")),
          t.includes("بیزینس") &&
            ((document.querySelector("#r-flight .FlightClass-text").innerText =
              "بیزینس"),
            (document.querySelector("#r-flight #FlightClass1").value =
              "BusinessClass")),
          t.includes("فرست") &&
            ((document.querySelector("#r-flight .FlightClass-text").innerText =
              "فرست"),
            (document.querySelector("#r-flight #FlightClass1").value =
              "FirstClass")),
          document.querySelector("#r-flight").classList.remove("hidden");
        let e = document.querySelector(".bg-search");
        e && window.scrollTo({ top: e.offsetTop, behavior: "smooth" });
      } else
        localStorage.setItem(
          "flightData",
          JSON.stringify({
            depId3: i,
            desId3: l,
            departureCity2: r,
            destinationCity2: a,
            flightType2: t,
          })
        ),
          (window.location.href = "/");
    });
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
      let s = JSON.parse(localStorage.getItem("flightData"));
      if (s && "/" === window.location.pathname) {
        localStorage.removeItem("searchHistory_flight");
        let {
          depId3: c,
          desId3: d,
          departureCity2: u,
          destinationCity2: p,
          flightType2: f,
        } = s;
        (document.querySelector(
          "#r-flight #flightSearch #departure1"
        ).value = u),
          (document.querySelector(
            "#r-flight #flightSearch .departure-route .locationId"
          ).value = c),
          (document.querySelector(
            "#r-flight #flightSearch .destination-route #destination1"
          ).value = p),
          (document.querySelector(
            "#r-flight #flightSearch .destination-route .locationId"
          ).value = d),
          f.includes("اکونومی") &&
            ((document.querySelector(
              "#r-flight .FlightClass-text"
            ).innerText = "اکونومی"),
            (document.querySelector("#r-flight #FlightClass1").value =
              "Economy")),
          f.includes("بیزینس") &&
            ((document.querySelector(
              "#r-flight .FlightClass-text"
            ).innerText = "بیزینس"),
            (document.querySelector("#r-flight #FlightClass1").value =
              "BusinessClass")),
          f.includes("فرست") &&
            ((document.querySelector(
              "#r-flight .FlightClass-text"
            ).innerText = "فرست"),
            (document.querySelector("#r-flight #FlightClass1").value =
              "FirstClass")),
          document
            .querySelector("#r-flight")
            .classList.remove("hidden");
        let h = document.querySelector(".bg-blur-t");
        h && window.scrollTo({ top: h.offsetTop, behavior: "smooth" });
      }
    };
  } catch (error) {
    // console.error('مشکلی رخ داده است لطفا صبور باشید.', error);
  }
});

function uploadDocumentFooter(args) {
  document.querySelector("#footer-form-resize .Loading_Form").style.display =
    "block";
  const captcha = document
    .querySelector("#footer-form-resize")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#footer-form-resize")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.uploadFooter", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}

function refreshCaptchaFooter(e) {
  $bc.setSource("captcha.refreshFooter", true);
}

async function OnProcessedEditObjectFooter(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector("#footer-form-resize .Loading_Form").style.display =
      "none";
    document.querySelector("#footer-form-resize .message-api").innerHTML =
      "درخواست شما با موفقیت ثبت شد.";
  } else {
    refreshCaptchaFooter();
    setTimeout(() => {
      document.querySelector(
        "#footer-form-resize .Loading_Form"
      ).style.display = "none";
      document.querySelector("#footer-form-resize .message-api").innerHTML =
        "خطایی رخ داده, لطفا مجدد اقدام کنید.";
    }, 2000);
  }
}

async function RenderFormFooter() {
  var inputElementVisa7 = document.querySelector(
    " .email-footer-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "ایمیل");
}

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
if (document.querySelector(".footer-swiper")) {
  var footerSwiper = new Swiper(".footer-swiper", {
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
