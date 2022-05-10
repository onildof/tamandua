<template>
  <form @submit.prevent="onSubmit">
    <base-input
      type="email"
      label="email"
      v-model="email"
      :error="emailError"
    />
    <base-input
      type="password"
      label="password"
      v-model="password"
      :error="passwordError"
    />
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { useField, useForm } from 'vee-validate'
import BaseInput from '@/components/BaseInput.vue'
export default {
  components: { BaseInput },
  setup() {
    function onSubmit() {
      alert('Submitted')
    }

    const validations = {
      email: (value) => {
        if (!value) return 'This field is required'

        const regex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regex.test(String(value).toLowerCase())) {
          return 'Please enter a valid email address'
        }

        return true
      },
      password: (value) => {
        const requiredMessage = 'This field is required'

        if (value === undefined || value === null) {
          return requiredMessage
        }

        if (!String(value).length) {
          return requiredMessage
        }

        return true
      },
    }

    useForm({ validationSchema: validations })

    const { value: email, errorMessage: emailError } = useField('email')
    const { value: password, errorMessage: passwordError } =
      useField('password')

    return {
      onSubmit,
      email,
      emailError,
      password,
      passwordError,
    }
  },
}
</script>

<style></style>
