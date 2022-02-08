<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div class="nav">
      <router-link :to="{ name: 'EventDetails', params: { id: event.id } }"
        >Details</router-link
      >
      |
      <router-link :to="{ name: 'EventRegister', params: { id: event.id } }"
        >Register</router-link
      >
      |
      <router-link :to="{ name: 'EventEdit', params: { id: event.id } }"
        >Edit</router-link
      >
    </div>
    <router-view :event="event" />
  </div>
</template>

<script>
export default {
  name: 'EventLayout',
  data() {
    return {
      callbackDeBeforeRouteEnterExecutado: false,
    }
  },
  computed: {
    event() {
      return this.$store.state.event
    },
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
\tvm.callbackDeBeforeRouteEnterExecutado === ${
          vm.callbackDeBeforeRouteEnterExecutado
        }
\tvm.event.title === '${vm.event && vm.event.title}'`)
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
