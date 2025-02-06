import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';


  constructor(private http: HttpClient) {}

  getPokemonByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${name}`);
  }

  getPokemonById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAllPokemons(): Observable<any[]> {
    const pokemonIds = Array.from({ length: 721 }, (_, i) => i + 1);
    const requests = pokemonIds.map(id => this.getPokemonById(id));
    return forkJoin(requests);
  }
}
