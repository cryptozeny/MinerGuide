<template>
  <div id="app">
    <Header />
    <Setup />
    <Guides />
    <Footer />
  </div>
</template>

<script>
import Header from './components/header'
import Setup from './components/setup'
import Guides from './components/guide/default'
import Footer from './components/footer'

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

<style lang="scss">
</style>
