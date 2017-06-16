var fs = require('fs')
var mkdirp = require('mkdirp')


var root = 'http://velesmebel.by/#/'
var links = [root]
var done = []
var i = 200, id = 0
var pushUrl = l => {
  l = l ? l.replace(/#FOF$/, '') : l
  if (l && l.includes(root) && !links.includes(l) && !done.includes(l)) {
    links.push(l)
  }
}

while (i--) {
  describe('scraper ' + id++, () => {

    let path, link
    it('get ' + id, () => {
      link = links.shift()
      console.log('processing', link)
      if (link) {
        path = './data/' + (link.replace(new RegExp(root + '#?/?'), '') || 'index') + '.html'
        done.push(link)
      }
    })
    it('load ' + id, () => {
      if (!link) return
      return browser.get(link)
    })
    it('expand ' + id, () => {
      if (!link) return
      $$('.LMBtm2').count().then(n => {
        if (n) return $('.LMBtm2').click().click().click().click().click().click().click().click().click().click().click().click()
        return
      })
    })
    it('link ' + id, () => {
      if (!link) return
      $$('a').each(a => a.getAttribute('href').then(t => {
        pushUrl(t)
      }))
    })
    it('mkdir ' + id, () => {
      if (!link) return
      let dir = path.replace(/\/[^/]+$/, '/')
      mkdirp.sync(dir)
    })
    it('dump ' + id, () => {
      if (!path) return
      return browser.getPageSource().then(x => fs.writeFileSync(path, x))
    })
    it('after ' + id, () => console.log(links.length, 'more'))
  })
}

describe('completion', () => {
  it('is complete', () => expect(links.length).toEqual(0))
})