const max = 8000
const min = 1000
const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      reject(`error`)
    }, time);
  });
}

const randonTime =(min, max) => {
  return (Math.floor(Math.random()*(max-min + 1))+min)
}

const waiter = () => {
  orders(randonTime(min, max), menu.hamburger, table[3])
  .then((res) => console.log(res))
  
  .catch((err) => console.error(err))
};



const waiter2 =() => {
  orders(randonTime(min, max), menu.hotdog, table[0])
  .then((res) =>  {
    console.log(res)
   return orders(randonTime(min, max), menu.pizza, table[2])
  })
  .then((res) => console.log(res))
  
  .catch((err) => console.error(err))
}

async function waiter3 ()
 {
   try {
  const order1=  await orders(randonTime(min, max),menu.pizza, table[1])
  
   
   const order2=  await orders(randonTime(min, max),menu.hotdog, table[1])
  

   const order3=  await orders(randonTime(min, max),menu.hotdog, table[1])
  
   console.log(order1,order2,order3)
   
 
}
catch(e) {
  console.error(err)
}
}



waiter()
waiter2()
waiter3()
  
