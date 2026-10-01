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
