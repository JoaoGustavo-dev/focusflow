export const parseDate = (date) => {
  const splitdate = date?.split('/')

  if (splitdate === undefined || splitdate.length !== 3) {
    return null
  }

  const parsedDate = new Date(splitdate[2], splitdate[1] - 1, splitdate[0])

  return parsedDate
}
