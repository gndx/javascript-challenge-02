const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`); 
    },time);
    if(!time || !product || !table) {
      reject(new Error('Ingresa los datos para generar la orden'));
    }
  });
}

const randomTime = (maximumT, minimumT) => Math.round(Math.random() * (maximumT - minimumT) + minimumT);
  
const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
}
const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];
const API = "https://us-central1-escuelajs-api.cloudfunctions.net/orders";
const fetch = require("node-fetch");

const waiter = () => {
  orders(6000, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(1000,8000), menu.hotdog, table[0])
    .then((res) => {
      console.log(res);
      return orders(randomTime(1000,8000), menu.pizza, table[2]);
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(`Hay una equivicación con el servicio 2 : ${err}`));
};

async function waiter3(){
  let order = [ menu.hotdog, menu.pizza, menu.hotdog];
  let promises = order.map(menus => orders(randomTime(1000,8000), menus, table[1]))
  try{
    let askOrders = await Promise.all(promises);
    console.log(askOrders);
  }catch(menus){
    console.error(`Hay una equivicación con el servicio 3 : ${menus}`)
  } 
};

const fetchOrders = async () => {
  try {
    const response = await fetch(API);
    let ordersResponse = await response.json();
    return ordersResponse.data;
  } catch (error) {
    console.log(`Hay una falla para recibir la orden: ${error}`);
  }
};

const waiter4 = async () => {
  try {
    const ordersReceived = await Promise.all([
      fetchOrders(),
      fetchOrders(),
      fetchOrders(),
      fetchOrders()
    ]);

    ordersReceived.forEach(table => {
      if (table.error) {
        console.log(`Ocurrió un error: ${error}`);
      }
    });

    const tables = [
      orders(randomTime(1000, 8000), ordersReceived[0], table[4]),
      orders(randomTime(1000, 8000), ordersReceived[1], table[4]),
      orders(randomTime(1000, 8000), ordersReceived[2], table[4]),
      orders(randomTime(1000, 8000), ordersReceived[3], table[4])
    ];

    const serveTables = await Promise.all(tables);
    console.log(serveTables[0]);
    console.log(serveTables[1]);
    console.log(serveTables[2]);
    console.log(serveTables[3]);
  } catch (error) {
    console.log(`Hay una equivocación con el servicio 4: ${error}`);
  }
};

waiter();
waiter2();
waiter3();
waiter4();

