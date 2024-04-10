const dayOfWeekNames = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
const monthNames = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12'
]
const token = $cookie('token')
const isAdmin = $cookie('group_id')
export default {
  twoDigitPad(num: any) {
    return num < 10 ? '0' + num : num
  },
  formatDate(date: any, patternStr: any) {
    if (!patternStr) {
      patternStr = 'M-d-yyyy'
    }
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const milliseconds = date.getMilliseconds()
    const h = hour % 12
    const hh = this.twoDigitPad(h)
    const HH = this.twoDigitPad(hour)
    const mm = this.twoDigitPad(minute)
    const ss = this.twoDigitPad(second)
    const aaa = hour < 12 ? 'AM' : 'PM'
    const EEEE = dayOfWeekNames[date.getDay()]
    const EEE = EEEE.substring(0, 3)
    const dd = this.twoDigitPad(day)
    const M = month + 1
    const MM = this.twoDigitPad(M)
    const MMMM = monthNames[month]
    const MMM = MMMM.substring(0, 3)
    const yyyy = year + ''
    const yy = yyyy.substring(2, 2)

    /** Checks to see if month name will be used */
    patternStr = patternStr
      .replace('hh', hh)
      .replace('h', h)
      .replace('HH', HH)
      .replace('H', hour)
      .replace('mm', mm)
      .replace('m', minute)
      .replace('ss', ss)
      .replace('s', second)
      .replace('S', milliseconds)
      .replace('dd', dd)
      .replace('d', day)
      .replace('EEEE', EEEE)
      .replace('EEE', EEE)
      .replace('yyyy', yyyy)
      .replace('yy', yy)
      .replace('aaa', aaa)
    if (patternStr.includes('MMM')) {
      patternStr = patternStr.replace('MMMM', MMMM).replace('MMM', MMM)
    } else {
      patternStr = patternStr.replace('MM', MM).replace('M', M)
    }
    return patternStr
  },
  datePickerFormat(date: any) {
    return this.formatDate(new Date(date), 'dd-MM-yyyy')
  },
  isBlob(value: any): value is Blob {
    return value instanceof Blob
  },
  isLogin() {
    return !!token.value;
  },
  isAdmin() {
    return isAdmin.value === 2
  }
}
