const fetch = require("node-fetch");
const MAX = 8000;
const BASE_URL = "https://us-central1-escuelajs-api.cloudfunctions.net/orders";

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];
const randomTime = () => Math.floor(Math.random() * (MAX - 1000) + 1000)

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {

    if (time <= randomTime()) {

      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);

      }, time);
    } else {

      reject(`***Estamos presentando demoras en la preparación `)
    }

  });
}

const waiter = () => {
  orders(6000, menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then(res => console.log(res))
    .catch(err => console.error(err));

  orders(randomTime(), menu.pizza, table[2])
    .then(res => console.log(res))
    .catch(err => console.error(err));

}

const waiter3 = async () => {

  try {

    const arrayMenu = Object.values(menu)
    const allOrders = arrayMenu.map(order => orders(randomTime(), order, table[1]))

    const allPromise = await Promise.all(allOrders)
    console.log(allPromise.toString())
  } catch (error) {

    console.log(error)

  }

}

const fetchOrders = async () => {

  try {
    const response = await fetch(BASE_URL)
    const dataOrder = await response.json()
    const nameOrder = await dataOrder.data
    return console.log(nameOrder)

  } catch (err) {
    console.error(`Error inesperado procesando la orden`, err)
  }

}

waiter()
waiter2()
waiter3()
fetchOrders()