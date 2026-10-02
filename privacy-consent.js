(() => {
  const storageKey = 'graciasleo_privacy_preferences_v1';
  const measurementId = 'G-TYYLHGNTWQ';

  const getPreferences = () => {
    try { return JSON.parse(localStorage.getItem(storageKey)); } catch { return null; }
  };

  const removeAnalyticsCookies = () => {
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.split('=')[0].trim();
      if (name === '_ga' || name.startsWith('_ga_')) {
        document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      }
    });
  };

  const loadAnalytics = () => {
    if (window.__graciasLeoAnalyticsLoaded) return;
    window.__graciasLeoAnalyticsLoaded = true;
    window[`ga-disable-${measurementId}`] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(tag);
  };

  const applyPreferences = preferences => {
    const analyticsAllowed = Boolean(preferences && preferences.analytics);
    window[`ga-disable-${measurementId}`] = !analyticsAllowed;
    if (analyticsAllowed) loadAnalytics(); else removeAnalyticsCookies();
  };

  const showBanner = () => {
    const banner = document.querySelector('#privacy-consent');
    if (banner) banner.hidden = false;
  };

  const save = analytics => {
    const preferences = { analytics, updatedAt: new Date().toISOString() };
    localStorage.setItem(storageKey, JSON.stringify(preferences));
    applyPreferences(preferences);
    const banner = document.querySelector('#privacy-consent');
    if (banner) banner.hidden = true;
  };

  const render = () => {
    if (document.querySelector('#privacy-consent')) return;
    const preferences = getPreferences();
    const banner = document.createElement('section');
    banner.id = 'privacy-consent';
    banner.className = 'privacy-consent';
    banner.setAttribute('aria-label', 'Preferencias de privacidad');
    banner.hidden = Boolean(preferences);
    banner.innerHTML = '<div><strong>Tu privacidad</strong><p>Con tu permiso, usamos Google Analytics para medir visitas y mejorar el sitio. Podés aceptar, rechazar o cambiar esta decisión cuando quieras.</p><a href="/privacidad.html">Ver política de privacidad</a></div><div class="privacy-consent-actions"><button type="button" data-consent="reject">Rechazar</button><button type="button" data-consent="accept">Aceptar analítica</button></div>';
    document.body.append(banner);
    banner.addEventListener('click', event => {
      const choice = event.target.closest('[data-consent]');
      if (!choice) return;
      save(choice.dataset.consent === 'accept');
    });
  };

  window.graciasLeoPrivacy = { showBanner, clear: () => { localStorage.removeItem(storageKey); applyPreferences({ analytics: false }); showBanner(); } };
  window[`ga-disable-${measurementId}`] = true;
  document.addEventListener('DOMContentLoaded', () => {
    applyPreferences(getPreferences());
    render();
    document.querySelectorAll('[data-open-consent]').forEach(button => button.addEventListener('click', showBanner));
  });
})();
