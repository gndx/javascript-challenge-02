const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para la ${table}`)
  return new Promise((resolve, reject) => {
    if (true) {
      setTimeout(() => {
        resolve(
          `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
        )
      }, time)
    } else {
      reject(
        new Error(`¡¡OOps!!, No pudimos completar tu pedido de ${product}`)
      )
    }
  })
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza'
}
const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5']

const randomTime = () => {
  let numbers = 1000 * Math.floor(Math.random() * 8 + 1)
  return numbers
}

let a = randomTime()
let b = randomTime()
let c = randomTime()

const readyDishes = () => {
  let d
  if (a > b) {
    if (a > c) {
      d = a
    } else {
      d = c
    }
  } else {
    if (b > c) {
      d = b
    } else {
      d = c
    }
  }
  setTimeout(
    () => console.log('....Esperando a que se completen todos los pedidos....'),
    d
  )
  return d
}

const waiter = async () => {
  try {
    const order1 = await orders(a, menu.hamburger, table[3])
    console.log(order1)
  } catch (error) {
    console.log(error)
  }
}

const waiter2 = () => {
  orders(b, menu.hotdog, table[0])
    .then(resolve => console.log(resolve))
    .catch(error => console.log(error))
  orders(c, menu.pizza, table[2])
    .then(resolve => console.log(resolve))
    .catch(error => console.log(error))
}

const waiter3 = async () => {
  try {
    const order4 = await orders(
      readyDishes(),
      [menu.hotdog, menu.pizza, menu.hotdog],
      table[1]
    )
    console.log(order4)
  } catch (error) {
    console.log(error)
  }
}



waiter()
waiter2()
waiter3()



