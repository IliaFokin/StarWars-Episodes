const cssPromises = {};
const app = document.querySelector('.app');
start();

export function loadResource(src) {
  if (src.endsWith('.js')) {
    return import(src);
  }
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  return fetch(src).then(res => res.json());
}

function renderPage(moduleName, apiURL, css = '../css/style.css') {
  Promise.all([moduleName, apiURL, css].map(src => loadResource(src))).then(([pageModule, data]) => {
    app.innerHTML = '';
    const page = pageModule.render(data);
    page.links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        history.pushState(null, '', link.href)
        start();
      })
    })
    app.append(page.container);
  });
}

function start() {
  const searchParams = new URLSearchParams(location.search);
  const episodeId = searchParams.get('films');

  if (episodeId) {
    renderPage('./episode-details.js', `https://swapi.dev/api/films/${episodeId}`);
  } else {
    renderPage('./episodes-list.js', 'https://swapi.dev/api/films');
  };
}

window.addEventListener('popstate', () => {
  console.log('test');
  start();
});