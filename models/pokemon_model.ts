// =======================
// Core Models (TypeScript)
// =======================

export class NamedApiResource {
  readonly name: string;
  readonly url: string;

  constructor({ name, url }: { name: string; url: string }) {
    this.name = name;
    this.url = url;
  }

  static fromJson(json: any): NamedApiResource {
    return new NamedApiResource({ name: json.name, url: json.url });
  }

  toJson() {
    return { name: this.name, url: this.url };
  }
}

export class VersionGameIndex {
  readonly game_index: number;
  readonly version: NamedApiResource;

  constructor({
    game_index,
    version,
  }: {
    game_index: number;
    version: NamedApiResource;
  }) {
    this.game_index = game_index;
    this.version = version;
  }

  static fromJson(json: any): VersionGameIndex {
    return new VersionGameIndex({
      game_index: json.game_index,
      version: NamedApiResource.fromJson(json.version),
    });
  }

  toJson() {
    return { game_index: this.game_index, version: this.version.toJson() };
  }
}

export class PokemonCries {
  readonly latest: string | null;
  readonly legacy: string | null;

  constructor({ latest = null, legacy = null }: { latest?: string | null; legacy?: string | null } = {}) {
    this.latest = latest;
    this.legacy = legacy;
  }

  static fromJson(json: any): PokemonCries {
    return new PokemonCries({
      latest: json?.latest ?? null,
      legacy: json?.legacy ?? null,
    });
  }

  toJson() {
    return { latest: this.latest, legacy: this.legacy };
  }
}

export class PokemonSprites {
  readonly front_default: string | null;
  readonly front_shiny: string | null;
  readonly front_female: string | null;
  readonly front_shiny_female: string | null;
  readonly back_default: string | null;
  readonly back_shiny: string | null;
  readonly back_female: string | null;
  readonly back_shiny_female: string | null;
  other?: OtherSprites; 

  constructor(init: Partial<PokemonSprites> = {}) {
    this.front_default = init.front_default ?? null;
    this.front_shiny = init.front_shiny ?? null;
    this.front_female = init.front_female ?? null;
    this.front_shiny_female = init.front_shiny_female ?? null;
    this.back_default = init.back_default ?? null;
    this.back_shiny = init.back_shiny ?? null;
    this.back_female = init.back_female ?? null;
    this.back_shiny_female = init.back_shiny_female ?? null;
  }

  static fromJson(json: any): PokemonSprites {
    return new PokemonSprites({
      front_default: json?.front_default ?? null,
      front_shiny: json?.front_shiny ?? null,
      front_female: json?.front_female ?? null,
      front_shiny_female: json?.front_shiny_female ?? null,
      back_default: json?.back_default ?? null,
      back_shiny: json?.back_shiny ?? null,
      back_female: json?.back_female ?? null,
      back_shiny_female: json?.back_shiny_female ?? null,
    });
  }

  toJson() {
    return {
      front_default: this.front_default,
      front_shiny: this.front_shiny,
      front_female: this.front_female,
      front_shiny_female: this.front_shiny_female,
      back_default: this.back_default,
      back_shiny: this.back_shiny,
      back_female: this.back_female,
      back_shiny_female: this.back_shiny_female,
    };
  }
}

export class PokemonStat {
  readonly base_stat: number;
  readonly effort: number;
  readonly stat: NamedApiResource;

  constructor({
    base_stat,
    effort,
    stat,
  }: {
    base_stat: number;
    effort: number;
    stat: NamedApiResource;
  }) {
    this.base_stat = base_stat;
    this.effort = effort;
    this.stat = stat;
  }

  static fromJson(json: any): PokemonStat {
    return new PokemonStat({
      base_stat: json.base_stat,
      effort: json.effort,
      stat: NamedApiResource.fromJson(json.stat),
    });
  }

  toJson() {
    return {
      base_stat: this.base_stat,
      effort: this.effort,
      stat: this.stat.toJson(),
    };
  }
}

