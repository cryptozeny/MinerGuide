<template>
  <div id="app">
    <Header />
    <Setup v-show="currentAction === 'setup'" />
    <Guides v-show="currentAction === 'guide'" />
    <Footer />
  </div>
</template>

<script>
import Header from './components/layout/header'
import Setup from './components/setup/default'
import Guides from './components/guide/default'
import Footer from './components/layout/footer'

import 'normalize.css'
import './assets/style.scss'

export default {
  name: 'MinerGuide',
  components: {
    Header,
    Setup,
    Guides,
    Footer
  },
  data () {
    return {
      currentAction: 'setup',
      setup: {
        currentStep: 0,
        availableCpuThread: 0
      },
      result: {
        OS: undefined,
        CPUAffinity: 0,
        pool: {
          url: undefined,
          worker: undefined,
          password: undefined
        }
      }
    }
  }
}
</script>
