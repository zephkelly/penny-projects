<template>
    <section class="tileset">
        <div class="container featured">
            <h2>Featured Projects</h2>
            <div class="group">
                <ProjectsFeaturedTile :postData="data[i-1]" v-for="i in 3"/>
            </div>
        </div>
        <div class="container latest">
            <div class="group feed">
                <ProjectsTile :postData="data[i-1]" v-for="i in data.length"/>
            </div>
            <div class="group notifications">

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const data = [
    {
        title: 'Building Peggy and her family a new home.',
        description: 'This is a description of project 1 and im going to make it a bit longer so that I can stress test this portion of the UI. I need to understand the wrapping behaviour.',
        image: '/images/instaFeed2.webp',
        link: '/',
        status: 'ongoing',
        authorAvatar: '/images/profile-author.webp',
        authorName: 'Joel Slade'
    },
    {
        title: 'Helping Simon get a prosthetic leg.',
        description: 'This is a description of project 2',
        image: '/images/cover1.JPG',
        link: '/',
        status: 'active',
        authorAvatar: '/images/profile-author.webp',
        authorName: 'Joel Slade'
    },
    {
        title: 'Project 3',
        description: 'This is a description of project 3',
        image: '/images/instaFeed1.webp',
        link: '/',
        status: 'proposed',
        authorAvatar: '/images/profile-author.webp',
        authorName: 'Joel Slade'
    },
    {
        title: 'Project 4',
        description: 'This is a description of project 4',
        image: '/images/instaFeed1.webp',
        link: '/',
        status: 'completed',
        authorAvatar: '/images/profile-author.webp',
        authorName: 'Joel Slade'
    }
];
</script>

<style lang="scss" scoped>
.tileset {
    flex-direction: column;
}

.container {
    flex-direction: column;
    margin-bottom: 8rem;
}

.featured {
    .group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        box-sizing: border-box;
        gap: 1.5rem;
    }
}

.latest {
    display: flex;
    flex-direction: row;

    .group.feed {
        max-width: 800px;
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
