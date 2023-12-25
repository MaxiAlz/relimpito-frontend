// @ts-nocheck
import { writable } from "svelte/store";

// export const userDataRelimpito = writable(getStorageUser())
export const userTokenRelimpito = writable(null)
export const userDataRelimpito = writable(getStorageUser())


export function logoutStoreUser() {
  userDataRelimpito.set(null)
  localStorage.removeItem("userRelimpito")
  localStorage.removeItem("userTokenRelimpito")
  
}

export function loginStoreUser(user) {
  userDataRelimpito.set(user)
  localStorage.setItem('userRelimpito', JSON.stringify(user))
}

function getStorageUser() {
  if (localStorage.getItem('userRelimpito')) {
    return JSON.parse(localStorage.getItem('userRelimpito'))
  }
  return null
}

export function storeUserToken(token) {
  userTokenRelimpito.set(token)
  localStorage.setItem('userTokenRelimpito', JSON.stringify(token))
  getStorageTokenUser()
}

export function getStorageTokenUser() {
  if (localStorage.getItem('userTokenRelimpito')) {
    return JSON.parse(localStorage.getItem('userTokenRelimpito'))
  }
  return null
}

