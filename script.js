(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const menuToggle = document.querySelector('.menu-toggle');
  const menuClose = document.querySelector('.menu-close');
  const menuPanel = document.querySelector('.menu-panel');
  const menuLinks = document.querySelectorAll('.menu-links a');

  const savedTheme = localStorage.getItem('komal-portfolio-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;

  const updateThemeLabel = () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', 'Switch to ' + nextTheme + ' mode');
    themeToggle.setAttribute('title', 'Switch to ' + nextTheme + ' mode');
    document.querySelector('meta[name="theme-color"]').content = root.dataset.theme === 'dark' ? '#0b1013' : '#f7f5ef';
  };

  updateThemeLabel();
  themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('komal-portfolio-theme', root.dataset.theme);
    updateThemeLabel();
  });

  const setMenuOpen = (open) => {
    menuPanel.classList.toggle('is-open', open);
    menuPanel.setAttribute('aria-hidden', String(!open));
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
    if (open) menuClose.focus();
    else menuToggle.focus();
  };

  menuToggle.addEventListener('click', () => setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true'));
  menuClose.addEventListener('click', () => setMenuOpen(false));
  menuLinks.forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuPanel.classList.contains('is-open')) setMenuOpen(false);
  });

  document.querySelector('.contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(data.get('subject'));
    const body = encodeURIComponent(
      'Name: ' + data.get('name') + '\nEmail: ' + data.get('email') + '\n\n' + data.get('message')
    );
    document.querySelector('#form-note').textContent = 'Opening your email app with the message ready to send.';
    window.location.href = 'mailto:kj7161973@gmail.com?subject=' + subject + '&body=' + body;
  });

  document.querySelector('.lovable-badge button').addEventListener('click', () => {
    document.querySelector('#lovable-badge').remove();
  });
})();
