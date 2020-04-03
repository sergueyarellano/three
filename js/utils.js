module.exports = {
  pipe
}

function pipe (...fns) {
  return initValue => fns.reduce((acc, fn) => fn(acc), initValue)
}
