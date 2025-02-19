import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokedexService } from '../../services/pokedex.service';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [NgIf, NgForOf, FormsModule, NgClass],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  @Output() close = new EventEmitter<void>();
  @ViewChild('searchInput') searchInput!: ElementRef;
  searchTerm: string = '';
  filteredPokemons: Pokemon[] = [];
  selectedIndex: number = -1;
  private needsScroll: boolean = false;

  constructor(
    private pokedexService: PokedexService,
    private router: Router,
  ) {}

  closeSearchBar() {
    this.close.emit();
  }

  onSearchChange() {
    console.log(this.searchTerm);
    if (this.searchTerm.length > 0) {
      this.pokedexService.pokemons$.subscribe((pokemons) => {
        this.filteredPokemons = pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
        );

        this.filteredPokemons.sort((a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();
          const searchTerm = this.searchTerm.toLowerCase();

          if (aName === searchTerm) return -1;
          if (bName === searchTerm) return 1;
          return aName.localeCompare(bName);
        });

        this.selectedIndex = this.filteredPokemons.length > 0 ? 0 : -1;
        console.log(this.selectedIndex);
      });
    } else {
      this.filteredPokemons = [];
      this.selectedIndex = -1;
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      this.selectedIndex =
        (this.selectedIndex + 1) % this.filteredPokemons.length;
      this.needsScroll = true;
    } else if (event.key === 'ArrowUp') {
      this.selectedIndex =
        (this.selectedIndex - 1 + this.filteredPokemons.length) %
        this.filteredPokemons.length;
      this.needsScroll = true;
    } else if (event.key === 'Enter' && this.selectedIndex >= 0) {
      this.selectPokemon(this.filteredPokemons[this.selectedIndex]);
    } else if (event.key === 'Escape') {
      this.closeSearchBar();
    }
  }

  ngAfterViewChecked() {
    if (this.needsScroll) {
      this.scrollToSelected();
      this.needsScroll = false;
    }
  }

  scrollToSelected() {
    const selectedElement = document.querySelector('.search-results .selected');
    if (selectedElement) {
      selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      console.log(selectedElement);
    }
  }

  selectPokemon(pokemon: Pokemon) {
    this.closeSearchBar();
    const url = this.router.createUrlTree(['/pokemon', pokemon.id]).toString();
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        this.router.navigateByUrl(url);
      })
      .catch(console.error);
  }

  ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
  }
}
