const API_key = 'UGXr2bfM89mdm7gsfheIxwKn92zIJ0OhdN6wirzEEzXjNfNYROwJLcep';
const imageContainer = document.getElementById('imageContainer');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const query = searchInput.value;


function fetchImages(query) {
  fetch(`https://api.pexels.com/v1/search?query=${query}`, {
    method: 'GET',
    headers: {
      Authorization: API_key
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const images = data.photos;

    images.forEach(image => {
        const card = document.createElement('div');
      card.className = 'card col-md-3 mb-4';
      const imgElement = document.createElement('img');
      imgElement.src = image.src.medium;
      imgElement.className = 'img-fluid ';
      card.appendChild(imgElement);
      imageContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error fetching images:', error);
  });
}
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    imageContainer.innerHTML = ''; // pulisce il contenitore delle immagini
    fetchImages(query);
  } else {
    alert('Per favore, inserisci un termine di ricerca.');
  }
});
