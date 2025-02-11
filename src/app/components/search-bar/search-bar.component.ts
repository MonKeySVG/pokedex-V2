import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {Pokemon} from '../../models/pokemon.model';
import {PokedexService} from '../../services/pokedex.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    NgClass
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Output() close = new EventEmitter<void>();
  searchTerm: string = '';
  filteredPokemons: Pokemon[] = [];
  selectedIndex: number = -1;


  constructor(private pokedexService: PokedexService) {}


  closeSearchBar() {
    this.close.emit();
  }

  onSearchChange() {
    console.log(this.searchTerm);
    if (this.searchTerm.length > 0) {
      this.pokedexService.pokemons$.subscribe(pokemons => {
        this.filteredPokemons = pokemons.filter(pokemon =>
          pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.selectedIndex = this.filteredPokemons.length > 0 ? 0 : -1;
      });
    } else {
      this.filteredPokemons = [];
      this.selectedIndex = -1;

    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % this.filteredPokemons.length;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + this.filteredPokemons.length) % this.filteredPokemons.length;
    } else if (event.key === 'Enter' && this.selectedIndex >= 0) {
      event.preventDefault();
      this.selectPokemon(this.filteredPokemons[this.selectedIndex]);
    }
  }

  selectPokemon(pokemon: Pokemon) {
    // Handle the selection of a Pokemon (e.g., navigate to the Pokemon details page)
    console.log('Selected Pokemon:', pokemon);
  }
}
