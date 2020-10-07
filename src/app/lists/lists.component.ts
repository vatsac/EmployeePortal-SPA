import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: User[]; // declaring user model
  pagination: Pagination; // declaring pagination model
  likesParam: string; // setting like parameter like liker and likee,a/q to parameter load user


  constructor(private authService: AuthService, private userService: UserService,
              private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    // loading list of member when component called
    this.route.data.subscribe( data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likesParam = 'Likers'; // setting like parameter initially
  }

  // calling load user function from user service
  // returns all the required user for rendering on template
  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
    .subscribe((res: PaginatedResult<User[]>) => {
    this.users = res.result;
    this.pagination = res.pagination;
   }, error => {
    this.alertify.error(error);
   });
 }

 // event for pagination
 // for changing page
 pageChanged(event: any): void {
  this.pagination.currentPage = event.page;
  this.loadUsers();
}
}
