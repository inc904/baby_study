console.log(123)
// '/api/user':
var person = {
  name: 'jack',
  age: 19,
}
// export default person

export function tag(tag, text) {
  const el = document.createElement(tag)
  el.textContent = text

  return el
}
