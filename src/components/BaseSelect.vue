<template>
  <label>{{ label }}</label>
  <select>
    <option
      v-for="option in categories"
      :key="option"
      :value="option"
      :selected="option === event.category"
    >
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['update:modelValue'],
}
</script>

<style></style>
