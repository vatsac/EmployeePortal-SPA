import { Message } from './../_models/message';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[]; // creating list of message
  pagination: Pagination; // creating object of pagination model
  messageContainer = 'Unread'; // setting parameter initially

  constructor(private userService: UserService,
              private authService: AuthService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    // loading message initially on creation of component
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  // calling user service getMessage method
  // on successfull creation we are rendering message to component
  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid,
     this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer).subscribe((res: PaginatedResult<Message[]>) => {
       this.messages  = res.result;
       this.pagination = res.pagination;
     }, error => {
       this.alertify.error(error);
     });
  }

  // calling user service delete method
  // for deleting message
  // we are not doing physical delete of message
  // we are setting the field isDeleted to true on server
  deleteMessage(id: number) {
    this.alertify.confirm('Are you sure you want to delete this message', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('Message has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the message');
      });
    });
  }

  // changing page event is fired for pagination
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }}
