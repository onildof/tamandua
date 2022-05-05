<template>
  <input
    type="checkbox"
    :checked="modelValue"
    @change="$emit('update:modelValue', $event.target.checked)"
    class="field"
    :id="uuid"
  />
  <label :for="uuid" v-if="label">{{ label }}</label>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: Boolean,
      default: false,
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
