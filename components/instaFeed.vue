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
            <p class="caption text-ellipsis"><span class="account">pennyprojectsrs</span>{{ post.caption }}</p>
          </div>
          <svg class="heart-icon unliked" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m480 935-41-37q-105.768-97.121-174.884-167.561Q195 660 154 604.5T96.5 504Q80 459 80 413q0-90.155 60.5-150.577Q201 202 290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.423Q880 322.845 880 413q0 46-16.5 91T806 604.5Q765 660 695.884 730.439 626.768 800.879 521 898l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712 630 750.5 580t54-89.135q15.5-39.136 15.5-77.72Q820 347 778 304.5T670.225 262q-51.524 0-95.375 31.5Q531 325 504 382h-49q-26-56-69.85-88-43.851-32-95.375-32Q224 262 182 304.5t-42 108.816Q140 452 155.5 491.5t54 90Q248 632 314 698t166 158Zm0-297Z"/></svg>
          <svg class="heart-icon liked" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m480 935-41-37q-106-97-175-167.5t-110-126Q113 549 96.5 504T80 413q0-90 60.5-150.5T290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.5T880 413q0 46-16.5 91T806 604.5q-41 55.5-110 126T521 898l-41 37Z"/></svg>
          <!-- <img src="~/assets/svg/heart-material-icon.svg" class="heart-icon" loading="lazy" v-if="post.caption != null" /> -->
          <!-- <img src="~/assets/svg/heart-material-icon.svg" class="heart-icon no-caption" v-else /> -->
          <div class="black-background"></div>
        </a>
      </div> 
    </div>
  </section>
</template>

<script setup lang="ts">
const { pending, data: posts } = useFetch<Array<any>>('https://feeds.behold.so/7QlDYCOmJbnFHJOqMn9L', {
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
  height: 380px;
  margin-top: 2rem;
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

        .heart-icon.liked {
          opacity: 1;
        }
        .heart-icon.unliked {
          opacity: 0;
        }
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
        height: 75px;
        background-color: var(--background-color-secondary);

        .caption {
          width: 80%;
          padding: 0.7rem 0.5rem 0.5rem 0.7rem;
          color: black;
          font-family: Arial, sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          text-align: left;
          z-index: 1;

          span.account {
            font-weight: 700;
            margin-right: 0.3rem;

            &:hover {
              color: rgb(155, 145, 145);
            }
          }
        }

        .text-ellipsis {
          display: -webkit-box;
          -webkit-line-clamp: 3; /* Number of lines to display */
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.5; /* Adjust line height for better readability */
          max-height: 2.8rem; /* Adjust max height as needed */
          text-overflow: ellipsis;
        }
      }

      .heart-icon {
        position: absolute;
        bottom: 2.55rem;
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