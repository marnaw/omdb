import {
    elements,
    elementStrings
} from './base';

export const renderMovie = (movie, likes) => {
    const markup = `<div class="popup">
        <div class="popup__inner">
            <img src="${movie.Poster == 'N/A' ? '#' : movie.Poster  }"
                alt="" class="popup__img">
            <div class="popup__info">
                <h1 class="heading-first popup__title">${movie.Title}</h1>
                <ul class="popup__list">
                    <li class="popup__list-item"><strong>Released:</strong> ${movie.Released}</li>
                    <li class="popup__list-item"><strong>Genre:</strong> ${movie.Genre}</li>
                    <li class="popup__list-item"><strong>Rated:</strong> ${movie.Rated} </li>
                 
                    <li class="popup__list-item"><strong>Director:</strong> ${movie.Director}</li>
                    <li class="popup__list-item"><strong>Writer:</strong> ${movie.Writer}</li>
                    <li class="popup__list-item"><strong>Actors:</strong> ${movie.Actors}</li>
                    <li class="popup__list-item"><strong>Productions:</strong> ${movie.Production}</li>
                    <li class="popup__list-item"><strong>Country:</strong> ${movie.Country}</li>
                    <li class="popup__list-item"><strong>Website:</strong> <a
                            href="${movie.Website}" target="_blank">Click</a>
                    </li>
                    <li class="popup__list-item"><strong>Add to favorite:</strong>
                    <div class="popup__list-like" data-index=${movie.imdbID}>
                    <svg class="popup__list-icon">
                        <use href="img/icons.svg#icon-heart${(likes.find(like => like.imdbID == movie.imdbID)) ? '':'-outlined' }"></use>
                    </svg>
                    </div>
                    </li>

                    <li class="popup__list-item">${movie.Plot}</li>

                   


                </ul>
                <div class="popup__close"></div>
            </div>
        </div>

    </div>`;
    elements.movieView.insertAdjacentHTML('beforebegin', markup);
}
export const hiddenPopUp = () => {
    const popUp = document.querySelector('.' + elementStrings.popUp);
    setTimeout(() => popUp.remove(), 1200)
    popUp.classList.add('popup__remove');
}