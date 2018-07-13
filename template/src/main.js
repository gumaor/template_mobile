{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}

Vue.config.productionTip = false

// 按需引入mint-ui组件库
import {MessageBox, Toast, Indicator, Button} from 'mint-ui'
Vue.prototype.$messagebox = MessageBox
Vue.prototype.$toast = Toast
Vue.prototype.$indicator = Indicator
Vue.component(Button.name, Button);

// 引入时间处理库
global.dayjs = require('dayjs');

// 引入工具库
import './common/ajax';
import './common/common';
import './common/store';

// 引入公共样式
import './assets/css/style.css';

/* eslint-disable no-new */
common.init(() => {
  global.vue = new Vue({
    el: '#app',
    {{#router}}
    router,
    {{/router}}
    {{#if_eq build "runtime"}}
    render: h => h(App)
    {{/if_eq}}
    {{#if_eq build "standalone"}}
    components: { App },
    template: '<App/>'
    {{/if_eq}}
  })
});
