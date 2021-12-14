export default  (dateStr) =>{
// format date received from api
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  })
}