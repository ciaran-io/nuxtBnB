export default (number, singularWord) => {
  // reuturn singular word or append 's' if plural
  const text = `${number} ${singularWord}`
  return number === 1 ? text : text + 's'
}
