const t = {
  de: {
    back: '← Zurück',
    title: 'Impressum',
    'h.info': 'Angaben gemäß § 5 DDG',
    'h.contact': 'Kontakt',
    'h.person': 'Hinweis zur Person',
    'p.person': 'Diese Website ist eine private Portfolio-Seite einer Privatperson. Es besteht keine gewerbliche Tätigkeit im Sinne des Gewerberechts.',
    'h.liability-content': 'Haftung für Inhalte',
    'p.liability-content': 'Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
    'h.liability-links': 'Haftung für Links',
    'p.liability-links': 'Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
    'h.copyright': 'Urheberrecht',
    'p.copyright': 'Die durch mich erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen meiner schriftlichen Zustimmung.',
  },
  en: {
    back: '← Back',
    title: 'Legal Notice',
    'h.info': 'Information pursuant to § 5 DDG',
    'h.contact': 'Contact',
    'h.person': 'Note',
    'p.person': 'This website is a private portfolio site of a private individual. There is no commercial activity in the sense of trade law.',
    'h.liability-content': 'Liability for Content',
    'p.liability-content': 'As a service provider, I am responsible for my own content on these pages in accordance with general laws (§ 7 para. 1 DDG). However, I am not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity (§§ 8–10 DDG).',
    'h.liability-links': 'Liability for Links',
    'p.liability-links': 'My website contains links to external third-party websites over whose content I have no influence. I therefore cannot accept any liability for this external content. The respective provider or operator of the linked pages is always responsible for their content.',
    'h.copyright': 'Copyright',
    'p.copyright': 'The content and works created by me on these pages are subject to German copyright law. Reproduction, editing, distribution, and any kind of use beyond the limits of copyright law require my written consent.',
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
