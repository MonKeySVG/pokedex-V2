export class Pokemon {
  id: number;
  name: string;
  japName: string;

  color: string;

  isBaby: boolean;
  isMythical: boolean;
  isLegendary: boolean;

  description: string;
  habitat: string;

  types: string[];
  sensitivities: { [key: string]: number };
  generation: number;

  // Sprites
  spriteUrl: string;
  spriteArtworkUrl: string;
  spriteShowdownUrl: string;

  height: number;
  weight: number;
  stats: number[];

  constructor(
    id: number,
    name: string,
    japName: string,
    color: string,
    isBaby: boolean,
    isMythical: boolean,
    isLegendary: boolean,
    description: string,
    habitat: string,
    types: string[],
    sensitivities: { [key: string]: number },
    generation: number,
    spriteUrl: string,
    spriteArtworkUrl: string,
    spriteShowdownUrl: string,
    height: number,
    weight: number,
    stats: number[],
  ) {
    this.id = id;
    this.name = name;
    this.japName = japName;
    this.color = color;
    this.isBaby = isBaby;
    this.isMythical = isMythical;
    this.isLegendary = isLegendary;
    this.description = description;
    this.habitat = habitat;
    this.types = types;
    this.sensitivities = sensitivities;
    this.generation = generation;
    this.spriteUrl = spriteUrl;
    this.spriteArtworkUrl = spriteArtworkUrl;
    this.spriteShowdownUrl = spriteShowdownUrl;
    this.height = height;
    this.weight = weight;
    this.stats = stats;
  }
}
