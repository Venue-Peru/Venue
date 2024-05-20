<script>
export default {
  name: "landing-hero.component",
  data() {
    return {
      button: { label: 'Explorar', to: '', severity: 'secondary' },
    }
  }
}
</script>

<template>
  <div class="flex bg-gray-900 text-white h-screen border-round">
    <div class="col-6 align-content-center justify-content-center text-center">
      <img src="../../assets/venue.png" alt="Venue">
    </div>
    <div class="col-6 align-content-center justify-content-center text-center">
      <h1>Venue</h1>
      <pv-button style="margin: 16px;" :label="button.label" :severity="button.severity"></pv-button>
    </div>
  </div>
</template>

<style scoped>

</style>