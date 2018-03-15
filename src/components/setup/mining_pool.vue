<template>
  <div class="container">
    <h1>{{ $t('setup_mining_header_title') }}</h1>
    <p v-html="$t('setup_mining_header_description_1')"></p>
    <p v-html="$t('setup_mining_header_description_2')"></p>
    <p v-html="$t('setup_mining_header_description_3')"></p>

    <form @submit.prevent="moveNextStep">
      <table>
        <tbody>
          <tr>
            <td class="pc-table-label">{{ $t('setup_mining_form_url') }}</td>
            <td>
              <input type="text"
                     name="miningPoolUrl"
                     v-model="stratumUrl"
                     required/>
              <span class="description">{{ $t('setup_mining_form_url_description') }}</span>
            </td>
          </tr>
          <tr>
            <td class="pc-table-label">마이닝 풀 워커 아이디<span class="option">혹은 BitZeny 지갑 주소</span></td>
            <td>
              <input type="text"
                     name="miningPoolWorkerID"
                     v-model="workerId"
                     required />
              <span class="description">마이닝 풀 워커 아이디는 풀의 이용방법에 따라 다릅니다.<br />가이드가 적혀있지 않은경우 풀 관리자에게 문의해주세요.</span>
            </td>
          </tr>
          <tr>
            <td class="pc-table-label">마이닝 풀 워커 비밀번호<span class="option">(옵션)</span></td>
            <td>
              <input type="text"
                     name="miningPoolWorkerPW"
                     v-model="workerPw" />
              <span class="description">마이닝 풀 워커 비밀번호는 워커를 추가로 생성/관리할 수 있는 마이닝 풀에서만 적용됩니다.</span>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="pc-button pc-button-reverse" type="submit">설정 완료하기</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'stratumUrl': '',
      'workerId': '',
      'workerPw': ''
    }
  },
  methods: {
    moveNextStep () {
      if (this.stratumUrl !== '' && this.workerId !== '') {
        this.$parent.$parent.result.pool.url = this.stratumUrl
        this.$parent.$parent.result.pool.worker = this.workerId
        this.$parent.$parent.result.pool.password = this.workerPw

        this.$parent.$parent.currentAction = 'guide'
      } else {
        alert('모든 항목을 채우신 뒤에 다시 시도해주세요')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .container > p {
    color:$oc-gray-9;
  }

  table {
    width:100%;
    border-spacing:0;
    border-collapse:seperate;
    margin:0;
    overflow:hidden;
    padding:0;
    border:1px solid $oc-blue-4;
    border-radius:16px;

    .pc-table-label {
      width:180px;
      text-align:right;
      font-size:16px;
      color:$oc-gray-9;
      font-weight:'200';
      border-right:1px solid $oc-gray-3;
      background:rgba(208, 235, 255, 0.35);

      & > .option {
        display:block;
        font-size:12px;
        color:$oc-gray-6;
      }
    }

    td {
      padding:12px 16px;
      border-bottom:1px solid $oc-gray-3;

      & > input[type="text"] {
        padding:6px 12px;
        border:1px solid $oc-gray-6;
        border-radius:3px;
      }
    }

    td > span.description {
      display:block;
      font-size:12px;
      margin:0.5em 0 0;
    }
  }
</style>
