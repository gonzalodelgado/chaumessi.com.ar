const countdown = document.querySelector('.countdown');
if (countdown) {
  const target = new Date(countdown.dataset.target).getTime();
  const units = { days: 86400000, hours: 3600000, minutes: 60000, seconds: 1000 };
  const update = () => {
    let remaining = Math.max(0, target - Date.now());
    Object.entries(units).forEach(([unit, size]) => {
      const element = countdown.querySelector(`[data-unit="${unit}"]`);
      const value = unit === 'days' ? Math.floor(remaining / size) : Math.floor((remaining % (unit === 'hours' ? 86400000 : unit === 'minutes' ? 3600000 : 60000)) / size);
      element.textContent = String(value).padStart(2, '0');
    });
    if (remaining === 0) countdown.closest('.countdown-wrap').querySelector('.countdown-note').textContent = 'La noche que guardaremos para siempre.';
  };
  update();
  setInterval(update, 1000);
}

const shareActions = document.querySelector('[data-share-url]');
if (shareActions) {
  const shareUrl = window.location.href.split('#')[0];
  const shareText = 'Un homenaje a Leo Messi y a su historia con la Selección Argentina 🇦🇷';
  const feedback = shareActions.querySelector('.share-feedback');

  shareActions.querySelectorAll('[data-share-network]').forEach((button) => {
    const network = button.dataset.shareNetwork;
    if (network === 'facebook') {
      button.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    }
    if (network === 'x') {
      button.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    }
    if (network === 'whatsapp') {
      button.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    }
    if (network === 'instagram') {
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(shareUrl);
          feedback.textContent = 'Enlace copiado. Pegalo en tu historia o publicación de Instagram.';
        } catch {
          feedback.textContent = `Copiá este enlace para compartirlo en Instagram: ${shareUrl}`;
        }
      });
    }
  });
}
