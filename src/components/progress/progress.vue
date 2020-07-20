<template>
  <div class="top__loading" :style="styles"></div>
</template>

<script>
export default {
  name: 'topLoadingBar',
  data () {
    return {
      percent: 0,
      show: false,
      canSuccess: true,
      succColor: '#1790ff',
      failColor: '#da1748',
      widthSpeed: 200,
      opacitySpeed: 400,
      duration: 200,
      autoFinish: false,
    }
  },
  computed: {
    styles () {
      const styleOption = {
        backgroundColor: this.canSuccess ? this.succColor : this.failColor,
        opacity: this.show ? 1 : 0,
      }
      styleOption.width = this.percent + '%'
      styleOption.transition = `width ${this.widthSpeed}ms, opacity ${this.opacitySpeed}ms`
      return styleOption
    },
  },
}
</script>

<style lang="scss" scoped>
.top__loading {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
  opacity: 1;
  height: 3px;
}
</style>
