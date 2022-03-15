let defaults = {
  food: 'spicy',
  price: '$10',
  ambiance: 'noisy'
}
let search1 = { ...defaults, food: 'rich' }
let search2 = { food: 'rich', ...defaults }
console.log(search1)
console.log(search2)

let man1: { name: string; age: number } = { name: 'zc', age: 18 }
let man2: { name: string; age: number } = { name: 'zc', age: 18 }
let man3: { name: string; age: number } = { name: 'zc', age: 18 }

interface Config {
  type: string
  url: string
  data?: string
  dataType: string
}

const xhr = new XMLHttpRequest()

function ajax(config: Config) {
  xhr.open(config.type, config.url, true)
  xhr.send(config.data)
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (config.type === 'json') {
        console.log(JSON.parse(xhr.responseText))
      } else {
        console.log(JSON.parse(xhr.responseText))

        console.log('successful')
        console.log(xhr.responseText)
      }
    }
  }
}

ajax({
  type: 'get',
  dataType: 'json',
  // url: 'http://a.itying.com/api/productlist'
  url: './text.json'
})
