import CryptoJS from 'crypto-js'

const key = 'abc'
const iv = '123'

const keyHex = CryptoJS.enc.Utf8.parse(key)
const ivHex = CryptoJS.enc.Utf8.parse(iv)

export const encryptByDES = (data) => {
  let encrypted = CryptoJS.DES.encrypt(JSON.stringify(data), keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  let ciphertext = encrypted.toString()
  let words = CryptoJS.enc.Utf8.parse(ciphertext)
  let base64 = CryptoJS.enc.Base64.stringify(words)
  return base64
}

export const decryptByDES = (base64) => {
  let parsedWords = CryptoJS.enc.Base64.parse(base64)
  let ciphertext = parsedWords.toString(CryptoJS.enc.Utf8)

  let decrypted = CryptoJS.DES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    },
    keyHex,
    {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  )
  return decrypted.toString(CryptoJS.enc.Utf8)
}