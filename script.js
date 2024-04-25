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

async function getCard() {
  const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options);

  const responseJson = await response.json();
  const results = await [responseJson][0].results;

  try {
    results.forEach((a) => {
      let id = a["id"];
      let title = a["title"];
      let overview = a["overview"];
      let posterPate = a["poster_path"];
      let average = a["vote_average"];

      content.insertAdjacentHTML(
        "beforeend",
        `
          <div class="card" onclick="getMovieId()">
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
  } catch (err) {
    console.error(err);
  }
}
getCard();

function getMovieId() {
  let dv = event.currentTarget;
  let spanId = dv.querySelector("span").textContent;
  alert(`영화 id: ${spanId}`);
}

//topbutton
window.onload = function () {
  const topButton = document.querySelector(".top_button");
  topButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (this.scrollY < 400) {
      topButton.classList.add("hide");
    } else {
      topButton.classList.remove("hide");
    }
  });
};

//엔터키입력, 버튼 검색
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
      card[i].style.display = "flex";
    } else {
      card[i].style.display = "none";
    }
  }
}
