async function buscarPokemon(nombre) {
const url = `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`; 

const respuesta = await fetch(url);

if (!respuesta.ok) {
    console.log(`Error: No se encontró a ${nombre} (Status: ${respuesta.status})`);
    return null;
}

return await respuesta.json();
}

async function probarBusqueda() {
  console.log("Buscando a charmander...");
  const poke1 = await buscarPokemon("charmander");

  if (poke1) {
    console.log(`Encontrado: ${poke1.name} - Altura: ${poke1.height}`);
    }

    console.log("\nBuscado a agumon (este mo existe en pokémon)");
    const pokeFalso = await buscarPokemon("agumon");
}

probarBusqueda();

