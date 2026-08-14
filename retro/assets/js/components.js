/* ============================================================
   Shared components — injects loader, header, footer, FAB,
   chatbot & back-to-top across every page.
   ============================================================ */
(function () {
  "use strict";

  var SITE = {
  name: "St. Francis School, Sadabad",
  short: "SFS",
  tagline: "Knowledge • Discipline • Service",
  phone: "+91 9119772205",
  altPhone: "+91 9119772205",
  email: "sfssadabad@gmail.com",
  admissionsEmail: "sfssadabad@gmail.com",
  address: "Sadabad,Uttar Pradesh, India",
  hours: "Mon – Sat : 8:00 AM – 4:00 PM",
  affiliation: "CBSE Affiliated School",
  schoolCode: "SFSSBD",
  whatsapp: "9119772205"
};

  function currentPage() {
    var p = location.pathname.split("/").pop() || "index.html";
    return p;
  }
  var PAGE = currentPage();

  function isActive(href) {
    return href === PAGE;
  }

var LOGO = '<img src="assets/img/logo.png" alt="St. Francis School Logo" class="school-logo">';

  function navItem(href, label, cls) {
    var active = isActive(href) ? " active" : "";
    return '<li class="nav-item"><a class="nav-link' + (cls ? " " + cls : "") + active + '" href="' + href + '">' + label + "</a></li>";
  }

  function headerHTML() {
    return [
      '<div class="topbar">',
      '<div class="container d-flex flex-wrap align-items-center justify-content-between gap-2">',
      '<div class="topbar-left d-flex align-items-center gap-2">',
      '<span class="topbar-crest">' + LOGO + "</span>",
      '<span class="topbar-title"><b>' + SITE.name + '</b><small>CBSE Affiliated · Est. 2018 · ' + SITE.schoolCode + "</small></span>",
      "</div>",
      '<div class="topbar-right d-flex align-items-center gap-3 flex-wrap">',
      '<a href="tel:+919119772205"><i class="fa-solid fa-phone me-1"></i>' + SITE.phone + "</a>",
      '<a href="mailto:info@sxis.edu.in"><i class="fa-solid fa-envelope me-1"></i>' + SITE.email + "</a>",
      '<span class="d-none d-md-inline"><i class="fa-solid fa-clock me-1"></i>' + SITE.hours + "</span>",
      '<div class="socials">',
      '<a href="https://www.facebook.com/sfssadabad?mibextid=ZbWKwL" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>',
      '<a href="https://www.instagram.com/sfssadabad" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>',
      '<a href="https://www.youtube.com/@st.francisschoolsadabad2650" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>',
      '<a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>',
      "</div>",
      "</div></div></div>",

      '<div class="gold-seam"></div>',

      '<nav class="navbar navbar-expand-lg navbar-main" id="mainNav">',
      '<div class="container">',
      '<a class="navbar-brand" href="index.html">',
      '<span class="brand-logo">' + LOGO + "</span>",
      '<span class="brand-text"><b>St. Francis School, Sadabad</b>',
      "</a>",

      '<div class="nav-actions d-lg-none">',
      '<button class="icon-btn" data-theme-toggle aria-label="Toggle dark mode"><i class="fa-solid fa-moon"></i></button>',
      '<button class="navbar-toggler icon-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileNav" aria-label="Open menu"><i class="fa-solid fa-bars"></i></button>',
      "</div>",

      '<div class="navbar-collapse justify-content-center">',
      '<ul class="navbar-nav gap-lg-1">',
      navItem("index.html", "Home"),
      '<li class="nav-item dropdown">',
      '<a class="nav-link dropdown-toggle' + (["about.html", "patron-saint.html", "management.html"].indexOf(PAGE) > -1 ? " active" : "") + '" href="about.html" role="button" data-bs-toggle="dropdown">About Us</a>',
      '<ul class="dropdown-menu">',
      '<li><a class="dropdown-item" href="about.html">About School</a></li>',
      // '<li><a class="dropdown-item" href="principal-message.html">Principal&rsquo;s Message</a></li>',
      // '<li><a class="dropdown-item" href="headmistress-message.html">Manager&rsquo;s Message</a></li>',
      // '<li><a class="dropdown-item" href="management.html">Management &amp; Office Bearers</a></li>',
      '<li><a class="dropdown-item" href="patron-saint.html">Mission and Vision</a></li>',
      "</ul></li>",
      // navItem("academics.html", "Academics"),
'<li class="nav-item dropdown">',
      '<a class="nav-link dropdown-toggle' + (["admissions.html", "academics.html"].indexOf(PAGE) > -1 ? " active" : "") + '" href="admissions.html" role="button" data-bs-toggle="dropdown">Administration</a>',
      '<ul class="dropdown-menu">',
      '<li><a class="dropdown-item" href="admission-rules.html">Admissions &amp; Withdrawals</a></li>',
      '<li><a class="dropdown-item" href="school-timings.html">School Timings</a></li>',
      '<li><a class="dropdown-item" href="rules-discipline.html">Rules &amp; Discipline</a></li>',
      '<li><a class="dropdown-item" href="fee-structure.html">Fee Structure</a></li>',
      '<li><a class="dropdown-item" href="curriculum.html">Curriculum</a></li>',
      "</ul></li>",
'<li class="nav-item dropdown">',
'<a class="nav-link dropdown-toggle' + (["principal-message.html", "headmistress-message.html"].indexOf(PAGE) > -1 ? " active" : "") + '" href="principal-message.html" role="button" data-bs-toggle="dropdown">Messages</a>',
'<ul class="dropdown-menu">',
'<li><a class="dropdown-item" href="principal-message.html">Principal&rsquo;s Message</a></li>',
'<li><a class="dropdown-item" href="headmistress-message.html">Manager&rsquo;s Message</a></li>',
"</ul></li>",
      navItem("gallery.html", "Gallery"),
      navItem("contact.html", "Contact"),
      "</ul>",
      "</div>",

      '<div class="nav-actions d-none d-lg-flex">',
      '<button class="icon-btn" data-theme-toggle aria-label="Toggle dark mode"><i class="fa-solid fa-moon"></i></button>',
      '<div class="dropdown">',
      '<button class="portal-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-user-lock"></i> Portals</button>',
      '<ul class="dropdown-menu dropdown-menu-end">',
      '<li><a class="dropdown-item" href="#"><i class="fa-solid fa-graduation-cap me-2 text-primary"></i>Student Portal</a></li>',
      '<li><a class="dropdown-item" href="#"><i class="fa-solid fa-users me-2 text-success"></i>Parent Portal</a></li>',
      '<li><a class="dropdown-item" href="#"><i class="fa-solid fa-chalkboard-user me-2 text-warning"></i>Teacher Portal</a></li>',
      '<li><hr class="dropdown-divider"></li>',
      '<li><a class="dropdown-item" href="#"><i class="fa-solid fa-wallet me-2 text-danger"></i>Fee Payment</a></li>',
      "</ul></div>",
      '<a class="nav-cta" href="admissions.html">Admission</a>',
      "</div>",
      "</div>",
      "</nav>",

      /* Mobile offcanvas nav */
      '<div class="offcanvas offcanvas-end" tabindex="-1" id="mobileNav">',
      '<div class="offcanvas-header">',
      '<span class="brand-text"><b>St. Francis</b><small> School</small></span>',
      '<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>',
      "</div>",
      '<div class="offcanvas-body">',
      '<ul class="navbar-nav">',
      navItem("index.html", "Home"),
      '<li class="nav-item"><a class="nav-link" data-bs-toggle="collapse" href="#mAbout">About Us <i class="fa-solid fa-chevron-down float-end mt-1"></i></a>',
      '<div class="collapse mobile-sub" id="mAbout">',
      '<a class="dropdown-item" href="about.html">About School</a>',
      // '<a class="dropdown-item" href="principal-message.html">Principal&rsquo;s Message</a>',
      // '<a class="dropdown-item" href="headmistress-message.html">Manager&rsquo;s Message</a>',
      // '<a class="dropdown-item" href="management.html">Management &amp; Office Bearers</a>',
      '<a class="dropdown-item" href="patron-saint.html">Mission and Vision</a>',
      "</div></li>",
      // navItem("academics.html", "Academics"),
'<li class="nav-item"><a class="nav-link" data-bs-toggle="collapse" href="#mAdmin">Administration <i class="fa-solid fa-chevron-down float-end mt-1"></i></a>',
      '<div class="collapse mobile-sub" id="mAdmin">',
      '<a class="dropdown-item" href="admission-rules.html">Admissions &amp; Withdrawals</a>',
      '<a class="dropdown-item" href="school-timings.html">School Timings</a>',
      '<a class="dropdown-item" href="rules-discipline.html">Rules &amp; Discipline</a>',
      '<a class="dropdown-item" href="fee-structure.html">Fee Structure</a>',
      '<a class="dropdown-item" href="curriculum.html">Curriculum</a>',
      "</div></li>",
'<li class="nav-item"><a class="nav-link" data-bs-toggle="collapse" href="#mMessages">Messages <i class="fa-solid fa-chevron-down float-end mt-1"></i></a>',
'<div class="collapse mobile-sub" id="mMessages">',
'<a class="dropdown-item" href="principal-message.html">Principal&rsquo;s Message</a>',
'<a class="dropdown-item" href="headmistress-message.html">Manager&rsquo;s Message</a>',
"</div></li>",
      // navItem("achievements.html", "Achievements"),
      // navItem("notice-board.html", "Notice Board"),
      // navItem("events.html", "Events"),
      navItem("gallery.html", "Gallery"),
      // navItem("virtual-tour.html", "Virtual Tour"),
      navItem("contact.html", "Contact Us"),
      "</ul>",
      '<hr>',
      '<a class="btn btn-premium w-100" href="admissions.html"><i class="fa-solid fa-pen-to-square"></i> Apply for Admission</a>',
      '<div class="d-grid gap-2 mt-3">',
      '<button class="portal-btn w-100 justify-content-center"><i class="fa-solid fa-user-lock"></i> Student / Parent Portal</button>',
      '<button class="portal-btn w-100 justify-content-center"><i class="fa-solid fa-wallet"></i> Online Fee Payment</button>',
      "</div>",
      '<div class="mt-4"><small class="text-muted">Call us: <a href="tel:+919876543210">' + SITE.phone + "</a></small></div>",
      "</div></div></div>"
    ].join("");
  }

  function footerHTML() {
    return [
      '<footer class="footer">',
      '<div class="container position-relative">',
      '<div class="footer-seal">',
      '<span class="brand-logo">' + LOGO + "</span>",
      '<p class="footer-motto">Truth · Service · Excellence &mdash; Since 2008</p>',
      '<div class="footer-seal-rule"></div>',
      "</div>",
      '<div class="row g-5">',

      '<div class="col-lg-4 col-md-6">',
      '<div class="d-flex align-items-center gap-3 mb-4">',
      '<span class="brand-logo" style="width:60px;height:60px;flex:0 0 60px;filter:drop-shadow(0 4px 10px rgba(0,0,0,.3))">' + LOGO + "</span>",
      '<span class="brand-text"><b style="color:#fff">St. Francis School, Sadabad</b></span>',
      "</div>",
      "<p style='color:rgba(255,255,255,.7)'>An institution committed to academic excellence, character building and holistic development. Empowering every child to become a global citizen with strong values.</p>",
      '<div class="footer-social mt-4">',
      '<a href="https://www.facebook.com/sfssadabad?mibextid=ZbWKwL" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>',
      '<a href="https://www.instagram.com/sfssadabad" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>',
      '<a href="https://www.youtube.com/@st.francisschoolsadabad2650" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>',
      // '<a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>',
      // '<a href="#" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>',
      "</div>",
      '<div class="newsletter mt-4">',
      '<label class="text-white mb-2 fw-semibold">Subscribe to our newsletter</label>',
      '<div class="input-group">',
      '<input type="email" class="form-control" placeholder="Your email address">',
      '<button class="btn btn-premium px-3" type="button" aria-label="Subscribe"><i class="fa-solid fa-paper-plane"></i></button>',
      "</div></div></div>",

      '<div class="col-lg-2 col-md-6 col-6">',
      "<h5>Quick Links</h5>",
      '<ul class="footer-links">',
      "<li><a href='about.html'>About Us</a></li>",
      "<li><a href='principal-message.html'>Principal Message</a></li>",
      "<li><a href='headmistress-message.html'>Manager Message</a></li>",
      "<li><a href='contact.html'>Contact Us</a></li>",
      "<li><a href='gallery.html'>Gallery</a></li>",
      // "<li><a href='virtual-tour.html'>Virtual Tour</a></li>",
      "</ul></div>",

      '<div class="col-lg-2 col-md-6 col-6">',
      "<h5>Administration</h5>",
      '<ul class="footer-links">',
      "<li><a href='admission-rules.html'>Admissions & Withdrawals</a></li>",
      "<li><a href='school-timings.html'>School Timings</a></li>",
      "<li><a href='rules-discipline.html'>Rules & Discipline</a></li>",
      "<li><a href='fee-structure.html'>Fee Structure</a></li>",
      "<li><a href='curriculum.html'>Curriculum</a></li>",
      // "<li><a href='gallery.html'>Gallery</a></li>",
      "</ul>",
      // "<h5 class='mt-4'>Admissions</h5>",
      // '<ul class="footer-links">',
      // "<li><a href='admissions.html'>Admission Process</a></li>",
      // "<li><a href='admissions.html'>Fee Structure</a></li>",
      // "<li><a href='admissions.html'>Download Prospectus</a></li>",
      "</ul></div>",

      '<div class="col-lg-4 col-md-6">',
      "<h5>Contact Details</h5>",
      '<ul class="footer-contact">',
      "<li><i class='fa-solid fa-location-dot'></i><span>" + SITE.address + "</span></li>",
      "<li><i class='fa-solid fa-phone'></i><span>" + SITE.phone + " / " + SITE.altPhone + "</span></li>",
      "<li><i class='fa-solid fa-envelope'></i><span>" + SITE.email + "</span></li>",
      "<li><i class='fa-solid fa-clock'></i><span>" + SITE.hours + "</span></li>",
      "<li><i class='fa-solid fa-building-columns'></i><span>" + SITE.affiliation + "</span></li>",
      "</ul>",
      '<div class="footer-map mt-3">',
'<iframe',
' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.799601050819!2d78.04398419999998!3d27.47549760000009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397486ea913a99af%3A0x1550f67437862667!2sSt.%20Francis%20School%2C%20Sadabad!5e0!3m2!1sen!2sin!4v1786392942476!5m2!1sen!2sin"',
' width="100%"',
' height="250"',
' style="border:0;border-radius:16px;"',
' allowfullscreen',
' loading="lazy"',
' referrerpolicy="strict-origin-when-cross-origin">',
'</iframe>',      "</div></div>",
      "</div>",

      '<div class="footer-bottom d-flex flex-wrap justify-content-between gap-2">',
      "<span>&copy; 2026 St. Francis School. All Rights Reserved.</span>",
      '<span><a href="#" class="text-white-50">Privacy Policy</a> · <a href="#" class="text-white-50">Terms of Use</a> · <a href="sitemap.html" class="text-white-50">Sitemap</a></span>',
      "</div>",
      "</div></footer>"
    ].join("");
  }

  function chromeHTML() {
    return [
      /* Preloader */
      '<div id="loader">',
      '<span class="loader-logo" style="filter:drop-shadow(0 8px 24px rgba(233,184,76,.4))">' + LOGO + "</span>",
      '<div class="loader-bar"></div>',
      '<div class="loader-text">Loading…</div>',
      "</div>",

      /* Scroll progress bar */
      '<div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>',

      /* Back to top */
      '<button class="back-top" id="backTop" aria-label="Back to top"><i class="fa-solid fa-arrow-up"></i></button>',

      /* Floating quick actions */
      '<div class="fab">',
      '<div class="quick-menu" id="quickMenu">',
      "<a href='admissions.html'><i class='fa-solid fa-pen-to-square'></i>Apply Online</a>",
      "<a href='#'><i class='fa-solid fa-wallet'></i>Pay Fees</a>",
      "<a href='contact.html'><i class='fa-solid fa-phone'></i>Call Us</a>",
      "<a href='virtual-tour.html'><i class='fa-solid fa-360-degrees'></i>Virtual Tour</a>",
      "<a href='notice-board.html'><i class='fa-solid fa-bullhorn'></i>Notice Board</a>",
      "<a href='gallery.html'><i class='fa-solid fa-images'></i>Gallery</a>",
      "</div>",
      // '<button class="fab-btn fab-chat" id="fabChat" aria-label="Open chatbot" style="background:var(--grad-gold);color:var(--navy)"><i class="fa-solid fa-comment-dots"></i></button>',
      // '<button class="fab-btn fab-whatsapp" id="fabWhatsapp" aria-label="Chat on WhatsApp"><i class="fa-brands fa-whatsapp"></i></button>',
      // '<button class="fab-btn fab-menu" id="fabMenu" aria-label="Quick actions"><i class="fa-solid fa-plus"></i></button>',
      "</div>",

      /* Chatbot */
      // '<div class="chatbot" id="chatbot">',
      // '<div class="chat-window" role="dialog" aria-label="Admissions assistant">',
      // '<div class="chat-head">',
      // '<div class="bot-avatar"><i class="fa-solid fa-robot"></i></div>',
      // '<div><b>St. Francis Assistant</b><small><span class="status-dot"></span>Online · Replies instantly</small></div>',
      // '<button class="btn btn-circle ms-auto" style="background:rgba(255,255,255,.12);border:none;color:#fff" id="chatClose" aria-label="Close chat"><i class="fa-solid fa-xmark"></i></button>',
      // "</div>",
      // '<div class="chat-body" id="chatBody"></div>',
      // '<div class="chat-quick" id="chatQuick">',
      // "<button data-q='admissions'>Admissions</button>",
      // "<button data-q='fees'>Fee Structure</button>",
      // "<button data-q='timings'>School Timings</button>",
      // "<button data-q='facilities'>Facilities</button>",
      // "<button data-q='contact'>Contact Info</button>",
      // "</div>",
      // '<div class="chat-input">',
      // '<input type="text" id="chatInput" placeholder="Type your question…" aria-label="Type your question">',
      // '<button id="chatSend" aria-label="Send"><i class="fa-solid fa-paper-plane"></i></button>',
      // "</div></div>",
      // "</div>"
    ].join("");
  }

  function mount(selector, html) {
    document.querySelectorAll(selector).forEach(function (el) { el.innerHTML = html; });
  }

  window.SXIS = { SITE: SITE, PAGE: PAGE, isActive: isActive };

  document.addEventListener("DOMContentLoaded", function () {
    document.body.insertAdjacentHTML("afterbegin", chromeHTML());
    mount("header[data-component]", headerHTML());
    mount("footer[data-component]", footerHTML());
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    document.querySelectorAll("[data-theme-toggle] i").forEach(function (i) {
      i.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    });
    document.dispatchEvent(new CustomEvent("components:mounted"));
  });
})();
