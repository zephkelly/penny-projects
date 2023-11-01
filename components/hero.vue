<template>
  <section class="hero desktop" id="hero-section">
    <div class="container">
      <div class="group">
        <h1 class="header">Little Gifts, Big Impact</h1>
        <p class="subheader">Welcome to <em>Penny Projects</em>, a community of people dedicated to seeing a little go a long way.</p>
        <p class="subheader2">Our misson is both simple yet profound: nuture and inspire high school students from Riverside Secondary Highschool</p>
        <div class="buttons">
          <!-- <a href="https://www.paypal.com/donate/?business=68BXW94GZSSJJ&no_recurring=0&item_name=All+donations+go+towards+supporting+needs+in+the+local+community+in+Zambia&currency_code=AUD" id="donate-button" target="_blank">Donate Now</a> -->
          <a id="donate-button" @click="openDonationModal()" target="_blank">Donate Now</a>
          <NuxtLink :to="{ path: '/', hash: '#newsletter'} " id="newsletter-button" class="newsletter-button">Our Newsletter</NuxtLink>
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
    <p class="subheader2">Our misson is simple yet profound: nuture and inspire high school students from Riverside Secondary Highschool</p>
    <div class="buttons">
      <!-- <a href="https://www.paypal.com/donate/?business=68BXW94GZSSJJ&no_recurring=0&item_name=All+donations+go+towards+supporting+needs+in+the+local+community+in+Zambia&currency_code=AUD" id="donate-button2" target="_blank" class="donation-button">Donate Now</a> -->
      <a @click="openDonationModal()" id="donate-button2" target="_blank" class="donation-button">Donate Now</a>
      <NuxtLink :to="{ path: '/', hash: '#newsletter'} " id="newsletter-button2" class="newsletter-button">Our Newsletter</NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
function openDonationModal() {
  donationPopupOpen().value = true;
}
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
          font-size: 3.8rem;
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

          @media (max-width: 1000px) {
            font-size: 1.2rem;
          }
        }

        .subheader {
          font-weight: 600;
          padding-top: 2.2rem;

          @media (max-width: 1000px) {
            max-width: 26rem;
          }
        }
        

        .subheader2 {
          font-style: oblique 8deg;
          width: 28rem;
          font-size: 1.2rem;
          padding-top: 1.2rem;

          @media (max-width: 1000px) {
            width: 24rem;
          }
        }

        .buttons {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 30rem;
          margin-top: 5rem;

          button, a {
            background-color: var(--text-color-main);
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 2rem;
            height: 3.4rem;
            color: var(--background-color-secondary);
            font-family: 'Nunito', sans-serif;
            font-size: 1.1rem;
            font-weight: 600;
            letter-spacing: 0.06rem;
            text-transform: uppercase;
            transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;

            &:hover {
              background-color: var(--text-color-main-dark);
            }
          }

          #donate-button {
            width: 13rem;
            cursor: pointer;

            @media (max-width: 1000px) {
              width: 10.5rem;
            }
          }

          .newsletter-button {
            cursor: pointer;
            width: 15rem;

            @media (max-width: 1000px) {
              width: 13.5rem;
            }
          }
        }

        @media (max-width: 1000px) {
          .buttons {
            width: 25rem;

            button {
              font-size: 1rem;
              height: 3.5rem;
              width: 16rem;
            }

            a {
              font-size: 1rem;
              height: 3.5rem;
              width: 10rem;
            }
          }
        }
      }
    }
  
    img {
      position: relative;
      top: -7rem;
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
    padding-bottom: 6rem;

    @media (max-width: 768px) {
      display: flex;
    }

    .icon {
      position: relative;
      top: -3rem;
      width: clamp(15rem, 60vw, 25rem);
      height: clamp(10rem, 40vw, 16rem);
      overflow: hidden;

      img {
        width: 100%;
      }

      @media (max-width: 500px)
      {
        top: -2rem;
      }
    }

    .img-container {
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
    margin-top: 4rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .subheader2 {
    font-style: oblique 8deg;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
    width: 100%;

    @media (max-width: 768px) {
      width: 110%;
    }

    @media (max-width: 400px) {
      gap: 0.5rem;
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
        width: 9rem;

        @media (max-width: 400px) {
          width: 11rem;
        }
    }

    .newsletter-button {
      cursor: pointer;
      width: 12rem;

      @media (max-width: 400px) {
        width: 13rem;
      }
    }
  }
}
</style>