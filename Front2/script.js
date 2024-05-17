document.addEventListener("DOMContentLoaded", function() {
  fetch('http://localhost:3000/books')  // Utilisez l'URL complète avec le port 3000
    .then(response => response.json())
    .then(books => {
      const container = document.getElementById('books-container');
      books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        
        bookCard.innerHTML = `
          <h2>${book.nom}</h2>
          <p><strong>Auteur :</strong> ${book.auteur}</p>
          <p><strong>Genre :</strong> ${book.genre}</p>
          <p>${book.description}</p>
          <p><strong>Quantité :</strong> ${book.quantity}</p>
        `;

        container.appendChild(bookCard);
      });
    })
    .catch(error => 
      console.error('Erreur lors du chargement des livres:', error)
  );
});
