
export default class GetBrewerUseCase {
    
    repository = null;

   constructor(_repository){
       this.repository = _repository;
   }

    async getBrewer(id) {
       return await this.repository.getBrewer(id); 
   }
}