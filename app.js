"strict";

const form = document.querySelector("form");
const cart = [];

// add a product with addEventListener of submit
// function that will happen when we click the submit button
form.addEventListener("submit", addProduct);

// attaching the event listener to the DOM which is the big parent
document.addEventListener("click", clickHandler)
function clickHandler(e){
    // targeting remove button
    if(e.target.className.includes("btn-danger")) deleteProduct(e.target);
    // targeting increase button
    if(e.target.className.includes("increase")) increaseQuantity(e.target);
    // targeting increase button
    if(e.target.className.includes("decrease")) decreaseQuantity(e.target);
 
}

// function of addproduct
function addProduct(e) {
  e.preventDefault();
  const nameProduct = document.querySelector("#add-name");
  const priceElement = document.querySelector("#add-price");
  const quantityElement = document.querySelector("#add-quantity");
  const imageElement = document.querySelector("#add-image");

  // create a card element that will be returned inside the HTML
  // 'div' will be created and appended in the product panel class
  const productCard = document.createElement("div");
  productCard.className = "card d-flex flex-row m-3 shadow";
  productCard.style.maxWidth = "390px";
  const productPrice = priceElement.value * 0.7;

  // create a product object that has all its keys in order to access them easily
  // through the product itself inside the array of the cart
  const product = {
    // creating a random id for each product
    id: Date.now(),
    name: nameProduct.value,
    originalPrice: priceElement.value,
    salePrice: productPrice.toFixed(2),
    image: imageElement.value,
    qty: quantityElement.value,
    totalPrice: Number(quantityElement.value) * Number(productPrice),
  };

  // putting this product in our product array
  cart.unshift(product);
  // invoking displayCart to display the product on the screen
  displayCart();
  calculateTotal();
  //append takes strings and nodes
  form.reset();
  
}

function displayCart() {
  const productPanel = document.querySelector("#product-panel");
  productPanel.innerHTML = "";
  // loop over the cart to display each product on the DOM
  const html = cart.map(
    (product) => `
        <div class="card d-flex flex-row m-3 shadow bg-light"
            style="max-width: 390px;" id=${product.id}> <img
            src="${product.image}"
            class="img-fluid w-50"
        />
        <div class="product details w-100 my-1">
            <h6>${product.name}</h6>
            <h3 class="text-warning">
                $${product.salePrice}
                <small class="text-decoration-line-through fs-6 text-dark"
                >${product.originalPrice}</small
            >
            </h3>
            <div
                class="d-flex bg-white border border-2 justify-content-center p-2 m-1"
            >
                <button class="btn btn-secondary btn-sm decrease">-</button>
                <input
                    type="text"
                    class="form-control border-0 bg-white quantity"
                    style="width: 50px"
                    readonly
                    value="${product.qty}"
                />
                <button class="btn btn-secondary btn-sm increase">+</button>
            </div>
            <div class="d-grid m-1">
                <button class="btn btn-danger">
                    <i class="fa-solid fa-trash p-1"></i>Remove
                </button>
            </div>
            <p class="m-1">
                Product Total:<span id="product-total" class="fs-6 fw-bold">$${Number(product.totalPrice).toFixed(2)}</span>
            </p>
        </div>
        `
  ).join("");

  //append child is only working with nodes only
  productPanel.innerHTML = html;
}

//increase quantity
// can use any 'name' inside the function eg: el, mark, etc.
function increaseQuantity(el){
    const parentId = Number(el.parentElement.parentElement.parentElement.id);
    // finding the product of this id 
    const product = cart.find((item) => item.id == parentId);
    // increase its quantity
    product.qty = Number(product.qty) + 1;
    // calculate the totalPrice of it
    product.totalPrice = Number(product.qty) * Number(product.salePrice);
    console.log("decrease");

    displayCart();
    calculateTotal();
};

//decrease quantity
function decreaseQuantity(el){
    const parentId = Number(el.parentElement.parentElement.parentElement.id);
    // finding the product of this id 
    const product = cart.find((item) => item.id == parentId);
    // decrease its quantity
    product.qty = Number(product.qty) - 1;
    // calculate the totalPrice of it
    product.totalPrice = Number(product.qty) * Number(product.salePrice);
    console.log("decrease");

    displayCart();
    calculateTotal();
};

//remove the product
function deleteProduct(el){
    const parentId = Number(el.parentElement.parentElement.parentElement.id);
    cart = cart.filter((prod) => prod.id === parentId);
    displayCart();
    calculateTotal();
};

//calculate total
function calculateTotal(){
    const shippingElement = document.querySelector(".shipping");
    const taxesElement = document.querySelector(".tax");
    const subtotalElement = document.querySelector(".subtotal");
    const totalElement = document.querySelector(".total");
    const shipping = 15;
    const taxes = 0.18;

    // calculate the taxes based on the total
    const subtotal = cart.reduce((acc, item) => acc + Number(item.totalPrice), 0);
    const taxAmount = subtotal * taxes;
    const total = taxAmount + shipping + subtotal;

    // if subtotal exists, we want the shipping, if not then 0
    shippingElement.textContent = subtotal ? shipping : 0;

    subtotalElement.textContent = subtotal.toFixed(2);
    totalElement.textContent = total.toFixed(2);
    taxesElement.textContent = taxAmount.toFixed(2);

}
