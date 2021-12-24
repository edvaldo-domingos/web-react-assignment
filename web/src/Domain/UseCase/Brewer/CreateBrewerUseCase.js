
export default class CreateBrewerUseCase {
    
    repository = null;

   constructor(_repository){
       this.repository = _repository;
   }

    async createBrewer(payload) {
       return await this.repository.createBrewer(payload); 
   }
}