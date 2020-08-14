const menu = {
  hamburger: 'Burguer Combo',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5'];


const randomTime = () => {
  return Math.floor(Math.random() * 8000) + 1000;
}

const orders = (time, product, table) => {
  console.log(`### Order: ${product} for ${table}`);
  return new Promise((resolve, reject) => {
    true

      ? setTimeout(() => {
        resolve(`=== Order Served: ${product}, prep time ${time}ms for the ${table}`);
      }, time)

      : reject('sorry we have a problem')

  });
}

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};


const waiter2 = () =>  {
  orders(randomTime(), menu.hotdog, table [0])
    .then((res) => {
      console.log(res)
      return orders(randomTime(), menu.pizza, table [2])
      .then((res) => {
        console.log(res)
      })
    })
    .catch((err) => console.error(err))
}


const waiter3 = async () => {
  let orderTable2 = [menu.hamburger, menu.pizza, menu.hotdog]
    try {
      const ALL_ORDERS = orderTable2.map( order => orders(randomTime(), order, table[1]))
      const allPromise = await Promise.all(ALL_ORDERS)
      console.log(allPromise.toString())
    }
    catch (error) {
      console.log(error)
    }
}


waiter()
waiter2()
waiter3()