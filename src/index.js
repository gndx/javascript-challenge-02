const min = 1000;
const max = 8000;
//creacion de function  randomTime pedida
const randomTime = (max, min) => Math.round(Math.random() * (max - min) + min);
console.log(randomTime)

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(randomTime(max,min) <= time){
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
        
      } else {
        reject(`=== Orden fuera del tiempo establecido`);
        }
    },time);    
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
  orders(6000, menu.hotdog, table[0])
    .then((res) => {
      console.log(res)
      return orders(6000, menu.pizza, table[2])
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};


waiter();
waiter2()
