/*
* @Author: hejianping
* @Date:   2018-06-06 09:47:16
* @Last Modified by:   hejianping
* @Last Modified time: 2018-07-09 10:00:00
*/
const DATE = new Date()
const date = {
  /**
  * [获取url参数]
  * @returns
  */
  getUrlParam (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let result = window.location.search.substr(1).match(reg)
    return result ? decodeURIComponent(result[2]) : null
  },
  /**
  * [判断是否是微信浏览器]
  * @returns
  */
  isWechatBrowsers () {
    let ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('micromessenger') !== -1) {
      return true
    } else {
      return false
    }
  },
  /**
  * [获取指定日期的下一天]
  * @returns
  */
  getNextDate (d) {
    let dd = d ? new Date(d) : DATE
    dd.setDate(dd.getDate() + 1)
    return this.getYear(dd) + '-' + this.getMonth(dd) + '-' + this.getDay(dd)
  },
  /**
  * [判断日期]
  * @returns
  */
  isDate (value) {
    let reg = /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/
    let regExp = new RegExp(reg)
    if (!regExp.test(value)) {
      alert('日期格式不正确，正确格式为：2014-01-01')
      return false
    }
    return true
  },
  /**
  * [判断年月]
  * @returns
  */
  isMonth (value) {
    let reg = /^((\d{4})-(0[1-9]|1[0-2]))$/
    let regExp = new RegExp(reg)
    if (!regExp.test(value)) {
      console.log(value)
      alert('日期格式不正确，正确格式为：2014-01')
      return false
    }
    return true
  },
  /**
  * [判断是否为数字]
  * @returns
  */
  isNum (value) {
    if (isNaN(value)) {
      alert('不是一个数字')
      return false
    }
    return true
  },
  /**
  * [格式化数字]
  * @returns
  */
  formatNumber (number) {
    return number < 10 ? '0' + number : String(number)
  },
  /**
  * [获取年]
  * @returns
  */
  getYear (value) {
    return value ? new Date(value).getFullYear() : DATE.getFullYear()
  },
  /**
  * [获取月]
  * @returns
  */
  getMonth (value) {
    return value ? this.formatNumber(new Date(value).getMonth() + 1) : this.formatNumber(DATE.getMonth() + 1)
  },
  /**
  * [获取天]
  * @returns
  */
  getDay (value) {
    return value ? this.formatNumber(new Date(value).getDate()) : this.formatNumber(DATE.getDate())
  },
  /**
  * [根据年月获取天数]
  * @returns
  */
  getDaysByMonthAndYear (year, month) {
    let d = new Date(year, parseInt(month), 0)
    return d.getDate()
  },
  /**
  * [获取星期几]
  * @returns
  */
  getWeek (value) {
    let week = value ? new Date(value).getDay() : DATE.getDay()
    let weekDesc = ''
    switch (week) {
      case 1:
        weekDesc += '星期一'
        break
      case 2:
        weekDesc += '星期二'
        break
      case 3:
        weekDesc += '星期三'
        break
      case 4:
        weekDesc += '星期四'
        break
      case 5:
        weekDesc += '星期五'
        break
      case 6:
        weekDesc += '星期六'
        break
      case 0:
        weekDesc += '星期日'
        break
      default:
        break
    }
    return weekDesc
  },
  getWeek1 (value) {
    let week = value ? new Date(value).getDay() : DATE.getDay()
    let weekDesc = ''
    switch (week) {
      case 1:
        weekDesc += '周一'
        break
      case 2:
        weekDesc += '周二'
        break
      case 3:
        weekDesc += '周三'
        break
      case 4:
        weekDesc += '周四'
        break
      case 5:
        weekDesc += '周五'
        break
      case 6:
        weekDesc += '周六'
        break
      case 0:
        weekDesc += '周日'
        break
      default:
        break
    }
    return weekDesc
  },
  /**
   * @param start 开始年，不设置默认是1970
   * @param end   结束年，不设置默认为当前年份
   */
  getYearList (start, end) {
    let year = []
    let startYear = 1970
    let endYear = this.getYear()
    // 判断起始年
    if (start && this.isNum(start)) {
      startYear = start
    }
    // 判断结束年
    if (end && this.isNum(end)) {
      endYear = end
    }
    if (startYear > endYear) {
      alert('起始年必须小于结束年哦')
      return false
    }
    // 得到year数组
    for (let i = startYear; i <= endYear; i++) {
      year.push(String(i))
    }
    return year
  },
  getNowDate () {
    let date = new Date()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    return date.getFullYear() + '-' + month + '-' + strDate
  },
  getAllDay (year, month) {
    let date = new Date()
    let nowYear, nowMonth
    if (year) {
      nowYear = year
    } else {
      nowYear = date.getFullYear()
    }
    if (month) {
      nowMonth = month
    } else {
      nowMonth = date.getMonth() + 1
    }
    let date1 = new Date(nowYear, nowMonth, 0)
    return date1.getDate()
  }
}
export default date
