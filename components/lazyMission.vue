<template>
  <section class="mission" style="">
    <div class="container">
      <h2>Our Mission</h2>
      <div class="group">
        <div class="descriptor">
          <img src="~/assets/svg/mission-graphic-1.svg" alt="Icon of people sitting down, engaged in a discussion" loading="lazy">
          <h3>Mentorship & Guidance</h3>
          <p>
            Our mission is to empower Riverside Secondary High School students with mentorship and guidance, preparing them for community leadership
            <!-- Our mission is to empower students from Riverside Secondary Highschool through mentorship, and guidance so they can become the driving force behind positive change in their community. -->
          </p>
        </div>
        <div class="descriptor">
          <img src="~/assets/svg/mission-graphic-2.svg" alt="Icon of hands being raised" loading="lazy">
          <h3>Equipping Tools & Skills</h3>
          <p>
            We encourage personal and societal growth for students while nurturing compassion in future change-makers
            <!-- We work hard to equip our students with the right skills, knowledge, and resources to foster personal and societal growth. We aim to cultivate a spirit of compassion within each young change-maker. -->
          </p>
        </div>
        <div class="descriptor">
          <img src="~/assets/svg/mission-graphic-3.svg" alt="Icon of a bucket filled with tools" loading="lazy">
          <h3>Community Empowerment</h3>
          <p>
            Using the power of individuals, we can create lasting change. By helping students flourish, we can give them a brighter tomorrow
            <!-- We firmly believe in the transformative power of each individual to make a lasting difference. Our goal is to see these students flourish, and to create a brighter tomorrow for all. -->
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.mission {
  padding: 0rem 1rem 0rem 1rem;
  background-color: #ffffff;

  .container {
    margin-top: 6rem;
    margin-bottom: 6rem;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
      margin-top: 4rem;
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
        font-size: 1rem;
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
          font-family: 'Nunito', sans-serif;
          font-style: oblique 1deg;
          font-weight: 600;
          letter-spacing: 0.06rem;
          font-size: 1.2rem;
          line-height: 1.5rem;
          text-align: center;
          height: 3rem;
          margin-bottom: 1rem;
          color: var(--text-color-main);
          padding: 0rem 1rem 0rem 1rem;
          max-width: 10rem;

          @media (max-width: 1000px) {
            font-size: 1.3rem;
          }

          @media (max-width: 768px) {
            height: auto;
            margin-top: -1rem;
            margin-bottom: 0.5rem;
          }
        }

        p {
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          line-height: 1.5rem;
          text-align: center;
          color: var(--text-color-main);

          em {
            font-weight: 500;
            font-style: oblique 12deg;
            text-decoration: underline;
          }

          @media (max-width: 1000px) {
            font-size: 1rem;
          }

          @media (max-width: 768px) {
            width: 80vw;
            margin-bottom: 2rem;
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

    @media (max-width: 768px) {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }
  }
}
</style>