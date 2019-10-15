import {
    elements,
} from './base';



export const toggleBtn = (isLike, id, movie) => {
    const icon = isLike ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector(`[data-index=${id}] use`).setAttribute('href', `img/icons.svg#${icon}`);
    renderLikes(movie)

}


const limitTitleLike = (title, limit = 10) => {
    let newArr = [];
    if (title.length >= limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newArr.push(cur);
            }
            return acc + cur.length;
        }, 0)
        return newArr.join(' ') + '...';

    }
    return title;
}

const renderLikes = (movie) => {
    elements.movieListLikes.innerHTML = '';
    movie.forEach(element => {
        const markup = `<li class="likes-movie__item" >
        ${element.Poster!=='N/A' ?`<img src="${element.Poster}"
        alt="name img" class="likes-movie__icon"></img>`:'<div class="likes-movie__icon likes-movie__icon--empty">empty</div>'}

        <div class="likes-movie__title" data-id=${element.imdbID}>${limitTitleLike(element.Title,20)}
        </div>
    </li> `

        elements.movieListLikes.insertAdjacentHTML('beforeend', markup);
    })

}
export const showLike = (movie, e) => { // show like heart and  like movies
    renderLikes(movie)
}