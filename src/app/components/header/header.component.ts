import { Component } from '@angular/core';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    SearchBarComponent,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isSearchBarOpen = false;

  openSearchBar() {
    this.isSearchBarOpen = true;
  }

  closeSearchBar() {
    this.isSearchBarOpen = false;
  }
}
