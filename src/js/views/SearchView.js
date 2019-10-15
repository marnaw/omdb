import {
    elements
} from './base';


export default class SearchView {
    getInput() {
        return elements.searchInput.value;
    }

    renderLike(like) {
        like.forEach(el => el.imdbID)

    }

    renderResults(movies, likes) {
        let markup;
        if (movies) movies.forEach(movie => {
            markup = `<div class="swiper__slide">
                        <article class="card">
                            <header class="card__header">
                                ${movie.Poster!=='N/A' ?`<img src="${movie.Poster}"alt="name img" class="card__img"></img>`:'<div class="card__no-img"></div>'}
                            </header>
                             <div class="card__body">
                                <h3 class="heading-tertiary card__title">${movie.Title}</h3>
                             </div>
                             <footer class="card__footer">
                                <button class="card__show" data-id="${movie.imdbID}"> Show moree --></button>
                                <div class="card__add-like" data-index=${movie.imdbID}>
                                    <svg class="card__icon-like">
                                        <use href="img/icons.svg#icon-heart${(likes.find(like => like.imdbID == movie.imdbID)) ?            '':'-outlined' }"></use>
                                    </svg>
                                </div>
                             </footer>
                        </article>
                      </div>`
            elements.swiper.insertAdjacentHTML('afterbegin', markup);
        });

    }
    clearResults() {
        elements.swiper.innerHTML = " ";

    }
}