const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWU4MzRhY2Q0Mjk5MDk0MzI4ZmMxZTUyZjVhYTBmMyIsInN1YiI6IjY2MjZmZDE2MmUyYjJjMDE2MzY3MjA4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wl8aFUtCjzsNdhNXgwn4Aw1kdLas3x17gn0YiTIfoNU",
  },
};

const content = document.querySelector(".content");

const searchInput = document.querySelector(".search_input");
const searchButton = document.querySelector(".search_button");
const title = document.querySelector(".title");
const card = document.querySelector(".card");

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
    .then((response) => response.json())
    .catch((err) => console.error(err))
    .then((response) => {
      let data = [response][0].results;

      data.forEach((a) => {
        let id = a["id"];
        let title = a["title"];
        let overview = a["overview"];
        let posterPate = a["poster_path"];
        let average = a["vote_average"];

        content.insertAdjacentHTML(
          "beforeend",
          `
          <div class="card" onclick="getId()">
          <img src="https://image.tmdb.org/t/p/w400${posterPate}" alt="" />
          <p class="title">${title}</p>
          <div class="overview">
            <p>${overview}</p>
          </div>
          <div class="average_div">
          <i class="fa-solid fa-star star_icon"></i><p class="average">rating : ${average}</p>
          <span id="movie_id">${id}</span>
          </div>
          </div>
        `
        );
      });
    });
});

function getId() {
  let dv = event.currentTarget;
  let spanId = dv.querySelector("span").textContent;
  alert(`영화 id: ${spanId}`);
}

window.enterKeySearch = () => {
  if (window.event.keyCode == 13) {
    filter();
    noValue();
  }
};
searchButton.addEventListener("click", () => {
  filter();
  noValue();
});

function noValue() {
  if (searchInput.value == "") {
    alert("검색어를 입력해주세요");
  }
}
function filter() {
  let search = searchInput.value.toLowerCase();
  let card = document.getElementsByClassName("card");

  for (let i = 0; i < card.length; i++) {
    let title = document.getElementsByClassName("title");
    if (title[i].innerHTML.toLowerCase().indexOf(search) != -1) {
      card[i].style.display = "block";
    } else {
      card[i].style.display = "none";
    }
  }
}
