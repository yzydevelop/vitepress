# DevTools Tips
这一章节的内容可能和面试没有太大关系，但是如果你能很好地使用 DevTools 的话，它能够很好地帮助你提高生产力和解决问题的能力。在这一章节中，我不会去介绍大家经常使用的功能，重点在于让大家学习到一些使用 DevTools 的技巧。
## Elements
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293014473-9a6b36e8-2318-4ded-9d19-1c44c9542934.webp#align=left&display=inline&height=67&margin=%5Bobject%20Object%5D&originHeight=67&originWidth=566&size=0&status=done&style=none&width=566)
这个功能肯定是大家经常用到的，我们可以通过它来可视化所有的 DOM 标签，可以查看任何 DOM 的属性，接下来我们就来学习一下关于这方面的 Tips。
### Element 状态
你可能会在开发中遇到这么一个场景：给一个 `a` 标签设置了多种状态下的样式，但是如果手动去改变状态的话就有点麻烦，这时候这个 Tips 就能帮你解决这个问题。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293014544-c2862ad6-78a6-49df-83b6-12fac86249c0.webp#align=left&display=inline&height=144&margin=%5Bobject%20Object%5D&originHeight=144&originWidth=403&size=0&status=done&style=none&width=403)
可以从上图中看到，无论你想看到元素的何种状态下的样式，都只需要勾选相对应的状态就可以了，这是不是比手动更改方便多了？
### 快速定位 Element
通常页面都是可以滚动的，那么如果想查看的元素不在当前窗口的话，你还需要滚动页面才能找到元素，这时候这个 Tips 就能帮你解决这个问题。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293014496-b3d99e7a-7347-478d-80dc-313580f59104.webp#align=left&display=inline&height=330&margin=%5Bobject%20Object%5D&originHeight=330&originWidth=286&size=0&status=done&style=none&width=286)
当点击这个选项的时候，页面就会自动滚动到元素所在的位置，这样比边滚动边查看是否找到元素的方式方便多了。
### DOM 断点
给 JS 打断点想必各位都听过，但是 DOM 断点知道的人应该就少了。如果你想查看一个 DOM 元素是如何通过 JS 更改的，你就可以使用这个功能。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293014556-5f6ba07e-7f5b-4373-98ed-e2a0b11dd7be.webp#align=left&display=inline&height=295&margin=%5Bobject%20Object%5D&originHeight=295&originWidth=503&size=0&status=done&style=none&width=503)
当我们给 `ul` 添加该断点以后，一旦 `ul` 子元素发生了改动，比如说增加了子元素的个数，那么就会自动跳转到对应的 JS 代码
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293014518-be5cb622-3ff7-4967-9e0b-ba42fdb40f54.webp#align=left&display=inline&height=403&margin=%5Bobject%20Object%5D&originHeight=403&originWidth=612&size=0&status=done&style=none&width=612)
其实不光可以给 DOM 打断点，我们还可以给 Ajax 或者 Event Listener 打断点。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293014520-6a5bfc03-a3b2-43a3-8b72-4089214eff59.webp#align=left&display=inline&height=134&margin=%5Bobject%20Object%5D&originHeight=134&originWidth=209&size=0&status=done&style=none&width=209)
### 查看事件
我们还可以通过 DevTools 来查看页面中添加了多少的事件。假如当你发现页面滚动起来有性能上的问题时，就可以查看一下有多少 `scroll` 事件被添加了
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293014551-907fdfa6-cde4-434f-aa3b-e459025a7ad1.webp#align=left&display=inline&height=458&margin=%5Bobject%20Object%5D&originHeight=458&originWidth=614&size=0&status=done&style=none&width=614)
### 找到之前查看过的 DOM 元素
不知道你是否遇到过这样的问题，找不到之前查看过的 DOM 元素在哪里了，需要一个个去找这就有点麻烦了，这时候你就可以使用这个功能。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293015022-479772b3-7311-4b85-bf93-3275dc88bd26.webp#align=left&display=inline&height=176&margin=%5Bobject%20Object%5D&originHeight=176&originWidth=589&size=0&status=done&style=none&width=589)
我们可以通过 `$0` 来找到上一次查看过的 DOM 元素，`$1` 就是上上次的元素，之后以此类推。这时候你可能会说，打印出来元素有啥用，在具体什么位置还要去找啊，不用急，马上我就可以解决这个问题
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293014529-487ebd26-9f19-4b96-94a9-412d9e14534b.webp#align=left&display=inline&height=82&margin=%5Bobject%20Object%5D&originHeight=82&originWidth=381&size=0&status=done&style=none&width=381)
当你点击这个选项时，页面立马会跳转至元素所在位置，并且 DevTools 也会变到 Elements 标签。
## Debugging
给 JS 打断点想必大家都会，但是打断点也是有一个不为人知的 Tips 的。
```
for (let index = 0; index < 10; index++) {
  // 各种逻辑
  console.log(index)
}
```
对于这段代码来说，如果我只想看到 `index` 为 `5` 时相应的断点信息，但是一旦打了断点，就会每次循环都会停下来，很浪费时间，那么通过这个小技巧我们就可以圆满解决这个问题
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293014524-03f81d58-359f-414a-bf82-967ff72fcbc1.webp#align=left&display=inline&height=125&margin=%5Bobject%20Object%5D&originHeight=125&originWidth=228&size=0&status=done&style=none&width=228)
首先我们先右键断点，然后选择 `Edit breakpoint...` 选项
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293014542-dec0de03-e009-47b1-9ce4-988bc53e916d.webp#align=left&display=inline&height=106&margin=%5Bobject%20Object%5D&originHeight=106&originWidth=445&size=0&status=done&style=none&width=445)
在弹框内输入 `index === 5`，这样断点就会变为橙色，并且只有当符合表达式的情况时断点才会被执行
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293014547-ad2a9d31-b472-4432-b477-9911c35224d7.webp#align=left&display=inline&height=57&margin=%5Bobject%20Object%5D&originHeight=57&originWidth=345&size=0&status=done&style=none&width=345)
# 浏览器基础知识点及常考面试题
这一章节我们将会来学习浏览器的一些基础知识点，包括：事件机制、跨域、存储相关，这几个知识点也是面试经常会考到的内容。
## 事件机制
```
涉及面试题：事件的触发过程是怎么样的？知道什么是事件代理嘛？
```
### 事件触发三阶段
事件触发有三个阶段：

- `window` 往事件触发处传播，遇到注册的捕获事件会触发
- 传播到事件触发处时触发注册的事件
- 从事件触发处往 `window` 传播，遇到注册的冒泡事件会触发

事件触发一般来说会按照上面的顺序进行，但是也有特例，**如果给一个 `body` 中的子节点同时注册冒泡和捕获事件，事件触发会按照注册的顺序执行。**
```
// 以下会先打印冒泡然后是捕获
node.addEventListener(
  'click',
  event => {
    console.log('冒泡')
  },
  false
)
node.addEventListener(
  'click',
  event => {
    console.log('捕获 ')
  },
  true
)
```
### 注册事件
通常我们使用 `addEventListener` 注册事件，该函数的第三个参数可以是布尔值，也可以是对象。对于布尔值 `useCapture` 参数来说，该参数默认值为 `false` ，`useCapture` 决定了注册的事件是捕获事件还是冒泡事件。对于对象参数来说，可以使用以下几个属性

- `capture`：布尔值，和 `useCapture` 作用一样
- `once`：布尔值，值为 `true` 表示该回调只会调用一次，调用后会移除监听
- `passive`：布尔值，表示永远不会调用 `preventDefault`

一般来说，如果我们只希望事件只触发在目标上，这时候可以使用 `stopPropagation` 来阻止事件的进一步传播。通常我们认为 `stopPropagation` 是用来阻止事件冒泡的，其实该函数也可以阻止捕获事件。`stopImmediatePropagation` 同样也能实现阻止事件，但是还能阻止该事件目标执行别的注册事件。
```
node.addEventListener(
  'click',
  event => {
    event.stopImmediatePropagation()
    console.log('冒泡')
  },
  false
)
// 点击 node 只会执行上面的函数，该函数不会执行
node.addEventListener(
  'click',
  event => {
    console.log('捕获 ')
  },
  true
)
```
### 事件代理
如果一个节点中的子节点是动态生成的，那么子节点需要注册事件的话**应该注册在父节点上**
```
<ul id="ul">
	<li>1</li>
    <li>2</li>
	<li>3</li>
	<li>4</li>
	<li>5</li>
</ul>
<script>
	let ul = document.querySelector('#ul')
	ul.addEventListener('click', (event) => {
		console.log(event.target);
	})
</script>
```
事件代理的方式相较于直接给目标注册事件来说，有以下优点：

