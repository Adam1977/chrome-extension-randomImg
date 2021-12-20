let menuData = {}
const createContextMenus = (sites) => {
  /**
   * 创建一级菜单
   */
  chrome.contextMenus.create({
    id: 'RandomImg',
    title: '来个图',
    contexts: ['all']
  })
  /**
   * 创建二级菜单
   */
  Object.keys(sites).forEach((siteId) => {
    const site = sites[siteId]
    if (site.isShowInMenu) {
      chrome.contextMenus.create({
        id: siteId,
        parentId: 'RandomImg',
        title: site.title,
        contexts: ['all']
      })
    }
  })
  chrome.contextMenus.onClicked.addListener((info) => {
    const { menuItemId } = info
    const site = sites[menuItemId]
    const { url } = site
    if (url) {
      chrome.tabs.create({
        url
      })
    }
  })
}

const fetchContextMenus = () => {
  const defaultMenu = {
    github: {
      isShowInMenu: 1,
      title: 'github',
      url: 'https://github.com/Adam1977/chrome-extension-randomImg'
    }
  }
  return new Promise((resolve) =>
    resolve({
      data: {
        info: defaultMenu
      }
    })
  )
  // return fetch('http://api-frontend.dev.styd.cn/data/account?token=data-00d4da9b')
  // .then(function(res) {
  //   return res.json()
  // })
  // .catch(e => {
  //   alert('error' + e)
  // })
}

fetchContextMenus().then((res) => {
  menuData = res.data.info
  createContextMenus(menuData)
})

chrome.runtime.onMessage.addListener(function (request, sender, callback) {
  console.log(request.type)
  switch (request.type) {
    case 'INIT':
      callback(menuData)
      break
    default:
      callback('done')
  }
})
