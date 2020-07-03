let orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time && product && table) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject('no podemos hacer tu pedido')
    }
  });
};



const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randonTime = () => 1000 * ((Math.floor(Math.random() * 10) % 8) + 1);

const waiter = () => {
  orders(randonTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))

};

const waiter2 = () => {
  orders(randonTime(), menu.hotdog, table[0])
    .then((res) => console.log(res));
  return orders(randonTime(), menu.pizza, table[2])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
}

const waiter3 = async () => {
    try {
    await orders(randonTime(), menu.hamburger, table[2])
    .then((res) => console.log(res));
    const res_1 = await orders(randonTime(), menu.pizza, table[2]);
    console.log(res_1)
    const res_2 = await orders(randonTime(), menu.hotdog, table[2]);
    return console.log(res_2)
  }
  catch (err) {
    return console.error(err);
  }

}

waiter();
waiter2();
waiter3();
randonTime();