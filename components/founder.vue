<template>
    <section class="founder">
    <div class="round-container">
      <div class="profile">
        <img src="~/assets/images/joel-headshot.jpg" loading="lazy">
      </div>
      <img class="hearts" src="~/assets/svg/hearts.svg" loading="lazy">
      <h3 class="header">Meet our Founder</h3>
      <h4 class="subheader">Joel Slade</h4>
      <p class="text">
        Joel Slade, an Australian Pastor, is driven by a <em>passion for empowering communities through education and service.</em> 
        He has led development projects globally, spanning Ukraine, South and Central America, Asia, and the Pacific. Now, he's 
        embarked on an incredible journey to Zambia, launching Penny Projects to create a lasting impact on high school 
        students at Riverside Secondary School. <em class="underline">Joel firmly believes in the power of relationships and community to drive 
        transformative change, envisioning a future where Zambian students become proactive problem solvers and 
        catalysts for positive change.</em>
      </p>
    </div>
    <img class="background" src="~/assets/svg/penny-icons-bg.svg" loading="lazy">
  </section>
</template>

<style lang="scss">
.founder {
    position: relative;
    height: 1100px;
    width: 100vw;
    background-color: var(--background-color-secondary);
    overflow: hidden;
    margin-bottom: 2rem;

    @media (max-width: 1300px) {
      height: 980px;
    }

    @media (max-width: 600px) {
      height: 910px;
    }
    
    .round-container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      top: 23rem;
      // left: -0.4rem;
      width: 100%;
      height: auto;
      border-top-right-radius: 2000rem;
      border-top-left-radius: 2000rem;
      background-color: var(--background-color-main);
      z-index: 1;

      @media (max-width: 1300px) {
        top: 20rem;
      }

      @media (max-width: 768px) {
        top: 16rem;
      }

      @media (max-width: 500px) {
        border-top-right-radius: 15rem;
        border-top-left-radius: 15rem;

      }

      .profile {
        position: relative;
        top: -12rem;
        height: 22rem;
        width: 22rem;
        border-radius: 100rem;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: 768px) {
          top: -10rem;
          height: 60vw;
          width: 60vw;
        }

        @media (max-width: 500px) {
          top: -8rem;
        }

        img {
          height: 120%;
          width: auto;
          object-fit: cover;
        }
      }

      .hearts {
        position: absolute;
        top: 0rem;
        height: 28rem;
        width: 38rem;

        @media (max-width: 768px) {
          top: 7rem;
          height: 60vw;
          width: 70vw;
        }

        @media (max-width: 700px) {
          top: 6rem;
        }

        @media (max-width: 600px) {
          top: 4rem;
        }

        @media (max-width: 500px) {
          top: 3rem;
        }

        @media (max-width: 400px) {
          top: 1rem;
        }
      }

      .header, .subheader {
        position: relative;
        text-align: center;
        top: -3.4rem;
        width: 100%;
        font-size: 3.5rem;
        font-family: 'Nunito', sans-serif;
        font-weight: 700;
        letter-spacing: 0.15rem;
        text-transform: uppercase;
        color: var(--text-color-main);

        @media (max-width: 768px) {
          width: 90vw;
          font-size: 1.6rem;
          top: -3.5rem;
        }
      }

      .subheader {
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        text-transform: none;
        font-style: oblique 12deg;
      }

      .text {
        width: 1000px;
        font-family: 'Nunito', sans-serif;
        color: var(--text-color-main);
        font-size: 1.2rem;
        text-align: center;
        line-height: 2rem;

        em {
          font-weight: 600;
        }

        em.underline {
            text-decoration: underline;

            @media (max-width: 768px) {
                display: none;
            }
        }

        @media (max-width: 1300px) {
          position: relative;
          top: -0.5rem;
          width: 90vw;
          font-size: 1.1rem;
          line-height: 1.8rem;
        }
      }
    }

    img.background {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>