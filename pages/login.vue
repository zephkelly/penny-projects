<template>
    <section class="login">
        <div class="container"> 
            <h1>Login below</h1>
            <form @submit.prevent="login">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" @input="clearErrorMessage" required>
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" @input="clearErrorMessage" required>
                <button type="submit">Login</button>
            </form>
            <p class="login-message" v-if="displayError">{{ errorMessage }}</p>
        </div>
    </section>
</template>

<script setup lang="ts">
const email = ref('');
const password = ref('');

const displayError = ref(false);
const errorMessage = ref('');

const clearErrorMessage = () => {
    displayError.value = false;
};

const login = async () => {
    try {
        const { data, error } = await useFetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        });

        if (error.value) {
            displayError.value = true;
            errorMessage.value = "Invalid email or password. Please try again.";
        }

        if (data.value) {
            console.log('Success:', data.value);
            navigateTo('/admin');
        }

    } catch (error) {
        console.error('An error occurred', error);
    }
};
</script>

<style scoped lang="scss">
section {
    display: flex;
    justify-content: center;
    height: 100vh;
    min-height: 800px;

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 10rem;
        margin-bottom: 10rem;
        height: auto;
    }
}

h1 {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 2rem;
    margin-bottom: 3rem;
    color: var(--text-color-main);
}

form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 20rem;

    label {
        font-family: 'Nunito', sans-serif;
        font-size: 1.2rem;
    }

    input {
        padding: 0.5rem;
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }

    button {
        padding: 0.5rem;
        font-size: 1.2rem;
        background-color: var(--text-color-main);
        color: var(--background-color-secondary);
        border-radius: 18px;
        cursor: pointer;
    }
}

.login-message {
    font-family: 'Nunito', sans-serif;
    font-size: 1.2rem;
    color: red;
    margin-top: 1rem;
}
</style>