<template>
    <section class="instagram-feed component">
        <div class="container" :class="{ unloaded: status === 'pending' }">
            <h2 class="action-call">
                <div class="group">
                    Follow our
                    <span class="hide">work on</span>
                    Instagram
                </div>
                <a target="_blank" href="https://www.instagram.com/pennyprojectsrs/">@pennyprojectsrs</a>
            </h2>
            <Transition name="fade"> 
                <div class="feed-container unloaded" v-if="status === 'pending'">
                    <div class="post-container unloaded" v-for="i in 3">
                        <div class="caption-background">
                            <p class="caption text-ellipsis unloaded"><span class="account">pennyprojectsrs</span>...</p>
                        </div>
                        <svg class="heart-icon unliked" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m480 935-41-37q-105.768-97.121-174.884-167.561Q195 660 154 604.5T96.5 504Q80 459 80 413q0-90.155 60.5-150.577Q201 202 290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.423Q880 322.845 880 413q0 46-16.5 91T806 604.5Q765 660 695.884 730.439 626.768 800.879 521 898l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712 630 750.5 580t54-89.135q15.5-39.136 15.5-77.72Q820 347 778 304.5T670.225 262q-51.524 0-95.375 31.5Q531 325 504 382h-49q-26-56-69.85-88-43.851-32-95.375-32Q224 262 182 304.5t-42 108.816Q140 452 155.5 491.5t54 90Q248 632 314 698t166 158Zm0-297Z"/></svg>
                        <svg class="heart-icon liked" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m480 935-41-37q-106-97-175-167.5t-110-126Q113 549 96.5 504T80 413q0-90 60.5-150.5T290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.5T880 413q0 46-16.5 91T806 604.5q-41 55.5-110 126T521 898l-41 37Z"/></svg>
                    </div>
                </div>
                <div class="active-wrapper" v-else>
                    <div class="feed-container api-inactive" v-if="isApiActive === true">
                        <article class="post-container">
                            <a target="_blank" :href="post.permalink" v-for="post in posts">
                                <img class="post" :src="post.thumbnailUrl" v-if="post.thumbnailUrl != null" loading="lazy"/>
                                <img class="post" :src="post.mediaUrl" v-else loading="lazy"/>
                                <div class="caption-background" v-if="post.caption != null">
                                    <p class="caption text-ellipsis"><span class="account">pennyprojectsrs</span>{{ post.caption }}</p>
                                </div>
                                <svg class="heart-icon unliked" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m480 935-41-37q-105.768-97.121-174.884-167.561Q195 660 154 604.5T96.5 504Q80 459 80 413q0-90.155 60.5-150.577Q201 202 290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.423Q880 322.845 880 413q0 46-16.5 91T806 604.5Q765 660 695.884 730.439 626.768 800.879 521 898l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712 630 750.5 580t54-89.135q15.5-39.136 15.5-77.72Q820 347 778 304.5T670.225 262q-51.524 0-95.375 31.5Q531 325 504 382h-49q-26-56-69.85-88-43.851-32-95.375-32Q224 262 182 304.5t-42 108.816Q140 452 155.5 491.5t54 90Q248 632 314 698t166 158Zm0-297Z"/></svg>
                                <svg class="heart-icon liked" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m480 935-41-37q-106-97-175-167.5t-110-126Q113 549 96.5 504T80 413q0-90 60.5-150.5T290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.5T880 413q0 46-16.5 91T806 604.5q-41 55.5-110 126T521 898l-41 37Z"/></svg>
                                <div class="black-background"></div>
                            </a>
                        </article>
                    </div>
                    <div class="feed-container" v-else>
                        <article class="post-container">
                            <a target="_blank" href="https://www.instagram.com/reel/C5UXQcBhdOR/">
                                <img class="post" src="~/assets/images/instaFeed1.webp" loading="lazy" alt="Image of Austry, a disabled man from Zambia, as he poses for the camera amongst his home."/>
                                <div class="caption-background">
                                    <p class="caption text-ellipsis"><span class="account">pennyprojectsrs</span>Meet Austry, his ability to remain positive in the midst of hardship is inspiring.</p>
                                </div>
                                <svg class="heart-icon unliked" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m480 935-41-37q-105.768-97.121-174.884-167.561Q195 660 154 604.5T96.5 504Q80 459 80 413q0-90.155 60.5-150.577Q201 202 290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.423Q880 322.845 880 413q0 46-16.5 91T806 604.5Q765 660 695.884 730.439 626.768 800.879 521 898l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712 630 750.5 580t54-89.135q15.5-39.136 15.5-77.72Q820 347 778 304.5T670.225 262q-51.524 0-95.375 31.5Q531 325 504 382h-49q-26-56-69.85-88-43.851-32-95.375-32Q224 262 182 304.5t-42 108.816Q140 452 155.5 491.5t54 90Q248 632 314 698t166 158Zm0-297Z"/></svg>
                                <svg class="heart-icon liked" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m480 935-41-37q-106-97-175-167.5t-110-126Q113 549 96.5 504T80 413q0-90 60.5-150.5T290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.5T880 413q0 46-16.5 91T806 604.5q-41 55.5-110 126T521 898l-41 37Z"/></svg>
                            </a>
                        </article>
                        <article class="post-container">
                            <a target="_blank" href="https://www.instagram.com/reel/C4UjO32Lzce/">
                                <img class="post" src="~/assets/images/instaFeed2.webp" loading="lazy" alt="Image of Peggy and her two children, as they pose for the camera in front of their home."/>
                                <div class="caption-background">
                                    <p class="caption text-ellipsis"><span class="account">pennyprojectsrs</span>Meet Peggy, as a mother of 6, she works hard to provide for her family. This means spending countless hours selling charcoal by the road side.</p>
                                </div>
                                <svg class="heart-icon unliked" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m480 935-41-37q-105.768-97.121-174.884-167.561Q195 660 154 604.5T96.5 504Q80 459 80 413q0-90.155 60.5-150.577Q201 202 290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.423Q880 322.845 880 413q0 46-16.5 91T806 604.5Q765 660 695.884 730.439 626.768 800.879 521 898l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712 630 750.5 580t54-89.135q15.5-39.136 15.5-77.72Q820 347 778 304.5T670.225 262q-51.524 0-95.375 31.5Q531 325 504 382h-49q-26-56-69.85-88-43.851-32-95.375-32Q224 262 182 304.5t-42 108.816Q140 452 155.5 491.5t54 90Q248 632 314 698t166 158Zm0-297Z"/></svg>
                                <svg class="heart-icon liked" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m480 935-41-37q-106-97-175-167.5t-110-126Q113 549 96.5 504T80 413q0-90 60.5-150.5T290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.5T880 413q0 46-16.5 91T806 604.5q-41 55.5-110 126T521 898l-41 37Z"/></svg>
                            </a>
                        </article>
                        <article class="post-container">
                            <a target="_blank" href="https://www.instagram.com/reel/C4KJ7MPLG3W/">
                                <img class="post" src="~/assets/images/instaFeed3.webp" loading="lazy" alt="Daniel is pictured riding his bike down a small dirt path snaking between thick green grass."/>
                                <div class="caption-background">
                                    <p class="caption text-ellipsis"><span class="account">pennyprojectsrs</span>Daniel is relying on this bike to make the 3km journey to school. Without it, his disability will see him unable to access education. For people like Daniel little gifts are having a big impact.</p>
                                </div>
                                <svg class="heart-icon unliked" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m480 935-41-37q-105.768-97.121-174.884-167.561Q195 660 154 604.5T96.5 504Q80 459 80 413q0-90.155 60.5-150.577Q201 202 290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.423Q880 322.845 880 413q0 46-16.5 91T806 604.5Q765 660 695.884 730.439 626.768 800.879 521 898l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712 630 750.5 580t54-89.135q15.5-39.136 15.5-77.72Q820 347 778 304.5T670.225 262q-51.524 0-95.375 31.5Q531 325 504 382h-49q-26-56-69.85-88-43.851-32-95.375-32Q224 262 182 304.5t-42 108.816Q140 452 155.5 491.5t54 90Q248 632 314 698t166 158Zm0-297Z"/></svg>
                                <svg class="heart-icon liked" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m480 935-41-37q-106-97-175-167.5t-110-126Q113 549 96.5 504T80 413q0-90 60.5-150.5T290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.5T880 413q0 46-16.5 91T806 604.5q-41 55.5-110 126T521 898l-41 37Z"/></svg>
                            </a>
                        </article>
                    </div>
                </div>
            </Transition>
        </div>
    </section>
