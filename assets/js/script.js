'use strict';


/**
 * navbar variables
 */

const navOpenBtn = document.querySelector("[data-menu-open-btn]");
const navCloseBtn = document.querySelector("[data-menu-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {

  navElemArr[i].addEventListener("click", function () {

    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");

  });

}



/**
 * header sticky
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {

  window.scrollY >= 10 ? header.classList.add("active") : header.classList.remove("active");

});



/**
 * go top
 */

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  window.scrollY >= 500 ? goTopBtn.classList.add("active") : goTopBtn.classList.remove("active");

});



// TMDB
const API_KEY = '683940b4e8acc2732223abeaf08fa155';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const GENRE_URL = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  } 
]

const topRateMovieContainer = document.getElementById('popular');
const moviesContainer = document.getElementById('movies');
const tagsEl = document.getElementById('tags');
const topRateMovieContainerDisplay = document.getElementById('top-rated-display');

let genreMap = {};
function fetchGenres() {
  fetch(GENRE_URL)
    .then(response => response.json())
    .then(data => {
      data.genres.forEach(genre => {
        genreMap[genre.id] = genre.name;
      });
      // After fetching genres, fetch top-rated and now-playing movies
      getTopRates(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
      getMovies(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
    })
    .catch(error => {
      console.error('Error fetching genres:', error);
    });
}

fetchGenres();  // Fetch genres first



// getTopRates(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);

function getMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      showMovies(data.results.slice(0, 7));  // Chỉ hiển thị 7 phim ban đầu
      if (data.results.length > 7) {
        const showAllButton = document.createElement('button');
        showAllButton.textContent = 'Show more';
        showAllButton.style.color = 'white';
        showAllButton.style.height = '450px';
        showAllButton.style.font = 'inherit';
        showAllButton.addEventListener('click', function() {
          showMovies(data.results);  // Hiển thị tất cả các phim
          this.style.display = 'none';  // Ẩn nút "Xem thêm"
        });
        moviesContainer.appendChild(showAllButton);
      }
    });
}

function showMovies(movies) {
 
  moviesContainer.innerHTML = '';

  movies.forEach(movie => {
    const { title, poster_path, vote_average, release_date, original_language, genre_ids } = movie;
    const year = release_date.split('-')[0];  // Chỉ lấy năm từ release_date
    const movieEl = document.createElement('li');
    movieEl.classList.add('movie-card');

    const genres = genre_ids.map(id => genreMap[id]).join(', ');
    
    movieEl.innerHTML = `
      <a href="/movie-details">
        <figure class="card-banner">
          <img src="${IMG_URL + poster_path}" alt="${title}">
          <div class="play-button">
            <i class="far fa-play-circle"></i>
          </div>
        </figure>
      </a>
      <div class="title-wrapper">
        <a href="/movie-details">
          <h3 class="card-title">${title}</h3>
        </a>
        <time datetime="${release_date}">${year}</time>  <!-- Thêm năm vào đây -->
      </div>
      <div class="card-meta">
        <div class="badge badge-outline">HD</div>
        <div class="duration">
          
        </div>
        <div class="rating">
          <ion-icon name="star"></ion-icon>
          <data>${vote_average}</data>
        </div>
      </div>
    `;
    moviesContainer.appendChild(movieEl);
  });
}


// //show movie detail(genre, overview)
// Function to display movie details
// function showMovieDetails(movieId) {
//   getMovieDetails(movieId)
//       .then(movie => {
//           const { title, poster_path, release_date, overview, genre_ids } = movie;
//           const year = release_date.split('-')[0];
//           const genres = genre_ids.map(id => id).join(', '); // Replace with actual genre names if available

//           const detailContainer = document.getElementById('detail');
//           detailContainer.innerHTML = '';

//           const movieDetailEl = document.createElement('section');
//           movieDetailEl.classList.add('movie-detail');
//           detailContainer.appendChild(movieDetailEl);

