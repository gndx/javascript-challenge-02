const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      reject(new Error("Error!"));
    }, time);
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];


const randomTime = () => {
  const min = 1000;
  const max = 8000;
  return Math.round(Math.random() * (max - min)) + min;
};

const waiter = () => {
  orders(6000, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter()


const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then(res => {
      console.log(res);
      return orders(randomTime(), menu.pizza, table[2]);
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

waiter2()

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
waiter3();

