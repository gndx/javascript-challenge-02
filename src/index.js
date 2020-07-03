const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (resolve) {
      setTimeout(() => {
         resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time)
    }else{
      reject(new Error('Hubo un error con el pedido.'))
    }
  })
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza'
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

// Funcion randonTime para mostrar tiempo aleatoriamente

const randomTime = (time) => {
  valor = Math.random(0,time )
  return Math.round(valor * 1000)
}

//Function modificada implementando la funcion randomTime
const waiter = () => {
  console.log("PRIMER PROBLEMA")
  orders(randomTime(8000), menu.hamburger, table[0])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

//  waiter();

//SEGUNDO PROBLEMA 
//Funcion Waiter2 con Promesas encadenadas, igualmente se está haciendo uso de la funcion randomTime

const waiter2 = () => {
  orders(randomTime(8000),menu.hotdog, table[0])
    .then((res) => {
      console.log(res)
      return orders(randomTime(8000),menu.pizza,table[2])
    })
    .then(res => {
      console.log(res)
    })
    .catch((err) => console.error(err));
};

//  waiter2();

//TERCER PROBLEMA  
//Funcion Waiter3 utilizando Async / Await

const waiter3 = async () => {
  console.log("TERCER PROBLEMA")
  try {
    const pedido3 = await orders(randomTime(8000),[menu.hotdog, menu.pizza, menu.hotdog],table[1])
    console.log(pedido3)
  } catch (error) {
    console.error(error)
  }
  
} 

//  waiter3()
//CUARTO PROBLEMA

let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders'

const fetchOrders = (url_api) => {
    return new Promise((resolve,reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', url_api, true);
        xhttp.onreadystatechange = (() => {
            if (xhttp.readyState === 4) {
                (xhttp.status === 200)
                    ? resolve(JSON.parse(xhttp.responseText))
                    : reject(new Error('Error', url_api))
            }
        });
        xhttp.send();
    });
};
 
 const waiter4 = async () => {
  try {
    const respuesta = await fetchOrders(API)
    const respuesta1 = await fetchOrders(API)
    const respuesta2 = await fetchOrders(API)
    const respuesta3 = await fetchOrders(API)
    console.log(`${respuesta.data}, ${respuesta1.data}, ${respuesta2.data} y ${respuesta3.data}` )
  } catch (error) {
    console.error(error)
  }
  
} 

waiter4();



