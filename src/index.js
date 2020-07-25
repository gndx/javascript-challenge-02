const minSeg = 1000
const maxSeg = 8000

const randomTime = () => Math.floor(Math.random() * (maxSeg - minSeg)) + minSeg;

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time <= randomTime()){
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  } else{
    reject(`=== Disculpa la demora, estamos preparando ${product}`);
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
  orders(6000, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime, menu.hotdog, table[0])
  .then(res => {
    console.log(res);
    return orders(randomTime, menu.pizza, table[2]);
  }) 
  .then(res => console.log(res))
  .catch(err => console.error(err));
};

async function waiter3() {
  try {
    const listOrders = [
      await orders(randomTime(), menu.hotdog, table[1]),
      await orders(randomTime(), menu.pizza, table[1]),
      await orders(randomTime(), menu.hotdog, table[1])
    ];
    const res = await Promise.all(listOrders);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}


waiter();
waiter2();
waiter3();