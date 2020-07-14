const minSegundos = 1000;
const maxSegundos = 8000;
const randomTime = () => Math.round(Math.random() * (maxSegundos - minSegundos) + minSegundos)

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
      if (resolve) {
        setTimeout(() => {
          resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
        }, time)
      }else{
        reject(`xxx Se esta presentando problemas con el pedido.`)
      }
  });
}

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(),menu.hotdog, table[0])
    .then(res => { console.log(res)
      return orders(randomTime(),menu.pizza,table[2])
    })
    .then(res => { console.log(res)
    })
    .catch((err) => console.error(err));
};

const waiter3 = async () => {
  var menus = [menu.hotdog, menu.pizza, menu.hotdog]
  try {
    const todo = menus.map(order => orders(randomTime(), order, table[1]))
    const allPromise = await Promise.all(todo)
    console.log(allPromise.toString())
  } catch (error) {
    console.log(error)
  }
} 

console.log("Cambie en el switch el problema que quiere ver.")

switch (3) { 
  case 1: 
    console.log("Primer Problema")
    waiter();
     break 
  case 2: 
    console.log("Segundo Problema")
    waiter2()
     break 
  case 3: 
    console.log("Tercer Problema")
    waiter3()
     break 
  default: 
     console.log("El Problema no existe.")
}
