function toRoman(num) {
  if (num === 1) return 'i';
  if (num === 2) return 'ii';
  if (num === 3) return 'iii';
  if (num === 4) return 'iv';
  if (num === 5) return 'v';
  if (num === 6) return 'vi';
}

function compare( a, b ) {
  if ( a.episode_id < b.episode_id ){
    return -1;
  }
  if ( a.episode_id > b.episode_id ){
    return 1;
  }
  return 0;
}

export function render(data) {
  const container = document.createElement('div');
  const title = document.createElement('h1');
  const cardWrapper = document.createElement('div');
  const episodes = data.results;
  let links = [];
  
  episodes.sort(compare);

  container.classList.add('container');
  title.classList.add('title');
  cardWrapper.classList.add('wrapper');

  title.textContent = 'Star Wars Episodes';
  container.append(title, cardWrapper);

  for (const episode of episodes) {
    const card = document.createElement('a');
    const filmTitle = document.createElement('h2');

    card.classList.add('card');
    filmTitle.classList.add('subtitle');

    let episodeNumber = (parseInt(episode.episode_id) + 3) % 6;
    if (episodeNumber === 0) episodeNumber = 6;

    card.href = `?films=${episodeNumber}`;
    filmTitle.innerHTML = `eposide ${toRoman(episode.episode_id)}:<br> ${episode.title}`;

    card.append(filmTitle);
    links.push(card);
    cardWrapper.append(card);
  }

  return {container, links};
}