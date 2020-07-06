var min = 1000;
var max = 8000;

function randomTime (min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}
var x = randomTime (min, max);
randomTime(min, max);

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  }); fail(() => reject(time, product, table))
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(x+3, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter();

const waiter2 = () => {
  orders(x, menu.hotdog, table[0])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};
    orders(x+1, menu.pizza, table[2])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
waiter2();

const waiter3 = async () => {
  try{
     const orden= await orders();
   orders(8005, menu.pizza, table[1])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

  orders(8005, menu.hotdog, table[1])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

    orders(8005, menu.hotdog, table[1])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
    
    } catch (err) {
        console.log(err);
      } 
  }
waiter3();
