# chrome-extension-randomImg
chrome扩展，随机一个二次元小姐姐

manifest.json 中配置
```js
"devtools_page": "devtools/devtools.html"
```

### 浏览器菜单栏增加popup
```js
"browser_action": {
  "default_icon": {
    "19": "icons/19x19.png",
    "38": "icons/38x38.png"
  },
  "default_title": "That's the tool tip",
  "default_popup": "browser-action/popup.html"
},
```

### 右键菜单
https://open.chrome.360.cn/extension_dev/contextMenus.html
https://groups.google.com/a/chromium.org/g/chromium-extensions/c/9K5Auvrilbo
```js
/**
 * 创建一级菜单
 */
chrome.contextMenus.create({
  id: 'login',
  title: 'login',
  contexts: ['all']
})
/**
 * 创建二级菜单
 */
chrome.contextMenus.create({
  id: `github`,
  parentId: 'RandomImg',
  title: 'github',
  contexts: ['all']
})

const links = {
  'github': 'https://github.com/Adam1977/chrome-extension-randomImg'
}

chrome.contextMenus.onClicked.addListener(info => {
  const url = links[info.menuItemId]
  chrome.tabs.create({
    url
  })
})
```

### content 与 background 通信
```js
// content.js
chrome.runtime.sendMessage({greet:'hello'},function (response) {
  console.log('content get response:', response);
})
```
```js
// background.js
chrome.runtime.onMessage.addListener(function (request, sender,callback) {
  callback('hi!');
})
```

### background.persistent
- true 浏览器重启时会执行
- false 只在插件初始化时执行一次