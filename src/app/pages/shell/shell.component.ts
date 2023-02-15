import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) {
  }
  ngOnInit(): void {
    document.addEventListener('scroll', () => {
      document.documentElement.dataset['scroll'] = window.scrollY.toString();
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbarCustomScroll');
    } else {
      element.classList.remove('navbarCustomScroll');
    }
  }

  logOutProcess(): void {
    this.authService.SignOut();
  }
}
