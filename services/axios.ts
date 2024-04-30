import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { ENCRYPT_SIGNATURE } from 'constant/common'
import CryptoJS from 'crypto-js'
import { Code } from 'define/response-code'

const BASE_API = import.meta.env.VITE_APP_BASE_URL || 'http://54.251.104.42:8000/api'

export interface IResponseSuccess<T = any> {
  code: number
  message: string
  status: boolean
  data: T
}

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
    // const tokenBytes = CryptoJS.AES.decrypt(token.value, ENCRYPT_SIGNATURE)
    // const decryptedToken = tokenBytes.toString(CryptoJS.enc.Utf8)
    config.headers = {
      ...(token && { Authorization: `Bearer ${token.value}` })
    }
  }

  return config
}

const handleErrorRequest = (error: any) => {
  return Promise.reject(error)
}

const handleSuccess = (response: AxiosResponse<IResponseSuccess, any>) => {
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
