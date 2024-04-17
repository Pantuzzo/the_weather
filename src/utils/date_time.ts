export const formatteDate = (dateTime: string) => {
  const transformString: Date = new Date(dateTime)
  const day = transformString.getDate()
  const month = transformString.getMonth()
  const year = transformString.getFullYear()
  const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
  return formattedDate
}

export const formatteTime = (dateTime: string) => {
  const transformString: Date = new Date(dateTime)
  const hours = transformString.getHours()
  const minutes = transformString.getMinutes()
  const formatteTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  return formatteTime
}