//           movieDetailEl.innerHTML = `
//               <div class="container">
//                   <a href="/movie-details/${movieId}">
//                       <figure class="movie-detail-banner">
//                           <img src="${IMG_URL + poster_path}" alt="${title}">
//                           <button class="play-btn">
//                               <ion-icon name="play-circle-outline"></ion-icon>
//                           </button>
//                       </figure>
//                   </a>
//                   <div class="movie-detail-content">
//                       <h1 class="h1 detail-title">${title}</h1>
//                       <div class="meta-wrapper">
//                           <div class="badge-wrapper">
//                               <div class="badge badge-outline">HD</div>
//                           </div>
//                           <div class="ganre-wrapper">
//                               ${genres.split(',').map(genre => `<a href="#">${genre.trim()}</a>`).join('')}
//                           </div>
//                           <div class="date-time">
//                               <div>
//                                   <ion-icon name="calendar-outline"></ion-icon>
//                                   <time datetime="${release_date}">${year}</time>
//                               </div>
//                           </div>
//                       </div>
//                       <p class="storyline">${overview}</p>
//                       <div class="details-actions">
//                           <button class="share">
//                               <ion-icon name="share-social"></ion-icon>
//                               <span>Share</span>
//                           </button>
//                           <div class="title-wrapper">
//                               <p class="title">Prime Video</p>
//                               <p class="text">Streaming Channels</p>
//                           </div>
//                           <button class="btn btn-primary">
//                               <ion-icon name="play"></ion-icon>
//                               <span>Watch Now</span>
//                           </button>
//                       </div>
//                       <a href="${IMG_URL + poster_path}" download class="download-btn">
//                           <span>Download</span>
//                           <ion-icon name="download-outline"></ion-icon>
//                       </a>
//                   </div>
//               </div>
//           `;
//       })
//       .catch(error => {
//           console.error('Error fetching movie details:', error);
//       });
// }

//show high rate movies




function getTopRates(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data.results);
        if (data.results.length === 0) {
            topRateMovieContainerDisplay.innerHTML = `<h2 class="h2 section-title no-result">No Results Found</h2>`;
        } else {
          showTopRates(data.results); // Hiển thị tất cả phim được trả về từ API
        }
      })
      .catch(error => {
        console.error('Error fetching top rated movies:', error);
      });
  }
  


function showTopRates(movies) {
  topRateMovieContainer.innerHTML = '';

  movies.forEach(movie => {
    const { title, poster_path, vote_average, release_date, original_language, genre_ids } = movie;
    const year = release_date.split('-')[0];  // Only take the year from release_date
    const movieEl = document.createElement('li');
    movieEl.classList.add('movie-card');

    // Convert genre IDs to names (assuming you have genreMap populated)
    const genres = genre_ids.map(id => genreMap[id]).join(', ');

    movieEl.innerHTML = `
      <a href="/movie-details">
        <figure class="card-banner">
          <img src="${IMG_URL + poster_path}" alt="${title}">
          <div class="play-button">
            <i class="far fa-play-circle"></i>
          </div>
        </figure>
      </a>
      <div class="title-wrapper">
        <a href="/movie-details">
          <h3 class="card-title">${title}</h3>
        </a>
        <time datetime="${release_date}">${year}</time>
      </div>
      <div class="card-meta">
        <div class="badge badge-outline">2K</div>
        <div class="duration">
                    
        </div>
        <div class="rating">
          <ion-icon name="star"></ion-icon>
          <data>${vote_average}</data>
        </div>
      </div>
    `;
    topRateMovieContainer.appendChild(movieEl);
  });
}

    // FILLTER
var selectedGenre=[]
setGenre();
function setGenre() {
  tagsEl.innerHTML = '';  // Clear the current genre tags

  // Iterate over the genres array
  genres.forEach(genre => {
    const t = document.createElement('li');
    t.classList.add('filter-btn');
    t.id = genre.id;  // Set the id of the list item to the genre id
    t.innerText = genre.name;  // Set the text of the list item to the genre name
    t.addEventListener('click', () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }

      console.log(selectedGenre);
      getTopRates(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${encodeURI(selectedGenre.join(','))}`);

      highlightSelection();
    });
    tagsEl.appendChild(t);  // Append the list item to the tagsEl container
  });
}

function highlightSelection() {
  const tags = document.querySelectorAll('.filter-btn');
  tags.forEach(tag => {
    tag.classList.remove('highlight');
  });

  if (selectedGenre.length != 0) {
    selectedGenre.forEach(id => {
      const highlightedTag = document.getElementById(id); // Here 'id' is the genre.id
      if (highlightedTag) {
        highlightedTag.classList.add('highlight');
      }
    });
  }
}
  
// function clearBtn(){
//   let clearBtn = document.getElementById('clear');
//   if(clearBtn){
//       clearBtn.classList.add('highlight')
//   }else{
          
//       let clear = document.createElement('div');
//       clear.classList.add('tag','highlight');
//       clear.id = 'clear';
//       clear.innerText = 'Clear x';
//       clear.addEventListener('click', () => {
//           selectedGenre = [];
//           setGenre();            
//           getMovies(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
//       })
//       tagsEl.append(clear);
//   }
  
// }

