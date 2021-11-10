// popup show and hide

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks && body && lockPadding && unlock && timeout) {
  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
        const popupName = popupLink.getAttribute("href").replace("#", "");
        const currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
        e.preventDefault;
      });
    }
  }

  const popupCloseIcon = document.querySelectorAll("._close-popup");
  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener("click", function (e) {
        popupClose(el.closest("._popup"));
        e.preventDefault;
      });
    }
  }

  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      const popupActive = document.querySelector("._popup._active");
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      currentPopup.classList.add("_active");
      currentPopup.addEventListener("click", function (e) {
        if (!e.target.closest("._popup__container")) {
          popupClose(e.target.closest("._popup"));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove("_active");
      if (doUnlock) {
        bodyUnlock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue =
      window.innerWidth -
      document.querySelector(".wrapper").offsetWidth +
      "px";

    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add("_locked");

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnlock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = "0px";
        }
      }
      body.style.paddingRight = "0px";
      body.classList.remove("_locked");
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const popupActive = document.querySelector("._popup._active");
      popupClose(popupActive);
    }
  });
}
