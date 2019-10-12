var app = new Vue({
  el: "#app",
  data() {
    return {
      selectedTypes: [],
      searchText: "",
      typeColor: {
        grass: "#78C850",
        poison: "#A040A0",
        fire: "#F08030",
        flying: "#A890F0",
        water: "#6890F0",
        bug: "#A8B820",
        normal: "#A8A878",
        electric: "#F8D030"
      },
      pokemon: {
        id: 25,
        name: "pikachu",
        image: "images/pokemons/pikachu.png",
        types: ["electric"],
        abilities: ["lightning-rod", "static"],
        experience: 112,
        height: 4,
        weight: 60
      },
      pokemons: []
    };
  },
  computed: {
    filteredPokemons() {
      return this.pokemons
        .filter(pokemon => pokemon.name.includes(this.searchText.toLowerCase()))
        .filter(pokemon => {
          return this.selectedTypes.length === 0
            ? true
            : pokemon.types.some(type => this.selectedTypes.includes(type));
        });
    }
  },
  methods: {
    removePokemon(pokemonToRemove) {
      this.pokemons = this.pokemons.filter(
        pokemon => pokemon.name !== pokemonToRemove.name
      );
    },
    setSearchText(event) {
      this.searchText = event.target.value;
    }
  },
  created: function() {
    fetch("https://api.jsonbin.io/b/5ab37f77989617146bd6eb29")
      .then(response => response.json())
      .then(function(pokemons) {
        app.pokemons = pokemons;
        console.log(pokemons);
      });
  }
});
