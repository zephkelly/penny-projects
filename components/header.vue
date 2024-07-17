<template>
    <header ref="header" :class="{ 'admin': isAdmin && isOnAdminPage }" v-show="isLoaded">
        <div class="container">
            <nuxt-link :to="{ path: '/' }" @click.prevent="scrollToTop" class="logo-link">
                <img class="logo" ref="logoHeader" src="~/assets/images/penny-project-header.png" alt="Penny Project Logo" title="The Penny Project" style="top:50px; width:auto; height:6rem;" loading="lazy"/>
            </nuxt-link>
            <section class="navigation" ref="navHeader" style="top:70px;">
                <ul class="nav-list">
                    <Transition name="fade">
                        <NuxtLink :to="{ path: '/projects', hash: ''}" ref="viewProjectsButton" class="view-projects-anchor" v-if="enableHeaderButtons">
                            <h5>Our Projects</h5>
                        </NuxtLink>
                    </Transition>
                    <Transition name="fade" v-if="!isAdmin">
                        <button ref="donationButton" class="donation-button" v-if="enableHeaderButtons" @click="donationPopupOpen().value = true;">
                            <h5>Donate</h5>
                        </button>
                    </Transition>
                    <Transition name="fade" v-if="isAdmin && !isMobile">
                        <NuxtLink :to="{ path: '/projects/edit', hash: ''}"  ref="editProjectsButton" class="edit-projects-anchor" v-if="enableHeaderButtons">
                            <h5>Edit Projects</h5>
                        </NuxtLink>
                    </Transition>
                    <Transition name="fade" v-if="isAdmin">
                        <NuxtLink :to="{ path: '/admin', hash: ''}"  ref="adminPanelButton" class="view-admin-button" v-if="enableHeaderButtons">
                            <h5 v-if="isMobile">Admin Panel</h5>
                            <h5 v-else>View Admin Panel</h5>
                        </NuxtLink>
                    </Transition>
                </ul>
                <!-- <img class="menu" src="~/assets/svg/icons/menu-burger.svg" style="display: none;" /> -->
            </section>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { donationPopupOpen } from '@/composables/donationPopupStates';
import { useScroll } from '@/composables/useScroll'

const { scrollToTop } = useScroll()
const { isAdmin } = useAuth()

const isLoaded = ref(false);
const isMobile = ref(false);
const lastScrollPosition = ref(0);

// Are we on admin page?
const route = useRoute();
const isOnAdminPage = computed(() => route.path === '/admin');

// Header functionality
const header: Ref = ref(null);
const logoHeader: Ref = ref(null);
const navHeader: Ref = ref(null);

const donationButton: Ref = ref(null);
const enableHeaderButtons: Ref = ref(false);

let scrollTop = 0;
let logoStartTop = 0;
let logoStartHeight = 0;
let navStartTop = 0;
let navStartHeight = 0;

function adjustNavbar () {
    if(!header.value || !logoHeader.value || !navHeader.value) return;

    const currentScrollPosition = window.scrollY;
    scrollTop = window.scrollY;
    logoHeader.value.style.top = `${logoStartTop - scrollTop}px`;
    navHeader.value.style.top = `${navStartTop - scrollTop}px`;

    // Mobile view


    if (scrollTop > logoStartTop - 10) {
        logoHeader.value.style.height = `3.1rem`;
        logoHeader.value.style.top = `-0px`;
        logoHeader.value.style.left = `-30px`;

        navHeader.value.style.transition = 'top 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)'
        navHeader.value.style.top = `0px`;

        header.value.style.boxShadow = `0px 0px 30px 0px rgba(0,0,0,0.25)`;

        enableHeaderButtons.value = true;
    } else {
        logoHeader.value.style.transition = ``;
        logoHeader.value.style.height = `${logoStartHeight}rem`;
        logoHeader.value.style.left = ``;

        navHeader.value.style.transition = ``;

        header.value.style.boxShadow = ``;

        enableHeaderButtons.value = false;
    }

    if (window.innerWidth <= 768) {
        if (scrollTop > logoStartTop - 10) {
            header.value.style.opacity = 1;
            logoHeader.value.style.opacity = 1;
        }
        else {
            header.value.style.opacity = 0;
            logoHeader.value.style.opacity = 0;
        }
    }

    lastScrollPosition.value = scrollTop;
}

function adjustNavbarStyle() {
    isMobile.value = window.innerWidth <= 768;
    if (window.innerWidth > 768) return;
    logoHeader.value.style.height = `3.1rem`;
    logoHeader.value.style.top = `-0px`;
    logoHeader.value.style.left = `-30px`;
    navHeader.value.style.transition = 'top 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)'
    navHeader.value.style.top = `0px`;
    header.value.style.boxShadow = `0px 0px 30px 0px rgba(0,0,0,0.25)`;
    enableHeaderButtons.value = true;
}

onMounted(async () => {
    isLoaded.value = true;

    logoStartTop = parseInt(logoHeader.value.style.top);
    logoStartHeight = parseInt(logoHeader.value.style.height);
    navStartTop = parseInt(navHeader.value.style.top);
    navStartHeight = parseInt(navHeader.value.style.height);

    adjustNavbarStyle();
    adjustNavbar();

    window.addEventListener('scroll', () => {
        adjustNavbar();
    });

    window.addEventListener('resize', () => {
        adjustNavbarStyle();
    });
});
</script>

<style lang="scss" scoped>
  header {
        position: fixed;
        width: 100%;
        display: flex;
        justify-content: center;
        max-height: 3.2rem;
        background-color: #eae6d7;
        transition: box-shadow ease-out 0.2s, opacity cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
        z-index: 100;

        &.admin {
            background-color: var(--background-color-secondary);
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
    transition: top 0.2s cubic-bezier(0.075, 0.82, 0.165, 1), height 0.2s cubic-bezier(0.075, 0.82, 0.165, 1), left 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  .navigation {
    display: flex;
    position: relative;
    align-items: center;
    width: auto;
    padding: 0.4rem;
    padding-right: 0rem;
    
    .nav-list {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        flex-direction: row;
        height: 100%;

        @media (max-width: 768px) {
            gap: 0.5rem;
        }
    }

    .donation-button, .view-admin-button, .edit-projects-anchor {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-top: 0.1rem;
        padding-left: 1.2rem;
        padding-right: 1.2rem;
        background-color: var(--text-color-main);
        border: none;
        border-radius: 2rem;
        //   width: 7rem;
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

        @media (max-width: 768px) {
            padding-left: 0.8rem;
            padding-right: 0.8rem;
        }
    }

    .view-projects-anchor {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.1rem;
        padding-left: 1.2rem;
        padding-right: 1.2rem;
        background-color: transparent;
        border: none;
        border-radius: 1rem;
        font-family: 'Nunito', sans-serif;
        font-weight: 600;
        letter-spacing: 0.05rem;
        font-size: 0.9rem;
        color: var(--text-color-main);
        text-transform: uppercase;
        transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s, color cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s, opacity cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
        cursor: pointer;
    
        &:hover {
            color: var(--background-color-secondary);
            background-color: var(--text-color-main-dark);
        }

        @media (max-width: 768px) {
            padding-left: 0.8rem;
            padding-right: 0.8rem;
        }
    }

    h5 {
        text-align: center;
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
