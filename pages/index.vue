<template>
  <Header/>
  <section class="hero">
    <div class="container">
      <div class="group">
        <h1 class="header">Little Gifts, Big Impact</h1>
        <p class="subheader">Welcome to <em>Penny Projects</em>. A community of people dedicated to seeing a little go a long way.</p>
      </div>
      <div class="group">

      </div>
    </div>
  </section>
  <section class="intro" style="height:100rem;">

  </section>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'default' });
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
        flex-direction: column;
        justify-content: left;
        align-items: flex-start;

        .header {
          font-family: 'Nunito', sans-serif;
          font-size: 4rem;
          letter-spacing: 0.4rem;
          font-weight: 700;
          width: 34rem;
          color: #a64c2a;
          text-transform: uppercase;
          padding-top: 14rem;
        }

        .subheader {
          font-family: 'Nunito', sans-serif;
          font-style: italic;
          text-align: justify;
          font-size: 1.6rem;
          font-weight: 400;
          width: 32rem;
          color: #a64c2a;
          padding-top: 1rem;

          em {
            font-weight: 700;
          }
        }
      }
    }

    img {
      width: 100%;
      height: auto;
    }
  }
</style>