- 节省内存
- 不需要给子节点注销事件
## 跨域
```
涉及面试题：什么是跨域？为什么浏览器要使用同源策略？你有几种方式可以解决跨域问题？了解预检请求嘛？
```
因为浏览器出于安全考虑，有同源策略。也就是说，如果协议、域名或者端口有一个不同就是跨域，Ajax 请求会失败。
**那么是出于什么安全考虑才会引入这种机制呢？** 其实主要是用来防止 CSRF 攻击的。简单点说，CSRF 攻击是利用用户的登录态发起恶意请求。
也就是说，没有同源策略的情况下，A 网站可以被任意其他来源的 Ajax 访问到内容。如果你当前 A 网站还存在登录态，那么对方就可以通过 Ajax 获得你的任何信息。当然跨域并不能完全阻止 CSRF。
**然后我们来考虑一个问题，请求跨域了，那么请求到底发出去没有？** 请求必然是发出去了，但是浏览器拦截了响应。你可能会疑问明明通过表单的方式可以发起跨域请求，为什么 Ajax 就不会。因为归根结底，跨域是为了阻止用户读取到另一个域名下的内容，Ajax 可以获取响应，浏览器认为这不安全，所以拦截了响应。但是表单并不会获取新的内容，所以可以发起跨域请求。同时也说明了跨域并不能完全阻止 CSRF，因为请求毕竟是发出去了。
接下来我们将来学习几种常见的方式来解决跨域的问题。
### JSONP
JSONP 的原理很简单，就是利用 `<script>` 标签没有跨域限制的漏洞。通过 `<script>` 标签指向一个需要访问的地址并提供一个回调函数来接收数据当需要通讯时。
```
<script src="http://domain/api?param1=a&param2=b&callback=jsonp"></script>
<script>
    function jsonp(data) {
    	console.log(data)
	}
</script>
```
JSONP 使用简单且兼容性不错，但是只限于 `get` 请求。
在开发中可能会遇到多个 JSONP 请求的回调函数名是相同的，这时候就需要自己封装一个 JSONP，以下是简单实现
```
function jsonp(url, jsonpCallback, success) {
  let script = document.createElement('script')
  script.src = url
  script.async = true
  script.type = 'text/javascript'
  window[jsonpCallback] = function(data) {
    success && success(data)
  }
  document.body.appendChild(script)
}
jsonp('http://xxx', 'callback', function(value) {
  console.log(value)
})
```
### CORS
CORS 需要浏览器和后端同时支持。IE 8 和 9 需要通过 `XDomainRequest` 来实现。
浏览器会自动进行 CORS 通信，实现 CORS 通信的关键是后端。只要后端实现了 CORS，就实现了跨域。
服务端设置 `Access-Control-Allow-Origin` 就可以开启 CORS。 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。
虽然设置 CORS 和前端没什么关系，但是通过这种方式解决跨域问题的话，会在发送请求时出现两种情况，分别为**简单请求和复杂请求**。
#### 简单请求
以 Ajax 为例，当满足以下条件时，会触发简单请求

1. 使用下列方法之一：
   - `GET`

   - `HEAD`

   - `POST`

2. `Content-Type`的值仅限于下列三者之一：
   - `text/plain`

   - `multipart/form-data`

   - `application/x-www-form-urlencoded`


请求中的任意 `XMLHttpRequestUpload` 对象均没有注册任何事件监听器； `XMLHttpRequestUpload` 对象可以使用 `XMLHttpRequest.upload` 属性访问。
#### 复杂请求
那么很显然，不符合以上条件的请求就肯定是复杂请求了。
对于复杂请求来说，首先会发起一个预检请求，该请求是 `option` 方法的，通过该请求来知道服务端是否允许跨域请求。
对于预检请求来说，如果你使用过 Node 来设置 CORS 的话，可能会遇到过这么一个坑。
以下以 express 框架举例：
```
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
  )
  next()
})
```
该请求会验证你的 `Authorization` 字段，没有的话就会报错。
当前端发起了复杂请求后，你会发现就算你代码是正确的，返回结果也永远是报错的。因为预检请求也会进入回调中，也会触发 `next` 方法，因为预检请求并不包含 `Authorization` 字段，所以服务端会报错。
想解决这个问题很简单，只需要在回调中过滤 `option` 方法即可
```
res.statusCode = 204
res.setHeader('Content-Length', '0')
res.end()
```
### document.domain
该方式只能用于**二级域名相同**的情况下，比如 `a.test.com` 和 `b.test.com` 适用于该方式。
只需要给页面添加 `document.domain = 'test.com'` 表示二级域名都相同就可以实现跨域
### postMessage
这种方式通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息
```
// 发送消息端
window.parent.postMessage('message', 'http://test.com')
// 接收消息端
var mc = new MessageChannel()
mc.addEventListener('message', event => {
  var origin = event.origin || event.originalEvent.origin
  if (origin === 'http://test.com') {
    console.log('验证通过')
  }
})
```
## 存储
```
涉及面试题：有几种方式可以实现存储功能，分别有什么优缺点？什么是 Service Worker？
```
### cookie，localStorage，sessionStorage，indexDB
我们先来通过表格学习下这几种存储方式的区别

| 特性 | cookie | localStorage | sessionStorage | indexDB |
| --- | --- | --- | --- | --- |
| 数据生命周期 | 一般由服务器生成，可以设置过期时间 | 除非被清理，否则一直存在 | 页面关闭就清理 | 除非被清理，否则一直存在 |
| 数据存储大小 | 4K | 5M | 5M | 无限 |
| 与服务端通信 | 每次都会携带在 header 中，对于请求性能影响 | 不参与 | 不参与 | 不参与 |


从上表可以看到，`cookie` 已经不建议用于存储。如果没有大量数据存储需求的话，可以使用 `localStorage` 和 `sessionStorage` 。对于不怎么改变的数据尽量使用 `localStorage` 存储，否则可以用 `sessionStorage` 存储。
对于 `cookie` 来说，我们还需要注意安全性。

| 属性 | 作用 |
| --- | --- |
| value | 如果用于保存用户登录态，应该将该值加密，不能使用明文的用户标识 |
| http-only | 不能通过 JS 访问 Cookie，减少 XSS 攻击 |
| secure | 只能在协议为 HTTPS 的请求中携带 |
| same-site | 规定浏览器不能在跨域请求中携带 Cookie，减少 CSRF 攻击 |


