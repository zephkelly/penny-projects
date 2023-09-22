<template>
  <section class="donation-picker">
    <div class="main">
      <div class="container highlighted" @click="setDonationAmount(10)" ref="donation10">
        <div class="dot">
          <div class="inner-dot"></div>
        </div>
        <h4>$10 Donation</h4>
      </div>
      <div class="container" @click="setDonationAmount(5)" ref="donation5">
        <div class="dot">
          <div class="inner-dot"></div>
        </div>
        <h4>$5 Donation</h4>
      </div>
      <div class="container" @click="setDonationAmount(1)" ref="donation1">
        <div class="dot">
          <div class="inner-dot"></div>
        </div>
        <h4>$1 Donation</h4>
      </div>
      <div class="container" @click="setDonationAmount(0)" ref="donationCustom">
        <div class="dot">
          <div class="inner-dot"></div>
        </div>
        <h4>Custom</h4>
      </div>
    </div>
    <div class="secondary">
      <div class="container highlighted" @click="setDonationType(DonationType.OneTime);" ref="oneTimeButton">
        <div class="dot">
          <div class="inner-dot"></div>
        </div>
        <h4>One Time</h4>
      </div>
      <div class="container" @click="setDonationType(DonationType.Monthly);" ref="monthlyButton">
        <div class="dot">
          <div class="inner-dot"></div>
        </div>
        <h4>Monthly</h4>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
enum DonationType {
  OneTime = 'oneTime',
  Monthly = 'monthly'
}

let oneTimeButton: Ref = ref(null);
let monthlyButton: Ref = ref(null);

let donation10: Ref = ref(null);
let donation5: Ref = ref(null);
let donation1: Ref = ref(null);
let donationCustom: Ref = ref(null);

let donationAmount = 10;
let donationType = DonationType.OneTime;

function setDonationType(type: DonationType) {
  donationType = type;

  switch(donationType) {
    case DonationType.OneTime:
      oneTimeButton.value.classList.add('highlighted');
      monthlyButton.value.classList.remove('highlighted');
    break;
    case DonationType.Monthly:
      monthlyButton.value.classList.add('highlighted');
      oneTimeButton.value.classList.remove('highlighted');
    break;
  }
}

let lastPick = 10;
function setDonationAmount(amount: number) {
  donationAmount = amount;

  if (donationAmount == lastPick) return;

  donation10.value.classList.remove('highlighted');
  donation5.value.classList.remove('highlighted');
  donation1.value.classList.remove('highlighted');
  donationCustom.value.classList.remove('highlighted');

  switch (donationAmount) {
    case 10:
      donation10.value.classList.add('highlighted');
      lastPick = 10;
      break;
    case 5:
      donation5.value.classList.add('highlighted');
      lastPick = 5;
      break;
    case 1:
      donation1.value.classList.add('highlighted');
      lastPick = 1;
      break;
    case 0:
      donationCustom.value.classList.add('highlighted');
      lastPick = 0;
      break;
  }
}
</script>

<style scoped lang="scss">
  .donation-picker {
    display: flex;
    flex-direction: column;
    margin-top: 4rem;
    margin-bottom: 2rem;
    width: 460px;

    @media (max-width: 768px) {
      align-items: center;
    }
    
    .main {
      height: 22rem;
      width: 80%;
      flex-direction: column;
      border: 4px solid var(--text-color-main);
      border-radius: 3rem;
      position: relative;
      z-index: 1;

      .container {
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        height: 5.34rem;
        border-bottom: 4px solid var(--text-color-main);
        z-index: -1;
        position: relative;

        &:first-child {
          border-top-left-radius: 2.7rem;
          border-top-right-radius: 2.7rem;
        }

        &:last-child {
          border-bottom: none;
          border-bottom-left-radius: 2.7rem;
          border-bottom-right-radius: 2.7rem;
        }
      }
    }

    .secondary {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-top: 4rem;

      .container {
        display: flex;
        align-items: center;
        height: 4rem;
        padding: 0rem;
        border: 4px solid var(--text-color-main);
        border-radius: 3rem;

        &:first-child {
          margin-right: 0.5rem;
        }

        &:last-child {
          margin-left: 0.5rem;
        }
      }

      h4 {
        margin-left: 1rem;
        font-size: 1.5rem;
      }
    }

    .container {
      transition: color 2s cubic-bezier(0.075, 0.82, 0.165, 1), background-color 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      &:hover {
        cursor: pointer;
        background-color: var(--text-color-secondary);
      }
    }

    .container.highlighted {
      background-color: var(--text-color-main);
      color: var(--background-color-main);

      &:hover {
        background-color: var(--text-color-main);
      }

      .dot {
        background-color: var(--background-color-main);
      }

      h4 {
        color: var(--background-color-main);
        font-weight: 600;
      }
    }

    .dot {
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      background-color: var(--text-color-main);
      margin-left: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .inner-dot {
        height: 0.9rem;
        width: 0.9rem;
        border-radius: 50%;
        background-color: var(--text-color-main);
      }
    }

    h4 {
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: 1.8rem;
      color: var(--text-color-main);
      margin-left: 3rem;
      user-select: none;

      @media (max-width: 1000px) {
        margin-left: 2rem;
      }
    }
  }

  section .container, header .container {
    height: 5rem;
    width: auto;
  }

  @media (max-width: 1000px) {
    .donation-picker {
      width: 100%;
      margin-top: 2rem;
      margin-bottom: 4rem;


      .main {
        width: clamp(260px, 80%, 500px);
        height: auto;

        h4 {
          font-size: 1.2rem;
        }
      }

      .secondary {
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr;
        margin-top: 2rem;

        .container {
          margin-bottom: 1rem;
          width: 70%;

          &:first-child {
            margin-right: 0rem;
          }

          &:last-child {
            margin-left: 0rem;
          }
        }

        .dot {
          margin-left: 1rem;
          width: 1.8rem;
          height: 1.8rem;
        }

        h4 {
          margin-left: 2rem;
          font-size: 1.2rem;
        }
      }
    }
  }

  @media (max-width: 800px) {
    .donation-picker {
      .secondary {
        h4 {
          font-size: 1.2rem;
          margin-left: 0.6rem;
        } 
      }
    }
  }

  @media (max-width: 768px) {
    .donation-picker {
      .secondary {
        .container {
          width: 15rem;
        }
      }
    }
  }
</style>