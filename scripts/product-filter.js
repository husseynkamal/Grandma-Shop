class ClickProducts {
  constructor() {
    this.products = document.querySelectorAll(".store-item");
    this.input = document.getElementById("search-item");
    this.buttons = document.querySelectorAll(".filter-btn");
    this.errorParagraph = document.querySelector(".error");
    this.filter();
  }

  disableButtons(dataSet) {
    if (dataSet !== "all") {
      this.input.value = "";
      this.input.disabled = true;
      return;
    }

    this.input.disabled = false;
  }

  removeButtonsClass() {
    this.buttons.forEach((button) => {
      button.classList.remove("active-class");
    });
  }

  scaleDown(product) {
    product.style.transition = "0.5s";
    product.style.transform = "scale(0)";

    setTimeout(() => {
      product.style.display = "none";
    }, 500);
  }

  scaleUp(product) {
    setTimeout(() => {
      product.style.display = "block";
    }, 500);

    setTimeout(() => {
      product.style.transition = "0.5s";
      product.style.transform = "scale(1)";
    }, 550);
  }

  show(dataSet) {
    this.products.forEach((product) => {
      const productDataSet = product.dataset.item;

      this.scaleDown(product);

      if (dataSet === "all" || dataSet === productDataSet) {
        this.scaleUp(product);
      }
    });
  }

  filter() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();

        if (this.errorParagraph.style.display === "block") {
          setTimeout(() => {
            this.errorParagraph.style.display = "none";
          }, 500);
        }

        const buttonDataSet = event.currentTarget.dataset.filter;
        this.disableButtons(buttonDataSet);

        if (button.classList.contains("active-class")) {
          return;
        }

        this.removeButtonsClass();
        button.classList.add("active-class");

        this.show(buttonDataSet);
      });
    });
  }
}

class KeyupProducts extends ClickProducts {
  constructor() {
    super();
  }

  filterHandler(uniqueDataSets) {
    const keyword = this.input.value.toLowerCase();

    const filteredDataSets = uniqueDataSets.filter(
      (set) => set.indexOf(keyword) > -1
    );

    this.products.forEach((product) => {
      product.style.display = "none";

      const dataSet = product.dataset.item;
      if (filteredDataSets.indexOf(dataSet) > -1) {
        product.style.display = "block";
      }
    });

    if (filteredDataSets.length === 0) {
      this.errorParagraph.style.display = "block";
    } else {
      this.errorParagraph.style.display = "none";
    }
  }

  filter() {
    const dataSets = [...this.products].map((product) => product.dataset.item);

    const uniqueDataSets = [...new Set(dataSets)];

    this.input.addEventListener(
      "keyup",
      this.filterHandler.bind(this, uniqueDataSets)
    );
  }
}

new ClickProducts();
new KeyupProducts();
