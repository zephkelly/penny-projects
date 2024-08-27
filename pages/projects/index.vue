<template>
    <section class="projects component" style="justify-content: center">
        <div class="container">
            <h1 class="header">Our Projects</h1>
            <h2 class="subheader">We believe that small actions can lead to big changes. Our projects, both ongoing and completed, demonstrate the collective power of people like you. Read more about our work below.</h2>
            
            <div class="wrapper featured">
                <div class="group">
                    <ProjectsFeaturedCarousel :slides="data"/>
                </div>
            </div>
            <div class="wrapper latest">
                <div class="group feed">
                    <ProjectsTile :postData="data[i-1]" v-for="i in data.length"/>
                </div>
            </div>
            <ClientOnly>
                <ProjectsAdminPanel v-if="isAdmin" />
            </ClientOnly>
            <InstaFeed />
        </div>
    </section>
</template>

<script setup lang="ts">
const data = [
    {
        title: '1 Building Peggy and her family a new home.',
        description: 'This is a description of project 1 and im going to make it a bit longer so that I can stress test this portion of the UI. I need to understand the wrapping behaviour.',
        image: '/images/test_image.jpg',
        dominantColor: 'rgb(193, 193, 193)',
        textColor: '#000000',
        link: '/',
        status: 'ongoing',
        authorAvatar: '/images/profile-author.webp',
        authorName: 'Joel Slade'
    },
    {
        title: '2 This is something different for a change.',
        description: 'This is a description of project 1 and im going to make it a bit longer so that I can stress test this portion of the UI. I need to understand the wrapping behaviour.',
        image: '/images/test_image.jpg',
        dominantColor: 'rgb(193, 193, 193)',
        textColor: '#000000',
        link: '/',
        status: 'ongoing',
        authorAvatar: '/images/profile-author.webp',
        authorName: 'Joel Slade'
    },
    {
        title: '3 Yet another different headline for a project.',
        description: 'This is a description of project 1 and im going to make it a bit longer so that I can stress test this portion of the UI. I need to understand the wrapping behaviour.',
        image: '/images/test_image.jpg',
        dominantColor: 'rgb(193, 193, 193)',
        textColor: '#000000',
        link: '/',
        status: 'ongoing',
        authorAvatar: '/images/profile-author.webp',
        authorName: 'Joel Slade'
    },
    {
        title: '4 And we finally bring it to a close',
        description: 'This is a description of project 1 and im going to make it a bit longer so that I can stress test this portion of the UI. I need to understand the wrapping behaviour.',
        image: '/images/test_image.jpg',
        dominantColor: 'rgb(193, 193, 193)',
        textColor: '#000000',
        link: '/',
        status: 'ongoing',
        authorAvatar: '/images/profile-author.webp',
        authorName: 'Joel Slade'
    },
];

const { isAdmin } = useAuth();
</script>

<style lang="scss" scoped>
section {
    min-height: 500px;

    .container {
        margin-top: 14rem;
        flex-direction: column;
        width: 100%;
    }
}

.subheader {
    font-family: 'Poppins', sans-serif;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--text-color-main);
    margin-bottom: 4rem;
    margin-top: 1.5rem;
}


.wrapper {
    flex-direction: column;
    margin-bottom: 8rem;
}

.featured {
    .group {
        display: flex;
        box-sizing: border-box;
        position: relative;
    }
}

.latest {
    display: flex;
    flex-direction: row;
    margin-bottom: 6rem;

    .group.feed {
        gap: 1.2rem;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        box-sizing: border-box;

        > article:last-child {
            > .spacer {
                display: none;
            }
        }
    }

    .group.notifications {
        display: flex;
        flex: 1;
        padding-left: 1rem;
    }
}

h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.8rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
    color: var(--text-color-main);
}

</style>

<style lang="scss">
.latest {
    .group.feed {
        > article:last-child {
            margin-bottom: 0rem;

            > .spacer {
                display: none;
            }
        }
    }
}

article.regular, article.featured {
    .tag {
        font-family: 'Inter', sans-serif;
        font-size: 0.7rem;
        height: 0.7rem;
        max-height: 1.8rem;
        font-weight: 600;
        text-align: center;
        padding: 0.4rem 0.8rem;
        width: auto;
        border-radius: 8px;
        background-color: #ab351815;
        border: 1px solid #8e351fd2;
        color: #8e351fd0;
    
        &::first-letter {
            text-transform: uppercase;
        }
    
        // &.completed {
        //     background-color: #ab351815;
        //     border: 1px solid #8e351fd2;
        //     color: #8e351fd0;
        // }
    
        // &.ongoing, &.active {
        //     background-color: #4f92111c;
        //     border: 1px solid #4c6a30de;
        //     color: #4c6a30d1;
        // }
    
        // &.proposed {
        //     background-color: #ab621815;
        //     border: 1px solid #e0810ed4;
        //     color: #c3710ed8;
        // }
    }
}
</style>