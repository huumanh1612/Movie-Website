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

const moviesContainer = document.getElementById('movies');

getMovies(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);

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
  // Xóa nội dung hiện tại
  moviesContainer.innerHTML = '';

  movies.forEach(movie => {
    const { title, poster_path, vote_average, release_date } = movie;
    const year = release_date.split('-')[0];  // Chỉ lấy năm từ release_date
    const movieEl = document.createElement('li');
    movieEl.classList.add('movie-card');
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
        <div class="rating">
          <ion-icon name="star"></ion-icon>
          <data>${vote_average}</data>
        </div>
      </div>
    `;
    moviesContainer.appendChild(movieEl);
  });
}


