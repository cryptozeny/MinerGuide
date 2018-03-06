<template>
  <div class="container">
    <h1>환영합니다!</h1>
    <p>
      MinerGuide는 BitZeny를 채굴할 수 있는 CPUMiner 프로그램의 설정을 도와드리기 위한 웹페이지입니다.<br />
      해당 웹페이지에 나온 과정대로 설정하시면 손쉽게 설정이 가능합니다.
    </p>

    <h2>어떤 기계로 마이닝 하실건가요?</h2>
    <div class="selectButtons">
      <div class="pc-button pc-button_large"
           @click.prevent="$parent.$parent"
           :disabled="usingOS === false">
        <div class="wrap">
          <i v-if="usingOS !== false"
             class="fab"
             :class="'fa-' + usingOS"></i>
          <h3>현재 홈페이지에 접속한 기기</h3>
          <span class="description">자동으로 설정이 맞춰집니다.</span>
        </div>
      </div>
      <div class="pc-button" @click.prevent="$parent.$parent">
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
      this.usingOS = 'apple'
    } else if (currentOS.indexOf('Linux')) {
      this.usingOS = 'linux'
    }

    this.usingOS = false
  }
}
</script>

<style lang="scss" scoped>
  .selectButtons {
    width:100%;
    display:flex;
    flex-direction:row;

    & > div {
      position:relative;
      display:flex;
      flex:1;
      flex-direction:row;
      width:100%;
      margin:0 12px;
      height:360px;
      vertical-align:middle;
      border:1px solid $oc-blue-3;
      cursor:pointer;
      border-radius:16px;
      overflow:hidden;
      box-shadow:0 4px 4px $oc-gray-2;

      transition:all 0.132s ease-in-out;

      & > div.wrap {
        align-self:center;
        text-align:center;
        width:100%;
      }

      &[disabled="disabled"] {
        border-color:$oc-gray-4;
        opacity:0.7;
        cursor:default;

        &::after {
          position:absolute;
          width:100%;
          height:100%;
          text-align:center;
          background-color:rgba(255, 255, 255, 0.75);
          left:0;
          top:0;
          line-height:360px;
          font-weight:bold;
          font-size:14pt;
          content:"해당 기기에서는 마이닝이 불가능합니다";
        }
      }
    }

    & > div:hover {
      border-color:$oc-blue-5;
      width:110%;
      box-shadow:0 4px 4px $oc-gray-3;
    }

    span.description {
      display:block;
    }
  }
</style>
