// app.js

function loadData(heroes){
    const tableBody = document.querySelector('#heroTable tbody');
    heroes.forEach(hero => {
        const row = document.createElement('tr');
        const superheroespowers = `
                intelligence: ${hero.powerstats.intelligence}<br>
                strength: ${hero.powerstats.strength}<br>
                speed: ${hero.powerstats.speed}<br>
                durability: ${hero.powerstats.durability}<br>
                power: ${hero.powerstats.power}<br>
                combat: ${hero.powerstats.combat}<br>
                `
        row.innerHTML = `
                <td><img src="${hero.images.xs}"</td>
                <td>${hero.name}</td>
                <td>${hero.biography.fullName}</td>
                <td>${hero.appearance.race || 'N/A'}</td>
                <td>${hero.appearance.gender || 'N/A'}</td>
                <td>${hero.appearance.height.join(' / ')}</td>
                <td>${hero.appearance.weight}</td>
                <td>${hero.biography.placeOfBirth || 'N/A'}</td>
                <td>${hero.biography.alignment}</td>
                <td>${superheroespowers}</td>
            `;
        tableBody.appendChild(row);
    });
}

fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
    .then(response => response.json())
    .then(loadData)
    .catch(error => console.error('Error fetching the superhero data:', error));