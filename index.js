
const numberInput = document.getElementById('input');
const sendBtn = document.getElementById('button');
const tasksContainer = document.getElementById('container');

let taskList = JSON.parse(localStorage.getItem('taskList')) || null;

const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];


const isValidPizzaId = (id) => {

  return pizzas.some(pizza => pizza.id === id);
}

const renderPizza = (pizza) => {
 
  const pizzaCard = document.createElement('div');
  pizzaCard.classList.add('pizza-card');

  const pizzaImage = document.createElement('img');
  pizzaImage.src = pizza.imagen;

  const pizzaName = document.createElement('h2');
  pizzaName.textContent = pizza.nombre;

  const pizzaPrice = document.createElement('p');
  pizzaPrice.textContent = `Precio: $${pizza.precio}`;

  pizzaCard.appendChild(pizzaImage);
  pizzaCard.appendChild(pizzaName);
  pizzaCard.appendChild(pizzaPrice);


  tasksContainer.innerHTML = '';
  

  tasksContainer.appendChild(pizzaCard);


  localStorage.setItem('taskList', JSON.stringify(pizza));
}

const renderError = (message) => {

  const errorContainer = document.createElement('div');
  errorContainer.classList.add('error');
  errorContainer.textContent = message;

  tasksContainer.innerHTML = '';
  tasksContainer.appendChild(errorContainer);
}

const searchPizza = () => {
  const inputValue = parseInt(numberInput.value);

  if (isNaN(inputValue)) {
    renderError('Ingresa un número válido.');
    return;
  }

  if (isValidPizzaId(inputValue)) {
    const foundPizza = pizzas.find(pizza => pizza.id === inputValue);
    renderPizza(foundPizza);
  } else {
    renderError('No se encontró una pizza con ese ID.');
  }
}

const init = () => {

  if (taskList) {
    renderPizza(taskList);
  }

  sendBtn.addEventListener('click', searchPizza);
}

init();
