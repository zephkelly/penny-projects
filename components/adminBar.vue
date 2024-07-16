<template>
    <section id="adminBar">
        <div class="container">
            <h1>Admin Bar</h1>
            <button @click="toggleDialogue">Toggle Admin Panel</button>
            <div v-if="dialogueOpen" @close="dialogueOpen = false" class="admin-popup">
                <h2>Admin Panel</h2>
                <p>Admin panel content goes here</p>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>

const dialogueOpen = ref(false);

function toggleDialogue() {
    dialogueOpen.value = !dialogueOpen.value;
}
</script>

<style scoped lang="scss">
section {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1000;

    .container {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        position: absolute;
        right: 0;
        top: 120px;
    }
}


.admin-popup {
    position: fixed; // Keeps the element fixed relative to the viewport
    top: 100px; // Distance from the top of the viewport
    right: 20px; // Distance from the right of the viewport
    z-index: 100; // Ensures the dialogue is above other content
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    width: 300px; // Sets a fixed width for the dialogue
    max-height: 90vh; // Ensures the dialogue doesn't exceed the viewport height
    overflow-y: auto;
}
</style>