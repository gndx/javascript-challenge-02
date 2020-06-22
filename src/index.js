const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const urlApi = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders'
const xhttp = new XMLHttpRequest()
let orderCount =[0, 0, 0, 0, 0];
let ordersTable = [one=[], two=[], three=[], four=[], five=[]]

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  let n = table.charAt(table.length-1)
  ordersTable[n-1][orderCount[n-1]]= product 
  orderCount[n-1]++
  return new Promise((resolve, reject) => {
    if (resolve){
      setTimeout(() => {
        if(orderCount[n-1] === 1){
        resolve(`=== Pedido servido: ${ordersTable[n-1].map((order)=>order)}, tiempo de preparación ${time}ms para la ${table}`);
        orderCount[n-1]=0
      }else orderCount[n-1]--

      }, time);
    }else reject(new Error('Error al ejecutar orders =('))
  });
}

const fetchOrders = (url) =>{
  xhttp.open('GET', url, false)
  return new Promise((response, reject) => {
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4){
        if (xhttp.status === 200){
          const res = JSON.parse(xhttp.responseText)
          return response(res)
        }else return reject(new Error('Error al ejecutar fetch =('))
      }
    }
    xhttp.send()
  })
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomTime = () => Math.floor(Math.random() * (8000 - 1000) + 1000)

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiterTwo = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
  orders(randomTime(), menu.pizza, table[2])
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
}

const waiterThree = () => {
  orders(randomTime(), menu.hotdog, table[1])
      .then((res) =>console.log(res))
      .catch((err) => console.error(err))
  orders(randomTime(), menu.pizza, table[1])
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  orders(randomTime(), menu.hotdog, table[1])
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
}

const waiterFour = async(url) => {
try{
  const pedido1 = await fetchOrders(url)
  orders(randomTime(), pedido1.data, table[4])
  .then((res) => console.log(res))
  .catch((err) => console.error(err))
  const pedido2 = await fetchOrders(url)
  orders(randomTime(), pedido2.data, table[4])
  .then((res) => console.log(res))
  .catch((err) => console.error(err))
  const pedido3 = await fetchOrders(url)
  orders(randomTime(), pedido3.data, table[4])
  .then((res) => console.log(res))
  .catch((err) => console.error(err))
  const pedido4 = await fetchOrders(url)
  orders(randomTime(), pedido4.data, table[4])
  .then((res) => console.log(res))
  .catch((err) => console.error(err))
}catch (error) {console.log(error)}
}

waiter()
waiterTwo()
waiterThree()
waiterFour(urlApi)