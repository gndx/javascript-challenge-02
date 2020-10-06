const min = 1000;
const max = 8000;

function randomTime() {
  var numPosibilidades = max - min;
  var aleat = Math.random() * numPosibilidades;
  aleat = Math.round(aleat);
  return parseInt(min) + aleat;
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!time || !product || !table)
        reject("El mesero se comio su comida. Lo sentimos");

      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
      );
    }, time);
  });
};

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza",
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter();
