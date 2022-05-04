<template>
  <div>
    <h1>Create an event</h1>
    <form>
      <base-select
        label="Select a category"
        v-model="event.category"
        :options="categories"
      />

      <h3>Name & describe your event</h3>

      <base-input v-model="event.title" label="Title" />

      <base-input v-model="event.description" label="Description" />

      <h3>Where is your event?</h3>

      <base-input v-model="event.location" label="Location" />

      <h3>Are pets allowed?</h3>

      <div>
        <base-radio-group
          name="pets"
          v-model="event.pets"
          :options="petOptions"
        ></base-radio-group>
      </div>

      <h3>Extras</h3>

      <div>
        <base-checkbox v-model="event.extras.catering" label="Catering" />
      </div>

      <div>
        <base-checkbox v-model="event.extras.music" label="Live music" />
      </div>

      <button type="Submit">Submit</button>
    </form>
  </div>
</template>

<script>
import BaseSelect from '@/components/BaseSelect.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import BaseRadioGroup from '@/components/BaseRadioGroup.vue'
export default {
  components: { BaseInput, BaseSelect, BaseCheckbox, BaseRadioGroup },
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
      event: {
        category: '',
        title: '',
        description: '',
        location: '',
        pets: 1,
        extras: {
          catering: false,
          music: false,
        },
      },
      petOptions: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' },
      ],
    }
  },
}
</script>

<style></style>
