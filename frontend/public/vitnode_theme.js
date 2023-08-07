(function () {
  const checkDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (
    (checkDark && !localStorage.getItem('VitNode_theme_manual')) ||
    localStorage.getItem('VitNode_theme') === 'dark'
  ) {
    document.documentElement.setAttribute('theme', 'dark');

    return;
  }

  document.documentElement.setAttribute('theme', 'light');
})();
