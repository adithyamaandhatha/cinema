import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { group } from '@angular/animations';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit{
  
  editForm!: FormGroup;
  status: boolean=false;
  susccessMessage: string='';

  constructor(private ms: MovieService,private fb: FormBuilder,private r: Router){
    this.editForm=fb.group({
      title: ['',[Validators.required,Validators.maxLength(10)]],
      director: ['',[Validators.required]],
      musicDirector: ['',[Validators.required,Validators.minLength(3)]],
      releaseDate: ['',[Validators.required,this.dateValidator]]
    })
  }

  dateValidator(a : AbstractControl): ValidationErrors | null{
    const p = /^\d{4}-\d{2}-\d{2}$/;
    if(!p.test(a.value)){
      return {dater: true}
    }
    return null;
  }
  ngOnInit(): void {
    
  }

  onAdd(){
    if(this.editForm.valid){
      this.ms.add(this.editForm.value).subscribe({
        next: ()=>{
          this.susccessMessage="Movie added successfully!";
          this.editForm.reset();
          this.status=true;
          setTimeout(()=>{
            this.susccessMessage='';
          },3000);
        },
        error: ()=>{
          this.susccessMessage="Error Occured!";
          console.error("Error triggered!");
          this.status=true;
          setTimeout(()=>{
            this.susccessMessage='';
          },3000);
        }
      })
    }
  }
  
  // editForm!: FormGroup;
  // status: boolean = false;

  // constructor(private ms: MovieService,private r: Router,private fb: FormBuilder){
  //   this.editForm=fb.group({
  //     title:['',[Validators.required,Validators.maxLength(10)]],
  //     director:['',[Validators.required]],
  //     musicDirector:['',[Validators.required,Validators.minLength(2)]],
  //     releaseDate:['',[Validators.required,this.dateValid]]
  //   });
  // }

  // dateValid(a: AbstractControl): ValidationErrors | null{
  //   const pattern=/^\d{4}-\d{2}-\d{2}$/;
  //   if(!pattern.test(a.value)){
  //     return {dater: true};
  //   }
  //   return null;
  // }

  // ngOnInit(): void {
    
  // }

  // onAdd(){
  //   if(this.editForm.valid){
  //     this.ms.addMovie(this.editForm.value).subscribe((d) => {
  //       console.log(d);
  //       this.status=true;
  //     });
  //   }
  // }

  
}