export class PokemonMoveVersion {
  readonly move_learn_method: NamedApiResource;
  readonly version_group: NamedApiResource;
  readonly level_learned_at: number;
  readonly order: number | null;

  constructor({
    move_learn_method,
    version_group,
    level_learned_at,
    order = null,
  }: {
    move_learn_method: NamedApiResource;
    version_group: NamedApiResource;
    level_learned_at: number;
    order?: number | null;
  }) {
    this.move_learn_method = move_learn_method;
    this.version_group = version_group;
    this.level_learned_at = level_learned_at;
    this.order = order ?? null;
  }

  static fromJson(json: any): PokemonMoveVersion {
    return new PokemonMoveVersion({
      move_learn_method: NamedApiResource.fromJson(json.move_learn_method),
      version_group: NamedApiResource.fromJson(json.version_group),
      level_learned_at: json.level_learned_at ?? 0,
      order: json.order == null ? null : json.order,
    });
  }

  toJson() {
    return {
      move_learn_method: this.move_learn_method.toJson(),
      version_group: this.version_group.toJson(),
      level_learned_at: this.level_learned_at,
      ...(this.order != null ? { order: this.order } : {}),
    };
  }
}

export class PokemonMove {
  readonly move: NamedApiResource;
  readonly version_group_details: PokemonMoveVersion[];

  constructor({
    move,
    version_group_details,
  }: {
    move: NamedApiResource;
    version_group_details: PokemonMoveVersion[];
  }) {
    this.move = move;
    this.version_group_details = version_group_details;
  }

  static fromJson(json: any): PokemonMove {
    return new PokemonMove({
      move: NamedApiResource.fromJson(json.move),
      version_group_details: (json.version_group_details ?? []).map(PokemonMoveVersion.fromJson),
    });
  }

  toJson() {
    return {
      move: this.move.toJson(),
      version_group_details: this.version_group_details.map((e) => e.toJson()),
    };
  }
}

export class PokemonHeldItemVersion {
  readonly version: NamedApiResource;
  readonly rarity: number;

  constructor({ version, rarity }: { version: NamedApiResource; rarity: number }) {
    this.version = version;
    this.rarity = rarity;
  }

  static fromJson(json: any): PokemonHeldItemVersion {
    return new PokemonHeldItemVersion({
      version: NamedApiResource.fromJson(json.version),
      rarity: json.rarity,
    });
  }

  toJson() {
    return { version: this.version.toJson(), rarity: this.rarity };
  }
}

export class PokemonHeldItem {
  readonly item: NamedApiResource;
  readonly version_details: PokemonHeldItemVersion[];

  constructor({
    item,
    version_details,
  }: {
    item: NamedApiResource;
    version_details: PokemonHeldItemVersion[];
  }) {
    this.item = item;
    this.version_details = version_details;
  }

  static fromJson(json: any): PokemonHeldItem {
    return new PokemonHeldItem({
      item: NamedApiResource.fromJson(json.item),
      version_details: (json.version_details ?? []).map(PokemonHeldItemVersion.fromJson),
    });
  }

  toJson() {
    return {
      item: this.item.toJson(),
      version_details: this.version_details.map((e) => e.toJson()),
    };
  }
}

export class PokemonAbility {
  readonly ability: NamedApiResource | null;
  readonly is_hidden: boolean;
  readonly slot: number;

  constructor({
    ability,
    is_hidden,
    slot,
  }: {
    ability: NamedApiResource | null;
    is_hidden: boolean;
    slot: number;
  }) {
    this.ability = ability;
    this.is_hidden = is_hidden;
    this.slot = slot;
  }

  static fromJson(json: any): PokemonAbility {
    const abilityJson = json?.ability ?? null;
    return new PokemonAbility({
      ability: abilityJson ? NamedApiResource.fromJson(abilityJson) : null,
      is_hidden: json.is_hidden,
      slot: json.slot,
    });
  }

