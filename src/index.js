const maximo=8000;
const minimo=1000;
const randomTime=(maximo, minimo)=>Math.round(Math.random()*(maximo-minimo)+minimo);

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    let Timing=randomTime(maximo, minimo);
    if(Timing<=time){
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${Timing}ms para la ${table}`);
      }, time);
    }else reject(`La orden ${product} para ${table} fue entregada fuera del tiempo establecido a ${Timing}ms`);
  });
}

const pickup_orders = (time, product, table) => {
  return new Promise((resolve, reject) => {
    let Timing=randomTime(maximo, minimo);
    if(Timing<=time){
      setTimeout(() => {
        resolve(`=== Pedido retirado: ${product}, tiempo de retiro ${Timing}ms de la ${table}`);
      }, time);
    }else reject(`El pedido ${product} para la ${table} fue recogido fuera del rango de tiempo requerido a ${Timing}ms`);
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

const waiter2=()=>{
  pickup_orders(6000, menu.hotdog, table[0])
    .then((res) =>{
      console.log(res)
      return pickup_orders(6000, menu.pizza,table[2])
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

const onerror=()=>console.log(`No se puedo retirar el pedido`);

const pickup_order2 = (time, product, table) => {
  return new Promise((resolve, reject) => {
    let Timing=randomTime(maximo, minimo);
    if(Timing<=time){
      setTimeout(() => {
        resolve(`=== Pedido retirado: ${product}, tiempo de retiro ${Timing}ms de la ${table}`);
      }, time);
    }else reject(`El pedido ${product} para la ${table} fue recogido fuera del rango de tiempo requerido a ${Timing}ms`);
  });
}

const waiter3=()=>{
  async const pickup_order2=()=>{
    const order=[(6000, menu.hotdog, table[1]),(6000, menu.pizza, table[0]), (6000, menu.hotdog, table[1])];
    const promises=order.map((time, product, table)=>pickup_order2(time, product, table));
    try{
      const pickup=await Promise.all(promises);
      console.log(pickup);
    }catch([time, product, table]){
      onerror()
    }
  }
}

waiter();
waiter2();
waiter3();