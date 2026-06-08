(function () {
  var root = document.documentElement;
  var button = document.querySelector('.theme_toggle');
  var storageKey = 'site-theme';
  var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function getSavedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {}
  }

  function getCurrentTheme() {
    return root.getAttribute('data-theme') || (mediaQuery.matches ? 'dark' : 'light');
  }

  function updateButton(theme) {
    if (!button) {
      return;
    }

    var isDark = theme === 'dark';
    button.textContent = '';
    button.setAttribute('data-next-theme', isDark ? 'light' : 'dark');
    button.setAttribute('aria-label', isDark ? 'Включить светлую тему' : 'Включить тёмную тему');
    button.setAttribute('title', isDark ? 'Светлая тема' : 'Тёмная тема');
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    updateButton(theme);
  }

  var savedTheme = getSavedTheme();
  if (savedTheme === 'light' || savedTheme === 'dark') {
    applyTheme(savedTheme);
  } else {
    updateButton(getCurrentTheme());
  }

  if (button) {
    button.addEventListener('click', function () {
      var nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      saveTheme(nextTheme);
    });
  }

  function handleSystemThemeChange() {
    if (!getSavedTheme()) {
      root.removeAttribute('data-theme');
      updateButton(mediaQuery.matches ? 'dark' : 'light');
    }
  }

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleSystemThemeChange);
  } else if (mediaQuery.addListener) {
    mediaQuery.addListener(handleSystemThemeChange);
  }
})();
