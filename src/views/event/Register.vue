<template>
  <p>Registration form here</p>
  <button v-on:click="register">Register Meeeeeee</button>
</template>

<script>
export default {
  props: ['event'],
  inject: ['GStore'],
  methods: {
    register() {
      // If registration API call is successful,

      //set message
      this.GStore.flashMessage = `You are successfully registered to ${this.event.title}`
      setTimeout(() => {
        //erase it after 3s
        this.GStore.flashMessage = ''
      }, 3000)

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
