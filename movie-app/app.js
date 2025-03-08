const API_KEY = 'api_key=ab8f0107a1fdcec1f47e4293a628805e';
//API Read Access Token: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjhmMDEwN2ExZmRjZWMxZjQ3ZTQyOTNhNjI4ODA1ZSIsIm5iZiI6MTc0MTM3NjQ3Ni4xNDYsInN1YiI6IjY3Y2I0YmRjNDJjNzUyMTI1MmY1ODEzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tBPgh3s7w6Bpj81MjJRRjEXe3ubDl1OhSjzVriHtvB4
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'
+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie'+API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url){

   fetch(url).then(res => res.json()).then(data =>{
     console.log(data.results);
     showmovies(data.results);
   })
}

function showmovies(data){
    main.innerHTML= '';
   
   data.forEach(movie => {
       const {title, 
        poster_path,
        vote_average,
        overview} = movie;
       const movieEl = document.createElement('div');
       movieEl.classList.add('movie');
       movieEl.innerHTML=`
         <img src="${IMG_URL+poster_path}" alt="${title}">
        <div class="movie-info">
            <h1>${title}</h1>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h1>overview</h1>
            ${overview}
            </div>
        `
        main.appendChild(movieEl);

   })
}

function getColor(vote){
  if(vote >= 8){
    return 'green'
  }else if(vote >= 5){
    return 'orange'
  }else{
    return 'red'
  }
}

form.addEventListener('submit',(e)=>{
  e.preventDefault();

  const searchTerm = search.value;

  if(searchTerm) {
    getMovies(searchURL+'&query='+searchTerm)
  }else{
    getMovies(API_URL);
  }
})