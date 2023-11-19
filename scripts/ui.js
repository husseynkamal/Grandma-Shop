const sections = document.querySelectorAll("section");

const scrollNavigation = () => {
  const links = document.querySelectorAll(".nav-link");

  links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      sections[index].scrollIntoView({ behavior: "smooth" });
    });
  });
};

scrollNavigation();

const exploreButton = () => {
  const exploreBtn = document.querySelector(".text-center a");
  const aboutBtn = document.querySelector(".about-btn");
  const section = sections[2];

  exploreBtn.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: section.offsetTop, behavior: "smooth" });
  });

  aboutBtn.addEventListener("click", (event) => {
    event.preventDefault();
  });
};

exploreButton();

const orderCakes = () => {
  const orderBtns = document.querySelectorAll(".order-btn");
  for (const btn of orderBtns) {
    btn.addEventListener("click", (event) => {
      const cake = {};

      const cakeSrcImg =
        event.currentTarget.nextElementSibling.nextElementSibling.src;
      const title =
        event.currentTarget.parentElement.previousElementSibling.textContent;
      const id = event.currentTarget.id;
      const price = +prompt("What price do you want for this cake?", 5);

      cake.img = cakeSrcImg;
      cake.title = title;
      cake.price = price;
      cake.id = id;

      /*
        Warnning: now we can pass to cart array but I kept it in console cuz,
        I want to make all sweets items only available to buy.
      */

      console.log(cake);
    });
  }
};

orderCakes();

const backToTop = () => {
  const toTopBtn = document.querySelector(".to-top");
  window.addEventListener("scroll", () => {
    if (scrollY > 200) {
      toTopBtn.classList.add("animate");
    } else {
      toTopBtn.classList.remove("animate");
    }
  });

  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

backToTop();
