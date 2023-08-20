<template>
  <Header/>
  <section class="hero">
    <div class="container">
      <div class="group">
        <h1 class="header">Little Gifts, Big Impact</h1>
        <p class="subheader">Welcome to <em>Penny Projects</em>, a community of people dedicated to seeing a little go a long way.</p>
        <div class="buttons">
          <button id="donate-button">Donate Now</button>
          <button>Join Us!</button>
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
          <p>To foster personal growth and societal impact, we actively cultivate a spirit of compassion and innovation within each young change-maker by thoughtfully and strategically <em>equipping our students with the right skills, knowledge, and resources.</em></p>
        </div>
        <div class="descriptor">
          <img src="/assets/images/mission-graphic-3.JPG" alt="">
          <h3>Community Empowerment</h3>
          <p>We firmly believe in the transormative power of each individual to make a lasting difference, and our heartfelt goal is to see <em>these students flourish and add value to their community, creating a brighter tomorrow for all.</em></p>
        </div>
      </div>
    </div>
  </section>
  <section class="approach">
    <div class="container">
      <div class="group">
        <h2>Our Approach</h2>
        <p class="descriptor">Through the help and support of the Riverside Secondary School <em>we aim to provide a hands-on learning and experiential education.</em> Our team of high school students are empowered to take the lead in every aspect of project development.</p>
        <div class="approaches">
          <p>Identifying the needs of the community.</p>
          <p>Devising effective solutions.</p>
          <p>Executing the projects.</p>
        </div>
        <p class="descriptor-2">This approach instills a sense of ownership and pride in the students. It also ensures that the projects are tailored to the specific requirements of our community.</p>
      </div>
      <div class="group">
      </div>
    </div>
    <img src="/assets/images/approach-1.JPG" alt="">
  </section>
  <section class="donation">
    <img src="/assets/images/donations-1.JPG" alt="">
    <div class="container">
      <div class="group">
      </div>
      <div class="group">
        <h2>Together We Can</h2>

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
            font-style: oblique 8deg;
            text-align: normal;
            font-size: 1.6rem;
            font-weight: 400;
            width: 31rem;
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
    background-color: #ffffff;

    .container {
      margin-top: 5rem;
      margin-bottom: 5rem;
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
          font-size: 1.2rem;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          &:nth-child(1) {
            p {
              padding-right: 1rem;
            }
          }

          &:nth-child(2) {
            p {
              padding: 0rem 1rem 0rem 1rem;
            }
          }

          &:nth-child(3) {
            p {
              padding-left: 1rem;
            }
          }

          img {
            height: 8rem;
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
            padding: 0rem 1rem 0rem 1rem;
          }

          p {
            font-family: 'Poppins', sans-serif;
            font-size: 1rem;
            line-height: 1.5rem;
            text-align: center;
            color: #7a2614;
            // padding: 1rem;

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

  .approach {
    height: clamp(540px, 50vw, 660px);
    overflow: hidden;
    position: relative;

    .container {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding-right: 0rem;

      .group {
        padding: 1rem;
        max-height: 100%;

        &:first-child {
          padding-top: 5rem;
          margin-right: 2rem;
          padding-left: 0rem;
          display: flex;
          flex-direction: column;
          font-family: 'Poppins', sans-serif;
          text-align: left;
          color: #7a2614;

          .descriptor {
            margin-bottom: 2rem;

            em {
              font-weight: 600;
              font-style: oblique 12deg;
            }
          }

          .descriptor-2 {
            margin-top: 1rem;
            font-weight: 600;
          }

          .approaches {
            p {
              font-style: oblique 12deg;
              text-decoration: underline;
              margin-bottom: 1rem;
            }
          }
        }

        &:last-child {
          padding: 0rem;
          padding-bottom: 1rem;
          position: relative;
          right: 0;
        }

        h2 {
          font-family: 'Nunito', sans-serif;
          font-size: 3rem;
          letter-spacing: 0.4rem;
          font-weight: 700;
          width: auto;
          color: #7a2614;
          text-transform: uppercase;
          margin-bottom: 1rem;
          text-align: left;
        }
      }
    }

    img {
      position: absolute;
      width: 50%;
      right: 0;
      height: 100%;
      object-fit: cover;
    }
  }

  .donation {
    height: clamp(540px, 50vw, 660px);
    background-color: #ffffff;
    position: relative;

    .container {
      padding-left: 0rem;
      display: grid;
      grid-template-columns: 1fr 1fr;

      .group {
        &:last-child {
          padding: 3rem;
          padding-top: 5rem;
        }

        h2 {
          font-family: 'Nunito', sans-serif;
          font-size: 2.8rem;
          letter-spacing: 0.2rem;
          font-weight: 700;
          width: auto;
          color: #7a2614;
          text-transform: uppercase;
          margin-bottom: 1rem;
          text-align: left;
        }
      }
    }

    img {
      position: absolute;
      width: 50%;
      left: 0;
      height: 100%;
      object-fit: cover;
    }
  }
</style>