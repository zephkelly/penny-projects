<template>
  <Transition name="fade">
    <section ref="section" v-show="modalEnabled" class="donation-popout component">
      <div class="clickoff-detector" @click="donationPopupOpen().value = false;">
      </div>
        <div class="modal" >
          <button class="close" @click="donationPopupOpen().value = false;"><svg height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></button>
          <h4>Donation method:</h4>
          <div class="container">
            <p class="message">Your generous contributions will go towards supporting the local community in Zambia.</p>
            <div class="donation-methods">
              <a class="donation-button" target="_blank" href="https://www.paypal.com/donate/?business=68BXW94GZSSJJ&no_recurring=0&item_name=All+donations+go+towards+supporting+the+needs+of+the+local+community+in+Zambia&currency_code=AUD">
                <h5>Donate with</h5>
                <img class="paypal" src="~/assets/images/paypal.webp" alt="PayPal logo"/>
              </a>
              <a class="donation-button wise" target="_blank" href="https://wise.com/pay/me/joelphillips">
                <h5>Donate with</h5>
                <img class="wise" src="~/assets/svg/icon_wise.svg" alt="Wise logo"/>
              </a>
              <div class="divider">
                <div class="box"></div>
                <p class="or">or</p>
                <div class="box"></div>
              </div>
              <div class="bank-transfer">
                <h4 class="title">Bank Transfer</h4>
                <div class="background">
                  <div class="item">
                    <h5 class="name">Name:</h5>
                    <p class="name">Penny Projects</p>
                  </div>
                  <div class="item">
                    <h5 class="bsb">BSB:</h5>
                    <p class="bsb">062<span></span>643</p>
                  </div>
                  <div class="item">
                    <h5 class="account">Account:</h5>
                    <p class="account">1013<span></span>0969</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  </Transition>
</template>

<script lang="ts" setup>
import { donationPopupOpen } from '../composables/usePopupStates';

const section: Ref = ref(null);
const modalEnabled: Ref = ref(false);

function openPopout() {
    modalEnabled.value = true;

    document.body.style.overflow = 'hidden';
}

function closePopout() {
    modalEnabled.value = false;

    setTimeout(() => {
        document.body.style.overflow = 'visible';
    }, 100);
}

watch(donationPopupOpen(), (newValue, oldValue) => {
  if (newValue) {
    openPopout();
  }
  else
  {
    closePopout();
  }
});
</script>

<style lang="scss" scoped>
  section {
    top: 0;
    position: fixed;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: rgba(94, 94, 92, 0.6);
    backdrop-filter: blur(10px);
    transition: backdrop-filter 0.56s cubic-bezier(0.25, 0.1, 0.25, 1);
    overflow-y: scroll;
    scrollbar-width: thin;
    z-index: 300;
    padding-left: 0rem;
    padding-right: 0rem;

    .clickoff-detector {
      top: 0;
      position: fixed;
      width: 100%;
      height: 100%;
      cursor: pointer;
      z-index: 9;
    }
  }

  .modal {
    top: 12vh;
    position: relative;
    width: 440px;
    height: 650px;
    padding: 1.5rem;
    padding-top: 2rem;
    margin-bottom: 12vh;
    border-radius: 16px;
    background-color: var(--background-color-main);
    z-index: 10;

    @media (max-width: 768px) {
      top: 5vw;
      width: 80vw;
    }

    button.close {
      top: 8px;
      position: absolute;
      right: 0;
      margin: 1rem;
      border-radius: 5px;
      font-family: 'Nunito', sans-serif;
      background-color: var(--background-color-main);
      font-weight: 700;
      font-size: 1rem;
      border: none;
      cursor: pointer;

      svg {
        height: 2rem;
        width: auto;
        fill: rgb(23,23,23);
      }
    }

    h4 {
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: 1.5rem;
      color: rgb(23,23,23);
      margin-bottom: 1rem;
    }

    .container {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: calc(100% - 2.5rem);

      p.message {
        font-family: 'Nunito', sans-serif;
        font-weight: 400;
        font-size: 1.2rem;
        color: rgb(33, 33, 33);
        margin-top: 1.5rem;
        margin-bottom: 3rem;
      }

      .donation-methods {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100%;

        .donation-button {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 3rem;
          width: 17rem;
          background-color: #fdbb59;
          padding: 0.5rem;
          border-radius: 10rem;
          overflow: hidden;
          transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
            
          &.wise {
            background-color: #8ee456;
            margin-bottom: 1rem;

            &:hover {
                background-color: #72bd41;

                h5 {
                    opacity: 0.8;
                }

                img {
                    opacity: 0.8;
                }
            }

            h5 {
                color: black;
            }
          }
  
          h5 {
            position: relative;
            font-family: "Nunito", sans-serif;
            font-weight: 600;
            font-size: 1.1rem;
            color: #222b63;
            margin-right: 1rem;
            transition: opacity cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
          }
  
          img {
            top: -0.1rem;
            position: relative;
            height: 6rem;
            width: auto;
            pointer-events: none;
            transition: opacity cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
          }
  
          &:hover {
            background-color: #eaab4c;
  
            h5 {
              opacity: 0.8;
            }
  
            img {
              opacity: 0.9;
            }
          }
        }

        .divider {
          display: flex;
          flex-direction: row;
          width: 90%;
          justify-content: center;
          align-items: center;
          
          p.or {
            font-size: 1.1rem;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            margin: 0rem 1.6rem 0rem 1.6rem;
            opacity: 0.7;
          }

          .box {
            width: 100%;
            height: 0.1rem;
            background-color: rgb(23,23,23);
            opacity: 0.4;
            border-radius: 20rem;
          }
        }

        .bank-transfer {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          @media (max-width: 768px) {
            margin-left: 0rem;
          }

          .title {
            font-family: "Nunito", sans-serif;
            font-weight: 600;
            font-size: 1.3rem;
            color: rgb(53, 53, 53);
          }

          .background {
            border-radius: 1rem;
            width: 80%;
            height: 200px;
            max-height: 200px;
            background-color: var(--background-color-main-dark);
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            @media (max-width: 768px)
            {
              top: 40px;
              width: 100%;
            }
          }

          .item {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;

            &:first-of-type {
              margin-top: 1.5rem;
            }

            &:last-of-type {
              margin-bottom: 1.5rem;
            }

            h5 {
              font-family: 'Poppins', sans-serif;
              font-weight: 600;
              font-size: 1.1rem;
              color: rgb(53, 53, 53);
              margin-right: 1rem;
              width: 9rem;
              text-align: right;

              @media (max-width: 768px)
              {
                width: 7.5rem;
              }
            }

            p {
              font-family: 'Poppins', sans-serif;
              font-weight: 500;
              font-size: 1.1rem;
              color: rgb(53, 53, 53);

              span {
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.15s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to, .fade-leave-from {
    opacity: 1;
  }
</style>