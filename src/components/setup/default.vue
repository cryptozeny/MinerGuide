<template>
  <section id="setup">
    <a id="setupStepReset"
       href="#"
       v-if="$parent.setup.currentStep !== 0"
       @click.prevent="returnBeforeStep">{{ $t("setup_header_prevstep") }}</a>
    <transition name="setup">
      <Introduce v-if="$parent.setup.currentStep === 0" />
      <Os v-if="$parent.setup.currentStep === 1" />
      <SystemResource v-if="$parent.setup.currentStep === 2" />
      <MiningPool v-if="$parent.setup.currentStep === 3" />
    </transition>
  </section>
</template>

<script>
import Introduce from './introduce.vue'
import Os from './os.vue'
import SystemResource from './system_resource.vue'
import MiningPool from './mining_pool.vue'

export default {
  components: {
    Introduce,
    Os,
    SystemResource,
    MiningPool
  },
  methods: {
    returnBeforeStep () {
      if (this.$parent.setup.currentStep > 0) {
        this.$parent.setup.currentStep = this.$parent.setup.currentStep - 1
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
  #setupStepReset {
    display:block;
    text-align:center;
    margin:-1rem 0 0;
    padding:1rem 0;
    border-bottom:1px solid $oc-gray-2;
    color:$oc-gray-9;
  }
</style>
