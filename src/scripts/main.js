'use strict';

const html = document.documentElement;

const promise1 = new Promise((resolve, reject) => {
  let clickLog = 0;

  html.addEventListener('click', () => {
    clickLog++;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (clickLog === 0) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  html.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  html.addEventListener('contextmenu', (eve) => {
    eve.preventDefault();
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve, reject) => {
  let clickLogL = 0;
  let clickLogR = 0;

  html.addEventListener('click', () => {
    clickLogL++;

    if (clickLogL > 0 && clickLogR > 0) {
      resolve('Third promise was resolved');
    }
  });

  html.addEventListener('contextmenu', (eve) => {
    eve.preventDefault();
    clickLogR++;

    if (clickLogL > 0 && clickLogR > 0) {
      resolve('Third promise was resolved');
    }
  });
});

promise1
  .then((message) => {
    const not = document.createElement('div');

    not.setAttribute('data-qa', 'notification');
    not.className = 'success';
    not.innerText = message;

    document.body.append(not);
  })
  .catch((message) => {
    const not = document.createElement('div');

    not.setAttribute('data-qa', 'notification');
    not.className = 'error';
    not.innerText = message;

    document.body.append(not);
  });

promise2.then((message) => {
  const not = document.createElement('div');

  not.setAttribute('data-qa', 'notification');
  not.className = 'success';
  not.innerText = message;

  document.body.append(not);
});

promise3.then((message) => {
  const not = document.createElement('div');

  not.setAttribute('data-qa', 'notification');
  not.className = 'success';
  not.innerText = message;

  document.body.append(not);
});
