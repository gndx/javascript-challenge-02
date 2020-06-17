const maximo=8000;
const minimo=1000;
const randomTime=(maximo, minimo)=>Math.round(Math.random()*(maximo-minimo)+minimo);

const orders = (time,product,table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    let Timing=randomTime(maximo, minimo);
    setTimeout(() => {
      let working=true;
      if(working) resolve(`=== Pedido servido: ${product}, tiempo de preparación ${Timing}ms para la ${table}`);
      else reject(`El pedido no pudo ser preparado`);
    }, time);
  });
}

const pickup_orders = (time, product, table) => {
  return new Promise((resolve, reject) => {
    let Timing=randomTime(maximo, minimo);
    setTimeout(() => {
      let working=true;
      if(working) resolve(`=== Pedido retirado: ${product}, tiempo de retiro ${Timing}ms para la ${table}`);
      else reject(`El pedido no pudo ser retirado`);
    }, time);
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

const waiter3=()=>{
  const pickup_orders2=async()=>{
    try{
      order=[menu.hotdog, menu.pizza, menu.hotdog]
      const promises=order.map((product)=>orders(6000, product, table[1]));
      const alertpickup=await Promise.all(promises);
      console.log(alertpickup);
      console.log(`Los pedidos para la ${table[1]} ya estan listos para ser retirados`);
      const finalpromises=order.map((product)=>pickup_orders(6000, product, table[1]));
      const pickup=await Promise.all(finalpromises);
      console.log(pickup);
    }catch(error){
      onerror(error)
    }
  }
  pickup_orders2();
}

const API_URL = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
const opts = { crossDomain: true };

const fetchOrders=()=>{
    return new Promise((resolve, reject)=>{
    $
      .get(API_URL,opts,function(data)
      {
          resolve(data);
          console.log(`hola`)
      })
      .fail(()=>reject(id))
    })
}

const pickup_orders3=async()=>{
  try
  {
      var persona=await fetchOrders(data)
      console.log(persona)
  }catch(id)
  {
      onerror(id)
  }
}
pickup_orders3()


//const waiter4=()=>{
  //const pickup_orders3=async()=>{
    //try{
      //data= await fetchOrders(API_URL)
      //console.log(data)
      //order=[menu.hotdog, menu.pizza, menu.hotdog]
      //const promises=order.map((product)=>fetchOrders(6000, product, table[1]));
      //const alertpickup=await Promise.all(promises);
      //console.log(alertpickup);
      //console.log(`Los pedidos para la ${table[1]} ya estan listos para ser retirados`);
      //const finalpromises=order.map((product)=>pickup_orders(6000, product, table[1]));
      //const pickup=await Promise.all(finalpromises);
      //console.log(pickup);
    //}catch(error){
    //  onerror(error)
    //}
  //}
  //pickup_orders3();
//}

const onerror=()=>console.log(`No se pudo retirar los pedidos solicitados`);

//waiter();
//waiter2();
//waiter3();
//waiter4();