import { Component, Renderer2 } from '@angular/core';
import { PokedexService } from '../../services/pokedex.service';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-pokedex',
  imports: [
    PokemonCardComponent,
    NgForOf,
    AnimateOnScrollDirective,
    NgIf,
    NgClass,
  ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',
})
export class PokedexComponent {
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  isLoading = true;
  private imagesLoaded = 0;

  constructor(
    private pokedexService: PokedexService,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.pokedexService.pokemons$.subscribe((data) => {
      this.pokemons = data;
      this.filteredPokemons = data;
      // console.log(this.pokemons);
    });
    this.pokedexService.getAllPokemons();
  }

  ngAfterViewInit() {
    this.checkImagesLoaded();
  }

  checkImagesLoaded() {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      this.renderer.listen(img, 'load', () => this.onImageLoad());
    });
  }

  onImageLoad() {
    this.imagesLoaded++;
    if (this.imagesLoaded === this.pokemons.length) {
      this.isLoading = false;
    }
  }

  getPokemonStatus(pokemon: Pokemon): string {
    if (pokemon.isBaby) {
      return 'baby';
    } else if (pokemon.isMythical) {
      return 'mythical';
    } else if (pokemon.isLegendary) {
      return 'legendary';
    } else {
      return 'normal';
    }
  }

  filterPokemons(selectedTypes: string[], selectedGenerations: number[], selectedStatus: string[]) {
    if (selectedTypes.length === 0 && selectedGenerations.length === 0 && selectedStatus.length === 0) {
      this.filteredPokemons = this.pokemons;
    } else {
      this.filteredPokemons = this.pokemons.filter(pokemon => {
        const matchesType = selectedTypes.length === 0 || selectedTypes.some(type => pokemon.types.includes(type));
        const matchesGeneration = selectedGenerations.length === 0 || selectedGenerations.includes(pokemon.generation);
        const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(this.getPokemonStatus(pokemon));
        return matchesType && matchesGeneration && matchesStatus;
      });
    }
  }
}
