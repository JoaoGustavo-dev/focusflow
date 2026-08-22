export const formatDateToBR = (date) => {
  const splitdate = date?.split('-')

  if (splitdate === undefined || splitdate.length !== 3) {
    return null
  }

  const formatedBRDate = `${splitdate[2]}/${splitdate[1]}/${splitdate[0]}`

  return formatedBRDate
}
