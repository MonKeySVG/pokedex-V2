import { Component } from '@angular/core';
import {Pokemon} from '../../models/pokemon.model';
import {ActivatedRoute} from '@angular/router';
import {PokedexService} from '../../services/pokedex.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-pokemon-details-page',
  imports: [
    NgIf,
    NgClass,
    NgForOf
  ],
  templateUrl: './pokemon-details-page.component.html',
  styleUrl: './pokemon-details-page.component.css'
})
export class PokemonDetailsPageComponent {
  pokemon!: Pokemon;
  statNames: string[] = ['HP', 'ATK', 'DEF', 'ATK SP', 'DEF SP', 'SPD'];


  constructor(
    private route: ActivatedRoute,
    private pokedexService: PokedexService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.pokedexService.pokemons$.subscribe(pokemons => {
        this.pokemon = pokemons.find(p => p.id === id)!;
      });
    });
  }
}
