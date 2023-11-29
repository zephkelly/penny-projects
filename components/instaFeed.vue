<template>
  <section class="instagram-feed unloaded" v-if="pending">

  </section>
  <section class="instagram-feed" v-else>
    <div class="container">
      <h2 class="header">Follow our work on Instagram <a target="_blank" href="https://www.instagram.com/pennyprojectsrs/">@pennyprojectsrs</a></h2>
      <div class="feed-container">
        <a class="post-container" target="_blank" :href="post.permalink" :style="imageStyle" v-for="post in posts">
          <img class="post" :src="post.thumbnailUrl" v-if="post.thumbnailUrl != null" :style="imageStyle" loading="lazy"/>
          <img class="post" :src="post.mediaUrl" v-else :style="imageStyle" loading="lazy"/>
          <div class="caption-background" v-if="post.caption != null">
            <p class="caption text-ellipsis">{{ post.caption }}</p>
          </div>
          <img src="~/assets/svg/heart-material-icon.svg" class="heart-icon" loading="lazy" v-if="post.caption != null" />
          <img src="~/assets/svg/heart-material-icon.svg" class="heart-icon no-caption" v-else />
          <div class="black-background"></div>
        </a>
      </div> 
    </div>
  </section>
</template>

<script setup lang="ts">
const { pending, data: posts } = useFetch<Array<any>>('https://feeds.behold.so/OCVQKOrCsdvgXSxyxUQA', {
  lazy: true
});

const imageStyle = computed(() => {
  if (posts.value == null) return;

  const numberOfPosts = 3;
  const width = `calc(1000px / ${numberOfPosts})`;

  return { width };
});

console.log(posts.value);
</script>

<style lang="scss">
section.instagram-feed {
  height: 280px;
  margin-top: 3rem;
  margin-bottom: 11rem;
  padding: 0rem 1rem 0rem 1rem;
  background-color: var(--background-color-main);

  .container {
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .feed-container {
      height: 100%;
      justify-content: space-between;
    }
    
    .post-container {
      height: 100%;
      position: relative;
      margin-left: clamp(1rem, 1vw, 2rem);
      border-radius: 0.4rem;
      overflow: hidden;
      cursor: pointer;

      &:first-child {
        margin-left: 0;
      }
    
      &:nth-child(n + 4) {
        display: none;
      }

      &:hover {
        box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.05);
      }
      
      .post {
        height: 100%;
        
        position: relative;
        object-fit: cover;
        transition: transform 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
        
        &:hover {
          opacity: 0.95;
          transform: scale(1.02);
        }
      }

      .caption-background {
        bottom: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 55px;
        background-color: var(--background-color-secondary);

        .caption {
          width: 80%;
          padding: 0.5rem 0.5rem 0.5rem 0.5rem;
          color: black;
          font-family: 'Helvetica', Arial, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-align: left;
          z-index: 1;
        }

        .text-ellipsis {
          display: -webkit-box;
          -webkit-line-clamp: 2; /* Number of lines to display */
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.5; /* Adjust line height for better readability */
          max-height: 1.5rem; /* Adjust max height as needed */
          text-overflow: ellipsis;
        }
      }

      .heart-icon {
        position: absolute;
        bottom: 1.5rem;
        right: 0.5rem;
        height: 1.2rem;
        width: 1.2rem;
        z-index: 1;

        &.no-caption {
          filter: invert(100%);
        }
      }

      .black-background {
        position: absolute;
        background-color: black;
        height: 100%;
      }
    }
  }
  
  .header {
    width: 100%;
    font-family: 'Poppins', sans-serif;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--text-color-main);
    margin-bottom: 1rem;
    
    a {
      margin-left: 0.5rem;
      color: var(--text-color-main);
      text-decoration: none;
      transition: color 0.2s ease-in-out;
      
      &:hover {
        color: var(--text-color-secondary);
      }
    }
  }
}
</style>