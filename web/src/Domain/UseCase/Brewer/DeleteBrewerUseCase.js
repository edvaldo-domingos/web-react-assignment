
export default class DeleteBrewerUseCase {
    
    repository = null;

   constructor(_repository){
       this.repository = _repository;
   }

    async deleteBrewer(id) {
       return await this.repository.deleteBrewer(id); 
   }
}