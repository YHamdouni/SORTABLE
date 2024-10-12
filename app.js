let v = 20
let currentpage = 1
let heroes = []

const tableBody = document.querySelector('#heroTable tbody');
function loadData() {

    let start = ( currentpage- 1) * v
    let end = start + v
    const finaldata = heroes.slice(start, end)
    finaldata.forEach(hero => {

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
                <td><img src="${hero.images.xs}/>"</td>
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
    .then((data)=>{
        heroes = data
        pagination()
        loadData()
    })
    .catch(error => console.error('Error fetching the superhero data:', error));
    
    



const pagination = ()=>{
    v = document.getElementById('pageSize').value
    if  (v == 'all'){
        currentpage = 1
        v = heroes.length;
    }else{
        v=Number(v)
    }
    let pages = Math.ceil(heroes.length/v)
    let btn = document.getElementById('btn')
    btn.innerHTML = ''
    for(let i =1;i<=pages;i++){
        let b = document.createElement('button')
        b.textContent = i
        b.addEventListener('click', ()=>{
            currentpage = Number(b.textContent)
            tableBody.innerHTML= `` 
            loadData()
        })
        btn.appendChild(b)
    }
    currentpage = 1
    tableBody.innerHTML= ``  
    loadData()
}

document.getElementById('pageSize').addEventListener('click', pagination)
