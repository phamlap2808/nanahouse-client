export default {
  create(el: any, binding: any) {
    if (binding.value) {
      el.classList.add('state-loading')
      el.setAttribute('disabled', 'disabled')
    } else {
      el.classList.remove('state-loading')
      el.removeAttribute('disabled')
    }
  },
  mounted(el: any, binding: any) {
    if (binding.value) {
      el.classList.add('state-loading')
      el.setAttribute('disabled', 'disabled')
    } else {
      el.classList.remove('state-loading')
      el.removeAttribute('disabled')
    }
  },
  beforeUpdate(el: any, binding: any) {
    if (binding.value) {
      el.classList.add('state-loading')
      el.setAttribute('disabled', 'disabled')
    } else {
      el.classList.remove('state-loading')
      el.removeAttribute('disabled')
    }
  },
  updated(el: any, binding: any) {
    if (binding.value) {
      el.classList.add('state-loading-1')
      el.setAttribute('disabled', 'disabled')
    } else {
      el.classList.remove('state-loading-1')
      el.removeAttribute('disabled')
    }
  }
}
