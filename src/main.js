// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
import 'babel-polyfill'// babel的补丁，用于转化部分es6的语法，比如Promise
import fastclick from 'fastclick'// 解决手机端点击0.3秒延迟的问题
import VueLazyload from 'vue-lazyload'// 引入图片懒加载插件

fastclick.attach(document.body)// 绑定到document.body下，这样所有的body下的点击时间都没有0.3秒的延迟了
Vue.use(VueLazyload, {
	preLoad: 1.9,
	loading: require('common/image/logo@2x.png'),
	error: require('common/image/loadError.svg')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
