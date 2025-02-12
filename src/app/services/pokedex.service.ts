import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, forkJoin, Observable, of, tap} from 'rxjs';
import {Pokemon} from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private pokemonsSubject = new BehaviorSubject<Pokemon[]>([]);
  pokemons$ = this.pokemonsSubject.asObservable();



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
    const requests = pokemonIds.map(id =>
      forkJoin({
        pokemon: this.getPokemonById(id),
        species: this.getPokemonSpeciesById(id)
      })
    );

    forkJoin(requests).pipe(
      tap(data => {
        const pokemons = data.map(({ pokemon, species }) => {
          const id = pokemon.id;
          const name = pokemon.name;
          const japName = species.names.find((name: any) => name.language.name === 'ja').name;
          const color = species.color.name;
          const isBaby = species.is_baby;
          const isMythical = species.is_mythical;
          const isLegendary = species.is_legendary;
          const description = species.flavor_text_entries.find((entry: any) => entry.language.name === 'en').flavor_text;
          const habitat = species.habitat?.name;
          const types = pokemon.types.map((type: any) => type.type.name);
          const generation = this.getGeneration(id);
          const spriteUrl = pokemon.sprites.front_default;
          const spriteArtworkUrl = pokemon.sprites.other['official-artwork'].front_default;
          const spriteShowdownUrl = pokemon.sprites.other.showdown.front_default;
          const height = pokemon.height / 10;
          const weight = pokemon.weight / 10;
          const stats = pokemon.stats.map((stat: any) => stat.base_stat);
          return new Pokemon(id, name, japName, color, isBaby, isMythical, isLegendary, description, habitat, types, generation, spriteUrl, spriteArtworkUrl, spriteShowdownUrl, height, weight, stats);        });
        this.pokemonsSubject.next(pokemons);
        this.savePokemonsToLocalStorage(pokemons);
      })
    ).subscribe();
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
}
