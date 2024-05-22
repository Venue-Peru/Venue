<script>
import LandingHeader from "../components/landing-header.component.vue";
import LandingHero from "../components/landing-hero.component.vue";
import LandingHow from "../components/landing-how.component.vue";
import LandingFaqs from "../components/landing-faqs.component.vue";
import LandingForm from "../components/landing-form.component.vue";
import LandingFooter from "../components/landing-footer.component.vue";

export default {
  name: "landing-page",
  components: {LandingFooter, LandingForm, LandingHow, LandingHeader, LandingHero, LandingFaqs}
}
</script>

<template>
  <div class="landing-page pt-1 pb-1">
    <landing-header class="mt-3 mr-3 ml-3"/>
    <landing-hero class="m-3"/>
    <landing-how class="m-3"/>
    <landing-faqs class="m-3"/>
    <landing-form class="m-3"/>
    <landing-footer class="mb-3 mr-3 ml-3"/>
  </div>
</template>

<style>
.landing-page {
  background-image: url("../../assets/Flashing-Lights-thumbnail-seamless.jpg");
}
</style>