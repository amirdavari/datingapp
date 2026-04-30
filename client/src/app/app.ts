import { HttpClient } from '@angular/common/http';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Home } from "../features/home/home";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Dating App');
  private http = inject(HttpClient);
  members = signal<User[]>([]);
  private accountService = inject(AccountService);


  // ngOnInit(): void {
  //   // Initialization logic here
  //   this.http.get('https://localhost:5001/api/members').subscribe({
  //     next: response => {
  //       this.members.set(response);
  //       console.log(this.members());
  //     },
  //     error: err => {
  //       console.error('Error fetching members:', err);
  //     },
  //     complete: () => {
  //       console.log('Finished fetching members');
  //     }
  //   });
  // }

  async ngOnInit() {
    this.setCurrentUser();
    this.members.set(await this.getMembers());
  }

  setCurrentUser() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.accountService.currentUser.set(user);
    }
  }

  getMembers() {
    try {
      return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
    } catch (error) {
      console.error('Error fetching members:', error);
      throw error; // Rethrow the error after logging it
    }

  }
}
