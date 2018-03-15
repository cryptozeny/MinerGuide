<template>
  <div class="container">
    <h1>{{ $t('setup_resource_header_title') }}</h1>
    <p v-html="$t('setup_resource_header_description')"></p>

    <div class="pc-box-flex pc-flex-row">
      <div class="selects">
        <h2>{{ $t('setup_resource_insert_thread') }}</h2>
        <form class="pc-box-flex pc-flex-row">
          <span class="label">{{ $t('setup_resource_thread_count') }}</span>
          <div class="wrap">
            <button @click.prevent="adjustThreadValue('decrease')">-</button>
            <input type="number"
                   v-model="availableCPUThread"
                   min="1"
                   max="64"
                   step="1" />
            <button @click.prevent="adjustThreadValue('increase')">&plus;</button>
          </div>
        </form>
        <div class="pc-box-flex pc-flex-column">
          <a href="#"
             class="pc-button"
             @click.prevent="proccessThreadList('allOn')">{{ $t('setup_resource_preset_1') }}</a>
          <a href="#"
             class="pc-button"
             @click.prevent="proccessThreadList('Off01')">{{ $t('setup_resource_preset_2') }}</a>
          <a href="#"
             class="pc-button"
             @click.prevent="proccessThreadList('half')">{{ $t('setup_resource_preset_3') }}</a>
          <a href="#"
             class="pc-button"
             @click.prevent="proccessThreadList('half-reverse')">{{ $t('setup_resource_preset_4') }}</a>
          <a href="#"
             class="pc-button"
             @click.prevent="proccessThreadList('allOff')">{{ $t('setup_resource_preset_5') }}</a>
        </div>
      </div>

      <div class="thread_display">
        <h2>{{ $t('setup_resource_thread_using') }}</h2>
        <table class="thread_counter" :class="'table_size-' + targetBoardSize">
          <tbody>
            <tr v-for="row in targetBoardSize" :key="row">
              <td v-for="column in targetBoardSize"
                  :key="column">
                <label>
                  <input type="checkbox"
                         v-model="usingThread[(row-1)*targetBoardSize+column-1]"
                         :disabled="usingThread[(row-1)*targetBoardSize+column-1] === undefined"/>
                  <span class="number">{{ (row-1)*targetBoardSize+column-1 }}</span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <a href="#"
       class="pc-button pc-button-reverse"
       @click.prevent="moveNextStep">{{ $t('setup_resource_nextstep') }}</a>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data () {
    return {
      availableCPUThread: this.$parent.$parent.setup.availableCPUThread,
      usingThread: [],
      targetBoardSize: 2
    }
  },
  mounted () {
    this.getBoardSize(this.availableCPUThread)
    this.makeThreadList()
  },
  methods: {
    makeThreadList () {
      this.usingThread = []
      for (let i = 0; i < this.availableCPUThread; i++) {
        this.usingThread.push(false)
      }
    },
    getBoardSize (val) {
      if (val > 4 && val < 65) {
        this.targetBoardSize = Math.floor(Math.sqrt(val)) + Number(Math.sqrt(val) % 1 !== 0)
      } else if (val <= 4) {
        this.targetBoardSize = 2
      } else {
        this.targetBoardSize = 8
      }
    },
    adjustThreadValue (type) {
      console.log(typeof this.availableCPUThread)

      switch (type) {
        case 'increase':
          this.availableCPUThread = parseInt(this.availableCPUThread) + 1 + ''
          break

        case 'decrease':
          this.availableCPUThread = parseInt(this.availableCPUThread) - 1 + ''
          break
      }
    },
    proccessThreadList (type) {
      switch (type) {
        case 'allOn':
          for (let i = 0; i < this.usingThread.length; i++) {
            Vue.set(this.usingThread, i, true)
          }
          break

        case 'allOff':
          for (let i = 0; i < this.usingThread.length; i++) {
            Vue.set(this.usingThread, i, false)
          }
          break

        case 'Off01':
          for (let i = 0; i < this.usingThread.length; i++) {
            if (i === 0 || i === 1) {
              Vue.set(this.usingThread, i, false)
            } else {
              Vue.set(this.usingThread, i, true)
            }
          }
          break

        case 'half':
          for (let i = 0; i < this.usingThread.length; i++) {
            if (i < this.usingThread.length / 2) {
              Vue.set(this.usingThread, i, true)
            } else {
              Vue.set(this.usingThread, i, false)
            }
          }
          break

        case 'half-reverse':
          for (let i = 0; i < this.usingThread.length; i++) {
            if (i < this.usingThread.length / 2) {
              Vue.set(this.usingThread, i, false)
            } else {
              Vue.set(this.usingThread, i, true)
            }
          }
          break

        case 'bool2int':
          for (let i = 0; i < this.usingThread.length; i++) {
            if (this.usingThread[i] === true) {
              Vue.set(this.usingThread, i, 1)
            } else {
              Vue.set(this.usingThread, i, 0)
            }
          }
          break
      }
    },
    moveNextStep () {
      if (this.usingThread.indexOf(true) < 0) {
        alert(this.$t('setup_resource_nothread_alert'))
        return false
      } else {
        this.proccessThreadList('bool2int')
        this.$parent.$parent.result.CPUAffinity = '0x' + parseInt(this.usingThread.join(''), 2).toString(16).toUpperCase()
        this.$parent.$parent.setup.currentStep = 3
      }
    }
  },
  watch: {
    'availableCPUThread': function (val) {
      if (typeof val === 'string') {
        if (val.substring(0, 1) === '0') {
          this.availableCPUThread = val.substring(1)
        }

        if (val > 64) {
          this.availableCPUThread = 64
        } else if (val < 1) {
          this.availableCPUThread = 1
        }
        this.getBoardSize(val)
        this.makeThreadList()
      } else {
        this.availableCPUThread = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .pc-box-flex > div {
    width:100%;
    padding:12px;
  }

  .selects > form {
    margin:0;
    padding:0;
    display:flex;
    border:1px solid $oc-blue-5;
    border-radius:16px;
    overflow:hidden;

    span.label {
      display:inline-block;
      background-color:$oc-blue-5;
      color:#fff;
      width:100%;
      text-align:right;
      padding:12px;
    }

    .wrap {
      width:230px;
      padding:0;
      font-size:0;

      button {
        margin:0;
        padding:0;
        width:24px;
        height:100%;
        border:0;
        font-size:16px;
        vertical-align:middle;
        background-color:transparent;
        font-weight:bold;
        color:$oc-blue-7;
      }

      input[type="number"] {
        -moz-appearance:textfield;
        margin:0;
        padding:0;
        border:0;
        height:100%;
        font-size:16px;
        text-align:center;
        width:96px;
        margin:0;
        vertical-align:middle;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance:none;
          appearance:none;
          margin:0;
        }
      }
    }
  }

  .thread_counter {
    width:100%;
    border-collapse:collapse;
    border:0;
    position:relative;

    td {
      height:100%;
      position:relative;

      &::after {
        content:'';
        display:block;
        margin-top:100%;
      }

      & > label {
        position:absolute;
        top:0;
        left:0;
        display:flex;
        align-items:center;
        text-align:center;
        width:100%;
        height:100%;
        cursor:pointer;

        & > input[type="checkbox"] {
          position:absolute;
          z-index:-1;
          width:calc(100% - 18px);
          height:calc(100% - 18px);
          top:9px;
          left:9px;
          -webkit-appearance:none;
          -moz-appearance:none;
          box-sizing:border-box;
          background-color:transparent;
          border:1px solid $oc-gray-4;
          border-radius:10px;
          box-shadow:0 3px 0px $oc-gray-2;
          transition:all 0.132s ease-in-out;

          &:checked {
            border-color:transparent;
            background-color:$oc-blue-5;
            top:9px;
            box-shadow: 0 6px 0 $oc-blue-1;

            & ~ span.number {
              color:#fff;
              margin-top:-3px;
            }
          }

          &[disabled] {
            opacity:0.3;

            & ~ span.number {
              color:$oc-gray-3;
            }
          }
        }

        & > span.number {
          width:100%;
          transition:all 0.132s ease-in-out;
        }
      }
    }

    &::after {
      content:"";
      position:absolute;
      z-index:-1;
      width:100%;
      height:100%;
      top:0;
      left:0;
      border:1px solid $oc-blue-1;
      border-radius:16px;
    }

    &.table_size-7,
    &.table_size-8 {
      td > label > input[type="checkbox"] {
        width:calc(100% - 10px);
        height:calc(100% - 10px);
        top:5px;
        left:5px;
      }
    }
  }
</style>
