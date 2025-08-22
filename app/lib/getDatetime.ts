export const getDatetime = (id: number) => {
  const idStr = id.toString()
  return `${idStr.slice(0, 4)}-${idStr.slice(4, 6)}-${idStr.slice(6, 8)}`
}
