const min = 1000;
const max = 8000;

const randomTime = (max, min) => Math.round(Math.random() * (max - min) + min);
console.log(randomTime)

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(randomTime(max,min) <= time){
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
        
      } else {
        reject(`=== Orden fuera del tiempo establecido`);
        }
    },time);    
  }); 
}


const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(6000, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};
const waiter2 = () => {
  orders(6000, menu.hotdog, table[0])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

  orders(6000, menu.pizza, table[2])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
};



async function waiter3(){
  const order = [menu.hotdog, menu.pizza, menu.hotdog];
  const promesas = order.map(pedido => orders(7000, pedido, table[1]));
  try {
    const ordersTable = await Promise.all(promesas);
    console.log(ordersTable);
    console.log(`Su Orden esta lista ${table[1]} por favor acerquese a retirarla`);
  } catch  {
    console.log(`=== Orden sin terminar`);
  }
} 


waiter();
waiter2()
waiter3()