  toJson() {
    return {
      is_hidden: this.is_hidden,
      slot: this.slot,
      ability: this.ability ? this.ability.toJson() : null,
    };
  }
}

export class PokemonFormType {
  readonly slot: number;
  readonly type: NamedApiResource;

  constructor({ slot, type }: { slot: number; type: NamedApiResource }) {
    this.slot = slot;
    this.type = type;
  }

  static fromJson(json: any): PokemonFormType {
    return new PokemonFormType({
      slot: json.slot,
      type: NamedApiResource.fromJson(json.type),
    });
  }

  toJson() {
    return { slot: this.slot, type: this.type.toJson() };
  }
}

export class PokemonType {
  readonly slot: number;
  readonly type: NamedApiResource;

  constructor({ slot, type }: { slot: number; type: NamedApiResource }) {
    this.slot = slot;
    this.type = type;
  }

  static fromJson(json: any): PokemonType {
    return new PokemonType({
      slot: json.slot,
      type: NamedApiResource.fromJson(json.type),
    });
  }

  toJson() {
    return { slot: this.slot, type: this.type.toJson() };
  }
}

export class PokemonTypePast {
  readonly generation: NamedApiResource;
  readonly types: PokemonFormType[];

  constructor({
    generation,
    types,
  }: {
    generation: NamedApiResource;
    types: PokemonFormType[];
  }) {
    this.generation = generation;
    this.types = types;
  }

  static fromJson(json: any): PokemonTypePast {
    return new PokemonTypePast({
      generation: NamedApiResource.fromJson(json.generation),
      types: (json.types ?? []).map(PokemonFormType.fromJson),
    });
  }

  toJson() {
    return {
      generation: this.generation.toJson(),
      types: this.types.map((e) => e.toJson()),
    };
  }
}

export class PokemonAbilityPast {
  readonly generation: NamedApiResource;
  readonly abilities: PokemonAbility[];

  constructor({
    generation,
    abilities,
  }: {
    generation: NamedApiResource;
    abilities: PokemonAbility[];
  }) {
    this.generation = generation;
    this.abilities = abilities;
  }

  static fromJson(json: any): PokemonAbilityPast {
    return new PokemonAbilityPast({
      generation: NamedApiResource.fromJson(json.generation),
      abilities: (json.abilities ?? []).map(PokemonAbility.fromJson),
    });
  }

  toJson() {
    return {
      generation: this.generation.toJson(),
      abilities: this.abilities.map((e) => e.toJson()),
    };
  }
}

export class PokemonListResult {
  // Keeping your original capitalization
  readonly Name: string;
  readonly Url: string;

  constructor({ Name, Url }: { Name: string; Url: string }) {
    this.Name = Name;
    this.Url = Url;
  }

  static fromJson(json: any): PokemonListResult {
    return new PokemonListResult({ Name: json.name, Url: json.url });
  }

  toJson() {
    return { name: this.Name, url: this.Url };
  }
}

export class Pokemon {
  readonly id!: number;
  readonly name!: string;
  readonly base_experience!: number;
  readonly height!: number;
  readonly is_default!: boolean;
  readonly order!: number;
  readonly weight!: number;

  readonly abilities!: PokemonAbility[];
  readonly forms!: NamedApiResource[];
  readonly game_indices!: VersionGameIndex[];
  readonly held_items!: PokemonHeldItem[];
  readonly location_area_encounters!: string;
  readonly moves!: PokemonMove[];
  readonly past_types!: PokemonTypePast[];
  readonly past_abilities!: PokemonAbilityPast[];
  readonly sprites!: PokemonSprites;
  readonly cries!: PokemonCries;
  readonly species!: NamedApiResource;
  readonly stats!: PokemonStat[];
  readonly types!: PokemonType[];

