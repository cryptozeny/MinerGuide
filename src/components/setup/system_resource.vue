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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      availableCPUThread: this.$parent.$parent.setup.availableCPUThread,
      usingThread: []
    }
  },
  methods: {
    makeThreadList () {
      
    }
  },
  watch: {
    'availableCPUThread': (val, oldVal) => {

    }
  }
}
</script>
