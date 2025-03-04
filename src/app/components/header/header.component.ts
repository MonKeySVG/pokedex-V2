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
  }

  closeSearchBar() {
    this.isSearchBarOpen = false;
  }

  toggleSearchBar() {
    this.isSearchBarOpen = !this.isSearchBarOpen;
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
