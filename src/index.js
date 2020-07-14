
    let  XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders/';
            fetchOrders=(url_api)=>{
            return new Promise((resolve, reject)=>{
                let xhttp= new XMLHttpRequest();
                xhttp.open('GET', url_api, true)
                xhttp.onreadystatechange= function (event){
                if(xhttp.readyState===4){
                (xhttp.status===200)
                    ? resolve(JSON.parse(xhttp.responseText))
                    :reject(new Error('Error', url_api))
                }
            };
        
        xhttp.send();
    });
    
    }
    //### Primer problema
    const min = 1000;
    const max = 8000;
    const randomTime = () => {
      return Math.round(Math.random() * (max - min)) + min;

    }
        const orders = (time, product, table) => {
        console.log(`### Orden: ${product} para ${table}`);
        return  new Promise((resolve, reject)=>{
          setTimeout(()=>{
          if(randomTime(max, min) <= time){   
                    resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
        } else {
            reject(new Error(Error));
            }
          
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
    }

    //### Segundo Problema  
    const waiter2 = () => {
      orders(randomTime(), menu.hotdog, table[0])
      .then((res) =>{
        console.log(res)
        return orders(randomTime(), menu.pizza, table[2])
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    };

    const waiter3 =async ()=>{
      try {

        const order1= await orders(randomTime(), menu.hotdog, table[1])
        const order2= await orders(randomTime(), menu.pizza, table[1])
        const order3= await orders(randomTime(), menu.hotdog, table[1])

        console.log(order1)
        console.log(order2)
        console.log(order3)

      } catch (error) {
        console.error(error)
      }

    };

    const waiter4 = async () => {
      try {
        console.log('Solicitando Pedidos')
        const order1 = await fetchOrders(API)
        const order2 = await fetchOrders(API)
        const order3 = await fetchOrders(API)
        const order4 = await fetchOrders(API)

        console.log(`pedido1: ${order1.data}`)
        console.log(`pedido2: ${order2.data}`)
        console.log(`pedido3: ${order3.data}`)
        console.log(`pedido4: ${order4.data}`)

      }  catch(error){
        console.error(error)
    }
    };

    
    waiter()
    waiter2()
    waiter3()
    waiter4(API)