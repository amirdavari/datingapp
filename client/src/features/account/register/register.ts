import { Component, inject, input, Input, output } from '@angular/core';
import { RegisterCreds, User } from '../../../types/user';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected creds = {} as RegisterCreds;
  cancelRegister = output<boolean>();
  private accountService = inject(AccountService);

  register() {
    this.accountService.register(this.creds).subscribe({
      next: user => {
        if (user) {
          this.cancel();
        }
      },
      error: err => console.log(err)
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
