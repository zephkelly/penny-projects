<template>
  <section class="email" id="newsletter">
    <h3 class="header">Join our online family!</h3>
    <div id="mc_embed_signup">
        <form action="https://pennyprojects.us9.list-manage.com/subscribe/post?u=d915e9e09cea505cc1a8b8d0e&amp;id=4c02ec613b&amp;f_id=00f814e1f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_self" novalidate="">
            <div id="mc_embed_signup_scroll">
                <div class="mc-field-group name">
                  <label for="mce-FNAME" ref="nameLabel">First Name</label>
                  <input type="text" name="FNAME" class=" text" id="mce-FNAME" value="" ref="nameInput">
                </div>
                <div class="mc-field-group email">
                  <label for="mce-EMAIL" ref="emailLabel">Email Address</label>
                  <input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required="" value="" ref="emailInput">
                  <span id="mce-EMAIL-HELPERTEXT" class="helper_text"></span></div>
            <div id="mce-responses" class="clear foot">
                <div class="response" id="mce-error-response" style="display: none;"></div>
                <div class="response" id="mce-success-response" style="display: none;"></div>
            </div>
        <div style="position: absolute; left: -5000px;" aria-hidden="true">
            /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */
            <input type="text" name="b_d915e9e09cea505cc1a8b8d0e_4c02ec613b" tabindex="-1" value="">
        </div>
            <div class="optionalParent">
                <div class="clear foot">
                    <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe">
                    <p style="margin: 0px auto;"><a href="http://eepurl.com/iAeBfo" title="Mailchimp - email marketing made easy and fun"><span style="display: inline-block; background-color: transparent; border-radius: 4px;"><img class="refferal_badge" src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg" alt="Intuit Mailchimp" style="width: 220px; height: 40px; display: flex; padding: 2px 0px; justify-content: center; align-items: center;"></span></a></p>
                </div>
            </div>
        </div>
    </form>
    </div>
    <div class="socials">
      <a href="https://www.instagram.com/pennyprojectsrs/" target="_blank"><img src="~/assets/svg/icon_instagram.svg" loading="lazy"></a>
      <a href="https://www.facebook.com/profile.php?id=100063661478968&mibextid=LQQJ4d" target="_blank"><img src="~/assets/svg/icon_facebook.svg" loading="lazy"></a>
      <a href="https://www.youtube.com/@PennyProjectsrs" target="_blank"><img src="~/assets/svg/icon_youtube.svg" loading="lazy"></a>
    </div>
    <img class="background" src="~/assets/svg/penny-icons-bg.svg">
  </section>
</template>

<script setup>
const nameInput = ref(null);
const nameLabel = ref(null);

const emailInput = ref(null);
const emailLabel = ref(null);

onMounted(() => {
  nameInput.value.addEventListener('focus', () => {
    nameLabel.value.style.opacity = 0;
  });

  nameInput.value.addEventListener('blur', () => {
    if (nameInput.value.value == '') {
      nameLabel.value.style.opacity = 0.6;
    }
  });

  emailInput.value.addEventListener('focus', () => {
    emailLabel.value.style.opacity = 0;
  });

  emailInput.value.addEventListener('blur', () => {
    if (emailInput.value.value == '') {
      emailLabel.value.style.opacity = 0.6;
    }
  });
});
</script>

<style scoped lang="scss">
.email {
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 680px;
  }

  .header {
    text-transform: uppercase;
    z-index: 1;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    font-size: 2.4rem;
    padding-bottom: 2rem;
    color: var(--text-color-main);
    text-align: center;

    @media (max-width: 786px) {
      width: 90vw;
    }
  }

  .socials {
    width: 600px;
    height: 4rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    z-index: 1;
    padding-top: 2rem;
    gap: 1.5rem;

    @media (max-width: 768px) {
      padding-top: 11.5rem;
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      top: 0;
      width: 5rem;
      height: 5rem;

      img {
        position: relative;
        height: 16rem;
        width: 16rem;
        user-select: none;
        pointer-events: none;
      }
    }
  }

  .background {
    position: absolute;
    top: 0;
    z-index: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  #mc_embed_signup {
    width: auto;
    height: 4rem;
    z-index: 1;

    form {
      height: 4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: var(--text-color-main);
      border-radius: 5rem;
      gap: 4rem;
      width: 600px;

      @media (max-width: 768px) {
        height: auto;
        width: 80vw;
        padding: 2rem 0rem;
        border-radius: 2rem;
      }

      #mc_embed_signup_scroll {
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        padding: 0rem 1.8rem 0rem 1.8rem;

        @media (max-width: 768px) {
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          align-items: flex-start;
        }

        .optionalParent {
          height: 2.2rem;
          cursor: pointer;
          
          div {
            height: 100%;
          }

          input {
            height: 100%;
            background-color: var(--background-color-secondary);
            border: none;
            border-radius: 5rem;
            width: 6.5rem;
            font-family: 'Poppins', sans-serif;
            text-transform: uppercase;
            font-size: 0.8rem;
            font-weight: 600;
            color: var(--text-color-main);
            cursor: pointer;
          }
        }
      }
    }

    .mc-field-group {
      position: relative;
      width: auto;
      display: flex;
      flex-direction: row;
      height: 2.2rem;

      &.name {
        width: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: 768px) {
          width: 100%;
        }

        input {
          height: 100%;
        }
      }

      &.email {
        width: 16rem;

        input {
          height: 100%;
        }

        @media (max-width: 768px) {
          width: 100%;
        }
      }
      
      input {
        width: 100%;
        border: none;
        position: relative;
        left: 0;
        z-index: 1;
        border-radius: 6rem;
        padding: 0rem 1rem 0rem 1rem;
      }

      label {
        position: absolute;
        left: 1rem;
        z-index: 2;
        opacity: 0.6;
        font-family: 'Poppins', sans-serif;
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text-color-main);
        user-select: none;
        pointer-events: none;
      }
    }

    p {
      display: none;
    }
  }
}
</style>