<template>
  <Header/>
  <Hero/>
  <InstaFeed/>
  <Mission/>
  <Approach/>
  <DonationPopout/>
  <Donation/>
  <Founder/>
  <Join/>
  <section class="banner">
    <img src="~/assets/images/school-banner.webp" alt="">
  </section>
  <Email/>
  <section class="banner2">
    <img src="~/assets/images/logo-round.png" alt="">
  </section>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
  section {
    display: flex;
    justify-content: center;
  }

  .banner {
    height: 400px;
    overflow: hidden;

    @media (max-width: 768px) {
      height: 300px;
    }

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  .banner2 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 620px;
    background-color: var(--background-color-secondary);

    img {
      height: 450px;
      width: auto;
      
    }

    @media (max-width: 786px) {
      height: 500px;

      img {
        height: 340px;
      }
    }
  }
</style>