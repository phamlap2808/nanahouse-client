import CryptoJS from 'crypto-js'

export default {
  encrypt(value: string, key: string) {
    return CryptoJS.AES.encrypt(JSON.stringify(value), key).toString()
  },
  decrypt(value: string, key: string) {
    return JSON.parse(CryptoJS.AES.decrypt(value, key).toString(CryptoJS.enc.Utf8))
  }
}
