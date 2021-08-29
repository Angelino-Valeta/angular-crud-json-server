import { EmployeeModel } from './employee.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})

export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;

  employeeModelObj : EmployeeModel = new EmployeeModel();

  employeeData: any;

  showAddBtn !: boolean;
  showUpdateBtn !: boolean;

  constructor(private formBuilber: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilber.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })
    //console.log(this.employeeData)
    this.getAllEmployee();
  }

  postEmployeeDetails(){
    this.showAddBtn = true;

    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj).subscribe(res => {
      console.log(res)
      alert("Employee added successfully")
      let ref = document.getElementById("cancel");
      ref?.click()
      this.formValue.reset();
      this.getAllEmployee()
    }, err => {
      alert("Something went wrong");
    })

  }

  showButtonsAddAndUpdate(){
    this.showAddBtn = true;
    this.showUpdateBtn = false;
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res => {
      this.employeeData = res;
    })
  }

  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id).subscribe(res => {
      this.getAllEmployee()
      alert("Employee deleted")
    })
  }

  onEdit(row : any){
    this.showUpdateBtn = true;
    this.showAddBtn = false

    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary)
  }

  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id).subscribe(res => {
      alert("Update successfully");
      let ref = document.getElementById("cancel");
      ref?.click()
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

}
