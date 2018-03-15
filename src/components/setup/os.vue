<template>
  <div class="container">
    <h1>{{ $t('setup_os_header_title') }}</h1>
    <p>{{ $t('setup_os_header_description') }}</p>

    <div class="pc-box-flex pc-flex-row">
      <div class="pc-button pc-box-flex pc-flex-row" @click="changeOS('windows')">
        <div class="wrap">
          <i class="fab fa-windows"></i>
          <h2>Windows</h2>
          <p>{{ $t('setup_os_windows') }}</p>
        </div>
      </div>

      <div class="pc-button pc-box-flex pc-flex-row" @click="changeOS('osx')">
        <div class="wrap">
          <i class="fab fa-apple"></i>
          <h2>Mac OS X</h2>
          <p>{{ $t('setup_os_osx') }}</p>
        </div>
      </div>

      <div class="pc-button pc-box-flex pc-flex-row" @click="changeOS('linux')">
        <div class="wrap">
          <i class="fab fa-linux"></i>
          <h2>Linux</h2>
          <p>{{ $t('setup_os_linux') }}</p>
        </div>
      </div>
    </div>

    <div class="pc-box-flex pc-flex-row">
      <div class="pc-button pc-box-flex pc-flex-row"
           disabled="disabled"
           :data-disabled-reason="$t('setup_os_prepare')">
        <div class="wrap">
          <h2>Raspberry Pi</h2>
          <p>Raspberry Pi 2, Raspberry Pi 2 Model B, Raspberry Pi 3, Raspberry Pi 3 Model B</p>
        </div>
      </div>

      <div class="pc-button pc-box-flex pc-flex-row"
           disabled="disabled"
           :data-disabled-reason="$t('setup_os_prepare')">
        <div class="wrap">
          <i class="fab fa-android"></i>
          <h2>Android</h2>
          <p>Galaxy, Pixel, LG, HTC, Sony, Sharp, Xioami, Huwawei, Others.</p>
        </div>
      </div>

      <div class="pc-button pc-box-flex pc-flex-row"
           disabled="disabled"
           :data-disabled-reason="$t('setup_os_prepare')">
        <div class="wrap">
          <i class="fab fa-apple"></i>
          <h2>iOS</h2>
          <p>iPhone, iPad, iPod Touch</p>
        </div>
      </div>
    </div>

    <p class="exclude-reason">{{ $t('setup_os_exclude') }}</p>
  </div>
</template>

<script>
export default {
  methods: {
    changeOS (value) {
      this.$parent.$parent.result.OS = value
      this.$parent.$parent.setup.currentStep = 2
    }
  }
}
</script>

<style lang="scss" scoped>
  .container > .pc-box-flex + .pc-box-flex {
    margin-top:1rem;
  }

  .pc-button {
    height:180px;
    color:$oc-gray-9;

    .fab, .fas {
      font-size:24pt;
    }

    h2 {
      margin:0;
    }

    &[disabled="disabled"]::after {
      content:attr(data-disabled-reason);
      padding:80px 40px 0;
    }
  }
</style>
