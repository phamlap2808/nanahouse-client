import type { AxiosResponse } from 'axios'
import { PropType } from 'vue'

declare global {
  PropType
  interface ErrorApi extends Error {
    request: XMLHttpRequest
    response: AxiosResponse
    code: string
  }
}
