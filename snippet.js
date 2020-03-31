JSON.stringify(
  [].map.call(document.querySelectorAll('#mybooks ul li a'), (a) => ({ id: /https:\/\/www.bettybossi.ch\/books\/([0-9]*)/g.exec(a.href)[1], title: a.title }))
)
