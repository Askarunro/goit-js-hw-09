const refs = {
  form: document.querySelector('form'),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

refs.form.addEventListener('submit', handleSubmit);
function handleSubmit(evt) {
  evt.preventDefault();
  const {
    elements: { delay, step, amount },
  } = evt.currentTarget;
  for (let i = 0; i < amount.value; i += 1) {
    let position = i + 1;
    const delay1 = Number(delay.value) + Number(step.value * i);
    createPromise(position, delay1).then(onCreateSuccess).catch(onCreateError);
  }
}

function onCreateSuccess({ position, delay }) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
function onCreateError({ position, delay }) {
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
}
