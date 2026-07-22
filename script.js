const form = document.querySelector('#request-form');
const success = document.querySelector('#form-success');
const resetButton = document.querySelector('#form-reset');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent('Заявка с сайта CastorSteel');
  const body = encodeURIComponent(
    `Имя: ${data.get('name')}\nТелефон: ${data.get('phone')}\nОборудование: ${data.get('solution')}`
  );
  form.classList.add('hidden');
  success.classList.remove('hidden');
  window.location.href = `mailto:project@castorsteel.ru?subject=${subject}&body=${body}`;
});

resetButton.addEventListener('click', () => {
  success.classList.add('hidden');
  form.classList.remove('hidden');
});
