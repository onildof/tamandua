<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit="submit">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="category"
        :error="errors.category"
      />

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="title"
        :error="errors.title"
        type="text"
      />

      <BaseInput
        label="Description"
        v-model="description"
        :error="errors.description"
        type="text"
      />

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="location"
        :error="errors.location"
        type="text"
      />

      <h3>Are pets allowed?</h3>
      <BaseRadioGroup
        v-model="pets"
        :error="errors.pets"
        name="pets"
        :options="[
          { value: 1, label: 'Yes' },
          { value: 0, label: 'No' },
        ]"
      />

      <h3>Extras</h3>
      <div>
        <BaseCheckbox
          label="Catering"
          v-model="catering"
          :error="errors.catering"
        />
      </div>

      <div>
        <BaseCheckbox
          label="Live music"
          v-model="music"
          :error="errors.music"
        />
      </div>

      <div>
        <button type="submit" class="-fill-gradient" something="else">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseRadioGroup from '@/components/BaseRadioGroup.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import { useForm, useField } from 'vee-validate'
export default {
  components: { BaseInput, BaseSelect, BaseRadioGroup, BaseCheckbox },
  data() {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community',
      ],
    }
  },
  setup() {
    const required = (value) => {
      const requiredMessage = 'This field is required'
      if (value === undefined || value === null) return requiredMessage
      if (!String(value).length) return requiredMessage
      return true
    }
    const minLength = (number, value) => {
      if (String(value).length < number)
        return 'Please type at least ' + number + ' characters'
      return true
    }
    const anything = () => {
      return true
    }

    const validationSchema = {
      category: required,
      title: (value) => {
        const req = required(value)
        if (req !== true) return req

        const min = minLength(3, value)
        if (min !== true) return min

        return true
      },
      description: required,
      location: undefined,
      pets: anything,
      catering: anything,
      music: anything,
    }

    const { handleSubmit, errors } = useForm({
      validationSchema,
      initialValues: {
        pets: 1,
        catering: false,
        music: false,
      },
    })

    const submit = handleSubmit((values) => {
      // pretty print the values object
      console.log(JSON.stringify(values, null, 2))
    })

    const { value: category } = useField('category')
    const { value: title } = useField('title')
    const { value: description } = useField('description')
    const { value: location } = useField('location')
    const { value: pets } = useField('pets')
    const { value: catering } = useField('catering')
    const { value: music } = useField('music')

    return {
      category,
      title,
      description,
      location,
      pets,
      catering,
      music,
      submit,
      errors,
    }
  },
}
</script>
