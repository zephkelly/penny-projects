<template>
  <header>
    <div class="container">
      <nuxt-link>
        <img class="logo" ref="logoHeader" src="~/assets/svg/icons/penny-projects-logo.svg" alt="Penny Project Logo" title="The Penny Project" style="top: 6rem; width:30rem; height:6rem;" />
      </nuxt-link>
      <section class="navigation">
        <img class="menu" src="~/assets/svg/icons/menu-burger.svg" />
        <div v-if="signedIn" class="signedIn">
        </div>
        <div v-else class="signedOut">
          <img class="profile" src="~/assets/svg/icons/profile.svg" />
        </div>
      </section>
    </div>
  </header>
</template>

<script lang="ts" setup>
const signedIn = computed(() => {
  return false;
})

const logoHeader: Ref = ref(null);
let scrollTop = 0;
let newTopPosition = 0;
const scrollSpeedFactor = 1;

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrollTop = window.scrollY;
    newTopPosition = scrollTop * scrollSpeedFactor;
    logoHeader.value.style.top = `-${newTopPosition}px`;
  });
})
</script>

<style lang="scss" scoped>
  header {
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    max-height: 3.2rem;
    background-color: #fdeec8;
  }

  .container {
    height: 3.2rem;
    justify-content: space-between;
  }

  .logo {
    height: 3.5rem;
    position: relative;
    left: -3.5rem;
  }

  .navigation {
    display: flex;
    padding: 0.6rem;
    padding-right: 0.8rem;
    align-items: center;
    justify-content: space-between;
    width: 4.6rem;

    div {
      height: 100%;
      width: 1.8rem;
    }

    img {
      height: 100%;
    }

    img.menu {
      height: 100%;
    }
  }
</style>

