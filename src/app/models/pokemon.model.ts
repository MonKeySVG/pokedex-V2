export class Pokemon {
  id: number;
  name: string;

  types: string[];
  generation: number;


  // Sprites
  spriteUrl: string;
  spriteArtworkUrl: string;
  spriteShowdownUrl: string;

  height: number;
  weight: number;
  stats: number[];




  constructor(id: number, name: string, types: string[], generation: number, spriteUrl: string, spriteArtworkUrl: string, spriteShowdownUrl: string, height: number, weight: number, stats: number[]) {
    this.id = id;
    this.name = name;
    this.types = types;
    this.generation= generation;
    this.spriteUrl = spriteUrl;
    this.spriteArtworkUrl = spriteArtworkUrl;
    this.spriteShowdownUrl = spriteShowdownUrl;
    this.height = height;
    this.weight = weight;
    this.stats = stats;
  }
}
