import { encode, decode } from '@/utils/Base64'

const setLocalstorage = (key, value) => {
  localStorage.setItem(key, encode(JSON.stringify(value)))
}

const getLocalstorage = (key) => {
  if (localStorage.getItem(key) === null) {
    return null
  } else {
    try {
      return JSON.parse(decode(localStorage.getItem(key)))
    } catch(e) {
      return null
    }
  }
}

export {
  setLocalstorage,
  getLocalstorage
}