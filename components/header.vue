<template>
  <header ref="header">
    <div class="container">
      <nuxt-link :to="{ path: '/', hash: '#hero-section'} " class="logo-link">
        <img class="logo" ref="logoHeader" src="~/assets/svg/penny-project-header.png" alt="Penny Project Logo" title="The Penny Project" style="top:50px; width:auto; height:6rem;" loading="lazy"/>
      </nuxt-link>
      <section class="navigation" ref="navHeader" style="top:70px;">
        <Transition name="fade">
          <button ref="donationButton" class="donation-button" v-if="enableDonationButton" @click="donationPopupOpen().value = true;">
            <h5>Donate</h5>
          </button>
        </Transition>
        <!-- <img class="menu" src="~/assets/svg/icons/menu-burger.svg" style="display: none;" /> -->
      </section>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { donationPopupOpen } from '@/composables/donationPopupStates';

const signedIn = computed(() => {
  return false;
})

const header: Ref = ref(null);
const logoHeader: Ref = ref(null);
const navHeader: Ref = ref(null);

const donationButton: Ref = ref(null);
const enableDonationButton: Ref = ref(false);

let scrollTop = 0;
let logoStartTop = 0;
let logoStartHeight = 0;
let navStartTop = 0;
let navStartHeight = 0;

onMounted(() => {
  logoStartTop = parseInt(logoHeader.value.style.top);
  logoStartHeight = parseInt(logoHeader.value.style.height);
  navStartTop = parseInt(navHeader.value.style.top);
  navStartHeight = parseInt(navHeader.value.style.height);

  window.addEventListener('onload', () => {
    adjustNavbar();
  });

  window.addEventListener('scroll', () => {
    adjustNavbar();
  });

  function adjustNavbar () {
    scrollTop = window.scrollY;
    logoHeader.value.style.top = `${logoStartTop - scrollTop}px`;
    navHeader.value.style.top = `${navStartTop - scrollTop}px`;

    if (scrollTop > logoStartTop - 10) {
      logoHeader.value.style.transition = `top 0.2s cubic-bezier(0.075, 0.82, 0.165, 1), height 0.2s cubic-bezier(0.075, 0.82, 0.165, 1), left 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)`;
      logoHeader.value.style.height = `3.1rem`;
      logoHeader.value.style.top = `-0px`;
      logoHeader.value.style.left = `-30px`;

      navHeader.value.style.transition = 'top 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)'
      navHeader.value.style.top = `0px`;

      header.value.style.boxShadow = `0px 0px 30px 0px rgba(0,0,0,0.25)`;

      enableDonationButton.value = true;
    } else {
      logoHeader.value.style.transition = ``;
      logoHeader.value.style.height = `${logoStartHeight}rem`;
      logoHeader.value.style.left = ``;

      navHeader.value.style.transition = ``;

      header.value.style.boxShadow = ``;

      enableDonationButton.value = false;
    }
  }
})
</script>

<style lang="scss" scoped>
  header {
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    max-height: 3.2rem;
    background-color: #eae6d7;
    transition: box-shadow ease-out 0.2s;
    z-index: 100;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .container {
    height: 3rem;
    justify-content: space-between;
    padding: 0rem 1rem 0rem 1rem;
    width: 100%;
  }

  .logo-link {
    cursor: pointer;
    position: relative;
    width: 10rem;
  }

  .logo {
    height: 3.2rem;
    left: -3.6rem;
    width: auto;
    position: relative;
    transition: height 0.2s cubic-bezier(0.075, 0.82, 0.165, 1), left 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  .navigation {
    display: flex;
    position: relative;
    padding: 0.6rem;
    padding-right: 0rem;
    align-items: center;
    justify-content: flex-end;
    width: 6rem;

    .donation-button {
      padding-top: 0.1rem;
      background-color: var(--text-color-main);
      border: none;
      border-radius: 1rem;
      height: 112%;
      width: 100%;
      font-family: 'Nunito', sans-serif;
      font-weight: 600;
      letter-spacing: 0.05rem;
      font-size: 0.9rem;
      color: ghostwhite;
      text-transform: uppercase;
      transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s, opacity cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
      cursor: pointer;

      &:hover {
        background-color: var(--text-color-main-dark);
      }
    }

    div {
      height: 100%;
      width: 1.2rem;
    }

    img {
      height: 100%;
    }

    img.menu {
      height: 90%;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to, .fade-leave-from {
    opacity: 1;
  }
</style>
