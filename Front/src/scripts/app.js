const listeDeLivre = [
    {
        nom: 'Le Seigneur des Anneaux',
        auteur: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        description: 'Le Seigneur des anneaux est une trilogie romanesque de l’écrivain britannique J. R. R. Tolkien. Elle se déroule en Terre du Milieu, un monde imaginaire inventé par l’auteur. La trilogie se compose de trois parties : La Communauté de l’anneau, Les Deux Tours et Le Retour du roi.',
        quantity: 10,
    },
    {
        nom: 'Harry Potter',
        auteur: 'J.K. Rowling',
        genre: 'Fantasy',
        description: 'Harry Potter est une série littéraire de fantasy écrite par l’auteure britannique J. K. Rowling. Elle raconte les aventures d’un jeune sorcier nommé Harry Potter et de ses amis Hermione Granger et Ron Weasley, élèves à l’école de sorcellerie de Poudlard.',
        quantity: 5,
    },
    {
        nom: 'Le Petit Prince',
        auteur: 'Antoine de Saint-Exupéry',
        genre: 'Conte philosophique',
        description: 'Le Petit Prince est un conte philosophique écrit par Antoine de Saint-Exupéry. Publié en 1943 à New York, c’est l’œuvre la plus connue de l’auteur. Elle raconte l’histoire d’un petit prince venu d’une autre planète qui rencontre un aviateur échoué dans le désert.',
        quantity: 3,
    }
];

const tableElement = document.getElementById('table');

listeDeLivre.forEach((livre, index) => {
    tableElement.innerHTML += `
        <h3>${livre.nom}</h3>
        <p>${livre.auteur}</p>
        <p>${livre.genre}</p>
        <p>${livre.description}</p>
        <p>${livre.quantity}</p>
    `;
});
