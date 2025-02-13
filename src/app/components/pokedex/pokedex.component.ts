import {Component, Renderer2} from '@angular/core';
import {PokedexService} from '../../services/pokedex.service';
import {Pokemon} from '../../models/pokemon.model';
import {PokemonCardComponent} from '../pokemon-card/pokemon-card.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {AnimateOnScrollDirective} from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-pokedex',
  imports: [
    PokemonCardComponent,
    NgForOf,
    AnimateOnScrollDirective,
    NgIf,
    NgClass
  ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent {
  pokemons: Pokemon[] = [];
  isLoading = true;
  private imagesLoaded = 0;

  constructor(private pokedexService: PokedexService, private renderer: Renderer2) {}

  ngOnInit() {
    this.pokedexService.pokemons$.subscribe(data => {
      this.pokemons = data;
      // console.log(this.pokemons);
    });
    this.pokedexService.getAllPokemons();
  }

  ngAfterViewInit() {
    this.checkImagesLoaded();
  }

  checkImagesLoaded() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      this.renderer.listen(img, 'load', () => this.onImageLoad());
    });
  }

  onImageLoad() {
    this.imagesLoaded++;
    if (this.imagesLoaded === this.pokemons.length) {
      this.isLoading = false;
    }
  }

}
