import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';
import { User } from './../../model/User';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User>;
  selectedUser: User;
  action: string;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(
      next => {
        this.users = next;
      }
    );
    this.route.queryParams.subscribe(
      (params) => {
        const id = params['id'];
        this.action = params['action'];
        if(id){
        this.selectedUser = this.users.find(user => user.id === +id);
        }
      }
    )
  }

  setUser(id: number) {
    this.router.navigate(['admin', 'users'], { queryParams: { id: id , action: 'view'} })
  }

  addUser(){
    this.selectedUser = new User();
    this.router.navigate(['admin','users'],{queryParams: {action: 'add'}});
  }

}
