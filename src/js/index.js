import Search from "./models/Search";
import SearchView from "./views/SearchView";
import Movie from "./models/Movie";
import Like from "./models/Like";
import * as likesView from "./views/likesView";

import * as MovieView from "./views/MovieView";
import {
  elements,
  elementStrings
} from "./views/base";
const state = {};

window.addEventListener("load", () => {
  state.like = new Like();
  state.like.readStorage()
  if (state.like.like.length > 0) {
    elements.moviesLikeIcon.classList.add("likes__icon--active");
    likesView.showLike(state.like.like)
    elements.moviesLikeIcon.addEventListener("click", () => elements.movieLikes.classList.toggle("likes-movie--active") //toogle for list Likes
    );
    [...document.querySelectorAll('.likes-movie__delete')].forEach(el => el.addEventListener('click', (e) => {
      state.like.deleteLike(e.target.dataset.index)
      likesView.showLike(state.like.like)
    }))

    document.querySelectorAll(".likes-movie__title").forEach(el => el.addEventListener("click", controlMovie));
  }
});

//////////////////////////////////////////
/// Control Search likes for aplication /////////
/////////////////////////////////////////

const controlSearch = async e => {
  e.preventDefault();
  state.searchView = new SearchView();
  // Get query from view

  const query = state.searchView.getInput();
  // New search object and add to state
  state.search = new Search(query);

  if (query) {
    try {
      await state.search.getSearch();
      //  Prepare UI for results

      if (state.search.result) state.searchView.clearResults();
      // Search for recipes

      state.searchView.renderResults(state.search.result, state.like.like);

      // show more information about movie (click)
      document.querySelectorAll(elementStrings.cardShow).forEach(button => button.addEventListener("click", controlMovie));
      // add like to like list (click)
      document.querySelectorAll(elementStrings.cardAdd).forEach(button => button.addEventListener("click", controlLike.bind(this, elementStrings.cardAdd, '')));
    } catch (err) {
      alert(err);
    }
  }
};
elements.searchForm.addEventListener("submit", controlSearch);

//////////////////////////////////////////
/// Control Movie  likes for aplication /////////
/////////////////////////////////////////


const controlMovie = async e => {
  e.preventDefault();
  let id = e.target.dataset.id;
  state.movie = new Movie(id);
  console.log(state.movie);
  try {
    // Get movie data
    await state.movie.getMovie();

    // render movie 
    MovieView.renderMovie(state.movie.res, state.like.like);

    document.querySelector('.popup__list-like').addEventListener('click', controlLike.bind(this, '.popup__list-like', state.movie.res)) //add or delete like movie
    document.querySelector(elementStrings.closePop).addEventListener("click", MovieView.hiddenPopUp); //delete popup with movie

  } catch (err) {
    alert(err);
  }
};
//////////////////////////////////////////
/// Control likes for aplication /////////
/////////////////////////////////////////
const controlLike = (element, movie = '', e) => {
  let id = e.target.closest(element).dataset.index;
  // delete like if exist
  if (state.like.isLiked(id)) {
    state.like.deleteLike(id);
    likesView.toggleBtn(false, id, state.like.like);
    if (state.like.like.length == 0) {
      elements.moviesLikeIcon.classList.remove("likes__icon--active");
    }
    //render new list with  likes movie
    document.querySelectorAll(".likes-movie__title").forEach(el => el.addEventListener("click", controlMovie));

    //add like if dosent exist
  } else {
    let item;
    if (movie == '') item = state.search.result.find(el => el.imdbID == id);
    else item = movie;
    state.like.addLike(item);
    if (state.like.like.length > 0) {
      elements.moviesLikeIcon.classList.add("likes__icon--active");
      elements.moviesLikeIcon.addEventListener("click", () => elements.movieLikes.classList.toggle("likes-movie likes-movie--active")) //toogle for list Likes

    }

    likesView.toggleBtn(true, id, state.like.like);

    //render new list with  likes movie

    document.querySelectorAll(".likes-movie__title").forEach(el => el.addEventListener("click", controlMovie));
  }
};