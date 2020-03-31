const fs = require('fs')
const got = require('got')

const books = JSON.parse(fs.readFileSync('./books.json', { encoding: 'utf8' }))

async function downloadBook (book) {
  fs.mkdirSync(`./books/${book.title}`)

  let reachedEnd = false
  let currentPage = 1

  do {
    try {
      const response = await got(`https://www.bettybossi.ch/books/${book.id}/html5/tablet/normal/BettyBossi_${currentPage}.jpg`, {
        headers: {
          Cookie: '<COOKIE_HERE>'
        }
      }).buffer()

      fs.writeFileSync(`./books/${book.title}/${currentPage}.jpg`, response)
      currentPage++
    } catch (e) {
      if (e.response.statusCode === 404) {
        reachedEnd = true
      } else {
        console.log('error', e.response.statusCode)
      }
    }
  } while (!reachedEnd)
}

async function main () {
  for (let i = 0; i < books.length; i++) {
    await downloadBook(books[i])
      .catch((e) => {
        console.error('failed to download book: ', e)
      })
  }
}

main()
  .catch((e) => {
    console.log('error occured', e)
  })
