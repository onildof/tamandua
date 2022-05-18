<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>
      <div>doneTodosCountQI0: {{ doneTodosCountQI0 }}</div>
    </h2>
    <h2>
      <div>doneTodosCountQI10: {{ doneTodosCountQI10 }}</div>
    </h2>
    <h2>
      <div>doneTodosCountQI20: {{ doneTodosCountQI20 }}</div>
    </h2>
    <h2>
      <div>doneTodosCountQI40: {{ doneTodosCountQI40 }}</div>
    </h2>
    <h2>
      <div>doneTodosCountQI50: {{ doneTodosCountQI50 }}</div>
    </h2>
    <h2>
      <div>doneTodosCountQI60: {{ doneTodosCountQI60 }}</div>
    </h2>
    <h2>
      <div>doneTodosCountQI70: {{ doneTodosCountQI70 }}</div>
    </h2>
  </div>
</template>
<script>
import defaultExport from '../services/todosHelper.js'
import defaultExport2 from '../services/todosHelper2.js'
import { doneTodosCountQI60 } from '../services/todosHelper3.js'
import * as todosHelper4 from '../services/todosHelper4.js'

export default {
  name: 'About',
  data() {
    return {
      callbackDeBeforeRouteEnterExecutado: false,
    }
  },
  computed: {
    //estamos acessando o state diretamente
    doneTodosCountQI0() {
      return this.$store.state.todos.filter((todo) => todo.done).length
    },
    //estamos fazendo operações no resultado de um getter
    doneTodosCountQI10() {
      return this.$store.getters.doneTodos.length
    },
    //estamos repetindo esse código em todos os componentes que precisam usar esse getter
    doneTodosCountQI20() {
      return this.$store.getters.doneTodosCount
    },
    //estamos usando um objeto helper para não repetir código, mas com uma sintaxe escrota
    doneTodosCountQI40: defaultExport.doneTodosCountQI30,
    //estamos usando um objeto helper para não repetir código, mas com uma sintaxe um pouco menos escrota
    ...defaultExport2,
    //estamos usando um objeto helper para não repetir código, sem default export. Útil para quando iremos usar os exports do objeto em vários lugares do nosso código e queremos deixar visível para quem lê o que exatamente estamos importando. É tree-shakeable.
    doneTodosCountQI60,
    //estamos usando um objeto helper para não repetir código, sem default export. Mas não nos interessa listar o que foi importado, pq usaremos tudo, e apenas nessa linha de código. Quem ler o código vai ter que ir no outro arquivo pra saber o que importamos.
    ...todosHelper4,
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
