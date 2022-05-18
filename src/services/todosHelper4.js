function doneTodosCountQI70() {
  return this.$store.getters.doneTodosCount
}
//para mais outra forma de usar um arquivo helper. Aqui não estamos exportando um objeto, essas curly braces são apenas a sintaxe para exportar tudo em uma linha só ao invés de botar o prefixo export antes de cada função ou variável.
export { doneTodosCountQI70 }
