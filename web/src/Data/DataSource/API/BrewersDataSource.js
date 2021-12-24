import axios from "axios";
import {headers} from '../../../utils/api'
import {BREWER_API_URL} from '../../../utils/constants'

export default class GetBrewersDataSource {
    dataSource = null;

   constructor(_dataSource){
       this.dataSource = _dataSource;
   }

   async getBrewers({skip = 0, limit = undefined}) {
       try {
           const url = `${BREWER_API_URL}/?skip=${skip}${limit ? "&limit=" + limit:""}`;
           const {data} = await axios.get(url, {
               headers
           });
           return {result: data, error: null }
       } catch (error) {
           console.log(error);
           return {result : null, error}
       }
       
   }
}