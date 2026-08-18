/* ============================================================
   Main interactions — loader, reveal, counters, dark mode,
   chatbot, lightbox, ticker, countdown, filters & utilities.
   ============================================================ */
(function () {
  "use strict";

  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  function onReady(fn) {
    if (document.readyState !== "loading") { fn(); } else { document.addEventListener("DOMContentLoaded", fn); }
  }

  /* ---------- Preloader ---------- */
  onReady(function () {
    var loader = document.getElementById("loader");
    if (loader) {
      window.addEventListener("load", function () {
        setTimeout(function () { loader.classList.add("hidden"); }, 500);
      });
      setTimeout(function () { loader.classList.add("hidden"); }, 2800);
    }
  });

  /* ---------- Navbar shrink on scroll ---------- */
  onReady(function () {
    var nav = document.getElementById("mainNav");
    window.addEventListener("scroll", function () {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
    }, { passive: true });
  });

  /* ---------- Back to top + FAB ---------- */
  onReady(function () {
    var backTop = document.getElementById("backTop");
    var fabMenu = document.getElementById("fabMenu");
    var quickMenu = document.getElementById("quickMenu");

    window.addEventListener("scroll", function () {
      if (backTop) backTop.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });

    if (backTop) backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    if (fabMenu && quickMenu) {
      fabMenu.addEventListener("click", function () {
        var open = quickMenu.classList.toggle("show");
        fabMenu.classList.toggle("active", open);
      });
      document.addEventListener("click", function (e) {
        if (!fabMenu.contains(e.target) && !quickMenu.contains(e.target)) {
          quickMenu.classList.remove("show");
          fabMenu.classList.remove("active");
        }
      });
    }

    var wa = document.getElementById("fabWhatsapp");
    if (wa && window.SXIS && window.SXIS.SITE) {
      wa.addEventListener("click", function () {
        var msg = encodeURIComponent("Hello! I would like to know more about admissions at St. Francis Secondary School.");
        window.open("https://wa.me/" + window.SXIS.SITE.whatsapp + "?text=" + msg, "_blank");
      });
    }

    var fabChat = document.getElementById("fabChat");
    if (fabChat) {
      fabChat.addEventListener("click", function () {
        var bot = document.getElementById("chatbot");
        if (bot) bot.classList.toggle("open");
      });
    }
  });

  /* ---------- Scroll reveal ---------- */
  onReady(function () {
    var els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  });

  /* ---------- Animated counters ---------- */
  onReady(function () {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;
    var animate = function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var decimals = el.getAttribute("data-decimals") ? parseInt(el.getAttribute("data-decimals"), 10) : 0;
      var dur = 1800, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = (target * eased).toFixed(decimals);
        el.textContent = (decimals ? val : Math.floor(target * eased)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animate(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io.observe(c); });
  });

  /* ---------- Scroll progress bar ---------- */
  onReady(function () {
    var bar = document.getElementById("scrollProgress");
    if (!bar) return;
    var onScroll = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  });

  /* ---------- Button ripple ---------- */
  onReady(function () {
    document.querySelectorAll(".btn-premium, .btn-navy, .btn-outline-premium, .btn-ghost").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        var r = document.createElement("span");
        var rect = btn.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height);
        r.className = "ripple";
        r.style.width = r.style.height = size + "px";
        r.style.left = (e.clientX - rect.left - size / 2) + "px";
        r.style.top = (e.clientY - rect.top - size / 2) + "px";
        btn.appendChild(r);
        setTimeout(function () { r.remove(); }, 650);
      });
    });
  });

  /* ---------- Rotating words (typewriter-style) ---------- */
  onReady(function () {
    document.querySelectorAll(".rotator").forEach(function (rot) {
      var words = (rot.getAttribute("data-words") || "").split("|").filter(Boolean);
      if (words.length < 2) return;
      var i = 0;
      rot.innerHTML = '<span class="word active">' + words[0] + '</span><span class="type-caret"></span>';
      setInterval(function () {
        i = (i + 1) % words.length;
        var active = rot.querySelector(".word.active");
        var next = document.createElement("span");
        next.className = "word active";
        next.textContent = words[i];
        if (active) active.classList.remove("active");
        rot.insertBefore(next, rot.querySelector(".type-caret"));
        setTimeout(function () { if (active) active.remove(); }, 700);
      }, 2400);
    });
  });

  /* ---------- Hero parallax on scroll ---------- */
  onReady(function () {
    var hero = document.querySelector(".hero");
    if (!hero) return;
    var bg = hero.querySelector(".hero-bg");
    if (!bg) return;
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var y = window.scrollY;
          if (y < window.innerHeight) {
            bg.style.transform = "translateY(" + y * 0.18 + "px) scale(1.08)";
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  });

  /* ---------- Auto-stagger reveal groups ---------- */
  onReady(function () {
    document.querySelectorAll("[data-stagger]").forEach(function (group) {
      var items = group.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom");
      items.forEach(function (el, idx) {
        el.classList.add("delay-" + Math.min((idx % 6) + 1, 4));
      });
    });
  });

  /* ---------- Notice ticker duplication ---------- */
  onReady(function () {
    var track = document.querySelector(".ticker-track");
    if (track) track.innerHTML += track.innerHTML;
  });

  /* ---------- Event countdown ---------- */
  onReady(function () {
    var cd = document.getElementById("eventCountdown");
    if (!cd) return;
    var target = new Date(cd.getAttribute("data-date")).getTime();
    var d = document.getElementById("cdDays");
    var h = document.getElementById("cdHours");
    var m = document.getElementById("cdMins");
    var s = document.getElementById("cdSecs");
    var tick = function () {
      var diff = target - Date.now();
      if (diff <= 0) { d.textContent = "0"; h.textContent = "0"; m.textContent = "0"; s.textContent = "0"; return; }
      d.textContent = String(Math.floor(diff / 86400000)).padStart(2, "0");
      h.textContent = String(Math.floor(diff / 3600000) % 24).padStart(2, "0");
      m.textContent = String(Math.floor(diff / 60000) % 60).padStart(2, "0");
      s.textContent = String(Math.floor(diff / 1000) % 60).padStart(2, "0");
    };
    tick();
    setInterval(tick, 1000);
  });

  /* ---------- Chatbot ---------- */
  onReady(function () {
    var bot = document.getElementById("chatbot");
    if (!bot) return;
    var body = document.getElementById("chatBody");
    var input = document.getElementById("chatInput");
    var openBtn = document.getElementById("chatClose");

    function addMsg(text, who) {
      var d = document.createElement("div");
      d.className = "msg " + who;
      d.textContent = text;
      body.appendChild(d);
      body.scrollTop = body.scrollHeight;
    }
    function botSay(text) {
      setTimeout(function () { addMsg(text, "bot"); }, 500);
    }

    var intents = {
      admission: function (q) {
        if (q.match(/fee|cost|charge|amount/)) return intents.fees();
        if (q.match(/docum|paper|form/)) return "You will need: birth certificate, previous school report card, transfer certificate, passport-size photos, and Aadhaar of parent & child. Find the full list on the Admissions page.";
        if (q.match(/age|eligib|class|nursery|ukg|grade/)) return "Eligibility: Nursery from 3+ years, KG from 4+, and age-based for higher grades. Each class has seat availability. See the Admissions page for the class-wise chart.";
        if (q.match(/process|step|apply|registration/)) return "The admission process: 1) Fill the online registration form, 2) Submit documents, 3) Interactive assessment/interview, 4) Fee payment & confirmation. Tap 'Apply Online' to start today!";
        if (q.match(/open|start|date|closing|last/)) return "Admissions for the 2026–27 session are now OPEN. Registration closes on 31 March 2026. Seats are limited — apply early!";
        return "Admissions for 2026–27 are open! Please fill the online registration form or visit the school office. Can I help with eligibility, fees or the process?";
      },
      fees: function () { return "Annual fee ranges from ₹35,840 (Nursery) to ₹43,510 (Class IX). It covers tuition, books, labs and most activities. The detailed fee schedule is on the Admissions page."; },
      timings: function () { return "School hours are 8:00 AM – 3:00 PM (Mon–Fri) and 8:00 AM – 12:30 PM (Sat). The office is open 8:00 AM – 4:00 PM, Mon–Sat."; },
      facilities: function () { return "We offer smart classrooms, science & computer labs, a library, sports courts, music & dance rooms, medical room, transport and full campus security. See the Facilities page for details!"; },
      contact: function () { return "You can call +91 99119772205, email sfssadabad@gmail.com, or visit us at Francis Avenue,  Sadabad. Our WhatsApp is also open — tap the WhatsApp button!"; },
      tour: function () { return "Take a 360° virtual tour of our campus on the Virtual Tour page — explore classrooms, labs, library and playgrounds without leaving home!"; },
      portal: function () { return "Students, parents and teachers can log in through the Portals menu in the top navigation bar."; },
      transport: function () { return "We operate 24 GPS-enabled buses covering 30+ routes across the city. Route details are available with the transport office."; }
    };

    function answer(q) {
      q = q.toLowerCase();
      if (q.match(/admis|registr|join|seat|enrol/)) return intents.admission(q);
      if (q.match(/fee|cost|pay/)) return intents.fees();
      if (q.match(/time|hour|schedule/)) return intents.timings();
      if (q.match(/facilit|lab|library|sport|music|play/)) return intents.facilities();
      if (q.match(/contact|phone|email|address|reach|location|where/)) return intents.contact();
      if (q.match(/tour|visit|360|campus/)) return intents.tour();
      if (q.match(/portal|login|id/)) return intents.portal();
      if (q.match(/bus|transport|van|pick/)) return intents.transport();
      if (q.match(/result|academic|topper/)) return "Our students achieve 100% board results year after year, with 45+ students scoring above 95% in 2025. Check the Achievements page!";
      if (q.match(/hello|hi\b|hey|good /)) return "Hello! 👋 I'm francis's Assistant. Ask me about admissions, fees, timings, facilities or anything about the school!";
      return "I'm still learning! For anything specific, please call +91 98765 43210 or email info@sxis.edu.in. You can also ask about admissions, fees, timings or facilities.";
    }

    function send() {
      var v = input.value.trim();
      if (!v) return;
      addMsg(v, "user");
      input.value = "";
      botSay(answer(v));
    }

    document.getElementById("chatSend").addEventListener("click", send);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") send(); });
    document.querySelectorAll("#chatQuick button").forEach(function (b) {
      b.addEventListener("click", function () {
        addMsg(b.getAttribute("data-q"), "user");
        botSay(answer(b.getAttribute("data-q")));
      });
    });
    if (openBtn) {
      openBtn.addEventListener("click", function () { bot.classList.remove("open"); });
    }
    setTimeout(function () { bot.classList.add("open"); addMsg("Hello! 👋 I'm francis's Assistant. How can I help you today?", "bot"); }, 2200);
  });

  /* ---------- Lightbox ---------- */
  onReady(function () {
    var lightbox = document.getElementById("lightbox");
    if (!lightbox) return;
    var img = lightbox.querySelector("img");
    var cap = lightbox.querySelector(".lb-caption");
    var items = [];
    var idx = 0;

    function open(i) {
      idx = i;
      var it = items[idx];
      img.src = it.src;
      cap.textContent = it.caption || "";
      lightbox.classList.add("show");
      document.body.style.overflow = "hidden";
    }
    function close() { lightbox.classList.remove("show"); document.body.style.overflow = ""; }
    function step(n) { open((idx + n + items.length) % items.length); }

    lightbox.querySelector(".lb-close").addEventListener("click", close);
    lightbox.querySelector(".prev").addEventListener("click", function () { step(-1); });
    lightbox.querySelector(".next").addEventListener("click", function () { step(1); });
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("show")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });

    document.querySelectorAll("[data-gallery]").forEach(function (grid) {
  grid.querySelectorAll("[data-src]").forEach(function (el) {
    var i = items.length;
    items.push({ src: el.getAttribute("data-src"), caption: el.getAttribute("data-caption") || "" });
    el.addEventListener("click", function () { open(i); });
  });
});
  });

  /* ---------- Gallery / Notice filters ---------- */
  onReady(function () {
    var grids = document.querySelectorAll("[data-filter-grid]");
    grids.forEach(function (grid) {
      var scope = grid.getAttribute("data-filter-grid");
      document.querySelectorAll('[data-filter][data-scope="' + scope + '"]').forEach(function (btn) {
        btn.addEventListener("click", function () {
          document.querySelectorAll('[data-filter][data-scope="' + scope + '"]').forEach(function (b) { b.classList.remove("active"); });
          btn.classList.add("active");
          var f = btn.getAttribute("data-filter");
          grid.querySelectorAll("[data-cat]").forEach(function (item) {
            item.style.display = (f === "all" || item.getAttribute("data-cat") === f) ? "" : "none";
          });
        });
      });
    });
  });

  /* ---------- Notice board search ---------- */
  onReady(function () {
    var search = document.getElementById("noticeSearch");
    if (!search) return;
    var items = document.querySelectorAll("[data-notice-item]");
    search.addEventListener("input", function () {
      var q = search.value.toLowerCase();
      items.forEach(function (it) {
        var hay = it.textContent.toLowerCase();
        it.style.display = hay.indexOf(q) > -1 ? "" : "none";
      });
    });
  });

  /* ---------- "Read more" toggles ---------- */
  onReady(function () {
    document.querySelectorAll("[data-readmore]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = document.querySelector(btn.getAttribute("data-readmore"));
        if (!target) return;
        var collapsed = target.style.maxHeight === "0px" || !target.style.maxHeight;
        if (collapsed) {
          target.style.maxHeight = target.scrollHeight + "px";
          btn.innerHTML = 'Read Less <i class="fa-solid fa-chevron-up"></i>';
        } else {
          target.style.maxHeight = "0px";
          btn.innerHTML = 'Read More <i class="fa-solid fa-chevron-down"></i>';
        }
      });
    });
  });

  /* ---------- Panorama drag viewer ---------- */
  onReady(function () {
    var pano = document.getElementById("panorama");
    if (!pano) return;
    var img = pano.querySelector(".pan-img");
    var x = 0, dragging = false, lastX = 0;
    var maxX = 220;
    pano.addEventListener("pointerdown", function (e) { dragging = true; lastX = e.clientX; });
    window.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var dx = e.clientX - lastX;
      lastX = e.clientX;
      x = Math.max(-maxX, Math.min(maxX, x + dx));
      img.style.backgroundPosition = (50 + x) + "% 50%";
    });
    window.addEventListener("pointerup", function () { dragging = false; });
  });

  /* ---------- Page load animation ---------- */
  onReady(function () {
    document.body.classList.add("page-in");
  });

  /* ---------- Image fallback (gradient placeholder) ---------- */
  onReady(function () {
    document.querySelectorAll("img").forEach(function (im) {
      im.addEventListener("error", function () {
        var h = im.offsetHeight ? im.offsetHeight : 240;
        var g = document.createElement("div");
        g.style.height = h + "px";
        g.style.background = "linear-gradient(135deg, #8E1F3C, #4A0E1E 60%, #E9B84C)";
        g.style.display = "flex"; g.style.alignItems = "center"; g.style.justifyContent = "center";
        g.style.color = "#fff"; g.style.fontSize = "42px";
        g.innerHTML = '<i class="fa-solid fa-school"></i>';
        im.parentNode.replaceChild(g, im);
      });
    });
  });

  /* ---------- Form handling (prevent default & success toast) ---------- */
  onReady(function () {
    document.querySelectorAll("form[data-handle]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var btn = form.querySelector("button[type=submit]");
        if (btn) { btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting…'; btn.disabled = true; }
        setTimeout(function () {
          if (btn) { btn.innerHTML = '<i class="fa-solid fa-check"></i> Submitted — Thank you!'; btn.disabled = false; }
          form.reset();
          alert("Thank you! Your details have been received. Our team will contact you shortly.");
        }, 900);
      });
    });
  });

  /* ---------- Calendar month render ---------- */
  onReady(function () {
    var cal = document.getElementById("eventCalendar");
    if (!cal) return;
    var month = new Date().getMonth();
    var year = new Date().getFullYear();
    var names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var mNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var first = new Date(year, month, 1).getDay();
    var days = new Date(year, month + 1, 0).getDate();
    var events = { 5: "Annual Sports Day", 14: "Science Exhibition", 18: "Parent-Teacher Meet", 26: "Republic Day Celebration" };
    var html = '<div class="d-flex justify-content-between align-items-center p-3" style="background:var(--grad-navy);border-radius:16px 16px 0 0">' +
      '<span class="text-white fw-bold" style="font-family:var(--font-head)">' + mNames[month] + " " + year + "</span>" +
      '<span class="text-white-50 small">' + days + " days</span></div>";
    html += '<div class="d-grid" style="grid-template-columns:repeat(7,1fr);gap:4px;padding:14px">';
    names.forEach(function (n) { html += '<div class="text-center fw-bold small" style="color:var(--royal-2)">' + n + "</div>"; });
    for (var i = 0; i < first; i++) html += "<div></div>";
    for (var d = 1; d <= days; d++) {
      var ev = events[d] ? " style='background:var(--grad-gold);color:var(--navy);font-weight:800;box-shadow:var(--shadow-gold);border-radius:10px' title='" + events[d] + "'" : "";
      html += '<div class="text-center py-1 small"' + ev + ">" + d + "</div>";
    }
    html += "</div>";
    cal.innerHTML = html;
  });

  /* ---------- Hero particles ---------- */
  onReady(function () {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var small = window.innerWidth < 768;
    document.querySelectorAll(".hero, .page-hero").forEach(function (host) {
      var box = document.createElement("div");
      box.className = "hero-particles";
      box.setAttribute("aria-hidden", "true");
      host.appendChild(box);
      var n = host.classList.contains("page-hero") ? (small ? 8 : 14) : (small ? 10 : 22);
      for (var i = 0; i < n; i++) {
        var p = document.createElement("i");
        p.className = "hero-particle";
        var size = (3 + Math.random() * 7).toFixed(1);
        p.style.width = p.style.height = size + "px";
        p.style.left = (Math.random() * 100).toFixed(1) + "%";
        p.style.bottom = (Math.random() * 45).toFixed(1) + "%";
        p.style.setProperty("--po", (0.25 + Math.random() * 0.5).toFixed(2));
        p.style.animationDuration = (9 + Math.random() * 11).toFixed(1) + "s";
        p.style.animationDelay = (-Math.random() * 14).toFixed(1) + "s";
        box.appendChild(p);
      }
    });
  });

  /* ---------- 3D tilt on cards ---------- */
  onReady(function () {
    if (!window.matchMedia || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    var MAX = 8;
    document.querySelectorAll(".card-premium, .stat-card").forEach(function (el) {
      el.classList.add("tilt");
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        var rx = ((0.5 - py) * MAX).toFixed(2);
        var ry = ((px - 0.5) * MAX).toFixed(2);
        el.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-6px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  });

  /* ---------- Magnetic buttons ---------- */
  onReady(function () {
    if (!window.matchMedia || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.querySelectorAll(".btn-premium, .btn-navy, .btn-outline-premium, .nav-cta").forEach(function (btn) {
      btn.classList.add("magnetic");
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - r.left - r.width / 2) * 0.2;
        var dy = (e.clientY - r.top - r.height / 2) * 0.28;
        btn.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
      });
      btn.addEventListener("mouseleave", function () { btn.style.transform = ""; });
    });
  });

  /* ---------- Image parallax on scroll ---------- */
  onReady(function () {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var imgs = document.querySelectorAll(".img-card img, .img-frame img");
    if (!imgs.length) return;
    var ticking = false;
    function update() {
      ticking = false;
      var vh = window.innerHeight || 0;
      imgs.forEach(function (im) {
        var r = im.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) return;
        var c = r.top + r.height / 2 - vh / 2;
        var py = Math.max(-28, Math.min(28, (c * -0.05).toFixed(1)));
        im.style.setProperty("--py", py + "px");
      });
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener("resize", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    });
    update();
  });

  /* ---------- Section title underline reveal ---------- */
  onReady(function () {
    var heads = document.querySelectorAll(".section-head");
    if (!heads.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var t = en.target.querySelector(".section-title");
          if (t) t.classList.add("u-anim");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    heads.forEach(function (h) { io.observe(h); });
  });
})();
