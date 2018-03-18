<template>
  <section id="guide">
    <WindowsGuide v-if="$parent.result.OS === 'windows'" />
  </section>
</template>

<script>
import WindowsGuide from './windows.vue'

export default {
  data() {
    return {
      result: {
        'url': this.$parent.result.pool.url,
        'user': this.$parent.result.pool.worker,
        'pass': this.$parent.result.pool.password,
        'algo': 'yescrypt',
        'cpu-affinity': this.$parent.result.CPUAffinity
      }
    }
  },
  components: {
    WindowsGuide
  },
  methods: {
    returnConfigJSON () {
      return escape(JSON.stringify(this.result))
    },
    returnCommandConfig () {
      return `-a ${this.result.algo} -o ${this.result.url} -u ${this.result.user} -p ${this.result.pass} --cpu-affinity ${this.result['cpu-affinity']}`
    },
    makeRunScript (isEscape) {
      let ShellScript = './minerd260 ' + this.returnCommandConfig() 

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
