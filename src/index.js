const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time >= 1000 && time <= 8000){
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  } else {
      reject(new Error('Error: the attention time must be between 1000ms and 8000ms'))
    }
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomtime = (minimumTime, maximumTime) =>{
  return Math.floor (Math.random() * (maximumTime - minimumTime)) + minimumTime;
}

const waiter = () => {
  orders(randomtime(1000, 8000), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter();

const waiter2 = () => {
  orders(randomtime(1000, 8000), menu.hotdog, table[0])
    .then((res) => {
      console.log(res)
      return orders(randomtime(1000, 8000), menu.pizza, table[2]);
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter2();