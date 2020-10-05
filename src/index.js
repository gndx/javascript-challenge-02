const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time && product && table) {
      setTimeout(() => {
        resolve(
          `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
        );
      }, time);
    } else {
      reject(`Tuvimos problemas con tu pedido`);
    }
  });
};

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza",
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

const randomTime = () => 1000 * ((Math.floor(Math.random() * 10) % 8) + 1);

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0]).then((res) => console.log(res));
  return orders(randomTime(), menu.pizza, table[2])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

async function waiter3() {
  try {
    const allOrders = [
      await orders(randomTime(), menu.hotdog, table[1]),
      await orders(randomTime(), menu.pizza, table[1]),
      await orders(randomTime(), menu.hotdog, table[1]),
    ];
    const res_1 = await Promise.all(allOrders);
    console.log(res_1);
  } catch (err) {
    console.log(err);
  }
}

waiter();
waiter2();
waiter3();
