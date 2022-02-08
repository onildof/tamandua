<template>
  <h1>Create an event</h1>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <label>Select category:</label>
      <select v-model="event.category">
        <option
          v-for="option in categories"
          :key="option"
          :value="option"
          :selected="option === event.category"
        >
          {{ option }}
        </option>
      </select>

      <h3>Name & describe your event</h3>

      <label>Title</label>
      <input v-model="event.title" />

      <label>Description</label>
      <input v-model="event.description" />

      <h3>Where is your event?</h3>

      <label>Location</label>
      <input type="text" v-model="event.location" />

      <h3>When is your event?</h3>

      <label>Date</label>
      <input type="text" v-model="event.date" />

      <label>Time</label>
      <input type="text" v-model="event.time" />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
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
        id: '',
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: '',
      },
    }
  },
  methods: {
    onSubmit() {
      const event = {
        ...this.event,
        organizer: this.$store.state.user,
        id: uuidv4(),
      }
      this.$store
        .dispatch('createEvent', event)
        .then(() => {
          this.$router.push({
            name: 'EventDetails',
            params: { id: event.id },
          })
        })
        .catch((error) => {
          this.$router.push({
            name: 'ErrorDisplay',
            params: { error },
          })
        })
    },
  },
}
</script>

<style></style>
