import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  ngOnInit(): void {
    this.loadDarkMode();
  }

  toggleDarkMode(): void {
    const htmlElement = document.documentElement;
    const modeIcon = document.getElementById('mode-icon') as HTMLImageElement | null;

    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      if (modeIcon) {
        modeIcon.src = '/assets/icon-moon.svg';
      }
      localStorage.setItem('darkMode', 'false');
    } else {
      htmlElement.classList.add('dark');
      if (modeIcon) {
        modeIcon.src = '/assets/icon-sun.svg'; 
      }
      localStorage.setItem('darkMode', 'true');
    }
  }

  loadDarkMode(): void {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    const htmlElement = document.documentElement;
    const modeIcon = document.getElementById('mode-icon') as HTMLImageElement | null;

    if (isDarkMode) {
      htmlElement.classList.add('dark');
      if (modeIcon) {
        modeIcon.src = '/assets/icon-sun.svg';
      }
    } else {
      htmlElement.classList.remove('dark');
      if (modeIcon) {
        modeIcon.src = '/assets/icon-moon.svg';
      }
    }
  }
}
