<template>
  <form @submit="onSubmit">
    <base-input
      type="email"
      label="email"
      :modelValue="email"
      @change="handleChange"
      :error="errors.email"
    />
    <base-input
      type="password"
      label="password"
      v-model="password"
      :error="errors.password"
    />
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import BaseInput from '@/components/BaseInput.vue'
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'
export default {
  components: { BaseInput },
  setup() {
    const validationSchema = object({
      email: string().required().email(),
      password: string().required(),
    })

    const { handleSubmit, errors, setFieldValue } = useForm({
      validationSchema,
    })

    const handleChange = (event) => {
      setFieldValue('email', event.target.value)
    }

    const onSubmit = handleSubmit((values) => {
      console.log(JSON.stringify(values, null, 2))
    })

    const { value: email } = useField('email')
    const { value: password } = useField('password')

    return {
      onSubmit,
      handleChange,
      email,
      password,
      errors,
    }
  },
}
</script>

<style></style>
