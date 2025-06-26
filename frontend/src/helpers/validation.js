// src/helpers/validation.js

const validationRules = {
  libro: {
    titulo: {
      validate: (value) => value.trim().length >= 3 && value.length <= 100,
      errorMessage: "El título debe tener entre 3 y 100 caracteres."
    },
    anio_publicacion: {
      // CORREGIDO: Regex más robusta y chequeo de año futuro.
      validate: (value) => /^\d{4}$/.test(value) && parseInt(value) > 1000 && parseInt(value) <= new Date().getFullYear() + 1,
      errorMessage: "Debe ser un año válido de 4 dígitos (ej. 1997)."
    },
    categoria_id: {
      validate: (value) => value !== '',
      errorMessage: "Debe seleccionar una categoría."
    },
    autor_id: {
      validate: (value) => value !== '',
      errorMessage: "Debe seleccionar un autor."
    },
    editorial_id: {
      validate: (value) => value !== '',
      errorMessage: "Debe seleccionar una editorial."
    }
  }
};

function validateForm(form, ruleSetName) {
  const rules = validationRules[ruleSetName];
  if (!rules) return false;

  let isFormValid = true;

  // Primero, limpiamos todos los errores antiguos
  form.querySelectorAll('.error_message').forEach(el => el.remove());
  form.querySelectorAll('.is_invalid').forEach(el => el.classList.remove('is_invalid'));

  for (const fieldName in rules) {
    const input = form.querySelector(`[name="${fieldName}"]`);
    const rule = rules[fieldName];

    if (input && !rule.validate(input.value)) {
      isFormValid = false;
      input.classList.add('is_invalid');
      const span = document.createElement('span');
      span.classList.add('error_message');
      span.textContent = rule.errorMessage;
      input.insertAdjacentElement('afterend', span);
    }
  }
  return isFormValid;
}

export default validateForm;
