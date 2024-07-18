<template>
    <Transition name="fade">
      <section ref="section" v-show="modalEnabled" class="mobile-menu">
        <div class="clickoff-detector" @click="closePopout()">
        </div>
          <div class="modal" >
          </div>
      </section>
    </Transition>
</template>

<script lang="ts" setup>
import { mobileMenuPopupOpen } from '@/composables/usePopupStates';
const modalEnabled = ref(false);

function openPopout() {
    modalEnabled.value = true;
}

function closePopout() {
    modalEnabled.value = false;
}

watch(mobileMenuPopupOpen(), (newValue, oldValue) => {
    if (newValue) {
        document.body.style.overflow = 'hidden';
        openPopout();
    }
    else
    {
        document.body.style.overflow = 'visible';
        closePopout();
    }
});
</script>

<style scoped lang="scss">
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
        z-index: 300;
        
        .clickoff-detector {
            top: 0;
            position: fixed;
            width: 100%;
            height: 100%;
            cursor: pointer;
            z-index: 9;
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