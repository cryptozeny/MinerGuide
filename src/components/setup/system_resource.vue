<template>
  <div class="container">
    <h1>자원 사용량 설정</h1>
    <p>해당 과정은 CPU(중앙 처리 장치)를 얼마나 사용할것인지 결정하기 위함입니다.</p>

    <div class="pc-box-flex pc-flex-row">
      <div class="selects">
        <h2>정보 입력</h2>
        <form>
          <label>
            전체 스레드 개수
            <input type="number"
                   v-model="availableCPUThread"
                   min="1"
                   max="64"
                   step="1" />
          </label>
        </form>
      </div>
      <div class="thread_display">
        <h2>스레드 활용 확인</h2>
        <table class="thread_counter">
          <tbody>
            <tr v-for="row in targetBoardSize" :key="row">
              <td v-for="column in targetBoardSize"
                  :key="column">
                <label>
                  {{ (row-1)*targetBoardSize+column-1 }}
                  <input type="checkbox"
                         v-model="usingThread[(row-1)*targetBoardSize+column-1]"
                         :disabled="usingThread[(row-1)*targetBoardSize+column-1] === undefined"/>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
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
        this.usingThread.push(0)
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
    }
  },
  watch: {
    'availableCPUThread': function (val) {
      if (val > 64) {
        this.availableCPUThread = 64
      } else if (val < 1) {
        this.availableCPUThread = 1
      }

      this.getBoardSize(val)
      this.makeThreadList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .pc-box-flex > div {
    width:100%;
  }

  .thread_counter {
    width:100%;
    border-collapse:collapse;
    border:0;

    td {
      height:100%;
      position:relative;
    }
    td:after {
      content: '';
      display: block;
      margin-top: 100%;
    }
    td > label {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display:block;
      width:100%;
      height:100%;
    }
  }
</style>
