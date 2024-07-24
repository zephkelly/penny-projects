<template>
    <section id="adminHero" class="component" v-if="isAdmin">
        <div class="container">
            <h1 class="header">Admin Panel</h1>
            <div>
                <h1>Upload Image to Imgur</h1>
                <form @submit.prevent="handleFileUpload()">
                    <div>
                        <label for="image">Select an image:</label>
                        <input type="file" ref="image" required>
                    </div>
                    <button type="submit" @click.prevent="handleFileUpload()">Upload</button>
                </form>
            <!-- <div v-if="uploadedImage">
            <h2>Uploaded Image</h2>
            <img :src="uploadedImage.data.link" alt="Uploaded Image" />
            </div> -->
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
const image = ref(null);

async function handleFileUpload() {
    //@ts-ignore
    const imageFile = image.value.files[0];
    
    if (imageFile.length === 0) {
        console.log('No file selected');
        return;
    }
    
    if (!imageFile.type.startsWith('image/')) {
        console.error('File is not an image');
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = async () => {
        // @ts-ignore
        const base64Image = reader.result.split(',')[1]; // Remove the data:image/jpeg;base64, part

        // @ts-ignore
        const response = await useFetch('/api/upload/image', {
            method: 'POST',
            body: { image: base64Image }
        });
   
        console.log(response);
    };
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