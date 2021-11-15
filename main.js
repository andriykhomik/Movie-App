const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f9bee3d025a374e68f5883eb853bec07&page=1';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=f9bee3d025a374e68f5883eb853bec07&query=';
const form = document.querySelector('#form');
const search = document.querySelector('#search');
const main = document.querySelector('#main');

async function getMovies(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        showMovies(data.results);
    }catch (e){
        console.log (e);
    }
}

getMovies(API_URL);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)
        search.value = '';
    }else {
        window.location.reload ()
    }
})

function showMovies(moviesArray){
    main.innerHTML = '';

    moviesArray.forEach(movie => {

        const {title, poster_path, vote_average, overview} = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

       movieEl.innerHTML =
            `<img src="${IMAGE_PATH + poster_path}" alt="">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>`
       main.appendChild(movieEl);
    })
}

function getClassByRate(vote){
    if (vote >= 8 ) return 'green';
    if (vote >= 5) return  'orange';
    return 'red'
}
