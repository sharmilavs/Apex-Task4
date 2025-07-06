      document.getElementById("enter-btn").addEventListener("click", function () {
      document.getElementById("welcome-screen").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    });

  // Navigation
  function showSection(id) {
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  // Contact Form
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("contactSuccess").style.display = "block";
    setTimeout(() => {
      this.reset();
      document.getElementById("contactSuccess").style.display = "none";
    }, 3000);
  });

  // To-Do App
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, i) => {
      const li = document.createElement('li');
      li.className = todo.completed ? 'completed' : '';
      li.innerHTML = `
        <span onclick="toggleComplete(${i})">${todo.text}</span>
        <button class="delete-btn" onclick="deleteTodo(${i})">Delete</button>
      `;
      todoList.appendChild(li);
    });
  }

  function toggleComplete(i) {
    todos[i].completed = !todos[i].completed;
    saveTodos();
  }

  function deleteTodo(i) {
    todos.splice(i, 1);
    saveTodos();
  }

  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
  }

  todoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    todos.push({ text: todoInput.value, completed: false });
    todoInput.value = '';
    saveTodos();
  });

  renderTodos();

  // Products
  const products = [
    {
      name: "Headphones",
      category: "Electronics",
      price: 1000,
      rating: 4.5,
      image: "https://tse1.mm.bing.net/th/id/OIP.FE6EM00RYaxgQGC72ltDiwHaHa?pid=ImgDet&w=474&h=474&rs=1&o=7&rm=3"
    },
    {
      name: "T-Shirt",
      category: "Clothing",
      price: 500,
      rating: 4.2,
      image: "https://cdn-images.farfetch-contents.com/16/19/19/66/16191966_33182206_1000.jpg"
    },
    {
      name: "Smartphone",
      category: "Electronics",
      price: 15000,
      rating: 4.7,
      image: "https://www.dhani.com/services/wp-content/uploads/2022/02/xiaomi-redmi-note-9.jpg.pagespeed.ce.HK6mDTezPI.jpg"
    },
    {
      name: "Kurti",
      category: "Clothing",
      price: 1200,
      rating: 4.0,
      image: "https://www.jiomart.com/images/product/500x630/rvvzt3bek7/khichdi-fashion-women-kurta-pant-set-product-images-rvvzt3bek7-0-202402280552.jpg"
    }
  ];

  const productGrid = document.getElementById('productGrid');
  const filter = document.getElementById('filter');
  const sort = document.getElementById('sort');

  function displayProducts(items) {
    productGrid.innerHTML = '';
    items.forEach(p => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Category: ${p.category}</p>
        <p>Price: ₹${p.price}</p>
        <p>Rating: ⭐${p.rating}</p>
      `;
      productGrid.appendChild(div);
    });
  }

  function applyFilters() {
    let filtered = [...products];
    const category = filter.value;
    const sortBy = sort.value;

    if (category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    displayProducts(filtered);
  }

  filter.addEventListener('change', applyFilters);
  sort.addEventListener('change', applyFilters);
  displayProducts(products);