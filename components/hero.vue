<template>
  <section class="hero desktop">
    <div class="container">
      <div class="group">
        <h1 class="header">Little Gifts, Big Impact</h1>
        <p class="subheader">Welcome to <em>Penny Projects</em>, a community of people dedicated to seeing a little go a long way.</p>
        <p class="subheader2">Our misson is both simple yet profound: we aim to nuture and inspire high school students from Riverside Secondary Highschool to become the driving</p>
        <div class="buttons">
          <NuxtLink :to="{ path: '/', hash: '#donation'} " id="donate-button"><button class="donation-button">Donate Now</button></NuxtLink>
          <NuxtLink :to="{ path: '/', hash: '#newsletter'} " id="newsletter-button"><button class="newsletter-button">Our Newsletter</button></NuxtLink>
        </div>
      </div>
      <img src="/images/hero-graphic-desktop.webp" />
      <!-- <div class="group">
      </div> -->
    </div>
  </section>
  <section class="hero mobile">
    <div class="icon">
      <img src="/images/hero-logo-mobile.png" />
    </div>
    <h1 class="header">Little Gifts, Big Impact</h1>
    <div class="img-container">
      <img src="/images/hero-graphic-desktop.webp" />
    </div>
    <p class="subheader">Welcome to <em>Penny Projects</em>, a community of people dedicated to seeing a little go a long way.</p>
    <p class="subheader2">Our misson simple yet profound: nuture and inspire high school students from Riverside Secondary Highschool</p>
    <div class="buttons">
      <NuxtLink :to="{ path: '/', hash: '#donation'} " id="donate-button2"><button class="donation-button">Donate Now</button></NuxtLink>
      <NuxtLink :to="{ path: '/', hash: '#newsletter'} " id="newsletter-button2"><button class="newsletter-button">Our Newsletter</button></NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
.hero {
  display:flex;
  align-items: center;
  justify-content: center;
  padding: 0rem 2rem 0rem 2rem;
  background-color: #eae6d7;
  padding-top: 14rem;
  overscroll-behavior: none;
  height: clamp(600px, 50vw, 660px);

  @media (max-width: 768px) {
    display: none;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;

    .group {
      display: flex;

      &:first-child {
        display: flex;
        flex-direction: column;
        justify-content: left;
        align-items: flex-start;
        z-index: 1;

        .header {
          font-family: 'Nunito', sans-serif;
          font-size: 4rem;
          letter-spacing: 0.3rem;
          font-weight: 700;
          width: 34rem;
          color: var(--text-color-main);
          text-transform: uppercase;

          @media (max-width: 1000px) {
            font-size: 3.4rem;
            width: 30rem;
          }
        }

        .subheader, .subheader2 {
          font-family: 'Poppins', sans-serif;
          // font-style: oblique 8deg;
          text-align: normal;
          font-size: 1.4rem;
          font-weight: 400;
          width: 31rem;
          color: var(--text-color-main);
          padding-top: 1.6rem;

          @media (max-width: 1000px) {
            font-size: 1.2rem;
          }
        }

        .subheader {
          font-weight: 600;

          @media (max-width: 1000px) {
            max-width: 26rem;
          }
        }
        

        .subheader2 {
          font-style: oblique 8deg;
          width: 28rem;

          @media (max-width: 1000px) {
            width: 24rem;
          }
        }

        .buttons {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 30rem;
          margin-top: 5.2rem;

          button {
            background-color: var(--text-color-main);
            border: none;
            border-radius: 2rem;
            height: 4rem;
            color: var(--background-color-secondary);
            font-family: 'Nunito', sans-serif;
            font-size: 1.2rem;
            font-weight: 600;
            letter-spacing: 0.06rem;
            text-transform: uppercase;
          }

          #donate-button {
            .donation-button {
              width: 13rem;
              cursor: pointer;

              @media (max-width: 1000px) {
                width: 11rem;
              }
            }
          }

          .newsletter-button {
            cursor: pointer;
            width: 15rem;
          }
        }

        @media (max-width: 1000px) {
          .buttons {
            width: 25rem;

            button {
              font-size: 1rem;
              height: 3.5rem;

              &:first-child {
                width: 10rem;
              }

              &:last-child {
                width: 13rem;
              }
            }
          }
        }
      }
    }
  
    img {
      position: relative;
      top: -5rem;
      width: clamp(34rem, 150%, 44rem);
      height: auto;
      right: 3rem;
      z-index: 0;
    }
  }
}

.hero.mobile {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: auto;
    padding-top: 2rem;
    padding-bottom: 5rem;

    @media (max-width: 768px) {
      display: flex;
    }

    .icon {
      position: relative;
      top: -2rem;
      width: clamp(15rem, 60vw, 25rem);
      height: clamp(10rem, 40vw, 16rem);
      overflow: hidden;

      img {
        width: 100%;
      }
    }

    .img-container {
      height: 400px;

      img {
        height: 120%;
        width: auto;
      }
    }

    .header {
      font-family: 'Nunito', sans-serif;
      font-size: clamp(2.8rem, 12vw, 4rem);
      font-weight: 600;
      text-transform: uppercase;
      width: 90vw;
      align-items: center;
      text-align: center;
      position: relative;
      top: clamp(-8rem, 2vw, 5rem);
      line-height: clamp(3.5rem, 12vw, 4rem);
      color: var(--text-color-main);
      background-color: var(--background-color-main);
    }

    .image {
      width: clamp(20rem, 90vw, 38rem);
      height: auto;
      position: relative;
      top: 3rem;
      z-index: 1;
    }

    .subheader, .subheader2 {
      text-align: center;
      font-family: 'Poppins', sans-serif;
      font-size: clamp(1rem, 5vw, 1.3rem);
      color: var(--text-color-main);
      line-height: 1.8rem;
    }

  .subheader {
    margin-top: 4.5rem;
    margin-bottom: 0.4rem;
    text-decoration: underline; 
    font-weight: 600;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    width: 100%;

    button {
      color: var(--background-color-main);
      background-color: var(--text-color-main);
      font-family: 'Nunito', sans-serif;
      color: var(--background-color-secondary);
      border: none;
      height: auto;
      margin-top: 2rem;
      padding: 0.8rem;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 2rem;
    }

    #donate-button2 {
      width: 10rem;
      .donation-button {
        cursor: pointer;

        @media (max-width: 1000px) {
          width: 100%;
        }
      }
    }

    .newsletter-button {
      cursor: pointer;
      width: 11rem;
    }
  }
}
</style>