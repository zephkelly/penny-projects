<template>
    <section class="founder">
    <div class="round-container">
      <div class="profile">
        <img src="~/assets/images/joel-headshot.webp" alt="Headshot of penny-projects founder, Joel Slade." loading="lazy">
      </div>
      <img class="hearts" src="~/assets/svg/hearts.svg" alt="A collection of three small heart icons">
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
    <img class="background" src="~/assets/svg/penny-icons-bg.svg" alt="Heart icons." loading="lazy">
  </section>
</template>

<style lang="scss">
.founder {
    position: relative;
    min-height: 1020px;
    width: 100vw;
    background-color: var(--background-color-secondary);
    overflow: hidden;

    @media (max-width: 1300px) {
      min-height: 960px;
    }

    @media (max-width: 768px) {
      min-height: 840px;
    }
    
    .round-container {
    //   position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 19rem;
      width: 100%;
      height: auto;
      border-top-right-radius: 20000rem;
      border-top-left-radius: 20000rem;
      background-color: var(--background-color-main);
      z-index: 1;
      padding-bottom: 0rem;

      @media (max-width: 1300px) {
        margin-top: 18rem;
      }

      @media (max-width: 768px) {
        margin-top: 15rem;
      }

      @media (max-width: 500px) {
        margin-top: 13rem;
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
          height: clamp(14rem, 60vw, 25rem);
          width: clamp(14rem, 60vw, 25rem);
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
        top: 330px;
        height: 28rem;
        width: 38rem;

        @media (max-width: 1300px) {
            top: 310px;
        }

        @media (max-width: 768px) {
            top: 390px;
            width: 18rem;
            height: 20rem;
        }

        @media (max-width: 660px) { // I give up...
            top: 58vw;
        }

        @media (max-width: 500px) { // I give up...
            top: clamp(190px, 53vw, 100rem);
        }
    }

      .header, .subheader {
        position: relative;
        text-align: center;
        top: -3rem;
        width: 100%;
        font-size: 2.8rem;
        font-family: 'Nunito', sans-serif;
        font-weight: 700;
        letter-spacing: 0.15rem;
        text-transform: uppercase;
        color: var(--text-color-main);

        @media (max-width: 768px) {
          width: 95vw;
          font-size: 2.2rem;
          top: -3.2rem;
        }

        @media (max-width: 450px) {
          font-size: 2rem;
          top: -3.2rem;
        }
      }

      .subheader {
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        text-transform: none;
        font-style: oblique 12deg;

        @media (max-width: 450px) {
          font-size: 1.8rem;
          top: -3.2rem;
        }
      }

      .text {
        width: 1000px;
        font-family: 'Nunito', sans-serif;
        color: var(--text-color-main);
        font-size: 1.2rem;
        text-align: center;
        line-height: 2rem;
        padding-bottom: 5rem;

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
          top: -1rem;
          width: 90vw;
          font-size: 1.1rem;
          line-height: 1.8rem;
        }

        @media (max-width: 768px) {
          padding-bottom: 4rem;
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