import assign from 'lodash-es/assign'
import isNil from 'lodash-es/isNil'
import set from 'lodash-es/set'

const initOptions = () => {
  const options = {
    maxAge: 60 * 1000
  }

  if (window.location.protocol === 'https:') {
    // Production mode
    set(options, 'secure', true)
  }

  return options
}

export default (name: string, value?: any, optionsExtend?: { [key: string]: any }) => {
  try {
    let options = initOptions()

    if (!isNil(optionsExtend)) {
      options = assign(options, optionsExtend)
    }
    const data = useCookie(name, { ...options })
    if (value) {
      data.value = value
    }
    return data
  } catch (e: any) {
    return ref('')
  }
}
