<template>
    <ClientOnly>
        <Transition name="fade">
            <section class="toast" ref="toast">
                <div class="container">
                    <div class="toast-content" v-show="toastPopupOpen">
                        <p class="toast-message">{{ toastMessageRef }}</p>
                    </div>
                </div>
            </section>
        </Transition>
    </ClientOnly>   
</template>

<script lang="ts" setup>
 const route = useRoute();

const toast = ref(null);
const toastPopupOpen = ref(false);
const toastMessageRef = ref('');

const checkQueryParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const toastMessage = urlParams.get('toast');

    if (toastMessage) {
        toastPopupOpen.value = true;
        toastMessageRef.value = toastMessage;
        window.history.replaceState({}, document.title, window.location.pathname);

        setTimeout(() => {
                toastPopupOpen.value = false;
                toastMessageRef.value = '';
        }, 6000);
    }
}

onMounted(() => {
    checkQueryParams();
});

watch(() => route.query, () => {
    checkQueryParams();
});
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

section.toast {
    position: fixed;
    width: 100%;
    z-index: 1000;
    cursor: none;
    pointer-events: none;
    
}

.container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 4rem;
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
        // text-align: justify;
    }
}

// localhost:3001?toastMessage=Sucessfully+signed+out+of+the+application+and+now+you+can+die
</style>