<template>
  <p>Registration form here</p>
  <button v-on:click="register">Register Meeeeeee</button>
</template>

<script>
export default {
  props: ['event'],
  methods: {
    register() {
      // If registration API call is successful,
      this.$router.replace({
        name: 'EventDetails',
        params: { id: this.event.id },
      })
      /*
      this.$router.push({
        name: 'EventDetails',
        params: { id: this.event.id },
      })
      */
    },
  },
}
</script>

<style></style>
