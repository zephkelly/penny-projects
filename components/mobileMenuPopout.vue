<template>
    <Transition name="fade">
      <section ref="section" v-if="modalEnabled" class="mobile-menu">
        <div class="clickoff-detector" @click="mobileMenuPopupOpen().value = false;">
        </div>
          <div class="modal">
            <div class="modal-content">
              <div class="modal-header">
                <button @click="mobileMenuPopupOpen().value = false;">Close</button>
              </div>
              <div class="modal-body">

              </div>
          </div>
          </div>
      </section>
    </Transition>
</template>

<script lang="ts" setup>
import { mobileMenuPopupOpen } from '@/composables/usePopupStates';
const modalEnabled = ref(false);

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
        background-color: rgba(94, 94, 92, 0.6);
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
        background-color: white;
        width: 100%;
        z-index: 10;
        padding: 1.5rem;
        padding-top: 2rem;
        margin-bottom: 12vh;
        border-radius: 16px;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        background-color: var(--background-color-main);
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