
export default class CreateRecipesUseCase {
    
    repository = null;

   constructor(_repository){
       this.repository = _repository;
   }

    async createRecipe(payload) {
       return await this.repository.createRecipe(payload); 
   }
}