<template>
  <Head>
    <meta property="og:image" content="images/og-image.webp" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Penny Projects" />
    <meta property="og:title" content="Penny Projects" />
    <meta property="og:description" content="Welcome to Penny Projects, a community of people dedicated to seeing a little go a long way." />
    <meta property="og:url" content="https://pennyprojects.org" />
  </Head>
  <Header/>
  <Hero/>
  <section class="mission" style="">
    <div class="container">
      <h2>Our Mission</h2>
      <div class="group">
        <div class="descriptor">
          <img src="/svg/mission-graphic-1.svg" alt="">
          <h3>Mentorship & Guidance</h3>
          <p>Our misson is to <em>nurture and inspire highschool students from Riverside Secondary School, empowering them through mentorship and guidance</em> to become proactive problem solvers and the driving force behind positive change in their community.</p>
        </div>
        <div class="descriptor">
          <img src="/svg/mission-graphic-2.svg" alt="">
          <h3>Equpping 
            with the Right Tools & Skills</h3>
          <p>To foster personal growth and societal impact, we actively cultivate a spirit of compassion and innovation within each young change-maker by thoughtfully and strategically <em>equipping our students with the right skills, knowledge, and resources.</em></p>
        </div>
        <div class="descriptor">
          <img src="/svg/mission-graphic-3.svg" alt="">
          <h3>Community Empowerment</h3>
          <p>We firmly believe in the transormative power of each individual to make a lasting difference, and our heartfelt goal is to see <em>these students flourish and add value to their community, creating a brighter tomorrow for all.</em></p>
        </div>
      </div>
    </div>
  </section>
  <section class="approach desktop">
    <div class="container">
      <div class="group">
        <h2>Our Approach</h2>
        <p class="descriptor">Through the help and support of the Riverside Secondary School we aim to provide a hands-on learning and experiential education. Our team of high school students are empowered to take the lead in every aspect of project development.</p>
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
    <img src="/images/approach-1.webp" alt="">
  </section>
  <section class="donation" id="donation">
    <img src="/images/donations-1.webp" alt="">
    <div class="container">
      <div class="group">
      </div>
      <div class="group">
        <h3>Together We Can</h3>
        <p>To realise these transformative projects, we depend on generous donors who share our commitment. <em>Your contributions provide necessary resources for successful  project implementation, making a lasting impact on lives and creating a ripple effect beyond borders.</em></p>
        <!-- <DonationPicker/> -->
        <a class="donation-button" target="_blank" href="https://www.paypal.com/donate/?business=68BXW94GZSSJJ&no_recurring=0&item_name=All+donations+go+towards+supporting+Riverside+Secondary+School.+Providing+a+hands-on+learning+and+experiential+education&currency_code=AUD">
          <h5>Donate with</h5>
          <img class="paypal" src="/images/paypal.webp"/>
        </a>
      </div>
    </div>
  </section>
  <section class="founder">
    <div class="round-container">
      <div class="profile">
        <img src="/images/joel-headshot.jpg">
      </div>
      <img class="hearts" src="/svg/icons/hearts.svg">
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
    <img class="background" src="/svg/penny-icons-bg.svg">
  </section>
  <section class="join">
    <div class="container">
      <div class="header">
        <img src="~/public/svg/icons/hearts.svg" alt="">
        <h3>How you can join our family</h3>
      </div>
      <div class="content">
        <div class="item">
          <!-- <img src="~/public/svg/icon/heart.png" alt=""> -->
          <h4>Volunteer</h4>
          <p>Join us in the mission field and be part of our inspiring Penny Projects family. Together, let's create a brighter future for those we serve.</p>
          <button>Volunteer</button>
        </div>
        <div class="item">
          <!-- <img src="~/public/svg/icon/hand-heart.png" alt=""> -->
          <h4>Donate</h4>
          <p>Contribute a dollar or volunteer with us to build a compassionate community and achieve progress, one penny at a time.</p>
          <button>Donate</button>
        </div>
        <div class="item">
          <!-- <img src="~/public/svg/icon/hand-heart.png" alt=""> -->
          <h4>Collaborate</h4>
          <p>We want to work with you on Penny Projects in your own community. Partner with us to empower others and create lasting impact together.</p>
          <button>Collaborate</button>
        </div>
        <div class="item">
          <!-- <img src="~/public/svg/icon/hand-heart.png" alt=""> -->
          <h4>Online Community</h4>
          <p>Connect with like-minded individuals, follow us, and be a part of the Penny Projects family. Embrace optimisim and take action for positive change.</p>
          <button>Join Us!</button>
        </div>
      </div>
    </div>
  </section>
  <section class="banner">
    <img src="/images/school-banner.webp" alt="">
  </section>
  <EmailSection/>
  <section class="banner2">
    <img src="/images/logo-round.png" alt="">
  </section>
  <footer class="footer">
    <!-- <p class="number">+1 828-808-4869</p> -->
    <p class="email">thepennyprojects@gmail.com</p>
    <p class="address">Kafue, Zambia</p>
  </footer>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
  section {
    display: flex;
    justify-content: center;
  }

  .container {
    padding: 0rem 2rem 0rem 2rem;
  }

  .mission {
    background-color: #ffffff;

    .container {
      margin-top: 6rem;
      margin-bottom: 6rem;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;

      @media (max-width: 768px) {
        margin-top: 5rem;
        margin-bottom: 5rem;
      }

      .group {
        width: 100%;
        display: grid;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        grid-template-columns: 1fr 1fr 1fr;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }

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

          @media (max-width: 768px) {
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
                margin-bottom: 0rem;
              }
            }
          }

          img {
            height: 12rem;
          }

          h3 {
            font-family: 'Poppins', sans-serif;
            font-style: italic;
            font-weight: 600;
            letter-spacing: 0.06rem;
            font-size: 1.3rem;
            line-height: 1.5rem;
            text-align: center;
            height: 4rem;
            margin-top: 1rem;
            color: var(--text-color-main);
            padding: 0rem 1rem 0rem 1rem;

            @media (max-width: 1000px) {
              font-size: 1.2rem;
            }

            @media (max-width: 768px) {
              height: auto;
              margin-top: 0.5rem;
              margin-bottom: 0.5rem;
            }
          }

          p {
            font-family: 'Poppins', sans-serif;
            font-size: 1.2rem;
            line-height: 1.5rem;
            text-align: center;
            color: var(--text-color-main);

            em {
              font-weight: 500;
              font-style: oblique 12deg;
              text-decoration: underline;
            }

            @media (max-width: 1000px) {
              font-size: 1.1rem;
            }

            @media (max-width: 768px) {
              width: 80vw;
              margin-bottom: 4rem;
            }
          }
        }
      }
    }

    h2 {
      font-family: 'Nunito', sans-serif;
      font-size: 3rem;
      letter-spacing: 0.3rem;
      font-weight: 700;
      text-align: center;
      width: auto;
      color: var(--text-color-main);
      text-transform: uppercase;
      margin-bottom: 3rem;
    }
  }

  .approach {
    height: auto;
    overflow: hidden;
    position: relative;

    @media (max-width: 768px) {
      height: clamp(50rem, 100%, 60rem);
    }
    
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding-right: 0rem;

      @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        grid-template-columns: 1fr;
        padding-left: 0rem;
      }

      .group {
        padding: 1rem;
        max-height: 100%;
        padding-top: 6rem;
        padding-bottom: 6rem;

        &:first-child {
          padding-top: 6rem;
          padding-bottom: 6rem;
          padding-right: 4rem;
          padding-left: 0rem;
          display: flex;
          flex-direction: column;
          font-family: 'Poppins', sans-serif;
          font-size: 1.2rem;
          text-align: left;
          color: var(--text-color-main);
          
          @media (max-width: 1000px) {
            font-size: 1rem;
          }
          
          @media (max-width: 768px) {
            padding-top: 30.5rem;
            padding-left: 0rem;
            padding-right: 0rem;
            padding-bottom: 5rem;
            width: 90vw;

            p {
              font-size: clamp(1rem, 1.5vw, 1.2rem);
              text-align: center;
            }
          }

          .descriptor {
            font-weight: 500;
            line-height: 1.7rem;
            margin-bottom: 3rem;

            em {
              font-weight: 600;
              font-style: oblique 12deg;
            }
          }

          .descriptor-2 {
            margin-top: 2rem;
            font-weight: 600;
            word-spacing: 0.1rem;
            line-height: 1.5rem;
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

          @media (max-width: 768px) {
            display: none;
          }
        }

        h2 {
          font-family: 'Nunito', sans-serif;
          font-size: 3rem;
          letter-spacing: 0.3rem;
          font-weight: 700;
          width: auto;
          color: var(--text-color-main);
          text-transform: uppercase;
          margin-bottom: 1rem;
          text-align: left;

          @media (max-width: 1000px) {
            font-size: 2.4rem;
          }

          @media (max-width: 768px) {
            text-align: center;
          }
        }
      }
    }

    img {
      position: absolute;
      width: 50%;
      right: 0;
      height: 100%;
      object-fit: cover;

      @media (max-width: 768px) {
        left: 0;
        right: 0;
        top: 0;
        width: 100%;
        height: clamp(12rem, 100%, 26rem);
      }
    }
  }

  .donation {
    height: auto;
    background-color: var(--background-color-main);
    position: relative;

    .container {
      padding-left: 0rem;
      padding-right: 0rem;
      display: grid;
      grid-template-columns: 1fr 1fr;

      @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        grid-template-columns: 1fr;
        padding-left: 0rem;
      }

      .group {
        display: flex;
        flex-direction: column;
        
        &:last-child {
          padding: 3rem;
          padding-left: 4rem;
          padding-right: 2rem;
          padding-top: 6rem;
          padding-bottom: 6rem;

          @media (max-width: 1000px) {
            padding: 1rem;
            padding-left: 3rem;
            padding-right: 2rem;
            padding-top: 6rem;
            padding-bottom: 4rem;
          }

          @media (max-width: 768px) {
            padding-top: 30.5rem;
            padding-left: 0rem;
            padding-right: 0rem;
            padding-bottom: 4rem;
            width: 90vw;
            align-items: center;
          }
        }

        h3 {
          font-family: 'Nunito', sans-serif;
          font-size: 2.8rem;
          letter-spacing: 0.2rem;
          font-weight: 700;
          width: auto;
          color: var(--text-color-main);
          text-transform: uppercase;
          margin-bottom: 1rem;
          text-align: left;

          @media (max-width: 1000px) {
            font-size: 2.4rem;
          }

          @media (max-width: 768px) {
            text-align: center;
          }
        }

        p {
          font-family: 'Poppins', sans-serif;
          font-size: 1.2rem;
          line-height: 1.7rem;
          text-align: left;
          color: var(--text-color-main);

          em {
            font-weight: 600;
            font-style: oblique 2deg;
          }

          @media (max-width: 1000px) {
            font-size: 1rem;
          }

          @media (max-width: 768px) {
            text-align: center;
          }
        }
      }
    }

    .donation-button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3rem;
      width: 16rem;
      background-color: #ffc670;
      padding: 0.5rem;
      border-radius: 10rem;
      margin-top: 2.5rem;

      h5 {
        position: relative;
        font-family: "Nunito", sans-serif;
        font-weight: 600;
        font-size: 1.1rem;
        color: #222b63;
        margin-right: 0.7rem;
      }

      img {
        position: relative;
        top: -0.1rem;
        height: 6rem;
        width: auto;
      }

      &:hover {
        background-color: #ffd08a;

        h5 {
          opacity: 0.7;
        }

        img {
          opacity: 0.8;
        }
      }
    }

    img {
      position: absolute;
      width: 50%;
      left: 0;
      top: 0;
      height: 100%;
      object-fit: cover;

      @media (max-width: 768px) {
        left: 0;
        right: 0;
        top: 0;
        width: 100%;
        height: clamp(12rem, 100%, 26rem);
      }
    }
  }

  .founder {
    position: relative;
    height: 1100px;
    width: 100vw;
    background-color: var(--background-color-secondary);
    overflow: hidden;

    @media (max-width: 1000px) {
      height: 1200px;
    }

    @media (max-width: 768px) {
      height: 1050px;
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
        width: 1200px;
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

  .join {
    height: auto;
    background-color: #ffffff;
    display: flex;
    justify-content: center;

    .container {
      margin-top: 9rem;
      margin-bottom: 6rem;
      height: auto;
      flex-direction: column;
      align-items: center;

      @media (max-width: 768px) {
        margin-top: 8rem;
        margin-bottom: 4rem;
      }

      .header {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        text-align: center;
        height: 8rem;

        img {
          position: relative;
          top: 10rem;
          height: 26rem;
          width: auto;
        }
      }
      .content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 6rem 1rem;
        max-width: 1200px;
        padding: 0rem;

        @media (max-width: 768px) {
          width: 90vw;
          max-width: 90vw;
          gap: 3.5rem 0.2rem;
        }
      }

      .item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        h4 {
          font-family: 'Nunito', sans-serif;
          font-style: oblique 8deg;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.06rem;
          font-size: 1.5rem;
          line-height: 1.5rem;
          text-align: center;
          margin-top: 1rem;
          margin-bottom: 1rem;
          color: var(--text-color-main);
          padding: 0rem 1rem 0rem 1rem;
  
          @media (max-width: 1000px) {
            font-size: 1.2rem;
          }

          @media (max-width: 768px) {
            height: 2.5rem;
            font-size: 1rem;
            margin-bottom: 0.5rem;
          }
        }

        p {
          font-family: 'Nunito', sans-serif;
          font-size: 1.2rem;
          width: 90%;
          text-align: center;
          line-height: 1.2rem;
          height: 3.5rem;
          padding-bottom: 2rem;

          @media (max-width: 768px) {
            height: 4rem;
            font-size: clamp(0.8rem, 15vw, 1rem);
            margin-bottom: 0.2rem;
          }

          @media (max-width: 600px) {
            height: 6rem;
          }

          @media (max-width: 500px) {
            height: 8rem;
          }
        }

        button {
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          color: var(--background-color-secondary);
          margin-top: 1rem;
          background-color: var(--text-color-main);
          border: none;
          height: 2rem;
          width: auto;
          padding: 0rem 3rem 0rem 3rem;
          border-radius: 1rem;

          @media (max-width: 768px) {
            margin-top: 0rem;
            font-size: 1rem;
            padding: 0rem 1rem 0rem 1rem;
          }
        }
      }
    }

    h3 {
      font-family: 'Nunito', sans-serif;
      font-size: 3rem;
      letter-spacing: 0.3rem;
      font-weight: 700;
      width: auto;
      color: var(--text-color-main);
      text-transform: uppercase;
      margin-bottom: 3rem;

      @media (max-width: 1000px) {
        font-size: 2.4rem;
      }

      @media (max-width: 768px) {
        width: 90vw;
        text-align: center;
        
      }
    }
  }

  .banner {
    height: 400px;
    overflow: hidden;

    @media (max-width: 768px) {
      height: 300px;
    }

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  .banner2 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 580px;
    background-color: var(--background-color-secondary);

    img {
      height: 450px;
      width: auto;
      
    }

    @media (max-width: 786px) {
      height: 400px;

      img {
        height: 340px;
      }
    }
  }

  footer {
    height: 150px;
    background-color: var(--background-color-main);
    font-family: 'Poppins', sans-serif;
    color: var(--text-color-main);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 6.5rem;
    font-size: 1.2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 2rem;
      font-size: 1.2rem;
      height: 220px;
    }
  }
</style>