<template>
    <ClientOnly>
        <section class="toast component" ref="toast" >
            <Transition name="fade">
                <div class="container" :class="mobileNavOpenStyle" v-show="toastPopupOpen">
                    <div class="toast-content">
                        <p class="toast-message">{{ toastMessageRef }}</p>
                    </div>
                </div>
            </Transition>
        </section>
    </ClientOnly>   
</template>

<script lang="ts" setup>
import { isNavbarOpen } from '@/composables/useNavbarStates';

const route = useRoute();

const toast = ref(null);
const toastPopupOpen = ref(false);
const toastMessageRef = ref('');

const mobileNavOpenStyle = computed(() => isNavbarOpen().value ? '' : 'nav-collapsed');

let toastTimer: number | null = null;

const showToast = (message: string) => {
  if (toastTimer !== null) {
    clearTimeout(toastTimer);
  }

  toastPopupOpen.value = true;
  toastMessageRef.value = message;

  toastTimer = window.setTimeout(() => {
    toastPopupOpen.value = false;
    toastTimer = null;

    setTimeout(() => {
        toastMessageRef.value = '';
    }, 300);
  }, 6000);
};

const checkQueryParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const toastMessage = urlParams.get('toast');

    if (toastMessage) {
        showToast(toastMessage);

        urlParams.delete('toast');
        const newUrl = new URL(window.location.href);
        newUrl.search = urlParams.toString();
        window.history.replaceState({}, '', newUrl.toString());
    }
}

onMounted(() => {
    checkQueryParams();
});

watch(() => route.query, () => {
    checkQueryParams();
});

onBeforeUnmount(() => {
    if (toastTimer !== null) {
        clearTimeout(toastTimer);
    }
});
</script>

<style scoped lang="scss">


section.toast {
    position: fixed;
    width: 100%;
    z-index: 1000;
    cursor: none;
    pointer-events: none;
    padding-left: 0rem;
    padding-right: 0rem;
}

.container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 4rem;
    margin-left: 1rem;
    margin-right: 1rem;
    transition: margin-top cubic-bezier(0.075, 0.82, 0.165, 1) 0.4s;

    &.nav-collapsed {
        margin-top: 4.6rem;

        @media (max-width: 768px) {
            margin-top: 1rem;
        }
    }
}

.toast-content {
    display: block;
    height: auto;
    width: auto;
    max-width: 14rem;
    padding: 1rem;
    background-color: var(--background-color-secondary);
    border-radius: 1rem;
    box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.5);

    .toast-message {
        font-family: 'Poppins', sans-serif;
        color: var(--text-color-main);
        font-size: 1rem;
        margin: 0rem;
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.45s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.fade-enter-from, .fade-leave-to {
    transition-duration: 0.3s;
    opacity: 0%;
}

.fade-enter-to, .fade-leave-from {
    opacity: 100%;
}
</style>