const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = "https://us-central1-escuelajs-api.cloudfunctions.net/orders";
const xhttp = new XMLHttpRequest();

const statusCompleted = 4
const statusSuccessful = 200

const fetchOrders = url_api => {
  return new Promise((resolve, reject) => {
    try {
      xhttp.open('GET', url_api, false)
      xhttp.onreadystatechange = (event) => {
        if(xhttp.readyState === statusCompleted) {
          if(xhttp.status === statusSuccessful) {
            resolve(JSON.parse(xhttp.responseText))
          }
        }
      }
    } catch (error) {
      reject(`Ha ocurrido un Error ${error}`)
    }
    xhttp.send();
    })
  }

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } catch (error) {
      reject(`Ha ocurrido un Error ${error}`)
    }
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomTime = () => {
  const timeMin = 1000
  const timeMax = 8000

  const numAleatorio = Math.floor(Math.random() * (timeMax - timeMin)) + timeMin;
  return numAleatorio
}

const waiter = () => {
  orders(6000, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => {
      console.log(res)
      return orders(randomTime(), menu.pizza, table[2])
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter3 = async () => {
  try {
    const order1 = await orders(randomTime(), menu.hotdog, table[1])
    const order2 = await orders(randomTime(), menu.pizza, table[1])
    const order3 = await orders(randomTime(), menu.hamburger, table[1])
    console.log(order1)
    console.log(order2)
    console.log(order3)

  } catch (error) {
    console.log(`Ha ocurrido un Error ${error}`)
  }
};

const waiter4 = async () => {
  try {
    console.log('Solicitando Pedidos...')
    const order1 = await fetchOrders(API)
    const order2 = await fetchOrders(API)
    const order3 = await fetchOrders(API)
    const order4 = await fetchOrders(API)

    console.log(`=== Pedido servido: ${order1.data}`)
    console.log(`=== Pedido servido: ${order2.data}`)
    console.log(`=== Pedido servido: ${order3.data}`)
    console.log(`=== Pedido servido: ${order4.data}`)

  } catch (error) {
    console.log(`Ha ocurrido un Error ${error}`)
  }
};

//Primer Problema
waiter();

//Segundo Problema
waiter2();

//Tercer Problema
waiter3();

//Cuarto Problema - API
waiter4();
