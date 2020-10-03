const randomTime = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(MAth.random() * (max - min + 1) + min);
}




const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    try{
          setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, preparación ${time}ms para la ${table}`);
        }, time);
    }catch(err){
        reject(`Error during setup: ${err}`);
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

waiter();
