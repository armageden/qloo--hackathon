(() => {
  "use strict";

  // Elements
  const section = document.querySelector(".cinema-scroll");
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const track = document.querySelector(".sights-track");
  const sightsControls = document.querySelector(".sights-controls");
  const prevBtn = document.querySelector(".sight-prev");
  const nextBtn = document.querySelector(".sight-next");
  const initialCards = Array.from(track ? track.querySelectorAll(".sight-card") : []);

  // State
  let targetMouseX = 0;
  let targetMouseY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetScroll = 0;
  let smoothScroll = 0;
  let initialized = false;
  let rafPending = false;
  let sightCards = [];
  const originalSightCount = initialCards.length;
  let activeSight = originalSightCount;

  // Math helpers
  function clamp(v, min = 0, max = 1) {
    return Math.min(max, Math.max(min, v));
  }

  function smoothstep(e0, e1, v) {
    const x = clamp((v - e0) / (e1 - e0));
    return x * x * (3 - 2 * x);
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function segmentInOut(s, a, b, c, d) {
    const enter = smoothstep(a, b, s);
    const exit = smoothstep(c, d, s);
    return { enter, exit, active: enter * (1 - exit) };
  }

  function getScrollDistance() {
    if (!section) return window.scrollY || 0;
    const maxScroll = Math.max(0, section.offsetHeight - window.innerHeight);
    const dist = -section.getBoundingClientRect().top;
    return clamp(dist, 0, maxScroll);
  }

  // Animation frame loop
  function update() {
    rafPending = false;
    targetScroll = getScrollDistance();

    if (!initialized || reduceMotion.matches) {
      smoothScroll = targetScroll;
      mouseX = reduceMotion.matches ? 0 : targetMouseX;
      mouseY = reduceMotion.matches ? 0 : targetMouseY;
      initialized = true;
    } else {
      smoothScroll = lerp(smoothScroll, targetScroll, 0.14);
      mouseX = lerp(mouseX, targetMouseX, 0.12);
      mouseY = lerp(mouseY, targetMouseY, 0.12);
    }

    if (Math.abs(smoothScroll - targetScroll) < 0.08) {
      smoothScroll = targetScroll;
    }
    if (Math.abs(mouseX - targetMouseX) < 0.001) {
      mouseX = targetMouseX;
    }
    if (Math.abs(mouseY - targetMouseY) < 0.001) {
      mouseY = targetMouseY;
    }

    const frame2 = segmentInOut(smoothScroll, 560, 900, 1300, 1620);
    const frame3 = segmentInOut(smoothScroll, 1760, 2140, 2540, 2700);
    const progress = clamp(smoothScroll / 2700);
    const introExit = smoothstep(90, 650, smoothScroll);
    const sightsEnterRaw = smoothstep(2760, 3560, smoothScroll);
    const sightsEnter = Math.pow(sightsEnterRaw, 1.55);
    const sightsControlsEnter = smoothstep(3360, 3660, smoothScroll);
    const blurActive = clamp(frame2.active + frame3.active);
    const frame2Opacity = frame2.active * (1 - frame3.enter);
    const splitDrift = Math.pow(frame2.enter, 1.5);
    const panel2Opacity = frame2.active * (1 - frame2.exit);
    const panel3Opacity = frame3.active * (1 - frame3.exit);
    const backScale = 0.76 + progress * 0.2 + frame2.enter * 0.18 + frame3.enter * 0.16;
    const sharedHeroY = progress * -74;
    const sharedHeroScale = progress * 0.23;
    const sightsScreenTop = Math.min(220, Math.max(112, window.innerHeight * 0.19)) - 50;
    const sightsParentTop = window.innerHeight - (window.innerHeight - sightsScreenTop) / backScale;

    // Apply exact CSS custom properties
    const effectiveMx = reduceMotion.matches ? 0 : mouseX;
    const effectiveMy = reduceMotion.matches ? 0 : mouseY;

    root.style.setProperty("--mx", effectiveMx.toFixed(4));
    root.style.setProperty("--my", effectiveMy.toFixed(4));

    root.style.setProperty("--back-opacity", (1 - frame2.active * 0.06).toFixed(4));
    root.style.setProperty("--back-x", `${(effectiveMx * -12).toFixed(2)}px`);
    root.style.setProperty("--back-y", `${(effectiveMy * -4).toFixed(2)}px`);
    root.style.setProperty("--back-scale", backScale.toFixed(4));
    root.style.setProperty("--four-y", `${(10 + progress * 10).toFixed(2)}vh`);
    root.style.setProperty("--four-scale", (0.78 + progress * 0.16).toFixed(4));
    root.style.setProperty("--bazaar-y", `${(20 - progress * 8).toFixed(2)}vh`);
    root.style.setProperty("--blur-px", `${(blurActive * 14).toFixed(2)}px`);
    root.style.setProperty("--back-brightness", (1 - blurActive * 0.255).toFixed(4));
    root.style.setProperty("--bazaar-blur-px", `${(frame2.active * 14).toFixed(2)}px`);
    root.style.setProperty("--bazaar-brightness", (1 - frame2.active * 0.255 - frame3.active * 0.06).toFixed(4));
    root.style.setProperty("--bazaar-saturation", (1 + frame3.active * 0.18).toFixed(4));
    root.style.setProperty("--shade-opacity", "1");
    root.style.setProperty("--shade-z", frame2.active > 0.02 ? "2" : "0");
    root.style.setProperty("--shade-top-alpha", (blurActive * 0.465).toFixed(4));
    root.style.setProperty("--shade-mid-alpha", (blurActive * 0.42).toFixed(4));
    root.style.setProperty("--shade-bottom-alpha", (blurActive * 0.51).toFixed(4));

    root.style.setProperty("--title-y", `${(introExit * -210).toFixed(2)}px`);
    root.style.setProperty("--title-scale", (1 - introExit * 0.08).toFixed(4));
    root.style.setProperty("--title-opacity", (1 - introExit).toFixed(4));

    root.style.setProperty("--bridge-x", `calc(-50% + ${(effectiveMx * 18).toFixed(2)}px)`);
    root.style.setProperty("--bridge-y", `${(effectiveMy * 8 + sharedHeroY - frame2.exit * 760).toFixed(2)}px`);
    root.style.setProperty("--bridge-bottom", `${(5 - frame2.enter * 13).toFixed(2)}vh`);
    root.style.setProperty("--bridge-width", `${(67.2 + frame2.enter * 37.8).toFixed(2)}vw`);
    root.style.setProperty("--bridge-scale", (1.02 + sharedHeroScale + frame2.exit * 0.46).toFixed(4));

    root.style.setProperty("--split-left-x", `calc(-50% + ${(-splitDrift * 46).toFixed(2)}vw + ${(effectiveMx * 22).toFixed(2)}px)`);
    root.style.setProperty("--split-left-y", `${(effectiveMy * 10 + sharedHeroY - splitDrift * 180).toFixed(2)}px`);
    root.style.setProperty("--split-left-scale", (1 + sharedHeroScale + frame2.enter * 0.74).toFixed(4));
    root.style.setProperty("--split-right-x", `calc(-50% + ${(splitDrift * 46).toFixed(2)}vw + ${(effectiveMx * 22).toFixed(2)}px)`);
    root.style.setProperty("--split-right-y", `${(effectiveMy * 10 + sharedHeroY - splitDrift * 180).toFixed(2)}px`);
    root.style.setProperty("--split-right-scale", (1 + sharedHeroScale + frame2.enter * 0.74).toFixed(4));

    root.style.setProperty("--frame2-opacity", frame2Opacity.toFixed(4));
    root.style.setProperty("--frame2-x", `calc(-50% + ${(effectiveMx * 10).toFixed(2)}px)`);
    root.style.setProperty("--frame2-y", `calc(-50% + ${(effectiveMy * 8 - frame2.exit * 150).toFixed(2)}px)`);
    root.style.setProperty("--frame2-scale", (1.06 + frame2.enter * 0.08 + frame2.exit * 0.08).toFixed(4));

    root.style.setProperty("--intro-copy-y", `${(introExit * 90).toFixed(2)}px`);
    root.style.setProperty("--intro-copy-opacity", (1 - introExit).toFixed(4));
    root.style.setProperty("--panel2-opacity", panel2Opacity.toFixed(4));
    root.style.setProperty("--panel2-y", `calc(-50% + ${(-frame2.exit * 86 + (1 - frame2.enter) * 58).toFixed(2)}px)`);
    root.style.setProperty("--panel3-opacity", panel3Opacity.toFixed(4));
    root.style.setProperty("--panel3-y", `calc(-50% + ${(-frame3.exit * 86 + (1 - frame3.enter) * 58).toFixed(2)}px)`);

    root.style.setProperty("--sights-opacity", sightsEnter.toFixed(4));
    root.style.setProperty("--sights-controls-opacity", sightsControlsEnter.toFixed(4));
    if (sightsControls) {
      sightsControls.classList.toggle("is-ready", sightsControlsEnter > 0.98);
    }
    root.style.setProperty("--sights-visibility", sightsEnter > 0.01 ? "visible" : "hidden");
    root.style.setProperty("--sights-y", "0px");
    root.style.setProperty("--sights-enter-x", `${((1 - sightsEnter) * 420).toFixed(2)}vw`);
    root.style.setProperty("--sights-scale", (1 / backScale).toFixed(4));
    root.style.setProperty("--sights-top", `${sightsParentTop.toFixed(2)}px`);
    root.style.setProperty("--sights-screen-top", `${sightsScreenTop.toFixed(2)}px`);

    // Continue frame loop if still animating towards target
    if (
      Math.abs(smoothScroll - targetScroll) > 0.08 ||
      Math.abs(mouseX - targetMouseX) > 0.001 ||
      Math.abs(mouseY - targetMouseY) > 0.001
    ) {
      requestTick();
    }
  }

  function requestTick() {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(update);
    }
  }

  // Infinite slider methods
  function updateSightSlider() {
    if (!track || sightCards.length === 0) return;
    const cardWidth = sightCards[0].offsetWidth || 360;
    const compGap = window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap || "16px";
    const parsedGap = parseFloat(compGap);
    const gap = Number.isFinite(parsedGap) ? parsedGap : 16;
    const shift = -(cardWidth + gap) * activeSight;

    root.style.setProperty("--sights-shift", `${shift.toFixed(2)}px`);

    sightCards.forEach((card, idx) => {
      card.classList.toggle("is-active", idx === activeSight);
    });
  }

  function moveSightSlider(dir) {
    if (originalSightCount > 0) {
      if (activeSight >= originalSightCount * 2) {
        activeSight -= originalSightCount;
        jumpSightSlider(activeSight);
      } else if (activeSight < originalSightCount) {
        activeSight += originalSightCount;
        jumpSightSlider(activeSight);
      }
    }
    activeSight += dir;
    updateSightSlider();
  }

  function selectSightCard(card) {
    const idx = Number(card.dataset.sightIndex);
    if (Number.isFinite(idx)) {
      activeSight = idx;
      updateSightSlider();
    }
  }

  function jumpSightSlider(i) {
    if (!track) return;
    track.classList.add("is-jumping");
    activeSight = i;
    updateSightSlider();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.classList.remove("is-jumping");
      });
    });
  }

  function normalizeSightSlider() {
    if (originalSightCount <= 0) return;
    if (activeSight >= originalSightCount * 2) {
      jumpSightSlider(activeSight - originalSightCount);
    } else if (activeSight < originalSightCount) {
      jumpSightSlider(activeSight + originalSightCount);
    }
  }

  function setupSightSlider() {
    if (!track || initialCards.length === 0) return;
    track.replaceChildren();

    // 3 identical sets = 15 cards
    for (let setIndex = 0; setIndex < 3; setIndex++) {
      initialCards.forEach((card, cardIndex) => {
        const clone = card.cloneNode(true);
        const sightIndex = setIndex * originalSightCount + cardIndex;
        clone.dataset.sightIndex = String(sightIndex);

        clone.addEventListener("click", () => selectSightCard(clone));
        clone.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            selectSightCard(clone);
          }
        });

        track.appendChild(clone);
      });
    }

    sightCards = Array.from(track.querySelectorAll(".sight-card"));
    activeSight = originalSightCount; // start in middle set

    track.addEventListener("transitionend", (e) => {
      if (e.target === track && e.propertyName === "transform") {
        normalizeSightSlider();
      }
    });

    updateSightSlider();
  }

  // Header navigation & notes button integrations
  const navTargets = {
    "#cinema": 0,
    "#bridge": 1100,
    "#bazaar": 2200,
    "#routes": 3200
  };

  document.querySelectorAll(".site-nav a, .site-logo").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && navTargets[href] !== undefined) {
        e.preventDefault();
        window.scrollTo({
          top: navTargets[href],
          behavior: reduceMotion.matches ? "auto" : "smooth"
        });
      }
    });
  });

  const noteBtn = document.querySelector(".note-button");
  if (noteBtn) {
    noteBtn.addEventListener("click", () => {
      window.location.href = "/tourcraft";
    });
  }

  // Global event listeners
  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", () => {
    updateSightSlider();
    requestTick();
  });
  window.addEventListener("load", () => {
    updateSightSlider();
    requestTick();
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      updateSightSlider();
      requestTick();
    });
  }
  window.addEventListener(
    "pointermove",
    (e) => {
      targetMouseX = e.clientX / window.innerWidth - 0.5;
      targetMouseY = e.clientY / window.innerHeight - 0.5;
      requestTick();
    },
    { passive: true }
  );

  if (prevBtn) {
    prevBtn.addEventListener("click", () => moveSightSlider(-1));
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => moveSightSlider(1));
  }

  // Initialization
  setupSightSlider();
  requestTick();
})();
