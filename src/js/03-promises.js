import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');
form.addEventListener('submit', generatePromises);

const notifyTypes = {
  success: 'success',
  fail: 'failure',
};

function generatePromises(e) {
  e.preventDefault();
  let { step, amount, delay } = {
    delay: Number(e.target.delay.value),
    step: Number(e.target.step.value),
    amount: Number(e.target.amount.value),
  };

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay)
      .then(({ position, delay }) =>
        setTimeout(() => {
          showNotify(
            notifyTypes.success,
            `Fulfill promise ${position} in ${delay}ms`
          );
        }, delay)
      )
      .catch(({ position, delay }) =>
        setTimeout(() => {
          showNotify(
            notifyTypes.fail,
            `Rejected promise ${position} in ${delay}ms`
          );
        }, delay)
      );
    delay += step;
  }
}

function createPromise(position, delay) {
  const data = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      return resolve(data);
    } else {
      return reject(data);
    }
  });
}

function showNotify(type, message, timeout = 4000) {
  Notify[type](message, { timeout });
}
