<script>
export default {
  name: "landing-toolbar.component",
  data() {
    return {
      options: [
        { label: '¿Quiénes Somos?', id: '' },
        { label: '¿Cómo?', id: '' },
        { label: 'FAQs', id: '' },
        { label: 'Contáctanos', id: '' },
        { label: 'Explorar', id: '' },
      ]
    }
  },
  methods: {
    // Encapsulations
    idHref(link) {
      return `#${link}`;
    }
  }
}
</script>

<template>
  <pv-toolbar class="bg-gray-900">
    <template #start>
      <img height="80" src="../../assets/venue.png" alt="Venue">
    </template>
    <template #end>
      <a v-for="(option,index) of options" :href="idHref(option.id)">
        <pv-button :label="option.label" severity="secondary" :class="index === options.length - 1 ? '' : 'mr-2'"></pv-button>
      </a>
    </template>
  </pv-toolbar>
</template>

<style scoped>

</style>