<template>
  <Header/>
  <section class="hero">
    <div class="container">
      <div class="group">
        <h1 class="header">Little Gifts, Big Impact</h1>
        <p class="subheader">Welcome to <em>Penny Projects</em>, a community of people dedicated to seeing a little go a long way.</p>
        <div class="buttons">
          <button id="donate-button">Donate Now</button>
          <button>Learn More</button>
        </div>
      </div>
      <img src="/assets/images/hero-graphic-desktop.PNG" />
      <!-- <div class="group">
      </div> -->
    </div>
  </section>
  <section class="mission" style="">
    <div class="container">
      <h2>Our Mission</h2>
      <div class="group">
        <div class="descriptor">
          <img src="/assets/images/mission-graphic-1.JPG" alt="">
          <h3>Mentorship & Guidance</h3>
          <p>Our misson is to <em>nurture and inspire highschool students from Riverside Secondary School, empowering them through mentorship and guidance</em> to become proactive problem solvers and the drivinf force behind positive change in their community.</p>
        </div>
        <div class="descriptor">
          <img src="/assets/images/mission-graphic-2.JPG" alt="">
          <h3>Equpping with the Right Tools & Skills</h3>
          <p>To foster personal growth and societal impact, we actively cultivate a spirit of compassion and innovation within each young change-maker by thoughtfully and strategically equipping our students with the right skills, knowledge, and resources.</p>
        </div>
        <div class="descriptor">
          <img src="/assets/images/mission-graphic-3.JPG" alt="">
          <h3>Community Empowerment</h3>
          <p>We firmly believe in the transormative power of each individual to make a lasting difference, and our heartfelt goal is to see these students flourish and add value to their community, creating a brighter tomorrow for all.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'default' });
</script>

<style lang="scss" scoped>
  section {
    display: flex;
    justify-content: center;
  }

  .hero {
    background-color: #eae6d7;
    padding-top: 14rem;
    overscroll-behavior: none;
    height: clamp(540px, 50vw, 660px);

    .container {
      display: grid;
      grid-template-columns: 1fr 1fr;

      .group {
        display: flex;
        margin: 1rem;
  
        &:first-child {
          display: flex;
          flex-direction: column;
          justify-content: left;
          align-items: flex-start;
          z-index: 1;
  
          .header {
            font-family: 'Nunito', sans-serif;
            font-size: 4rem;
            letter-spacing: 0.4rem;
            font-weight: 700;
            width: 34rem;
            color: var(--text-color-main);
            text-transform: uppercase;
          }
  
          .subheader {
            font-family: 'Nunito', sans-serif;
            font-style: oblique 15deg;
            text-align: normal;
            font-size: 1.8rem;
            font-weight: 400;
            width: 27rem;
            color: var(--text-color-main);
            padding-top: 1.6rem;
  
            em {
              font-weight: 700;
            }
          }

          .buttons {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 24rem;
            margin-top: 3.2rem;

            button {
              background-color: var(--text-color-main);
              border: none;
              border-radius: 2rem;
              width: 11rem;
              height: 4rem;
              color: #eae6d7;
              font-family: 'Poppins', sans-serif;
              font-size: 1.2rem;
              font-weight: 600;
              letter-spacing: 0.06rem;

              // &:last-child {
              //   margin-left: 11rem;
              // }
            }

            #donate-button {
              // position: fixed;
            }
          }
        }
      }
  
      img {
        position: relative;
        top: -1rem;
        width: clamp(26rem, 150%, 42rem);
        height: auto;
        right: 3rem;
        z-index: 0;
      }
    }

  }

  .mission {
    background-color: white;

    .container {
      margin-top: 8rem;
      margin-bottom: 8rem;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;

      .group {
        width: 100%;
        display: grid;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        grid-template-columns: 1fr 1fr 1fr;

        .descriptor {
          display: flex;
          padding: 1rem;
          font-size: 1.2rem;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          img {
            height: 11rem;
          }

          h3 {
            font-family: 'Poppins', sans-serif;
            font-style: italic;
            font-weight: 600;
            letter-spacing: 0.06rem;
            line-height: 1.5rem;
            text-align: center;
            height: 4rem;
            margin-top: 1rem;
            color: #7a2614;
          }

          p {
            font-family: 'Poppins', sans-serif;
            font-size: 1rem;
            line-height: 1.5rem;
            text-align: center;
            color: #7a2614;

            em {
              font-weight: 600;
              font-style: oblique 12deg;
            }
          }
        }
      }
    }

    h2 {
      font-family: 'Nunito', sans-serif;
      font-size: 4rem;
      letter-spacing: 0.4rem;
      font-weight: 700;
      width: auto;
      color: #7a2614;
      text-transform: uppercase;
      margin-bottom: 3rem;
    }
  }
</style>