export default class Like {
    constructor() {
        this.like = [];

    }


    addLike(id) {

        if (this.like.indexOf(id) == -1) this.like.push(id)
        this.persistData();
    }

    getLikes() {
        return this.like;
    }

    deleteLike(id) {
        const index = this.like.findIndex(el => el.imdbID == id);
        this.like.splice(index, 1);
        this.persistData();

    }

    isLiked(id) {
        return this.like.find(imdb => imdb.imdbID === id);
    }

    persistData() {
        localStorage.setItem('liked', JSON.stringify(this.like));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('liked'));
        if (storage) this.like = storage;
    }
}