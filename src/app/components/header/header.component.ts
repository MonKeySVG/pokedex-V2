import { Component, HostListener } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NgIf } from '@angular/common';
import { PokedexService } from '../../services/pokedex.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [SearchBarComponent, NgIf, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isSearchBarOpen = false;

  constructor(private pokedexService: PokedexService) {}

  ngOnInit() {
    this.pokedexService.getAllPokemons();
  }

  openSearchBar() {
    this.isSearchBarOpen = true;
    document.body.classList.add('no-scroll');
    console.log('openSearchBar');
  }

  closeSearchBar() {
    this.isSearchBarOpen = false;
    document.body.classList.remove('no-scroll');
    console.log('closeSearchBar');

  }

  toggleSearchBar() {
    this.isSearchBarOpen = !this.isSearchBarOpen;
    if (this.isSearchBarOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'k' && event.metaKey) {
      // Command+K
      event.preventDefault();
      this.toggleSearchBar();
    }
  }
}
