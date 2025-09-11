const categoryBox = document.querySelector("ul.menu");
const allTreesBtn = document.getElementById("all-trees-btn");




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


// data load
loadCategories();
loadAllTrees();