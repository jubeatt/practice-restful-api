const request = require('request')

const API_ENDPOINT = 'http://localhost:3000/books'
const LIST = 'list'
const READ = 'read'
const DELETE = 'delete'
const CREATE = 'create'
const UPDATE = 'update'

function app({ command, arg1, arg2 }) {
  switch (command) {
    case LIST:
      getAllBooks()
      break
    case READ:
      getBookById(arg1)
      break
    case DELETE:
      deleteBookById(arg1)
      break
    case CREATE:
      createBook(arg1)
      break
    case UPDATE:
      updateBookById(arg1, arg2)
      break
    default:
      console.error('指令有錯，請重新輸入。')
      break
  }
}

function getAllBooks() {
  request(API_ENDPOINT, (err, res, body) => {
    if (err) {
      console.error('糟糕，發生了未知錯誤 :(')
      console.log(err.message)
      return
    }

    try {
      const books = JSON.parse(body)
      books.forEach((book) => console.log(`${book.id}. ${book.name}`))
    } catch (error) {
      console.log('解析資料時發生錯誤 :(')
      console.error(error.message)
    }
  })
}

function getBookById(id) {
  if (!id || isNaN(parseInt(id, 10))) {
    throw new Error('請輸入正確的 Id（數字）')
  }

  const url = `${API_ENDPOINT}/${id}`

  request(url, (err, res, body) => {
    if (err) {
      console.error('糟糕，發生了未知錯誤 :(')
      console.log(err.message)
      return
    }

    try {
      const book = JSON.parse(body)
      console.log(book.name || `找不到 id 為 "${id}" 的書本。`)
    } catch (error) {
      console.log('解析資料時發生錯誤 :(')
      console.error(error.message)
    }
  })
}

function deleteBookById(id) {
  if (!id || isNaN(parseInt(id, 10))) {
    throw new Error('請輸入正確的 Id（數字）')
  }

  const url = `${API_ENDPOINT}/${id}`

  request.delete(url, (err, res) => {
    if (err) {
      console.error('糟糕，發生了未知錯誤 :(')
      console.log(err.message)
      return
    }

    if (res.statusCode >= 200 && res.statusCode < 400) {
      console.log('刪除成功！')
    } else {
      console.log('刪除失敗，HTTP 狀態碼為：' + res.statusCode)
    }
  })
}

function createBook(bookName) {
  request.post(API_ENDPOINT, { form: { name: bookName } }, (err, res, body) => {
    if (err) {
      console.error('糟糕，發生了未知錯誤 :(')
      console.log(err.message)
      return
    }

    if (res.statusCode >= 200 && res.statusCode < 400) {
      console.log(body)
      console.log('新增成功！')
    } else {
      console.log('新增失敗，HTTP 狀態碼為：' + res.statusCode)
    }
  })
}

function updateBookById(id, bookName) {
  if (!id || isNaN(parseInt(id, 10))) {
    throw new Error('請輸入正確的 Id（數字）')
  }

  const url = `${API_ENDPOINT}/${id}`
  request.put(url, { form: { name: bookName } }, (err, res, body) => {
    if (err) {
      console.error('糟糕，發生了未知錯誤 :(')
      console.log(err.message)
      return
    }

    if (res.statusCode >= 200 && res.statusCode < 400) {
      console.log(body)
      console.log('修改成功！')
    } else {
      console.log('修改失敗，HTTP 狀態碼為：' + res.statusCode)
    }
  })
}

app({
  command: process.argv[2],
  arg1: process.argv[3],
  arg2: process.argv[4]
})
