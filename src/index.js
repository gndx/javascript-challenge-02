
function devueltos()
{
  var primero=Math.floor(Math.random()*(1000-800))+800;
  var segundo=Math.floor(Math.random()*(1000-800))+800;
  return rango(primero,segundo)
}
 

function rango(max,min)
{
  const resultado=Math.floor(Math.random()*(max-min))+min; 
   
  return resultado;
}

const orders = (time, product, table) => {
  
  // console.log(`### Orden: ${product} para ${table}`);
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      reject(`erro en la consulta`);  ;
    }, time);
    
  });
  
} 

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = (devueltos) => {
  
  

  var principal=[];
  var comida1=[];
  
  
  orders(devueltos[0], menu.hotdog, table[1])
    .then((res) => {
    console.log(res);
    comida1.push(menu.hotdog);
    return orders(devueltos[0], menu.pizza, table[1]);
    })
    .then((res) => {
      console.log(res);
      comida1.push(menu.pizza,'mesa2',parseInt(devueltos[0]));
      principal.push(comida1);
      comida1=[];
      return orders(devueltos[1], menu.hamburger, table[3]);
    })
    
    .then((res) => {
      console.log(res);
      comida1.push(menu.hamburger);
      return orders(devueltos[1], menu.hotdog, table[3]);
    })
    .then((res) => {
      console.log(res);
      comida1.push(menu.hotdog,'mesa4',parseInt(devueltos[1]));
      principal.push(comida1);
      comida1=[];
      return orders(devueltos[2], menu.pizza, table[4]);
    })
    .then((res) => {
      console.log(res);
      comida1.push(menu.pizza);
      return orders(devueltos[2], menu.hotdog, table[4]);
    })
    .then((res)=>
    {
      console.log(res);
      comida1.push(menu.hotdog,'mesa5',parseInt(devueltos[2]));
      principal.push(comida1);
      
    })
    .then((res) => {
      let resultado= Math.max(parseInt(devueltos[0]),parseInt(devueltos[1]),parseInt(devueltos[2]));        
      for(var a=0;a<principal.length;a++)
        {
          for(var b=0;b<principal[a].length;b++)
          {
            
            if(resultado== principal[a][b])
            {
             console.log('su 1-mer pedido es '+principal[a][0]+' '+principal[a][1]+' '+ principal[a][2]);  
             var valor=devueltos.indexOf(resultado);
             devueltos.splice(valor,1);  
             
            }
      
          }
        }
      })     
      .then((res) => {
        //devueltos es el objeto que contiene el tiempo
        // principal es el objeto que contiene los array multimencional
        //  y cada array contiene la comida de cada mesas 
        let resultado1= Math.max(parseInt(devueltos[0]),parseInt(devueltos[1]));
        
         for(var a=0;a<principal.length;a++)
          {
            for(var b=0;b<principal[a].length;b++)
            {
              // resultado1 es el valor maximo y debe coincidir el numero maximo
              // primero se coloca el resultado y despues el principal
              if(resultado1==principal[a][b])
              {
                console.log('su 2-do pedido es '+principal[a][0]+' '+principal[a][1]+' '+ principal[a][2]);  
                let posicion=devueltos.indexOf(resultado1);
                devueltos.splice(posicion,1);  
              }
        
            }
          }
        })
        .then((res) => {
          resultado= parseInt(devueltos[0]);
           for(var q=0;q<principal.length;q++)
            {
              for(var f=0;f<principal[q].length;f++)
              {
                
                if(resultado== principal[q][f])
                {
                  
                  console.log('su 3-cer pedido es '+principal[q][0]+' '+principal[q][1]+' '+ principal[q][2]);  
                  let palabra=resultado.toString();
                  devueltos.splice(palabra+'ms',1);  
                  
                }
          
              }
            }
          })  
   
    .catch((err) => console.error(err));
};
function waiter2()
{
  var numero=[];
  for(var z=0;z<3;z++)
  {
    numero.push(devueltos())
  }
  // waiter es donde estan las promesas encadenadas  
  waiter(numero);
  
  
    // var tiempo=devueltos()
  
}
async function waiter3()
{
  var ids=[1]
  var promesas=ids.map(id=>
  { 
    return waiter2()
  }) 
  
  try{
      var personajes= await Promise.all(promesas); 
      //cuando devuelva las promesas guardela en la variable 
      //personajes y await funciona para que detenga el codigo hasta hay
      // console.log(personajes);
    }
    catch(id)
    {
      onError(id)
    }
}
function waiter4()
{
  
  waiter3();
  
}
waiter4();
const API= 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';

var fetchOrders=API=>
{
  
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
   const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;  
   const xml = new XMLHttpRequest();
   xml.open("GET",API,true);
   xml.send();
   xml.onreadystatechange=()=>
   {
     if(xml.readyState===4)
     {
       if(xml.status==200)
       {
        var resultado=JSON.parse(xml.responseText);
       return resolve(resultado);
       }
       else
       {
        return reject('error en la consulta');
       }
     }
   }
  },4000)
  })

}
function onError(id)
{
  console.log(id);
}
async function obtener_personasje()
{
  var ids=[1]
  var promesas=ids.map(id=>
  { 
     
      fetchOrders(API)
    
    //aqui se puede colocar  de esta forma, en la parte de abajo no funciono
    .then((data1)=>{
      console.log(data1.data) ;
    })
  }) 
  
  try{
    // 
      var personajes = await Promise.all(promesas);
      // la var personajes no funciona ya que no tiene ningun valor
      

    
  }
  catch(id)
  {
    onError(id)
  }
}

obtener_personasje();