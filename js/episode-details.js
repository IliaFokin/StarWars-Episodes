function toRoman(num) {
  if (num === 1) return 'i';
  if (num === 2) return 'ii';
  if (num === 3) return 'iii';
  if (num === 4) return 'iv';
  if (num === 5) return 'v';
  if (num === 6) return 'vi';
}

function fetchResource(src) {
  return fetch(src).then(res => res.json());
}

function loadSectionInfo(arr, title) {
  return Promise.all(arr.map(src => fetchResource(src))).then((response) => {
    const sectionTitle = document.createElement('h2');
    const sectionList = document.createElement('ul');

    sectionTitle.classList.add('subtitle');
    sectionList.classList.add('list');

    sectionTitle.textContent = title;
    response.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item.name;
      sectionList.append(listItem);
    })
    return { sectionTitle, sectionList };
  });
}

export function render(data) {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const episodeTitle = document.createElement('h1');
  const backBtn = document.createElement('a');
  const episodeImage = document.createElement('img');
  const episodeDescr = document.createElement('p');
  const sections = document.createElement('div');

  container.classList.add('container');
  wrapper.classList.add('wrapper');
  backBtn.classList.add('back');
  episodeTitle.classList.add('title');
  episodeImage.classList.add('image');
  episodeDescr.classList.add('text');
  sections.classList.add('sections');

  backBtn.textContent = 'Back to episodes';
  backBtn.href = '/'
  episodeTitle.innerHTML = `episode ${toRoman(data.episode_id)}<br>${data.title}`;
  episodeImage.src = `../img/ep${data.episode_id}.jpg`;
  episodeImage.alt = `Episode ${data.episode_id}`;
  episodeDescr.textContent = data.opening_crawl;

  wrapper.append(backBtn, episodeTitle, episodeImage, episodeDescr, sections);

  Promise.all([
    loadSectionInfo(data.planets, 'planets'),
    loadSectionInfo(data.species, 'species'),
    loadSectionInfo(data.starships, 'starships')
  ]).then(response => {
    response.forEach(({ sectionTitle, sectionList} ) => {
      sections.append(sectionTitle, sectionList);
    })
    container.append(wrapper);
  });

  const links = [backBtn];

  return {container, links};
}