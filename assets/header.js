// Handle scroll event to control element visibility
class ScrollElementController {
  constructor(element, elementClass) {
    this.element = document.querySelector(element);
    this.elementToggleClass = elementClass;
    this.prevScrollPos = window.scrollY;
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }
  handleScroll() {
    const currentScrollPos = window.scrollY;
    if (this.prevScrollPos > currentScrollPos) {
      this.element.classList.remove(this.elementToggleClass);
    } else {
      this.element.classList.add(this.elementToggleClass);
    }
    this.prevScrollPos = currentScrollPos;
  }
}
const scrollHeader = new ScrollElementController(".header", "hide-header");

// Define a controller class for managing toggle behavior
class ToggleController {
  constructor(openSelector, closeSelector, element) {
    this.openToggle = document.querySelector(openSelector);
    this.closeToggle = document.querySelector(closeSelector);
    this.overlay = document.querySelector(".overlay");
    this.element = document.querySelector(element);

    this.openToggle.addEventListener("click", this.handleOpenClick.bind(this));
    this.closeToggle.addEventListener(
      "click",
      this.handleCloseClick.bind(this)
    );
  }

  handleOpenClick() {
    this.element.classList.add("active");
    this.overlay.classList.add("showElement");
    document.body.style.overflow = "hidden";
  }

  handleCloseClick() {
    this.element.classList.remove("active");
    this.overlay.classList.remove("showElement");
    document.body.style.overflow = "auto";
  }
}
const toggleMenu = new ToggleController(
  ".hamburger",
  ".close",
  ".menu_container"
);

// Toggling dropdown visibility and caret icon rotation on click for menu links with caret icons

class MenuDropdownManager {
  constructor() {
    this.caretIcons = document.querySelectorAll(".icon-caret");
    this.caretIcons.forEach((icon) => {
      icon.addEventListener("click", () => this.toggleDropdown(icon));
    });
  }
  toggleDropdown(icon) {
    const menuLink = icon.closest(".menu-link");
    const dropdown = menuLink.querySelector(
      ".dropdown-child, .dropdown-grandchild"
    );
    dropdown.classList.toggle("active");
    const dropdown2 = menuLink.querySelector(".wrapper");
    dropdown2.classList.toggle("open");
    const iconCaret = menuLink.querySelector(".icon-caret");
    iconCaret.style.transform = dropdown.classList.contains("active")
      ? "rotate(0deg)"
      : "rotate(270deg)";
  }
}
const menuDropdownManager = new MenuDropdownManager();
