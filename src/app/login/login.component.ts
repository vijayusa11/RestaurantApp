import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router : Router) { }
  logIn() {
this._http.get<any>('http://localhost:3000/signup').subscribe(res => {
  const user = res.find((a:any) => {
    return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
  })
  if (user) {
    alert('login Successfully !!')
    this.loginForm.reset();
    this.router.navigate(['restaurant']);
  }
  else {
    alert('Credentials not matched !!!!')
  }
}, err => {
  alert('Vijay there is something wrong')
}
)
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    })
  }

}
