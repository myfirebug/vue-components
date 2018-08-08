/*
* @Author: UEDHE
* @Date:   2018-06-07 12:04:38
* @Last Modified by:   hejianping
* @Last Modified time: 2018-07-04 09:56:05
*/
const store = {
  get (key) {
    let value = window.localStorage.getItem(key)
    if (value) {
      try {
        let json = JSON.parse(value)
        if (typeof json === 'object') {
          return json
        }
      } catch (e) {
        return value
      }
    } else {
      return value
    }
  },
  set (key, value) {
    let val = typeof value === 'object' || (value instanceof Array) ? JSON.stringify(value) : value
    window.localStorage.setItem(key, val)
  },
  remove (key) {
    window.localStorage.removeItem(key)
  },
  clear () {
    window.localStorage.clear()
  }
}
export default store
