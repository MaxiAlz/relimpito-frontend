let currentShoppingCart = JSON.parse(localStorage.getItem('relimpitoShoppingCart')) || [];

export const getShoppingCartLocarStorage = () => {
  return JSON.parse(localStorage.getItem("relimpitoShoppingCart")) || []
}

// agregar un solo producto al carrito
export const addAnItemInShoppingCart = (idArticule) => {

  parseInt(idArticule)

  let currentShoppingCart = JSON.parse(localStorage.getItem('relimpitoShoppingCart')) || [];

  if (!isProductExistExist(idArticule)) {
    currentShoppingCart.push({ idArticule, amount: 0 })
    localStorage.setItem('relimpitoShoppingCart', JSON.stringify(currentShoppingCart))
  }

  if (isProductExistExist(idArticule)) {
    currentShoppingCart = currentShoppingCart.map(item => {
      if (item.idArticule === idArticule) {
        item.amount += 1;
      }
      return item
    });
    localStorage.setItem('relimpitoShoppingCart', JSON.stringify(currentShoppingCart))

  }
}

// Eliminar o quitar monto de un articulo
export const removeAnItemInShoppingCart = (idArticule) => {

  parseInt(idArticule)

  let currentShoppingCart = JSON.parse(localStorage.getItem('relimpitoShoppingCart')) || [];

  if (!isProductExistExist(idArticule)) {
    return
  }

  if (isProductExistExist(idArticule)) {
    currentShoppingCart = currentShoppingCart.map(item => {
      if (item.idArticule === idArticule) {
        item.amount -= 1;
      }
      return item
    });
    localStorage.setItem('relimpitoShoppingCart', JSON.stringify(currentShoppingCart))

  }
}

export const addSomeProductInCart = (idArticule, newAmount) => {

  parseInt(idArticule)

  let currentShoppingCart = JSON.parse(localStorage.getItem('relimpitoShoppingCart')) || [];
  if (isProductExistExist(idArticule)) {
    currentShoppingCart = currentShoppingCart.map(item => {
      if (item.idArticule === idArticule) {
        item.amount = newAmount;
      }
      return item
    });
    localStorage.setItem('relimpitoShoppingCart', JSON.stringify(currentShoppingCart))
  }
}

export const removeItemFromShoppingCart = () => {
  localStorage.removeItem('relimpitoShoppingCart')
}

export const deleteShoppingCartFromStorage = () => {
  localStorage.removeItem("relimpitoShoppingCart")
}



// funciones auxiliares
const isProductExistExist = (idArticule) => {
  let currentShoppingCart = JSON.parse(localStorage.getItem('relimpitoShoppingCart')) || [];

  return currentShoppingCart.some(item => item.idArticule === idArticule);
};