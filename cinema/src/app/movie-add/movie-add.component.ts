import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit{
  
  editForm!: FormGroup;
  status: boolean = false;

  constructor(private ms: MovieService,private r: Router,private fb: FormBuilder){
    this.editForm=fb.group({
      title:['',[Validators.required,Validators.maxLength(10)]],
      director:['',[Validators.required]],
      musicDirector:['',[Validators.required,Validators.minLength(2)]],
      releaseDate:['',[Validators.required,this.dateValid]]
    });
  }

  dateValid(a: AbstractControl): ValidationErrors | null{
    const pattern=/^\d{4}-\d{2}-\d{2}$/;
    if(!pattern.test(a.value)){
      return {dater: true};
    }
    return null;
  }

  ngOnInit(): void {
    
  }

  onAdd(){
    if(this.editForm.valid){
      this.ms.addMovie(this.editForm.value).subscribe((d) => {
        console.log(d);
        this.status=true;
      });
    }
  }

  
}
