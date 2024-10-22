<template>
    <section id="adminHero" class="component" v-if="isAdmin">
        <div class="container">
            <h1 class="header">Admin Panel</h1>
            <div>
                <h1>Delete Image Via Hash</h1>
                <form>
                    <button type="submit" @click.prevent="deleteImageViaHash()">Delete</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import ImageManager from '~/components/popups/manager/image.vue';
import { type Image } from '~/types/database';

const image = ref(null);

const imageManager = ref(null);
const selectedImage = ref<Image | null>(null);

// function onImageSelected(image: any) {
//   selectedImage.value = image;
//   console.log('Selected image:', image);
// }

async function deleteImageViaHash() {
    const hash = window.prompt('Insert Image Hash');

    if (!hash) {
        console.error('No hash provided');
        return;
    }

    const response = await useFetch('/api/delete/image', {
        method: 'POST',
        body: { deleteHash: hash }
    });
}

definePageMeta({
    middleware: ['admin']
})

const { isAdmin } = useAuth()
const isCheckingAuth = ref(true)

onMounted(async () => {
    isCheckingAuth.value = true;
    // await checkAuthStatus()
    isCheckingAuth.value = false
});
</script>

<style scoped lang="scss">
section {
    display: flex;
    justify-content: center;
    padding: 0rem 1rem 0rem 1rem;
    height: 1000px;
    background-color: var(--background-color-secondary);

    .container {
        display: flex;
        flex-direction: column;
        margin-top: 14rem;

        @media (max-width: 768px) {
            margin-top: 10rem;
        }
    }
}

.sub-header {
    font-family: 'Nunito', sans-serif;
    font-size: 1.2rem;
    letter-spacing: 0.3rem;
    font-weight: 700;
    color: var(--text-color-main);
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 1rem;

}

.header {
    color: var(--admin);
    margin-bottom: 2rem;
}
</style>