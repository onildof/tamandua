<template>
  <label>{{ label }}</label>
  <input
    v-bind="$attrs"
    :placeholder="label"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="field"
  />
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
  created() {
    console.log('hue', this.$attrs)
  },
}
</script>

<style></style>
