import { parseDate } from './parseDate'

export const formatDateToISO = (date) => {
  const parsedDate = parseDate(date)

  if (parsedDate === null) {
    return null
  }

  const dateDay = parsedDate.getDate()
  const dateMonth = parsedDate.getMonth() + 1
  const year = parsedDate.getFullYear()

  const day = String(dateDay).padStart(2, '0')
  const month = String(dateMonth).padStart(2, '0')

  const ISOdate = `${year}-${month}-${day}`

  return ISOdate
}
