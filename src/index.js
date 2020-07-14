const max = 8000;

const min = 1000;

const randomTime = (max, min) => {
  return Math.round(Math.random() * (max - min)) + min;
}

const orders = (time, product, table) => {
  console.log(`Orden ###: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if(randomTime(max, min) <= time) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    }
    else {reject(new Error(Error))};
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

waiter();
