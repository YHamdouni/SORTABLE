const superheroApp = {
    itemsPerPage: 20, // nombre d'éléments par page
    currentPage: 1, // page actuelle
    superheroList: [], // liste des super-héros
    // check : false,
};

const tableBody = document.querySelector('#heroTable tbody');
const searchInput = document.getElementById('search');
function loadData() {
    let startIndex = (superheroApp.currentPage - 1) * superheroApp.itemsPerPage;
    let endIndex = startIndex + superheroApp.itemsPerPage;
    const paginatedData = superheroApp.superheroList.slice(startIndex, endIndex);

    paginatedData.forEach(superhero => {
        const row = document.createElement('tr');
        const superheroPowers = `
            intelligence: ${superhero.powerstats.intelligence}<br>
            strength: ${superhero.powerstats.strength}<br>
            speed: ${superhero.powerstats.speed}<br>
            durability: ${superhero.powerstats.durability}<br>
            power: ${superhero.powerstats.power}<br>
            combat: ${superhero.powerstats.combat}<br>
        `;
        row.innerHTML = `
            <td><img src="${superhero.images.xs}" /></td>
            <td>${superhero.name}</td>
            <td>${superhero.biography.fullName}</td>
            <td>${superhero.appearance.race || 'N/A'}</td>
            <td>${superhero.appearance.gender || 'N/A'}</td>
            <td>${superhero.appearance.height.join(' / ')}</td>
            <td>${superhero.appearance.weight}</td>
            <td>${superhero.biography.placeOfBirth || 'N/A'}</td>
            <td>${superhero.biography.alignment}</td>
            <td>${superheroPowers}</td>
        `;
        tableBody.appendChild(row);
    });
}

fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
    .then(response => response.json())
    .then(data => {
        superheroApp.superheroList = data;
        loadData(data);
    })
    .catch(error => console.error('Error fetching the superhero data:', error));

const Pagination = () => {
    superheroApp.itemsPerPage = document.getElementById('pageSize').value;
    if (superheroApp.itemsPerPage === 'all') {
        superheroApp.itemsPerPage = superheroApp.superheroList.length;
    }
    console.log("yu",superheroApp.superheroList);
    let totalPages = Math.ceil(superheroApp.superheroList.length / superheroApp.itemsPerPage);
    let paginationButtons = document.getElementById('btn');
    paginationButtons.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        let button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            superheroApp.currentPage = Number(button.textContent);
            tableBody.innerHTML = '';
            loadData();
        });
        paginationButtons.appendChild(button);
    }

    superheroApp.currentPage = 1;
    tableBody.innerHTML = '';
    loadData();
}
const filterHeroes = () => {
    const searchTerm = searchInput.value.toLowerCase();
    currentHeroes = superheroApp.superheroList.filter(hero => hero.name.toLowerCase().includes(searchTerm));
    let temp = superheroApp.superheroList
    superheroApp.superheroList = currentHeroes
    currentPage = 1;
    Pagination()
    loadData();
    superheroApp.superheroList = temp
};
document.getElementById('pageSize').addEventListener('click', Pagination);
searchInput.addEventListener('input', filterHeroes);
