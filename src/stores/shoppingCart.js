let currentShoppingCart = JSON.parse(localStorage.getItem('relimpitoShoppingCart')) || [];

export const getShoppingCartLocarStorage = () => {
  return JSON.parse(localStorage.getItem("relimpitoShoppingCart")) || []
}

export const addItemInShoppingCart = (idArticule, amount = 1) => {
  parseInt(idArticule)
  let currentShoppingCart = JSON.parse(localStorage.getItem('relimpitoShoppingCart')) || [];

  if (!isProductExistExist(idArticule)) {

    currentShoppingCart.push({ idArticule, amount })
    localStorage.setItem('relimpitoShoppingCart', JSON.stringify(currentShoppingCart))
  }


  if (isProductExistExist(idArticule)) {
    currentShoppingCart = currentShoppingCart.map(item => {
      if (item.idArticule === idArticule) {
        item.amount += amount;
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