<template>
    <section class="donation" id="donation">
        <img src="~/assets/images/donations-1.webp" alt="A group of student gathered in a circle celebrating, lifting their arms to the sky." loading="lazy">
        <div class="container">
            <div class="group">
            </div>
            <div class="group">
            <h3>Together We Can</h3>
            <p>To realise these transformative projects, we depend on generous donors who share our commitment.</p>
            <p><em>Your contributions provide necessary resources for successful project implementation, making a lasting impact on lives and creating a ripple effect beyond borders.</em></p>
            <!-- <DonationPicker/> -->
            <button class="donation-button" @click="openDonationWindow()">
                <h5>Make a donation</h5>
            </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
function openDonationWindow() {
  donationPopupOpen().value = true;
}
</script>

<style lang="scss">
.donation {
    height: auto;
    background-color: var(--background-color-main);
    position: relative;
    overflow: hidden;
    padding: 0rem 1rem 0rem 1rem;


    .container {
      padding-left: 0rem;
      padding-right: 0rem;
      display: grid;
      grid-template-columns: 1fr 1fr;

      @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        grid-template-columns: 1fr;
        padding-left: 0rem;
      }

      .group {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        &:last-child {
          align-items: flex-start;
          padding-left: 4rem;
          padding-top: 8rem;
          padding-bottom: 8rem;

          @media (max-width: 1000px) {
            padding-left: 3rem;
          }

          @media (max-width: 768px) {
            padding-top: 31.5rem;
            padding-left: 0rem;
            padding-right: 0rem;
            padding-bottom: 7rem;
            
            width: 90vw;
            align-items: center;
          }
        }

        h3 {
          font-family: 'Nunito', sans-serif;
          font-size: 2.8rem;
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

        p {
          font-family: 'Poppins', sans-serif;
          font-size: 1.2rem;
          line-height: 1.7rem;
          text-align: left;
          color: var(--text-color-main);

          &:first-of-type {
            margin-bottom: 1rem;
          }

          em {
            font-weight: 600;
            font-style: oblique 2deg;
          }

          @media (max-width: 1000px) {
            font-size: 1rem;
          }

          @media (max-width: 768px) {
            text-align: center;
          }
        }

      }
    }

    .donation-button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 4rem;
      width: 18rem;
      background-color: var(--text-color-main);
      padding: 0.5rem;
      border: none;
      border-radius: 10rem;
      margin-top: 4rem;
      overflow: hidden;
      transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
      cursor: pointer;

      @media (max-width: 768px) {
        margin-left: 0rem;
        margin-top: 5rem;
      }

      h5 {
        position: relative;
        font-family: "Nunito", sans-serif;
        font-weight: 600;
        font-size: 1.15rem;
        letter-spacing: 0.05rem;;
        text-transform: uppercase;
        color: ghostwhite;
        margin-right: 0.7rem;
        transition: opacity cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
      }

      img {
        position: relative;
        top: -0.1rem;
        height: 6rem;
        width: auto;
        pointer-events: none;
        transition: opacity cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
      }

      &:hover {
        background-color: var(--text-color-main-dark);
      }
    }

    img {
      position: absolute;
      width: 50%;
      left: 0;
      top: 0;
      height: 100%;
      object-fit: cover;

      @media (max-width: 768px) {
        left: 0;
        right: 0;
        top: 0;
        width: 100%;
        height: clamp(12rem, 100%, 26rem);
      }
    }
  }
</style>