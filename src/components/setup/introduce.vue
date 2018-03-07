<template>
  <div class="container">
    <h1>환영합니다!</h1>
    <p>
      MinerGuide는 BitZeny를 채굴할 수 있는 CPUMiner 프로그램의 설정을 도와드리기 위한 웹페이지입니다.<br />
      해당 웹페이지에 나온 과정대로 설정하시면 손쉽게 설정이 가능합니다.
    </p>

    <h2>어떤 기계로 마이닝 하실건가요?</h2>
    <div class="pc-box-flex pc-flex-row">
      <div class="pc-button pc-button-large"
           @click.prevent="AcceptCurrentEnv"
           :disabled="usingOS === false">
        <div class="wrap">
          <i v-if="usingOS !== false"
             class="fab"
             :class="'fa-' + usingOS"></i>
          <h3>현재 홈페이지에 접속한 기기</h3>
          <span class="description">자동으로 설정이 맞춰집니다.</span>
        </div>
      </div>
      <div class="pc-button pc-button-large" @click.prevent="$parent.$parent.setup.currentStep = 1">
        <div class="wrap">
          <i class="fas fa-desktop"></i>
          <h3>다른 임의의 기기</h3>
          <span class="description">윈도우, 리눅스, OSX, 안드로이드, Raspberry Pi 등</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usingOS: false
    }
  },
  mounted () {
    const currentOS = navigator.platform

    // Microsoft Windows
    if (['Win32', 'Win64'].indexOf(currentOS)) {
      this.usingOS = 'windows'
    // Apple Mac OSX
    } else if (currentOS === 'MacIntel') {
      this.usingOS = 'osx'
    } else if (currentOS.indexOf('Linux')) {
      this.usingOS = 'linux'
    }

    this.$parent.$parent.result.OS = undefined
    this.$parent.$parent.setup.availableCPUThread = 1
  },
  methods: {
    AcceptCurrentEnv (event) {
      if (event.target.getAttribute('disabled') === 'disabled') {
        return false
      }

      this.$parent.$parent.result.OS = navigator.platform
      this.$parent.$parent.setup.availableCPUThread = navigator.hardwareConcurrency
      this.$parent.$parent.setup.currentStep = 2
    }
  }
}
</script>

<style lang="scss" scoped>
  .pc-button {
    .fab, .fas {
      font-size:48px;
      margin:0 0 1rem;
    }

    h3 {
      font-size:2rem;
      margin:0;
      color:$oc-gray-8;
    }

    span.description {
      display:block;
      margin:0.25rem 0 0;
      font-size:1.25rem;
      color:$oc-gray-6;
    }

    &[disabled="disabled"]::after {
      content:"해당 기기에서는 마이닝이 불가능합니다";
    }
  }
</style>
