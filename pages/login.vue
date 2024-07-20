<template>
    <section class="login">
        <div class="container"> 
            <h1>Login below</h1>
            <form @submit.prevent="login">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" @input="clearErrorMessage" required>
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" @input="clearErrorMessage" required>
                <button class="submit" type="submit" v-if="isLoading === false">Login</button>
                <div class="submit loading" v-else>
                    <img class="loading-spinner" src="~/assets/svg/loading.svg" alt="Loading spinner" width="20" height="20">
                </div>
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
const isLoading = ref(false);

const clearErrorMessage = () => {
    displayError.value = false;
};

const login = async () => {
    isLoading.value = true;

    try {
        const { data } = await $fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        }).catch((error) => {
            displayError.value = true;
            errorMessage.value = error.statusMessage;
        });

        if (data.value) {
            navigateTo('/admin?toast=Logged in successfully.');
        }

    } catch (error) {

    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped lang="scss">
section {
    display: flex;
    justify-content: center;
    min-height: 700px;

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: clamp(12rem, 35vh, 14rem);
        height: auto;

        @media (max-width: 768px) {
            margin-top: clamp(8rem, 25vh, 10rem);
        }
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

    .submit {
        padding: 0.5rem;
        font-size: 1.2rem;
        background-color: var(--text-color-main);
        color: var(--background-color-secondary);
        border-radius: 18px;
        border: none;
        cursor: pointer;

        &.loading {
            font-family: 'Nunito', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgb(130, 130, 130);
            cursor: not-allowed;

            .loading-spinner {
                animation: spin 2s linear infinite;
            }

            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        }   
    }
    
}

.login-message {
    font-family: 'Nunito', sans-serif;
    font-size: 1.2rem;
    color: red;
    margin-top: 1rem;
}
</style>