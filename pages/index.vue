<template>
  <Header/>
  <section class="hero">
    <div class="container">
      <div class="group">
        <h1 class="header">Little Gifts, Big Impact</h1>
      </div>
      <div class="group">

      </div>
    </div>
  </section>
  <section class="intro" style="height:100rem;">

  </section>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
  .hero {
    display: flex;
    justify-content: center;
    height: clamp(50vh, 100vh, 900px);
    background-color: #fdeec8;

    .group {
      margin: 1rem;
      width: 100%;
      height: 100%;

      &:first-child {
        display: flex;
        justify-content: left;
        align-items: flex-start;

        .header {
          font-family: 'Nunito', sans-serif;
          font-size: 4.2rem;
          letter-spacing: 0.4rem;
          font-weight: 700;
          width: 35rem;
          color: #a64c2a;
          text-transform: uppercase;
          padding-top: 14rem;
        }
      }
    }

    img {
      width: 100%;
      height: auto;
    }
  }
</style>