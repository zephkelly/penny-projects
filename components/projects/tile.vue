<template>
    <article class="project regular">
        <div class="container info">
            <div class="group author">            
                <div class="wrapper profile">
                    <img :src="postData?.authorAvatar" alt="author avatar"/>
                </div>
                <div class="wrapper name">
                    <p>{{ postData?.authorName }}</p>
                </div>
            </div>
            <div class="group status">
            </div>
        </div>
        <div class="container main">
            <div class="group content">
                <h5>{{ postData?.title }}</h5>
                <h6>{{ postData?.description }}</h6>
                <div class="social">
                    <div>
                        <span class="tag" :class="postData?.status">{{ postData?.status }}</span>
                    </div>
                    <div>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="group cover">
                <div class="wrapper">
                    <img :src="postData?.image" alt="project image"/>
                </div>
            </div>
        </div>
        <div class="spacer"></div>
    </article>
</template>


<script setup lang="ts">
defineProps({
    postData: Object
})
</script>

<style lang="scss" scoped>
article {
    display: grid;
    grid-template-rows: calc(26px + 1.2rem) 180px;
    position: relative;
    box-sizing: border-box;
    cursor: pointer;

    .container.info {
        // max-width: calc(((700px - 240px) - 8%) - 6%);
        display: grid;
        grid-template-columns: 1fr 0.2fr;
        margin-bottom: 1.2rem;
        align-items: end;

        .group.author {
            display: flex;
            justify-content: flex-start;
            flex: 1;
            
            .wrapper {
                &.profile {
                    display: flex;
                    height: 1.6rem;
                    width: 1.6rem;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 0.5rem;
                }

                &.name {
                    color: var(--main);
                    font-family: 'Poppins', 'Inter', sans-serif;
                    font-size: 0.8rem;
                    font-weight: 500;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }

        .group.status {
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            min-width: 100px;
        }
    }

    .container.main {
        display: flex;
        flex-direction: row;

        .group {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &.cover {
                max-height: 100%;
                width: 240px;
                display: flex;
                flex: 0 0 auto;
                margin-left: 6%;

                .wrapper {
                    width: 100%;
                    height: 100%;
                    border-radius: 12px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        object-position: center;
                        transition: transform 0.3s;
                        will-change: transform;
                    }
                }
            }

            &.content {
                color: var(--main);
                flex: 1;
                overflow: hidden;
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;

                h5 {
                    font-family: 'Poppins', 'Inter', sans-serif;
                    font-weight: 600;
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                }

                h6 {
                    font-family: 'Nunito', sans-serif;
                    line-height: 20px;
                    max-height: 40px;
                    display: -webkit-box;
                    line-clamp: 3;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    max-height: 4rem;
                    text-overflow: ellipsis;
                    color: var(--main);
                    margin-bottom: auto;
                    opacity: 0.8;
                    text-rendering: optimizeLegibility;
                }

                a {
                    text-decoration: none;
                    font-weight: bold;
                }

                .social {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    min-height: 2rem;

                    > div {
                        display: flex;
                        justify-content: flex-start;
                        align-items: flex-end;
                    }

                    > div:last-child {
                        justify-content: flex-end;

                        button {
                            border: none;
                            background-color: transparent;
                            cursor: pointer;

                            svg {
                                width: 24px;
                                height: 24px;
                                fill: var(--main);
                            }
                        }
                    }
                }
            }
        }
    }

    .spacer {
        width: 90%;
        position: relative;
        border-bottom: 1px solid var(--main5);
        margin-top: 1.5rem;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }
}

article:hover {
    .container.main {
        .group {
            &.cover {
                .wrapper {
                    img {
                        transform: scale(1.02);
                    }
                }
            }
        }
    }
}

.tag {
}
</style>