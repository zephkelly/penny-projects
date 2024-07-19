<template>
    <header ref="header" :class="{ 'admin': isAdmin && isOnAdminPage }" v-show="isLoaded">
        <div class="container">
            <nuxt-link :to="{ path: '/' }" @click.prevent="() => { scrollToTop();  mobileMenuPopupOpen().value = false; }" class="logo-link">
                <img class="logo" ref="logoHeader" src="~/assets/images/penny-project-header.png" alt="Penny Project Logo" title="The Penny Project" style="top:50px; width:auto; height:6rem;" loading="lazy"/>
            </nuxt-link>
            <section class="navigation" ref="navHeader" style="top:70px;">
                <div class="mobile" v-if="isMobile">
                    <button class="menu-button" @click="mobileMenuPopupOpen().value = !mobileMenuPopupOpen().value;">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>
                    </button>
                </div>
                <div class="desktop" v-else>
                    <ul class="nav-list">
                        <Transition name="fade">
                            <NuxtLink :to="{ path: '/projects', hash: ''}" ref="viewProjectsButton" class="view-projects-anchor" v-show="enableHeaderButtons">
                                <h5>Our Projects</h5>
                            </NuxtLink>
                        </Transition>
                        <Transition name="fade" v-if="!isAdmin">
                            <button ref="donationButton" class="donation-button" @click="donationPopupOpen().value = !donationPopupOpen().value;" v-show="enableHeaderButtons">
                                <h5>Donate</h5>
                            </button>
                        </Transition>
                        <Transition name="fade" v-if="isAdmin">
                            <NuxtLink to="/projects/edit"  ref="editProjectsButton" class="edit-projects-anchor" v-show="enableHeaderButtons">
                                <h5>Edit Projects</h5>
                            </NuxtLink>
                        </Transition>
                        <Transition name="fade" v-if="isAdmin">
                            <NuxtLink :to="{ path: '/admin', hash: ''}"  ref="adminPanelButton" class="view-admin-button" v-show="enableHeaderButtons">
                                <h5 >View Admin Panel</h5>
                            </NuxtLink>
                        </Transition>
                    </ul>
                </div>
            </section>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { donationPopupOpen, mobileMenuPopupOpen } from '~/composables/usePopupStates';
import { useScroll } from '@/composables/useScroll'

const { scrollToTop } = useScroll()
const { isAdmin } = useAuth()

const isLoaded = ref(false);
const isMobile = ref(false);

// Are we on admin page?
const route = useRoute();
const isOnAdminPage = computed(() => route.path === '/admin');

// Header functionality
const header: Ref = ref(null);
const logoHeader: Ref = ref(null);
const navHeader: Ref = ref(null);

const donationButton: Ref = ref(null);
const enableHeaderButtons: Ref = ref(false);

function adjustNavbar () {
    if(!header.value || !logoHeader.value || !navHeader.value) return;
    
    mobileNavbar();
    desktopNavbar();
}

let logoStartTop = 0;
let logoStartHeight = 0;
let navStartTop = 0;
const isDesktopNavbarLandingStyled = ref(false);
const isDesktopNavbarRegularStyled = ref(false);
function desktopNavbar() {
    if (isMobile.value === true) return;

    adjustDesktopNavbarStyle();
}

