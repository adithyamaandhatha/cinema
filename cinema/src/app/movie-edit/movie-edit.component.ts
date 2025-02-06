import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit{
  
  updateForm!: FormGroup;
  movieId: any;
  status: boolean = false;
  successMessage: string='';

  constructor(private ms: MovieService,private ar: ActivatedRoute,private r: Router,private fb: FormBuilder){
    this.updateForm=fb.group({
      title:['',[Validators.required,Validators.maxLength(10)]],
            director:['',[Validators.required]],
            musicDirector:['',[Validators.required,Validators.minLength(3)]],
            releaseDate:['',[Validators.required,this.dateValid]]
    });
  }

  dateValid(a: AbstractControl): ValidationErrors | null{
    const pt=/^\d{4}-\d{2}-\d{2}$/;
    if(!pt.test(a.value)){
      return {dater: true};
    }
    return null;
  }

  ngOnInit(): void {
    this.ar.params.subscribe((d)=>{
      this.movieId=d['id'];
      this.ms.getById(this.movieId).subscribe((d)=>{
        this.updateForm.patchValue(d[0]);
      });
    });
  }

  onUpdate(){
    if(this.updateForm.valid){
      if(this.movieId){
        this.ms.update(this.movieId,this.updateForm.value).subscribe({
          next: ()=>{
            this.successMessage="Update success fully!"
            this.status=true;
            this.updateForm.reset();
            setTimeout(()=>{
              this.successMessage='';
              this.status=false
            },5000)
          },
          error: ()=>{
            this.successMessage="Error triggered!"
            this.status=true;
            this.updateForm.reset();
            setTimeout(()=>{
              this.successMessage='';
              this.status=false
            },5000)
          }
        })
      }
      else{
        this.ms.add(this.updateForm.value).subscribe({
          next: ()=>{
            this.successMessage="Added successfully!"
            this.status=true;
            this.updateForm.reset();
            setTimeout(()=>{
              this.successMessage='';
              this.status=false
            },5000)
          },
          error: ()=>{
            this.successMessage="Error triggered!"
            this.status=true;
            this.updateForm.reset();
            setTimeout(()=>{
              this.successMessage='';
              this.status=false
            },5000)
          }
        })
      }
    }
  }

  // ngOnInit(): void {
  //   this.movieId=this.ar.snapshot.paramMap.get('id')!;
  //   this.ms.getById(this.movieId).subscribe((d)=>{
  //     this.updateForm.patchValue(d[0]);
  //     this.stats=true;
  //   })
    
  // }

  // onUpdate(){
  //  if(this.updateForm.valid){
  //   if(this.movieId){
  //     this.ms.updateMovie(this.updateForm.value,this.movieId).subscribe((d)=>{
  //       console.log(d);
  //       this.status=true;
        
  //     });
  //     this.updateForm.reset();
  //   }
  //   else{
  //     this.ms.addMovie(this.updateForm.value).subscribe(()=>{
  //       this.updateForm.reset();
  //       this.r.navigate([`/`])
  //     });
  //   }
  //  } 
  // }
}
