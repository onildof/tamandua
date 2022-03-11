<template>
  <form @submit.prevent="onSubmit">
    <input data-testid="name-input" v-model="name" />
    <button>Submit</button>
  </form>
</template>

<script>
export default {
  emits: ['formSubmitted'],
  data() {
    return {
      name: '',
    }
  },
  methods: {
    onSubmit() {
      this.$emit('formSubmitted', { name: this.name })
    },
  },
}
</script>

<style></style>
