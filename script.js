const microscopeModels = {
  zeiss: ['ZEISS EXTARO 300'],
  leica: ['Leica M320 D'],
  cjoptik: ['CJ-Optik Flexion Advanced', 'CJ-Optik Flexion Advanced SensorUnit'],
  zumax: ['Zumax OMS3200', 'Zumax OMS3200 R2'],
  labomed: ['Labomed Prima DNT'],
  global: ['Global Surgical A-Series']
};

const form = document.querySelector('#request-form');
const success = document.querySelector('#form-success');
const resetButton = document.querySelector('#form-reset');

if (form) {
  const manufacturer = form.querySelector('#manufacturer');
  const model = form.querySelector('#model');
  const otherManufacturerWrap = form.querySelector('#other-manufacturer-wrap');
  const otherManufacturer = form.querySelector('#other-manufacturer');
  const otherModelWrap = form.querySelector('#other-model-wrap');
  const otherModel = form.querySelector('#other-model');

  const toggleField = (wrap, input, show) => {
    wrap.hidden = !show;
    input.required = show;
    input.disabled = !show;
    if (!show) input.value = '';
  };

  const updateModels = () => {
    const models = microscopeModels[manufacturer.value] || [];
    model.innerHTML = '<option value="" disabled selected>Выберите модель</option>';
    models.forEach((name) => model.add(new Option(name, name)));
    model.add(new Option('Другая модель', 'other'));
    model.disabled = !manufacturer.value;
    toggleField(otherManufacturerWrap, otherManufacturer, manufacturer.value === 'other');
    toggleField(otherModelWrap, otherModel, false);
  };

  manufacturer.addEventListener('change', updateModels);
  model.addEventListener('change', () => toggleField(otherModelWrap, otherModel, model.value === 'other'));
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const manufacturerName = manufacturer.value === 'other' ? data.get('otherManufacturer') : manufacturer.options[manufacturer.selectedIndex].text;
    const modelName = model.value === 'other' ? data.get('otherModel') : data.get('model');
    const subject = encodeURIComponent('Заявка на систему крепления CastorSteel');
    const body = encodeURIComponent([`Имя: ${data.get('name')}`, `Телефон: ${data.get('phone')}`, `Тип системы: ${data.get('solution')}`, `Производитель микроскопа: ${manufacturerName}`, `Модель микроскопа: ${modelName}`].join('\n'));
    form.classList.add('hidden');
    success?.classList.remove('hidden');
    window.location.href = `mailto:project@castorsteel.ru?subject=${subject}&body=${body}`;
  });
  resetButton?.addEventListener('click', () => {
    form.reset(); updateModels(); success?.classList.add('hidden'); form.classList.remove('hidden');
  });
}