</template>

<script setup lang="ts">
const { status, data: posts, error } = await useLazyAsyncData<Array<any>>('posts', () => $fetch('https://feeds.behold.so/7QlDYCOmJbnFHJOqMn9L'));

const isApiActive: Ref<boolean> = ref(false);

watch(status, (value) => {
    if (value === 'pending') {
        isApiActive.value = false;
        return;
    }

    if (value === 'error') {
        isApiActive.value = false;
        return;
    }

    checkApiStatus();
})


async function checkApiStatus() {
    try {
        const postsValue = posts.value as Array<any>;
        const mediaUrl = postsValue[0].mediaUrl;

        const isMediaUrlActive = await $fetch<any>(mediaUrl, { method: 'HEAD' });
        isApiActive.value = isMediaUrlActive.status !== 403;
    }
    catch (error) {
        isApiActive.value = false;
    }
}
</script>

<style lang="scss" scoped>
section.instagram-feed {
    display: flex;
    justify-content: center;
    background-color: var(--background-color-main);
    overscroll-behavior: none;
    padding: 0rem 1rem 0rem 1rem;
    overflow-x: hidden;
    margin-top: 2rem;
    margin-bottom: 6rem;
    position: relative;

    @media (max-width: 850px) {
        padding: 0rem;
    }

    @media (max-width: 768px) {
        margin-bottom: 5rem;
    }

    .container {
        position: relative;
        max-width: 1000px;
        flex-direction: column;
        box-sizing: border-box;
        overflow-y: hidden;

        &.unloaded {
            min-height: calc(420px + 6.5rem);

            @media (max-width: 850px) {
                min-height: calc(70vw + 6.5rem);
            }

            @media (max-width: 560px) {
                min-height: calc(110vw + 6.5rem);
            }
        }
    }
}

