import { Component } from '@angular/core';
import {Pokemon} from '../../models/pokemon.model';
import {ActivatedRoute} from '@angular/router';
import {PokedexService} from '../../services/pokedex.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';

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
  nextPokemon!: Pokemon;
  previousPokemon!: Pokemon;
  statNames: string[] = ['HP', 'ATK', 'DEF', 'ATK SP', 'DEF SP', 'SPD'];


  constructor(
    private route: ActivatedRoute,
    private pokedexService: PokedexService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.pokedexService.pokemons$.subscribe(pokemons => {
        this.pokemon = pokemons.find(p => p.id === id)!;

        const foundNextPokemon = pokemons.find(p => p.id === id + 1);
        if (foundNextPokemon) {
          this.nextPokemon = foundNextPokemon;
        }

        const foundPreviousPokemon = pokemons.find(p => p.id === id - 1);
        if (foundPreviousPokemon) {
          this.previousPokemon = foundPreviousPokemon;
        }
      });
    });
  }

  navigateToId(id:number): void {
    this.router.navigate(['/pokemon', id]);
  }
}