function adjustDesktopNavbarStyle() {
    if (isMobile.value === true) return;
    mobileMenuPopupOpen().value = false;
    
    // Regular scrolling desktop navbar
    if (window.scrollY > logoStartTop - 10) {
        if (isDesktopNavbarRegularStyled.value) return;
        logoHeader.value.style.height = `3.1rem`;
        logoHeader.value.style.top = `-0px`;
        logoHeader.value.style.left = `-30px`;
        navHeader.value.style.top = `0px`;
        header.value.style.boxShadow = `0px 0px 30px 0px rgba(0,0,0,0.25)`;
        enableHeaderButtons.value = true;
        
        isDesktopNavbarRegularStyled.value = true;
        isDesktopNavbarLandingStyled.value = false;
        isMobileNavbarStyled.value = false;
        return;
    }

    // Landing 'docked' desktop navbar
    if (isDesktopNavbarLandingStyled.value) return;
    header.value.style.transform = '';
    header.value.style.boxShadow = ``;
    logoHeader.value.style.top = `${logoStartTop}px`;
    logoHeader.value.style.transition = ``;
    logoHeader.value.style.height = `${logoStartHeight}rem`;
    logoHeader.value.style.left = ``;
    navHeader.value.style.top = `${navStartTop}px`;
    navHeader.value.style.transition = ``;
    enableHeaderButtons.value = false;

    isDesktopNavbarLandingStyled.value = true;
    isDesktopNavbarRegularStyled.value = false;
    isMobileNavbarStyled.value = false;
}

let lastScrollPosition = 0;
function mobileNavbar() {
    if (isMobile.value === false) return;

    if (window.scrollY > lastScrollPosition) {
        hideNavbar(true);
    } else {
        hideNavbar(false);
    }

    if (window.scrollY < 1) {
        hideNavbar(true);
    }

    lastScrollPosition = window.scrollY;
}

const isMobileNavbarStyled = ref(false);
function adjustMobileNavbarStyle() {
    if (isMobile.value === false) return;
    if (isMobileNavbarStyled.value) return;

    logoHeader.value.style.height = `3.1rem`;
    logoHeader.value.style.top = `-0px`;
    logoHeader.value.style.left = `-30px`;
    navHeader.value.style.transition = 'top 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)'
    navHeader.value.style.top = `0px`;
    header.value.style.boxShadow = `0px 0px 30px 0px rgba(0,0,0,0.25)`;
    enableHeaderButtons.value = true;

    isDesktopNavbarLandingStyled.value = false;
    isDesktopNavbarRegularStyled.value = false;
    isMobileNavbarStyled.value = true;
}

const isNavbarCollapsed = ref(false);
function hideNavbar(shouldHide: boolean) {
    if (shouldHide) {
        if (isNavbarCollapsed.value) return;
        isNavbarCollapsed.value = true;
        header.value.style.transform = `translateY(-100%)`;
    } else {
        if (!isNavbarCollapsed.value) return;
        isNavbarCollapsed.value = false;
        header.value.style.transform = `translateY(0)`;
    }
}

onMounted(async () => {
    isLoaded.value = true;
    isMobile.value = window.innerWidth <= 768;

    logoStartTop = parseInt(logoHeader.value.style.top);
    logoStartHeight = parseInt(logoHeader.value.style.height);
    navStartTop = parseInt(navHeader.value.style.top);

    adjustMobileNavbarStyle();
    adjustNavbar();

    window.addEventListener('scroll', () => {
        adjustNavbar();
    });

    window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth <= 768;
        adjustNavbar();
        adjustMobileNavbarStyle();
        adjustDesktopNavbarStyle();
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
        transition: box-shadow ease-out 0.2s, opacity cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s, transform ease-in-out 0.2s;
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
    align-items: center;
    padding: 0.4rem;
    padding-right: 0rem;
    transition: top 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
    
    .desktop {
        display: flex;
        height: 100%;

        .nav-list {
            display: flex;
            justify-content: space-between;
            gap: 1rem;

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
    }

    .mobile {
        height: 100%;

        .menu-button {
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            border-radius: 1rem;
            width: auto;
            height: 100%;
            background-color: var(--text-color-main);
            padding: 0rem;
            cursor: pointer;

            svg {
                height: 80%;
                width: auto;
                fill: white;
            }
        }
    }
}
    
h5 {
    text-align: center;
}

// div {
//     height: 100%;
//     width: 1.2rem;
// }

img {
    height: 100%;
}

img.menu {
    height: 90%;
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
