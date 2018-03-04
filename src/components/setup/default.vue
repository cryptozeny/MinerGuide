<template>
  <section id="setup">
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
  data () {
    return {}
  },
  methods: {
    getSystemInformation () {
      this.$parent.result.OS = navigator.platform
      this.$parent.setup.availableCPUThread = navigator.hardwareConcurrency
    }
  }
}
</script>
