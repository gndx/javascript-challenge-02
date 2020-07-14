const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if(resolve){
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    }else{
      reject(new Error('Ups!! Ha ocurrido un problema con el pedido'))
    }
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomTime = (time) =>{
  valor = Math.random(0,time)
  return Math.round(valor * 1000)
}

const waiter = () => {
  orders(randomTime(8000), menu.hamburger, table[0])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter();

const waiter2 = () => {
  orders (randomTime(8000),menu.hotdog,table[0])
  .then((res)=>{
    console.log(res)
    return orders(randomTime(8000),menu.pizza,table[2])
  })
  .then(res=>{
    console.log(res)
  })
  .catch((err)=> console.error(err))
}

waiter2();

const waiter3 = async()=>{
  try{
    const pedido3 = await orders(randomTime(8000),[menu.hotdog, menu.pizza, menu.hotdog],table[1])
    console.log(pedido3)
  }catch(error){
    console.error(err)
  }
}


waiter3();