const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if(time <= 6000){
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);

    }else{
      reject(`*** Disculpa la demora, el ${product} tarda mas de ${time}seg en prepararse.`);
    }
  });
}

const randomTime = () => {
  let max = 8000;
  let min = 1000;
  return Math.round(Math.random() * (max - min) + min);
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
  .then((res) => {
    console.log(res);
    return orders(randomTime(), menu.pizza, table[2])
    })
    .then((res) => {
    console.log(res);
    })      
    .catch((err) => console.error(err));
}
//waiter();
waiter2();
//console.log(randomTime())
