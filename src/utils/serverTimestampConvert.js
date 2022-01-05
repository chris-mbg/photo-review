export const serverTimestampConvert = (timestamp) => {
  if (!timestamp) { return null }

  const date = new Date(timestamp.toMillis())
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}