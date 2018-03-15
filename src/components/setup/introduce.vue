<template>
  <div class="container">
    <h1>{{ $t('setup_introduce_welcome_title') }}</h1>
    <p v-html="$t('setup_introduce_welcome_content')"></p>

    <h2>{{ $t('setup_introduce_request_device') }}</h2>
    <div class="pc-box-flex pc-flex-row">
      <div class="pc-box-flex pc-flex-row pc-button pc-button-large"
           @click.prevent="AcceptCurrentEnv"
           :disabled="usingOS === false"
           :data-disabled-reason="$t('해당 운영체제/기기에 대한 가이드는 준비중이거나 마이닝이 불가능합니다')">
        <div class="wrap">
          <i v-if="usingOS !== false"
             class="fab"
             :class="'fa-' + usingOS"></i>
          <h3>{{ $t('setup_introduce_autoselect_title') }}</h3>
          <span class="description">{{ $t('setup_introduce_autoselect_description') }}</span>
        </div>
      </div>
      <div class="pc-box-flex pc-flex-row pc-button pc-button-large"
           @click.prevent="$parent.$parent.setup.currentStep = 1">
        <div class="wrap">
          <i class="fas fa-desktop"></i>
          <h3>{{ $t('setup_introduce_manual_title') }}</h3>
          <span class="description">{{ $t('setup_introduce_manual_description') }}</span>
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
    if (['Win32', 'Win64'].indexOf(currentOS) >= 0) {
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

      this.$parent.$parent.result.OS = this.usingOS
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
      content:attr(data-disabled-reason);
      color:$oc-gray-9;
      line-height:360px;
    }
  }
</style>
