const categoryBox = document.querySelector("ul.menu");
const allTreesBtn = document.getElementById("all-trees-btn");
const treeBox = document.querySelector(".tree-box");
const cartItems = document.querySelector(".cart-items");
const totalPrice = document.getElementById("total-price");
const spinner = document.getElementById("spinner");

let cart = [];

// show / hide spinner
const showSpinner = () => spinner.classList.remove("hidden");
const hideSpinner = () => spinner.classList.add("hidden");

const loadCategories = async () => {
  showSpinner();
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories"
  );
  const data = await res.json();
  hideSpinner();

  data?.categories?.forEach((cat) => {
    const li = document.createElement("li");
    li.innerHTML = `<a data-id="${cat.id}">${cat?.category_name}</a>`;
    categoryBox.appendChild(li);

    li.addEventListener("click", () => {
      document.querySelectorAll("ul.menu li a")?.forEach((el) => {
        el.classList.remove("bg-green-700", "text-white");
      });
      li.querySelector("a").classList.add("bg-green-700", "text-white");
      allTreesBtn.classList.remove("bg-green-700", "text-white");
      loadCategoryTrees(cat.id);
    });
  });
};

allTreesBtn.addEventListener("click", () => {
  document.querySelectorAll("ul.menu li a").forEach((el) => {
    el.classList.remove("bg-green-700", "text-white");
  });
  allTreesBtn.classList.add("bg-green-700", "text-white");
  loadAllTrees();
});

const loadCategoryTrees = async (id) => {
  treeBox.innerHTML = "";
  showSpinner();
  const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${id}`
  );
  const data = await res.json();
  hideSpinner();
  renderTrees(data.plants);
};

const loadAllTrees = async () => {
  treeBox.innerHTML = "";
  showSpinner();
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  hideSpinner();
  renderTrees(data.plants);
};

const renderTrees = (trees) => {
  trees?.forEach((tree) => {
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow-sm";

    card.innerHTML = `
      <figure class="p-1">
        <img src="${tree.image}" alt="${tree.name}" class="rounded-xl h-48 w-full object-cover" />
      </figure>
      <div class="p-2">
        <h2 class="card-title mt-2 cursor-pointer text-green-700 hover:underline" data-id="${tree.id}">
          ${tree.name}
        </h2>
        <p class="text-gray-600 text-sm">${tree?.description}</p>
        <div class="flex justify-between items-center mt-2 font-medium">
          <p class="bg-green-200 rounded-3xl p-1 px-2">${tree.category}</p>
          <p>৳${tree.price}</p>
        </div>
        <div class="mt-2">
          <button class="btn w-full bg-[#15803D] rounded-2xl text-white border-none" data-add="${tree.id}">
            Add to Cart
          </button>
        </div>
      </div>
    `;

    card
      .querySelector("button")
      .addEventListener("click", () => addToCart(tree));
    card
      .querySelector("h2")
      .addEventListener("click", () => showModal(tree.id));

    treeBox.appendChild(card);
  });
};

const showModal = async (id) => {
  showSpinner();
  const res = await fetch(
    `https://openapi.programming-hero.com/api/plant/${id}`
  );
  const data = await res.json();
  hideSpinner();

  const tree = data.plants;
  const modal = document.createElement("dialog");
  modal.className = "modal";
  modal.open = true;

  modal.innerHTML = `
    <div class="modal-box">
      <h3 class="font-bold text-lg">${tree.name}</h3>
      <img src="${tree.image}" alt="${tree.name}" class="w-full h-52 object-cover rounded-md mt-2" />
      <p class="mt-2 text-sm text-gray-600">${tree.description}</p>
      <p class="mt-2 font-semibold">Category: ${tree.category}</p>
      <p class="font-semibold">Price: ৳${tree.price}</p>
      <div class="modal-action">
        <button class="btn bg-green-700 text-white">Close</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  modal.querySelector("button").addEventListener("click", () => modal.remove());
};

// Add to cart
const addToCart = (tree) => {
  const existing = cart.find((item) => item.id === tree.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...tree, quantity: 1 });
  }
  alert(`"${tree.name}" has been added to your cart!`);
  renderCart();
};

// show cart items
const renderCart = () => {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className =
      "flex justify-between items-center bg-[#f0fdf4] p-2 rounded-lg mt-2 mb-2";
    div.innerHTML = `
      <div>
        <h1>${item.name}</h1>
        <h1 class="text-gray-400">৳${item.price} x ${item.quantity}</h1>
      </div>
      <i class="fa-solid fa-x cursor-pointer text-red-600"></i>
    `;

    div.querySelector("i").addEventListener("click", () => {
      cart = cart.filter((c) => c.id !== item.id);
      renderCart();
    });

    cartItems.appendChild(div);
  });

  totalPrice.innerText = `৳${total}`;
};

// data load
loadCategories();
loadAllTrees();