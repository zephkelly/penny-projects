<template>
    <section class="hero desktop component" id="hero-section">
        <div class="container">
        <div class="group">
            <h1 class="header">Little Gifts, Big Impact</h1>
            <p class="subheader">Welcome to <em>Penny Projects</em>, where a little goes a long way</p>
            <p class="subheader2">Our mission is simple: to nurture and inspire students from Riverside Secondary Highschool, Zambia</p>
            <ul class="buttons">
                <a id="donate-button" @click="openDonationModal()" target="_blank">Donate Now</a>
                <NuxtLink @click.prevent="scrollToAboutDesktop" id="about-us-button" class="about-us-button">Learn More</NuxtLink>
            </ul>
        </div>
        <img src="~/assets/images/hero-graphic-desktop.webp" alt="Graphic of people gathered around a well which resembles the earth" loading="eager"/>
        </div>
    </section>
    <section class="hero mobile component">
        <div class="icon">
            <img src="~/assets/images/hero-logo-mobile.webp" alt="Penny-Projects logo"/>
        </div>
        <h1 class="header">Little Gifts <span class="large">Big</span> Impact</h1>
        <div class="img-container"> 
        <img class="image" src="~/assets/images/hero-graphic-mobile1.webp" alt="Graphic of people gathered around a well which resembles the earth"/>
        </div>
        <p class="subheader">Where a little goes a long way</p>
        <p class="subheader2">Our mission is simple: nurture and inspire students from <span class="underline">Riverside Secondary Highschool</span>, Zambia</p>
        <ul class="buttons">
            <NuxtLink :to="{ path: '/projects', hash: ''} " id="view-projects-anchor" class="view-projects-anchor">Our Projects</NuxtLink>
            <button @click="openDonationModal()" id="donate-button2" target="_blank" class="donation-button">Donate</button>
            <NuxtLink @click.prevent="scrollToAboutMobile" id="about-us-button2" class="about-us-button">About Us</NuxtLink>
        </ul>
    </section>
</template>

<script lang="ts" setup>
import { useScroll } from '@/composables/useScroll'

const { smoothScroll } = useScroll()

const scrollToAboutDesktop = () => {
  smoothScroll('#approach', 0)
}

const scrollToAboutMobile = () => {
  smoothScroll('#approach', -360)
}

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
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }

  .container {
    margin-top: 14rem;
    margin-bottom: 6rem;
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


          @media (max-width: 1000px) {
            font-size: 3.4rem;
            width: 30rem;
          }
        }

        .subheader, .subheader2 {
          font-family: 'Poppins', sans-serif;
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
            will-change: background-color;
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
            transition: color cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s, background-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s, border cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
            will-change: color, background-color, border;

            &:hover {
              color: var(--background-color-secondary);
              background-color: var(--text-color-main-dark);
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
    position: relative;
    height: auto;
    padding-top: 2rem;
    padding-bottom: 6rem;
    padding: 0rem 0.8rem 0rem 0.8rem;

    @media (max-width: 768px) {
      display: flex;
    }

    .icon {
        margin-top: 0rem;
        position: relative;
        width: clamp(16rem, 50vw, 18rem);
        height: clamp(13.5rem, 42vw, 15rem);
        overflow: hidden;
        z-index: 10;

        img {
            width: 100%;
        }
    }

    .img-container {
        display: flex;
        justify-content: center;
        height: 663px;
        position: absolute;
        width: 100%;
        overflow: hidden;
        z-index: 0;

        .image {
            position: relative;
            width: 1000px;
            height: 1000px;
            z-index: 0;
            top: -16rem;
            opacity: 30%;
            transform: scale(1.1);
        }
    }

    .header {
        font-family: 'Nunito', sans-serif;
        font-size: clamp(3rem, 8vw, 4rem);
        font-weight: 700;
        text-transform: uppercase;
        align-items: center;
        text-align: center;
        position: relative;
        top: -0.2rem;
        line-height: clamp(3rem, 12vw, 4rem);
        color: var(--text-color-main);
        margin-bottom: 2rem;
        z-index: 10;
    }

 

    .subheader, .subheader2 {
      text-align: center;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: clamp(1rem, 5vw, 1.3rem);
      color: var(--text-color-main);
      line-height: 1.8rem;
      max-width: 580px;
      z-index: 10;

      @media (max-width: 570px) {
        max-width: 460px;
      }


      .underline {
        font-style: oblique 8deg;
      }
    }

    .subheader {
        margin-top: 4rem;
        margin-bottom: 0.5rem;
        font-size: 1.4rem;
        font-weight: 600;
    }

    .subheader2 {
        font-style: oblique 4deg;
        padding-bottom: 2rem;
    }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    gap: 1rem;
    margin-bottom: 5rem;
    z-index: 1;

    .donation-button {
        padding-left: 2.2rem;
        padding-right: 2.2rem;
    }

    > * {
        padding-left: 2rem;
        padding-right: 2rem;
    }

    @media (max-width: 560px) {
        > :nth-child(1) {
            order: 2;
        }
    
        > :nth-child(2) {
            order: 1;
            flex-basis: auto;
        }
        
        > :nth-child(3) {
            order: 3;
        }
    }
    
    @media (max-width: 400px) {
        margin-bottom: 5rem;
    }
    
    button, a {
        height: 4rem;
        cursor: pointer;
        color: var(--background-color-main);
        background-color: var(--text-color-main);
        font-family: 'Nunito', sans-serif;
        color: var(--background-color-secondary);
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 2rem;
        border: none;
    }

    .view-projects-anchor {
        color: var(--text-color-main);
        border: 0.2rem solid var(--text-color-main);
        background-color: var(--background-color-main);
        height: calc(4rem - (0.2rem * 2));
        cursor: pointer;
    }

    .about-us-button {
        color: var(--text-color-main);
        border: 0.2rem solid var(--text-color-main);
        background-color: var(--background-color-main);
        height: calc(4rem - (0.2rem * 2));
        cursor: pointer;
    }
  }
}
</style>