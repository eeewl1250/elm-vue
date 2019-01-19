const util = {
  timeConvert (timeNumber) {
    const time = new Date(timeNumber)
    return time.getFullYear() + '-'
      + time.getMonth() + '-'
      + time.getDate() + ' '
      + time.getHours() + ':'
      + time.getMinutes()
  }
}

export default util
