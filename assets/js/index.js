// ^ Write your JavaScript code here
// scroll active navbar
var sec = document.querySelectorAll("section");
var nlink = document.querySelectorAll("#header .nav-links a");
window.addEventListener("scroll", function () {
  for (var i = 0; i < sec.length; i++) {
    if (
      window.scrollY >= sec[i].offsetTop - 95 &&
      window.scrollY < sec[i].offsetTop + sec[i].offsetHeight - 95
    ) {
      for (var j = 0; j < nlink.length; j++) {
        nlink[j].classList.remove("active");
      }
      var activeLink = document.querySelector(
        `#header .nav-links a[href="#${sec[i].id}"]`,
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  }
});
/*--------------------------------------------------*/
/*-- scroll to top --*/
var heroSection = document.querySelector("#hero-section");
var scrollToTopBtn = document.querySelector("#scroll-to-top");
window.addEventListener("scroll", function () {
  if (window.scrollY > heroSection.offsetHeight) {
    scrollToTopBtn.classList.remove("opacity-0", "invisible");
  } else {
    scrollToTopBtn.classList.add("opacity-0", "invisible");
  }
});
scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0 });
});
/*--------------------------------------------------*/
/*-- dark & light mode --*/
var html = document.querySelector("html");
var toggleButton = document.querySelector("#theme-toggle-button");
var savedTheme = localStorage.getItem("mode");
if (savedTheme) {
  html.classList.toggle("dark", savedTheme === "dark");
}
toggleButton.addEventListener("click", function () {
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    html.classList.add("light");
    localStorage.setItem("mode", "light");
  } else {
    html.classList.remove("light");
    html.classList.add("dark");
    localStorage.setItem("mode", "dark");
  }
});
/*--------------------------------------------------*/
/*-- portfolio tabs --*/
var pfilter = document.querySelectorAll(".portfolio-filter");
var items = document.querySelectorAll(".portfolio-item");
for (var i = 0; i < pfilter.length; i++) {
  pfilter[i].addEventListener("click", function () {
    var filter = this.getAttribute("data-filter");
    for (var j = 0; j < pfilter.length; j++) {
      pfilter[j].classList.remove(
        "active",
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
        "hover:shadow-lg",
        "hover:shadow-primary/50",
      );
      pfilter[j].classList.add(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300",
        "hover:bg-slate-100",
        "dark:hover:bg-slate-700",
        "border",
        "border-slate-300",
        "dark:border-slate-700",
      );
    }
    this.classList.add(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
      "hover:shadow-lg",
      "hover:shadow-primary/50",
    );
    this.classList.remove(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "hover:bg-slate-100",
      "dark:hover:bg-slate-700",
      "border",
      "border-slate-300",
      "dark:border-slate-700",
    );
    for (var k = 0; k < items.length; k++) {
      items[k].style.opacity = "0";
      items[k].style.transform = "scale(.8)";
    }
    setTimeout(function () {
      for (var k = 0; k < items.length; k++) {
        if (
          filter == "all" ||
          filter == items[k].getAttribute("data-category")
        ) {
          items[k].classList.remove("hidden");
          items[k].classList.add("block");
        } else {
          items[k].classList.remove("block");
          items[k].classList.add("hidden");
        }
      }
      setTimeout(function () {
        for (var k = 0; k < items.length; k++) {
          if (
            filter == "all" ||
            filter == items[k].getAttribute("data-category")
          ) {
            items[k].style.opacity = "1";
            items[k].style.transform = "scale(1)";
          }
        }
      }, 50);
    }, 300);
  });
}
/*--------------------------------------------------*/
/*-- testimonials carousel --*/
var testCarousel = document.querySelector("#testimonials-carousel");
var Cards = document.querySelectorAll(".testimonial-card");
var indicators = document.querySelectorAll(".carousel-indicator");
var testNext = document.querySelector("#next-testimonial");
var testPrev = document.querySelector("#prev-testimonial");
var place = 0;
function previewCards() {
  if (window.innerWidth >= 1024) {
    return 3;
  } else if (window.innerWidth >= 640) {
    return 2;
  } else {
    return 1;
  }
}
function moveLR() {
  var cardsP = previewCards();
  var max = Cards.length - cardsP;
  if (place > max) {
    place = max;
  }
  if (place < 0) {
    place = 0;
  }
  var move = place * (100 / cardsP);
  testCarousel.style.transform = "translateX(" + move + "%)";
  for (var i = 0; i < indicators.length; i++) {
    indicators[i].classList.remove("active", "bg-accent", "scale-125");
    indicators[i].classList.add("bg-slate-400", "dark:bg-slate-600");
  }
  if (indicators[place]) {
    indicators[place].classList.add("active", "bg-accent", "scale-125");
    indicators[place].classList.remove("bg-slate-400", "dark:bg-slate-600");
  }
}
testNext.addEventListener("click", function () {
  var max = Cards.length - previewCards();
  if (place < max) {
    place++;
  } else {
    place = 0;
  }
  moveLR();
});
testPrev.addEventListener("click", function () {
  var max = Cards.length - previewCards();
  if (place > 0) {
    place--;
  } else {
    place = max;
  }
  moveLR();
});
for (let i = 0; i < indicators.length; i++) {
  indicators[i].addEventListener("click", function () {
    place = i;
    moveLR();
  });
}
window.addEventListener("resize", function () {
  moveLR();
});
moveLR();
/*--------------------------------------------------*/
/*-- settings sidebar colors & fonts --*/
var settingsToggle = document.querySelector("#settings-toggle");
var settingsSidebar = document.querySelector("#settings-sidebar");
var closeSettings = document.querySelector("#close-settings");
var fontOption = document.querySelectorAll(".font-option");
var themeGrid = document.querySelector("#theme-colors-grid");
var colors = [
  { primary: "#6366f1", secondary: "#8b5cf6", accent: "#a855f7" },
  { primary: "#ec4899", secondary: "#f97316", accent: "#fb923c" },
  { primary: "#10b981", secondary: "#059669", accent: "#34d399" },
  { primary: "#3b82f6", secondary: "#06b6d4", accent: "#22d3ee" },
  { primary: "#ef4444", secondary: "#f43f5e", accent: "#fb7185" },
  { primary: "#f59e0b", secondary: "#ea580c", accent: "#fbbf24" },
  { primary: "#0b51f5", secondary: "#0c1bea", accent: "#244ffb" },
  { primary: "#f50b9b", secondary: "#ea0cd4", accent: "#fb24b0" },
];
var resetBtn = document.querySelector("#reset-settings");
/*-------------------- Fonts --------------------*/
function activeFont(font) {
  for (var i = 0; i < fontOption.length; i++) {
    fontOption[i].classList.remove(
      "active",
      "border-primary",
      "bg-slate-50",
      "dark:bg-slate-800",
    );
    fontOption[i].classList.add("border-slate-200", "dark:border-slate-700");
    if (fontOption[i].getAttribute("data-font") == font) {
      fontOption[i].classList.add(
        "active",
        "border-primary",
        "bg-slate-50",
        "dark:bg-slate-800",
      );
      fontOption[i].classList.remove(
        "border-slate-200",
        "dark:border-slate-700",
      );
    }
  }
}
var savedFont = localStorage.getItem("font");
if (savedFont) {
  document.body.classList.remove(
    "font-tajawal",
    "font-cairo",
    "font-alexandria",
  );
  document.body.classList.add("font-" + savedFont);
  activeFont(savedFont);
} else {
  activeFont("tajawal");
}
for (var i = 0; i < fontOption.length; i++) {
  fontOption[i].addEventListener("click", function () {
    var font = this.getAttribute("data-font");
    activeFont(font);
    document.body.classList.remove(
      "font-tajawal",
      "font-cairo",
      "font-alexandria",
    );
    document.body.classList.add("font-" + font);
    localStorage.setItem("font", font);
  });
}
/*-------------------- Theme Colors --------------------*/
function changeTheme(primary, secondary, accent) {
  document.documentElement.style.setProperty("--color-primary", primary);
  document.documentElement.style.setProperty("--color-secondary", secondary);
  document.documentElement.style.setProperty("--color-accent", accent);
}
/*-- make buttons color --*/
for (var i = 0; i < colors.length; i++) {
  var btn = document.createElement("button");
  btn.className =
    "w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm";
  btn.style.background =
    "linear-gradient(135deg," +
    colors[i].primary +
    "," +
    colors[i].secondary +
    ")";
  btn.setAttribute("data-index", i);
  themeGrid.appendChild(btn);
}
var colorBtns = themeGrid.querySelectorAll("button");
function activeColor(index) {
  for (var i = 0; i < colorBtns.length; i++) {
    colorBtns[i].classList.remove(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900",
    );
  }
  colorBtns[index].classList.add(
    "ring-2",
    "ring-primary",
    "ring-offset-2",
    "ring-offset-white",
    "dark:ring-offset-slate-900",
  );
}
/*-- click color --*/
for (var i = 0; i < colorBtns.length; i++) {
  colorBtns[i].addEventListener("click", function () {
    var index = this.getAttribute("data-index");
    changeTheme(
      colors[index].primary,
      colors[index].secondary,
      colors[index].accent,
    );
    activeColor(index);
    localStorage.setItem("theme", JSON.stringify(colors[index]));
  });
}
/*-- load color --*/
var savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  var theme = JSON.parse(savedTheme);
  changeTheme(theme.primary, theme.secondary, theme.accent);
  for (var i = 0; i < colors.length; i++) {
    if (
      colors[i].primary == theme.primary &&
      colors[i].secondary == theme.secondary
    ) {
      activeColor(i);
    }
  }
} else {
  activeColor(0);
}
/*-------------------- Sidebar --------------------*/
function moveButton() {
  if (window.innerWidth <= 640) {
    settingsToggle.style.right = "240px";
  } else {
    settingsToggle.style.right = "320px";
  }
}
settingsToggle.addEventListener("click", function () {
  settingsSidebar.classList.remove("translate-x-full");
  moveButton();
});
closeSettings.addEventListener("click", function () {
  settingsSidebar.classList.add("translate-x-full");
  settingsToggle.style.right = "0";
});
document.addEventListener("click", function (e) {
  if (
    !settingsToggle.contains(e.target) &&
    !settingsSidebar.contains(e.target)
  ) {
    settingsSidebar.classList.add("translate-x-full");
    settingsToggle.style.right = "0";
  }
});
window.addEventListener("resize", function () {
  if (!settingsSidebar.classList.contains("translate-x-full")) {
    moveButton();
  }
});
/*-------------------- Reset --------------------*/
resetBtn.addEventListener("click", function () {
  localStorage.removeItem("font");
  localStorage.removeItem("theme");
  document.body.classList.remove(
    "font-cairo",
    "font-alexandria",
    "font-tajawal",
  );
  document.body.classList.add("font-tajawal");
  activeFont("tajawal");
  changeTheme(colors[0].primary, colors[0].secondary, colors[0].accent);
  activeColor(0);
  settingsSidebar.classList.add("translate-x-full");
  settingsToggle.style.right = "0";
});
