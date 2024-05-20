<script>
export default {
  name: "landing-toolbar.component",
  data() {
    return {
      options: [
        { label: '¿Quiénes Somos?', link: '' },
        { label: '¿Cómo?', link: '' },
        { label: 'FAQs', link: '' },
        { label: 'Contáctanos', link: '' },
        { label: 'Explorar', link: '' },
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
  <pv-toolbar class="bg-primary">
    <template #start>
      <span>Venue</span>
    </template>
    <template #end>
      <a v-for="option of options" :href="idHref(option.link)">
        <pv-button :label="option.label"></pv-button>
      </a>
    </template>
  </pv-toolbar>
</template>

<style scoped>

</style>