import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      password: [''],
    })
  }
  signUp() {  // Method for to create user
    this._http.post<any>("http://localhost:3000/signup", this.signupForm.value).subscribe((res) => {
      alert("Signup Successfully");
      this.signupForm.reset();
      this.router.navigate(['login']);
    },
      err => {
        alert('there is something wrong')
      }
    )
  }
}
