import axios from 'axios';
import {
    key
} from '../config';

export default class Movie {
    constructor(id) {
        this.id = id;
    }

    async getMovie() {
        try {
            const res = await axios(`https://www.omdbapi.com/?i=${this.id}&apikey=${key}`);
            this.res = res.data;
        } catch (error) {
            alert('Something went wrong!')
        }
    }




}