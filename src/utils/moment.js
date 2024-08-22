import moment from 'moment'

export { moment }

export function momentFormatDate(date) {
  return date ? moment(date).format('YYYY-MM-DD') : ''
}
export function momentFormatDateTime(dateTime) {
  return dateTime ? moment(dateTime).format('YYYY-MM-DD HH:mm') : ''
}