.feed-container {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    box-sizing: border-box;
    gap: 2rem;
    overflow-x: auto;
    padding-bottom: 20px;

    &.unloaded {
        width: 100%;
        position: absolute;
        margin-top: 4.1rem;

        @media (max-width: 850px) {
            margin-top: 4.54rem;
        }
    }

    @media (max-width: 850px) {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    @media (max-width: 768px) {
        overflow: auto;
        scrollbar-width: none; 
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
            display: none;
        }
    }
}

@media (max-width: 850px) and (pointer: fine) {
    .feed-container {
        overflow-x: auto;
        scrollbar-width: thin;
        -ms-overflow-style: auto;
        scrollbar-color: var(--text-color-main) var(--background-color-secondary);
        
        &::-webkit-scrollbar {
            display: block;
            height: 12px;
        }
        
        &::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
        }

        &::-webkit-scrollbar-track {
            background-color: #f1f1f1; // Scrollbar track color
        }
    }
}
    
.post-container {
    height: 420px;
    box-sizing: border-box;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &.unloaded {
        background-color: var(--background-color-main-dark);
    }

    @media (max-width: 850px) {
        height: 60vw;
        min-width: 40vw;
    }

    @media (max-width: 560px) {
        height: 90vw;
        min-width: 65vw;
    }


    &:nth-child(n + 4) {
        display: none;
    }

    &:hover {
        box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.05);

        .heart-icon.liked {
        opacity: 1;
        }
        .heart-icon.unliked {
        opacity: 0;
        }
    }

    a {
        flex: 1;
    }
    
    .post {
        flex: 1;
        position: relative;
        object-fit: cover;
        // border-top-left-radius: 8px;
        // border-top-right-radius: 8px;
        
        transition: transform 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
        
        &:hover {
            opacity: 0.95;
            transform: scale(1.02);
        }
    }

    .caption-background {
        display: flex;
        bottom: -1px;
        left: -1px;
        right: -1px;
        position: absolute;
        height: 75px;
        background-color: var(--background-color-secondary);
        padding: 0.5rem;

        .caption {
            width: 87%;
            height: 100%;
            padding: 0rem 0.5rem 0.5rem 0.2rem;
            color: black;
            font-family: 'Segoe UI', sans-serif;
            font-size: 0.8rem;
            font-weight: 400;
            text-align: left;
            z-index: 1;

            span.account {
                font-family: 'Segoe UI', sans-serif;
                font-weight: 600;
                margin-right: 0.3rem;
                transition: color 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);

                &:hover {
                    color: rgb(155, 145, 145);
                }
            }
        }

        .text-ellipsis {
        display: -webkit-box;
        line-clamp: 3;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 1.5;
        max-height: 2.8rem;
        text-overflow: ellipsis;
        }
    }

    .heart-icon {
        position: absolute;
        bottom: 3.55rem;
        right: 0.7rem;
        height: 1.2rem;
        width: 1.2rem;
        z-index: 1;
        transition: opacity 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);

        &.no-caption {
        filter: invert(100%);
        }
    }

    .heart-icon.liked {
        opacity: 0;
        fill: red;
    }

    .black-background {
        position: absolute;
        background-color: black;
        height: 100%;
    }
}
    
    
.action-call {
    width: 100%;
    font-family: 'Poppins', sans-serif;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--text-color-main);
    margin-bottom: 1rem;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    line-height: 1.3rem;
    height: 3rem;

    .hide {
        margin-left: 0.1rem;
    }

    @media (max-width: 850px) {
        padding-left: 1rem;
        padding-right: 1rem;
        margin-bottom: 1.5rem;

        .hide {
            display: none;
        }
    }
    
    a {
        margin-left: 0.5rem;
        color: var(--text-color-main);
        text-decoration: none;
        transition: color 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);

        @media (max-width: 768px) {
            color: var(--text-color-tertiary);
            height: 1.25rem;
            font-size: 1.3rem;
        }
        
        &:hover {
            color: var(--text-color-secondary);
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.fade-enter-from, .fade-leave-to {
    opacity: 0%;
}

.fade-enter-to, .fade-leave-from {
    opacity: 100%;
}
</style>