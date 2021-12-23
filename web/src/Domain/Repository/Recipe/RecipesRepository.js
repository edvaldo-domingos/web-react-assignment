
export default class RecipesDataRepository {
    dataSource = null;

   constructor(_dataSource){
       this.dataSource = _dataSource;
   }

   
   async getRecipes(paginationParams) {
       return await this.dataSource.getRecipes(paginationParams);
   }

   async deleteRecipe(id) {
       return await this.dataSource.deleteRecipe(id);
   }

   async createRecipe(payload) {
       return await this.dataSource.createRecipe(payload);
   }
}