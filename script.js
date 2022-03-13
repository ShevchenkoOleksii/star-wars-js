var listOfHeroes = document.getElementById('listOfHeroes');
var previousButton = document.getElementById('previousButton');
var nextButton = document.getElementById('nextButton');
var heroName = document.getElementById('heroName');
var gender = document.getElementById('gender');
var birthYear = document.getElementById('birthYear');
var species = document.getElementById('species');
var planet = document.getElementById('planet');
var films = document.getElementById('films');
var tableContainer = document.querySelector('.tableContainer');
var infoAboutHero = document.querySelector('.infoAboutHero');
var closeButton = document.getElementById('closeButton');
var page;
var resultsSWAPI;
var body = document.querySelector('body');

previousButton.addEventListener('click', previousButtonFunc);
nextButton.addEventListener('click', nextButtonFunc);
closeButton.addEventListener('click', closeInfoAboutHero);

if (!localStorage.getItem('page')) {
    localStorage.setItem('page', 1);
    page = localStorage.getItem('page');
    getListOfHeroes(page);
} else {
    page = localStorage.getItem('page');
    getListOfHeroes(page);
}

function getListOfHeroes(page) {
    var url = `https://swapi.dev/api/people/?page=${page}`;
    fetch(url)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
       resultsSWAPI = data.results;
    }).then(showInfo);
}

function showInfo() {
    localStorage.setItem('page', page);
    clearUl();

    for (let index = 0; resultsSWAPI != undefined && index < resultsSWAPI.length; index++) { 
        var currentLi = document.createElement('li');
        currentLi.innerHTML = resultsSWAPI[index].name;
        currentLi.addEventListener('mousedown', changeBG);
        
        currentLi.addEventListener('click', showInfoAboutHero.bind(this, resultsSWAPI[index]));
        listOfHeroes.insertAdjacentElement('beforeend', currentLi);
        listOfHeroes.appendChild(currentLi);
    } 
}

function changeBG() {
    var liStyle = this.style;
    liStyle.background = '#b9a525';
    liStyle.transform = 'rotateX(90deg)';
    liStyle.transition = 'transform 0.2s linear';

    function changeBGBack() {
        liStyle.transform = 'rotateX(0deg)';
        liStyle.transition = 'transform 1s linear';

    }
    setTimeout(changeBGBack, 1000);

}

function clearUl() {
    listOfHeroes.innerHTML = '';
}

function previousButtonFunc() {
    page--;
    if (page > 0) {
        getListOfHeroes(page);
    } else {
        page++;
        return;
    }
    localStorage.setItem('page', page);
    clearUl();

    for (let index = 0; resultsSWAPI != undefined && index < resultsSWAPI.length; index++) { 
        var currentLi = document.createElement('li');
    
        currentLi.innerHTML = resultsSWAPI[index].name;
        currentLi.addEventListener('click', showInfoAboutHero.bind(this, resultsSWAPI[index]));

        listOfHeroes.insertAdjacentElement('beforeend', currentLi);
        listOfHeroes.appendChild(currentLi);
    } 
}

function nextButtonFunc() {
    page++;
    if (page < 10) {
        getListOfHeroes(page);
    } else {
        page--;
        return;
    }
    localStorage.setItem('page', page);

    clearUl();

    for (let index = 0; resultsSWAPI != undefined && index < resultsSWAPI.length; index++) { 
        var currentLi = document.createElement('li');
    
        currentLi.innerHTML = resultsSWAPI[index].name;
        currentLi.addEventListener('click', showInfoAboutHero.bind(this, resultsSWAPI[index]));
        listOfHeroes.insertAdjacentElement('beforeend', currentLi);
        listOfHeroes.appendChild(currentLi);
    }  
}

function showInfoAboutHero(resultsSWAPI) {
    heroName.innerHTML = resultsSWAPI.name;
    gender.innerHTML = resultsSWAPI.gender;
    birthYear.innerHTML = resultsSWAPI.birth_year;
    getFilms(resultsSWAPI);
    getSpecies(resultsSWAPI);
    getPlanet(resultsSWAPI);
    infoAboutHero.classList.toggle('hidden');
    body.classList.toggle('forBody');
}

function closeInfoAboutHero() {
    transformTable();
    setTimeout(toggleClass, 500);
    
    function toggleClass() {
        infoAboutHero.classList.toggle('hidden');
        body.classList.toggle('forBody');
    }
}

function transformTable() {
    tableContainer.style.transform = 'rotateY(90deg)';
    tableContainer.style.transition = 'transform 0.2s linear';
    setTimeout(transformTableBack, 1000);
    function transformTableBack() {
    tableContainer.style.transform = 'rotateY(0deg)';
    }
}

function getFilms(resultsSWAPI) {
    var filmUrl;
    films.innerHTML = '';
    for (let index = 0; index < resultsSWAPI.films.length; index++) {
        filmUrl = resultsSWAPI.films[index];
        fetch(filmUrl)
        .then(function (response) {
        return response.json();
        }).then(function (data) {
        var currentLi = document.createElement('li');
        currentLi.innerHTML = data.title;
        films.insertAdjacentElement('beforeend', currentLi);
        films.appendChild(currentLi);
        });
    }   
}

function getSpecies(resultsSWAPI) {
    var speciesUrl;
    for (let index = 0; index < resultsSWAPI.species.length; index++) {
        speciesUrl = resultsSWAPI.species[index];
        fetch(speciesUrl)
        .then(function (response) {
        return response.json();
        }).then(function (data) {
        var resultsSpecies = data.name;
        species.innerHTML = resultsSpecies;
        });
    }   
}

function getPlanet(resultsSWAPI) {
    var planetUrl;
    planetUrl = resultsSWAPI.homeworld;
    fetch(planetUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            var resultsPlanet = data.name;
            planet.innerHTML = resultsPlanet;
        });
}