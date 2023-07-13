<template>
  <header>
    <nuxt-link>
      <img class="logo" src="~/assets/svg/penny-project-header.svg" alt="Penny Project Logo" title="The Penny Project" />
    </nuxt-link>
    <section class="navigation">
      <img class="menu" src="~/assets/svg/icons/menu-burger.svg" />
      <div v-if="signedIn" class="signedIn">
      </div>
      <div v-else class="signedOut">
        <img class="profile" src="~/assets/svg/icons/profile.svg" />
      </div>
    </section>
  </header>
</template>

<script lang="ts" setup>
const signedIn = computed(() => {
  return false;
})
</script>

<style lang="scss" scoped>
  header {
    max-height: 3.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #fdeec8;

    > * {
      display: flex;
    }
  }

  .logo {
    height: 3.2rem;
    width: 16rem;
    position: relative;
    left: -1.5rem;
  }

  .navigation {
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

