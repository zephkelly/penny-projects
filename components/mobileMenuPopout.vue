<template>
    <ClientOnly>  
        <Transition name="fade">
            <section ref="section" v-show="modalEnabled" class="mobile-menu">
                <div class="clickoff-detector" @click="mobileMenuPopupOpen().value = false;">
                </div>
                <Transition name="scroll">
                    <div class="modal" :class="{ 'admin': isAdmin && isOnAdminPage }" v-show="modalEnabled">
                        <ul>
                            <li class="highlight" v-if="isAdmin === false">
                                <NuxtLink @click="clickDonateButton()">Donate</NuxtLink>
                            </li>
                            <li class="highlight" v-if="isAdmin === true">
                                <NuxtLink @click="mobileMenuPopupOpen().value = false;" to="/admin">Admin Panel</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink @click="mobileMenuPopupOpen().value = false;" to="/">Home</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink @click="mobileMenuPopupOpen().value = false;" to="/projects">Projects</NuxtLink>
                            </li>
                        </ul>
                    </div>
                </Transition>
            </section>
        </Transition>
    </ClientOnly> 
</template>

<script lang="ts" setup>
import { mobileMenuPopupOpen, donationPopupOpen } from '@/composables/usePopupStates';
import { useScroll } from '@/composables/useScroll';

const route = useRoute();
const { isAdmin, checkAuthStatus } = useAuth()
const isOnAdminPage = computed(() => route.path === '/admin')

const modalEnabled = ref(false);
function clickDonateButton() {
    mobileMenuPopupOpen().value = false;

    setTimeout(() => {
        donationPopupOpen().value = true;
    }, 101);
}

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

function scrollToAbout() {
    setTimeout(() => {
        smoothScroll('#approach', -360);
    }, 200);
}

watch(mobileMenuPopupOpen(), (newValue) => {
    if (newValue) {
        openPopout();
    }
    else
    {
        closePopout();  
    }
});
</script>

<style scoped lang="scss">
    section {
        top: 3rem;
        position: fixed;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        background-color: rgba(163, 163, 163, 0.6);
        backdrop-filter: blur(10px);
        transition: backdrop-filter 0.56s cubic-bezier(0.25, 0.1, 0.25, 1);
        overflow-y: auto;
        z-index: 99;
        
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
        width: 440px;
        height: auto;
        position: relative;
        width: 100%;
        z-index: 10;
        padding: 1rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        border-radius: 16px;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        background-color: var(--background-color-main);
        box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.25);

        &.admin {
            background-color: var(--background-color-secondary);

            ul {
                li {
                    background-color: var(--background-color-secondary);

                    &:hover {
                        background-color: var(--text-color-main-lighter);
                    }
                }
            }
        }

        * {
            display: flex;
            align-items: center;
        }

        ul {
            width: 100%;
            // list-style-type: none;
            flex-direction: column;
            gap: 1rem;

            li {
                width: 100%;
                height: 3rem;
                font-family: 'Poppins', sans-serif;
                background-color: var(--background-color-main);
                border-radius: 16px;
                transition: background-color 0.15s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.15s cubic-bezier(0.25, 0.1, 0.25, 1);

                &.highlight {
                    background-color: var(--text-color-main);

                    a {
                        color: var(--background-color-main);
                    }

                    &:hover {
                        background-color: var(--text-color-main-light);

                        a {
                            color: var(--text-color-main);
                        }
                    }
                }

                &:hover {
                    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.25);
                    background-color: var(--text-color-main-light);
                }

                a {
                    box-sizing: border-box;
                    padding: 0.2rem;
                    padding-right: 1rem;
                    padding-left: 1rem;
                    justify-content: flex-end;
                    width: 100%;
                    height: 100%;
                    font-weight: 500;
                    color: var(--text-color-main);
                    cursor: pointer;
                    border-radius: 16px;
                    border: 2px solid var(--text-color-main);
                    transition: color 0.15s cubic-bezier(0.25, 0.1, 0.25, 1);
                }
            }
        }
    }

    // .fade-enter-active, .fade-leave-active {
    //     transition: opacity 0.15s cubic-bezier(0.25, 0.1, 0.25, 1);
    // }

    // .fade-enter-from, .fade-leave-to {
    //     opacity: 0;
    // }

    // .fade-enter-to, .fade-leave-from {
    //     opacity: 1;
    // }

    //Make transition that slides own from top
    .scroll-enter-active, .scroll-leave-active {
        transition: transform 0.15s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .scroll-enter-from, .scroll-leave-to {
        transform: translateY(-100%);
    }

    .scroll-enter-to, .scroll-leave-from {
        transform: translateY(0);
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.15s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0%;
    }

    .fade-enter-to, .fade-leave-from {
        opacity: 100%;
    }
</style>