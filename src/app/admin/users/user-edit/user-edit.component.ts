import { DataService } from './../../../data.service';
import { User } from './../../../model/User';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input()
  user: User;

  formUser: User;

  message: string;

  password: string;
  password2: string;

  nameIsValid = false;

  passwordsMatch = false;
  passwordsAreValid = false;

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.formUser = Object.assign({}, this.user);
    this.checkIfNameIsValid();
    this.checkIfPasswordsAreValid();
  }

  OnSubmit(){
    if(this.formUser.id == null){
      this.dataService.addUser(this.formUser, this.password).subscribe(
        (user) => {
          this.router.navigate(['admin','users'], {queryParams : {action : 'view', id : user.id}});
        }
      );
    } else {
    this.dataService.updateUser(this.formUser).subscribe(
      (user) => {
        this.router.navigate(['admin','users'], {queryParams: {action: 'view', id: user.id}});
      }
    );
    console.log("we need to save the user", this.formUser);
  }
}

checkIfNameIsValid(){
  if(this.formUser.name){
  this.nameIsValid = this.formUser.name.trim().length > 0;
  }else{
    this.nameIsValid = false;
  }
}

  checkIfPasswordsAreValid() {
    if (this.formUser.id != null) {
      this.passwordsAreValid = true;
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = this.password === this.password2;
      if (this.password) {
        this.passwordsAreValid = this.password.trim().length > 0;
      } else {
        this.passwordsAreValid = false;
      }
    }
  }

}
