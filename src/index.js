const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
const xhttp = new XMLHttpRequest();


const fetchOrders = (url_api) => {
  xhttp.responseType = 'json';
  xhttp.open('GET', url_api, true);
  xhttp.send();
  return new Promise((resolve, reject) => {
  xhttp.onreadystatechange = (event) => {
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200){
		const response = JSON.parse(xhttp.responseText);  
        resolve(response);
	  }
      else reject(Error(`No fue posible entregar la petición desde ${url_api}`));
    }
  }
 })
}


const randomTime = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
	try{
	   setTimeout(() => {
          resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
          }, time);
	}catch(err){
	   reject(Error(`Error durante la entrega del pedido: ${err}`));
	}  

  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(1000, 8000), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(1000, 8000), menu.hotdog, table[0])
    .then((res) => console.log(res));
	return orders(randomTime(1000, 8000), menu.pizza, table[2])
	 .then((res) => console.log(res))
     .catch((err) => console.error(err));
};

const waiter3 = async() => {
	try{
		const order1 = await orders(randomTime(1000, 8000), menu.hotdog, table[1])
		console.log(order1)
		const order2 = await orders(randomTime(1000, 8000), menu.pizza, table[1])
		console.log(order2)
		const order3 = await orders(randomTime(1000, 8000), menu.hotdog, table[1])
		console.log(order3)
	}catch(err){
		console.error(err)
	}
};

const waiter4 = async() => {
	try{
		const order1 = await fetchOrders(API)
		console.log(`=== Pedido servido: ${order1.data}`)
		const order2 = await fetchOrders(API)
		console.log(`=== Pedido servido: ${order2.data}`)
		const order3 = await fetchOrders(API)
		console.log(`=== Pedido servido: ${order3.data}`)
		const order4 = await fetchOrders(API)
		console.log(`=== Pedido servido: ${order4.data}`)
	}catch(err){
		console.log(`Error durante la entrega del pedido: ${err}`)
	}
};


waiter();
waiter2();
waiter3();
waiter4();