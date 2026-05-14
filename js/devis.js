// STEP NAVIGATION
let currentStep = 1;

function goStep(n) {
  if (n > currentStep && !validateStep(currentStep)) return;

  document.getElementById('step' + currentStep).classList.remove('active');
  document.getElementById('step' + n).classList.add('active');

  document.querySelectorAll('.step-btn').forEach((btn, i) => {
    btn.classList.remove('active', 'done');
    const step = i + 1;
    if (step < n) btn.classList.add('done');
    if (step === n) btn.classList.add('active');
  });

  currentStep = n;
}

// ============================================================
// VALIDATION
// ============================================================
function validateStep(n) {
  let valid = true;
  if (n === 1) {
    valid &= validateField('f_nom', 'nom_complet', v => v.trim().length >= 2);
    valid &= validateField('f_tel', 'telephone', v => /^[\d\s\+\-\.]{8,}$/.test(v));
    valid &= validateField('f_email', 'email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
  }
  return valid;
}

function validateField(fieldId, inputName, testFn) {
  const wrap = document.getElementById(fieldId);
  if (!wrap) return true;
  const input = wrap.querySelector('[name="' + inputName + '"]');
  if (!input) return true;
  const ok = testFn(input.value);
  wrap.classList.toggle('has-error', !ok);
  return ok;
}

function resetForm() {
  location.reload();
}

const devisForm = document.getElementById('devisForm')
devisForm.addEventListener('submit', prepareSubmit)
function prepareSubmit(e) {
  e.preventDefault()
  const errMsg = document.querySelector('.err-msg')
  let validate = validateField('f_desc', 'description_travaux', v =>  v.trim().length >= 10)
  if (validate) {
    document.getElementById('devisForm').submit();
  }
}