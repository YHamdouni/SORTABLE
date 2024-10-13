const superheroApp = {
    itemsPerPage: 20, // nombre d'éléments par page
    currentPage: 1, // page actuelle
    superheroList: [], // liste des super-héros
    originalSuperheroList: [],
};

const tableBody = document.querySelector('#heroTable tbody');
const searchInput = document.getElementById('search');

//////////////////////////////////loadingdata/////////////////////////////////////////////////
function loadData() {
    let startIndex = (superheroApp.currentPage - 1) * superheroApp.itemsPerPage;
    let endIndex = startIndex + superheroApp.itemsPerPage;
    const paginatedData = superheroApp.superheroList.slice(startIndex, endIndex);
    paginatedData.forEach(superhero => {
        const row = document.createElement('tr');
        const superheroPowers = `
           <td> ${superhero.powerstats.intelligence}</td>
          <td>  ${superhero.powerstats.strength}</td>
          <td>  ${superhero.powerstats.speed}</td>
          <td>  ${superhero.powerstats.durability}</td>
          <td>  ${superhero.powerstats.power}</td>
           <td>  ${superhero.powerstats.combat}</td>
        `;
        row.innerHTML = `
            <td><img src="${superhero.images.xs}" /></td>
            <td>${superhero.name}</td>
            <td>${superhero.biography.fullName}</td>
            <td>${superhero.appearance.race}</td>
            <td>${superhero.appearance.gender}</td>
            <td>${superhero.appearance.height.join(' / ')}</td>
            <td>${superhero.appearance.weight}</td>
            <td>${superhero.biography.placeOfBirth}</td>
            <td>${superhero.biography.alignment}</td>
            ${superheroPowers}
        `;
        tableBody.appendChild(row);
    });
}


///////////////////////////////////fetchingdata/////////////////////////////////////
fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
    .then(response => response.json())
    .then(data => {
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        superheroApp.originalSuperheroList = sortedData; // Store the original list
        superheroApp.superheroList = sortedData; // Set the initial list to the fetched data
        loadData();
        Pagination();
    })
    .catch(error => console.error('Error fetching the superhero data:', error));

//////////////////////////////pagination function ///////////////////////////////////
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
        button.className="btn"
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
///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////filterheroes////////////////////////////////////////
function filterHeroes() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === "") {
        superheroApp.superheroList = superheroApp.originalSuperheroList;
    } else {
        superheroApp.superheroList = superheroApp.originalSuperheroList.filter(hero =>
            hero.name.toLowerCase().includes(searchTerm)
        );
    }
    console.log(superheroApp.superheroList)
    superheroApp.currentPage = 1;
    Pagination();
}
searchInput.addEventListener('input', filterHeroes);
///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////Sort///////////////////////////////////////////////
//Sorting data in table by columns
let currentSortOrder = {
    Name: 'asc',
    FullName: 'asc',
    Race: 'asc',
    Gender: 'asc',
    PlaceofBirth: 'asc',
    Alignment: 'asc',
    Height : 'asc',
    Weight : 'asc',
    Intelligence : 'asc',
    Strength : 'asc',
    Speed : 'asc',
    Durability : 'asc',
    Power : 'asc',
    Combat : 'asc'
};

function getValue(hero, type) {
    if (type === "Name") {
        return hero.name;
    } else if (type === "FullName") {
        return hero.biography.fullName;
    } else if (type === "Race") {
        return hero.appearance.race;
    } else if (type === "Gender") {
        return hero.appearance.gender;
    } else if (type === "PlaceofBirth") {
        return hero.biography.placeOfBirth;
    } else if (type === "Alignment") {
        return hero.biography.alignment;
    } else if (type === "Height") {
        const heightStr = hero.appearance.height[1];
        if (typeof heightStr === 'string') {
            const heightInMeters = heightStr.includes('meters') ? parseFloat(heightStr) * 100 : parseFloat(heightStr);
            return isNaN(heightInMeters) ? 0 : heightInMeters; // Return 0 for invalid heights
        }
        return 0;
    } else if (type === "Weight") {
        const weightStr = hero.appearance.weight[1];
        if (typeof weightStr === 'string') {
            const WeightInkg = weightStr.includes('tons') ? parseFloat(weightStr) * 1000 : parseFloat(weightStr);
            return isNaN(WeightInkg) ? 0 : WeightInkg; // Return 0 for invalid heights
        }
        return 0;
    } else if ((type === "Intelligence")) {
        return parseFloat(hero.powerstats.intelligence)
    }
    else if ((type === "Strength")) {
        return parseFloat(hero.powerstats.strength)
    }
    else if ((type === "Speed")) {
        return parseFloat(hero.powerstats.speed)
    }
    else if ((type === "Durability")) {
        return parseFloat(hero.powerstats.durability)
    }
    else if ((type === "Power")) {
        return parseFloat(hero.powerstats.power)
    }
    else if ((type === "Combat")) {
        return parseFloat(hero.powerstats.combat)
    }

} function Sort() {
    const headers = document.querySelectorAll('#heroTable th');
    headers.forEach((header) => {
        header.addEventListener('click', () => {
            const type = header.getAttribute('id');
            let sortOrder = currentSortOrder[type];
            superheroApp.superheroList.sort((a, b) => {
                const aValue = getValue(a, type);
                const bValue = getValue(b, type);


                console.log(aValue);
                console.log(bValue);
                if (aValue === '' || aValue === null || aValue === '-' || aValue === undefined) return 1;//|| aValue === NaN
                if (bValue === '' || bValue === null || bValue === '-' || bValue === undefined) return -1;//|| bValue === NaN
                if (type === "Height" || type === "Weight" || type==="Intelligence" || type==="Strength" || type==="Speed" || type==="Durability" || type==="Power" || type==="Combat") {
                    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
                } else {
                    return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                }
            });
            currentSortOrder[type] = (sortOrder === 'asc') ? 'desc' : 'asc';
            tableBody.innerHTML = '';
            loadData();
        });
    });
}

Sort();
