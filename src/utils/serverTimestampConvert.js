export const serverTimestampConvert = (timestamp) => {
  if (!timestamp) { return null }

  const date = new Date(timestamp.toMillis())
  return `${date.toLocaleDateString("sv-SV")} ${date.toLocaleTimeString("sv-SV")}`
}