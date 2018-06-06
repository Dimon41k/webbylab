const parseText = (text) => text
  .trim()
  .split('\n\n')
  .map(x => x.split('\n'))
  .map(x => x.map(x => [x.substring(0, x.indexOf(': ')), x.substring(x.indexOf(': ') + 2).trim().split(', ').length > 1 ? x.substring(x.indexOf(': ') + 2).trim().split(', ').map(name => name.split(' ')) : x.substring(x.indexOf(': ') + 2).trim().split(', ').map(x => x.trim())]))

const parseToObject = (array) => array.reduce((ac, item) => {
  let obj = item.reduce((a, it) => {
    a[it[0]] = it[1].length > 1 ? it[1] : it[1][0]
    return a
  }, {})
  ac.push(obj)
  return ac
}, [])

const formatFieldsToDB = (array) => array.reduce((ac, it) => {
  let newObject = {}
  newObject['title'] = it['Title'] instanceof Array
    ? it['Title'].map(x => x.join(' ')).join(', ') : it['Title']
  newObject['format'] = it['Format']
  newObject['year'] = it['Release Year']
  newObject['stars'] = it['Stars']
  ac.push(newObject)
  return ac
}, [])

const arrayToArrayOfObjects = function (text) {
  let arrayOfArrays = parseText(text)
  let arrayOfObject = parseToObject(arrayOfArrays)
  return formatFieldsToDB(arrayOfObject)
}

export default arrayToArrayOfObjects
