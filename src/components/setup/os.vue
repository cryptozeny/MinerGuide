<template>
  <div class="container">
    <h1>이용할 운영체제를 선택해주세요</h1>
    <p>운영체제를 선택하시면 기기도 같이 선택됩니다. 운영체제를 모르신다면 운영체제 아래에 적혀있는 대표기기를 통해 확인해주세요.</p>

    <div class="pc-box-flex pc-flex-row">
      <div class="pc-button" @click="changeOS('windows')">
        <div class="wrap">
          <i class="fab fa-windows"></i>
          <h2>Windows</h2>
          <p>PC, 노트북, Windows 운영체제의 서버</p>
        </div>
      </div>

      <div class="pc-button" @click="changeOS('osx')">
        <div class="wrap">
          <i class="fab fa-apple"></i>
          <h2>Mac OS X</h2>
          <p>iMac, Macbook, Mac Mini, Mac Server, Mac Pro등</p>
        </div>
      </div>

      <div class="pc-button" @click="changeOS('linux')">
        <div class="wrap">
          <i class="fab fa-linux"></i>
          <h2>Linux</h2>
          <p>Fedora, Ubuntu, CentOS, Archlinux, CoreOS등의 Linux전용 운영체제를 사용하는 PC/서버</p>
        </div>
      </div>
    </div>

    <div class="pc-box-flex pc-flex-row">
      <div class="pc-button" disabled="disabled">
        <div class="wrap">
          <h2>Raspberry Pi</h2>
          <p>Raspberry Pi 2, Raspberry Pi 2 Model B, Raspberry Pi 3, Raspberry Pi 3 Model B</p>
        </div>
      </div>

      <div class="pc-button" @click="changeOS('android')">
        <div class="wrap">
          <i class="fab fa-android"></i>
          <h2>Android</h2>
          <p>Galaxy, Pixel, LG, HTC, Sony, Xioami, Huwawei, Others.</p>
        </div>
      </div>

      <div class="pc-button" disabled="disabled">
        <div class="wrap">
          <i class="fab fa-apple"></i>
          <h2>iOS</h2>
          <p>iPhone, iPad, iPod Touch</p>
        </div>
      </div>
    </div>

    <p class="exclude-reason">해당 목록에 없는 운영체제는 아직 마이너가 개발되지 않았거나, 마이너를 구축하기에 번거롭거나, 마이닝 효율이 떨어지기때문에 목록에 포함되지 않았습니다.</p>
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
  .pc-box-flex + .pc-box-flex {
    margin-top:1rem;
  }

  .pc-button {
    height:180px;

    .fab, .fas {
      font-size:24pt;
    }

    h2 {
      margin:0;
    }

    &[disabled="disabled"]::after {
      content:"해당 운영체제에 대한 가이드는 준비중입니다";
      padding:80px 40px 0;
    }
  }
</style>
