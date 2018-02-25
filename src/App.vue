<template>
  <div id="app">
    <img src="./assets/logo.png">
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
