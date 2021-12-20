const contentOpts = {
  init() {
    this.initSiteData().then((siteData) => {
      this.createLoginBtnForExtension(siteData)
    })
  },
  initSiteData() {
    return new Promise((resolve) => {
      this.sendMsgToBackground(
        {
          type: 'INIT',
          url: origin
        },
        (siteData) => {
          resolve(siteData)
        }
      )
    })
  },
  sendMsgToBackground(msg, callback = () => {}) {
    chrome.runtime.sendMessage(msg, callback)
  },
  createLoginBtnForExtension(siteData) {
    let doms = `
      <div id="get-img-button" style="position:fixed;z-index:9999;right: 10px;top:30px;cursor: pointer;color: blue;color:#fff;font-size: 14px;border-radius: 30px;box-shadow: 2px 2px 30px #ccc;padding: 4px 10px;background: rgba(63,102,246, .6);">来个图</div>
      <div style="position:fixed;z-index:9999;right: 30px;top:80px;">
        <img id="show-img" style="height: 300px;width: 100%;border-radius: 10px;cursor: pointer;box-shadow: 6px 6px 14px #ccc;" />
      </div>`
    $('body').append(doms)
    $(`#get-img-button`).click(function () {
      $('#show-img').css('display', 'inline-block')
      $('#show-img').attr(
        'src',
        'https://api.oick.cn/random/api.php?t=' + new Date().getTime()
      )
    })
    $(`#show-img`).click(function () {
      $('#show-img').css('display', 'none')
    })
  }
}
$(function () {
  contentOpts.init()
})
