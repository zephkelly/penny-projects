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
                    <svg class="loading-spinner" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M482-160q-134 0-228-93t-94-227v-7l-64 64-56-56 160-160 160 160-56 56-64-64v7q0 100 70.5 170T482-240q26 0 51-6t49-18l60 60q-38 22-78 33t-82 11Zm278-161L600-481l56-56 64 64v-7q0-100-70.5-170T478-720q-26 0-51 6t-49 18l-60-60q38-22 78-33t82-11q134 0 228 93t94 227v7l64-64 56 56-160 160Z"/></svg>
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
const redirectPath = ref('');

onMounted(() => {
    checkQueryParams();
});

function checkQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');

    if (redirect) {
        redirectPath.value = redirect;
        urlParams.delete('redirect');

        const newUrl = new URL(window.location.href);
        newUrl.search = urlParams.toString();
        
        window.history.replaceState({}, '', newUrl.toString());
    }
}

const clearErrorMessage = () => {
    displayError.value = false;
};

const login = async () => {
    isLoading.value = true;

    const response = await $fetch<{data: { statusCode: number, statusMessage: string;}}>('/api/auth/login', {
        method: 'POST',
        body: {
            email: email.value,
            password: password.value
        },
        credentials: 'include'
    });

    isLoading.value = false;

    if (response.data.statusCode === 200) {
        if (redirectPath.value !== '/login' && redirectPath.value !== '') 
        {
            navigateTo(redirectPath.value + '?' + 'toast=' + response.data.statusMessage);
            return;
        }

        navigateTo('/admin?toast=' + response.data.statusMessage);
    } else {
        displayError.value = true;
        errorMessage.value = response.data.statusMessage;
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