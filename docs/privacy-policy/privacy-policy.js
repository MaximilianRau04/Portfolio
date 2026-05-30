const t = {
  de: {
    back: '← Zurück',
    title: 'Datenschutzerklärung',
    'h.responsible': '1. Verantwortlicher',
    'p.responsible': 'Verantwortlicher im Sinne der DSGVO ist:<br />Maximilian Rau, Carl-Mauch-Weg 2, 71691 Freiberg am Neckar<br />E-Mail: <a href="mailto:maximilian@raudev.com">maximilian@raudev.com</a>',
    'h.hosting': '2. Hosting',
    'p.hosting': 'Diese Website wird über GitHub Pages (GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA) gehostet. Beim Aufruf der Seite wird Ihre IP-Adresse vorübergehend von GitHub verarbeitet. Weitere Informationen finden Sie in der <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">Datenschutzerklärung von GitHub</a>.',
    'h.contact-form': '3. Kontaktformular',
    'p.contact-form': 'Wenn Sie das Kontaktformular auf dieser Website nutzen, werden die von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, Nachricht) zur Bearbeitung Ihrer Anfrage verarbeitet und per E-Mail an mich weitergeleitet. Diese Daten werden nicht an Dritte weitergegeben und nach abgeschlossener Bearbeitung gelöscht. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).',
    'h.fonts': '4. Schriftarten',
    'p.fonts': 'Diese Website verwendet die Schriftarten Inter und JetBrains Mono, die lokal auf dem Server gehostet werden. Es findet keine Verbindung zu externen Servern statt und es werden keine Daten an Dritte übertragen.',
    'h.localstorage': '5. Lokaler Speicher (localStorage)',
    'p.localstorage': 'Diese Website speichert Ihre Präferenzen für Sprache und Farbschema im lokalen Speicher Ihres Browsers (localStorage). Es werden keine Daten an Server übertragen. Der lokale Speicher ist kein Cookie und unterliegt nicht der Cookie-Richtlinie, enthält jedoch technisch notwendige Einstellungen zur Verbesserung der Nutzererfahrung.',
    'h.analytics': '6. Keine Analyse-Tools',
    'p.analytics': 'Diese Website verwendet keine Tracking- oder Analyse-Tools (z. B. Google Analytics). Es werden keine Nutzungsprofile erstellt.',
    'h.rights': '7. Ihre Rechte',
    'p.rights': 'Sie haben nach der DSGVO folgende Rechte gegenüber mir bezüglich der Sie betreffenden personenbezogenen Daten: Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Widerspruch (Art. 21) sowie Datenübertragbarkeit (Art. 20). Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Für Baden-Württemberg ist dies der <a href="https://www.baden-wuerttemberg.datenschutz.de" target="_blank" rel="noopener">Landesbeauftragte für Datenschutz und Informationsfreiheit Baden-Württemberg</a>.',
    'h.date': '8. Aktualität',
    'p.date': 'Stand: Mai 2026',
  },
  en: {
    back: '← Back',
    title: 'Privacy Policy',
    'h.responsible': '1. Controller',
    'p.responsible': 'The controller within the meaning of the GDPR is:<br />Maximilian Rau, Carl-Mauch-Weg 2, 71691 Freiberg am Neckar, Germany<br />Email: <a href="mailto:maximilian@raudev.com">maximilian@raudev.com</a>',
    'h.hosting': '2. Hosting',
    'p.hosting': 'This website is hosted via GitHub Pages (GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA). When you visit the site, your IP address is temporarily processed by GitHub. For more information, see the <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub Privacy Statement</a>.',
    'h.contact-form': '3. Contact Form',
    'p.contact-form': 'When you use the contact form on this website, the data you enter (name, email address, message) is processed to handle your inquiry and forwarded to me by email. This data is not shared with third parties and is deleted after processing is complete. Processing is based on Art. 6(1)(b) GDPR (pre-contractual measures) or Art. 6(1)(f) GDPR (legitimate interest in responding to inquiries).',
    'h.fonts': '4. Fonts',
    'p.fonts': 'This website uses the fonts Inter and JetBrains Mono, which are hosted locally on the server. No connection to external servers is made and no data is transmitted to third parties.',
    'h.localstorage': '5. Local Storage',
    'p.localstorage': 'This website stores your language and color scheme preferences in your browser\'s local storage (localStorage). No data is transmitted to servers. Local storage is not a cookie and is not subject to cookie regulations, but it stores technically necessary settings to improve the user experience.',
    'h.analytics': '6. No Analytics',
    'p.analytics': 'This website does not use any tracking or analytics tools (e.g. Google Analytics). No user profiles are created.',
    'h.rights': '7. Your Rights',
    'p.rights': 'Under the GDPR, you have the following rights regarding your personal data: right of access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), objection (Art. 21), and data portability (Art. 20). You also have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR).',
    'h.date': '8. Last Updated',
    'p.date': 'Last updated: May 2026',
  },
};

const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

let currentLang = localStorage.getItem('lang') || 'de';

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (t[lang]?.[key] !== undefined) el.textContent = t[lang][key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (t[lang]?.[key] !== undefined) el.innerHTML = t[lang][key];
  });
  document.documentElement.lang = lang;
  document.getElementById('lang-toggle').textContent = lang === 'de' ? 'EN' : 'DE';
}

applyTranslations(currentLang);

document.getElementById('lang-toggle').addEventListener('click', () => {
  currentLang = currentLang === 'de' ? 'en' : 'de';
  localStorage.setItem('lang', currentLang);
  applyTranslations(currentLang);
});

document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});
