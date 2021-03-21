# 设计模式
设计模式总的来说是一个抽象的概念，前人通过无数次的实践总结出的一套写代码的方式，通过这种方式写的代码可以让别人更加容易阅读、维护以及复用。
这一章节我们将来学习几种最常用的设计模式。
## 工厂模式
工厂模式分为好几种，这里就不一一讲解了，以下是一个简单工厂模式的例子
```
class Man {
  constructor(name) {
    this.name = name
  }
  alertName() {
    alert(this.name)
  }
}
class Factory {
  static create(name) {
    return new Man(name)
  }
}
Factory.create('yck').alertName()
```
当然工厂模式并不仅仅是用来 new 出**实例**。
可以想象一个场景。假设有一份很复杂的代码需要用户去调用，但是用户并不关心这些复杂的代码，只需要你提供给我一个接口去调用，用户只负责传递需要的参数，至于这些参数怎么使用，内部有什么逻辑是不关心的，只需要你最后返回我一个实例。这个构造过程就是工厂。
工厂起到的作用就是隐藏了创建实例的复杂度，只需要提供一个接口，简单清晰。
在 Vue 源码中，你也可以看到工厂模式的使用，比如创建异步组件
```
export function createComponent (
  Ctor: Class<Component> | Function | Object | void,
  data: ?VNodeData,
  context: Component,
  children: ?Array<VNode>,
  tag?: string
): VNode | Array<VNode> | void {
    
    // 逻辑处理...
  
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  )
  return vnode
}
```
在上述代码中，我们可以看到我们只需要调用 `createComponent` 传入参数就能创建一个组件实例，但是创建这个实例是很复杂的一个过程，工厂帮助我们隐藏了这个复杂的过程，只需要一句代码调用就能实现功能。
## 单例模式
单例模式很常用，比如全局缓存、全局状态管理等等这些只需要一个对象，就可以使用单例模式。
单例模式的核心就是保证全局只有一个对象可以访问。因为 JS 是门无类的语言，所以别的语言实现单例的方式并不能套入 JS 中，我们只需要用一个变量确保实例只创建一次就行，以下是如何实现单例模式的例子
```
class Singleton {
  constructor() {}
}
Singleton.getInstance = (function() {
  let instance
  return function() {
    if (!instance) {
      instance = new Singleton()
    }
    return instance
  }
})()
let s1 = Singleton.getInstance()
let s2 = Singleton.getInstance()
console.log(s1 === s2) // true
```
在 Vuex 源码中，你也可以看到单例模式的使用，虽然它的实现方式不大一样，通过一个外部变量来控制只安装一次 Vuex
```
let Vue // bind on install
export function install (_Vue) {
  if (Vue && _Vue === Vue) {
    // 如果发现 Vue 有值，就不重新创建实例了
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}
```
## 适配器模式
适配器用来解决两个接口不兼容的情况，不需要改变已有的接口，通过包装一层的方式实现两个接口的正常协作。
以下是如何实现适配器模式的例子
```
class Plug {
  getName() {
    return '港版插头'
  }
}
class Target {
  constructor() {
    this.plug = new Plug()
  }
  getName() {
    return this.plug.getName() + ' 适配器转二脚插头'
  }
}
let target = new Target()
target.getName() // 港版插头 适配器转二脚插头
```
在 Vue 中，我们其实经常使用到适配器模式。比如父组件传递给子组件一个时间戳属性，组件内部需要将时间戳转为正常的日期显示，一般会使用 `computed` 来做转换这件事情，这个过程就使用到了适配器模式。
## 装饰模式
装饰模式不需要改变已有的接口，作用是给对象添加功能。就像我们经常需要给手机戴个保护套防摔一样，不改变手机自身，给手机添加了保护套提供防摔功能。
以下是如何实现装饰模式的例子，使用了 ES7 中的装饰器语法
```
function readonly(target, key, descriptor) {
  descriptor.writable = false
  return descriptor
}
class Test {
  @readonly
  name = 'yck'
}
let t = new Test()
t.yck = '111' // 不可修改
```
在 React 中，装饰模式其实随处可见
```
import { connect } from 'react-redux'
class MyComponent extends React.Component {
    // ...
}
export default connect(mapStateToProps)(MyComponent)
```
## 代理模式
代理是为了控制对对象的访问，不让外部直接访问到对象。在现实生活中，也有很多代理的场景。比如你需要买一件国外的产品，这时候你可以通过代购来购买产品。
在实际代码中其实代理的场景很多，也就不举框架中的例子了，比如事件代理就用到了代理模式。
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
因为存在太多的 `li`，不可能每个都去绑定事件。这时候可以通过给父节点绑定一个事件，让父节点作为代理去拿到真实点击的节点。
## 发布-订阅模式
发布-订阅模式也叫做观察者模式。通过一对一或者一对多的依赖关系，当对象发生改变时，订阅方都会收到通知。在现实生活中，也有很多类似场景，比如我需要在购物网站上购买一个产品，但是发现该产品目前处于缺货状态，这时候我可以点击有货通知的按钮，让网站在产品有货的时候通过短信通知我。
在实际代码中其实发布-订阅模式也很常见，比如我们点击一个按钮触发了点击事件就是使用了该模式
```
<ul id="ul"></ul>
<script>
    let ul = document.querySelector('#ul')
    ul.addEventListener('click', (event) => {
        console.log(event.target);
    })
</script>
```
在 Vue 中，如何实现响应式也是使用了该模式。对于需要实现响应式的对象来说，在 `get` 的时候会进行依赖收集，当改变了对象的属性时，就会触发派发更新。
## 外观模式
外观模式提供了一个接口，隐藏了内部的逻辑，更加方便外部调用。
举个例子来说，我们现在需要实现一个兼容多种浏览器的添加事件方法
```
function addEvent(elm, evType, fn, useCapture) {
  if (elm.addEventListener) {
    elm.addEventListener(evType, fn, useCapture)
    return true
  } else if (elm.attachEvent) {
    var r = elm.attachEvent("on" + evType, fn)
    return r
  } else {
    elm["on" + evType] = fn
  }
}
```
对于不同的浏览器，添加事件的方式可能会存在兼容问题。如果每次都需要去这样写一遍的话肯定是不能接受的，所以我们将这些判断逻辑统一封装在一个接口中，外部需要添加事件只需要调用 `addEvent` 即可。
## 小结
这一章节我们学习了几种常用的设计模式。其实设计模式还有很多，有一些内容很简单，我就没有写在章节中了，比如迭代器模式、原型模式，有一些内容也是不经常使用，所以也就不一一列举了。
如果你还想了解更多关于设计模式的内容，可以阅读[这本书](https://book.douban.com/subject/26382780/)。
# 常见数据结构
这一章节我们将来学习数据结构的内容。经常会有人提问说：学习数据结构或者算法对于前端工程师有用么？
总的来说，这些基础学科在短期内收效确实甚微，但是我们首先不要将自己局限在前端工程师这点上。笔者之前是做 iOS 开发的，转做前端以后，只有两个技能还对我有用：

1. 基础学科内容，比如：网络知识、数据结构算法
1. 编程思想

其他 iOS 上积累的经验，转行以后基本就没多大用处了。所以说，当我们把视野放到编程这个角度去说，数据结构算法一定是有用的，并且也是你未来的一个天花板。可以不花费集中的时间去学习这些内容，但是一定需要时常去学习一点，因为这些技能可以实实在在提升你写代码的能力。
> 这一章节的内容信息量会很大，不适合在非电脑环境下阅读，请各位打开代码编辑器，一行行的敲代码，单纯阅读是学习不了数据结构的。

## 时间复杂度
在进入正题之前，我们先来了解下什么是时间复杂度。
通常使用最差的时间复杂度来衡量一个算法的好坏。
常数时间 O(1) 代表这个操作和数据量没关系，是一个固定时间的操作，比如说四则运算。
对于一个算法来说，可能会计算出操作次数为 aN + 1，N 代表数据量。那么该算法的时间复杂度就是 O(N)。因为我们在计算时间复杂度的时候，数据量通常是非常大的，这时候低阶项和常数项可以忽略不计。
当然可能会出现两个算法都是 O(N) 的时间复杂度，那么对比两个算法的好坏就要通过对比低阶项和常数项了。
## 栈
### 概念
栈是一个线性结构，在计算机中是一个相当常见的数据结构。
栈的特点是只能在某一端添加或删除数据，遵循先进后出的原则
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293913469-6ae2307f-89dc-4630-87cf-a109a5da1225.webp#align=left&display=inline&height=460&margin=%5Bobject%20Object%5D&originHeight=460&originWidth=640&size=0&status=done&style=none&width=640)
### 实现
每种数据结构都可以用很多种方式来实现，其实可以把栈看成是数组的一个子集，所以这里使用数组来实现
```
class Stack {
  constructor() {
    this.stack = []
  }
  push(item) {
    this.stack.push(item)
  }
  pop() {
    this.stack.pop()
  }
  peek() {
    return this.stack[this.getCount() - 1]
  }
  getCount() {
    return this.stack.length
  }
  isEmpty() {
    return this.getCount() === 0
  }
}
```
## 应用
选取了 [LeetCode 上序号为 20 的题目](https://leetcode.com/problems/valid-parentheses/submissions/1)
题意是匹配括号，可以通过栈的特性来完成这道题目
```
var isValid = function (s) {
  let map = {
    '(': -1,
    ')': 1,
    '[': -2,
    ']': 2,
    '{': -3,
    '}': 3
  }
  let stack = []
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] < 0) {
      stack.push(s[i])
    } else {
      let last = stack.pop()
      if (map[last] + map[s[i]] != 0) return false
    }
  }
  if (stack.length > 0) return false
  return true
};
```
其实在 Vue 中关于模板解析的代码，就有应用到匹配尖括号的内容。
## 队列
### 概念
队列是一个线性结构，特点是在某一端添加数据，在另一端删除数据，遵循先进先出的原则。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293913565-0f574c58-65c4-46d2-ae8d-05eadfafb471.webp#align=left&display=inline&height=419&margin=%5Bobject%20Object%5D&originHeight=419&originWidth=640&size=0&status=done&style=none&width=640)
### 实现
这里会讲解两种实现队列的方式，分别是单链队列和循环队列。
#### 单链队列
```
class Queue {
  constructor() {
    this.queue = []
  }
  enQueue(item) {
    this.queue.push(item)
  }
  deQueue() {
    return this.queue.shift()
  }
  getHeader() {
    return this.queue[0]
  }
  getLength() {
    return this.queue.length
  }
  isEmpty() {
    return this.getLength() === 0
  }
}
```
因为单链队列在出队操作的时候需要 O(n) 的时间复杂度，所以引入了循环队列。循环队列的出队操作平均是 O(1) 的时间复杂度。
#### 循环队列
```
class SqQueue {
  constructor(length) {
    this.queue = new Array(length + 1)
    // 队头
    this.first = 0
    // 队尾
    this.last = 0
    // 当前队列大小
    this.size = 0
  }
  enQueue(item) {
    // 判断队尾 + 1 是否为队头
    // 如果是就代表需要扩容数组
    // % this.queue.length 是为了防止数组越界
    if (this.first === (this.last + 1) % this.queue.length) {
      this.resize(this.getLength() * 2 + 1)
    }
    this.queue[this.last] = item
    this.size++
    this.last = (this.last + 1) % this.queue.length
  }
  deQueue() {
    if (this.isEmpty()) {
      throw Error('Queue is empty')
    }
    let r = this.queue[this.first]
    this.queue[this.first] = null
    this.first = (this.first + 1) % this.queue.length
    this.size--
    // 判断当前队列大小是否过小
    // 为了保证不浪费空间，在队列空间等于总长度四分之一时
    // 且不为 2 时缩小总长度为当前的一半
    if (this.size === this.getLength() / 4 && this.getLength() / 2 !== 0) {
      this.resize(this.getLength() / 2)
    }
    return r
  }
  getHeader() {
    if (this.isEmpty()) {
      throw Error('Queue is empty')
    }
    return this.queue[this.first]
  }
  getLength() {
    return this.queue.length - 1
  }
  isEmpty() {
    return this.first === this.last
  }
  resize(length) {
    let q = new Array(length)
    for (let i = 0; i < length; i++) {
      q[i] = this.queue[(i + this.first) % this.queue.length]
    }
    this.queue = q
    this.first = 0
    this.last = this.size
  }
}
```
## 链表
### 概念
链表是一个线性结构，同时也是一个天然的递归结构。链表结构可以充分利用计算机内存空间，实现灵活的内存动态管理。但是链表失去了数组随机读取的优点，同时链表由于增加了结点的指针域，空间开销比较大。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293913483-86610d72-bcd3-439b-918d-c19543149506.webp#align=left&display=inline&height=178&margin=%5Bobject%20Object%5D&originHeight=178&originWidth=1060&size=0&status=done&style=none&width=1060)
### 实现
**单向链表**
```
class Node {
  constructor(v, next) {
    this.value = v
    this.next = next
  }
}
class LinkList {
  constructor() {
    // 链表长度
    this.size = 0
    // 虚拟头部
    this.dummyNode = new Node(null, null)
  }
  find(header, index, currentIndex) {
    if (index === currentIndex) return header
    return this.find(header.next, index, currentIndex + 1)
  }
  addNode(v, index) {
    this.checkIndex(index)
    // 当往链表末尾插入时，prev.next 为空
    // 其他情况时，因为要插入节点，所以插入的节点
    // 的 next 应该是 prev.next
    // 然后设置 prev.next 为插入的节点
    let prev = this.find(this.dummyNode, index, 0)
    prev.next = new Node(v, prev.next)
    this.size++
    return prev.next
  }
  insertNode(v, index) {
    return this.addNode(v, index)
  }
  addToFirst(v) {
    return this.addNode(v, 0)
  }
  addToLast(v) {
    return this.addNode(v, this.size)
  }
  removeNode(index, isLast) {
    this.checkIndex(index)
    index = isLast ? index - 1 : index
    let prev = this.find(this.dummyNode, index, 0)
    let node = prev.next
    prev.next = node.next
    node.next = null
    this.size--
    return node
  }
  removeFirstNode() {
    return this.removeNode(0)
  }
  removeLastNode() {
    return this.removeNode(this.size, true)
  }
  checkIndex(index) {
    if (index < 0 || index > this.size) throw Error('Index error')
  }
  getNode(index) {
    this.checkIndex(index)
    if (this.isEmpty()) return
    return this.find(this.dummyNode, index, 0).next
  }
  isEmpty() {
    return this.size === 0
  }
  getSize() {
    return this.size
  }
}
```
## 树
### 二叉树
树拥有很多种结构，二叉树是树中最常用的结构，同时也是一个天然的递归结构。
二叉树拥有一个根节点，每个节点至多拥有两个子节点，分别为：左节点和右节点。树的最底部节点称之为叶节点，当一颗树的叶数量数量为满时，该树可以称之为满二叉树。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293913518-bf729c0f-6f13-4e6b-bcb0-3d2bfb9c5ea1.webp#align=left&display=inline&height=267&margin=%5Bobject%20Object%5D&originHeight=267&originWidth=320&size=0&status=done&style=none&width=320)
### 二分搜索树
二分搜索树也是二叉树，拥有二叉树的特性。但是区别在于二分搜索树每个节点的值都比他的左子树的值大，比右子树的值小。
这种存储方式很适合于数据搜索。如下图所示，当需要查找 6 的时候，因为需要查找的值比根节点的值大，所以只需要在根节点的右子树上寻找，大大提高了搜索效率。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293913476-8c3a40eb-d294-4237-982c-f0608c2448cd.webp#align=left&display=inline&height=485&margin=%5Bobject%20Object%5D&originHeight=485&originWidth=596&size=0&status=done&style=none&width=596)
### 实现
```
class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
class BST {
  constructor() {
    this.root = null
    this.size = 0
  }
  getSize() {
    return this.size
  }
  isEmpty() {
    return this.size === 0
  }
  addNode(v) {
    this.root = this._addChild(this.root, v)
  }
  // 添加节点时，需要比较添加的节点值和当前
  // 节点值的大小
  _addChild(node, v) {
    if (!node) {
      this.size++
      return new Node(v)
    }
    if (node.value > v) {
      node.left = this._addChild(node.left, v)
    } else if (node.value < v) {
      node.right = this._addChild(node.right, v)
    }
    return node
  }
}
```
以上是最基本的二分搜索树实现，接下来实现树的遍历。
对于树的遍历来说，有三种遍历方法，分别是先序遍历、中序遍历、后序遍历。三种遍历的区别在于何时访问节点。在遍历树的过程中，每个节点都会遍历三次，分别是遍历到自己，遍历左子树和遍历右子树。如果需要实现先序遍历，那么只需要第一次遍历到节点时进行操作即可。
```
// 先序遍历可用于打印树的结构
// 先序遍历先访问根节点，然后访问左节点，最后访问右节点。
preTraversal() {
  this._pre(this.root)
}
_pre(node) {
  if (node) {
    console.log(node.value)
    this._pre(node.left)
    this._pre(node.right)
  }
}
// 中序遍历可用于排序
// 对于 BST 来说，中序遍历可以实现一次遍历就
// 得到有序的值
// 中序遍历表示先访问左节点，然后访问根节点，最后访问右节点。
midTraversal() {
  this._mid(this.root)
}
_mid(node) {
  if (node) {
    this._mid(node.left)
    console.log(node.value)
    this._mid(node.right)
  }
}
// 后序遍历可用于先操作子节点
// 再操作父节点的场景
// 后序遍历表示先访问左节点，然后访问右节点，最后访问根节点。
backTraversal() {
  this._back(this.root)
}
_back(node) {
  if (node) {
    this._back(node.left)
    this._back(node.right)
    console.log(node.value)
  }
}
```
以上的这几种遍历都可以称之为深度遍历，对应的还有种遍历叫做广度遍历，也就是一层层地遍历树。对于广度遍历来说，我们需要利用之前讲过的队列结构来完成。
```
breadthTraversal() {
  if (!this.root) return null
  let q = new Queue()
  // 将根节点入队
  q.enQueue(this.root)
  // 循环判断队列是否为空，为空
  // 代表树遍历完毕
  while (!q.isEmpty()) {
    // 将队首出队，判断是否有左右子树
    // 有的话，就先左后右入队
    let n = q.deQueue()
    console.log(n.value)
    if (n.left) q.enQueue(n.left)
    if (n.right) q.enQueue(n.right)
  }
}
```
接下来先介绍如何在树中寻找最小值或最大数。因为二分搜索树的特性，所以最小值一定在根节点的最左边，最大值相反
```
getMin() {
  return this._getMin(this.root).value
}
_getMin(node) {
  if (!node.left) return node
  return this._getMin(node.left)
}
getMax() {
  return this._getMax(this.root).value
}
_getMax(node) {
  if (!node.right) return node
  return this._getMin(node.right)
}
```
**向上取整和向下取整**，这两个操作是相反的，所以代码也是类似的，这里只介绍如何向下取整。既然是向下取整，那么根据二分搜索树的特性，值一定在根节点的左侧。只需要一直遍历左子树直到当前节点的值不再大于等于需要的值，然后判断节点是否还拥有右子树。如果有的话，继续上面的递归判断。
```
floor(v) {
  let node = this._floor(this.root, v)
  return node ? node.value : null
}
_floor(node, v) {
  if (!node) return null
  if (node.value === v) return v
  // 如果当前节点值还比需要的值大，就继续递归
  if (node.value > v) {
    return this._floor(node.left, v)
  }
  // 判断当前节点是否拥有右子树
  let right = this._floor(node.right, v)
  if (right) return right
  return node
}
```
**排名**，这是用于获取给定值的排名或者排名第几的节点的值，这两个操作也是相反的，所以这个只介绍如何获取排名第几的节点的值。对于这个操作而言，我们需要略微的改造点代码，让每个节点拥有一个 `size` 属性。该属性表示该节点下有多少子节点（包含自身）。
```
class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
    // 修改代码
    this.size = 1
  }
}
// 新增代码
_getSize(node) {
  return node ? node.size : 0
}
_addChild(node, v) {
  if (!node) {
    return new Node(v)
  }
  if (node.value > v) {
    // 修改代码
    node.size++
    node.left = this._addChild(node.left, v)
  } else if (node.value < v) {
    // 修改代码
    node.size++
    node.right = this._addChild(node.right, v)
  }
  return node
}
select(k) {
  let node = this._select(this.root, k)
  return node ? node.value : null
}
_select(node, k) {
  if (!node) return null
  // 先获取左子树下有几个节点
  let size = node.left ? node.left.size : 0
  // 判断 size 是否大于 k
  // 如果大于 k，代表所需要的节点在左节点
  if (size > k) return this._select(node.left, k)
  // 如果小于 k，代表所需要的节点在右节点
  // 注意这里需要重新计算 k，减去根节点除了右子树的节点数量
  if (size < k) return this._select(node.right, k - size - 1)
  return node
}
```
接下来讲解的是二分搜索树中最难实现的部分：删除节点。因为对于删除节点来说，会存在以下几种情况

- 需要删除的节点没有子树
- 需要删除的节点只有一条子树
- 需要删除的节点有左右两条树

对于前两种情况很好解决，但是第三种情况就有难度了，所以先来实现相对简单的操作：删除最小节点，对于删除最小节点来说，是不存在第三种情况的，删除最大节点操作是和删除最小节点相反的，所以这里也就不再赘述。
```
delectMin() {
  this.root = this._delectMin(this.root)
  console.log(this.root)
}
_delectMin(node) {
  // 一直递归左子树
  // 如果左子树为空，就判断节点是否拥有右子树
  // 有右子树的话就把需要删除的节点替换为右子树
  if ((node != null) & !node.left) return node.right
  node.left = this._delectMin(node.left)
  // 最后需要重新维护下节点的 `size`
  node.size = this._getSize(node.left) + this._getSize(node.right) + 1
  return node
}
```
最后讲解的就是如何删除任意节点了。对于这个操作，T.Hibbard 在 1962 年提出了解决这个难题的办法，也就是如何解决第三种情况。
当遇到这种情况时，需要取出当前节点的后继节点（也就是当前节点右子树的最小节点）来替换需要删除的节点。然后将需要删除节点的左子树赋值给后继结点，右子树删除后继结点后赋值给他。
你如果对于这个解决办法有疑问的话，可以这样考虑。因为二分搜索树的特性，父节点一定比所有左子节点大，比所有右子节点小。那么当需要删除父节点时，势必需要拿出一个比父节点大的节点来替换父节点。这个节点肯定不存在于左子树，必然存在于右子树。然后又需要保持父节点都是比右子节点小的，那么就可以取出右子树中最小的那个节点来替换父节点。
```
delect(v) {
  this.root = this._delect(this.root, v)
}
_delect(node, v) {
  if (!node) return null
  // 寻找的节点比当前节点小，去左子树找
  if (node.value < v) {
    node.right = this._delect(node.right, v)
  } else if (node.value > v) {
    // 寻找的节点比当前节点大，去右子树找
    node.left = this._delect(node.left, v)
  } else {
    // 进入这个条件说明已经找到节点
    // 先判断节点是否拥有拥有左右子树中的一个
    // 是的话，将子树返回出去，这里和 `_delectMin` 的操作一样
    if (!node.left) return node.right
    if (!node.right) return node.left
    // 进入这里，代表节点拥有左右子树
    // 先取出当前节点的后继结点，也就是取当前节点右子树的最小值
    let min = this._getMin(node.right)
    // 取出最小值后，删除最小值
    // 然后把删除节点后的子树赋值给最小值节点
    min.right = this._delectMin(node.right)
    // 左子树不动
    min.left = node.left
    node = min
  }
  // 维护 size
  node.size = this._getSize(node.left) + this._getSize(node.right) + 1
  return node
}
```
## AVL 树
### 概念
二分搜索树实际在业务中是受到限制的，因为并不是严格的 O(logN)，在极端情况下会退化成链表，比如加入一组升序的数字就会造成这种情况。
AVL 树改进了二分搜索树，在 AVL 树中任意节点的左右子树的高度差都不大于 1，这样保证了时间复杂度是严格的 O(logN)。基于此，对 AVL 树增加或删除节点时可能需要旋转树来达到高度的平衡。
### 实现
因为 AVL 树是改进了二分搜索树，所以部分代码是于二分搜索树重复的，对于重复内容不作再次解析。
对于 AVL 树来说，添加节点会有四种情况
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293913507-8b5c495c-2a84-45f0-bb74-285bc51c350e.webp#align=left&display=inline&height=566&margin=%5Bobject%20Object%5D&originHeight=566&originWidth=800&size=0&status=done&style=none&width=800)
对于左左情况来说，新增加的节点位于节点 2 的左侧，这时树已经不平衡，需要旋转。因为搜索树的特性，节点比左节点大，比右节点小，所以旋转以后也要实现这个特性。
旋转之前：new < 2 < C < 3 < B < 5 < A，右旋之后节点 3 为根节点，这时候需要将节点 3 的右节点加到节点 5 的左边，最后还需要更新节点的高度。
对于右右情况来说，相反于左左情况，所以不再赘述。
对于左右情况来说，新增加的节点位于节点 4 的右侧。对于这种情况，需要通过两次旋转来达到目的。
首先对节点的左节点左旋，这时树满足左左的情况，再对节点进行一次右旋就可以达到目的。
```
class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
    this.height = 1
  }
}
class AVL {
  constructor() {
    this.root = null
  }
  addNode(v) {
    this.root = this._addChild(this.root, v)
  }
  _addChild(node, v) {
    if (!node) {
      return new Node(v)
    }
    if (node.value > v) {
      node.left = this._addChild(node.left, v)
    } else if (node.value < v) {
      node.right = this._addChild(node.right, v)
    } else {
      node.value = v
    }
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right))
    let factor = this._getBalanceFactor(node)
    // 当需要右旋时，根节点的左树一定比右树高度高
    if (factor > 1 && this._getBalanceFactor(node.left) >= 0) {
      return this._rightRotate(node)
    }
    // 当需要左旋时，根节点的左树一定比右树高度矮
    if (factor < -1 && this._getBalanceFactor(node.right) <= 0) {
      return this._leftRotate(node)
    }
    // 左右情况
    // 节点的左树比右树高，且节点的左树的右树比节点的左树的左树高
    if (factor > 1 && this._getBalanceFactor(node.left) < 0) {
      node.left = this._leftRotate(node.left)
      return this._rightRotate(node)
    }
    // 右左情况
    // 节点的左树比右树矮，且节点的右树的右树比节点的右树的左树矮
    if (factor < -1 && this._getBalanceFactor(node.right) > 0) {
      node.right = this._rightRotate(node.right)
      return this._leftRotate(node)
    }
    return node
  }
  _getHeight(node) {
    if (!node) return 0
    return node.height
  }
  _getBalanceFactor(node) {
    return this._getHeight(node.left) - this._getHeight(node.right)
  }
  // 节点右旋
  //           5                    2
  //         /   \                /   \
  //        2     6   ==>       1      5
  //       /  \               /       /  \
  //      1    3             new     3    6
  //     /
  //    new
  _rightRotate(node) {
    // 旋转后新根节点
    let newRoot = node.left
    // 需要移动的节点
    let moveNode = newRoot.right
    // 节点 2 的右节点改为节点 5
    newRoot.right = node
    // 节点 5 左节点改为节点 3
    node.left = moveNode
    // 更新树的高度
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right))
    newRoot.height =
      1 +
      Math.max(this._getHeight(newRoot.left), this._getHeight(newRoot.right))
    return newRoot
  }
  // 节点左旋
  //           4                    6
  //         /   \                /   \
  //        2     6   ==>       4      7
  //             /  \         /   \      \
  //            5     7      2     5      new
  //                   \
  //                    new
  _leftRotate(node) {
    // 旋转后新根节点
    let newRoot = node.right
    // 需要移动的节点
    let moveNode = newRoot.left
    // 节点 6 的左节点改为节点 4
    newRoot.left = node
    // 节点 4 右节点改为节点 5
    node.right = moveNode
    // 更新树的高度
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right))
    newRoot.height =
      1 +
      Math.max(this._getHeight(newRoot.left), this._getHeight(newRoot.right))
    return newRoot
  }
}
```
## Trie
### 概念
在计算机科学，**trie**，又称**前缀树**或**字典树**，是一种有序树，用于保存关联数组，其中的键通常是字符串。
简单点来说，这个结构的作用大多是为了方便搜索字符串，该树有以下几个特点

- 根节点代表空字符串，每个节点都有 N（假如搜索英文字符，就有 26 条） 条链接，每条链接代表一个字符
- 节点不存储字符，只有路径才存储，这点和其他的树结构不同
- 从根节点开始到任意一个节点，将沿途经过的字符连接起来就是该节点对应的字符串

![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293913457-bfd40849-b17c-42f0-b2c9-21d00c2f5eaf.webp#align=left&display=inline&height=600&margin=%5Bobject%20Object%5D&originHeight=600&originWidth=640&size=0&status=done&style=none&width=640)
、
### 实现
总得来说 Trie 的实现相比别的树结构来说简单的很多，实现就以搜索英文字符为例。
```
class TrieNode {
  constructor() {
    // 代表每个字符经过节点的次数
    this.path = 0
    // 代表到该节点的字符串有几个
    this.end = 0
    // 链接
    this.next = new Array(26).fill(null)
  }
}
class Trie {
  constructor() {
    // 根节点，代表空字符
    this.root = new TrieNode()
  }
  // 插入字符串
  insert(str) {
    if (!str) return
    let node = this.root
    for (let i = 0; i < str.length; i++) {
      // 获得字符先对应的索引
      let index = str[i].charCodeAt() - 'a'.charCodeAt()
      // 如果索引对应没有值，就创建
      if (!node.next[index]) {
        node.next[index] = new TrieNode()
      }
      node.path += 1
      node = node.next[index]
    }
    node.end += 1
  }
  // 搜索字符串出现的次数
  search(str) {
    if (!str) return
    let node = this.root
    for (let i = 0; i < str.length; i++) {
      let index = str[i].charCodeAt() - 'a'.charCodeAt()
      // 如果索引对应没有值，代表没有需要搜素的字符串
      if (!node.next[index]) {
        return 0
      }
      node = node.next[index]
    }
    return node.end
  }
  // 删除字符串
  delete(str) {
    if (!this.search(str)) return
    let node = this.root
    for (let i = 0; i < str.length; i++) {
      let index = str[i].charCodeAt() - 'a'.charCodeAt()
      // 如果索引对应的节点的 Path 为 0，代表经过该节点的字符串
      // 已经一个，直接删除即可
      if (--node.next[index].path == 0) {
        node.next[index] = null
        return
      }
      node = node.next[index]
    }
    node.end -= 1
  }
}
```
## 并查集
### 概念
并查集是一种特殊的树结构，用于处理一些不交集的合并及查询问题。该结构中每个节点都有一个父节点，如果只有当前一个节点，那么该节点的父节点指向自己。
这个结构中有两个重要的操作，分别是：

- Find：确定元素属于哪一个子集。它可以被用来确定两个元素是否属于同一子集。
- Union：将两个子集合并成同一个集合。

![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293913552-3101d98b-b7e0-4381-bae7-60a4fb4a5e92.webp#align=left&display=inline&height=209&margin=%5Bobject%20Object%5D&originHeight=209&originWidth=421&size=0&status=done&style=none&width=421)
### 实现
```
class DisjointSet {
  // 初始化样本
  constructor(count) {
    // 初始化时，每个节点的父节点都是自己
    this.parent = new Array(count)
    // 用于记录树的深度，优化搜索复杂度
    this.rank = new Array(count)
    for (let i = 0; i < count; i++) {
      this.parent[i] = i
      this.rank[i] = 1
    }
  }
  find(p) {
    // 寻找当前节点的父节点是否为自己，不是的话表示还没找到
    // 开始进行路径压缩优化
    // 假设当前节点父节点为 A
    // 将当前节点挂载到 A 节点的父节点上，达到压缩深度的目的
    while (p != this.parent[p]) {
      this.parent[p] = this.parent[this.parent[p]]
      p = this.parent[p]
    }
    return p
  }
  isConnected(p, q) {
    return this.find(p) === this.find(q)
  }
  // 合并
  union(p, q) {
    // 找到两个数字的父节点
    let i = this.find(p)
    let j = this.find(q)
    if (i === j) return
    // 判断两棵树的深度，深度小的加到深度大的树下面
    // 如果两棵树深度相等，那就无所谓怎么加
    if (this.rank[i] < this.rank[j]) {
      this.parent[i] = j
    } else if (this.rank[i] > this.rank[j]) {
      this.parent[j] = i
    } else {
      this.parent[i] = j
      this.rank[j] += 1
    }
  }
}
```
## 堆
### 概念
堆通常是一个可以被看做一棵树的数组对象。
堆的实现通过构造**二叉堆**，实为二叉树的一种。这种数据结构具有以下性质。

- 任意节点小于（或大于）它的所有子节点
- 堆总是一棵完全树。即除了最底层，其他层的节点都被元素填满，且最底层从左到右填入。

将根节点最大的堆叫做**最大堆**或**大根堆**，根节点最小的堆叫做**最小堆**或**小根堆**。
优先队列也完全可以用堆来实现，操作是一模一样的。
### 实现大根堆
堆的每个节点的左边子节点索引是 `i * 2 + 1`，右边是 `i * 2 + 2`，父节点是 `(i - 1) /2`。
堆有两个核心的操作，分别是 `shiftUp` 和 `shiftDown` 。前者用于添加元素，后者用于删除根节点。
`shiftUp` 的核心思路是一路将节点与父节点对比大小，如果比父节点大，就和父节点交换位置。
`shiftDown` 的核心思路是先将根节点和末尾交换位置，然后移除末尾元素。接下来循环判断父节点和两个子节点的大小，如果子节点大，就把最大的子节点和父节点交换。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293913572-65855399-a300-4ad4-8500-b6513cb67507.webp#align=left&display=inline&height=394&margin=%5Bobject%20Object%5D&originHeight=394&originWidth=537&size=0&status=done&style=none&width=537)
```
class MaxHeap {
  constructor() {
    this.heap = []
  }
  size() {
    return this.heap.length
  }
  empty() {
    return this.size() == 0
  }
  add(item) {
    this.heap.push(item)
    this._shiftUp(this.size() - 1)
  }
  removeMax() {
    this._shiftDown(0)
  }
  getParentIndex(k) {
    return parseInt((k - 1) / 2)
  }
  getLeftIndex(k) {
    return k * 2 + 1
  }
  _shiftUp(k) {
    // 如果当前节点比父节点大，就交换
    while (this.heap[k] > this.heap[this.getParentIndex(k)]) {
      this._swap(k, this.getParentIndex(k))
      // 将索引变成父节点
      k = this.getParentIndex(k)
    }
  }
  _shiftDown(k) {
    // 交换首位并删除末尾
    this._swap(k, this.size() - 1)
    this.heap.splice(this.size() - 1, 1)
    // 判断节点是否有左孩子，因为二叉堆的特性，有右必有左
    while (this.getLeftIndex(k) < this.size()) {
      let j = this.getLeftIndex(k)
      // 判断是否有右孩子，并且右孩子是否大于左孩子
      if (j + 1 < this.size() && this.heap[j + 1] > this.heap[j]) j++
      // 判断父节点是否已经比子节点都大
      if (this.heap[k] >= this.heap[j]) break
      this._swap(k, j)
      k = j
    }
  }
  _swap(left, right) {
    let rightValue = this.heap[right]
    this.heap[right] = this.heap[left]
    this.heap[left] = rightValue
  }
}
```
## 小结
这一章节我们学习了一些常见的数据结构，当然我没有将其他更难的数据结构也放进来，能够掌握这些常见的内容已经足够解决大部分的问题了。当然你如果还想继续深入学习数据结构，可以阅读 [算法第四版](https://book.douban.com/subject/19952400/) 以及在 [leetcode](https://leetcode-cn.com/problemset/all/) 中实践。
# 常考算法题解析
这一章节依托于上一章节的内容，毕竟了解了数据结构我们才能写出更好的算法。
对于大部分公司的面试来说，排序的内容已经足以应付了，由此为了更好的符合大众需求，排序的内容是最多的。当然如果你还想冲击更好的公司，那么整一个章节的内容都是需要掌握的。对于字节跳动这类十分看重算法的公司来说，这一章节是远远不够的，[剑指Offer](https://book.douban.com/subject/6966465/)应该是你更好的选择。
> 这一章节的内容信息量会很大，不适合在非电脑环境下阅读，请各位打开代码编辑器，一行行的敲代码，单纯阅读是学习不了算法的。

另外学习算法的时候，有一个可视化界面会相对减少点学习的难度，具体可以阅读 [algorithm-visualizer](https://github.com/algorithm-visualizer/algorithm-visualizer) 这个仓库。
## 位运算
在进入正题之前，我们先来学习一下位运算的内容。因为位运算在算法中很有用，速度可以比四则运算快很多。
在学习位运算之前应该知道十进制如何转二进制，二进制如何转十进制。这里说明下简单的计算方式

- 十进制 `33` 可以看成是 `32 + 1` ，并且 `33` 应该是六位二进制的（因为 `33` 近似 `32`，而 `32` 是 2 的五次方，所以是六位），那么 十进制 `33` 就是 `100001` ，只要是 2 的次方，那么就是 1否则都为 0
- 那么二进制 `100001` 同理，首位是 `2^5` ，末位是 `2^0` ，相加得出 33
### 左移 <<
```
10 << 1 // -> 20
```
左移就是将二进制全部往左移动，`10` 在二进制中表示为 `1010` ，左移一位后变成 `10100` ，转换为十进制也就是 20，所以基本可以把左移看成以下公式 `a * (2 ^ b)`
### 算数右移 >>
```
10 >> 1 // -> 5
```
算数右移就是将二进制全部往右移动并去除多余的右边，`10` 在二进制中表示为 `1010` ，右移一位后变成 `101` ，转换为十进制也就是 5，所以基本可以把右移看成以下公式 `int v = a / (2 ^ b)`
右移很好用，比如可以用在二分算法中取中间值
```
13 >> 1 // -> 6
```
### 按位操作
**按位与**
每一位都为 1，结果才为 1
```
8 & 7 // -> 0
// 1000 & 0111 -> 0000 -> 0
```
**按位或**
其中一位为 1，结果就是 1
```
8 | 7 // -> 15
// 1000 | 0111 -> 1111 -> 15
```
**按位异或**
每一位都不同，结果才为 1
```
8 ^ 7 // -> 15
8 ^ 8 // -> 0
// 1000 ^ 0111 -> 1111 -> 15
// 1000 ^ 1000 -> 0000 -> 0
```
从以上代码中可以发现按位异或就是不进位加法
**面试题**：两个数不使用四则运算得出和
这道题中可以按位异或，因为按位异或就是不进位加法，`8 ^ 8 = 0` 如果进位了，就是 16 了，所以我们只需要将两个数进行异或操作，然后进位。那么也就是说两个二进制都是 1 的位置，左边应该有一个进位 1，所以可以得出以下公式 `a + b = (a ^ b) + ((a & b) << 1)` ，然后通过迭代的方式模拟加法
```
function sum(a, b) {
    if (a == 0) return b
    if (b == 0) return a
    let newA = a ^ b
    let newB = (a & b) << 1
    return sum(newA, newB)
}
```
## 排序
以下两个函数是排序中会用到的通用函数，就不一一写了
```
function checkArray(array) {
    return Array.isArray(array)
}
function swap(array, left, right) {
    let rightValue = array[right]
    array[right] = array[left]
    array[left] = rightValue
}
```
### 冒泡排序
冒泡排序的原理如下，从第一个元素开始，把当前元素和下一个索引元素进行比较。如果当前元素大，那么就交换位置，重复操作直到比较到最后一个元素，那么此时最后一个元素就是该数组中最大的数。下一轮重复以上操作，但是此时最后一个元素已经是最大数了，所以不需要再比较最后一个元素，只需要比较到 `length - 2` 的位置。
![](https://cdn.nlark.com/yuque/0/2021/gif/1658583/1615293977649-274e88a2-ff81-4c1e-958d-d4122f1e2832.gif#align=left&display=inline&height=508&margin=%5Bobject%20Object%5D&originHeight=508&originWidth=670&size=0&status=done&style=none&width=670)
以下是实现该算法的代码
```
function bubble(array) {
  checkArray(array);
  for (let i = array.length - 1; i > 0; i--) {
    // 从 0 到 `length - 1` 遍历
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) swap(array, j, j + 1)
    }
  }
  return array;
}
```
该算法的操作次数是一个等差数列 `n + (n - 1) + (n - 2) + 1` ，去掉常数项以后得出时间复杂度是 O(n * n)
### 插入排序
插入排序的原理如下。第一个元素默认是已排序元素，取出下一个元素和当前元素比较，如果当前元素大就交换位置。那么此时第一个元素就是当前的最小数，所以下次取出操作从第三个元素开始，向前对比，重复之前的操作。
![](https://cdn.nlark.com/yuque/0/2021/gif/1658583/1615293977556-4e3107c4-a2a6-4655-b61a-923ba081ec01.gif#align=left&display=inline&height=508&margin=%5Bobject%20Object%5D&originHeight=508&originWidth=670&size=0&status=done&style=none&width=670)
以下是实现该算法的代码
```
function insertion(array) {
  if (!checkArray(array)) return
  for (let i = 1; i < array.length; i++) {
    for (let j = i - 1; j >= 0 && array[j] > array[j + 1]; j--)
      swap(array, j, j + 1);
  }
  return array;
}
```
该算法的操作次数是一个等差数列 `n + (n - 1) + (n - 2) + 1` ，去掉常数项以后得出时间复杂度是 O(n * n)
### 选择排序
选择排序的原理如下。遍历数组，设置最小值的索引为 0，如果取出的值比当前最小值小，就替换最小值索引，遍历完成后，将第一个元素和最小值索引上的值交换。如上操作后，第一个元素就是数组中的最小值，下次遍历就可以从索引 1 开始重复上述操作。
![](https://cdn.nlark.com/yuque/0/2021/gif/1658583/1615293977924-f2d12dd7-7b64-4d1e-ae27-5c12de14f515.gif#align=left&display=inline&height=508&margin=%5Bobject%20Object%5D&originHeight=508&originWidth=670&size=0&status=done&style=none&width=670)
以下是实现该算法的代码
```
function selection(array) {
  if (!checkArray(array)) return
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      minIndex = array[j] < array[minIndex] ? j : minIndex;
    }
    swap(array, i, minIndex);
  }
  return array;
}
```
该算法的操作次数是一个等差数列 `n + (n - 1) + (n - 2) + 1` ，去掉常数项以后得出时间复杂度是 O(n * n)
### 归并排序
归并排序的原理如下。递归的将数组两两分开直到最多包含两个元素，然后将数组排序合并，最终合并为排序好的数组。假设我有一组数组 `[3, 1, 2, 8, 9, 7, 6]`，中间数索引是 3，先排序数组 `[3, 1, 2, 8]` 。在这个左边数组上，继续拆分直到变成数组包含两个元素（如果数组长度是奇数的话，会有一个拆分数组只包含一个元素）。然后排序数组 `[3, 1]` 和 `[2, 8]` ，然后再排序数组 `[1, 3, 2, 8]` ，这样左边数组就排序完成，然后按照以上思路排序右边数组，最后将数组 `[1, 2, 3, 8]` 和 `[6, 7, 9]` 排序。
![](https://cdn.nlark.com/yuque/0/2021/gif/1658583/1615293977696-94051058-49dc-4834-a2b9-2c80cb6227c1.gif#align=left&display=inline&height=1008&margin=%5Bobject%20Object%5D&originHeight=1008&originWidth=896&size=0&status=done&style=none&width=896)
以下是实现该算法的代码
```
function sort(array) {
  if (!checkArray(array)) return
  mergeSort(array, 0, array.length - 1);
  return array;
}
function mergeSort(array, left, right) {
  // 左右索引相同说明已经只有一个数
  if (left === right) return;
  // 等同于 `left + (right - left) / 2`
  // 相比 `(left + right) / 2` 来说更加安全，不会溢出
  // 使用位运算是因为位运算比四则运算快
  let mid = parseInt(left + ((right - left) >> 1));
  mergeSort(array, left, mid);
  mergeSort(array, mid + 1, right);
  let help = [];
  let i = 0;
  let p1 = left;
  let p2 = mid + 1;
  while (p1 <= mid && p2 <= right) {
    help[i++] = array[p1] < array[p2] ? array[p1++] : array[p2++];
  }
  while (p1 <= mid) {
    help[i++] = array[p1++];
  }
  while (p2 <= right) {
    help[i++] = array[p2++];
  }
  for (let i = 0; i < help.length; i++) {
    array[left + i] = help[i];
  }
  return array;
}
```
以上算法使用了递归的思想。递归的本质就是压栈，每递归执行一次函数，就将该函数的信息（比如参数，内部的变量，执行到的行数）压栈，直到遇到终止条件，然后出栈并继续执行函数。对于以上递归函数的调用轨迹如下
```
mergeSort(data, 0, 6) // mid = 3
  mergeSort(data, 0, 3) // mid = 1
    mergeSort(data, 0, 1) // mid = 0
      mergeSort(data, 0, 0) // 遇到终止，回退到上一步
    mergeSort(data, 1, 1) // 遇到终止，回退到上一步
    // 排序 p1 = 0, p2 = mid + 1 = 1
    // 回退到 `mergeSort(data, 0, 3)` 执行下一个递归
  mergeSort(2, 3) // mid = 2
    mergeSort(3, 3) // 遇到终止，回退到上一步
  // 排序 p1 = 2, p2 = mid + 1 = 3
  // 回退到 `mergeSort(data, 0, 3)` 执行合并逻辑
  // 排序 p1 = 0, p2 = mid + 1 = 2
  // 执行完毕回退
  // 左边数组排序完毕，右边也是如上轨迹
```
该算法的操作次数是可以这样计算：递归了两次，每次数据量是数组的一半，并且最后把整个数组迭代了一次，所以得出表达式 `2T(N / 2) + T(N)` （T 代表时间，N 代表数据量）。根据该表达式可以套用 [该公式](https://www.wikiwand.com/zh-hans/%E4%B8%BB%E5%AE%9A%E7%90%86) 得出时间复杂度为 `O(N * logN)`
### 快排
快排的原理如下。随机选取一个数组中的值作为基准值，从左至右取值与基准值对比大小。比基准值小的放数组左边，大的放右边，对比完成后将基准值和第一个比基准值大的值交换位置。然后将数组以基准值的位置分为两部分，继续递归以上操作。
![](https://cdn.nlark.com/yuque/0/2021/gif/1658583/1615293977715-3c84394e-9f8a-4bf4-9433-18ebbfd703eb.gif#align=left&display=inline&height=506&margin=%5Bobject%20Object%5D&originHeight=506&originWidth=824&size=0&status=done&style=none&width=824)
以下是实现该算法的代码
```
function sort(array) {
  if (!checkArray(array)) return
  quickSort(array, 0, array.length - 1);
  return array;
}
function quickSort(array, left, right) {
  if (left < right) {
    swap(array, , right)
    // 随机取值，然后和末尾交换，这样做比固定取一个位置的复杂度略低
    let indexs = part(array, parseInt(Math.random() * (right - left + 1)) + left, right);
    quickSort(array, left, indexs[0]);
    quickSort(array, indexs[1] + 1, right);
  }
}
function part(array, left, right) {
  let less = left - 1;
  let more = right;
  while (left < more) {
    if (array[left] < array[right]) {
      // 当前值比基准值小，`less` 和 `left` 都加一
	   ++less;
       ++left;
    } else if (array[left] > array[right]) {
      // 当前值比基准值大，将当前值和右边的值交换
      // 并且不改变 `left`，因为当前换过来的值还没有判断过大小
      swap(array, --more, left);
    } else {
      // 和基准值相同，只移动下标
      left++;
    }
  }
  // 将基准值和比基准值大的第一个值交换位置
  // 这样数组就变成 `[比基准值小, 基准值, 比基准值大]`
  swap(array, right, more);
  return [less, more];
}
```
该算法的复杂度和归并排序是相同的，但是额外空间复杂度比归并排序少，只需 O(logN)，并且相比归并排序来说，所需的常数时间也更少。
#### 面试题
**Sort Colors**：该题目来自 [LeetCode](https://leetcode.com/problems/sort-colors/description/)，题目需要我们将 `[2,0,2,1,1,0]` 排序成 `[0,0,1,1,2,2]` ，这个问题就可以使用三路快排的思想。
以下是代码实现
```
var sortColors = function(nums) {
  let left = -1;
  let right = nums.length;
  let i = 0;
  // 下标如果遇到 right，说明已经排序完成
  while (i < right) {
    if (nums[i] == 0) {
      swap(nums, i++, ++left);
    } else if (nums[i] == 1) {
      i++;
    } else {
      swap(nums, i, --right);
    }
  }
};
```
**Kth Largest Element in an Array**：该题目来自 [LeetCode](https://leetcode.com/problems/kth-largest-element-in-an-array/description/)，题目需要找出数组中第 K 大的元素，这问题也可以使用快排的思路。并且因为是找出第 K 大元素，所以在分离数组的过程中，可以找出需要的元素在哪边，然后只需要排序相应的一边数组就好。
以下是代码实现
```
var findKthLargest = function(nums, k) {
  let l = 0
  let r = nums.length - 1
  // 得出第 K 大元素的索引位置
  k = nums.length - k
  while (l < r) {
    // 分离数组后获得比基准树大的第一个元素索引
    let index = part(nums, l, r)
    // 判断该索引和 k 的大小
    if (index < k) {
      l = index + 1
    } else if (index > k) {
      r = index - 1
    } else {
      break
    }
  }
  return nums[k]
};
function part(array, left, right) {
  let less = left - 1;
  let more = right;
  while (left < more) {
    if (array[left] < array[right]) {
	   ++less;
       ++left;
    } else if (array[left] > array[right]) {
      swap(array, --more, left);
    } else {
      left++;
    }
  }
  swap(array, right, more);
  return more;
}
```
### 堆排序
堆排序利用了二叉堆的特性来做，二叉堆通常用数组表示，并且二叉堆是一颗完全二叉树（所有叶节点（最底层的节点）都是从左往右顺序排序，并且其他层的节点都是满的）。二叉堆又分为大根堆与小根堆。

- 大根堆是某个节点的所有子节点的值都比他小
- 小根堆是某个节点的所有子节点的值都比他大

堆排序的原理就是组成一个大根堆或者小根堆。以小根堆为例，某个节点的左边子节点索引是 `i * 2 + 1`，右边是 `i * 2 + 2`，父节点是 `(i - 1) /2`。

1. 首先遍历数组，判断该节点的父节点是否比他小，如果小就交换位置并继续判断，直到他的父节点比他大
1. 重新以上操作 1，直到数组首位是最大值
1. 然后将首位和末尾交换位置并将数组长度减一，表示数组末尾已是最大值，不需要再比较大小
1. 对比左右节点哪个大，然后记住大的节点的索引并且和父节点对比大小，如果子节点大就交换位置
1. 重复以上操作 3 - 4 直到整个数组都是大根堆。

![](https://cdn.nlark.com/yuque/0/2021/gif/1658583/1615293977781-2a05c9b7-e06a-4a71-8d94-c25882f94166.gif#align=left&display=inline&height=394&margin=%5Bobject%20Object%5D&originHeight=394&originWidth=1372&size=0&status=done&style=none&width=1372)
以下是实现该算法的代码
```
function heap(array) {
  if (!checkArray(array)) return
  // 将最大值交换到首位
  for (let i = 0; i < array.length; i++) {
    heapInsert(array, i);
  }
  let size = array.length;
  // 交换首位和末尾
  swap(array, 0, --size);
  while (size > 0) {
    heapify(array, 0, size);
    swap(array, 0, --size);
  }
  return array;
}
function heapInsert(array, index) {
  // 如果当前节点比父节点大，就交换
  while (array[index] > array[parseInt((index - 1) / 2)]) {
    swap(array, index, parseInt((index - 1) / 2));
    // 将索引变成父节点
    index = parseInt((index - 1) / 2);
  }
}
function heapify(array, index, size) {
  let left = index * 2 + 1;
  while (left < size) {
    // 判断左右节点大小
    let largest =
      left + 1 < size && array[left] < array[left + 1] ? left + 1 : left;
    // 判断子节点和父节点大小
    largest = array[index] < array[largest] ? largest : index;
    if (largest === index) break;
    swap(array, index, largest);
    index = largest;
    left = index * 2 + 1;
  }
}
```
以上代码实现了小根堆，如果需要实现大根堆，只需要把节点对比反一下就好。
该算法的复杂度是 O(logN)
### 系统自带排序实现
每个语言的排序内部实现都是不同的。
对于 JS 来说，数组长度大于 10 会采用快排，否则使用插入排序 [源码实现](https://github.com/v8/v8/blob/ad82a40509c5b5b4680d4299c8f08d6c6d31af3c/src/js/array.js#L760:7) 。选择插入排序是因为虽然时间复杂度很差，但是在数据量很小的情况下和 `O(N * logN)`相差无几，然而插入排序需要的常数时间很小，所以相对别的排序来说更快。
对于 Java 来说，还会考虑内部的元素的类型。对于存储对象的数组来说，会采用稳定性好的算法。稳定性的意思就是对于相同值来说，相对顺序不能改变。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293977762-0346e09c-9ee8-426a-b05f-5f17c131de52.webp#align=left&display=inline&height=727&margin=%5Bobject%20Object%5D&originHeight=727&originWidth=440&size=0&status=done&style=none&width=440)
## 链表
### 反转单向链表
该题目来自 [LeetCode](https://leetcode.com/problems/reverse-linked-list/description/)，题目需要将一个单向链表反转。思路很简单，使用三个变量分别表示当前节点和当前节点的前后节点，虽然这题很简单，但是却是一道面试常考题
以下是实现该算法的代码
```
var reverseList = function(head) {
    // 判断下变量边界问题
    if (!head || !head.next) return head
    // 初始设置为空，因为第一个节点反转后就是尾部，尾部节点指向 null
    let pre = null
    let current = head
    let next
    // 判断当前节点是否为空
    // 不为空就先获取当前节点的下一节点
    // 然后把当前节点的 next 设为上一个节点
    // 然后把 current 设为下一个节点，pre 设为当前节点
    while(current) {
        next = current.next
        current.next = pre
        pre = current
        current = next
    }
    return pre
};
```
## 树
### 二叉树的先序，中序，后序遍历
先序遍历表示先访问根节点，然后访问左节点，最后访问右节点。
中序遍历表示先访问左节点，然后访问根节点，最后访问右节点。
后序遍历表示先访问左节点，然后访问右节点，最后访问根节点。
#### 递归实现
递归实现相当简单，代码如下
```
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
var traversal = function(root) {
  if (root) {
    // 先序
    console.log(root); 
    traversal(root.left);
    // 中序
    // console.log(root); 
    traversal(root.right);
    // 后序
    // console.log(root);
  }
};
```
对于递归的实现来说，只需要理解每个节点都会被访问三次就明白为什么这样实现了。
#### 非递归实现
非递归实现使用了栈的结构，通过栈的先进后出模拟递归实现。
以下是先序遍历代码实现
```
function pre(root) {
  if (root) {
    let stack = [];
    // 先将根节点 push
    stack.push(root);
    // 判断栈中是否为空
    while (stack.length > 0) {
      // 弹出栈顶元素
      root = stack.pop();
      console.log(root);
      // 因为先序遍历是先左后右，栈是先进后出结构
      // 所以先 push 右边再 push 左边
      if (root.right) {
        stack.push(root.right);
      }
      if (root.left) {
        stack.push(root.left);
      }
    }
  }
}
```
以下是中序遍历代码实现
```
function mid(root) {
  if (root) {
    let stack = [];
    // 中序遍历是先左再根最后右
    // 所以首先应该先把最左边节点遍历到底依次 push 进栈
    // 当左边没有节点时，就打印栈顶元素，然后寻找右节点
    // 对于最左边的叶节点来说，可以把它看成是两个 null 节点的父节点
    // 左边打印不出东西就把父节点拿出来打印，然后再看右节点
    while (stack.length > 0 || root) {
      if (root) {
        stack.push(root);
        root = root.left;
      } else {
        root = stack.pop();
        console.log(root);
        root = root.right;
      }
    }
  }
}
```
以下是后序遍历代码实现，该代码使用了两个栈来实现遍历，相比一个栈的遍历来说要容易理解很多
```
function pos(root) {
  if (root) {
    let stack1 = [];
    let stack2 = [];
    // 后序遍历是先左再右最后根
	// 所以对于一个栈来说，应该先 push 根节点
    // 然后 push 右节点，最后 push 左节点
    stack1.push(root);
    while (stack1.length > 0) {
      root = stack1.pop();
      stack2.push(root);
      if (root.left) {
        stack1.push(root.left);
      }
      if (root.right) {
        stack1.push(root.right);
      }
    }
    while (stack2.length > 0) {
      console.log(s2.pop());
    }
  }
}
```
### 中序遍历的前驱后继节点
实现这个算法的前提是节点有一个 `parent` 的指针指向父节点，根节点指向 `null` 。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293977867-e5aeac27-c985-43f6-83e0-b2d4369ad947.webp#align=left&display=inline&height=486&margin=%5Bobject%20Object%5D&originHeight=486&originWidth=682&size=0&status=done&style=none&width=682)
如图所示，该树的中序遍历结果是 `4, 2, 5, 1, 6, 3, 7`
#### 前驱节点
对于节点 `2` 来说，他的前驱节点就是 `4` ，按照中序遍历原则，可以得出以下结论

1. 如果选取的节点的左节点不为空，就找该左节点最右的节点。对于节点 `1` 来说，他有左节点 `2` ，那么节点 `2` 的最右节点就是 `5`
1. 如果左节点为空，且目标节点是父节点的右节点，那么前驱节点为父节点。对于节点 `5` 来说，没有左节点，且是节点 `2` 的右节点，所以节点 `2` 是前驱节点
1. 如果左节点为空，且目标节点是父节点的左节点，向上寻找到第一个是父节点的右节点的节点。对于节点 `6` 来说，没有左节点，且是节点 `3` 的左节点，所以向上寻找到节点 `1` ，发现节点 `3` 是节点 `1` 的右节点，所以节点 `1` 是节点 `6` 的前驱节点

以下是算法实现
```
function predecessor(node) {
  if (!node) return 
  // 结论 1
  if (node.left) {
    return getRight(node.left)
  } else {
    let parent = node.parent
    // 结论 2 3 的判断
    while(parent && parent.right === node) {
      node = parent
      parent = node.parent
    }
    return parent
  }
}
function getRight(node) {
  if (!node) return 
  node = node.right
  while(node) node = node.right
  return node
}
```
#### 后继节点
对于节点 `2` 来说，他的后继节点就是 `5` ，按照中序遍历原则，可以得出以下结论

1. 如果有右节点，就找到该右节点的最左节点。对于节点 `1` 来说，他有右节点 `3` ，那么节点 `3` 的最左节点就是 `6`
1. 如果没有右节点，就向上遍历直到找到一个节点是父节点的左节点。对于节点 `5` 来说，没有右节点，就向上寻找到节点 `2` ，该节点是父节点 `1` 的左节点，所以节点 `1` 是后继节点

以下是算法实现
```
function successor(node) {
  if (!node) return 
  // 结论 1
  if (node.right) {
    return getLeft(node.right)
  } else {
    // 结论 2
    let parent = node.parent
    // 判断 parent 为空
    while(parent && parent.left === node) {
      node = parent
      parent = node.parent
    }
    return parent
  }
}
function getLeft(node) {
  if (!node) return 
  node = node.left
  while(node) node = node.left
  return node
}
```
### 树的深度
**树的最大深度**：该题目来自 [Leetcode](https://leetcode.com/problems/maximum-depth-of-binary-tree/description/)，题目需要求出一颗二叉树的最大深度
以下是算法实现
```
var maxDepth = function(root) {
    if (!root) return 0 
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};
```
对于该递归函数可以这样理解：一旦没有找到节点就会返回 0，每弹出一次递归函数就会加一，树有三层就会得到3。
## 动态规划
动态规划背后的基本思想非常简单。就是将一个问题拆分为子问题，一般来说这些子问题都是非常相似的，那么我们可以通过只解决一次每个子问题来达到减少计算量的目的。
一旦得出每个子问题的解，就存储该结果以便下次使用。
### 斐波那契数列
斐波那契数列就是从 0 和 1 开始，后面的数都是前两个数之和
0，1，1，2，3，5，8，13，21，34，55，89....
那么显然易见，我们可以通过递归的方式来完成求解斐波那契数列
```
function fib(n) {
  if (n < 2 && n >= 0) return n
  return fib(n - 1) + fib(n - 2)
}
fib(10)
```
以上代码已经可以完美的解决问题。但是以上解法却存在很严重的性能问题，当 n 越大的时候，需要的时间是指数增长的，这时候就可以通过动态规划来解决这个问题。
动态规划的本质其实就是两点

1. 自底向上分解子问题
1. 通过变量存储已经计算过的解

根据上面两点，我们的斐波那契数列的动态规划思路也就出来了

1. 斐波那契数列从 0 和 1 开始，那么这就是这个子问题的最底层

1. 通过数组来存储每一位所对应的斐波那契数列的值
function fib(n) { let array = new Array(n + 1).fill(null) array[0] = 0 array[1] = 1 for (let i = 2; i <= n; i++) { array[i] = array[i - 1] + array[i - 2] } return array[n] } fib(10)

### 0 - 1背包问题
该问题可以描述为：给定一组物品，每种物品都有自己的重量和价格，在限定的总重量内，我们如何选择，才能使得物品的总价格最高。每个问题只能放入至多一次。
假设我们有以下物品
物品 ID / 重量
价值
1
3
2
7
3
12
对于一个总容量为 5 的背包来说，我们可以放入重量 2 和 3 的物品来达到背包内的物品总价值最高。
对于这个问题来说，子问题就两个，分别是放物品和不放物品，可以通过以下表格来理解子问题
物品 ID / 剩余容量
0
1
2
3
4
5
1
0
3
3
3
3
3
2
0
3
7
10
10
10
3
0
3
7
12
15
19
直接来分析能放三种物品的情况，也就是最后一行

- 当容量少于 3 时，只取上一行对应的数据，因为当前容量不能容纳物品 3
- 当容量 为 3 时，考虑两种情况，分别为放入物品 3 和不放物品 3
   - 不放物品 3 的情况下，总价值为 10
   - 放入物品 3 的情况下，总价值为 12，所以应该放入物品 3
- 当容量 为 4 时，考虑两种情况，分别为放入物品 3 和不放物品 3
   - 不放物品 3 的情况下，总价值为 10
   - 放入物品 3 的情况下，和放入物品 1 的价值相加，得出总价值为 15，所以应该放入物品 3
- 当容量 为 5 时，考虑两种情况，分别为放入物品 3 和不放物品 3
   - 不放物品 3 的情况下，总价值为 10
   - 放入物品 3 的情况下，和放入物品 2 的价值相加，得出总价值为 19，所以应该放入物品 3

以下代码对照上表更容易理解
```
/**
 * @param {*} w 物品重量
 * @param {*} v 物品价值
 * @param {*} C 总容量
 * @returns
 */
function knapsack(w, v, C) {
  let length = w.length
  if (length === 0) return 0
  // 对照表格，生成的二维数组，第一维代表物品，第二维代表背包剩余容量
  // 第二维中的元素代表背包物品总价值
  let array = new Array(length).fill(new Array(C + 1).fill(null))
  // 完成底部子问题的解
  for (let i = 0; i <= C; i++) {
    // 对照表格第一行， array[0] 代表物品 1
    // i 代表剩余总容量
    // 当剩余总容量大于物品 1 的重量时，记录下背包物品总价值，否则价值为 0
    array[0][i] = i >= w[0] ? v[0] : 0
  }
  // 自底向上开始解决子问题，从物品 2 开始
  for (let i = 1; i < length; i++) {
    for (let j = 0; j <= C; j++) {
      // 这里求解子问题，分别为不放当前物品和放当前物品
      // 先求不放当前物品的背包总价值，这里的值也就是对应表格中上一行对应的值
      array[i][j] = array[i - 1][j]
      // 判断当前剩余容量是否可以放入当前物品
      if (j >= w[i]) {
        // 可以放入的话，就比大小
        // 放入当前物品和不放入当前物品，哪个背包总价值大
        array[i][j] = Math.max(array[i][j], v[i] + array[i - 1][j - w[i]])
      }
    }
  }
  return array[length - 1][C]
}
```
### 最长递增子序列
最长递增子序列意思是在一组数字中，找出最长一串递增的数字，比如
0, 3, 4, 17, 2, 8, 6, 10
对于以上这串数字来说，最长递增子序列就是 0, 3, 4, 8, 10，可以通过以下表格更清晰的理解
数字
0
3
4
17
2
8
6
10
长度
1
2
3
4
2
4
4
5
通过以上表格可以很清晰的发现一个规律，找出刚好比当前数字小的数，并且在小的数组成的长度基础上加一。
这个问题的动态思路解法很简单，直接上代码
```
function lis(n) {
  if (n.length === 0) return 0
  // 创建一个和参数相同大小的数组，并填充值为 1
  let array = new Array(n.length).fill(1)
  // 从索引 1 开始遍历，因为数组已经所有都填充为 1 了
  for (let i = 1; i < n.length; i++) {
    // 从索引 0 遍历到 i
    // 判断索引 i 上的值是否大于之前的值
    for (let j = 0; j < i; j++) {
      if (n[i] > n[j]) {
        array[i] = Math.max(array[i], 1 + array[j])
      }
    }
  }
  let res = 1
  for (let i = 0; i < array.length; i++) {
    res = Math.max(res, array[i])
  }
  return res
}
```
# CSS 常考面试题资料
其实笔者在面试的时候这方面的内容完全没有被问到，并且自己也基本没有准备这一部分的内容。
但是鉴于小册面向的群体是大众，肯定会有人被问到这方面的内容，因此我在这一章节会总结一些面试资料给大家，我就不班门弄斧了。

- [50道CSS基础面试题（附答案）](https://segmentfault.com/a/1190000013325778)
- [《50道CSS基础面试题（附答案）》中的答案真的就只是答案吗？](https://segmentfault.com/a/1190000013860482)
- [CSS 面试题总结](https://funteas.com/topic/5ada8eac230d1e5e25e45b89)
- [front-end-interview-handbook](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/questions/css-questions.md)
# 如何写好一封简历
简历不是一份记流水账的东西，而是让用人方了解你的亮点的。
平时有在做修改简历的收费服务，也算看过蛮多简历了。很多简历都有以下几个特征：

- 喜欢说自己的特长、优点，用人方真的不关注你的性格是否阳光等等
- 喜欢列举一大堆个人技能，生怕用人方不知道你会些什么，造成的结果就是好多简历的技能都是差不多
- 项目经验流水账，比如使用了什么框架，什么 API 做了什么业务
- 简历页数过多

以上类似简历可以说用人方也看了无数份，完全抓不到你的亮点。
简历其实就是**推销**自己，如果你的简历和别人千篇一律，没有亮点，用人方就不会对你产生兴趣。
以下是我经常给别人修改简历的意见：

- 简历页数控制在 **2 页**以下
- 技术名词注意**大小写**
- **突出个人亮点**。比如在项目中如何找到 Bug，解决 Bug 的过程；比如如何发现的性能问题，如何解决性能问题，最终提升了多少性能；比如为何如此选型，目的是什么，较其他有什么优点等等。总体思路就是不写流水账，**突出你在项目中具有不错的解决问题的能力和独立思考的能力**
- **斟酌**熟悉、精通等字眼，不要给自己挖坑
- 确保每一个写上去的技术点自己都能说出点什么，杜绝面试官问你一个技术点，你只能答出会用 API 这种减分的情况
- 拿**事实**说话。你说你学习能力强，那么请列举你能力强的事实；你说你成绩好，那么请写出你专业的排名

做到以上内容，然后在投递简历的过程中加上一份**求职信**，对你的求职之路相信能帮上很多忙，当然了，一般来说我推荐尽量走**内推**通道投递简历。在网上多花点心思就能找到很多内推，比如 V2EX、脉脉等等。
说了这么多，我们还是实战来修改一封简历吧，该简历的作者是一名**两年**经验的前端开发，关键信息已经全部隐去。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615294018934-1841b929-7458-4a70-baa2-5ec547f9515d.webp#align=left&display=inline&height=794&margin=%5Bobject%20Object%5D&originHeight=794&originWidth=1280&size=0&status=done&style=none&width=1280)
这算是简历最先被别人看到的地方，最黄金的广告位必然要放自己**最闪亮**的东西。
比如你是 985、211 毕业的，有不错的成绩、专业排名都可以在这个位置暴露出来。但是如果你学历并不怎么好，可以考虑把教育经历移到简历的最后，尽量把这块黄金位置让出来。
然后个人优势这块，一般来说就是个人技能。首先杜绝任何精通的字眼，因为百分之 99 的人都做不到精通，如果你真的精通了，就是一堆工作找你了。一般来说在个人技能这个区域我推荐写上几个前端必备的技能就可以了，然后根据投递的公司可以选择性的添加几个对方需求且自己也会的技能栈，最后个人技能这块内容同样也可以调整到简历的后半部分，没有必要占据一大块的简历第一页内容。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615294019020-37a41bbe-799b-43e3-be44-23408de84e43.webp#align=left&display=inline&height=748&margin=%5Bobject%20Object%5D&originHeight=748&originWidth=1280&size=0&status=done&style=none&width=1280)
这封简历的工作经历这块写的基本没有什么问题，大家在写这一部分的时候需要注意以下几点：

- 在工作中有什么不错的结果都可以在这一块表现出来，比如文中的绩效前端小组 7 人最好等等
- 在工作中解决过什么很困难的问题也可以在这里提一下
- 最后需要注意一点，以上划红线的内容可能会被面试官问到，要做到心中有数，知道该如何回答，否则还不如不写。就比如说简历中写到了使用了新的架构节省了开发时间，那么这个架构是怎么样的，你对这个架构有什么看法等等这些问题都可能会被问到，要准备好一个通用的回答。

![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615294018923-9b34fb21-3c45-4379-bdeb-a1f7237a5ce6.webp#align=left&display=inline&height=800&margin=%5Bobject%20Object%5D&originHeight=800&originWidth=1280&size=0&status=done&style=none&width=1280)
这封简历的工作经历这块写的就触及到很多我之前提到过的问题了。
首先两个项目的经验介绍都很流水账，都是属于使用了某某技术实现了某某功能。如果写简历的时候实在想不出平时工作中有遇到什么困难或者解决了什么问题的话，就要确保以上写到的技术栈都能很好的回答出来。
以上划红线的地方可能都会是面试官会重点提问的技术栈。
其实一封简历写的好，一般需要做到以下两点：

- 你让用人方了解到你比其他候选者强
- 不过分夸大，确保简历里写的每一个技术点都心中有数

毕竟简历写的很华丽，只是敲开了公司的第一扇门，如果过分夸大了事实，那么其实就是浪费双方的时间了。
大家在写简历的时候可以多多注意以上我提到的几个点，然后在写完以后找出简历中涉及到的所有技术点，并且确保自己能够说个所以然，这样简历这关就没什么问题了。
# 面试常用技巧
这一章节我会介绍一些面试中常用的一些技巧，这些技巧可以帮助大家更好的准备面试，提高面试成功率。
## 尽早准备简历
找工作的第一个重要问题就是写简历了，简历就是一个人的门面。简历写的不好，用人方也没有多大兴趣再深入了解你，毕竟行业人太多了。
很多人都会有一个问题就是：**不知道简历该写啥**。其实我很不推荐当要面试的时候才去写简历，因为很多人没有记录的习惯，当去写简历的时候才会发现，在公司呆了那么久好像记不得自己做了哪些东西了。
所以简历应该是经常去更新的，隔几个月去更新一次简历，了解自己这几个月以来的成长在哪里，结果是什么。
## 分批投递简历
当我们准备投递简历的时候，应该先把想投递的几个公司分出几个档次。先投递档次最低的，就算失败了，也就当在攒经验。这样多面几次，把握大了就可以开始投递更加心仪的公司了，增加成功几率。
## 如何粗略判断公司是否靠谱
毕竟不是每个人都能去大公司的，所以分辨一个公司是否靠谱是相当重要的，这关系到过来几个月甚至几年的职业道路。
首先一家公司所涉足的行业是很重要的，如果你去一家做社交的公司，很大程度上会以失败而告终。我个人认为目前教育、新能源、生鲜、医疗、数据这几个行业前景不错，当然这只是个人观点**仅做参考**。
然后我们还得了解一家公司的情况，这里我推荐使用「天眼查」去查询一家公司的信息。在这里我们可以查询到一家公司的几个重要指标

- 具体的一个**融资**情况，一家公司好不好，拥有的资本肯定是重要的一块。一家不错的公司，往往前期融到的金额就很高
- **核心团队**的介绍，通过介绍我们可以了解到高管的一个教育背景，行业的经验等等
- 公司涉及到了哪些**司法、经营上的风险**

然后还可以在网上查询一下这家公司是否有拖欠工资等等**负面**的消息。
## 如何回答问题
尽量不要止步于问题，也就是面试官问什么你答什么，而是把回答的点**发散**出去，**引导**面试官提问，展示自己的水平。
比如说面试官提问了一个通过 DNS 查找 IP 过程的一个问题。那么在回答好这个问题的同时，可以指出获得 IP 以后就会发生 TCP 三次握手等等的情况，然后就可以引导面试官提问网络协议相关的问题了。
当然引导面试官的前提是你确实熟悉这一块的内容，否则就是给自己挖坑了。
**很推荐大家在准备面试的过程中，挖掘出自己擅长的技术内容，然后在面试的过程中，寻找机会引导面试官提问你擅长的技术点。**
最后需要注意一点，如果你不能很好的理解面试官的提问，最好先**弄明白**面试官到底想问什么，而不是直接回答问题导致出现文不对题的情况。
## 如何应对可能答不好的题目
假如你遇到了一道不会的题目，但是稍微有一点想法，你可以先坦白说这道题目不怎么会，但是愿意尝试回答一下，这样即使回答错了，也不会有什么问题。
但是千万不要不懂装懂，弄巧成拙。
## 多反思
一场面试结束以后，尽快的将面试中遇到的问题记录下来，然后**复盘**整个面试。
对于涉及到的题目，可以查询下资料验证自己是否答错了，如果答错了，就应该把这个知识漏洞补起来。
如果知识点答对了，但是语言组织的不好，那么就需要重新组织下措辞和表达方式。
## 谈钱
我一直认为**到手**的才是真的，当然老板的大饼有时候也会梦想成真，但是这个更多的就是看个人机遇了，可遇不可求，大部分人还是应该追求到手的这一部分，在薪资满意的情况下，再去追求期权这类东西。
在面试之前应该想好自己想要的薪资，然后在和 HR 谈论工资的时候提高百分之 10 - 15的样子，便于别人压价，因为大部分人是没有谈判能力的。然后跳槽的薪资涨幅应该是你当下的百分之 15 以上，这样才能对冲跳槽带来的一个风险，当然如果你实在很想去这家公司的话，那么薪资就另谈了。
在和 HR 讨论待遇的时候，应该问清楚以下几点

- 具体的工资（也就是合同上签订的工资），不要杂七杂八什么绩效加起来的那种
- 五险一金缴纳的比例
- 加班是否有加班工资或者调休
- 是否是 996，我个人很不推荐 996 的公司
- 加薪升职的情况
- 其他各种福利，比如餐补、房补、交通补、节假日福利、另外的保险等等
# 前方的路，让我们结伴同行
## 总结
首先感谢各位购买这本小册。这是我的第一本小册，内容可能会存在瑕疵，感谢大家选择这本小册，选择相信我这个作者。
相信大家都看过一句话：面试造火箭工作拧螺丝。诚然，现在大公司的门槛确实高，但这也是因为僧多粥少，供大于求的问题，因此大公司需要择优而录。那么为了进入大公司（我相信大部分人都有这个想法），我们势必需要驱动自己去不断学习，探索更深入的领域。而不是故步自封，原地踏步，认为会使用框架 API 能干活就行了。
面试时的信心源自于我们面试前的充分准备和平时的积累。有了信心，才能在面试中披荆斩棘，无往不胜。而不是毫无依据的自我感觉良好，面试失败就怪考官刁难、考题太难，责怪于外部因素而不是寻找个人的不足。
我也不说互联网寒不寒冬，毕竟物价、房价摆在那里，想做的好，赚的钱多，只能好好学，好好干，无论春夏秋冬。很感谢看到最后一章节的各位，相信这本小册能给大家带来一份不小的收获。
## 展望未来
小册不是我们学习的终点，为了减少大家找寻学习资料的时间，接下来我会提供一些我认为不错的学习资料供大家参考。
当然了资料是一部分，其实我更推荐在工作中学习。深入学习工作中用到的技术栈并且储备一些未来可能用到的技能，这样对个人职业发展是很有帮助的。
### JS

- [You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS)，这套书深入的讲解很多 JS 的内容，英文版是开源免费阅读的，如果你英文不好的话，国内这套书已经有出版了，可以选择购买。
- [Functional-Light-JS](https://github.com/getify/Functional-Light-JS)，这本书是讲解函数式编程的，函数式编程也是一种编程范式，轻量级的函数式可以很方便的解决很多问题，有兴趣的可以一读。
- [33-js-concepts](https://github.com/leonardomso/33-js-concepts)，这份资料讲解了 33 个前端开发必须知道的 JS 概念，内容是英文的，如果你英文不好的话，可以寻找这份资料的中文版。
- [前端精读周刊](https://github.com/dt-fe/weekly)，这是一份前端好文集合，每周都会更新，目前已经更新了 84 篇文章。
- [前端性能清单](https://github.com/JohnsenZhou/Front-End-Performance-Checklist)，这是一份前端性能清单，如果你需要优化一个项目的话，可以根据这份清单一个个来检查优化项。
- [30-seconds-of-code](https://github.com/30-seconds/30-seconds-of-code)，30 秒系列，很短的代码片段让你了解一个知识点。
- [must-watch-javascript](https://github.com/AllThingsSmitty/must-watch-javascript)，这份资料包含了很多高质量的前端相关视频，值得一看。
### CSS

- [css-protips](https://github.com/AllThingsSmitty/css-protips)，通过这份资料你可以学习到很多 tips 来提高你的 CSS 技能。
- [30-seconds-of-css](https://github.com/30-seconds/30-seconds-of-css)，30 秒系列，很短的代码片段让你了解一个知识点
- [CSS 世界](https://item.jd.com/12262251.html)，张鑫旭出版的书籍，没什么好说的了，看就是了。
- [一些有趣的 CSS 话题](https://github.com/chokcoco/iCSS)，CSS 奇技淫巧，在这里，都有。
### 框架
框架这里其实我不想推荐任何的资料，如果你单纯想学习一个框架的话，我只推荐阅读官方文档学习，没有任何的必要去学习其他的入门资料，因为基本上都是照搬文档的。
如果你想进一步学习框架的内容的话，我推荐去阅读框架核心团队成员的博客。比如 React 核心团队成员 Dan Abramov 的 [blog](https://overreacted.io/)。
### Node
Node.js 几乎是资深前端工程师躲不过去的一道坎，也是一个团队的通用底层能力，学习 Node 可以更好的使用工具，建立起一套数据中间层服务于整个团队。

- [Node.js 调试指南](https://github.com/nswbmw/node-in-debugging)，这是一本专注于讲解 Node 调试的书籍，已经出版了，但是可以开源免费阅读。
- [Node.js：来一打 C++ 扩展](https://item.jd.com/12380404.html)，死月出版的书籍，没什么好说的，看就是了。
- [Node.js 最佳实践](https://github.com/i0natan/nodebestpractices/blob/master/README.chinese.md)，这是对 Node.js 最佳实践中排名最高的内容的总结和分享
### 安全

- [the-book-of-secret-knowledge](https://github.com/trimstray/the-book-of-secret-knowledge)，这是一份安全领域的资料，如果你对安全感兴趣的话，可以阅读一下内容。
### 周报

- [奇舞周刊](https://weekly.75team.com/)，每周都会整理一份不错的中文文章合集。
- [TechBridge Weekly](https://weekly.techbridge.cc/)，这是一份台湾地区整理的一份多个技术领域的周报。
- [JavaScript Weekly](https://javascriptweekly.com/)，这是一份相当有名气的英文周报，整理的文章质量都很高，如果你只想订阅一份周报，那就是它了。
- [Pony Foo Weekly](https://ponyfoo.com/weekly)，这也是一份不错的英文周报，文章质量也很高，并且和上一份周报重叠的内容不多。
### Medium
Medium 上我并没有怎么固定阅读，更多的是订阅它的日报或者从别的周报上看到的 Medium 的文章，但是如果一定要推荐两个组织的话，我只推荐这两个，毕竟他们的文章质量都很高。

- [freecodecamp](https://medium.freecodecamp.org/)
- [hackernoon](https://hackernoon.com/)
### Youtube
Youtube 有很多高质量的视频，但是门槛大家都知道，这里我推荐一些值得订阅的频道。

- [JSConf](https://www.youtube.com/channel/UCzoVCacndDCfGDf41P-z0iA)，很多会议的视频你都可以在这里找到。
- [Google Chrome Developers](https://www.youtube.com/channel/UCnUYZLuoy1rq1aVMwx4aTzw)，Google 金字招牌，没啥好说的。
- [Computerphile](https://www.youtube.com/channel/UC9-y-6csu5WGm29I7JiwpnA)，内容偏向于计算机领域。
- [Coding Tech](https://www.youtube.com/channel/UCtxCXg-UvSnTKPOzLH4wJaQ/videos)，内容偏向于入门。
- [Fun Fun Function](https://www.youtube.com/channel/UCO1cgjhGzsSYb1rsB4bFe4Q)，如果你想学习函数式编程的一些内容，这是一个值得订阅的频道。
- [DevTips](https://www.youtube.com/user/DevTipsForDesigners/videos)，每周更新一个视频，能够学习到不少开发中的 Tips。
### 其他

- [互联网公司技术架构](https://github.com/davideuler/architecture.of.internet-product)，这份资料介绍了当下互联网公司的一个技术架构。
- [javascript-algorithms](https://github.com/trekhleb/javascript-algorithms)，这份资料作者使用了 JS 来实现了大部分的数据结构和算法。
- [小型编译器](https://github.com/jamiebuilds/the-super-tiny-compiler)，这份资料告诉了我们该如何去实现一个小型的编译器，很适合前端开发者阅读。
- [every-programmer-should-know](https://github.com/mtdvio/every-programmer-should-know)，这份资料列举了很多每个开发者都应该知道的知识点。
### 最后
你可能发现我推荐的很多内容都是英文的或者你并不能打开，这里我只能说一声抱歉。因为我获取学习资料更多的来源于国外，可能不能很好照顾到英文不好的同学。但是说一句肺腑之言吧，技术需求的英文真的要求不高，花点时间静下心去阅读英文资料，坚持个几个月，从此技术的大门就完完整整的打开了。
如果大家也有不错的资料想要分享，欢迎在留言区留言。
在小册的最后一章，打一个自己公众号的广告，如果你想了解到一些前端的热点、新知识、我的学习感悟等等，你可以关注我的公众号「**前端真好玩**」。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615294104761-d39b0e6a-7208-4df5-93e2-a0169bcf4256.webp#align=left&display=inline&height=258&margin=%5Bobject%20Object%5D&originHeight=258&originWidth=258&size=0&status=done&style=none&width=258)
最后的最后，真的很感谢购买我小册的朋友，同时也感谢一些业内的大佬花时间阅读我的小册，并给我提出了修改意见，是你们促使我一直写作下去的。我们，下本小册见！
