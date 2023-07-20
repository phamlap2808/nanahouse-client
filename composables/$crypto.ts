import CryptoJS from 'crypto-js'

export default {
  encrypt(value: string, key: string) {
    return CryptoJS.AES.encrypt(value, key)
  },
  decrypt(value: string, key: string) {
    const tokenBytes = CryptoJS.AES.decrypt(value, key)
    return tokenBytes.toString(CryptoJS.enc.Utf8)
  }
}
