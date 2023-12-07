const request = require('request')

const API_ENDPOINT = 'http://localhost:3000/books'

function getBooks(limit) {
  const url = limit ? `${API_ENDPOINT}?_limit=${limit}` : API_ENDPOINT

  request(url, (err, res, body) => {
    if (err) {
      console.error('cannot get books')
      return
    }

    const books = JSON.parse(body)
    books.forEach((book, index) => console.log(`${index + 1} ${book.name}`))
  })
}

getBooks(10)
