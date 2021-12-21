
export default class GetRecipesDataRepository {
    dataSource = null;

   constructor(_dataSource){
       this.dataSource = _dataSource;
   }

   
   async getRecipes(paginationParams) {
       return await this.dataSource.getRecipes(paginationParams);
   }
}