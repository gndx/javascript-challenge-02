const fetch = require("node-fetch");
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders/';


const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    true
      ? setTimeout(() => {
          resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
        }, time)
      :  reject ()
  });
};

const fetchOrders = async (apiUrl) => {
  try {
    const request = await fetch(apiUrl, { method: 'GET' });
    const data = await request.json();
    console.log(`### Orden: ${data.data}`);
    return new Promise((resolve, reject) => {
      true
        ? resolve(`=== Pedido servido: ${data.data}`)
        : reject('Al parecer no salio algo bien con la orden');
    });
  } catch (err) {
    return console.error(err);
  }
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

var randomTime = () => {
  return Math.floor(Math.random() * 8000) + 1000;
}

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () =>{
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => {
      console.log(res)
      return orders(randomTime(), menu.pizza, table[2])
    .then((res) => {
        console.log(res)
        })
    .catch((err) => console.error(err));
    });
};

const waiter3 = async () => {
  let ordersTable2 = [menu.hamburger,menu.hotdog, menu.pizza]
  let allOrders = ordersTable2.map(ordersTable => orders(randomTime(), ordersTable, table[1]))
  try{
    let todasLasOrdenes = await Promise.all(allOrders)
    console.log(todasLasOrdenes)
  }catch(err){
    console.error(err)
  }
}

const waiter4 = async (apiUrl) => {
  const orderOne = await fetchOrders(apiUrl);
  const orderTwo = await fetchOrders(apiUrl);
  const orderThree = await fetchOrders(apiUrl);
  const orderFour = await fetchOrders(apiUrl);
  let ordersTable2 = [orderOne, orderTwo, orderThree, orderFour]
  let allOrders = ordersTable2.map(ordersTable => orders(randomTime(), ordersTable, table[1]))
  try {
    let todasLasOrdenes = await Promise.all(allOrders)
    console.log(todasLasOrdenes)
  } catch (err) {
    console.error(err);
  }
}





/* waiter(); */
/* waiter2(); */
/* waiter3(); */
/* waiter3(); */
waiter4 (API)
