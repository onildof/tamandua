<template>
  <input
    type="radio"
    :value="value"
    :checked="modelValue === value"
    v-bind="$attrs"
    @change="$emit('update:modelValue', $event.target.value)"
  />
  <label v-if="label">{{ label }}</label>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    value: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
}
</script>

<style></style>
