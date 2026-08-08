export const parseDate = (date) => {
  const splitdate = date.split('/')

  const parsedDate = new Date(splitdate[2], splitdate[1] - 1, splitdate[0])

  return parsedDate
}