### Service Worker
Service Worker 是运行在浏览器背后的**独立线程**，一般可以用来实现缓存功能。使用 Service Worker的话，传输协议必须为 **HTTPS**。因为 Service Worker 中涉及到请求拦截，所以必须使用 HTTPS 协议来保障安全。
Service Worker 实现缓存功能一般分为三个步骤：首先需要先注册 Service Worker，然后监听到 `install` 事件以后就可以缓存需要的文件，那么在下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据。以下是这个步骤的实现：
```
// index.js
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register('sw.js')
    .then(function(registration) {
      console.log('service worker 注册成功')
    })
    .catch(function(err) {
      console.log('servcie worker 注册失败')
    })
}
// sw.js
// 监听 `install` 事件，回调中缓存所需文件
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll(['./index.html', './index.js'])
    })
  )
})
// 拦截所有请求事件
// 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) {
        return response
      }
      console.log('fetch source')
    })
  )
})
```
打开页面，可以在开发者工具中的 `Application` 看到 Service Worker 已经启动了!![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293046197-a265bff9-ee99-4410-91ab-9348e68d1109.png#align=left&display=inline&height=522&margin=%5Bobject%20Object%5D&originHeight=522&originWidth=1280&size=0&status=done&style=none&width=1280)
在 Cache 中也可以发现我们所需的文件已被缓存
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293046270-33e1bbeb-a81d-4f45-b874-02fcd21d0fc5.webp#align=left&display=inline&height=728&margin=%5Bobject%20Object%5D&originHeight=728&originWidth=1118&size=0&status=done&style=none&width=1118)
当我们重新刷新页面可以发现我们缓存的数据是从 Service Worker 中读取的
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293046172-ce21228b-1272-40d0-a483-6674b6ccfb17.png#align=left&display=inline&height=135&margin=%5Bobject%20Object%5D&originHeight=135&originWidth=1280&size=0&status=done&style=none&width=1280)
# 浏览器缓存机制
```
注意：该知识点属于性能优化领域，并且整一章节都是一个面试题。
```
缓存可以说是性能优化中**简单高效**的一种优化方式了，它可以**显著减少网络传输所带来的损耗**。
对于一个数据请求来说，可以分为发起网络请求、后端处理、浏览器响应三个步骤。浏览器缓存可以帮助我们在第一和第三步骤中优化性能。比如说直接使用缓存而不发起请求，或者发起了请求但后端存储的数据和前端一致，那么就没有必要再将数据回传回来，这样就减少了响应数据。
接下来的内容中我们将通过以下几个部分来探讨浏览器缓存机制：

- 缓存位置
- 缓存策略
- 实际场景应用缓存策略
## 缓存位置
从缓存位置上来说分为四种，并且各自有**优先级**，当依次查找缓存且都没有命中的时候，才会去请求网络

1. Service Worker
1. Memory Cache
1. Disk Cache
1. Push Cache
1. 网络请求
### Service Worker
在上一章节中我们已经介绍了 Service Worker 的内容，这里就不演示相关的代码了。
Service Worker 的缓存与浏览器其他内建的缓存机制不同，它可以让我们**自由控制**缓存哪些文件、如何匹配缓存、如何读取缓存，并且**缓存是持续性的**。
当 Service Worker 没有命中缓存的时候，我们需要去调用 `fetch` 函数获取数据。也就是说，如果我们没有在 Service Worker 命中缓存的话，会根据缓存查找优先级去查找数据。**但是不管我们是从 Memory Cache 中还是从网络请求中获取的数据，浏览器都会显示我们是从 Service Worker 中获取的内容。**
### Memory Cache
Memory Cache 也就是内存中的缓存，读取内存中的数据肯定比磁盘快。**但是内存缓存虽然读取高效，可是缓存持续性很短，会随着进程的释放而释放。** 一旦我们关闭 Tab 页面，内存中的缓存也就被释放了。
当我们访问过页面以后，再次刷新页面，可以发现很多数据都来自于内存缓存
![image.svg](https://cdn.nlark.com/yuque/0/2021/svg/1658583/1615293071388-dc257dbf-1956-4fce-99a5-eee8000ab9f0.svg#align=left&display=inline&height=149&margin=%5Bobject%20Object%5D&name=image.svg&originHeight=149&originWidth=794&size=106&status=done&style=none&width=794)
那么既然内存缓存这么高效，我们是不是能让数据都存放在内存中呢？
先说结论，这是**不可能**的。首先计算机中的内存一定比硬盘容量小得多，操作系统需要精打细算内存的使用，所以能让我们使用的内存必然不多。内存中其实可以存储大部分的文件，比如说 JSS、HTML、CSS、图片等等。但是浏览器会把哪些文件丢进内存这个过程就很**玄学**了，我查阅了很多资料都没有一个定论。
当然，我通过一些实践和猜测也得出了一些结论：

- 对于大文件来说，大概率是不存储在内存中的，反之优先
- 当前系统内存使用率高的话，文件优先存储进硬盘
### Disk Cache
Disk Cache 也就是存储在硬盘中的缓存，读取速度慢点，但是什么都能存储到磁盘中，比之 Memory Cache **胜在容量和存储时效性上。**
在所有浏览器缓存中，Disk Cache 覆盖面基本是最大的。它会根据 HTTP Herder 中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求。**并且即使在跨站点的情况下，相同地址的资源一旦被硬盘缓存下来，就不会再次去请求数据。**
### Push Cache
Push Cache 是 HTTP/2 中的内容，当以上三种缓存都没有命中时，它才会被使用。**并且缓存时间也很短暂，只在会话（Session）中存在，一旦会话结束就被释放。**
Push Cache 在国内能够查到的资料很少，也是因为 HTTP/2 在国内不够普及，但是 HTTP/2 将会是日后的一个趋势。这里推荐阅读 [HTTP/2 push is tougher than I thought](https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/) 这篇文章，但是内容是英文的，我翻译一下文章中的几个结论，有能力的同学还是推荐自己阅读

- 所有的资源都能被推送，但是 Edge 和 Safari 浏览器兼容性不怎么好
- 可以推送 `no-cache` 和 `no-store` 的资源
- 一旦连接被关闭，Push Cache 就被释放
- 多个页面可以使用相同的 HTTP/2 连接，也就是说能使用同样的缓存
- Push Cache 中的缓存只能被使用一次
- 浏览器可以拒绝接受已经存在的资源推送
- 你可以给其他域名推送资源
### 网络请求
如果所有缓存都没有命中的话，那么只能发起请求来获取资源了。
那么为了性能上的考虑，大部分的接口都应该选择好缓存策略，接下来我们就来学习缓存策略这部分的内容。
## 缓存策略
通常浏览器缓存策略分为两种：**强缓存**和**协商缓存**，并且缓存策略都是通过设置 HTTP Header 来实现的。
### 强缓存
强缓存可以通过设置两种 HTTP Header 实现：`Expires` 和 `Cache-Control` 。强缓存表示在缓存期间不需要请求，`state code` 为 200。
#### Expires
```
Expires: Wed, 22 Oct 2018 08:41:00 GMT
```
`Expires` 是 HTTP/1 的产物，表示资源会在 `Wed, 22 Oct 2018 08:41:00 GMT` 后过期，需要再次请求。并且 `Expires` **受限于本地时间**，如果修改了本地时间，可能会造成缓存失效。
#### Cache-control
```
Cache-control: max-age=30
```
`Cache-Control` 出现于 HTTP/1.1，**优先级高于 `Expires`** 。该属性值表示资源会在 30 秒后过期，需要再次请求。
`Cache-Control` **可以在请求头或者响应头中设置**，并且可以组合使用多种指令
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293071368-c9177213-19b4-40e0-81c4-9f315f932c28.webp#align=left&display=inline&height=600&margin=%5Bobject%20Object%5D&originHeight=600&originWidth=595&size=0&status=done&style=none&width=595)
从图中我们可以看到，我们可以将**多个指令配合起来一起使用**，达到多个目的。比如说我们希望资源能被缓存下来，并且是客户端和代理服务器都能缓存，还能设置缓存失效时间等等。
接下来我们就来学习一些常见指令的作用
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293071402-21f36fc4-92c8-48b2-88a0-23d6b766ab5f.webp#align=left&display=inline&height=486&margin=%5Bobject%20Object%5D&originHeight=486&originWidth=770&size=0&status=done&style=none&width=770)
### 协商缓存
如果缓存过期了，就需要发起请求验证资源是否有更新。协商缓存可以通过设置两种 HTTP Header 实现：`Last-Modified` 和 `ETag` 。
当浏览器发起请求验证资源时，如果资源没有做改变，那么服务端就会返回 304 状态码，并且更新浏览器缓存有效期。
![image.svg](https://cdn.nlark.com/yuque/0/2021/svg/1658583/1615293071394-61e59175-6534-43a0-9629-e35b31a4a625.svg#align=left&display=inline&height=215&margin=%5Bobject%20Object%5D&name=image.svg&originHeight=215&originWidth=474&size=106&status=done&style=none&width=474)
#### Last-Modified 和 If-Modified-Since
`Last-Modified` 表示本地文件最后修改日期，`If-Modified-Since` 会将 `Last-Modified` 的值发送给服务器，询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来，否则返回 304 状态码。
但是 `Last-Modified` 存在一些弊端：

- 如果本地打开缓存文件，即使没有对文件进行修改，但还是会造成 `Last-Modified` 被修改，服务端不能命中缓存导致发送相同的资源
- 因为 `Last-Modified` 只能以秒计时，如果在不可感知的时间内修改完成文件，那么服务端会认为资源还是命中了，不会返回正确的资源

因为以上这些弊端，所以在 HTTP / 1.1 出现了 `ETag` 。
#### ETag 和 If-None-Match
`ETag` 类似于文件指纹，`If-None-Match` 会将当前 `ETag` 发送给服务器，询问该资源 `ETag` 是否变动，有变动的话就将新的资源发送回来。并且 `ETag` 优先级比 `Last-Modified` 高。
以上就是缓存策略的所有内容了，看到这里，不知道你是否存在这样一个疑问。**如果什么缓存策略都没设置，那么浏览器会怎么处理？**
对于这种情况，浏览器会采用一个启发式的算法，通常会取响应头中的 `Date` 减去 `Last-Modified` 值的 10% 作为缓存时间。
## 实际场景应用缓存策略
单纯了解理论而不付诸于实践是没有意义的，接下来我们来通过几个场景学习下如何使用这些理论。
### 频繁变动的资源
对于频繁变动的资源，首先需要使用 `Cache-Control: no-cache` 使浏览器每次都请求服务器，然后配合 `ETag` 或者 `Last-Modified` 来验证资源是否有效。这样的做法虽然不能节省请求数量，但是能显著减少响应数据大小。
### 代码文件
这里特指除了 HTML 外的代码文件，因为 HTML 文件一般不缓存或者缓存时间很短。
一般来说，现在都会使用工具来打包代码，那么我们就可以对文件名进行哈希处理，只有当代码修改后才会生成新的文件名。基于此，我们就可以给代码文件设置缓存有效期一年 `Cache-Control: max-age=31536000`，这样只有当 HTML 文件中引入的文件名发生了改变才会去下载最新的代码文件，否则就一直使用缓存。
# 浏览器渲染原理
```
注意：该章节都是一个面试题。
```
在这一章节中，我们将来学习浏览器渲染原理这部分的知识。你可能会有疑问，我又不是做浏览器研发的，为什么要来学习这个？其实我们学习浏览器渲染原理更多的是为了解决性能的问题，如果你不了解这部分的知识，你就不知道什么情况下会对性能造成损伤。**并且渲染原理在面试中答得好，也是一个能与其他候选人拉开差距的一点。**
我们知道执行 JS 有一个 JS 引擎，那么执行渲染也有一个渲染引擎。同样，渲染引擎在不同的浏览器中也不是都相同的。比如在 Firefox 中叫做 **Gecko**，在 Chrome 和 Safari 中都是基于 **WebKit** 开发的。在这一章节中，我们也会主要学习关于 **WebKit** 的这部分渲染引擎内容。
## 浏览器接收到 HTML 文件并转换为 DOM 树
当我们打开一个网页时，浏览器都会去请求对应的 HTML 文件。虽然平时我们写代码时都会分为 JS、CSS、HTML 文件，也就是字符串，但是计算机硬件是不理解这些字符串的，所以在网络中传输的内容其实都是 `0` 和 `1` 这些**字节数据**。当浏览器接收到这些字节数据以后，它会将这些**字节数据转换为字符串**，也就是我们写的代码。
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293098545-34bf64aa-f479-44c0-8fe9-00027831acc1.png#align=left&display=inline&height=91&margin=%5Bobject%20Object%5D&originHeight=91&originWidth=369&size=0&status=done&style=none&width=369)
当数据转换为字符串以后，浏览器会先将这些字符串通过词法分析转换为**标记**（token），这一过程在词法分析中叫做**标记化**（tokenization）。
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293098547-ec2f6cb1-53e1-48e3-8fd4-97a15748e2f6.png#align=left&display=inline&height=80&margin=%5Bobject%20Object%5D&originHeight=80&originWidth=496&size=0&status=done&style=none&width=496)
那么什么是标记呢？这其实属于编译原理这一块的内容了。简单来说，标记还是字符串，是构成代码的**最小单位**。这一过程会将代码分拆成一块块，并给这些内容打上标记，便于理解这些最小单位的代码是什么意思。
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293098612-826f9f59-8059-42a0-9ac5-2ae352733fdf.png#align=left&display=inline&height=214&margin=%5Bobject%20Object%5D&originHeight=214&originWidth=519&size=0&status=done&style=none&width=519)
当结束标记化后，这些标记会紧接着转换为 Node，最后这些 Node 会根据不同 Node 之前的联系构建为一颗 DOM 树。
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293098547-1967a168-3900-498c-a7f6-616471852405.png#align=left&display=inline&height=274&margin=%5Bobject%20Object%5D&originHeight=274&originWidth=622&size=0&status=done&style=none&width=622)
以上就是浏览器从网络中接收到 HTML 文件然后一系列的转换过程。
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293098555-7b182293-8940-44ab-bcb6-ec788b2ae22e.png#align=left&display=inline&height=141&margin=%5Bobject%20Object%5D&originHeight=141&originWidth=794&size=0&status=done&style=none&width=794)
当然，在解析 HTML 文件的时候，浏览器还会遇到 CSS 和 JS 文件，这时候浏览器也会去下载并解析这些文件，接下来就让我们先来学习浏览器如何解析 CSS 文件。
## 将 CSS 文件转换为 CSSOM 树
其实转换 CSS 到 CSSOM 树的过程和上一小节的过程是极其类似的
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293098570-46187e4c-e4f3-496f-9657-86e18b86a39f.png#align=left&display=inline&height=155&margin=%5Bobject%20Object%5D&originHeight=155&originWidth=778&size=0&status=done&style=none&width=778)
在这一过程中，浏览器会确定下每一个节点的**样式**到底是什么，并且这一过程其实是**很消耗资源**的。因为样式你可以自行设置给某个节点，也可以通过继承获得。在这一过程中，浏览器得**递归** CSSOM 树，然后确定具体的元素到底是什么样式。
如果你有点不理解为什么会消耗资源的话，我这里举个例子
```
<div>
  <a> <span></span> </a>
</div>
<style>
  span {
    color: red;
  }
  div > a > span {
    color: red;
  }
</style>
```
对于第一种设置样式的方式来说，浏览器只需要找到页面中所有的 `span` 标签然后设置颜色，但是对于第二种设置样式的方式来说，浏览器首先需要找到所有的 `span` 标签，然后找到 `span` 标签上的 `a` 标签，最后再去找到 `div` 标签，然后给符合这种条件的 `span` 标签设置颜色，这样的递归过程就很复杂。所以我们应该尽可能的避免写**过于具体**的 CSS 选择器，然后对于 HTML 来说也尽量少的添加无意义标签，保证**层级扁平**。
## 生成渲染树
当我们生成 DOM 树和 CSSOM 树以后，就需要将这两棵树组合为渲染树。
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293098560-a563c03e-95a9-4a0f-b41a-baeb5108c22f.png#align=left&display=inline&height=537&margin=%5Bobject%20Object%5D&originHeight=537&originWidth=1150&size=0&status=done&style=none&width=1150)
在这一过程中，不是简单的将两者合并就行了。渲染树只会包括**需要显示的节点**和这些节点的样式信息，如果某个节点是 `display: none` 的，那么就不会在渲染树中显示。
当浏览器生成渲染树以后，就会根据渲染树来进行布局（也可以叫做回流），然后调用 GPU 绘制，合成图层，显示在屏幕上。对于这一部分的内容因为过于底层，还涉及到了硬件相关的知识，这里就不再继续展开内容了。
那么通过以上内容，我们已经详细了解到了浏览器从接收文件到将内容渲染在屏幕上的这一过程。接下来，我们将会来学习上半部分遗留下来的一些知识点。
## 为什么操作 DOM 慢
想必大家都听过操作 DOM 性能很差，但是这其中的原因是什么呢？
因为 DOM 是属于渲染引擎中的东西，而 JS 又是 JS 引擎中的东西。当我们通过 JS 操作 DOM 的时候，其实这个操作涉及到了两个线程之间的通信，那么势必会带来一些性能上的损耗。操作 DOM 次数一多，也就等同于一直在进行线程之间的通信，并且操作 DOM 可能还会带来重绘回流的情况，所以也就导致了性能上的问题。
```
经典面试题：插入几万个 DOM，如何实现页面不卡顿？
```
对于这道题目来说，首先我们肯定不能一次性把几万个 DOM 全部插入，这样肯定会造成卡顿，所以解决问题的重点应该是如何分批次部分渲染 DOM。大部分人应该可以想到通过 `requestAnimationFrame` 的方式去循环的插入 DOM，其实还有种方式去解决这个问题：**虚拟滚动**（virtualized scroller）。
**这种技术的原理就是只渲染可视区域内的内容，非可见区域的那就完全不渲染了，当用户在滚动的时候就实时去替换渲染的内容。**
![](https://cdn.nlark.com/yuque/0/2021/gif/1658583/1615293098563-9096ea88-7d17-4f63-b33c-11320f8d863a.gif#align=left&display=inline&height=380&margin=%5Bobject%20Object%5D&originHeight=380&originWidth=1204&size=0&status=done&style=none&width=1204)
从上图中我们可以发现，即使列表很长，但是渲染的 DOM 元素永远只有那么几个，当我们滚动页面的时候就会实时去更新 DOM，这个技术就能顺利解决这道经典面试题。如果你想了解更多的内容可以了解下这个 [react-virtualized](https://github.com/bvaughn/react-virtualized)。
## 什么情况阻塞渲染
首先渲染的前提是生成渲染树，所以 HTML 和 CSS 肯定会阻塞渲染。如果你想渲染的越快，你越应该降低一开始需要渲染的文件**大小**，并且**扁平层级，优化选择器**。
然后当浏览器在解析到 `script` 标签时，会暂停构建 DOM，完成后才会从暂停的地方重新开始。也就是说，如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件，这也是都建议将 `script` 标签放在 `body` 标签底部的原因。
当然在当下，并不是说 `script` 标签必须放在底部，因为你可以给 `script` 标签添加 `defer` 或者 `async` 属性。
当 `script` 标签加上 `defer` 属性以后，表示该 JS 文件会并行下载，但是会放到 HTML 解析完成后顺序执行，所以对于这种情况你可以把 `script` 标签放在任意位置。
对于没有任何依赖的 JS 文件可以加上 `async` 属性，表示 JS 文件下载和解析不会阻塞渲染。
## 重绘（Repaint）和回流（Reflow）
重绘和回流会在我们设置节点样式时频繁出现，同时也会很大程度上影响性能。

- 重绘是当节点需要更改外观而不会影响布局的，比如改变 `color` 就叫称为重绘
- 回流是布局或者几何属性需要改变就称为回流。

回流**必定**会发生重绘，重绘**不一定**会引发回流。回流所需的成本比重绘高的多，改变父节点里的子节点很可能会导致父节点的一系列回流。
以下几个动作可能会导致性能问题：

- 改变 `window` 大小
- 改变字体
- 添加或删除样式
- 文字改变
- 定位或者浮动
- 盒模型

并且很多人不知道的是，重绘和回流其实也和 Eventloop 有关。

1. 当 Eventloop 执行完 Microtasks 后，会判断 `document` 是否需要更新，因为浏览器是 60Hz 的刷新率，每 16.6ms 才会更新一次。
1. 然后判断是否有 `resize` 或者 `scroll` 事件，有的话会去触发事件，所以 `resize` 和 `scroll` 事件也是至少 16ms 才会触发一次，并且自带节流功能。
1. 判断是否触发了 media query
1. 更新动画并且发送事件
1. 判断是否有全屏操作事件
1. 执行 `requestAnimationFrame` 回调
1. 执行 `IntersectionObserver` 回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
1. 更新界面
1. 以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 `requestIdleCallback` 回调。

以上内容来自于 [HTML 文档](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)。
既然我们已经知道了重绘和回流会影响性能，那么接下来我们将会来学习如何减少重绘和回流的次数。
### 减少重绘和回流

- 使用 `transform` 替代 `top`
```
<div class="test"></div>
<style>
  .test {
    position: absolute;
    top: 10px;
    width: 100px;
    height: 100px;
    background: red;
  }
</style>
<script>
  setTimeout(() => {
    // 引起回流
    document.querySelector('.test').style.top = '100px'
  }, 1000)
</script>
```

- 使用 `visibility` 替换 `display: none` ，因为前者只会引起重绘，后者会引发回流（改变了布局）

- 不要把节点的属性值放在一个循环里当成循环里的变量
```
for(let i = 0; i < 1000; i++) {
    // 获取 offsetTop 会导致回流，因为需要去获取正确的值
    console.log(document.querySelector('.test').style.offsetTop)
}
```

- 不要使用 `table` 布局，可能很小的一个小改动会造成整个 `table` 的重新布局

- 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 `requestAnimationFrame`

- CSS 选择符**从右往左**匹配查找，避免节点层级过多

- 将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点。比如对于`video`标签来说，浏览器会自动将该节点变为图层。![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293098614-7714c522-ef4b-4d16-b989-74b154adcc27.png#align=left&display=inline&height=619&margin=%5Bobject%20Object%5D&originHeight=619&originWidth=1280&size=0&status=done&style=none&width=1280)设置节点为图层的方式有很多，我们可以通过以下几个常用属性可以生成新图层
   - `will-change`
   - `video`、`iframe` 标签
## 思考题
```
思考题：在不考虑缓存和优化网络协议的前提下，考虑可以通过哪些方式来最快的渲染页面，也就是常说的关键渲染路径，这部分也是性能优化中的一块内容。
```
首先你可能会疑问，那怎么测量到底有没有加快渲染速度呢
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293098592-88180b71-8232-4dde-b9c1-62e6e48c5979.png#align=left&display=inline&height=344&margin=%5Bobject%20Object%5D&originHeight=344&originWidth=838&size=0&status=done&style=none&width=838)
当发生 `DOMContentLoaded` 事件后，就会生成渲染树，生成渲染树就可以进行渲染了，这一过程更大程度上和硬件有关系了。
**提示如何加速：**

1. 从文件大小考虑
1. 从 `script` 标签使用上来考虑
1. 从 CSS、HTML 的代码书写上来考虑
1. 从需要下载的内容是否需要在首屏使用上来考虑

以上提示大家都可以从文中找到，同时也欢迎大家踊跃在评论区写出你的答案。
# 安全防范知识点
这一章我们将来学习安全防范这一块的知识点。总的来说安全是很复杂的一个领域，不可能通过一个章节就能学习到这部分的内容。在这一章节中，我们会学习到常见的一些安全问题及如何防范的内容，在当下其实安全问题越来越重要，已经逐渐成为前端开发必备的技能了。
## XSS
```
涉及面试题：什么是 XSS 攻击？如何防范 XSS 攻击？什么是 CSP？
```
XSS 简单点来说，就是攻击者想尽一切办法将可以执行的代码注入到网页中。
XSS 可以分为多种类型，但是总体上我认为分为两类：**持久型和非持久型**。
持久型也就是攻击的代码被服务端写入进**数据库**中，这种攻击危害性很大，因为如果网站访问量很大的话，就会导致大量正常访问页面的用户都受到攻击。
举个例子，对于评论功能来说，就得防范持久型 XSS 攻击，因为我可以在评论中输入以下内容
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293201000-437f6b43-e261-41b4-b597-022d8209a670.webp#align=left&display=inline&height=302&margin=%5Bobject%20Object%5D&originHeight=302&originWidth=1280&size=0&status=done&style=none&width=1280)
这种情况如果前后端没有做好防御的话，这段评论就会被存储到数据库中，这样每个打开该页面的用户都会被攻击到。
非持久型相比于前者危害就小的多了，一般通过**修改 URL 参数**的方式加入攻击代码，诱导用户访问链接从而进行攻击。
举个例子，如果页面需要从 URL 中获取某些参数作为内容的话，不经过过滤就会导致攻击代码被执行
```
<!-- http://www.domain.com?name=<script>alert(1)</script> -->
<div>{{name}}</div>
```
但是对于这种攻击方式来说，如果用户使用 Chrome 这类浏览器的话，浏览器就能自动帮助用户防御攻击。但是我们不能因此就不防御此类攻击了，因为我不能确保用户都使用了该类浏览器。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293201005-f466be60-5a07-400f-af15-c2b16870b91f.webp#align=left&display=inline&height=292&margin=%5Bobject%20Object%5D&originHeight=292&originWidth=647&size=0&status=done&style=none&width=647)
对于 XSS 攻击来说，通常有两种方式可以用来防御。
### 转义字符
首先，对于用户的输入应该是永远不信任的。最普遍的做法就是转义输入输出的内容，对于引号、尖括号、斜杠进行转义
```
function escape(str) {
  str = str.replace(/&/g, '&amp;')
  str = str.replace(/</g, '&lt;')
  str = str.replace(/>/g, '&gt;')
  str = str.replace(/"/g, '&quto;')
  str = str.replace(/'/g, '&#39;')
  str = str.replace(/`/g, '&#96;')
  str = str.replace(/\//g, '&#x2F;')
  return str
}
```
通过转义可以将攻击代码 `<script>alert(1)</script>` 变成
```
// -> &lt;script&gt;alert(1)&lt;&#x2F;script&gt;
escape('<script>alert(1)</script>')
```
但是对于显示富文本来说，显然不能通过上面的办法来转义所有字符，因为这样会把需要的格式也过滤掉。对于这种情况，通常采用白名单过滤的办法，当然也可以通过黑名单过滤，但是考虑到需要过滤的标签和标签属性实在太多，更加推荐使用白名单的方式。
```
const xss = require('xss')
let html = xss('<h1 id="title">XSS Demo</h1><script>alert("xss");</script>')
// -> <h1>XSS Demo</h1>&lt;script&gt;alert("xss");&lt;/script&gt;
console.log(html)
```
以上示例使用了 `js-xss` 来实现，可以看到在输出中保留了 `h1` 标签且过滤了 `script` 标签。
### CSP
CSP 本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截是由浏览器自己实现的。我们可以通过这种方式来尽量减少 XSS 攻击。
通常可以通过两种方式来开启 CSP：

1. 设置 HTTP Header 中的 `Content-Security-Policy`
1. 设置 `meta` 标签的方式 `<meta http-equiv="Content-Security-Policy">`

这里以设置 HTTP Header 来举例

- 只允许加载本站资源
```
Content-Security-Policy: default-src ‘self’
```

- 只允许加载 HTTPS 协议图片
```
Content-Security-Policy: img-src https://*
```

- 允许加载任何来源框架
```
Content-Security-Policy: child-src 'none'
```
当然可以设置的属性远不止这些，你可以通过查阅 [文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) 的方式来学习，这里就不过多赘述其他的属性了。
对于这种方式来说，只要开发者配置了正确的规则，那么即使网站存在漏洞，攻击者也不能执行它的攻击代码，并且 CSP 的兼容性也不错。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293201022-5eaa2e79-0e0f-48e5-a6cc-50a31a26a1f3.webp#align=left&display=inline&height=478&margin=%5Bobject%20Object%5D&originHeight=478&originWidth=1266&size=0&status=done&style=none&width=1266)
## CSRF
```
涉及面试题：什么是 CSRF 攻击？如何防范 CSRF 攻击？
```
CSRF 中文名为跨站请求伪造。原理就是攻击者构造出一个后端请求地址，诱导用户点击或者通过某些途径自动发起请求。如果用户是在登录状态下的话，后端就以为是用户在操作，从而进行相应的逻辑。
举个例子，假设网站中有一个通过 `GET` 请求提交用户评论的接口，那么攻击者就可以在钓鱼网站中加入一个图片，图片的地址就是评论接口
```
<img src="http://www.domain.com/xxx?comment='attack'"/>
```
那么你是否会想到使用 `POST` 方式提交请求是不是就没有这个问题了呢？其实并不是，使用这种方式也不是百分百安全的，攻击者同样可以诱导用户进入某个页面，在页面中通过表单提交 `POST` 请求。
### 如何防御
防范 CSRF 攻击可以遵循以下几种规则：

1. Get 请求不对数据进行修改
1. 不让第三方网站访问到用户 Cookie
1. 阻止第三方网站请求接口
1. 请求时附带验证信息，比如验证码或者 Token
#### SameSite
可以对 Cookie 设置 `SameSite` 属性。该属性表示 Cookie 不随着跨域请求发送，可以很大程度减少 CSRF 的攻击，但是该属性目前并不是所有浏览器都兼容。
#### 验证 Referer
对于需要防范 CSRF 的请求，我们可以通过验证 Referer 来判断该请求是否为第三方网站发起的。
#### Token
服务器下发一个随机 Token，每次发起请求时将 Token 携带上，服务器验证 Token 是否有效。
## 点击劫持
```
涉及面试题：什么是点击劫持？如何防范点击劫持？
```
点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 `iframe` 嵌套的方式嵌入自己的网页中，并将 `iframe` 设置为透明，在页面中透出一个按钮诱导用户点击。

对于这种攻击方式，推荐防御的方法有两种。
### X-FRAME-OPTIONS
`X-FRAME-OPTIONS` 是一个 HTTP 响应头，在现代浏览器有一个很好的支持。这个 HTTP 响应头 就是为了防御用 `iframe` 嵌套的点击劫持攻击。
该响应头有三个值可选，分别是

- `DENY`，表示页面不允许通过 `iframe` 的方式展示
- `SAMEORIGIN`，表示页面可以在相同域名下通过 `iframe` 的方式展示
- `ALLOW-FROM`，表示页面可以在指定来源的 `iframe` 中展示
### JS 防御
对于某些远古浏览器来说，并不能支持上面的这种方式，那我们只有通过 JS 的方式来防御点击劫持了。
```
<head>
  <style id="click-jack">
    html {
      display: none !important;
    }
  </style>
</head>
<body>
  <script>
    if (self == top) {
      var style = document.getElementById('click-jack')
      document.body.removeChild(style)
    } else {
      top.location = self.location
    }
  </script>
</body>
```
以上代码的作用就是当通过 `iframe` 的方式加载页面时，攻击者的网页直接不显示所有内容了。
## 中间人攻击
```
涉及面试题：什么是中间人攻击？如何防范中间人攻击？
```
中间人攻击是攻击方同时与服务端和客户端建立起了连接，并让对方认为连接是安全的，但是实际上整个通信过程都被攻击者控制了。攻击者不仅能获得双方的通信信息，还能修改通信信息。
通常来说不建议使用公共的 Wi-Fi，因为很可能就会发生中间人攻击的情况。如果你在通信的过程中涉及到了某些敏感信息，就完全暴露给攻击方了。
当然防御中间人攻击其实并不难，只需要增加一个安全通道来传输信息。HTTPS 就可以用来防御中间人攻击，但是并不是说使用了 HTTPS 就可以高枕无忧了，因为如果你没有完全关闭 HTTP 访问的话，攻击方可以通过某些方式将 HTTPS 降级为 HTTP 从而实现中间人攻击。
# 从 V8 中看 JS 性能优化
```
注意：该知识点属于性能优化领域。
```
性能问题越来越成为前端火热的话题，因为随着项目的逐步变大，性能问题也逐步体现出来。为了提高用户的体验，减少加载时间，工程师们想尽一切办法去优化细节。
掘金之前已经出过一本关于性能的小册，我在写涉及性能优化的内容之前就特地去购买了这本小册阅读，目的是为了写出点不一样的东西。当然性能优化归结起来还是那几个点，我只能尽可能地写出那本小册没有提及的内容，部分内容还是会有重叠的。当然它通过了十五个章节去介绍性能，肯定会讲的比我细，有兴趣的可以同时购买还有本 「[前端性能优化原理与实践](https://juejin.im/book/6844733750048210957?referrer=574f8d8d2e958a005fd4edac) 」小册，形成一个互补。
在这几个章节中不会提及浏览器、Webpack、网络协议这几块如何优化的内容，因为对应的模块中已经讲到了这部分的内容，如果你想学习这几块该如何性能优化的话，可以去对应的章节阅读。
在这一章节中我们将来学习如何让 V8 优化我们的代码，下一章节将会学习性能优化剩余的琐碎点，因为性能优化这个领域所涉及的内容都很碎片化。
在学习如何性能优化之前，我们先来了解下如何测试性能问题，毕竟是先有问题才会去想着该如何改进。
## 测试性能工具
Chrome 已经提供了一个大而全的性能测试工具 **Audits**
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293237194-f2a9d7f5-368f-45f1-81ed-b0074878d9de.png#align=left&display=inline&height=216&margin=%5Bobject%20Object%5D&originHeight=216&originWidth=578&size=0&status=done&style=none&width=578)
点我们点击 Audits 后，可以看到如下的界面
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293237200-a8b9c0b0-ae5e-43fb-9bbc-4f6493aecbd2.png#align=left&display=inline&height=677&margin=%5Bobject%20Object%5D&originHeight=677&originWidth=559&size=0&status=done&style=none&width=559)
在这个界面中，我们可以选择想测试的功能然后点击 **Run audits** ，工具就会自动运行帮助我们测试问题并且给出一个完整的报告
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293237247-20121d71-d357-4a2d-89e1-970fc1a1ca20.png#align=left&display=inline&height=156&margin=%5Bobject%20Object%5D&originHeight=156&originWidth=582&size=0&status=done&style=none&width=582)
上图是给掘金首页测试性能后给出的一个报告，可以看到报告中分别为**性能、体验、SEO** 都给出了打分，并且每一个指标都有详细的**评估**
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293237191-c45f4d7c-edc4-489e-8dc0-4ca6675209b8.png#align=left&display=inline&height=316&margin=%5Bobject%20Object%5D&originHeight=316&originWidth=584&size=0&status=done&style=none&width=584)
评估结束后，工具还提供了一些**建议**便于我们提高这个指标的分数
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293237209-1fab465b-2e3b-4e5d-9ee5-b8d388000c33.png#align=left&display=inline&height=253&margin=%5Bobject%20Object%5D&originHeight=253&originWidth=580&size=0&status=done&style=none&width=580)
我们只需要一条条根据建议去优化性能即可。
除了 **Audits** 工具之外，还有一个 **Performance** 工具也可以供我们使用。
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293237216-58f2aef9-9059-4821-9442-5316589c91b5.png#align=left&display=inline&height=647&margin=%5Bobject%20Object%5D&originHeight=647&originWidth=914&size=0&status=done&style=none&width=914)
在这张图中，我们可以详细的看到每个**时间段**中浏览器在处理什么事情，哪个过程最消耗时间，便于我们更加详细的了解性能**瓶颈**。
## JS 性能优化
JS 是编译型还是解释型语言其实并不固定。首先 JS 需要有引擎才能运行起来，无论是浏览器还是在 Node 中，这是解释型语言的特性。但是在 V8 引擎下，又引入了 `TurboFan` 编译器，他会在特定的情况下进行优化，将代码编译成执行效率更高的 **Machine Code**，当然这个编译器并不是 JS 必须需要的，只是为了提高代码执行性能，所以总的来说 JS 更偏向于解释型语言。
那么这一小节的内容主要会针对于 Chrome 的 **V8** 引擎来讲解。
在这一过程中，JS 代码首先会解析为抽象语法树（AST），然后会通过解释器或者编译器转化为 **Bytecode** 或者 **Machine Code**
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293237253-e50ebb88-0700-4632-adb0-f105972c5efe.png#align=left&display=inline&height=599&margin=%5Bobject%20Object%5D&originHeight=599&originWidth=800&size=0&status=done&style=none&width=800)
从上图中我们可以发现，JS 会首先被解析为 AST，解析的过程其实是略慢的。代码越多，解析的过程也就耗费越长，这也是我们需要压缩代码的原因之一。另外一种减少解析时间的方式是预解析，会作用于未执行的函数，这个我们下面再谈。
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293237287-024d16e8-b46e-4b4b-9e99-13943a62c9b0.png#align=left&display=inline&height=554&margin=%5Bobject%20Object%5D&originHeight=554&originWidth=1177&size=0&status=done&style=none&width=1177)
这里需要注意一点，对于函数来说，应该尽可能避免声明嵌套函数（类也是函数），因为这样会造成函数的重复解析。
```
function test1() {
  // 会被重复解析
  function test2() {}
}
```
然后 **Ignition** 负责将 AST 转化为 Bytecode，**TurboFan** 负责编译出优化后的 Machine Code，并且 Machine Code 在执行效率上优于 Bytecode
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293237271-91deb6bd-4c41-4ef2-af48-9e375d9c6d85.png#align=left&display=inline&height=331&margin=%5Bobject%20Object%5D&originHeight=331&originWidth=800&size=0&status=done&style=none&width=800)
那么我们就产生了一个疑问，**什么情况下代码会编译为 Machine Code？**
JS 是一门**动态类型**的语言，并且还有一大堆的规则。简单的加法运算代码，内部就需要考虑好几种规则，比如数字相加、字符串相加、对象和字符串相加等等。这样的情况也就势必导致了内部要增加很多判断逻辑，降低运行效率。
```
function test(x) {
  return x + x
}
test(1)
test(2)
test(3)
test(4)
```
对于以上代码来说，如果一个函数被**多次调用**并且参数一直传入 `number` 类型，那么 V8 就会认为该段代码可以编译为 Machine Code，因为你**固定了类型**，不需要再执行很多判断逻辑了。
但是如果一旦我们传入的参数**类型改变**，那么 Machine Code 就会被 **DeOptimized** 为 Bytecode，这样就有性能上的一个损耗了。所以如果我们希望代码能多的编译为 Machine Code 并且 DeOptimized 的次数减少，就应该尽可能保证传入的**类型一致**。
那么你可能会有一个疑问，到底优化前后有多少的提升呢，接下来我们就来实践测试一下到底有多少的提升。
```
const { performance, PerformanceObserver } = require('perf_hooks')
function test(x) {
  return x + x
}
// node 10 中才有 PerformanceObserver
// 在这之前的 node 版本可以直接使用 performance 中的 API
const obs = new PerformanceObserver((list, observer) => {
  console.log(list.getEntries())
  observer.disconnect()
})
obs.observe({ entryTypes: ['measure'], buffered: true })
performance.mark('start')
let number = 10000000
// 不优化代码
%NeverOptimizeFunction(test)
while (number--) {
  test(1)
}
performance.mark('end')
performance.measure('test', 'start', 'end')
```
以上代码中我们使用了 `performance` API，这个 API 在性能测试上十分好用。不仅可以用来测量代码的执行时间，还能用来测量各种网络连接中的时间消耗等等，并且这个 API 也可以在浏览器中使用。
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293237267-bed64092-269d-4507-8e41-94d093dc7368.png#align=left&display=inline&height=274&margin=%5Bobject%20Object%5D&originHeight=274&originWidth=526&size=0&status=done&style=none&width=526)
从上图中我们可以发现，优化过的代码执行时间只需要 9ms，但是不优化过的代码执行时间却是前者的二十倍，已经接近 200ms 了。在这个案例中，我相信大家已经看到了 V8 的性能优化到底有多强，只需要我们符合一定的规则书写代码，引擎底层就能帮助我们自动优化代码。
另外，编译器还有个骚操作 **Lazy-Compile**，当函数没有被执行的时候，会对函数进行一次预解析，直到代码被执行以后才会被解析编译。对于上述代码来说，`test` 函数需要被预解析一次，然后在调用的时候再被解析编译。但是对于这种函数马上就被调用的情况来说，预解析这个过程其实是多余的，那么有什么办法能够让代码不被预解析呢？
其实很简单，我们只需要给函数**套上括号**就可以了
```
(function test(obj) {
  return x + x
})
```
但是不可能我们为了性能优化，给所有的函数都去套上括号，并且也不是所有函数都需要这样做。我们可以通过 [optimize-js](https://github.com/nolanlawson/optimize-js) 实现这个功能，这个库会分析一些函数的使用情况，然后给需要的函数添加括号，当然这个库很久没人维护了，如果需要使用的话，还是需要测试过相关内容的。
## 小结
总结一下这一章节我们学习的知识

- 可以通过 **Audit** 工具获得网站的多个指标的性能报告
- 可以通过 **Performance** 工具了解网站的性能瓶颈
- 可以通过 **Performance** API 具体测量时间
- 为了减少编译时间，我们可以采用**减少代码文件的大小**或者**减少书写嵌套函数**的方式
- 为了让 V8 优化代码，我们应该尽可能保证传入参数的**类型一致**。这也给我们带来了一个思考，这是不是也是使用 TypeScript 能够带来的好处之一
# 性能优化琐碎事
> 注意：该知识点属于性能优化领域。

总的来说性能优化这个领域的很多内容都很**碎片化**，这一章节我们将来学习这些碎片化的内容。
## 图片优化
### 计算图片大小
对于一张 100 * 100 像素的图片来说，图像上有 10000 个像素点，如果每个像素的值是 **RGBA** 存储的话，那么也就是说每个像素有 4 个通道，每个通道 1 个字节（8 位 = 1个字节），所以该图片大小大概为 39KB（10000 * 1 * 4 / 1024）。
但是在实际项目中，一张图片可能并不需要使用那么多颜色去显示，我们可以通过减少每个像素的调色板来相应缩小图片的大小。
了解了如何计算图片大小的知识，那么对于如何优化图片，想必大家已经有 2 个思路了：

- **减少像素点**
- **减少每个像素点能够显示的颜色**
### 图片加载优化

1. 不用图片。很多时候会使用到很多修饰类图片，其实这类修饰图片完全可以用 CSS 去代替。
1. 对于移动端来说，屏幕宽度就那么点，完全没有必要去加载原图浪费带宽。一般图片都用 CDN 加载，可以计算出适配屏幕的宽度，然后去请求相应裁剪好的图片。
1. 小图使用 base64 格式
1. 将多个图标文件整合到一张图片中（雪碧图）
1. 选择正确的图片格式：
   - 对于能够显示 WebP 格式的浏览器尽量使用 WebP 格式。因为 WebP 格式具有更好的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量，缺点就是兼容性并不好
   - 小图使用 PNG，其实对于大部分图标这类图片，完全可以使用 SVG 代替
   - 照片使用 JPEG
## DNS 预解析
DNS 解析也是需要时间的，可以通过预解析的方式来预先获得域名所对应的 IP。
```
<link rel="dns-prefetch" href="//yuchengkai.cn">
```
## 节流
考虑一个场景，滚动事件中会发起网络请求，但是我们并不希望用户在滚动过程中一直发起请求，而是隔一段时间发起一次，对于这种情况我们就可以使用节流。
理解了节流的用途，我们就来实现下这个函数
```
// func是用户传入需要防抖的函数
// wait是等待时间
const throttle = (func, wait = 50) => {
  // 上一次执行该函数的时间
  let lastTime = 0
  return function(...args) {
    // 当前时间
    let now = +new Date()
    // 将当前时间和上一次执行函数时间对比
    // 如果差值大于设置的等待时间就执行函数
    if (now - lastTime > wait) {
      lastTime = now
      func.apply(this, args)
    }
  }
}
setInterval(
  throttle(() => {
    console.log(1)
  }, 500),
  1
)
```
## 防抖
考虑一个场景，有一个按钮点击会触发网络请求，但是我们并不希望每次点击都发起网络请求，而是当用户点击按钮一段时间后没有再次点击的情况才去发起网络请求，对于这种情况我们就可以使用防抖。
理解了防抖的用途，我们就来实现下这个函数
```
// func是用户传入需要防抖的函数
// wait是等待时间
const debounce = (func, wait = 50) => {
  // 缓存一个定时器id
  let timer = 0
  // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
```
## 预加载
在开发中，可能会遇到这样的情况。有些资源不需要马上用到，但是希望尽早获取，这时候就可以使用预加载。
预加载其实是声明式的 `fetch` ，强制浏览器请求资源，并且不会阻塞 `onload` 事件，可以使用以下代码开启预加载
```
<link rel="preload" href="http://example.com">
```
预加载可以一定程度上降低首屏的加载时间，因为可以将一些不影响首屏但重要的文件延后加载，唯一缺点就是兼容性不好。
## 预渲染
可以通过预渲染将下载的文件预先在后台渲染，可以使用以下代码开启预渲染
```
<link rel="prerender" href="http://example.com">
```
预渲染虽然可以提高页面的加载速度，但是要确保该页面大概率会被用户在之后打开，否则就是白白浪费资源去渲染。
## 懒执行
懒执行就是将某些逻辑延迟到使用时再计算。该技术可以用于首屏优化，对于某些耗时逻辑并不需要在首屏就使用的，就可以使用懒执行。懒执行需要唤醒，一般可以通过定时器或者事件的调用来唤醒。
## 懒加载
懒加载就是将不关键的资源延后加载。
懒加载的原理就是只加载自定义区域（通常是可视区域，但也可以是即将进入可视区域）内需要加载的东西。对于图片来说，先设置图片标签的 `src` 属性为一张占位图，将真实的图片资源放入一个自定义属性中，当进入自定义区域时，就将自定义属性替换为 `src` 属性，这样图片就会去下载资源，实现了图片懒加载。
懒加载不仅可以用于图片，也可以使用在别的资源上。比如进入可视区域才开始播放视频等等。
## CDN
CDN 的原理是尽可能的在各个地方分布机房缓存数据，这样即使我们的根服务器远在国外，在国内的用户也可以通过国内的机房迅速加载资源。
因此，我们可以将静态资源尽量使用 CDN 加载，由于浏览器对于单个域名有并发请求上限，可以考虑使用多个 CDN 域名。并且对于 CDN 加载静态资源需要注意 CDN 域名要与主站不同，否则每次请求都会带上主站的 Cookie，平白消耗流量。
## 小结
这些碎片化的性能优化点看似很短，但是却能在出现性能问题时简单高效的提高性能，并且好几个点都是面试高频考点，比如节流、防抖。如果你还没有在项目中使用过这些技术，可以尝试着用到项目中，体验下功效。
# Webpack 性能优化
在这一的章节中，我不会浪费篇幅给大家讲如何写配置文件。**如果你想学习这方面的内容，那么完全可以去官网学习**。在这部分的内容中，我们会聚焦于以下两个知识点，并且每一个知识点都属于高频考点：

- 有哪些方式可以减少 Webpack 的打包时间
- 有哪些方式可以让 Webpack 打出来的包更小
## 减少 Webpack 打包时间
### 优化 Loader
对于 Loader 来说，影响打包效率首当其冲必属 Babel 了。因为 Babel 会将代码转为字符串生成 AST，然后对 AST 继续进行转变最后再生成新的代码，项目越大，**转换代码越多，效率就越低**。当然了，我们是有办法优化的。
首先我们可以**优化 Loader 的文件搜索范围**
```
module.exports = {
  module: {
    rules: [
      {
        // js 文件才使用 babel
        test: /\.js$/,
        loader: 'babel-loader',
        // 只在 src 文件夹下查找
        include: [resolve('src')],
        // 不会去查找的路径
        exclude: /node_modules/
      }
    ]
  }
}
```
对于 Babel 来说，我们肯定是希望只作用在 JS 代码上的，然后 `node_modules` 中使用的代码都是编译过的，所以我们也完全没有必要再去处理一遍。
当然这样做还不够，我们还可以将 Babel 编译过的文件**缓存**起来，下次只需要编译更改过的代码文件即可，这样可以大幅度加快打包时间
```
loader: 'babel-loader?cacheDirectory=true'
```
### HappyPack
受限于 Node 是单线程运行的，所以 Webpack 在打包的过程中也是单线程的，特别是在执行 Loader 的时候，长时间编译的任务很多，这样就会导致等待的情况。
**HappyPack 可以将 Loader 的同步执行转换为并行的**，这样就能充分利用系统资源来加快打包效率了
```
module: {
  loaders: [
    {
      test: /\.js$/,
      include: [resolve('src')],
      exclude: /node_modules/,
      // id 后面的内容对应下面
      loader: 'happypack/loader?id=happybabel'
    }
  ]
},
plugins: [
  new HappyPack({
    id: 'happybabel',
    loaders: ['babel-loader?cacheDirectory'],
    // 开启 4 个线程
    threads: 4
  })
]
```
### DllPlugin
**DllPlugin 可以将特定的类库提前打包然后引入**。这种方式可以极大的减少打包类库的次数，只有当类库更新版本才有需要重新打包，并且也实现了将公共代码抽离成单独文件的优化方案。
接下来我们就来学习如何使用 DllPlugin
```
// 单独配置在一个文件中
// webpack.dll.conf.js
const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    // 想统一打包的类库
    vendor: ['react']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].dll.js',
    library: '[name]-[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      // name 必须和 output.library 一致
      name: '[name]-[hash]',
      // 该属性需要与 DllReferencePlugin 中一致
      context: __dirname,
      path: path.join(__dirname, 'dist', '[name]-manifest.json')
    })
  ]
}
```
然后我们需要执行这个配置文件生成依赖文件，接下来我们需要使用 `DllReferencePlugin` 将依赖文件引入项目中
```
// webpack.conf.js
module.exports = {
  // ...省略其他配置
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      // manifest 就是之前打包出来的 json 文件
      manifest: require('./dist/vendor-manifest.json'),
    })
  ]
}
```
### 代码压缩
在 Webpack3 中，我们一般使用 `UglifyJS` 来压缩代码，但是这个是单线程运行的，为了加快效率，我们可以使用 `webpack-parallel-uglify-plugin` 来并行运行 `UglifyJS`，从而提高效率。
在 Webpack4 中，我们就不需要以上这些操作了，只需要将 `mode` 设置为 `production` 就可以默认开启以上功能。代码压缩也是我们必做的性能优化方案，当然我们不止可以压缩 JS 代码，还可以压缩 HTML、CSS 代码，并且在压缩 JS 代码的过程中，我们还可以通过配置实现比如删除 `console.log` 这类代码的功能。
### 一些小的优化点
我们还可以通过一些小的优化点来加快打包速度

- `resolve.extensions`：用来表明文件后缀列表，默认查找顺序是 `['.js', '.json']`，如果你的导入文件没有添加后缀就会按照这个顺序查找文件。我们应该尽可能减少后缀列表长度，然后将出现频率高的后缀排在前面
- `resolve.alias`：可以通过别名的方式来映射一个路径，能让 Webpack 更快找到路径
- `module.noParse`：如果你确定一个文件下没有其他依赖，就可以使用该属性让 Webpack 不扫描该文件，这种方式对于大型的类库很有帮助
## 减少 Webpack 打包后的文件体积
> 注意：该内容也属于性能优化领域。

### 按需加载
想必大家在开发 SPA 项目的时候，项目中都会存在十几甚至更多的路由页面。如果我们将这些页面全部打包进一个 JS 文件的话，虽然将多个请求合并了，但是同样也加载了很多并不需要的代码，耗费了更长的时间。那么为了首页能更快地呈现给用户，我们肯定是希望首页能加载的文件体积越小越好，**这时候我们就可以使用按需加载，将每个路由页面单独打包为一个文件**。当然不仅仅路由可以按需加载，对于 `loadash` 这种大型类库同样可以使用这个功能。
按需加载的代码实现这里就不详细展开了，因为鉴于用的框架不同，实现起来都是不一样的。当然了，虽然他们的用法可能不同，但是底层的机制都是一样的。都是当使用的时候再去下载对应文件，返回一个 `Promise`，当 `Promise` 成功以后去执行回调。
### Scope Hoisting
**Scope Hoisting 会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去。**
比如我们希望打包两个文件
```
// test.js
export const a = 1
// index.js
import { a } from './test.js'
```
对于这种情况，我们打包出来的代码会类似这样
```
[
  /* 0 */
  function (module, exports, require) {
    //...
  },
  /* 1 */
  function (module, exports, require) {
    //...
  }
]
```
但是如果我们使用 Scope Hoisting 的话，代码就会尽可能的合并到一个函数中去，也就变成了这样的类似代码
```
[
  /* 0 */
  function (module, exports, require) {
    //...
  }
]
```
这样的打包方式生成的代码明显比之前的少多了。如果在 Webpack4 中你希望开启这个功能，只需要启用 `optimization.concatenateModules` 就可以了。
```
module.exports = {
  optimization: {
    concatenateModules: true
  }
}
```
### Tree Shaking
**Tree Shaking 可以实现删除项目中未被引用的代码**，比如
```
// test.js
export const a = 1
export const b = 2
// index.js
import { a } from './test.js'
```
对于以上情况，`test` 文件中的变量 `b` 如果没有在项目中使用到的话，就不会被打包到文件中。
如果你使用 Webpack 4 的话，开启生产环境就会自动启动这个优化功能。
# 实现小型打包工具
原本小册计划中是没有这一章节的，Webpack 工作原理应该是上一章节包含的内容。但是考虑到既然讲到工作原理，必然需要讲解源码，但是 Webpack 的源码很难读，不结合源码干巴巴讲原理又没有什么价值。所以在这一章节中，我将会带大家来实现一个几十行的迷你打包工具，该工具可以实现以下两个功能

- 将 ES6 转换为 ES5
- 支持在 JS 文件中 `import` CSS 文件

通过这个工具的实现，大家可以理解到打包工具的**原理**到底是什么。
## 实现
因为涉及到 ES6 转 ES5，所以我们首先需要安装一些 Babel 相关的工具
```
yarn add babylon babel-traverse babel-core babel-preset-env
```
接下来我们将这些工具引入文件中
```
const fs = require('fs')
const path = require('path')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const { transformFromAst } = require('babel-core')
```
首先，我们先来实现如何使用 Babel 转换代码
```
function readCode(filePath) {
  // 读取文件内容
  const content = fs.readFileSync(filePath, 'utf-8')
  // 生成 AST
  const ast = babylon.parse(content, {
    sourceType: 'module'
  })
  // 寻找当前文件的依赖关系
  const dependencies = []
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value)
    }
  })
  // 通过 AST 将代码转为 ES5
  const { code } = transformFromAst(ast, null, {
    presets: ['env']
  })
  return {
    filePath,
    dependencies,
    code
  }
}
```

- 首先我们传入一个文件路径参数，然后通过 `fs` 将文件中的内容读取出来
- 接下来我们通过 `babylon` 解析代码获取 AST，目的是为了分析代码中是否还引入了别的文件
- 通过 `dependencies` 来存储文件中的依赖，然后再将 AST 转换为 ES5 代码
- 最后函数返回了一个对象，对象中包含了当前文件路径、当前文件依赖和当前文件转换后的代码

接下来我们需要实现一个函数，这个函数的功能有以下几点

- 调用 `readCode` 函数，传入入口文件

- 分析入口文件的依赖

- 识别 JS 和 CSS 文件
function getDependencies(entry) { // 读取入口文件 const entryObject = readCode(entry) const dependencies = [entryObject] // 遍历所有文件依赖关系 for (const asset of dependencies) { // 获得文件目录 const dirname = path.dirname(asset.filePath) // 遍历当前文件依赖关系 asset.dependencies.forEach(relativePath => { // 获得绝对路径 const absolutePath = path.join(dirname, relativePath) // CSS 文件逻辑就是将代码插入到 `style` 标签中 if (/.css/.test(absolutePath)) { const content = fs.readFileSync(absolutePath, 'utf-8') const code = ` const style = document.createElement('style') style.innerText = {JSON.stringify(content).replace(/\r\n/g, '')} document.head.appendChild(style) ` dependencies.push({ filePath: absolutePath, relativePath, dependencies: [], code }) } else { // JS 代码需要继续查找是否有依赖关系 const child = readCode(absolutePath) child.relativePath = relativePath dependencies.push(child) } }) } return dependencies }

- 首先我们读取入口文件，然后创建一个数组，该数组的目的是存储代码中涉及到的所有文件

- 接下来我们遍历这个数组，一开始这个数组中只有入口文件，在遍历的过程中，如果入口文件有依赖其他的文件，那么就会被 `push` 到这个数组中

- 在遍历的过程中，我们先获得该文件对应的目录，然后遍历当前文件的依赖关系

- 在遍历当前文件依赖关系的过程中，首先生成依赖文件的绝对路径，然后判断当前文件是 CSS 文件还是 JS 文件
   - 如果是 CSS 文件的话，我们就不能用 Babel 去编译了，只需要读取 CSS 文件中的代码，然后创建一个 `style` 标签，将代码插入进标签并且放入 `head` 中即可
   - 如果是 JS 文件的话，我们还需要分析 JS 文件是否还有别的依赖关系
   - 最后将读取文件后的对象 `push` 进数组中

现在我们已经获取到了所有的依赖文件，接下来就是实现打包的功能了
```
function bundle(dependencies, entry) {
  let modules = ''
  // 构建函数参数，生成的结构为
  // { './entry.js': function(module, exports, require) { 代码 } }
  dependencies.forEach(dep => {
    const filePath = dep.relativePath || entry
    modules += `'${filePath}': (
      function (module, exports, require) { ${dep.code} }
    ),`
  })
  // 构建 require 函数，目的是为了获取模块暴露出来的内容
  const result = `
    (function(modules) {
      function require(id) {
        const module = { exports : {} }
        modules[id](module, module.exports, require)
        return module.exports
      }
      require('${entry}')
    })({${modules}})
  `
  // 当生成的内容写入到文件中
  fs.writeFileSync('./bundle.js', result)
}
```
这段代码需要结合着 Babel 转换后的代码来看，这样大家就能理解为什么需要这样写了
```
// entry.js
var _a = require('./a.js')
var _a2 = _interopRequireDefault(_a)
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}
console.log(_a2.default)
// a.js
Object.defineProperty(exports, '__esModule', {
    value: true
})
var a = 1
exports.default = a
```
Babel 将我们 ES6 的模块化代码转换为了 CommonJS（如果你不熟悉 CommonJS 的话，可以阅读这一章节中关于 [模块化的知识点](https://juejin.im/book/6844733763675488269/section/6844733763759374344)） 的代码，但是浏览器是不支持 CommonJS 的，所以如果这段代码需要在浏览器环境下运行的话，我们需要自己实现 CommonJS 相关的代码，这就是 `bundle` 函数做的大部分事情。
接下来我们再来逐行解析 `bundle` 函数

- 首先遍历所有依赖文件，构建出一个函数参数对象
- 对象的属性就是当前文件的相对路径，属性值是一个函数，函数体是当前文件下的代码，函数接受三个参数`module`、`exports`、`require`
   - `module` 参数对应 CommonJS 中的 `module`
   - `exports` 参数对应 CommonJS 中的 `module.export`
   - `require` 参数对应我们自己创建的 `require` 函数
- 接下来就是构造一个使用参数的函数了，函数做的事情很简单，就是内部创建一个 `require` 函数，然后调用 `require(entry)`，也就是 `require('./entry.js')`，这样就会从函数参数中找到 `./entry.js` 对应的函数并执行，最后将导出的内容通过 `module.export` 的方式让外部获取到
- 最后再将打包出来的内容写入到单独的文件中

如果你对于上面的实现还有疑惑的话，可以阅读下打包后的部分简化代码
```
;(function(modules) {
  function require(id) {
    // 构造一个 CommonJS 导出代码
    const module = { exports: {} }
    // 去参数中获取文件对应的函数并执行
    modules[id](module, module.exports, require)
    return module.exports
  }
  require('./entry.js')
})({
  './entry.js': function(module, exports, require) {
    // 这里继续通过构造的 require 去找到 a.js 文件对应的函数
    var _a = require('./a.js')
    console.log(_a2.default)
  },
  './a.js': function(module, exports, require) {
    var a = 1
    // 将 require 函数中的变量 module 变成了这样的结构
    // module.exports = 1
    // 这样就能在外部取到导出的内容了
    exports.default = a
  }
  // 省略
})
```
## 小结
虽然实现这个工具只写了不到 100 行的代码，但是打包工具的核心原理就是这些了

1. 找出入口文件所有的依赖关系
1. 然后通过构建 CommonJS 代码来获取 `exports` 导出的内容

如果大家对于这个章节的内容存在疑问，欢迎在评论区与我互动。
