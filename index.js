const fs = require('fs')
const got = require('got')

const books = JSON.parse(fs.readFileSync('./books.json', { encoding: 'utf8' }))

async function downloadBook (book) {
  fs.mkdirSync(`./books/${book.title}`)

  let reachedEnd = false
  let currentPage = 1

  do {
    try {
      console.log(`https://www.bettybossi.ch/books/${book.id}/html5/tablet/normal/BettyBossi_${currentPage}.jpg`)
      const response = await got(`https://www.bettybossi.ch/books/${book.id}/html5/tablet/normal/BettyBossi_${currentPage}.jpg`, {
        headers: {
          Cookie: 'MCSID=Jl17Vq+PBLhUi6VGvdknuxNYLdL6v1LVUBf82bC4KlgQhnq5/tVQEFrZ8uS/WibVQu4v2q1OBoNX6vBY6IUq4xCM; .BBVWROLE=LAAAADAkR2V3w7ZobmxpY2hlckt1bmRlX05pY2h0LUFib25uZW50LFdlYkxvZ09u5Oc8hKbp7RajVUBLGStuk3ypgNc=; UG=qZQwKZKceWaozQQ1Ux3g85x6a5HFMX2frGMHHl2g7H3Kk2Nin5svZaMaBqJZerHHyzNhmpNtdBitpgR/CZbhNJqQ; .ASPXAUTH=C42D880A252E91A58E6EE7A4302A27735762BDFD9F47086B84250F9D1986AEEB3CFEE6AB17AA4852D4ACB72E31FAC62BDE2EA2D75638D234D51EAC5CE1683E9550B6BE4AA6F6387D0C947E386174DEAECA57117AC9C4D393489A648E75C65F23487BD2D4FA8E9FEAB5BF31496913E33C6A9ECA637438AD53A4F0C337CBDFCFA447271345E1D55C47501D9680BEE79097E8A392C245832CC6D2E2B6DE4ED9836018AA2E77806BE3C299ABCC9002AF3BA5DEAD7F43977182889AFEF4A38EF991E0F4761129F1E2D73736F7B40A5F020FB3BE3FD18CE1F2AADCCB823B42E7B18A87C3C18739B9F3F91941145C9CB9B2CAB88B9DFC2BDE57AA124ACBBFF927C5047CA94AE3DD; Rezeptoffensive=BettyBossi'
        }
      }).buffer()

      fs.writeFileSync(`./books/${book.title}/${currentPage}.jpg`, response)
      currentPage++
    } catch (e) {
      if (e.response.statusCode === 404) {
        // book is done
        console.log('book is done')
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
