<template>
  <div>
    <span>{{ randomNumber }}</span>
    <button @click="generateRandomNumber">Generate Random Number</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      randomNumber: 0,
    }
  },
  props: {
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    generateRandomNumber() {
      this.randomNumber =
        Math.floor(Math.random() * (this.max + 1 - this.min)) + this.min
    },
  },
}
</script>

<style></style>
