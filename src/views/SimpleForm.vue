<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="sendForm">
      <base-select
        label="Select a category"
        v-model="event.category"
        :options="categories"
      />

      <fieldset>
        <legend>Name & describe your event</legend>
        <base-input v-model="event.title" label="Title" error="Desgraça" />
        <base-input v-model="event.description" label="Description" />
      </fieldset>

      <fieldset>
        <legend>Where is your event?</legend>
        <base-input v-model="event.location" label="Location" />
      </fieldset>

      <fieldset>
        <legend>Pets</legend>
        <p>Are pets allowed?</p>
        <div>
          <base-radio-group
            name="pets"
            v-model="event.pets"
            :options="petOptions"
          ></base-radio-group>
        </div>
      </fieldset>

      <fieldset>
        <legend>Extras</legend>
        <div>
          <base-checkbox v-model="event.extras.catering" label="Catering" />
        </div>
        <div>
          <base-checkbox v-model="event.extras.music" label="Live music" />
        </div>
      </fieldset>

      <button type="Submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
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
  methods: {
    sendForm() {
      return axios
        .post('http://localhost:3000/events', this.event)
        .then((response) => {
          console.log('Response', response)
        })
        .catch((err) => {
          console.log('Error', err)
        })
    },
  },
}
</script>

<style>
fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

legend {
  font-size: 28px;
  font-weight: 700;
  margin-top: 20px;
}

.errorMessage {
  color: red;
}
</style>
