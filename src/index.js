const fetch = requier('node-fetch');

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (true) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject(new Error('El pedido no se ha completado'))
    }
  });
}

//Problema 1
const randomTime = () => {
let max = 8000;
let min = 1000;
return Math.round(Math.random() * (max - min) * min);
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

//Problema 2
//Pedido "Mesa 1": Combo Hotdog Pedido "Mesa 3": Combo Pizza
const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => {
      console.log(res)
      return orders(randomTime(), menu.pizza, table[2])
    })
    .then(res => console.log(res))
    .catch(error => console.log(error))
}

//Problema 3:
//Pedido "Mesa 2": Combo Hotdog, Combo Pizza, Combo Hotdog

const waiter3 = async () => {
  try {
    const firstOrder = await orders(randomTime(), menu.hotdog, table[1]);
    const secondOrder = await orders(randomTime(), menu.pizza, table[1]);
    const thirdOrder = await orders(randomTime(), menu.hamburger, table[1]);

    console.log("firstOrder", firstOrder)
    console.log("secondOrder", secondOrder)
    console.log("thirdOrder", thirdOrder)
  } catch (e) {
    console.error(new Error('Se presento un problema con el pedido!'));
  }
}

//Problema 4

const fetchOrders = async () => {
  const API = "https://us-central1-escuelajs-api.cloudfunctions.net/orders";
  try {
    const response = await fetch(API);
    const data = await response.json();
    return data.data;
  } catch (e) {
    console.log(e);
  }
}

const waiter4 = async () => {
  const product4 = await fetchOrders();
  const firstOrder = await orders(randomTime(), menu.hotdog, table[3]);
  const secondOrder = await orders(randomTime(), menu.pizza, table[3]);
  const thirdOrder = await orders(randomTime(), menu.hamburger, table[3]);
  const fourtOrder = await orders(randomTime(), product4, table[3]);

  console.log("firstOrder", firstOrder)
  console.log("secondOrder", secondOrder)
  console.log("thirdOrder", thirdOrder)
  console.log("fourtOrder", fourtOrder)
}

// waiter();
// waiter2();
// waiter3();
waiter4();

