const request = require('request')

const API_ENDPOINT = 'http://localhost:3000/books'

function getBooks(limit) {
  const url = limit ? `${API_ENDPOINT}?_limit=${limit}` : API_ENDPOINT

  request(url, (err, res, body) => {
    if (err) {
      console.error('糟糕，發生了未知錯誤 :(')
      console.log(err.message)
      return
    }

    try {
      const books = JSON.parse(body)
      books.forEach((book) => console.log(`${book.id} ${book.name}`))
    } catch (error) {
      console.log('解析資料時發生錯誤 :(')
      console.log(error.message)
    }
  })
}

getBooks(10)
