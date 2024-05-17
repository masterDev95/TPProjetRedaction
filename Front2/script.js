document.addEventListener("DOMContentLoaded", function() {
  let books = [];
  let displayedBookCards = [];

  fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(data => {
      books = data;
      renderBooks(books);
    })
    .catch(error =>
      console.error('Erreur lors du chargement des livres:', error)
    );

  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', filterBooks);
});

function renderBooks(books) {
  const container = document.getElementById('books-container');
  container.innerHTML = '';

  displayedBookCards = [];

  books.forEach(book => {
    const bookCard = createBookCard(book);
    container.appendChild(bookCard);
    displayedBookCards.push(bookCard);
  });
}

function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  bookCard.innerHTML = `
    <h2>${book.nom}</h2>
    <p><strong>Auteur :</strong> ${book.auteur}</p>
    <p><strong>Genre :</strong> ${book.genre}</p>
    <p>${book.description}</p>
    <p><strong>Quantité :</strong> ${book.quantity}</p>
  `;

  return bookCard;
}

function filterBooks() {
  const searchTerm = this.value.toLowerCase();
  const filteredBookCards = displayedBookCards.filter(bookCard => {
    const bookName = bookCard.querySelector('h2').textContent.toLowerCase();
    return bookName.includes(searchTerm);
  });

  const container = document.getElementById('books-container');
  container.innerHTML = '';

  filteredBookCards.forEach(bookCard => {
    container.appendChild(bookCard);
  });
}