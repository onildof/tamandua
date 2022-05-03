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
      <base-input type="radio" v-model="event.pets" label="pets" />
      <div>
        <input type="radio" v-model="event.pets" :value="1" name="pets" />
        <label>Yes</label>
      </div>

      <div>
        <input type="radio" v-model="event.pets" :value="0" name="pets" />
        <label>No</label>
      </div>

      <h3>Extras</h3>

      <div>
        <input type="checkbox" v-model="event.extras.catering" class="field" />
        <label>Catering</label>
      </div>

      <div>
        <input type="checkbox" v-model="event.extras.music" class="field" />
        <label>Live music</label>
      </div>

      <button type="Submit">Submit</button>
    </form>
  </div>
</template>

<script>
import BaseSelect from '@/components/BaseSelect.vue'
import BaseInput from '@/components/BaseInput.vue'
export default {
  components: { BaseInput, BaseSelect },
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
    }
  },
}
</script>

<style></style>
