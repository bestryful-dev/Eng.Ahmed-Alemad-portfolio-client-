/**
 * AHMED AL-EMAD | EXECUTIVE TELECOM PORTFOLIO
 * Modular Vanilla JavaScript Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme State Manager (Default: Dark)
  const themeToggleBtn = document.getElementById("theme-toggle");
  const rootElem = document.documentElement;

  const savedTheme = localStorage.getItem("preferred-theme") || "dark";
  rootElem.setAttribute("data-theme", savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = rootElem.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      rootElem.setAttribute("data-theme", newTheme);
      localStorage.setItem("preferred-theme", newTheme);
    });
  }

  // // 2. Language State Manager (Default: EN -> Switch to AR)

  // const langToggleBtn = document.getElementById('lang-toggle');

  // // Read stored language preference or default to 'en'
  // let currentLang = localStorage.getItem('preferred-lang') || 'ar';
  // applyLanguage(currentLang);

  // if (langToggleBtn) {
  //     langToggleBtn.addEventListener('click', () => {
  //         currentLang = currentLang === 'en' ? 'ar' : 'en';
  //         applyLanguage(currentLang);
  //         localStorage.setItem('preferred-lang', currentLang);
  //     });
  //     console.log(currentLang)
  // }

  // function applyLanguage(lang) {
  //     if (lang === 'ar') {
  //         rootElem.setAttribute('dir', 'rtl');
  //         rootElem.setAttribute('lang', 'ar');
  //     } else {
  //         rootElem.setAttribute('dir', 'ltr');
  //         rootElem.setAttribute('lang', 'en');
  //     }
  //     // Notify Typewriter module to switch language strings
  //     if (typeof restartTypewriter === 'function') {
  //         restartTypewriter(lang);
  //     }
  // }

  // 3. Mobile Navigation Drawer Toggle
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

    if (mobileToggle && navMenu) {
    // 1. Toggle when clicking the hamburger button
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // CRITICAL: Stop click from immediately closing the menu
      const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";
      mobileToggle.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("active");
    });

    // 2. Close when clicking an individual link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });

    // 3. FIXED POSITION: Listening for page clicks out here, outside the loop!
    document.addEventListener("click", (event) => {
      const isMenuOpen = navMenu.classList.contains("active");
      const clickedInsideMenu = navMenu.contains(event.target);
      const clickedToggleBtn = mobileToggle.contains(event.target);

      if (isMenuOpen && !clickedInsideMenu && !clickedToggleBtn) {
        navMenu.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      }
    });
  }


  

  // 4. ScrollSpy Active Link Highlighter
  const sections = document.querySelectorAll("section, footer");
  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // 5. Dynamic Typewriter Engine
  const typewriterElem = document.getElementById("typewriter");

  const titles = {
    en: ["Deputy CEO", "Chief Technology Officer", "Chief Commercial Officer"],
    ar: [
      "نائب الرئيس التنفيذي",
      "رئيس قطاع التكنولوجيا والمعلومات",
      "رئيس القطاع التجاري",
    ],
  };
  // =========================================================================
  // 1. TYPEWRITER EFFECT DEFINITIONS (Move this block up!)
  // =========================================================================

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typewriterTimeout = null;

  function typeEffect() {
    if (!typewriterElem) return;

    const currentLangList = titles[currentLang] || titles.en;
    const currentTitle = currentLangList[titleIndex % currentLangList.length];

    if (isDeleting) {
      typewriterElem.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElem.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentTitle.length) {
      typeSpeed = 2200; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex++;
      typeSpeed = 400; // Pause before typing next word
    }

    typewriterTimeout = setTimeout(typeEffect, typeSpeed);
  }

  function restartTypewriter(lang) {
    if (typewriterTimeout) {
      clearTimeout(typewriterTimeout);
    }
    titleIndex = 0;
    charIndex = 0;
    isDeleting = false;
    if (typewriterElem) {
      typewriterElem.textContent = "";
    }
    typeEffect();
  }

  // =========================================================================
  // 2. LANGUAGE STATE MANAGER (Place this underneath the Typewriter code)
  // =========================================================================
  const langToggleBtn = document.getElementById("lang-toggle");

  // Read stored language preference or default to 'en'
  let currentLang = localStorage.getItem("preferred-lang") || "en";

  // Now it is safe to call because all typewriter variables exist!
  applyLanguage(currentLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "ar" : "en";
      applyLanguage(currentLang);
      localStorage.setItem("preferred-lang", currentLang);
    });
  }

  function applyLanguage(lang) {
    if (lang === "ar") {
      rootElem.setAttribute("dir", "rtl");
      rootElem.setAttribute("lang", "ar");
    } else {
      rootElem.setAttribute("dir", "ltr");
      rootElem.setAttribute("lang", "en");
    }

    // Safely trigger typewriter restart
    if (typeof restartTypewriter === "function") {
      restartTypewriter(lang);
    }
  }

  // let titleIndex = 0;
  // let charIndex = 0;
  // let isDeleting = false;
  // let typewriterTimeout = null;

  // function typeEffect() {
  //     if (!typewriterElem) return;

  //     const currentLangList = titles[currentLang] || titles.en;
  //     const currentTitle = currentLangList[titleIndex % currentLangList.length];

  //     if (isDeleting) {
  //         typewriterElem.textContent = currentTitle.substring(0, charIndex - 1);
  //         charIndex--;
  //     } else {
  //         typewriterElem.textContent = currentTitle.substring(0, charIndex + 1);
  //         charIndex++;
  //     }

  //     let typeSpeed = isDeleting ? 40 : 80;

  //     if (!isDeleting && charIndex === currentTitle.length) {
  //         typeSpeed = 2200; // Pause at end of word
  //         isDeleting = true;
  //     } else if (isDeleting && charIndex === 0) {
  //         isDeleting = false;
  //         titleIndex++;
  //         typeSpeed = 400; // Pause before typing next word
  //     }

  //     typewriterTimeout = setTimeout(typeEffect, typeSpeed);
  // }

  // function restartTypewriter(lang) {
  //     clearTimeout(typewriterTimeout);
  //     titleIndex = 0;
  //     charIndex = 0;
  //     isDeleting = false;
  //     if (typewriterElem) {
  //         typewriterElem.textContent = '';
  //     }
  //     typeEffect();
  // }

  // // Start typewriter
  // typeEffect();

  // 6. Interactive Engineering Timeline Filters
  const filterBtns = document.querySelectorAll(".filter-btn");
  const timelineItems = document.querySelectorAll(".timeline-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      timelineItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        if (filterValue === "mgmt" || category === filterValue) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // 7. Ripple Effect Button & Canvas Overlay
  const rippleBtn = document.getElementById("download-cv");
  if (rippleBtn) {
    rippleBtn.addEventListener("click", (e) => {
      const canvas = rippleBtn.querySelector(".ripple-canvas");
      if (!canvas) return;

      const rect = rippleBtn.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const ctx = canvas.getContext("2d");

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      let radius = 0;
      const maxRadius = Math.max(rect.width, rect.height) * 1.5;

      function animateRipple() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.fill();

        radius += 8;
        if (radius < maxRadius) {
          requestAnimationFrame(animateRipple);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      animateRipple();

      // Trigger Executive CV Download
      downloadExecutiveCV();
    });
  }

  // 8. Executive CV Dynamic File Generator
  function downloadExecutiveCV() {
    const cvContent = `===================================================================
AHMED AL-EMAD | أحمد العماد
Executive Telecom Leader | Deputy CEO | CTIO | CCO
Email: ahmed.alemad@gmail.com
Phone: +967 773 747 576 / +967 700 990 444
Location: Airport Street, Sana'a, Yemen
===================================================================

EXECUTIVE SUMMARY:
------------------
A visionary and results-driven Telecom Executive with over 25 years of local 
and international experience in directing, operating, and transforming 
telecommunications giants (including Orange Group and Spacetel/MTN).

CORE COMPETENCIES:
------------------
• Executive Leadership & Board Governance
• Next-Gen Network Deployment (2G/3G/4G)
• BSS/OSS Platforms & Technology Roadmaps
• Commercial Strategy, ARPU Growth & Churn Reduction
• CAPEX/OPEX Optimization & KPI Frameworks

EXECUTIVE CAREER TIMELINE:
--------------------------
1. Y-Telecom | Deputy Chief Executive Officer (DCEO) [Aug 2022 - Jun 2023]
2. Y-Telecom | Chief Technology & Information Officer (CTIO) [Jan 2022 - Aug 2022]
3. Y-Telecom | Technical General Manager / Technical Director [Nov 2020 - Jan 2022]
4. Y-Telecom | Chief Commercial Officer (CCO) [Aug 2020 - Oct 2020]
5. Y-Telecom | Planning & Development Manager [Jan 2015 - Aug 2020]
6. Orange (Uganda) | Service Management, Quality & Improvement Center Manager [Jan 2010 - Aug 2014]
7. Orange (Uganda) | BSS Operations & QoS Manager [Jun 2008 - Dec 2009]
8. Hits Telecom Orange (Uganda) | BSS Operations Manager [Nov 2007 - Jun 2008]
9. Spacetel Yemen (Later MTN) | BSS Operation & Support Engineer [Mar 2003 - Sep 2006]
10. Spacetel Yemen (Later MTN) | Network Monitoring & Operation Engineer [Sep 2001 - Feb 2003]
11. Alo Public Telephones | Installation & Operation Supervisor Engineer [Feb 2000 - Aug 2001]

ACADEMIC QUALIFICATIONS:
------------------------
Bachelor's Degree in Telecommunications Engineering | Sana'a University, Yemen (1998)
===================================================================`;

    const blob = new Blob([cvContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Ahmed_Al-Emad_Executive_CV.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // 9. Interactive Contact Form Handler & Validation
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("form-submit-btn");
  const submitText = submitBtn ? submitBtn.querySelector(".submit-text") : null;
  const spinner = submitBtn ? submitBtn.querySelector(".spinner") : null;
  const feedbackPanel = document.getElementById("form-feedback");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Clear previous errors
      document
        .querySelectorAll(".error-msg")
        .forEach((el) => (el.textContent = ""));
      if (feedbackPanel) {
        feedbackPanel.className = "form-feedback-panel hidden";
        feedbackPanel.textContent = "";
      }

      const name = document.getElementById("form-name").value.trim();
      const email = document.getElementById("form-email").value.trim();
      const subject = document.getElementById("form-subject").value.trim();
      const message = document.getElementById("form-message").value.trim();

      let isValid = true;

      if (!name) {
        showError(
          "name-error",
          currentLang === "ar"
            ? "الرجاء إدخال الاسم الكامل"
            : "Full Name is required.",
        );
        isValid = false;
      }

      if (!email || !validateEmail(email)) {
        showError(
          "email-error",
          currentLang === "ar"
            ? "الرجاء إدخال بريد إلكتروني صحيح"
            : "Please enter a valid email address.",
        );
        isValid = false;
      }

      if (!subject) {
        showError(
          "subject-error",
          currentLang === "ar"
            ? "الرجاء إدخال موضوع الرسالة"
            : "Subject is required.",
        );
        isValid = false;
      }

      if (!message) {
        showError(
          "message-error",
          currentLang === "ar"
            ? "الرجاء كتابة تفاصيل الرسالة"
            : "Message cannot be empty.",
        );
        isValid = false;
      }

      if (isValid) {
        // Simulate network request
        if (submitText) submitText.classList.add("hidden");
        if (spinner) spinner.classList.remove("hidden");
        if (submitBtn) submitBtn.disabled = true;

        setTimeout(() => {
          if (submitText) submitText.classList.remove("hidden");
          if (spinner) spinner.classList.add("hidden");
          if (submitBtn) submitBtn.disabled = false;

          if (feedbackPanel) {
            feedbackPanel.className = "form-feedback-panel success";
            feedbackPanel.textContent =
              currentLang === "ar"
                ? "تم إرسال رسالتكم بنجاح إلى المكتب التنفيذي. سنقوم بالتواصل معكم قريباً."
                : "Your message has been securely dispatched to the executive office. We will respond promptly.";
          }

          contactForm.reset();
        }, 1200);
      }
    });
  }

  function showError(elementId, msg) {
    const errorElem = document.getElementById(elementId);
    if (errorElem) {
      errorElem.textContent = msg;
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // 10. Back to Top Button
  // const backToTopBtn = document.getElementById('back-to-top');
  // if (backToTopBtn) {
  //     backToTopBtn.addEventListener('click', () => {
  //         window.scrollTo({
  //             top: 0,
  //             behavior: 'smooth'
  //         });
  //     });
  // }
});
const backToTopBtn = document.getElementById("back-to-top");
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
