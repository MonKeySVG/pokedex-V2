import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, tap } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})

export class PokedexService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private pokemonsSubject = new BehaviorSubject<Pokemon[]>([]);
  pokemons$ = this.pokemonsSubject.asObservable();

  // A utiliser pour calculer les sensibilités d'un pokemon
  private typeEffectiveness: { [key: string]: { [key: string]: number } } = {
    normal: { rock: 0.5, ghost: 0, steel: 0.5 },
    fire: {
      fire: 0.5,
      water: 0.5,
      grass: 2,
      ice: 2,
      bug: 2,
      rock: 0.5,
      dragon: 0.5,
      steel: 2,
    },
    water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
    electric: {
      water: 2,
      electric: 0.5,
      grass: 0.5,
      ground: 0,
      flying: 2,
      dragon: 0.5,
    },
    grass: {
      fire: 0.5,
      water: 2,
      grass: 0.5,
      poison: 0.5,
      ground: 2,
      flying: 0.5,
      bug: 0.5,
      rock: 2,
      dragon: 0.5,
      steel: 0.5,
    },
    ice: {
      fire: 0.5,
      water: 0.5,
      grass: 2,
      ice: 0.5,
      ground: 2,
      flying: 2,
      dragon: 2,
      steel: 0.5,
    },
    fighting: {
      normal: 2,
      ice: 2,
      poison: 0.5,
      flying: 0.5,
      psychic: 0.5,
      bug: 0.5,
      rock: 2,
      ghost: 0,
      dark: 2,
      steel: 2,
      fairy: 0.5,
    },
    poison: {
      grass: 2,
      poison: 0.5,
      ground: 0.5,
      rock: 0.5,
      ghost: 0.5,
      steel: 0,
      fairy: 2,
    },
    ground: {
      fire: 2,
      electric: 2,
      grass: 0.5,
      poison: 2,
      flying: 0,
      bug: 0.5,
      rock: 2,
      steel: 2,
    },
    flying: {
      electric: 0.5,
      grass: 2,
      fighting: 2,
      bug: 2,
      rock: 0.5,
      steel: 0.5,
    },
    psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
    bug: {
      fire: 0.5,
      grass: 2,
      fighting: 0.5,
      poison: 0.5,
      flying: 0.5,
      psychic: 2,
      ghost: 0.5,
      dark: 2,
      steel: 0.5,
      fairy: 0.5,
    },
    rock: {
      fire: 2,
      ice: 2,
      fighting: 0.5,
      ground: 0.5,
      flying: 2,
      bug: 2,
      steel: 0.5,
    },
    ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
    dragon: { dragon: 2, steel: 0.5, fairy: 0 },
    dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
    steel: {
      fire: 0.5,
      water: 0.5,
      electric: 0.5,
      ice: 2,
      rock: 2,
      steel: 0.5,
      fairy: 2,
    },
    fairy: {
      fire: 0.5,
      fighting: 2,
      poison: 0.5,
      dragon: 2,
      dark: 2,
      steel: 0.5,
    },
  };

  constructor(private http: HttpClient) {
    this.loadPokemonsFromLocalStorage();
  }

  getPokemonByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${name}`);
  }

  getPokemonById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getPokemonSpeciesById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}-species/${id}`);
  }

  getAllPokemons(): void {
    if (this.pokemonsSubject.getValue().length >= 721) {
      return;
    }

    const pokemonIds = Array.from({ length: 721 }, (_, i) => i + 1);
    const requests = pokemonIds.map((id) =>
      forkJoin({
        pokemon: this.getPokemonById(id),
        species: this.getPokemonSpeciesById(id),
      }),
    );

    forkJoin(requests)
      .pipe(
        tap((data) => {
          const pokemons = data.map(({ pokemon, species }) => {
            const id = pokemon.id;
            const name = pokemon.name;
            const japName = species.names.find(
              (name: any) => name.language.name === 'ja',
            ).name;
            const color = species.color.name;
            const isBaby = species.is_baby;
            const isMythical = species.is_mythical;
            const isLegendary = species.is_legendary;
            const description = species.flavor_text_entries.find(
              (entry: any) => entry.language.name === 'en',
            ).flavor_text;
            const habitat = species.habitat?.name;
            const types = pokemon.types.map((type: any) => type.type.name);
            const sensitivities = this.calculateTypeSensitivities(types);
            const generation = this.getGeneration(id);
            const spriteUrl = pokemon.sprites.front_default;
            const spriteArtworkUrl =
              pokemon.sprites.other['official-artwork'].front_default;
            const spriteShowdownUrl =
              pokemon.sprites.other.showdown.front_default;
            const height = pokemon.height / 10;
            const weight = pokemon.weight / 10;
            const stats = pokemon.stats.map((stat: any) => stat.base_stat);
            return new Pokemon(
              id,
              name,
              japName,
              color,
              isBaby,
              isMythical,
              isLegendary,
              description,
              habitat,
              types,
              sensitivities,
              generation,
              spriteUrl,
              spriteArtworkUrl,
              spriteShowdownUrl,
              height,
              weight,
              stats,
            );
          });
          this.pokemonsSubject.next(pokemons);
          this.savePokemonsToLocalStorage(pokemons);
        }),
      )
      .subscribe();
  }

  private getGeneration(pokemonId: number): number {
    if (pokemonId <= 151) return 1;
    if (pokemonId <= 251) return 2;
    if (pokemonId <= 386) return 3;
    if (pokemonId <= 493) return 4;
    if (pokemonId <= 649) return 5;
    if (pokemonId <= 721) return 6;
    return 7;
  }

  private savePokemonsToLocalStorage(pokemons: Pokemon[]): void {
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
  }

  private loadPokemonsFromLocalStorage(): void {
    const pokemons = localStorage.getItem('pokemons');
    if (pokemons) {
      this.pokemonsSubject.next(JSON.parse(pokemons));
    }
  }

  private calculateTypeSensitivities(types: string[]): {
    [key: string]: number;
  } {
    const sensitivities: { [key: string]: number } = {};

    types.forEach((type) => {
      const effectiveness = this.typeEffectiveness[type];
      for (const [targetType, multiplier] of Object.entries(effectiveness)) {
        if (!sensitivities[targetType]) {
          sensitivities[targetType] = 1;
        }
        sensitivities[targetType] *= multiplier;
      }
    });

    console.log(sensitivities);
    return sensitivities;
  }
}
