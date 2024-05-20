<script>
import LandingToolbar from "../components/landing-toolbar.component.vue";
import LandingHero from "../components/landing-hero.component.vue";
import LandingHow from "../components/landing-how.component.vue";
import LandingFaqs from "../components/landing-faqs.component.vue";
import LandingForm from "../components/landing-form.component.vue";
import LandingFooter from "../components/landing-footer.component.vue";

export default {
  name: "landing-page",
  components: {LandingFooter, LandingForm, LandingHow, LandingToolbar, LandingHero, LandingFaqs}
}
</script>

<template>
  <landing-toolbar class="m-3"/>
  <landing-hero class="m-3"/>
  <landing-how class="m-3"/>
  <landing-faqs class="m-3"/>
  <landing-form class="m-3"/>
  <landing-footer class="m-3"/>
</template>

<style>
</style>