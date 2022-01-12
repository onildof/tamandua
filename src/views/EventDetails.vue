<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.descripton }}</p>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
export default {
  name: 'EventDetails',
  data() {
    return {
      event: null,
    }
  },
  props: ['id'],
  created() {
    EventService.getEvent(this.id)
      .then((response) => {
        this.event = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>

<style></style>
