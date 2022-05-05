<template>
  <input
    type="radio"
    :value="value"
    :checked="modelValue === value"
    v-bind="$attrs"
    @change="$emit('update:modelValue', $event.target.value)"
    :id="uuid"
  />
  <label :for="uuid" v-if="label">{{ label }}</label>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
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
  setup() {
    return {
      uuid: uuidv4(),
    }
  },
}
</script>

<style></style>
