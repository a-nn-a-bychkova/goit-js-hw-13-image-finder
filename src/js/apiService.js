const BASE_URL = 'https://pixabay.com';

let page = 0;

function fetchImages(searchQuery) {
  page += 1;
  console.log(page);
  return fetch(
    `${BASE_URL}/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=19110749-e340c63922b3f8a4d502270f7`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  });
}

export default fetchImages;
