let pokemonList = [
{
    name: "Charizard",
    height: 1.7,
    types: ["fire", "flying"]
},
{
    name: "Mewtwo",
    height: 2,
    types: "psychic"
},
{
    name: "Pikachu",
    height: 0.4,
    types: "electric"
}
];

for (let i = 0; i < pokemonList.length; i++){
document.write (pokemonList[i].name + " " + "(height:" + " " + pokemonList[i].height + ") " )
    if (pokemonList[i].height >= 2)
    document.write ("-Wow, thats big! ")
}
