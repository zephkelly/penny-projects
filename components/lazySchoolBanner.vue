<template>
    <section class="banner">
        <img src="~/assets/images/school-banner.webp" alt="Aerial image Riverside Secondary Highschool, Zambia" loading="lazy">
    </section>
</template>

<style scoped lang="scss">
section {
    display: flex;
    justify-content: center;
}

.banner {
    height: 400px;
    overflow: hidden;

    @media (max-width: 768px) {
        height: 300px;
    }

    img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
}
</style>