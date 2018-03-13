<template>
  <div class="container">
    <h1>마이너 설치 및 실행하기</h1>
    <p>마이너를 설치하기 전의 준비과정이 모두 끝났습니다. 아래의 설치 및 실행과정을 통하여 마이너를 쉽게 설치 및 실행할 수 있습니다.</p>

    <div class="markdown-content"
         v-html="importMarkdown('download')">
    </div>

    <div class="hero">
      <h2>설정파일 다운로드</h2>
      <p>꼭 해당 설정파일을 마이너 프로그램이 들어있는 폴더와 같은곳에 넣어주세요</p>
      <a class="pc-button"
         :href="'data:text/json;charset=utf-8,' + returnConfigJSON()"
         download="config.json">설정 파일 다운로드</a>
    </div>

    <div class="markdown-content"
         v-html="importMarkdown('install')">
    </div>

    <div class="hero">
      <p>해당 실행 스크립트를 마이너가 위치할 폴더와 같은곳에 넣어주세요</p>
      <a class="pc-button"
         :href="'data:application/octet-stream;charset=utf-8,' + makeRunScript(true)"
         :download="makeRunScriptFilename()">실행스크립트 파일 다운로드</a>
      <p>실행 스크립트는 운영체제에 직접적인 영향을 줄 수 있습니다. 꼭 내용이 아래와 일치하는지 확인 후 다운로드를 진행하세요</p>
      <code>{{ makeRunScript(false) }}</code>
    </div>

    <div class="markdown-content"
         v-html="importMarkdown('run')">
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    returnConfigJSON () {
      return escape(JSON.stringify({
        'url': this.$parent.result.pool.url,
        'user': this.$parent.result.pool.worker,
        'pass': this.$parent.result.pool.password,
        'algo': 'yescrypt',
        'cpu-affinity': this.$parent.result.CPUAffinity
      }))
    },
    makeRunScript (isEscape) {
      let ShellScript = './minerd260 --config=config.json'

      if (this.$parent.result.OS === 'windows') {
        ShellScript = ShellScript.substring(2)
      }

      if (isEscape === true) {
        return escape(ShellScript)
      } else {
        return ShellScript
      }
    },
    importMarkdown (filePath) {
      const MarkdownRequire = require.context('../../markdown', true, /\.md$/)
      return MarkdownRequire(`./${this.$parent.Lang}/guide/${this.$parent.result.OS}/${filePath}.md`)
    },
    makeRunScriptFilename () {
      if (this.$parent.result.OS === 'windows') {
        return 'run-miner.bat'
      } else {
        return 'run-miner.sh'
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.markdown-content img {
  display:flex;
  align-self:center;
  max-width:100%;
  margin:0 auto;
  height:auto;
}

.markdown-content code,
.hero code {
  display:inline-block;
  background-color:$oc-gray-6;
  color:#fff;
  font-size:14px;
  font-weight:bold;
  font-family:'San-serif';
  padding:6px 12px;
  vertical-align:middle;
  border-radius:4px;
}
</style>
