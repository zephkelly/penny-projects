<template>
  <section class="approach desktop component" id="approach">
    <div class="container">
      <div class="group">
        <h2>Our Approach</h2>
        <p class="descriptor">With the support of Riverside Secondary School, we offer hands-on student-led experiential learning. This approach focuses on:</p>
        <div class="approaches">
          <p>1. Identifying the needs of the community</p>
          <p>2. Crafting effective solutions</p>
          <p>3. Implementing projects</p>
        </div>
        <p class="descriptor-2">This approach helps students foster pride and ownership in their work, and ensures the projects meet the specific needs of the their local community</p>
      </div>
      <div class="group">
      </div>
    </div>
    <img src="~/assets/images/approach-1.webp" alt="Child smiling and reach upwards." loading="lazy">
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
  .approach {
    height: auto;
    overflow: hidden;
    position: relative;
    padding: 0rem 1rem 0rem 1rem;

    @media (max-width: 768px) {
      height: clamp(50rem, 100%, 60rem);
    }
    
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding-right: 0rem;

      @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        grid-template-columns: 1fr;
        padding-left: 0rem;
      }

      .group {
        max-height: 100%;
        
        @media (max-width: 768px) {
          align-items: center;
        }

        &:first-child {
          padding-top: 6rem;
          padding-bottom: 6rem;
          padding-right: 4rem;
          padding-left: 0rem;
          display: flex;
          flex-direction: column;
          font-family: 'Poppins', sans-serif;
          font-size: 1.1rem;
          text-align: left;
          color: var(--text-color-main);
          
          @media (max-width: 1000px) {
            font-size: 1rem;
          }
          
          @media (max-width: 768px) {
            padding-top: 26rem;
            padding-left: 0rem;
            padding-right: 0rem;
            padding-bottom: 4rem;
            width: 90vw;

            p {
              font-size: clamp(1rem, 1.5vw, 1.1rem);
              text-align: center;
            }
          }

          .descriptor {
            font-weight: 500;
            line-height: 1.7rem;
            margin-bottom: 3rem;
            max-width: 390px;

            em {
              font-weight: 600;
              font-style: oblique 12deg;
            }
          }

          .descriptor-2 {
            margin-top: 2rem;
            font-weight: 600;
            word-spacing: 0.1rem;
            line-height: 1.5rem;
            width: 97%;
            max-width: 390px;
          }

          .approaches {
            p {
              margin-bottom: 1rem;
            }
          }
        }

        &:last-child {
          padding: 0rem;
          padding-bottom: 1rem;
          right: 0;

          @media (max-width: 768px) {
            
          }
        }

        h2 {
          font-family: 'Nunito', sans-serif;
          font-size: 3rem;
          letter-spacing: 0.3rem;
          font-weight: 700;
          width: auto;
          color: var(--text-color-main);
          text-transform: uppercase;
          margin-bottom: 1rem;
          text-align: left;

          @media (max-width: 1000px) {
            font-size: 2.4rem;
          }

          @media (max-width: 768px) {
            text-align: center;
          }
        }
      }
    }

    img {
      position: absolute;
      width: 50%;
      right: 0;
      height: 100%;
      object-fit: cover;

      @media (max-width: 768px) {
        left: 0;
        right: 0;
        top: 0;
        width: 100%;
        height: clamp(10rem, 100%, 22rem);
      }
    }
  }
</style>