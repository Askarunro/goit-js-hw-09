const refs = {
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
  btnSubmit: document.querySelector('btn'),
  form: document.querySelector('form'),
};
let position = 0;
refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  for (let i = 0; i < amount.value; i += 1) {
    position += 1;
    console.log('delay.value', delay.value);
    console.log('step.value', step.value);
    const delay1 = Number(delay.value) + Number(step.value * i);
    console.log(delay1);
    function createPromise(position, delay1) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const shouldResolve = Math.random() > 0.3;

          if (shouldResolve) {
            resolve({ position, delay1 });
          }
          reject({ position, delay1 });
        }, delay1);
        //   });
      });
    }
  }
}

createPromise({ position, delay1 }).then(onCreateSuccess).catch(onCreateError);

function onCreateSuccess({ position, delay1 }) {
  console.log(`✅ Fulfilled promise ${position} in ${delay1}ms`);
}
function onCreateError({ position, delay1 }) {
  console.log(`❌ Rejected promise ${position} in ${delay1}ms`);
}

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   return new Promise((resolve, reject) => {
//     if (shouldResolve) {
//       resolve({ position, delay });
//       // Fulfill
//     }
//     reject({ position, delay });
//   });
// }

// let formSubmit = {};
// refs.form.addEventListener('submit', createPromise);

// function onSubmitForm() {
//   const formSubmit = new FormData(evt.currentTarget);
//   const { z, x, c } = formSubmit;
//   alert(formSubmit);
// }
// console.log(formSubmit);
// const step = 500;
// const amount = 5;
// const start = 1000;
// let position = 0;
// refs.btnSubmit.addEventListener('click', createPromise);
// const createPromise = () => {
//   position += 1;
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const shouldResolve = Math.random() > 0.3;
//       const delay = step * position;
//       if (shouldResolve) {
//         resolve({ position, delay });
//       }
//       reject({ position, delay });
//     }, start + delay * position);
//   });
// };

// createPromise().then(onCreateSuccess).catch(onCreateError);

// function onCreateSuccess({ position, delay }) {
//   console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
// }
// function onCreateError({ position, delay }) {
//   console.log(`❌ Rejected promise ${position} in ${delay}ms`);
// }
