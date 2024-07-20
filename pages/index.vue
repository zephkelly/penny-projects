<template>
    <hero/>
    <instaFeed/>
    <lazyMission/>
    <lazyApproach/>
    <lazyDonation/>
    <lazyFounder/>
    <lazyJoin/>
    <lazySchoolBanner/>
    <lazyEmail/>
</template>

<script lang="ts" setup>
import { useScroll } from '@/composables/useScroll';
const { smoothScroll } = useScroll();
const route = useRouter();

const checkQueryParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const aboutMobile = urlParams.get('aboutMobile');

    if (aboutMobile) {
        console.log("SCROLL")
        smoothScroll('#approach', -360);
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

onMounted(() => {
    checkQueryParams();
});

watch(() => route.path, () => {
    checkQueryParams();
});
</script>

<style lang="scss">
    section {
        display: flex;
        justify-content: center;
    }
</style>