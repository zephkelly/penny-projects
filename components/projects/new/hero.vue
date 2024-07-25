<template>
    <section class="new-project-hero component">
        <div class="container">
            <h1 class="header">Create New Project</h1>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.header {
    font-family: 'Nunito', sans-serif;
    font-size: 3.6rem;
    letter-spacing: 0.3rem;
    font-weight: 700;
    color: var(--text-color-main);
    text-transform: uppercase;

    @media (max-width: 768px) {
        font-size: clamp(3rem, 8vw, 4rem);
    }
}

section {
    margin-top: 14rem;
    margin-bottom: 4rem;
    background-color: var(--background-color-main);
    padding: 0rem 1rem 0rem 1rem;

    .container {
        flex-direction: column;
    }
}

.header {
    color: var(--admin);
}
</style>