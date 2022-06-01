import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private themeId = document.getElementById('theme');
  theme = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';

  constructor() {
    this.themeId?.setAttribute('href', this.theme);
  }

  changeTheme(theme: string) {
    const url: string = `./assets/css/colors/${theme}.css`;
    this.themeId?.setAttribute('href', url);

    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');

    links.forEach(elem => {
      elem.classList.remove('working')
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
      const currentTheme = this.themeId?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    })
  }

}
