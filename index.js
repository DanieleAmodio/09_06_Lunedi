const API_key = 'UGXr2bfM89mdm7gsfheIxwKn92zIJ0OhdN6wirzEEzXjNfNYROwJLcep'; // inserisci qui la tua API key di Pexels
const imageContainer = document.getElementById('imageContainer'); // seleziona il contenitore delle immagini dal DOM
const searchButton = document.getElementById('searchButton'); // seleziona il pulsante di ricerca dal DOM
const searchInput = document.getElementById('searchInput'); // seleziona il campo di input per la ricerca dal DOM
const query = searchInput.value; // recupera il valore del campo di input per la ricerca


function fetchImages(query) {   // funzione per recuperare le immagini da Pexels
  fetch(`https://api.pexels.com/v1/search?query=${query}`, { // effettua una richiesta GET all'API di Pexels
    method: 'GET', // specifica il metodo della richiesta
    headers: {
      Authorization: API_key  // include l'API key nell'intestazione della richiesta per l'autenticazione
    }
  })
    .then(response => response.json()) // converte la risposta in JSON
    .then(data => {
      console.log(data);
      const images = data.photos; // accede alla proprietà 'photos' dell'oggetto restituito

    images.forEach(image => {                       // itera su ogni immagine 
        const card = document.createElement('div'); // crea un nuovo elemento 'div' per la card
      card.className = 'card col-md-3 mb-4'; // assegna la classe 'card' e altre classi di Bootstrap per lo stile
      const imgElement = document.createElement('img'); // crea un nuovo elemento 'img' per l'immagine
      imgElement.src = image.src.medium; // imposta l'URL dell'immagine come sorgente dell'elemento 'img'
      imgElement.className = 'img-fluid '; // assegna la classe 'img-fluid' per rendere l'immagine reattiva
      card.appendChild(imgElement);  // aggiunge l'elemento 'img' alla card
      imageContainer.appendChild(card); // aggiunge la card al contenitore delle immagini
    });
  })
  .catch(error => {
    console.error('Error fetching images:', error);
  });
}
searchButton.addEventListener('click', () => { // aggiunge un gestore di eventi al pulsante di ricerca
  const query = searchInput.value.trim(); // recupera il valore del campo di input per la ricerca e rimuove gli spazi vuoti all'inizio e alla fine
  if (query) { // verifica se il campo di input non è vuoto
    imageContainer.innerHTML = ''; // pulisce il contenitore delle immagini
    fetchImages(query); // chiama la funzione per recuperare le immagini
  } else {
    alert('Per favore, inserisci un termine di ricerca.');
  }
});
