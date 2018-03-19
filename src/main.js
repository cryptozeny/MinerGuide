// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'

import StringsKo from './lang/ko.js'

Vue.config.productionTip = false

Vue.use(VueI18n)

let locale = 'ko'

switch (navigator.language) {
  case 'ko-KR':
    locale = 'ko'
    break

  case 'ja-JP':
    locale = 'jp'
    break

  case 'en-US':
  default:
    locale = 'en'
    break
}

const i18n = new VueI18n({
  locale: locale, // set locale
  messages: {
    'ko': StringsKo
  }
})

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  components: { App },
  template: '<App/>'
})
