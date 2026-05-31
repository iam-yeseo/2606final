// 현재 보이는 섹션을 네비게이션에 표시합니다.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isCurrent);

    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

let ticking = false;

const updateActiveSection = () => {
  const marker = window.scrollY + window.innerHeight * 0.35;
  let currentId = sections[0]?.id;

  sections.forEach((section) => {
    if (marker >= section.offsetTop) {
      currentId = section.id;
    }
  });

  if (currentId) {
    setActiveLink(currentId);
  }
};

window.addEventListener(
  "scroll",
  () => {
    if (ticking) return;

    window.requestAnimationFrame(() => {
      updateActiveSection();
      ticking = false;
    });

    ticking = true;
  },
  { passive: true }
);

window.addEventListener("load", updateActiveSection);
window.addEventListener("resize", updateActiveSection);
updateActiveSection();

// 이미지 파일이 없을 때 깨진 이미지 대신 placeholder가 보이도록 처리합니다.
document.querySelectorAll("[data-image-frame]").forEach((frame) => {
  const image = frame.querySelector("img");

  if (!image) return;

  const showPlaceholder = () => {
    frame.classList.add("is-missing");
  };

  image.addEventListener("error", showPlaceholder);

  // defer 스크립트가 실행되기 전에 이미지 로드 실패가 끝난 경우도 처리합니다.
  if (image.complete && image.naturalWidth === 0) {
    showPlaceholder();
  }
});
