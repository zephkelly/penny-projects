<template>
    <section class="banner">
        <img src="~/assets/images/logo-pennyprojects-round.webp" alt="Penny-Projects round logo banner" loading="lazy">
    </section>
</template>

<style lang="scss" scoped>
section {
    display: flex;
    justify-content: center;
}

.banner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 540px;
    background-color: var(--background-color-secondary);

    img {
        height: 400px;
        width: auto;
    }

    @media (max-width: 786px) {
        height: 420px;

        img {
            height: 300px;
        }
    }
}
</style>