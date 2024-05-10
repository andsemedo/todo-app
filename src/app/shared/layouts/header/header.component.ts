import { Component } from "@angular/core";
import { TokenService } from "../../../core/services/token.service";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  isAuthenticated$;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {
    this.isAuthenticated$ = tokenService.isAuthentication;
  }

  onLogout() {
    this.authService.onLogout();
  }
}
