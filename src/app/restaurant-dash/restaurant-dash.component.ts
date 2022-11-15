import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {
  allRestauraneData : any;
  formvalue!: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }
  restaurantModelObj: RestaurantData = new RestaurantData;
  showAdd!: boolean;
  showUpdate!: boolean;
  ngOnInit(): void {
    this.formvalue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    })
    this.getAllData();
  }
  clickAddResto(){
    this.formvalue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  // Now we are subscribing our data which is mapped via Services
  addResto() {
    
    this.restaurantModelObj.name = this.formvalue.value.name,
    this.restaurantModelObj.email = this.formvalue.value.email,
    this.restaurantModelObj.mobile = this.formvalue.value.mobile,
    this.restaurantModelObj.address = this.formvalue.value.address,
    this.restaurantModelObj.services = this.formvalue.value.services,
    this.api.postRestaurant(this.restaurantModelObj).subscribe(res => {
      console.log(res);
      alert('Restaurant added successfully');
      this.formvalue.reset();
      this.getAllData();  // Quick refresh data
    let ref = document.getElementById('clear');
    ref?.click();   
    
    },
      err => {
        alert('there is something wrong VIJAY')
      })
  }
  
  // Get all Data
  getAllData() {
    this.api.getRestaurant().subscribe(res => {
      this.allRestauraneData = res;
    })
  }

  // Delete Records
  deleteResto(data : any) {
    this.api.deleteRestaurant(data.id).subscribe(() => {
      alert("restaurant records deleted successfylly")
      this.getAllData(); // Quick refresh data

    })
  }

  onEditResto(data:any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.restaurantModelObj.id = data.id;
    this.formvalue.controls['name'].setValue(data.name);
    this.formvalue.controls['email'].setValue(data.email);
    this.formvalue.controls['mobile'].setValue(data.mobile);
    this.formvalue.controls['address'].setValue(data.address);
    this.formvalue.controls['services'].setValue(data.services);
  }

  updateResto() {
    this.restaurantModelObj.name = this.formvalue.value.name,
    this.restaurantModelObj.email = this.formvalue.value.email,
    this.restaurantModelObj.mobile = this.formvalue.value.mobile,
    this.restaurantModelObj.address = this.formvalue.value.address,
    this.restaurantModelObj.services = this.formvalue.value.services,


    this.api.updateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id).subscribe(res => {
      alert('Restaurant records updated');
      this.formvalue.reset();
      this.getAllData();
    })
  }
  
}
