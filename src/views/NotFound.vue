<template>
  <h1>Oops!</h1>
  <h3>The {{ resource }} you're looking for does not exist.</h3>
  <router-link :to="{ name: 'EventList' }">Return home</router-link>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
    },
  },
}
</script>

<style></style>
