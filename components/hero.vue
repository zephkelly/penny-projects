<template>
  <section class="hero desktop" id="hero-section">
    <div class="container">
      <div class="group">
        <h1 class="header">Little Gifts, <span class="large">Big</span> Impact</h1>
        <p class="subheader">Welcome to <em>Penny Projects</em>, where a little goes a long way</p>
        <p class="subheader2">Our mission is simple: to nurture and inspire students from Riverside Secondary Highschool, Zambia</p>
        <div class="buttons">
          <a id="donate-button" @click="openDonationModal()" target="_blank">Donate Now</a>
          <NuxtLink :to="{ path: '/', hash: '#approach'} " id="about-us-button" class="about-us-button">Learn More</NuxtLink>
        </div>
      </div>
      <img src="~/assets/images/hero-graphic-desktop.webp" alt="Graphic of people gathered around a well which resembles the earth"/>
    </div>
  </section>
  <section class="hero mobile">
    <div class="icon">
      <img src="~/assets/images/hero-logo-mobile.webp" alt="Penny-Projects logo"/>
    </div>
    <h1 class="header">Little Gifts, <span class="large">Big</span> Impact</h1>
    <div class="img-container"> 
      <img class="image" src="~/assets/images/hero-graphic-desktop.webp" alt="Graphic of people gathered around a well which resembles the earth"/>
    </div>
    <p class="subheader">Welcome to <em>Penny Projects</em>, where a little goes a long way</p>
    <p class="subheader2">Our mission is simple: nurture and inspire students from Riverside Secondary Highschool, Zambia</p>
    <div class="buttons">
      <a @click="openDonationModal()" id="donate-button2" target="_blank" class="donation-button">Donate Now</a>
      <NuxtLink :to="{ path: '/', hash: '#approach'} " id="about-us-button2" class="about-us-button">About Us</NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
function openDonationModal() {
  donationPopupOpen().value = true;
}
</script>

<style scoped lang="scss">
section.hero {
  display: flex;
  justify-content: center;
  padding: 0rem 1rem 0rem 1rem;
  background-color: #eae6d7;
  overscroll-behavior: none;

  @media (max-width: 768px) {
    display: none;
  }

  .container {
    margin-top: 14rem;
    margin-bottom: 8rem;
    display: grid;
    height: 420px;
    grid-template-columns: 1fr 1fr;
 
    .group {
      display: flex;
      height: stretch;

      &:first-child {
        display: flex;
        flex-direction: column;
        justify-content: left;
        align-items: flex-start;
        z-index: 1;

        .header {
          font-family: 'Nunito', sans-serif;
          font-size: 3.6rem;
          letter-spacing: 0.3rem;
          font-weight: 700;
          width: 34rem;
          color: var(--text-color-main);
          text-transform: uppercase;

          .large {
            margin-left: -0.05rem;
          }

          @media (max-width: 1000px) {
            font-size: 3.4rem;
            width: 30rem;
          }
        }

        .subheader, .subheader2 {
          font-family: 'Poppins', sans-serif;
        //   text-align: normal;
          font-size: 1.4rem;
          font-weight: 400;
          width: 30rem;
          color: var(--text-color-main);

          @media (max-width: 1000px) {
            font-size: 1.2rem;
          }
        }

        .subheader {
          font-size: 1.3rem;
          padding-top: 2rem;
          font-weight: 500;

          @media (max-width: 1000px) {
            max-width: 26rem;
          }
        }
        

        .subheader2 {
          width: 28rem;
          font-size: 1.15rem;
          font-style: oblique 4deg;
          padding-top: 1.2rem;

          @media (max-width: 1000px) {
            width: 24rem;
          }
        }

        .buttons {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: auto;
          margin-top: 5.5rem;

          button, a {
            background-color: var(--text-color-main);
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 2rem;
            height: 3.4rem;
            max-height: 3.4rem;
            color: var(--background-color-secondary);
            font-family: 'Nunito', sans-serif;
            font-size: 1.1rem;
            font-weight: 600;
            letter-spacing: 0.06rem;
            text-transform: uppercase;
            transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
          }

          #donate-button {
            width: auto;
            padding-left: 2rem;
            padding-right: 2rem;
            margin-right: 2rem;
            cursor: pointer;

            &:hover {
              background-color: var(--text-color-main-dark);
            }
          }

          .about-us-button {
            height: 3.4rem;
            width: 13rem;
            padding-left: 2rem;
            padding-right: 2rem;
            border: 3px;
            border-style: solid;
            color: var(--text-color-main);
            background-color: var(--background-color-main);
            cursor: pointer;
            box-sizing: border-box;
            transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;

            &:hover {
              color: var(--background-color-secondary);
              background-color: var(--text-color-main);
              border: 0px;
            }
          }
        }

        @media (max-width: 1000px) {
          .buttons {
            button {
              font-size: 1rem;
            }

            a {
              font-size: 1rem;
              max-height: 3.4rem;
              width: 10rem;
            }
          }
        }
      }
    }
  
    img {
      position: relative;
      top: -6rem;
      width: clamp(28rem, 150%, 38rem);
      height: auto;
      right: 6rem;
      z-index: 0;

      @media (max-width: 1000px) {
        width: clamp(28rem, 150%, 38rem);
      }

      @media (max-width: 875px) {
        right: 4.2rem;
        top: -3.2rem;
      }
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
    padding-bottom: 6rem;
    padding: 0rem 0.8rem 0rem 0.8rem;

    @media (max-width: 768px) {
      display: flex;
    }

    .icon {
      position: relative;
      top: -1.4rem;
      width: clamp(13.5rem, 48vw, 19rem);
      height: clamp(11rem, 40vw, 16rem);
      overflow: hidden;

      img {
        width: 100%;
      }
    }

    .img-container {
      position: relative;
      top: -3.2rem;
      height: 400px;

      @media (max-width: 430px) {
        height: 350px;

        img {
          height: 100%;
        }
      }

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
      top: -0.8rem;
      line-height: clamp(3rem, 12vw, 4rem);
      color: var(--text-color-main);
      background-color: var(--background-color-main);
    }

    .image {
      width: clamp(20rem, 90vw, 38rem);
      height: auto;
      position: relative;
      top: -0.3rem;
      z-index: 1;
    }

    .subheader, .subheader2 {
      text-align: center;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: clamp(1rem, 5vw, 1.3rem);
      color: var(--text-color-main);
      line-height: 1.8rem;
    }

  .subheader {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1.3rem;
    font-weight: 600;

    // max-width: rem;
  }

  .subheader2 {
    font-style: oblique 4deg;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    gap: 2rem;
    margin-bottom: 6rem;
    margin-top: 0.2rem;

    @media (max-width: 400px) {
      gap: 1rem;
      margin-bottom: 5rem;
    }

    button, a {
      color: var(--background-color-main);
      background-color: var(--text-color-main);
      font-family: 'Nunito', sans-serif;
      color: var(--background-color-secondary);
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      height: 2rem;
      margin-top: 2rem;
      padding: 0.8rem;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 2rem;
    }

    #donate-button2 {
      cursor: pointer;
      width: auto;
      padding-left: 2rem;
      padding-right: 2rem;
    }

    .about-us-button {
      cursor: pointer;
      width: auto;
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
}
</style>