
export default class GetBrewersDataRepository {
    dataSource = null;

   constructor(_dataSource){
       this.dataSource = _dataSource;
   }

   
   async getBrewers(paginationParams) {
       return await this.dataSource.getBrewers(paginationParams);
   }
}