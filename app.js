if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch((error) => {
      console.log('Service Worker registration failed:', error);
    });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Предотвращаем показ стандартного диалога браузера
  e.preventDefault();
  // Сохраняем событие для использования позже
  deferredPrompt = e;

  // Показываем пользователю ваш UI элемент для установки
  const installButton = document.getElementById('installButton');
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    // Скрываем ваш UI элемент
    installButton.style.display = 'none';
    // Показываем диалог установки PWA
    deferredPrompt.prompt();
    // Ждем, пока пользователь решит установить PWA или отклонить установку
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});
