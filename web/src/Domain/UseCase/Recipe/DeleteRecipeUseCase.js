
export default class DeleteRecipesUseCase {
    
    repository = null;

   constructor(_repository){
       this.repository = _repository;
   }

    async deleteRecipe(id) {
       return await this.repository.deleteRecipe(id); 
   }
}