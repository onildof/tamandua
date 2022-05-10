<template>
  <component
    v-for="option in options"
    :key="option"
    :is="vertical ? 'div' : 'span'"
    :class="{
      horizontal: !vertical,
    }"
  >
    <base-radio
      :value="option.value"
      :label="option.label"
      :name="name"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    ></base-radio>
  </component>
</template>

<script>
import BaseRadio from '@/components/BaseRadio.vue'
export default {
  components: { BaseRadio },
  props: {
    options: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
  },
}
</script>

<style>
.horizontal {
  margin-right: 20px;
}
</style>
