<template>
  <section id="modal" @click.self="closeModal()">
    <div class="container">
      {{ importContent(this.$parent.layout.modal.action) }}
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    closeModal () {
      this.$parent.layout.modal.status = false
      this.$parent.layout.modal.action = ''
    },
    importContent (path) {
      const ModalRequire = require.context('../', true, /\.vue$/)
      return ModalRequire(path)
    }
  }
}
</script>

<style lang="scss" scoped>
  #modal {
    display:flex;
    self-align:center;
    position:fixed;
    width:100%;
    height:100%;
    z-index:99;
    background-color:rgba(0, 0, 0, 0.85);

    .container {
      max-height:100%;
      height:360px;
      align-self:center;
      background-color:#fff;
      border-radius:24px;
      overflow:hidden;
    }
  }
</style>
