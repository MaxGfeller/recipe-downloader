const fs = require('fs')
const PDFDocument = require('pdfkit')
const sizeOf = require('image-size')

const books = fs.readdirSync('./books')

for (let i = 0; i < books.length; i++) {
  const files = fs.readdirSync('./books/' + books[i])
  files.sort((a, b) => (parseInt(a) < parseInt(b) ? -1 : 1))

  const dimensions = sizeOf(`./books/${books[i]}/${files[0]}`)
  const doc = new PDFDocument({ autoFirstPage: false, size: [dimensions.width, dimensions.height], margin: 0 })

  doc.pipe(fs.createWriteStream(`books-pdf/${books[i]}.pdf`))

  files.map((file) => {
    doc.addPage()
    doc.image(`./books/${books[i]}/${file}`, 0, 0, { width: dimensions.width, height: dimensions.height, align: 'center' })
  })
  doc.save()
  doc.end()
}
