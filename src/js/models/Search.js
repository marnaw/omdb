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
            const res = await axios(`http://www.omdbapi.com/?s=${this.query}&apikey=${key}`);
            this.result = res.data.Search;
            console.log(this.result)
        } catch (error) {
            alert("Something went wrong")
        }
    }

}