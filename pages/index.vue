<template>
    <hero/>
    <instaFeed/>
    <mission/>
    <Approach/>
    <Donation/>
    <founder/>
    <join/>
    <schoolBanner/>
    <email/>
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

//@ts-ignore
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