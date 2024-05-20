<script>
import LandingToolbar from "../components/landing-toolbar.component.vue";
import LandingHero from "../components/landing-hero.component.vue";

export default {
  name: "landing-page",
  components: {LandingToolbar, LandingHero}
}
</script>

<template>
  <landing-toolbar/>
  <landing-hero/>
</template>

<style>
* {
  margin: 3px;
}
</style>