
export default class BrewersRepository {
    dataSource = null;

   constructor(_dataSource){
       this.dataSource = _dataSource;
   }

   
   async getBrewers(paginationParams) {
       return await this.dataSource.getBrewers(paginationParams);
   }

   async deleteBrewer(id) {
    return await this.dataSource.deleteBrewer(id);
}

   async getBrewer(id) {
       return await this.dataSource.getBrewer(id);
   }
}