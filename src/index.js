const fetch = require('node-fetch');
const url = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time <= 6000) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);

    } else {
      reject(`*** Disculpa la demora, el ${product} tarda mas de ${time}seg en prepararse.`);
    }
  });
}

const randomTime = () => {
  let max = 8000;
  let min = 1000;
  return Math.round(Math.random() * (max - min) + min);
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

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => {
      console.log(res);
      return orders(randomTime(), menu.pizza, table[2])
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
}

async function waiter3() {
  try {
    var order1 = await orders(randomTime(), menu.hotdog, [1]);
    var order2 = await orders(randomTime(), menu.pizza, [1]);
    var order3 = await orders(randomTime(), menu.hotdog, [1]);
    console.log(`1- ${order1}`);
    console.log(`2- ${order2}`);
    console.log(`3- ${order3}`);
  } catch (err) {
    console.error(err);
  }
}

async function fetchOrders(){
  try{
    let response = await fetch(url);
    let data = await response.json();
    return data.data;
  }catch(err){
    console.error(err);
  }
}

async function waiter4(){
  try{
    let productOne = await fetchOrders();
    let productTwo = await fetchOrders();
    let productThree = await fetchOrders();
    let productFour = await fetchOrders();
  
    let orderOne = await orders(randomTime(), productOne, table[2]);
    let orderTwo = await orders(randomTime(), productTwo, table[2]);
    let orderThree = await orders(randomTime(), productThree, table[2]);
    let orderFour = await orders(randomTime(), productFour, table[2]);
    console.log(orderOne);
    console.log(orderTwo);
    console.log(orderThree);
    console.log(orderFour);
  }catch(err){
    console.error(err);
  }
}

//waiter();
//waiter2();
//waiter3();
waiter4();
//console.log(randomTime())
