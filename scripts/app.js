class Store {
  #cartItems = Storage.getCart();

  constructor() {
    this.cartButton = document.getElementById("cart-info");
    this.cart = document.getElementById("cart");
    this.navbarToggler = document.querySelector(".navbar-toggler");
    this.cartBtns = document.querySelectorAll(".store-item-icon");
    this.cartData = document.querySelector(".data-cart");
    this.totalAmounts = document.getElementById("cart-total");
    this.itemsTotal = document.querySelector(".item-total");
    this.itemsCounts = document.getElementById("item-count");
    this.clearCartBtn = document.getElementById("clear-cart");
    this.showCart();
    this.controlCart();
    this.addItem();
    this.removeItem();
    this.clearCart();
  }

  // to check if user resize and cart is open
  controlCart() {
    window.addEventListener("resize", () => {
      if (
        window.innerWidth < 992 &&
        this.cart.classList.contains("show-cart")
      ) {
        this.cart.classList.remove("show-cart");
      }
    });
  }

  showCart() {
    this.cartButton.addEventListener("click", () => {
      this.cart.classList.toggle("show-cart");
    });
    this.navbarToggler.addEventListener("click", () => {
      if (this.cart.classList.contains("show-cart")) {
        this.cart.classList.remove("show-cart");
      }
    });
  }

  inCart(id) {
    return this.#cartItems.find((item) => item.id === id);
  }

  addItem() {
    this.cartBtns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        const fullPath = event.currentTarget.parentElement.children[0].src;
        const pos = fullPath.indexOf("img") + 3;
        const partPath = fullPath.slice(pos);

        const id = event.currentTarget.getAttribute("id");
        if (this.inCart(id)) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You can't add the same item to the cart!",
          });
          return;
        }

        const imgSrc = `img-cart${partPath}`;
        const title =
          event.currentTarget.parentElement.nextElementSibling.children[0]
            .children[0].textContent;
        const price =
          event.currentTarget.parentElement.nextElementSibling.children[0].children[1].textContent.trim();
        const finalPrice = +price.slice(1);

        const item = {};
        item.img = imgSrc;
        item.title = title;
        item.price = finalPrice;
        item.id = id;

        this.#cartItems.push(item);

        Storage.saveCart(this.#cartItems);
        this.updateCart();
        this.updateTotals();
        this.showMessage(item.title);
      });
    });
  }

  showMessage(title) {
    let regExp = /^\w+/;
    let finalTitle = title.match(regExp).join(" ");

    Swal.fire({
      icon: "success",
      title: "Done!",
      text: `${finalTitle} has added to the cart`,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  updateCart() {
    let result = "";
    this.#cartItems.map((item) => {
      result += `
        <!-- cart item -->
        <div class="cart-item d-flex justify-content-between text-capitalize my-3" id=${item.id}>
          <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt=${item.title}>
          <div class="item-text">
            <p id="cart-item-title" class="font-weight-bold mb-0">${item.title}</p>
            <span>$</span>
            <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
          </div>
          <span id='cart-item-remove' class="cart-item-remove" id=${item.id}>
            <i class="fas fa-trash"></i>
          </span>
        </div>
        <!-- end of cart item -->
      `;
    });

    this.cartData.innerHTML = result;
  }

  updateTotals() {
    const totals = this.#cartItems.reduce(
      (current, item) => current + item.price,
      0
    );

    this.totalAmounts.textContent = totals;
    this.itemsTotal.textContent = totals;
    this.itemsCounts.textContent = this.#cartItems.length;
  }

  removeItem() {
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("fa-trash")) {
        const id = event.target.parentElement.parentElement.id;
        const remainingItems = this.#cartItems.filter((item) => item.id !== id);
        this.#cartItems = remainingItems;

        Storage.saveCart(this.#cartItems);
        this.updateCart();
        this.updateTotals();
      }
    });
  }

  clearCart() {
    this.clearCartBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.#cartItems = [];

      Storage.clearCart();
      this.updateCart();
      this.updateTotals();
      this.closeCart();
    });
  }

  closeCart() {
    this.cart.classList.remove("show-cart");
  }
}

class Storage {
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  static clearCart() {
    localStorage.removeItem("cart");
  }
}

const store = new Store();

const logoBtn = document.querySelector(".navbar-brand");
document.addEventListener("DOMContentLoaded", () => {
  logoBtn.addEventListener("click", (e) => e.preventDefault());
  store.updateCart();
  store.updateTotals();
});
