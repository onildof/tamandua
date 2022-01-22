<template>
  <p>Edit form here</p>
</template>

<script>
export default {
  props: ['event'],
  data() {
    return {
      unsavedChanges: true,
    }
  },
  beforeRouteLeave() {
    if (this.unsavedChanges) {
      const answer = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      )
      if (!answer) {
        return false
      }
    }
  },
}
</script>

<style></style>
