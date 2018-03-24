<template>
  <section id="modal" @click.self="closeModal()">
    <div class="container">
      <a href="#" class="modal-close">&times;</a>
      <ModalHelp v-if="modalAction === 'help'" />
      <ModalAbout v-if="modalAction === 'about'" />
    </div>
  </section>
</template>

<script>
import ModalHelp from '../modal/help'
import ModalAbout from '../modal/about'

export default {
  data () {
    return {
      modalAction: this.$parent.layout.modal.action
    }
  },
  components: {
    ModalHelp,
    ModalAbout
  },
  methods: {
    closeModal () {
      this.$parent.layout.modal.status = false
      this.$parent.layout.modal.action = ''
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
      position:relative;
      align-self:center;
      background-color:#fff;
      border-radius:24px;
      overflow:hidden;
    }
  }

  .modal-close {
    position:absolute;
    top:-24px;
    right:-24px;
    color:#fff;
  }
</style>
