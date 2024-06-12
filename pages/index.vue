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
    <img src="~/assets/images/school-banner1.webp" loading="lazy" alt="">
  </section>
  <Email/>
  <section class="banner2">
    <img src="~/assets/images/logo-round.png" loading="lazy" alt="">
  </section>
  <footer class="footer">
    <p class="email">thepennyprojects@gmail.com</p>
    <p class="address">Kafue, Zambia</p>
  </footer>
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
        height: 100%;
        width: 100%;
        
      object-fit: cover;
    }
  }

  .banner2 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 620px;
    background-color: var(--background-color-secondary);

    img {
      height: 400px;
      width: auto;
      
    }

    @media (max-width: 786px) {
      height: 520px;

      img {
        height: 300px;
      }
    }
  }

  footer {
    height: 150px;
    background-color: var(--background-color-main);
    font-family: 'Poppins', sans-serif;
    color: var(--text-color-main);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 6.5rem;
    font-size: 1.2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 3rem;
      font-size: 1.2rem;
      height: 300px;
    }
  }
</style>