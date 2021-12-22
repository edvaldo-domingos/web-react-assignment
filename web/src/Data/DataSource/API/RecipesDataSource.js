import axios from "axios";
import {headers} from '../../../utils/api'
import {RECIPE_API_URL} from '../../../utils/constants'

export default class RecipesDataSource {
    dataSource = null;

   constructor(_dataSource){
       this.dataSource = _dataSource;
   }

   async getRecipes({skip = 0, limit = undefined}) {
       try {
           const url = `${RECIPE_API_URL}/?skip=${skip}${limit ? "&limit=" + limit:""}`;
           const {data} = await axios.get(url, {
               headers
           });

           return {result: data, error: null }
       } catch (error) {
           console.log(error);
           return {result : null, error}
       }
       
   }

   async deleteRecipe(id) {
       try {
           const url = `${RECIPE_API_URL}/${id}`;
           const {data} = await axios.delete(url, {
               headers
           });

           return {result: data, error: null }
       } catch (error) {
           console.log(error);
           return {result : null, error}
       }
       
   }

}