<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  name: 'About',
  data() {
    return {
      callbackDeBeforeRouteEnterExecutado: false,
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(`${from.name} > ${to.name}\tin-component\tbeforeRouteEnter()`)
    next((vm) => {
      console.log(
        `${from.name} > ${to.name}\tin-component\tbeforeRouteEnter() CALLBACK do next executado.`
      )
      if (typeof vm != 'undefined') {
        vm.callbackDeBeforeRouteEnterExecutado = true
        console.log(`\tvm.$options.name === '${vm.$options.name}'
\tvm.callbackDeBeforeRouteEnterExecutado === ${vm.callbackDeBeforeRouteEnterExecutado}`)
      }
    })
  },
  beforeRouteUpdate(to, from) {
    console.log(`${from.name} > ${to.name}\tin-component\tbeforeRouteUpdate()`)
  },
  beforeRouteLeave(to, from) {
    console.log(`${from.name} > ${to.name}\tin-component\tbeforeRouteLeave()`)
  },
  beforeCreate() {
    console.log(`${this.$options.name} * beforeCreate()`)
  },
  created() {
    console.log(`${this.$options.name} * created()`)
  },
  beforeMount() {
    console.log(`${this.$options.name} * beforeMount()`)
  },
  mounted() {
    console.log(`${this.$options.name} * mounted()`)
  },
  beforeUpdate() {
    console.log(`${this.$options.name} * beforeUpdate()`)
  },
  updated() {
    console.log(`${this.$options.name} * updated()`)
  },
  beforeUnmount() {
    console.log(`${this.$options.name} * beforeUnmount()`)
  },
  unmounted() {
    console.log(`${this.$options.name} * unmounted()`)
  },
  activated() {
    console.log(`${this.$options.name} * activated()`)
  },
  deactivated() {
    console.log(`${this.$options.name} * deactivated()`)
  },
  errorCaptured() {
    console.log(`${this.$options.name} * errorCaptured()`)
  },
}
</script>
