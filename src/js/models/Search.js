import axios from 'axios';
import {
    key
} from '../config';
export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getSearch() {
        try {
            const res = await axios(`https://www.omdbapi.com/?s=${this.query}&apikey=${key}`);
            this.result = res.data.Search;
        } catch (error) {
            alert("Something went wrong")
        }
    }

}