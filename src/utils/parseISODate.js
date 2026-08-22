export const parseISODate = (date) => {
  const splitdate = date?.split('-')

  if (splitdate === undefined || splitdate.length !== 3) {
    return null
  }

  const parsedISODate = new Date(splitdate[0], splitdate[1] - 1, splitdate[2])

  return parsedISODate
}
