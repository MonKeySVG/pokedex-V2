import {Component, EventEmitter, Output} from '@angular/core';
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
      });
    } else {
      this.filteredPokemons = [];
    }
  }
}
