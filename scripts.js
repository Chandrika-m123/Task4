// To-Do List Functionality
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = tasks
    .map((task, index) => `<li>${task} <button onclick="deleteTask(${index})">X</button></li>`)
    .join('');
}

function addTask(e) {
  e.preventDefault();
  tasks.push(taskInput.value);
  taskInput.value = '';
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

taskForm.addEventListener('submit', addTask);
renderTasks();

// Product Page Functionality
const products = [
  { name: 'Rolex Submariner', price: 8000, rating: 4.8, brand: 'Rolex' },
  { name: 'Casio G-Shock', price: 120, rating: 4.5, brand: 'Casio' },
  { name: 'Omega Seamaster', price: 4500, rating: 4.7, brand: 'Omega' },
];

function renderProducts(filteredProducts) {
  const productList = document.getElementById('products');
  productList.innerHTML = filteredProducts
    .map(p => `<div>${p.name} - $${p.price} - Rating: ${p.rating} stars</div>`)
    .join('');
}

function filterAndSort() {
  const brand = document.getElementById('brand-filter').value;
  const sortOption = document.getElementById('sort-option').value;

  let filtered = products.filter(p => !brand || p.brand === brand);

  if (sortOption === 'price') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  renderProducts(filtered);
}

document.getElementById('brand-filter').addEventListener('change', filterAndSort);
document.getElementById('sort-option').addEventListener('change', filterAndSort);

renderProducts(products);
