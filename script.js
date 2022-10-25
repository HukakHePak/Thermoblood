const Menu = {
  button: document.querySelector(".menu-btn"),
  buttonCapture: document.querySelector(".menu-btn-capture"),
  container: document.querySelector("nav"),
  items: document.querySelectorAll("nav ul li")
};

Menu.button.addEventListener("click", (event) =>
  isShown(Menu.container)
    ? hide(Menu.container) + off(Menu.button)
    : show(Menu.container) + on(Menu.button)
);

document.ontouchmove = console.log;

Menu.button.addEventListener("touchmove", (event) => {
  const left = event.touches[0].clientX;

  console.log(event);

  Menu.container.style.left = left + "px";
  Menu.button.style.left = left + "px";
});

Menu.button.addEventListener("touchend", (event) => {
  Menu.container.style.left = "";
  Menu.button.style.left = "";

  Menu.button.click();
  event.preventDefault();
});

Menu.items.forEach((item) =>
  item.addEventListener("click", () => {
    Menu.items.forEach(hide);
    show(item);
    hide(Menu.container);
    off(Menu.button);
  })
);

function show(element) {
  element.classList.add("active");
}

function hide(element) {
  element.classList.remove("active");
}

function isShown(element) {
  return element.classList.contains("active");
}

function on(element) {
  element.classList.add("selected");
}

function off(element) {
  element.classList.remove("selected");
}
