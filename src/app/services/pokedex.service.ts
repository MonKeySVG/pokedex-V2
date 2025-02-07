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



  constructor(private http: HttpClient) {}

  getPokemonByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${name}`);
  }

  getPokemonById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAllPokemons(): void {
    if (this.pokemonsSubject.getValue().length > 0) {
      return;
    }

    const pokemonIds = Array.from({ length: 721 }, (_, i) => i + 1);
    const requests = pokemonIds.map(id => this.getPokemonById(id));
    forkJoin(requests).pipe(
      tap(data => {
        const pokemons = data.map(pokemonData => {
          const id = pokemonData.id;
          const name = pokemonData.name;
          const types = pokemonData.types.map((type: any) => type.type.name);
          const generation = this.getGeneration(id);
          const spriteUrl = pokemonData.sprites.front_default;
          const spriteArtworkUrl = pokemonData.sprites.other['official-artwork'].front_default;
          const spriteShowdownUrl = pokemonData.sprites.other.showdown.front_default;
          const height = pokemonData.height / 10;
          const weight = pokemonData.weight;
          const stats = pokemonData.stats.map((stat: any) => stat.base_stat);
          return new Pokemon(id, name, types, generation, spriteUrl, spriteArtworkUrl, spriteShowdownUrl, height, weight, stats);
        });
        this.pokemonsSubject.next(pokemons);
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
}
