<template>
  <div class="container">
    <h1>자원 사용량 설정</h1>
    <p>해당 과정은 마이닝에 있어 CPU(중앙 처리 장치)를 얼마나 사용할것인지 결정하는 과정입니다.<br />CPU 스레드 사용량이 줄어들면 마이닝 효율이 떨어지며, CPU 스레드 사용량이 올라가면 마이닝 효율이 올라가는 대신 마이닝 외의 컴퓨터 작업의 진행이 힘들어질 수 있습니다.</p>

    <div class="pc-box-flex pc-flex-row">
      <div class="selects">
        <h2>정보 입력</h2>
        <form>
          <label>
            CPU 전체 코어(스레드) 개수
            <input type="number"
                   v-model="availableCPUThread"
                   min="1"
                   max="64"
                   step="1" />
          </label>
        </form>
      </div>

      <div class="thread_display">
        <h2>스레드 활용 설정</h2>
        {{ usingThread }}
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

    <a href="#" class="pc-button">다음 과정으로 진행하기</a>
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
    proccessThreadList (type) {
      switch (type) {
        case 'all':
          break

        case 'Off01':
          break

        case 'half':
          break

        case 'half-reverse':
          break
      }
    },
    moveNextStep () {

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

  .pc-button {
    display:inline-block;
    margin:16px 0 0;
    text-align:center;
    color:#fff;
    font-weight:600;
    text-decoration:none;
    font-size:18px;

    background-color:$oc-blue-4;
  }
</style>
