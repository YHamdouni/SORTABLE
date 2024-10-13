const superheroApp = {
    itemsPerPage: 20, // nombre d'éléments par page
    currentPage: 1, // page actuelle
    superheroList: [], // liste des super-héros
    originalSuperheroList:[],
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
        superheroApp.originalSuperheroList = data; // Store the original list
        superheroApp.superheroList = data; // Set the initial list to the fetched data
        loadData();
        Pagination();
    })
    .catch(error => console.error('Error fetching the superhero data:', error));






function Pagination() {
    superheroApp.itemsPerPage = document.getElementById('pageSize').value;
    if (superheroApp.itemsPerPage === 'all') {
        superheroApp.currentPage = 1
        superheroApp.itemsPerPage = superheroApp.superheroList.length;
    } else {
        superheroApp.itemsPerPage = Number(superheroApp.itemsPerPage)
    }
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
document.getElementById('pageSize').addEventListener('click', Pagination);


function filterHeroes() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === "") {
        superheroApp.superheroList = superheroApp.originalSuperheroList;
    } else {
        superheroApp.superheroList = superheroApp.originalSuperheroList.filter(hero => 
            hero.name.toLowerCase().includes(searchTerm)
        );
    }
    superheroApp.currentPage = 1;
    Pagination();
    loadData();
}


searchInput.addEventListener('input', filterHeroes);
