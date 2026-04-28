import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Dating App');
  private http = inject(HttpClient);
  protected members = signal<any>([]);

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
    this.members.set(await this.getMembers());
  }

  getMembers() {
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
    } catch (error) {
      console.error('Error fetching members:', error);
      throw error; // Rethrow the error after logging it
    }

  }
}
