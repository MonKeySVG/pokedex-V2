import { Component } from '@angular/core';
import {Pokemon} from '../../models/pokemon.model';
import {ActivatedRoute} from '@angular/router';
import {PokedexService} from '../../services/pokedex.service';

@Component({
  selector: 'app-pokemon-details-page',
  imports: [],
  templateUrl: './pokemon-details-page.component.html',
  styleUrl: './pokemon-details-page.component.css'
})
export class PokemonDetailsPageComponent {
  pokemon!: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private pokedexService: PokedexService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.pokedexService.pokemons$.subscribe(pokemons => {
      this.pokemon = pokemons.find(p => p.id === id)!;
    });
  }
}
