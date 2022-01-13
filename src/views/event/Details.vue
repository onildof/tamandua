<template>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.descripton }}</p>
</template>

<script>
export default {
  props: ['event'],
}
</script>

<style></style>
