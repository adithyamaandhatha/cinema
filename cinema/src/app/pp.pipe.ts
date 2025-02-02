import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pp'
})
export class PpPipe implements PipeTransform {

  transform(movie: any[], searchData: string): any[] {
    if(!searchData){
      return movie;
    }
    const m : String = searchData.trim().toLowerCase();
    return movie.filter((value)=>{
      return value.id.toString().includes(m) || value.director.toLowerCase().includes(searchData) ||
      value.title.toLowerCase().includes(searchData);
    })
    

  }

}
