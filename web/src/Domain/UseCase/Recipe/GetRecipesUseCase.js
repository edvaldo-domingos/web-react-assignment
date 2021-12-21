
export default class GetRecipesUseCase {
    
     repository = null;

    constructor(_repository){
        this.repository = _repository;
    }

     async getRecipes(paginationParams) {
        return await this.repository.getRecipes(paginationParams); 
    }
}