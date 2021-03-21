# React 和 Vue 两大框架之间的相爱相杀
React 和 Vue 应该是国内当下最火热的前端框架，当然 Angular 也是一个不错的框架，但是这个产品国内使用的人很少再加上我对 Angular 也不怎么熟悉，所以框架的章节中**不会涉及到 Angular 的内容**。
这一章节，我们将会来学习以下几个内容

- MVVM 是什么
- Virtual DOM 是什么
- 前端路由是如何跳转的
- React 和 Vue 之间的区别
## MVVM
> 涉及面试题：什么是 MVVM？比之 MVC 有什么区别？

首先先申明一点，不管是 React 还是 Vue，它们都不是 MVVM 框架，只是有借鉴 MVVM 的思路。文中拿 Vue 举例也是为了更好地理解 MVVM 的概念。
接下来先说下 View 和 Model：

- View 很简单，就是用户看到的视图
- Model 同样很简单，一般就是本地数据和数据库中的数据

基本上，我们写的产品就是通过接口从数据库中读取数据，然后将数据经过处理展现到用户看到的视图上。当然我们还可以从视图上读取用户的输入，然后又将用户的输入通过接口写入到数据库中。但是，如何将数据展示到视图上，然后又如何将用户的输入写入到数据中，不同的人就产生了不同的看法，从此出现了很多种架构设计。
传统的 MVC 架构通常是使用控制器更新模型，视图从模型中获取数据去渲染。当用户有输入时，会通过控制器去更新模型，并且通知视图进行更新。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293445192-1b8e32bb-b7a2-4924-ae72-56f7b3701f3a.webp#align=left&display=inline&height=389&margin=%5Bobject%20Object%5D&originHeight=389&originWidth=1280&size=0&status=done&style=none&width=1280)
MVC
但是 MVC 有一个巨大的缺陷就是**控制器承担的责任太大**了，随着项目愈加复杂，控制器中的代码会越来越**臃肿**，导致出现不利于**维护**的情况。
在 MVVM 架构中，引入了 **ViewModel** 的概念。ViewModel 只关心数据和业务的处理，不关心 View 如何处理数据，在这种情况下，View 和 Model 都可以独立出来，任何一方改变了也不一定需要改变另一方，并且可以将一些可复用的逻辑放在一个 ViewModel 中，让多个 View 复用这个 ViewModel。
![image.svg](https://cdn.nlark.com/yuque/0/2021/svg/1658583/1615293445265-1ae08832-0b13-4130-b3e6-46e8e5a9b731.svg#align=left&display=inline&height=354&margin=%5Bobject%20Object%5D&name=image.svg&originHeight=354&originWidth=1166&size=107&status=done&style=none&width=1166)
以 Vue 框架来举例，ViewModel 就是组件的实例。View 就是模板，Model 的话在引入 Vuex 的情况下是完全可以和组件分离的。
除了以上三个部分，其实在 MVVM 中还引入了一个隐式的 Binder 层，实现了 View 和 ViewModel 的绑定。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293445250-841e6f90-720b-4489-909a-507fc5cf3fed.webp#align=left&display=inline&height=361&margin=%5Bobject%20Object%5D&originHeight=361&originWidth=1178&size=0&status=done&style=none&width=1178)
同样以 Vue 框架来举例，这个**隐式**的 Binder 层就是 Vue 通过解析模板中的插值和指令从而实现 View 与 ViewModel 的绑定。
对于 MVVM 来说，其实最重要的并不是通过双向绑定或者其他的方式将 View 与 ViewModel 绑定起来，**而是通过 ViewModel 将视图中的状态和用户的行为分离出一个抽象，这才是 MVVM 的精髓**。
## Virtual DOM
> 涉及面试题：什么是 Virtual DOM？为什么 Virtual DOM 比原生 DOM 快？

大家都知道操作 DOM 是很慢的，为什么慢的原因已经在「**浏览器渲染原理**」章节中说过，这里就不再赘述了。
那么相较于 DOM 来说，操作 JS 对象会快很多，并且我们也可以通过 JS 来模拟 DOM
```
const ul = {
  tag: 'ul',
  props: {
    class: 'list'
  },
  children: {
    tag: 'li',
    children: '1'
  }
}
```
上述代码对应的 DOM 就是
```
<ul class='list'>
  <li>1</li>
</ul>
```
那么既然 DOM 可以通过 JS 对象来模拟，反之也可以通过 JS 对象来渲染出对应的 DOM。当然了，通过 JS 来模拟 DOM 并且渲染对应的 DOM 只是第一步，难点在于如何判断新旧两个 JS 对象的**最小差异**并且实现**局部更新** DOM。
首先 DOM 是一个多叉树的结构，如果需要完整的对比两颗树的差异，那么需要的时间复杂度会是 O(n ^ 3)，这个复杂度肯定是不能接受的。于是 React 团队优化了算法，实现了 O(n) 的复杂度来对比差异。 实现 O(n) 复杂度的关键就是只对比同层的节点，而不是跨层对比，这也是考虑到在实际业务中很少会去跨层的移动 DOM 元素。 所以判断差异的算法就分为了两步

- 首先从上至下，从左往右遍历对象，也就是树的深度遍历，这一步中会给每个节点添加索引，便于最后渲染差异
- 一旦节点有子元素，就去判断子元素是否有不同

在第一步算法中我们需要判断新旧节点的 `tagName` 是否相同，如果不相同的话就代表节点被替换了。如果没有更改 `tagName` 的话，就需要判断是否有子元素，有的话就进行第二步算法。
在第二步算法中，我们需要判断原本的列表中是否有节点被移除，在新的列表中需要判断是否有新的节点加入，还需要判断节点是否有移动。
举个例子来说，假设页面中只有一个列表，我们对列表中的元素进行了变更
```
// 假设这里模拟一个 ul，其中包含了 5 个 li
[1, 2, 3, 4, 5]
// 这里替换上面的 li
[1, 2, 5, 4]
```
从上述例子中，我们一眼就可以看出先前的 `ul` 中的第三个 `li` 被移除了，四五替换了位置。
那么在实际的算法中，我们如何去识别改动的是哪个节点呢？这就引入了 `key` 这个属性，想必大家在 Vue 或者 React 的列表中都用过这个属性。这个属性是用来给每一个节点打标志的，用于判断是否是同一个节点。
当然在判断以上差异的过程中，我们还需要判断节点的属性是否有变化等等。
当我们判断出以上的差异后，就可以把这些差异记录下来。当对比完两棵树以后，就可以通过差异去局部更新 DOM，实现性能的最优化。
另外再来回答「为什么 Virtual DOM 比原生 DOM 快」这个问题。首先这个问题得分场景来说，如果无脑替换所有的 DOM 这种场景来说，Virtual DOM 的局部更新肯定要来的快。但是如果你可以人肉也同样去局部替换 DOM，那么 Virtual DOM 必然没有你直接操作 DOM 来的快，毕竟还有一层 diff 算法的损耗。
当然了 Virtual DOM 提高性能是其中一个优势，其实**最大的优势**还是在于：

1. 将 Virtual DOM 作为一个兼容层，让我们还能对接非 Web 端的系统，实现跨端开发。
1. 同样的，通过 Virtual DOM 我们可以渲染到其他的平台，比如实现 SSR、同构渲染等等。
1. 实现组件的高度抽象化
## 路由原理
> 涉及面试题：前端路由原理？两种实现方式有什么区别？

前端路由实现起来其实很简单，本质就是**监听 URL 的变化**，然后匹配路由规则，显示相应的页面，并且无须刷新页面。目前前端使用的路由就只有两种实现方式

- Hash 模式
- History 模式
### Hash 模式
`www.test.com/#/` 就是 Hash URL，当 `#` 后面的哈希值发生变化时，可以通过 `hashchange` 事件来监听到 URL 的变化，从而进行跳转页面，并且无论哈希值如何变化，服务端接收到的 URL 请求永远是 `www.test.com`。
```
window.addEventListener('hashchange', () => {
  // ... 具体逻辑
})
```
Hash 模式相对来说更简单，并且兼容性也更好。
### History 模式
History 模式是 HTML5 新推出的功能，主要使用 `history.pushState` 和 `history.replaceState` 改变 URL。
通过 History 模式改变 URL 同样不会引起页面的刷新，只会更新浏览器的历史记录。
```
// 新增历史记录
history.pushState(stateObject, title, URL)
// 替换当前历史记录
history.replaceState(stateObject, title, URL)
```
当用户做出浏览器动作时，比如点击后退按钮时会触发 `popState` 事件
```
window.addEventListener('popstate', e => {
  // e.state 就是 pushState(stateObject) 中的 stateObject
  console.log(e.state)
})
```
### 两种模式对比

- Hash 模式只可以更改 `#` 后面的内容，History 模式可以通过 API 设置任意的同源 URL
- History 模式可以通过 API 添加任意类型的数据到历史记录中，Hash 模式只能更改哈希值，也就是字符串
- Hash 模式无需后端配置，并且兼容性好。History 模式在用户手动输入地址或者刷新页面的时候会发起 URL 请求，后端需要配置 `index.html` 页面用于匹配不到静态资源的时候
## Vue 和 React 之间的区别
Vue 的表单可以使用 `v-model` 支持双向绑定，相比于 React 来说开发上更加方便，当然了 `v-model` 其实就是个语法糖，本质上和 React 写表单的方式没什么区别。
改变数据方式不同，Vue 修改状态相比来说要简单许多，React 需要使用 `setState` 来改变状态，并且使用这个 API 也有一些坑点。并且 Vue 的底层使用了依赖追踪，页面更新渲染已经是最优的了，但是 React 还是需要用户手动去优化这方面的问题。
React 16以后，有些钩子函数会执行多次，这是因为引入 Fiber 的原因，这在后续的章节中会讲到。
React 需要使用 JSX，有一定的上手成本，并且需要一整套的工具链支持，但是完全可以通过 JS 来控制页面，更加的灵活。Vue 使用了模板语法，相比于 JSX 来说没有那么灵活，但是完全可以脱离工具链，通过直接编写 `render` 函数就能在浏览器中运行。
在生态上来说，两者其实没多大的差距，当然 React 的用户是远远高于 Vue 的。
在上手成本上来说，Vue 一开始的定位就是尽可能的降低前端开发的门槛，然而 React 更多的是去改变用户去接受它的概念和思想，相较于 Vue 来说上手成本略高。
## 小结
这一章节中我们学习了几大框架中的相似点，也对比了 React 和 Vue 之间的区别。其实我们可以发现，React 和 Vue 虽然是两个不同的框架，但是他们的底层原理都是很相似的，无非在上层堆砌了自己的概念上去。所以我们无需去对比到底哪个框架牛逼，引用尤大的一句话
> 说到底，就算你证明了 A 比 B 牛逼，也不意味着你或者你的项目就牛逼了... 比起争这个，不如多想想怎么让自己变得更牛逼吧。

# Vue 常考基础知识点
这一章节我们将来学习 Vue 的一些经常考到的基础知识点。
## 生命周期钩子函数
在 `beforeCreate` 钩子函数调用的时候，是获取不到 `props` 或者 `data` 中的数据的，因为这些数据的初始化都在 `initState` 中。
然后会执行 `created` 钩子函数，在这一步的时候已经可以访问到之前不能访问到的数据，但是这时候组件还没被挂载，所以是看不到的。
接下来会先执行 `beforeMount` 钩子函数，开始创建 VDOM，最后执行 `mounted` 钩子，并将 VDOM 渲染为真实 DOM 并且渲染数据。组件中如果有子组件的话，会递归挂载子组件，只有当所有子组件全部挂载完毕，才会执行根组件的挂载钩子。
接下来是数据更新时会调用的钩子函数 `beforeUpdate` 和 `updated`，这两个钩子函数没什么好说的，就是分别在数据更新前和更新后会调用。
另外还有 `keep-alive` 独有的生命周期，分别为 `activated` 和 `deactivated` 。用 `keep-alive` 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 `deactivated` 钩子函数，命中缓存渲染后会执行 `actived` 钩子函数。
最后就是销毁组件的钩子函数 `beforeDestroy` 和 `destroyed`。前者适合移除事件、定时器等等，否则可能会引起内存泄露的问题。然后进行一系列的销毁操作，如果有子组件的话，也会递归销毁子组件，所有子组件都销毁完毕后才会执行根组件的 `destroyed` 钩子函数。
## 组件通信
组件通信一般分为以下几种情况：

- 父子组件通信
- 兄弟组件通信
- 跨多层级组件通信
- 任意组件

对于以上每种情况都有多种方式去实现，接下来就来学习下如何实现。
### 父子通信
父组件通过 `props` 传递数据给子组件，子组件通过 `emit` 发送事件传递数据给父组件，这两种方式是最常用的父子通信实现办法。
这种父子通信方式也就是典型的单向数据流，父组件通过 `props` 传递数据，子组件不能直接修改 `props`， 而是必须通过发送事件的方式告知父组件修改数据。
另外这两种方式还可以使用语法糖 `v-model` 来直接实现，因为 `v-model` 默认会解析成名为 `value` 的 `prop` 和名为 `input` 的事件。这种语法糖的方式是典型的双向绑定，常用于 UI 控件上，但是究其根本，还是通过事件的方法让父组件修改数据。
当然我们还可以通过访问 `$parent` 或者 `$children` 对象来访问组件实例中的方法和数据。
另外如果你使用 Vue 2.3 及以上版本的话还可以使用 `$listeners` 和 `.sync` 这两个属性。
`$listeners` 属性会将父组件中的 (不含 `.native` 修饰器的) `v-on` 事件监听器传递给子组件，子组件可以通过访问 `$listeners` 来自定义监听器。
`.sync` 属性是个语法糖，可以很简单的实现子组件与父组件通信
```
<!--父组件中-->
<input :value.sync="value" />
<!--以上写法等同于-->
<input :value="value" @update:value="v => value = v"></comp>
<!--子组件中-->
<script>
  this.$emit('update:value', 1)
</script>
```
### 兄弟组件通信
对于这种情况可以通过查找父组件中的子组件实现，也就是 `this.$parent.$children`，在 `$children` 中可以通过组件 `name` 查询到需要的组件实例，然后进行通信。
### 跨多层次组件通信
对于这种情况可以使用 Vue 2.2 新增的 API `provide / inject`，虽然文档中不推荐直接使用在业务中，但是如果用得好的话还是很有用的。
假设有父组件 A，然后有一个跨多层级的子组件 B
```
// 父组件 A
export default {
  provide: {
    data: 1
  }
}
// 子组件 B
export default {
  inject: ['data'],
  mounted() {
    // 无论跨几层都能获得父组件的 data 属性
    console.log(this.data) // => 1
  }
}
```
### 任意组件
这种方式可以通过 Vuex 或者 Event Bus 解决，另外如果你不怕麻烦的话，可以使用这种方式解决上述所有的通信情况
## extend 能做什么
这个 API 很少用到，作用是扩展组件生成一个构造器，通常会与 `$mount` 一起使用。
```
// 创建组件构造器
let Component = Vue.extend({
  template: '<div>test</div>'
})
// 挂载到 #app 上
new Component().$mount('#app')
// 除了上面的方式，还可以用来扩展已有的组件
let SuperComponent = Vue.extend(Component)
new SuperComponent({
    created() {
        console.log(1)
    }
})
new SuperComponent().$mount('#app')
```
## mixin 和 mixins 区别
`mixin` 用于全局混入，会影响到每个组件实例，通常插件都是这样做初始化的。
```
Vue.mixin({
    beforeCreate() {
        // ...逻辑
        // 这种方式会影响到每个组件的 beforeCreate 钩子函数
    }
})
```
虽然文档不建议我们在应用中直接使用 `mixin`，但是如果不滥用的话也是很有帮助的，比如可以全局混入封装好的 `ajax` 或者一些工具函数等等。
`mixins` 应该是我们最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 `mixins` 混入代码，比如上拉下拉加载数据这种逻辑等等。
另外需要注意的是 `mixins` 混入的钩子函数会先于组件内的钩子函数执行，并且在遇到同名选项的时候也会有选择性的进行合并，具体可以阅读 [文档](https://cn.vuejs.org/v2/guide/mixins.html)。
## computed 和 watch 区别
`computed` 是计算属性，依赖其他属性计算值，并且 `computed` 的值有缓存，只有当计算值变化才会返回内容。
`watch` 监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作。
所以一般来说需要依赖别的属性来动态获得值的时候可以使用 `computed`，对于监听到值的变化需要做一些复杂业务逻辑的情况可以使用 `watch`。
另外 `computed` 和 `watch` 还都支持对象的写法，这种方式知道的人并不多。
```
vm.$watch('obj', {
    // 深度遍历
    deep: true,
    // 立即触发
    immediate: true,
    // 执行的函数
    handler: function(val, oldVal) {}
})
var vm = new Vue({
  data: { a: 1 },
  computed: {
    aPlus: {
      // this.aPlus 时触发
      get: function () {
        return this.a + 1
      },
      // this.aPlus = 1 时触发
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
```
## keep-alive 组件有什么作用
如果你需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 `keep-alive` 组件包裹需要保存的组件。
对于 `keep-alive` 组件来说，它拥有两个独有的生命周期钩子函数，分别为 `activated` 和 `deactivated` 。用 `keep-alive` 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 `deactivated` 钩子函数，命中缓存渲染后会执行 `actived` 钩子函数。
## v-show 与 v-if 区别
`v-show` 只是在 `display: none` 和 `display: block` 之间切换。无论初始条件是什么都会被渲染出来，后面只需要切换 CSS，DOM 还是一直保留着的。所以总的来说 `v-show` 在初始渲染时有更高的开销，但是切换开销很小，更适合于频繁切换的场景。
`v-if` 的话就得说到 Vue 底层的编译了。当属性初始为 `false` 时，组件就不会被渲染，直到条件为 `true`，并且切换条件时会触发销毁/挂载组件，所以总的来说在切换时开销更高，更适合不经常切换的场景。
并且基于 `v-if` 的这种惰性渲染机制，可以在必要的时候才去渲染组件，减少整个页面的初始渲染开销。
## 组件中 data 什么时候可以使用对象
这道题目其实更多考的是 JS 功底。
组件复用时所有组件实例都会共享 `data`，如果 `data` 是对象的话，就会造成一个组件修改 `data` 以后会影响到其他所有组件，所以需要将 `data` 写成函数，每次用到就调用一次函数获得新的数据。
当我们使用 `new Vue()` 的方式的时候，无论我们将 `data` 设置为对象还是函数都是可以的，因为 `new Vue()` 的方式是生成一个根组件，该组件不会复用，也就不存在共享 `data` 的情况了。
# 小结
总的来说这一章节的内容更多的偏向于 Vue 的基础，下一章节我们将来了解一些原理性方面的知识。
# Vue 常考进阶知识点
这一章节我们将来学习 Vue 的一些经常考到的进阶知识点。这些知识点相对而言理解起来会很有难度，可能需要多次阅读才能理解。
## 响应式原理
Vue 内部使用了 `Object.defineProperty()` 来实现数据响应式，通过这个函数可以监听到 `set` 和 `get` 的事件。
```
var data = { name: 'yck' }
observe(data)
let name = data.name // -> get value
data.name = 'yyy' // -> change value
function observe(obj) {
  // 判断类型
  if (!obj || typeof obj !== 'object') {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}
function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)
  Object.defineProperty(obj, key, {
    // 可枚举
    enumerable: true,
    // 可配置
    configurable: true,
    // 自定义函数
    get: function reactiveGetter() {
      console.log('get value')
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal
    }
  })
}
```
以上代码简单的实现了如何监听数据的 `set` 和 `get` 的事件，但是仅仅如此是不够的，因为自定义的函数一开始是不会执行的。只有先执行了依赖收集，才能在属性更新的时候派发更新，所以接下来我们需要先触发依赖收集。
```
<div>
    {{name}}
</div>
```
在解析如上模板代码时，遇到 `{{name}}` 就会进行依赖收集。
接下来我们先来实现一个 `Dep` 类，用于解耦属性的依赖收集和派发更新操作。
```
// 通过 Dep 解耦属性的依赖和更新操作
class Dep {
  constructor() {
    this.subs = []
  }
  // 添加依赖
  addSub(sub) {
    this.subs.push(sub)
  }
  // 更新
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
// 全局属性，通过该属性配置 Watcher
Dep.target = null
```
以上的代码实现很简单，当需要依赖收集的时候调用 `addSub`，当需要派发更新的时候调用 `notify`。
接下来我们先来简单的了解下 Vue 组件挂载时添加响应式的过程。在组件挂载时，会先对所有需要的属性调用 `Object.defineProperty()`，然后实例化 `Watcher`，传入组件更新的回调。在实例化过程中，会对模板中的属性进行求值，触发依赖收集。
因为这一小节主要目的是学习响应式原理的细节，所以接下来的代码会简略的表达触发依赖收集时的操作。
```
class Watcher {
  constructor(obj, key, cb) {
    // 将 Dep.target 指向自己
    // 然后触发属性的 getter 添加监听
    // 最后将 Dep.target 置空
    Dep.target = this
    this.cb = cb
    this.obj = obj
    this.key = key
    this.value = obj[key]
    Dep.target = null
  }
  update() {
    // 获得新值
    this.value = this.obj[this.key]
    // 调用 update 方法更新 Dom
    this.cb(this.value)
  }
}
```
以上就是 `Watcher` 的简单实现，在执行构造函数的时候将 `Dep.target` 指向自身，从而使得收集到了对应的 `Watcher`，在派发更新的时候取出对应的 `Watcher` 然后执行 `update` 函数。
接下来，需要对 `defineReactive` 函数进行改造，在自定义函数中添加依赖收集和派发更新相关的代码。
```
function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)
  let dp = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('get value')
      // 将 Watcher 添加到订阅
      if (Dep.target) {
        dp.addSub(Dep.target)
      }
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal
      // 执行 watcher 的 update 方法
      dp.notify()
    }
  })
}
```
以上所有代码实现了一个简易的数据响应式，核心思路就是手动触发一次属性的 getter 来实现依赖收集。
现在我们就来测试下代码的效果，只需要把所有的代码复制到浏览器中执行，就会发现页面的内容全部被替换了。
```
var data = { name: 'yck' }
observe(data)
function update(value) {
  document.querySelector('div').innerText = value
}
// 模拟解析到 `{{name}}` 触发的操作
new Watcher(data, 'name', update)
// update Dom innerText
data.name = 'yyy'
```
### Object.defineProperty 的缺陷
以上已经分析完了 Vue 的响应式原理，接下来说一点 `Object.defineProperty` 中的缺陷。
如果通过下标方式修改数组数据或者给对象新增属性并不会触发组件的重新渲染，因为 `Object.defineProperty` 不能拦截到这些操作，更精确的来说，对于数组而言，大部分操作都是拦截不到的，只是 Vue 内部通过重写函数的方式解决了这个问题。
对于第一个问题，Vue 提供了一个 API 解决
```
export function set (target: Array<any> | Object, key: any, val: any): any {
  // 判断是否为数组且下标是否有效
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 调用 splice 函数触发派发更新
    // 该函数已被重写
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  // 判断 key 是否已经存在
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  // 如果对象不是响应式对象，就赋值返回
  if (!ob) {
    target[key] = val
    return val
  }
  // 进行双向绑定
  defineReactive(ob.value, key, val)
  // 手动派发更新
  ob.dep.notify()
  return val
}
```
对于数组而言，Vue 内部重写了以下函数实现派发更新
```
// 获得数组原型
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
// 重写以下函数
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
methodsToPatch.forEach(function (method) {
  // 缓存原生函数
  const original = arrayProto[method]
  // 重写函数
  def(arrayMethods, method, function mutator (...args) {
  // 先调用原生函数获得结果
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    // 调用以下几个函数时，监听新数据
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // 手动派发更新
    ob.dep.notify()
    return result
  })
})
```
## 编译过程
想必大家在使用 Vue 开发的过程中，基本都是使用模板的方式。那么你有过「模板是怎么在浏览器中运行的」这种疑虑嘛？
首先直接把模板丢到浏览器中肯定是不能运行的，模板只是为了方便开发者进行开发。Vue 会通过编译器将模板通过几个阶段最终编译为 `render` 函数，然后通过执行 `render` 函数生成 Virtual DOM 最终映射为真实 DOM。
接下来我们就来学习这个编译的过程，了解这个过程中大概发生了什么事情。这个过程其中又分为三个阶段，分别为：

1. 将模板解析为 AST
1. 优化 AST
1. 将 AST 转换为 `render` 函数

在第一个阶段中，最主要的事情还是通过各种各样的正则表达式去匹配模板中的内容，然后将内容提取出来做各种逻辑操作，接下来会生成一个最基本的 AST 对象
```
{
    // 类型
    type: 1,
    // 标签
    tag,
    // 属性列表
    attrsList: attrs,
    // 属性映射
    attrsMap: makeAttrsMap(attrs),
    // 父节点
    parent,
    // 子节点
    children: []
}
```
然后会根据这个最基本的 AST 对象中的属性，进一步扩展 AST。
当然在这一阶段中，还会进行其他的一些判断逻辑。比如说对比前后开闭标签是否一致，判断根组件是否只存在一个，判断是否符合 HTML5 [Content Model](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Content_categories) 规范等等问题。
接下来就是优化 AST 的阶段。在当前版本下，Vue 进行的优化内容其实还是不多的。只是对节点进行了静态内容提取，也就是将永远不会变动的节点提取了出来，实现复用 Virtual DOM，跳过对比算法的功能。在下一个大版本中，Vue 会在优化 AST 的阶段继续发力，实现更多的优化功能，尽可能的在编译阶段压榨更多的性能，比如说提取静态的属性等等优化行为。
最后一个阶段就是通过 AST 生成 `render` 函数了。其实这一阶段虽然分支有很多，但是最主要的目的就是遍历整个 AST，根据不同的条件生成不同的代码罢了。
## NextTick 原理分析
`nextTick` 可以让我们在下次 DOM 更新循环结束之后执行延迟回调，用于获得更新后的 DOM。
在 Vue 2.4 之前都是使用的 microtasks，但是 microtasks 的优先级过高，在某些情况下可能会出现比事件冒泡更快的情况，但如果都使用 macrotasks 又可能会出现渲染的性能问题。所以在新版本中，会默认使用 microtasks，但在特殊情况下会使用 macrotasks，比如 v-on。
对于实现 macrotasks ，会先判断是否能使用 `setImmediate` ，不能的话降级为 `MessageChannel` ，以上都不行的话就使用 `setTimeout`
```
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (
  typeof MessageChannel !== 'undefined' &&
  (isNative(MessageChannel) ||
    // PhantomJS
    MessageChannel.toString() === '[object MessageChannelConstructor]')
) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```
以上代码很简单，就是判断能不能使用相应的 API。
## 小结
以上就是 Vue 的几个高频核心问题了，如果你还想了解更多的源码相关的细节，强烈推荐黄老师的 [Vue 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/)。
# React 常考基础知识点
这一章节我们将来学习 React 的一些经常考到的基础知识点。
## 生命周期
在 V16 版本中引入了 Fiber 机制。这个机制一定程度上的影响了部分生命周期的调用，并且也引入了新的 2 个 API 来解决问题，关于 Fiber 的内容将会在下一章节中讲到。
在之前的版本中，如果你拥有一个很复杂的复合组件，然后改动了最上层组件的 `state`，那么调用栈可能会很长
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293505095-0dff8582-d8b6-4970-b158-dd75fd6ca243.webp#align=left&display=inline&height=739&margin=%5Bobject%20Object%5D&originHeight=739&originWidth=685&size=0&status=done&style=none&width=685)
调用栈过长，再加上中间进行了复杂的操作，就可能导致长时间阻塞主线程，带来不好的用户体验。Fiber 就是为了解决该问题而生。
Fiber 本质上是一个虚拟的堆栈帧，新的调度器会按照优先级自由调度这些帧，从而将之前的同步渲染改成了异步渲染，在不影响体验的情况下去分段计算更新。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293505097-292f0411-1c75-411d-bef9-87663640bb1a.webp#align=left&display=inline&height=600&margin=%5Bobject%20Object%5D&originHeight=600&originWidth=1119&size=0&status=done&style=none&width=1119)
对于如何区别优先级，React 有自己的一套逻辑。对于动画这种实时性很高的东西，也就是 16 ms 必须渲染一次保证不卡顿的情况下，React 会每 16 ms（以内） 暂停一下更新，返回来继续渲染动画。
对于异步渲染，现在渲染有两个阶段：`reconciliation` 和 `commit` 。前者过程是可以打断的，后者不能暂停，会一直更新界面直到完成。
**Reconciliation** 阶段

- `componentWillMount`
- `componentWillReceiveProps`
- `shouldComponentUpdate`
- `componentWillUpdate`

**Commit** 阶段

- `componentDidMount`
- `componentDidUpdate`
- `componentWillUnmount`

因为 Reconciliation 阶段是可以被打断的，所以 Reconciliation 阶段会执行的生命周期函数就可能会出现调用多次的情况，从而引起 Bug。由此对于 Reconciliation 阶段调用的几个函数，除了 `shouldComponentUpdate` 以外，其他都应该避免去使用，并且 V16 中也引入了新的 API 来解决这个问题。
`getDerivedStateFromProps` 用于替换 `componentWillReceiveProps` ，该函数会在初始化和 `update` 时被调用
```
class ExampleComponent extends React.Component {
  // Initialize state in constructor,
  // Or with a property initializer.
  state = {};
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.someMirroredValue !== nextProps.someValue) {
      return {
        derivedData: computeDerivedState(nextProps),
        someMirroredValue: nextProps.someValue
      };
    }
    // Return null to indicate no change to state.
    return null;
  }
}
```
`getSnapshotBeforeUpdate` 用于替换 `componentWillUpdate` ，该函数会在 `update` 后 DOM 更新前被调用，用于读取最新的 DOM 数据。
## setState
`setState` 在 React 中是经常使用的一个 API，但是它存在一些的问题经常会导致初学者出错，核心原因就是因为这个 API 是异步的。
首先 `setState` 的调用并不会马上引起 `state` 的改变，并且如果你一次调用了多个 `setState` ，那么结果可能并不如你期待的一样。
```
handle() {
  // 初始化 `count` 为 0
  console.log(this.state.count) // -> 0
  this.setState({ count: this.state.count + 1 })
  this.setState({ count: this.state.count + 1 })
  this.setState({ count: this.state.count + 1 })
  console.log(this.state.count) // -> 0
}
```
第一，两次的打印都为 0，因为 `setState` 是个异步 API，只有同步代码运行完毕才会执行。`setState` 异步的原因我认为在于，`setState` 可能会导致 DOM 的重绘，如果调用一次就马上去进行重绘，那么调用多次就会造成不必要的性能损失。设计成异步的话，就可以将多次调用放入一个队列中，在恰当的时候统一进行更新过程。
第二，虽然调用了三次 `setState` ，但是 `count` 的值还是为 1。因为多次调用会合并为一次，只有当更新结束后 `state` 才会改变，三次调用等同于如下代码
```
Object.assign(  
  {},
  { count: this.state.count + 1 },
  { count: this.state.count + 1 },
  { count: this.state.count + 1 },
)w
```
当然你也可以通过以下方式来实现调用三次 `setState` 使得 `count` 为 3
```
handle() {
  this.setState((prevState) => ({ count: prevState.count + 1 }))
  this.setState((prevState) => ({ count: prevState.count + 1 }))
  this.setState((prevState) => ({ count: prevState.count + 1 }))
}
```
如果你想在每次调用 `setState` 后获得正确的 `state` ，可以通过如下代码实现
```
handle() {
    this.setState((prevState) => ({ count: prevState.count + 1 }), () => {
        console.log(this.state)
    })
}
```
## 性能优化
这小节内容集中在组件的性能优化上，这一方面的性能优化也基本集中在 `shouldComponentUpdate` 这个钩子函数上做文章。
> PS：下文中的 state 指代了 state 及 props

在 `shouldComponentUpdate` 函数中我们可以通过返回布尔值来决定当前组件是否需要更新。这层代码逻辑可以是简单地浅比较一下当前 `state` 和之前的 `state` 是否相同，也可以是判断某个值更新了才触发组件更新。一般来说不推荐完整地对比当前 `state` 和之前的 `state` 是否相同，因为组件更新触发可能会很频繁，这样的完整对比性能开销会有点大，可能会造成得不偿失的情况。
当然如果真的想完整对比当前 `state` 和之前的 `state` 是否相同，并且不影响性能也是行得通的，可以通过 immutable 或者 immer 这些库来生成不可变对象。这类库对于操作大规模的数据来说会提升不错的性能，并且一旦改变数据就会生成一个新的对象，对比前后 `state` 是否一致也就方便多了，同时也很推荐阅读下 immer 的源码实现。
另外如果只是单纯的浅比较一下，可以直接使用 `PureComponent`，底层就是实现了浅比较 `state`。
```
class Test extends React.PureComponent {
  render() {
    return (
      <div>
        PureComponent
      </div>
    )
  }
}
```
这时候你可能会考虑到函数组件就不能使用这种方式了，如果你使用 16.6.0 之后的版本的话，可以使用 `React.memo` 来实现相同的功能。
```
const Test = React.memo(() => (
    <div>
        PureComponent
    </div>
))
```
通过这种方式我们就可以既实现了 `shouldComponentUpdate` 的浅比较，又能够使用函数组件。
## 通信
其实 React 中的组件通信基本和 Vue 中的一致。同样也分为以下三种情况：

- 父子组件通信
- 兄弟组件通信
- 跨多层级组件通信
- 任意组件
### 父子通信
父组件通过 `props` 传递数据给子组件，子组件通过调用父组件传来的函数传递数据给父组件，这两种方式是最常用的父子通信实现办法。
这种父子通信方式也就是典型的单向数据流，父组件通过 `props` 传递数据，子组件不能直接修改 `props`， 而是必须通过调用父组件函数的方式告知父组件修改数据。
### 兄弟组件通信
对于这种情况可以通过共同的父组件来管理状态和事件函数。比如说其中一个兄弟组件调用父组件传递过来的事件函数修改父组件中的状态，然后父组件将状态传递给另一个兄弟组件。
### 跨多层次组件通信
如果你使用 16.3 以上版本的话，对于这种情况可以使用 Context API。
```
// 创建 Context，可以在开始就传入值
const StateContext = React.createContext()
class Parent extends React.Component {
  render () {
    return (
      // value 就是传入 Context 中的值
      <StateContext.Provider value='yck'>
        <Child />
      </StateContext.Provider>
    )
  }
}
class Child extends React.Component {
  render () {
    return (
      <ThemeContext.Consumer>
        // 取出值
        {context => (
          name is { context }
        )}
      </ThemeContext.Consumer>
    );
  }
}
```
### 任意组件
这种方式可以通过 Redux 或者 Event Bus 解决，另外如果你不怕麻烦的话，可以使用这种方式解决上述所有的通信情况
## 小结
总的来说这一章节的内容更多的偏向于 React 的基础，另外 React 的面试题还会经常考到 Virtual DOM 中的内容，所以这块内容大家也需要好好准备。
下一章节我们将来了解一些 React 的进阶知识内容。
# React 常考进阶知识点
这一章节我们将来学习 React 的一些经常考到的进阶知识点，并且这章节还需要配合第十九章阅读，其中的内容经常会考到。
## HOC 是什么？相比 mixins 有什么优点？
很多人看到高阶组件（HOC）这个概念就被吓到了，认为这东西很难，其实这东西概念真的很简单，我们先来看一个例子。
```
function add(a, b) {
    return a + b
}
```
现在如果我想给这个 `add` 函数添加一个输出结果的功能，那么你可能会考虑我直接使用 `console.log` 不就实现了么。说的没错，但是如果我们想做的更加优雅并且容易复用和扩展，我们可以这样去做：
```
function withLog (fn) {
    function wrapper(a, b) {
        const result = fn(a, b)
        console.log(result)
        return result
    }
    return wrapper
}
const withLogAdd = withLog(add)
withLogAdd(1, 2)
```
其实这个做法在函数式编程里称之为高阶函数，大家都知道 React 的思想中是存在函数式编程的，高阶组件和高阶函数就是同一个东西。我们实现一个函数，传入一个组件，然后在函数内部再实现一个函数去扩展传入的组件，最后返回一个新的组件，这就是高阶组件的概念，作用就是为了更好的复用代码。
其实 HOC 和 Vue 中的 mixins 作用是一致的，并且在早期 React 也是使用 mixins 的方式。但是在使用 class 的方式创建组件以后，mixins 的方式就不能使用了，并且其实 mixins 也是存在一些问题的，比如：

- 隐含了一些依赖，比如我在组件中写了某个 `state` 并且在 `mixin` 中使用了，就这存在了一个依赖关系。万一下次别人要移除它，就得去 `mixin` 中查找依赖
- 多个 `mixin` 中可能存在相同命名的函数，同时代码组件中也不能出现相同命名的函数，否则就是重写了，其实我一直觉得命名真的是一件麻烦事。。
- 雪球效应，虽然我一个组件还是使用着同一个 `mixin`，但是一个 `mixin` 会被多个组件使用，可能会存在需求使得 `mixin` 修改原本的函数或者新增更多的函数，这样可能就会产生一个维护成本

HOC 解决了这些问题，并且它们达成的效果也是一致的，同时也更加的政治正确（毕竟更加函数式了）。
## 事件机制
React 其实自己实现了一套事件机制，首先我们考虑一下以下代码：
```
const Test = ({ list, handleClick }) => ({
    list.map((item, index) => (
        <span onClick={handleClick} key={index}>{index}</span>
    ))
})
```
以上类似代码想必大家经常会写到，但是你是否考虑过点击事件是否绑定在了每一个标签上？事实当然不是，JSX 上写的事件并没有绑定在对应的真实 DOM 上，而是通过事件代理的方式，将所有的事件都统一绑定在了 `document` 上。这样的方式不仅减少了内存消耗，还能在组件挂载销毁时统一订阅和移除事件。
另外冒泡到 `document` 上的事件也不是原生浏览器事件，而是 React 自己实现的合成事件（SyntheticEvent）。因此我们如果不想要事件冒泡的话，调用 `event.stopPropagation` 是无效的，而应该调用 `event.preventDefault`。
那么实现合成事件的目的是什么呢？总的来说在我看来好处有两点，分别是：

- 合成事件首先抹平了浏览器之间的兼容问题，另外这是一个跨浏览器原生事件包装器，赋予了跨浏览器开发的能力
- 对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果你有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个事件池专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次复用事件对象。
## 更新内容

- [React 进阶系列：Hooks 该怎么用](https://github.com/KieSun/Dream/issues/15)
## 小结
你可能会惊讶于这一章节的内容并不多的情况，其实你如果将两章 React 以及第十九章的内容全部学习完后，基本上 React 的大部分面试问题都可以解决。
当然你可能会觉得看的还不过瘾，这不需要担心。我已经决定写一个免费专栏「React 进阶」，专门讲解有难度的问题。比如组件的设计模式、新特性、部分源码解析等等内容。当然这些内容都是需要好好打磨的，所以更新的不会很快，有兴趣的可以持续关注，都会更新链接在这一章节中。
# 监控
前端监控一般分为三种，分别为页面埋点、性能监控以及异常监控。
这一章节我们将来学习这些监控相关的内容，但是基本不会涉及到代码，只是让大家了解下前端监控该用什么方式实现。毕竟大部分公司都只是使用到了第三方的监控工具，而不是选择自己造轮子。
## 页面埋点
页面埋点应该是大家最常写的监控了，一般起码会监控以下几个数据：

- PV / UV
- 停留时长
- 流量来源
- 用户交互

对于这几类统计，一般的实现思路大致可以分为两种，分别为手写埋点和无埋点的方式。
相信第一种方式也是大家最常用的方式，可以自主选择需要监控的数据然后在相应的地方写入代码。这种方式的灵活性很大，但是唯一的缺点就是工作量较大，每个需要监控的地方都得插入代码。
另一种无埋点的方式基本不需要开发者手写埋点了，而是统计所有的事件并且定时上报。这种方式虽然没有前一种方式繁琐了，但是因为统计的是所有事件，所以还需要后期过滤出需要的数据。
## 性能监控
性能监控可以很好的帮助开发者了解在各种真实环境下，页面的性能情况是如何的。
对于性能监控来说，我们可以直接使用浏览器自带的 [Performance API](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance) 来实现这个功能。
对于性能监控来说，其实我们只需要调用 `performance.getEntriesByType('navigation')` 这行代码就行了。对，你没看错，一行代码我们就可以获得页面中各种详细的性能相关信息。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293599910-e851d016-d53e-4c0f-ba5b-032fb4221480.webp#align=left&display=inline&height=570&margin=%5Bobject%20Object%5D&originHeight=570&originWidth=444&size=0&status=done&style=none&width=444)
我们可以发现这行代码返回了一个数组，内部包含了相当多的信息，从数据开始在网络中传输到页面加载完成都提供了相应的数据。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293599825-c9af0447-9736-47f0-b1e4-b8cc2d1fd4b6.webp#align=left&display=inline&height=284&margin=%5Bobject%20Object%5D&originHeight=284&originWidth=844&size=0&status=done&style=none&width=844)
## 异常监控
对于异常监控来说，以下两种监控是必不可少的，分别是代码报错以及接口异常上报。
对于代码运行错误，通常的办法是使用 `window.onerror` 拦截报错。该方法能拦截到大部分的详细报错信息，但是也有例外

- 对于跨域的代码运行错误会显示 `Script error.` 对于这种情况我们需要给 `script` 标签添加 `crossorigin` 属性
- 对于某些浏览器可能不会显示调用栈信息，这种情况可以通过 `arguments.callee.caller` 来做栈递归

对于异步代码来说，可以使用 `catch` 的方式捕获错误。比如 `Promise` 可以直接使用 `catch` 函数，`async await` 可以使用 `try catch`。
但是要注意线上运行的代码都是压缩过的，需要在打包时生成 sourceMap 文件便于 debug。
对于捕获的错误需要上传给服务器，通常可以通过 `img` 标签的 `src` 发起一个请求。
另外接口异常就相对来说简单了，可以列举出出错的状态码。一旦出现此类的状态码就可以立即上报出错。接口异常上报可以让开发人员迅速知道有哪些接口出现了大面积的报错，以便迅速修复问题。
## 小结
这一章节内容虽然不多，但是这类监控的知识网上的资料确实不多，相信能给大家一个不错的思路。
# UDP
网络协议是每个前端工程师都必须要掌握的知识，我们将先来学习传输层中的两个协议：UDP 以及 TCP。对于大部分工程师来说最常用的协议也就是这两个了，并且面试中经常会提问的也是关于这两个协议的区别。
我们先来解答这个常考面试题关于 UDP 部分的内容，然后再详细去学习这个协议。
```
常考面试题：UDP 与 TCP 的区别是什么？
```
首先 UDP 协议是面向无连接的，也就是说不需要在正式传递数据之前先连接起双方。然后 UDP 协议只是数据报文的搬运工，不保证有序且不丢失的传递到对端，并且UDP 协议也没有任何控制流量的算法，总的来说 UDP 相较于 TCP 更加的轻便。
## 面向无连接
首先 UDP 是不需要和 TCP 一样在发送数据前进行三次握手建立连接的，想发数据就可以开始发送了。
并且也只是数据报文的搬运工，不会对数据报文进行任何拆分和拼接操作。
具体来说就是：

- 在发送端，应用层将数据传递给传输层的 UDP 协议，UDP 只会给数据增加一个 UDP 头标识下是 UDP 协议，然后就传递给网络层了
- 在接收端，网络层将数据传递给传输层，UDP 只去除 IP 报文头就传递给应用层，不会任何拼接操作
## 不可靠性
首先不可靠性体现在无连接上，通信都不需要建立连接，想发就发，这样的情况肯定不可靠。
并且收到什么数据就传递什么数据，并且也不会备份数据，发送数据也不会关心对方是否已经正确接收到数据了。
再者网络环境时好时坏，但是 UDP 因为没有拥塞控制，一直会以恒定的速度发送数据。即使网络条件不好，也不会对发送速率进行调整。这样实现的弊端就是在网络条件不好的情况下可能会导致丢包，但是优点也很明显，在某些实时性要求高的场景（比如电话会议）就需要使用 UDP 而不是 TCP。
## 高效
虽然 UDP 协议不是那么的可靠，但是正是因为它不是那么的可靠，所以也就没有 TCP 那么复杂了，需要保证数据不丢失且有序到达。
因此 UDP 的头部开销小，只有八字节，相比 TCP 的至少二十字节要少得多，在传输数据报文时是很高效的。
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293630029-98913a1c-dc0d-4708-8fe2-09c8c36993c5.png#align=left&display=inline&height=170&margin=%5Bobject%20Object%5D&originHeight=170&originWidth=831&size=0&status=done&style=none&width=831)
UDP 头部包含了以下几个数据

- 两个十六位的端口号，分别为源端口（可选字段）和目标端口
- 整个数据报文的长度
- 整个数据报文的检验和（IPv4 可选 字段），该字段用于发现头部信息和数据中的错误
## 传输方式
UDP 不止支持一对一的传输方式，同样支持一对多，多对多，多对一的方式，也就是说 UDP 提供了单播，多播，广播的功能。
## 适合使用的场景
UDP 虽然对比 TCP 有很多缺点，但是正是因为这些缺点造就了它高效的特性，在很多实时性要求高的地方都可以看到 UDP 的身影。
### 直播
想必大家都看过直播吧，大家可以考虑下如果直播使用了基于 TCP 的协议会发生什么事情？
TCP 会严格控制传输的正确性，一旦有某一个数据对端没有收到，就会停止下来直到对端收到这个数据。这种问题在网络条件不错的情况下可能并不会发生什么事情，但是在网络情况差的时候就会变成画面卡住，然后再继续播放下一帧的情况。
但是对于直播来说，用户肯定关注的是最新的画面，而不是因为网络条件差而丢失的老旧画面，所以 TCP 在这种情况下无用武之地，只会降低用户体验。
### 王者荣耀
虽然我具体不知道王者荣耀底层使用了什么协议，但是对于这类实时性要求很高的游戏来说，UDP 是跑不了的。
为什么这样说呢？首先对于王者荣耀来说，用户体量是相当大的，如果使用 TCP 连接的话，就可能会出现服务器不够用的情况，因为每台服务器可供支撑的 TCP 连接数量是有限制的。
再者，因为 TCP 会严格控制传输的正确性，如果因为用户网络条件不好就造成页面卡顿然后再传输旧的游戏画面是肯定不能接受的，毕竟对于这类实时性要求很高的游戏来说，最新的游戏画面才是最需要的，而不是老旧的画面，否则角色都不知道死多少次了。
## 小结
这一章节的内容就到这里，因为 UDP 协议相对简单，所以内容并不是很多，但是下一章节会呈现很多关于 TCP 相关的内容，请大家做好准备。
最后总结一下这一章节的内容：

- UDP 相比 TCP 简单的多，不需要建立连接，不需要验证数据报文，不需要流量控制，只会把想发的数据报文一股脑的丢给对端
- 虽然 UDP 并没有 TCP 传输来的准确，但是也能在很多实时性要求高的地方有所作为
# TCP
首先还是先来解答这个常考面试题关于 TCP 部分的内容，然后再详细去学习这个协议。
```
常考面试题：UDP 与 TCP 的区别是什么？
```
TCP 基本是和 UDP 反着来，建立连接断开连接都需要先需要进行握手。在传输数据的过程中，通过各种算法保证数据的可靠性，当然带来的问题就是相比 UDP 来说不那么的高效。
## 头部
从这个图上我们就可以发现 TCP 头部比 UDP 头部复杂的多。
![](https://cdn.nlark.com/yuque/0/2021/png/1658583/1615293685763-b244bd57-0c4b-461d-8084-dd4da8ed3056.png#align=left&display=inline&height=305&margin=%5Bobject%20Object%5D&originHeight=305&originWidth=858&size=0&status=done&style=none&width=858)
对于 TCP 头部来说，以下几个字段是很重要的

- Sequence number，这个序号保证了 TCP 传输的报文都是有序的，对端可以通过序号顺序的拼接报文
- Acknowledgement Number，这个序号表示数据接收端期望接收的下一个字节的编号是多少，同时也表示上一个序号的数据已经收到
- Window Size，窗口大小，表示还能接收多少字节的数据，用于流量控制
- 标识符
   - URG=1：该字段为一表示本数据报的数据部分包含紧急信息，是一个高优先级数据报文，此时紧急指针有效。紧急数据一定位于当前数据包数据部分的最前面，紧急指针标明了紧急数据的尾部。
   - ACK=1：该字段为一表示确认号字段有效。此外，TCP 还规定在连接建立后传送的所有报文段都必须把 ACK 置为一。
   - PSH=1：该字段为一表示接收端应该立即将数据 push 给应用层，而不是等到缓冲区满后再提交。
   - RST=1：该字段为一表示当前 TCP 连接出现严重问题，可能需要重新建立 TCP 连接，也可以用于拒绝非法的报文段和拒绝连接请求。
   - SYN=1：当SYN=1，ACK=0时，表示当前报文段是一个连接请求报文。当SYN=1，ACK=1时，表示当前报文段是一个同意建立连接的应答报文。
   - FIN=1：该字段为一表示此报文段是一个释放连接的请求报文。
## 状态机
TCP 的状态机是很复杂的，并且与建立断开连接时的握手息息相关，接下来就来详细描述下两种握手。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293685952-b414f97f-e485-4177-ab84-30dec28f2b88.webp#align=left&display=inline&height=960&margin=%5Bobject%20Object%5D&originHeight=960&originWidth=1273&size=0&status=done&style=none&width=1273)
在这之前需要了解一个重要的性能指标 RTT。该指标表示发送端发送数据到接收到对端数据所需的往返时间。
### 建立连接三次握手
![image.svg](https://cdn.nlark.com/yuque/0/2021/svg/1658583/1615293685922-56a22477-6f06-4aed-aa10-568c5f99e121.svg#align=left&display=inline&height=426&margin=%5Bobject%20Object%5D&name=image.svg&originHeight=426&originWidth=666&size=106&status=done&style=none&width=666)
首先假设主动发起请求的一端称为客户端，被动连接的一端称为服务端。不管是客户端还是服务端，TCP 连接建立完后都能发送和接收数据，所以 TCP 是一个全双工的协议。
起初，两端都为 CLOSED 状态。在通信开始前，双方都会创建 TCB。 服务器创建完 TCB 后便进入 LISTEN 状态，此时开始等待客户端发送数据。
**第一次握手**
客户端向服务端发送连接请求报文段。该报文段中包含自身的数据通讯初始序号。请求发送后，客户端便进入 SYN-SENT 状态。
**第二次握手**
服务端收到连接请求报文段后，如果同意连接，则会发送一个应答，该应答中也会包含自身的数据通讯初始序号，发送完成后便进入 SYN-RECEIVED 状态。
**第三次握手**
当客户端收到连接同意的应答后，还要向服务端发送一个确认报文。客户端发完这个报文段后便进入 ESTABLISHED 状态，服务端收到这个应答后也进入 ESTABLISHED 状态，此时连接建立成功。
PS：第三次握手中可以包含数据，通过快速打开（TFO）技术就可以实现这一功能。其实只要涉及到握手的协议，都可以使用类似 TFO 的方式，客户端和服务端存储相同的 cookie，下次握手时发出 cookie 达到减少 RTT 的目的。
```
常考面试题：为什么 TCP 建立连接需要三次握手，明明两次就可以建立起连接
```
因为这是为了防止出现失效的连接请求报文段被服务端接收的情况，从而产生错误。
可以想象如下场景。客户端发送了一个连接请求 A，但是因为网络原因造成了超时，这时 TCP 会启动超时重传的机制再次发送一个连接请求 B。此时请求顺利到达服务端，服务端应答完就建立了请求，然后接收数据后释放了连接。
假设这时候连接请求 A 在两端关闭后终于抵达了服务端，那么此时服务端会认为客户端又需要建立 TCP 连接，从而应答了该请求并进入 ESTABLISHED 状态。但是客户端其实是 CLOSED 的状态，那么就会导致服务端一直等待，造成资源的浪费。
PS：在建立连接中，任意一端掉线，TCP 都会重发 SYN 包，一般会重试五次，在建立连接中可能会遇到 SYN Flood 攻击。遇到这种情况你可以选择调低重试次数或者干脆在不能处理的情况下拒绝请求。
### 断开链接四次握手
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293685944-98bf061d-b32c-416f-8531-70567ce230d5.webp#align=left&display=inline&height=512&margin=%5Bobject%20Object%5D&originHeight=512&originWidth=640&size=0&status=done&style=none&width=640)
TCP 是全双工的，在断开连接时两端都需要发送 FIN 和 ACK。
**第一次握手**
若客户端 A 认为数据发送完成，则它需要向服务端 B 发送连接释放请求。
**第二次握手**
B 收到连接释放请求后，会告诉应用层要释放 TCP 链接。然后会发送 ACK 包，并进入 CLOSE_WAIT 状态，此时表明 A 到 B 的连接已经释放，不再接收 A 发的数据了。但是因为 TCP 连接是双向的，所以 B 仍旧可以发送数据给 A。
**第三次握手**
B 如果此时还有没发完的数据会继续发送，完毕后会向 A 发送连接释放请求，然后 B 便进入 LAST-ACK 状态。
PS：通过延迟确认的技术（通常有时间限制，否则对方会误认为需要重传），可以将第二次和第三次握手合并，延迟 ACK 包的发送。
**第四次握手**
A 收到释放请求后，向 B 发送确认应答，此时 A 进入 TIME-WAIT 状态。该状态会持续 2MSL（最大段生存期，指报文段在网络中生存的时间，超时会被抛弃） 时间，若该时间段内没有 B 的重发请求的话，就进入 CLOSED 状态。当 B 收到确认应答后，也便进入 CLOSED 状态。
**为什么 A 要进入 TIME-WAIT 状态，等待 2MSL 时间后才进入 CLOSED 状态？**
为了保证 B 能收到 A 的确认应答。若 A 发完确认应答后直接进入 CLOSED 状态，如果确认应答因为网络问题一直没有到达，那么会造成 B 不能正常关闭。
## ARQ 协议
ARQ 协议也就是超时重传机制。通过确认和超时机制保证了数据的正确送达，ARQ 协议包含停止等待 ARQ 和连续 ARQ 两种协议。
### 停止等待 ARQ
**正常传输过程**
只要 A 向 B 发送一段报文，都要停止发送并启动一个定时器，等待对端回应，在定时器时间内接收到对端应答就取消定时器并发送下一段报文。
**报文丢失或出错**
在报文传输的过程中可能会出现丢包。这时候超过定时器设定的时间就会再次发送丢失的数据直到对端响应，所以需要每次都备份发送的数据。
即使报文正常的传输到对端，也可能出现在传输过程中报文出错的问题。这时候对端会抛弃该报文并等待 A 端重传。
PS：一般定时器设定的时间都会大于一个 RTT 的平均时间。
**ACK 超时或丢失**
对端传输的应答也可能出现丢失或超时的情况。那么超过定时器时间 A 端照样会重传报文。这时候 B 端收到相同序号的报文会丢弃该报文并重传应答，直到 A 端发送下一个序号的报文。
在超时的情况下也可能出现应答很迟到达，这时 A 端会判断该序号是否已经接收过，如果接收过只需要丢弃应答即可。
从上面的描述中大家肯定可以发现这肯定不是一个高效的方式。假设在良好的网络环境中，每次发送数据都需要等待片刻肯定是不能接受的。那么既然我们不能接受这个不那么高效的协议，就来继续学习相对高效的协议吧。
### 连续 ARQ
在连续 ARQ 中，发送端拥有一个**发送窗口**，可以在没有收到应答的情况下持续发送窗口内的数据，这样相比停止等待 ARQ 协议来说减少了等待时间，提高了效率。
### 累计确认
连续 ARQ 中，接收端会持续不断收到报文。如果和停止等待 ARQ 中接收一个报文就发送一个应答一样，就太浪费资源了。通过累计确认，可以在收到多个报文以后统一回复一个应答报文。报文中的 ACK 标志位可以用来告诉发送端这个序号之前的数据已经全部接收到了，下次请发送这个序号后的数据。
但是累计确认也有一个弊端。在连续接收报文时，可能会遇到接收到序号 5 的报文后，并未接收到序号 6 的报文，然而序号 7 以后的报文已经接收。遇到这种情况时，ACK 只能回复 6，这样就会造成发送端重复发送数据的情况。
## 滑动窗口
在上面小节中讲到了发送窗口。在 TCP 中，两端其实都维护着窗口：分别为发送端窗口和接收端窗口。
发送端窗口包含已发送但未收到应答的数据和可以发送但是未发送的数据。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293685938-4497f344-ba90-4c08-a671-f5561c2d3a24.webp#align=left&display=inline&height=270&margin=%5Bobject%20Object%5D&originHeight=270&originWidth=660&size=0&status=done&style=none&width=660)
发送端窗口是由接收窗口剩余大小决定的。接收方会把当前接收窗口的剩余大小写入应答报文，发送端收到应答后根据该值和当前网络拥塞情况设置发送窗口的大小，所以发送窗口的大小是不断变化的。
当发送端接收到应答报文后，会随之将窗口进行滑动
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293713761-5f7b1579-61b3-4e27-b527-23ebf0ab6cdf.webp#align=left&display=inline&height=210&margin=%5Bobject%20Object%5D&originHeight=210&originWidth=660&size=0&status=done&style=none&width=660)
滑动窗口是一个很重要的概念，它帮助 TCP 实现了流量控制的功能。接收方通过报文告知发送方还可以发送多少数据，从而保证接收方能够来得及接收数据，防止出现接收方带宽已满，但是发送方还一直发送数据的情况。
### Zero 窗口
在发送报文的过程中，可能会遇到对端出现零窗口的情况。在该情况下，发送端会停止发送数据，并启动 persistent timer 。该定时器会定时发送请求给对端，让对端告知窗口大小。在重试次数超过一定次数后，可能会中断 TCP 链接。
## 拥塞处理
拥塞处理和流量控制不同，后者是作用于接收方，保证接收方来得及接受数据。而前者是作用于网络，防止过多的数据拥塞网络，避免出现网络负载过大的情况。
拥塞处理包括了四个算法，分别为：慢开始，拥塞避免，快速重传，快速恢复。
### 慢开始算法
慢开始算法，顾名思义，就是在传输开始时将发送窗口慢慢指数级扩大，从而避免一开始就传输大量数据导致网络拥塞。想必大家都下载过资源，每当我们开始下载的时候都会发现下载速度是慢慢提升的，而不是一蹴而就直接拉满带宽。
慢开始算法步骤具体如下

1. 连接初始设置拥塞窗口（Congestion Window） 为 1 MSS（一个分段的最大数据量）
1. 每过一个 RTT 就将窗口大小乘二
1. 指数级增长肯定不能没有限制的，所以有一个阈值限制，当窗口大小大于阈值时就会启动拥塞避免算法。
### 拥塞避免算法
拥塞避免算法相比简单点，每过一个 RTT 窗口大小只加一，这样能够避免指数级增长导致网络拥塞，慢慢将大小调整到最佳值。
在传输过程中可能定时器超时的情况，这时候 TCP 会认为网络拥塞了，会马上进行以下步骤：

- 将阈值设为当前拥塞窗口的一半
- 将拥塞窗口设为 1 MSS
- 启动拥塞避免算法
### 快速重传
快速重传一般和快恢复一起出现。一旦接收端收到的报文出现失序的情况，接收端只会回复最后一个顺序正确的报文序号。如果发送端收到三个重复的 ACK，无需等待定时器超时而是直接启动快速重传算法。具体算法分为两种：
**TCP Taho 实现如下**

- 将阈值设为当前拥塞窗口的一半
- 将拥塞窗口设为 1 MSS
- 重新开始慢开始算法

**TCP Reno 实现如下**

- 拥塞窗口减半
- 将阈值设为当前拥塞窗口
- 进入快恢复阶段（重发对端需要的包，一旦收到一个新的 ACK 答复就退出该阶段），这种方式在丢失多个包的情况下就不那么好了
- 使用拥塞避免算法
### TCP New Ren 改进后的快恢复
**TCP New Reno** 算法改进了之前 **TCP Reno** 算法的缺陷。在之前，快恢复中只要收到一个新的 ACK 包，就会退出快恢复。
在 **TCP New Reno** 中，TCP 发送方先记下三个重复 ACK 的分段的最大序号。
假如我有一个分段数据是 1 ~ 10 这十个序号的报文，其中丢失了序号为 3 和 7 的报文，那么该分段的最大序号就是 10。发送端只会收到 ACK 序号为 3 的应答。这时候重发序号为 3 的报文，接收方顺利接收的话就会发送 ACK 序号为 7 的应答。这时候 TCP 知道对端是有多个包未收到，会继续发送序号为 7 的报文，接收方顺利接收并会发送 ACK 序号为 11 的应答，这时发送端认为这个分段接收端已经顺利接收，接下来会退出快恢复阶段。
## 小结
这一章节内容很多，充斥了大量的术语，适合大家反复研读，已经把 TCP 中最核心最需要掌握的内容全盘托出了，如有哪里不明白的欢迎提问。
总结一下这一章节的内容：

- 建立连接需要三次握手，断开连接需要四次握手
- 滑动窗口解决了数据的丢包、顺序不对和流量控制问题
- 拥塞窗口实现了对流量的控制，保证在全天候环境下最优的传递数据
# HTTP 及 TLS
这一章节我们将来学习 HTTP 及 TLS 协议中的内容。
## HTTP 请求中的内容
HTTP 请求由三部分构成，分别为：

- 请求行
- 首部
- 实体

请求行大概长这样 `GET /images/logo.gif HTTP/1.1`，基本由请求方法、URL、协议版本组成，这其中值得一说的就是请求方法了。
请求方法分为很多种，最常用的也就是 `Get` 和 `Post` 了。虽然请求方法有很多，但是更多的是传达一个语义，而不是说 `Post` 能做的事情 `Get` 就不能做了。如果你愿意，都使用 `Get` 请求或者 `Post` 请求都是可以的。更多请求方法的语义描述可以阅读 [文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)。
> 常考面试题：Post 和 Get 的区别？

首先先引入副作用和幂等的概念。
副作用指对服务器上的资源做改变，搜索是无副作用的，注册是副作用的。
幂等指发送 M 和 N 次请求（两者不相同且都大于 1），服务器上资源的状态一致，比如注册 10 个和 11 个帐号是不幂等的，对文章进行更改 10 次和 11 次是幂等的。因为前者是多了一个账号（资源），后者只是更新同一个资源。
在规范的应用场景上说，Get 多用于无副作用，幂等的场景，例如搜索关键字。Post 多用于副作用，不幂等的场景，例如注册。
在技术上说：

- Get 请求能缓存，Post 不能
- Post 相对 Get 安全一点点，因为Get 请求都包含在 URL 里（当然你想写到 `body` 里也是可以的），且会被浏览器保存历史纪录。Post 不会，但是在抓包的情况下都是一样的。
- URL有长度限制，会影响 Get 请求，但是这个长度限制是浏览器规定的，不是 RFC 规定的
- Post 支持更多的编码类型且不对数据类型限制
### 首部
首部分为请求首部和响应首部，并且部分首部两种通用，接下来我们就来学习一部分的常用首部。
**通用首部**
通用字段
作用
Cache-Control
控制缓存的行为
Connection
浏览器想要优先使用的连接类型，比如 `keep-alive`
Date
创建报文时间
Pragma
报文指令
Via
代理服务器相关信息
Transfer-Encoding
传输编码方式
Upgrade
要求客户端升级协议
Warning
在内容中可能存在错误
**请求首部**
请求首部
作用
Accept
能正确接收的媒体类型
Accept-Charset
能正确接收的字符集
Accept-Encoding
能正确接收的编码格式列表
Accept-Language
能正确接收的语言列表
Expect
期待服务端的指定行为
From
请求方邮箱地址
Host
服务器的域名
If-Match
两端资源标记比较
If-Modified-Since
本地资源未修改返回 304（比较时间）
If-None-Match
本地资源未修改返回 304（比较标记）
User-Agent
客户端信息
Max-Forwards
限制可被代理及网关转发的次数
Proxy-Authorization
向代理服务器发送验证信息
Range
请求某个内容的一部分
Referer
表示浏览器所访问的前一个页面
TE
传输编码方式
**响应首部**
响应首部
作用
Accept-Ranges
是否支持某些种类的范围
Age
资源在代理缓存中存在的时间
ETag
资源标识
Location
客户端重定向到某个 URL
Proxy-Authenticate
向代理服务器发送验证信息
Server
服务器名字
WWW-Authenticate
获取资源需要的验证信息
**实体首部**
实体首部
作用
Allow
资源的正确请求方式
Content-Encoding
内容的编码格式
Content-Language
内容使用的语言
Content-Length
request body 长度
Content-Location
返回数据的备用地址
Content-MD5
Base64加密格式的内容 MD5检验值
Content-Range
内容的位置范围
Content-Type
内容的媒体类型
Expires
内容的过期时间
Last_modified
内容的最后修改时间
### 常见状态码
状态码表示了响应的一个状态，可以让我们清晰的了解到这一次请求是成功还是失败，如果失败的话，是什么原因导致的，当然状态码也是用于传达语义的。如果胡乱使用状态码，那么它存在的意义就没有了。
状态码通常也是一道常考题。
**2XX 成功**

- 200 OK，表示从客户端发来的请求在服务器端被正确处理
- 204 No content，表示请求成功，但响应报文不含实体的主体部分
- 205 Reset Content，表示请求成功，但响应报文不含实体的主体部分，但是与 204 响应不同在于要求请求方重置内容
- 206 Partial Content，进行范围请求

**3XX 重定向**

- 301 moved permanently，永久性重定向，表示资源已被分配了新的 URL
- 302 found，临时性重定向，表示资源临时被分配了新的 URL
- 303 see other，表示资源存在着另一个 URL，应使用 GET 方法获取资源
- 304 not modified，表示服务器允许访问资源，但因发生请求未满足条件的情况
- 307 temporary redirect，临时重定向，和302含义类似，但是期望客户端保持请求方法不变向新的地址发出请求

**4XX 客户端错误**

- 400 bad request，请求报文存在语法错误
- 401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息
- 403 forbidden，表示对请求资源的访问被服务器拒绝
- 404 not found，表示在服务器上没有找到请求的资源

**5XX 服务器错误**

- 500 internal sever error，表示服务器端在执行请求时发生了错误
- 501 Not Implemented，表示服务器不支持当前请求所需要的某个功能
- 503 service unavailable，表明服务器暂时处于超负载或正在停机维护，无法处理请求
## TLS
HTTPS 还是通过了 HTTP 来传输信息，但是信息通过 TLS 协议进行了加密。
TLS 协议位于传输层之上，应用层之下。首次进行 TLS 协议传输需要两个 RTT ，接下来可以通过 Session Resumption 减少到一个 RTT。
在 TLS 中使用了两种加密技术，分别为：对称加密和非对称加密。
**对称加密**：
对称加密就是两边拥有相同的秘钥，两边都知道如何将密文加密解密。
这种加密方式固然很好，但是问题就在于如何让双方知道秘钥。因为传输数据都是走的网络，如果将秘钥通过网络的方式传递的话，一旦秘钥被截获就没有加密的意义的。
**非对称加密**：
有公钥私钥之分，公钥所有人都可以知道，可以将数据用公钥加密，但是将数据解密必须使用私钥解密，私钥只有分发公钥的一方才知道。
这种加密方式就可以完美解决对称加密存在的问题。假设现在两端需要使用对称加密，那么在这之前，可以先使用非对称加密交换秘钥。
简单流程如下：首先服务端将公钥公布出去，那么客户端也就知道公钥了。接下来客户端创建一个秘钥，然后通过公钥加密并发送给服务端，服务端接收到密文以后通过私钥解密出正确的秘钥，这时候两端就都知道秘钥是什么了。
**TLS 握手过程如下图：**
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293747088-56dc3723-6829-4005-9fab-dff3735902b6.webp#align=left&display=inline&height=826&margin=%5Bobject%20Object%5D&originHeight=826&originWidth=1280&size=0&status=done&style=none&width=1280)
客户端发送一个随机值以及需要的协议和加密方式。
服务端收到客户端的随机值，自己也产生一个随机值，并根据客户端需求的协议和加密方式来使用对应的方式，并且发送自己的证书（如果需要验证客户端证书需要说明）
客户端收到服务端的证书并验证是否有效，验证通过会再生成一个随机值，通过服务端证书的公钥去加密这个随机值并发送给服务端，如果服务端需要验证客户端证书的话会附带证书
服务端收到加密过的随机值并使用私钥解密获得第三个随机值，这时候两端都拥有了三个随机值，可以通过这三个随机值按照之前约定的加密方式生成密钥，接下来的通信就可以通过该密钥来加密解密
通过以上步骤可知，在 TLS 握手阶段，两端使用非对称加密的方式来通信，但是因为非对称加密损耗的性能比对称加密大，所以在正式传输数据时，两端使用对称加密的方式通信。
PS：以上说明的都是 TLS 1.2 协议的握手情况，在 1.3 协议中，首次建立连接只需要一个 RTT，后面恢复连接不需要 RTT 了。
## 小结
总结一下内容：

- HTTP 经常考到的内容包括：请求方法、首部的作用以及状态码的含义
- TLS 中经常考到的内容包括：两种加密方式以及握手的流程
# HTTP/2 及 HTTP/3
这一章节我们将来学习 HTTP/2 及 HTTP/3 的内容。
HTTP/2 很好的解决了当下最常用的 HTTP/1 所存在的一些性能问题，只需要升级到该协议就可以减少很多之前需要做的性能优化工作，当然兼容问题以及如何优雅降级应该是国内还不普遍使用的原因之一。
虽然 HTTP/2 已经解决了很多问题，但是并不代表它已经是完美的了，HTTP/3 就是为了解决 HTTP/2 所存在的一些问题而被推出来的。
## HTTP/2
HTTP/2 相比于 HTTP/1，可以说是大幅度提高了网页的性能。
在 HTTP/1 中，为了性能考虑，我们会引入雪碧图、将小图内联、使用多个域名等等的方式。这一切都是因为浏览器限制了同一个域名下的请求数量（Chrome 下一般是限制六个连接），当页面中需要请求很多资源的时候，队头阻塞（Head of line blocking）会导致在达到最大请求数量时，剩余的资源需要等待其他资源请求完成后才能发起请求。
在 HTTP/2 中引入了多路复用的技术，这个技术可以只通过一个 TCP 连接就可以传输所有的请求数据。多路复用很好的解决了浏览器限制同一个域名下的请求数量的问题，同时也间接更容易实现全速传输，毕竟新开一个 TCP 连接都需要慢慢提升传输速度。
大家可以通过 [该链接](https://http2.akamai.com/demo) 感受下 HTTP/2 比 HTTP/1 到底快了多少。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293769084-e25df051-3ba8-44a0-8322-4f374a862daa.webp#align=left&display=inline&height=512&margin=%5Bobject%20Object%5D&originHeight=512&originWidth=929&size=0&status=done&style=none&width=929)
在 HTTP/1 中，因为队头阻塞的原因，你会发现发送请求是长这样的
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293769021-d3ebcbed-5e5d-409a-b96d-94aff5f760ae.webp#align=left&display=inline&height=642&margin=%5Bobject%20Object%5D&originHeight=642&originWidth=518&size=0&status=done&style=none&width=518)
在 HTTP/2 中，因为可以复用同一个 TCP 连接，你会发现发送请求是长这样的
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293769147-e54a9a96-4cca-4941-8bf1-017ce94dab00.webp#align=left&display=inline&height=616&margin=%5Bobject%20Object%5D&originHeight=616&originWidth=900&size=0&status=done&style=none&width=900)
## 二进制传输
HTTP/2 中所有加强性能的核心点在于此。在之前的 HTTP 版本中，我们是通过文本的方式传输数据。在 HTTP/2 中引入了新的编码机制，所有传输的数据都会被分割，并采用二进制格式编码。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293769114-67dcabbc-7468-46ca-97a2-9a45b94acbf6.webp#align=left&display=inline&height=459&margin=%5Bobject%20Object%5D&originHeight=459&originWidth=874&size=0&status=done&style=none&width=874)
## 多路复用
在 HTTP/2 中，有两个非常重要的概念，分别是帧（frame）和流（stream）。
帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。
多路复用，就是在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。
![](https://cdn.nlark.com/yuque/0/2021/webp/1658583/1615293769062-ad723be8-0c8c-4df4-8ed3-d78f46b9de14.webp#align=left&display=inline&height=138&margin=%5Bobject%20Object%5D&originHeight=138&originWidth=494&size=0&status=done&style=none&width=494)
## Header 压缩
在 HTTP/1 中，我们使用文本的形式传输 header，在 header 携带 cookie 的情况下，可能每次都需要重复传输几百到几千的字节。
在 HTTP /2 中，使用了 HPACK 压缩格式对传输的 header 进行编码，减少了 header 的大小。并在两端维护了索引表，用于记录出现过的 header ，后面在传输过程中就可以传输已经记录过的 header 的键名，对端收到数据后就可以通过键名找到对应的值。
## 服务端 Push
在 HTTP/2 中，服务端可以在客户端某个请求后，主动推送其他资源。
可以想象以下情况，某些资源客户端是一定会请求的，这时就可以采取服务端 push 的技术，提前给客户端推送必要的资源，这样就可以相对减少一点延迟时间。当然在浏览器兼容的情况下你也可以使用 prefetch 。
## HTTP/3
虽然 HTTP/2 解决了很多之前旧版本的问题，但是它还是存在一个巨大的问题，虽然这个问题并不是它本身造成的，而是底层支撑的 TCP 协议的问题。
因为 HTTP/2 使用了多路复用，一般来说同一域名下只需要使用一个 TCP 连接。当这个连接中出现了丢包的情况，那就会导致 HTTP/2 的表现情况反倒不如 HTTP/1 了。
因为在出现丢包的情况下，整个 TCP 都要开始等待重传，也就导致了后面的所有数据都被阻塞了。但是对于 HTTP/1 来说，可以开启多个 TCP 连接，出现这种情况反到只会影响其中一个连接，剩余的 TCP 连接还可以正常传输数据。
那么可能就会有人考虑到去修改 TCP 协议，其实这已经是一件不可能完成的任务了。因为 TCP 存在的时间实在太长，已经充斥在各种设备中，并且这个协议是由操作系统实现的，更新起来不大现实。
基于这个原因，Google 就更起炉灶搞了一个基于 UDP 协议的 QUIC 协议，并且使用在了 HTTP/3 上，当然 HTTP/3 之前名为 HTTP-over-QUIC，从这个名字中我们也可以发现，HTTP/3 最大的改造就是使用了 QUIC，接下来我们就来学习关于这个协议的内容。
### QUIC
之前我们学习过 UDP 协议的内容，知道这个协议虽然效率很高，但是并不是那么的可靠。QUIC 虽然基于 UDP，但是在原本的基础上新增了很多功能，比如多路复用、0-RTT、使用 TLS1.3 加密、流量控制、有序交付、重传等等功能。这里我们就挑选几个重要的功能学习下这个协议的内容。
**多路复用**
虽然 HTTP/2 支持了多路复用，但是 TCP 协议终究是没有这个功能的。QUIC 原生就实现了这个功能，并且传输的单个数据流可以保证有序交付且不会影响其他的数据流，这样的技术就解决了之前 TCP 存在的问题。
并且 QUIC 在移动端的表现也会比 TCP 好。因为 TCP 是基于 IP 和端口去识别连接的，这种方式在多变的移动端网络环境下是很脆弱的。但是 QUIC 是通过 ID 的方式去识别一个连接，不管你网络环境如何变化，只要 ID 不变，就能迅速重连上。
**0-RTT**
通过使用类似 TCP 快速打开的技术，缓存当前会话的上下文，在下次恢复会话的时候，只需要将之前的缓存传递给服务端验证通过就可以进行传输了。
**纠错机制**
假如说这次我要发送三个包，那么协议会算出这三个包的异或值并单独发出一个校验包，也就是总共发出了四个包。
当出现其中的非校验包丢包的情况时，可以通过另外三个包计算出丢失的数据包的内容。
当然这种技术只能使用在丢失一个包的情况下，如果出现丢失多个包就不能使用纠错机制了，只能使用重传的方式了。
## 小结
总结一下内容：

- HTTP/2 通过多路复用、二进制流、Header 压缩等等技术，极大地提高了性能，但是还是存在着问题的
- QUIC 基于 UDP 实现，是 HTTP/3 中的底层支撑协议，该协议基于 UDP，又取了 TCP 中的精华，实现了即快又可靠的协议
# 输入 URL 到页面渲染的整个流程
之前我们学了那么多章节的内容，是时候找个时间将它们再次复习消化了。就借用这道经典面试题，将之前学习到的浏览器以及网络几章节的知识联系起来。
首先是 DNS 查询，如果这一步做了智能 DNS 解析的话，会提供访问速度最快的 IP 地址回来，这部分的内容之前没有写过，所以就在这里讲解下。
**DNS**
DNS 的作用就是通过域名查询到具体的 IP。
因为 IP 存在数字和英文的组合（IPv6），很不利于人类记忆，所以就出现了域名。你可以把域名看成是某个 IP 的别名，DNS 就是去查询这个别名的真正名称是什么。
在 TCP 握手之前就已经进行了 DNS 查询，这个查询是操作系统自己做的。当你在浏览器中想访问 `www.google.com` 时，会进行一下操作：

1. 操作系统会首先在本地缓存中查询 IP
1. 没有的话会去系统配置的 DNS 服务器中查询
1. 如果这时候还没得话，会直接去 DNS 根服务器查询，这一步查询会找出负责 `com` 这个一级域名的服务器
1. 然后去该服务器查询 `google` 这个二级域名
1. 接下来三级域名的查询其实是我们配置的，你可以给 `www` 这个域名配置一个 IP，然后还可以给别的三级域名配置一个 IP

以上介绍的是 DNS 迭代查询，还有种是递归查询，区别就是前者是由客户端去做请求，后者是由系统配置的 DNS 服务器做请求，得到结果后将数据返回给客户端。
PS：DNS 是基于 UDP 做的查询，大家也可以考虑下为什么之前不考虑使用 TCP 去实现。
接下来是 TCP 握手，应用层会下发数据给传输层，这里 TCP 协议会指明两端的端口号，然后下发给网络层。网络层中的 IP 协议会确定 IP 地址，并且指示了数据传输中如何跳转路由器。然后包会再被封装到数据链路层的数据帧结构中，最后就是物理层面的传输了。
在这一部分中，可以详细说下 TCP 的握手情况以及 TCP 的一些特性。
当 TCP 握手结束后就会进行 TLS 握手，然后就开始正式的传输数据。
在这一部分中，可以详细说下 TLS 的握手情况以及两种加密方式的内容。
数据在进入服务端之前，可能还会先经过负责负载均衡的服务器，它的作用就是将请求合理的分发到多台服务器上，这时假设服务端会响应一个 HTML 文件。
首先浏览器会判断状态码是什么，如果是 200 那就继续解析，如果 400 或 500 的话就会报错，如果 300 的话会进行重定向，这里会有个重定向计数器，避免过多次的重定向，超过次数也会报错。
浏览器开始解析文件，如果是 gzip 格式的话会先解压一下，然后通过文件的编码格式知道该如何去解码文件。
文件解码成功后会正式开始渲染流程，先会根据 HTML 构建 DOM 树，有 CSS 的话会去构建 CSSOM 树。如果遇到 script 标签的话，会判断是否存在 async 或者 defer ，前者会并行进行下载并执行 JS，后者会先下载文件，然后等待 HTML 解析完成后顺序执行。
如果以上都没有，就会阻塞住渲染流程直到 JS 执行完毕。遇到文件下载的会去下载文件，这里如果使用 HTTP/2 协议的话会极大的提高多图的下载效率。
CSSOM 树和 DOM 树构建完成后会开始生成 Render 树，这一步就是确定页面元素的布局、样式等等诸多方面的东西
在生成 Render 树的过程中，浏览器就开始调用 GPU 绘制，合成图层，将内容显示在屏幕上了。
这一部分就是渲染原理中讲解到的内容，可以详细的说明下这一过程。并且在下载文件时，也可以说下通过 HTTP/2 协议可以解决队头阻塞的问题。
总的来说这一章节就是带着大家从 DNS 查询开始到渲染出画面完整的了解一遍过程，将之前学习到的内容连接起来。
当来这一过程远远不止这些内容，但是对于大部分人能答出这些内容已经很不错了，你如果想了解更加详细的过程，可以阅读这篇[文章](https://github.com/alex/what-happens-when)。
