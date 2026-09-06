const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const businessEmail = 'business@mlocomputersolutions.com';

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.href = `mailto:${businessEmail}`;
  if (link.textContent.includes('@')) link.textContent = businessEmail;
});

document.querySelectorAll('body *').forEach((element) => {
  if (element.children.length === 0 && element.textContent.includes('mlocomputersolutionsllc@gmail.com')) {
    element.textContent = element.textContent.replaceAll('mlocomputersolutionsllc@gmail.com', businessEmail);
  }
});

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const form = document.querySelector('#service-form');
const requiredFields = ['name', 'email', 'service', 'message'];

function setFieldError(field, message) {
  const wrapper = field.closest('.form-row');
  const error = wrapper.querySelector(`[data-error-for="${field.name}"]`);
  wrapper.classList.toggle('has-error', Boolean(message));
  if (error) error.textContent = message;
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  let isValid = true;

  requiredFields.forEach((fieldName) => {
    const field = form.elements[fieldName];
    let message = '';
    if (!field.value.trim()) message = 'Please enter this information.';
    if (fieldName === 'email' && field.value.trim() && !field.validity.valid) message = 'Please enter a valid email address.';
    setFieldError(field, message);
    if (message) isValid = false;
  });

  const status = form.querySelector('.form-status');
  if (!isValid) {
    status.textContent = 'Please review the highlighted fields.';
    status.style.color = '#b54e44';
    form.querySelector('.has-error input, .has-error select, .has-error textarea')?.focus();
    return;
  }

  status.textContent = 'Your request is ready to send. Please call or email directly while form delivery is connected.';
  status.style.color = '#23704f';
  form.reset();
});

form?.querySelectorAll('input, select, textarea').forEach((field) => {
  field.addEventListener('input', () => {
    if (field.required && field.value.trim()) setFieldError(field, '');
  });
});
