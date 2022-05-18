//criamos um objeto helper para não repetir código nas computed properties de mais de um componente
export default {
  doneTodosCountQI30() {
    return this.$store.getters.doneTodosCount
  },
}
