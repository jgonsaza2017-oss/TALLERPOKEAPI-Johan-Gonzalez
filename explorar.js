//async function explorarPokemon() {

  //  const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");

//console.log("Status de respuesta:" , respuesta.status);
//const datos = await respuesta.json();

//console.log(datos)

//}

//explorarPokemon();

async function explorarPokemon() {
const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
const datos = await respuesta.json();

console.log(`\n--- DATOS DE ${datos.name.toUpperCase()} --- `);

console.log("\nTipos:");
for (let t of datos.types) {
    console.log(`-${t.type.name}`);
}

console.log("\nStats:");
for (let s of datos.stats) {
    console.log(`- ${s.stat.name}: ${s.base_stat}`);
}

console.log("\nHabilidades:");
for (let a of datos.abilities) {
    console.log(`- ${a.ability.name}`);
}

}

explorarPokemon();