  constructor(params: {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: PokemonAbility[];
    forms: NamedApiResource[];
    game_indices: VersionGameIndex[];
    held_items: PokemonHeldItem[];
    location_area_encounters: string;
    moves: PokemonMove[];
    past_types: PokemonTypePast[];
    past_abilities: PokemonAbilityPast[];
    sprites: PokemonSprites;
    cries: PokemonCries;
    species: NamedApiResource;
    stats: PokemonStat[];
    types: PokemonType[];
  }) {
    Object.assign(this, params);
  }

  static fromJson(json: any): Pokemon {
    return new Pokemon({
        id: json.id ?? 0,
        name: json.name ?? "",
        base_experience: json.base_experience ?? 0,
        height: json.height ?? 0,
        is_default: json.is_default ?? false,
        order: json.order ?? 0,
        weight: json.weight ?? 0,

        abilities: Array.isArray(json.abilities)
        ? json.abilities.map(PokemonAbility.fromJson)
        : [],

        forms: Array.isArray(json.forms)
        ? json.forms.map(NamedApiResource.fromJson)
        : [],

        game_indices: Array.isArray(json.game_indices)
        ? json.game_indices.map(VersionGameIndex.fromJson)
        : [],

        held_items: Array.isArray(json.held_items)
        ? json.held_items.map(PokemonHeldItem.fromJson)
        : [],

        location_area_encounters: json.location_area_encounters ?? "",

        moves: Array.isArray(json.moves)
        ? json.moves.map(PokemonMove.fromJson)
        : [],

        past_types: Array.isArray(json.past_types)
        ? json.past_types.map(PokemonTypePast.fromJson)
        : [],

        past_abilities: Array.isArray(json.past_abilities)
        ? json.past_abilities.map(PokemonAbilityPast.fromJson)
        : [],

        sprites: json.sprites
        ? PokemonSprites.fromJson(json.sprites)
        : new PokemonSprites(),

        cries: json.cries
        ? PokemonCries.fromJson(json.cries)
        : new PokemonCries(),

        species: json.species
        ? NamedApiResource.fromJson(json.species)
        : new NamedApiResource({ name: "", url: "" }),

        stats: Array.isArray(json.stats)
        ? json.stats.map(PokemonStat.fromJson)
        : [],

        types: Array.isArray(json.types)
        ? json.types.map(PokemonType.fromJson)
        : [],
    });
    }


  toJson() {
    return {
      id: this.id,
      name: this.name,
      base_experience: this.base_experience,
      height: this.height,
      is_default: this.is_default,
      order: this.order,
      weight: this.weight,
      abilities: this.abilities.map((e) => e.toJson()),
      forms: this.forms.map((e) => e.toJson()),
      game_indices: this.game_indices.map((e) => e.toJson()),
      held_items: this.held_items.map((e) => e.toJson()),
      location_area_encounters: this.location_area_encounters,
      moves: this.moves.map((e) => e.toJson()),
      past_types: this.past_types.map((e) => e.toJson()),
      past_abilities: this.past_abilities.map((e) => e.toJson()),
      sprites: this.sprites.toJson(),
      cries: this.cries.toJson(),
      species: this.species.toJson(),
      stats: this.stats.map((e) => e.toJson()),
      types: this.types.map((e) => e.toJson()),
    };
  }
}

export class PokemonListResponse {
  readonly count: number;
  readonly next: string | null;
  readonly previous: string | null;
  readonly results: PokemonListResult[];

  constructor({
    count,
    next,
    previous,
    results,
  }: {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListResult[];
  }) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.results = results;
  }

  static fromJson(json: any): PokemonListResponse {
    return new PokemonListResponse({
      count: json.count ?? 0,
      next: json.next ?? null,
      previous: json.previous ?? null,
      results: Array.isArray(json.results)
        ? json.results.map(PokemonListResult.fromJson)
        : [],
    });
  }

  toJson() {
    return {
      count: this.count,
      next: this.next,
      previous: this.previous,
      results: this.results.map((r) => r.toJson()),
    };
  }
}


export interface OfficialArtwork {
    front_default: string | null;
}

export interface OtherSprites {
    'official-artwork': OfficialArtwork;
}
