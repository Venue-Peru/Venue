<script>
export default {
  name: "landing-footer.component",
  data() {
    return {
      icons: [
        { icon: 'pi pi-twitter', href: 'https://x.com/' },
        { icon: 'pi pi-instagram', href: 'https://www.instagram.com/' },
        { icon: 'pi pi-facebook', href: 'https://www.facebook.com/' }
      ],
    }
  },
}
</script>

<template>
  <pv-toolbar class="bg-gray-900 text-white">
    <template #start>
      <p>&copy; Venue Inc. 2024</p>
    </template>
    <template #end>
      <a v-for="(icon,index) of icons" target="_blank" :href="icon.href">
        <pv-button :icon="icon.icon" severity="secondary" :class="index === icons.length - 1 ? '' : 'mr-2'"/>
      </a>
    </template>
  </pv-toolbar>
</template>

<style>
</style>