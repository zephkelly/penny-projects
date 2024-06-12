<template>
    <section class="join">
    <div class="container">
      <div class="header">
        <img src="~/assets/svg/hearts.svg" alt="Hearts icon" loading="lazy">
        <h3>How you can join our family</h3>
      </div>
      <div class="content">
        <div class="item">
          <img src="~/assets/svg/love-icon.svg" alt="Hands holding a heart icon" loading="lazy">
          <h4>Donate</h4>
          <p>Contribute a dollar or volunteer with us to build a compassionate community and achieve progress, one penny at a time.</p>
        </div>
        <div class="item">
          <img src="~/assets/svg/phone-icon.svg" alt="Communication icon" loading="lazy">
          <h4>Community</h4>
          <p>Connect with like-minded individuals, follow us, and be a part of the Penny Projects family. Embrace optimism and take action for positive change.</p>
        </div>
        <div class="item">
          <img src="~/assets/svg/heart-icon.svg" alt="Heart icon">
          <h4>Volunteer</h4>
          <p>Join us in the mission field and be part of our inspiring Penny Projects family. Together, let's create a brighter future for those we serve.</p>
        </div>
        <div class="item">
          <img src="~/assets/svg/shake-icon.svg" alt="Handshake icon" loading="lazy">
          <h4>Collaborate</h4>
          <p>We want to work with you on Penny Projects in your own community. Partner with us to empower others and create lasting impact together.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
    .join {
    height: auto;
    background-color: #ffffff;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
      padding-top: 2.2rem;
    }

    .container {
      margin-top: 10rem;
      margin-bottom: 8rem;
      height: auto;
      flex-direction: column;
      align-items: center;

      @media (max-width: 768px) {
        margin-top: 6rem;
        margin-bottom: 5.8rem;
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

          @media (max-width: 768px) {
            top: 8rem;
            height: 20rem;
          }
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

        img {
          width: 10rem;

          @media (max-width: 768px) {
            width: 6rem;
          }
        }

        h4 {
          font-family: 'Nunito', sans-serif;
          font-style: oblique 8deg;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.06rem;
          font-size: 1.5rem;
          line-height: 1.5rem;
          text-align: center;
          margin-bottom: 1rem;
          color: var(--text-color-main);
          padding: 0rem 1rem 0rem 1rem;
  
          @media (max-width: 1000px) {
            font-size: 1.2rem;
          }

          @media (max-width: 768px) {
            height: 2.5rem;
            font-size: 1.2rem;
            margin-bottom: 0.8rem;
          }
        }

        p {
          font-family: 'Nunito', sans-serif;
          font-size: 1.2rem;
          width: 90%;
          text-align: center;
          line-height: 1.2rem;
          height: 3.5rem;
          padding-bottom: 1rem;

          @media (max-width: 768px) {
            height: 5rem;
            font-size: clamp(0.8rem, 15vw, 1rem);
            margin-bottom: 0.2rem;
          }

          @media (max-width: 600px) {
            height: 7rem;
          }

          @media (max-width: 500px) {
            height: 10rem;
          }
        }

        button {
          font-family: "Nunito", sans-serif;
          font-weight: 600;
          font-size: 1rem;
          color: var(--background-color-secondary);
          margin-top: 1rem;
          background-color: var(--text-color-main);
          border: none;
          height: 2.2rem;
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
</style>