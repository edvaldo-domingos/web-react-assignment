
export default class GetBrewersUseCase {
    
    repository = null;

   constructor(_repository){
       this.repository = _repository;
   }

    async getBrewers(paginationParams) {
       return await this.repository.getBrewers(paginationParams); 
   }
}