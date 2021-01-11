const apiKey = '19760906-677c9d98dcaf25643c58f07c9';

function fetchNameInput(name, page) {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${name}&page=${page}&per_page=12&key=${apiKey}`,
  ).then(response => response.json());
}

export default { fetchNameInput };
