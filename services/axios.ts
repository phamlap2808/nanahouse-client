import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ENCRYPT_SIGNATURE } from 'constant/common'
import { Code } from 'define/response-code'
import axios from 'axios'
import CryptoJS from 'crypto-js'

const BASE_API = import.meta.env.VITE_APP_BASE_URL

const $axios = axios.create({
  baseURL: BASE_API,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
  },
  timeout: 30000
})

const handleRequest = (config: AxiosRequestConfig) => {
  const token = $cookie('token')

  if (token.value) {
    const tokenBytes = CryptoJS.AES.decrypt(token.value, ENCRYPT_SIGNATURE)
    const decryptedToken = JSON.parse(tokenBytes.toString(CryptoJS.enc.Utf8))

    config.headers = {
      ...(token && { Authorization: `Bearer ${decryptedToken}` })
    }
  }

  return config
}

const handleErrorRequest = (error: any) => {
  return Promise.reject(error)
}

const handleSuccess = (response: any) => {
  return response
}

const handleErrorResponse = (error: ErrorApi) => {
  const status = error.response.status
  const message = error.response.data.message
  const token = $cookie('token')
    const groupId = $cookie('group_id')
  switch (status) {
    case Code.BadRequest: {
      break
    }
    case Code.Forbidden: {
      break
    }
    case Code.NotFound: {
      break
    }
    case Code.InternalServerError: {
      break
    }
    case Code.ManyRequest: {
      break
    }
    case Code.FailValidate: {
      Object.keys(message).forEach((key: string) => {
        $toast().error(message[key])
      })
      return
    }
    case Code.Unauthorized: {
      token.value = null
      groupId.value = null
      navigateTo({ name: 'auth-login' })
      break
    }
    default:
      break
  }

  return Promise.reject(error)
}

$axios.interceptors.request.use(handleRequest, handleErrorRequest)
$axios.interceptors.response.use(handleSuccess, handleErrorResponse)

export { $axios }
