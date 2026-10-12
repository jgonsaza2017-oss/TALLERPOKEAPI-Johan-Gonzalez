async function buscarPokemon(nombre) {
  const url = `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`;
  const respuesta = await fetch(url);
  
  if (!respuesta.ok) {
    console.log(`Error: No se encontró a ${nombre} (Status: ${respuesta.status})`);
    return null;
  }
  
  return await respuesta.json();
}

function mostrarFicha(datos) {
  if (!datos) {
    console.log("No hay datos para mostrar.");
    return;
  }

  console.log(`\n=== ${datos.name.toUpperCase()} (#${datos.id}) ===`);

  let nombresTipos = [];
  for (const t of datos.types) {
    nombresTipos.push(t.type.name);
  }
  console.log(`Tipo(s): ${nombresTipos.join("/")}`);

  
  console.log(`Altura: ${datos.height * 10} cm`);
  console.log(`Peso: ${datos.weight / 10} kg`);

  console.log("Estadísticas:");
  for (const s of datos.stats) {
    console.log(` - ${s.stat.name}: ${s.base_stat}`);
  }

  console.log("Habilidades:");
  for (const a of datos.abilities) {
    let textoHabilidad = a.ability.name;
    if (a.is_hidden) {
      textoHabilidad += " (oculta)";
    }
    console.log(` - ${textoHabilidad}`);
  }
}

async function probarBusqueda() {
  console.log("Consultando la API...");
  
  const poke1 = await buscarPokemon("mewtwo");
  mostrarFicha(poke1);

  const poke2 = await buscarPokemon("lucario");
  mostrarFicha(poke2);
}

function obtenerStat(datos, nombreStat) {
  for (const s of datos.stats) {
    if (s.stat.name === nombreStat) {
      return s.base_stat; 
    }
  }
  return null;
}

async function compararPokemon(nombre1, nombre2, stat) {
  console.log(`\n--- Comparando '${stat}' entre ${nombre1.toUpperCase()} y ${nombre2.toUpperCase()} ---`);
  
  const poke1 = await buscarPokemon(nombre1);
  const poke2 = await buscarPokemon(nombre2);

  if (!poke1 || !poke2) {
    console.log("No se puede comparar porque uno o ambos Pokémon no existen.");
    return;
  }

  const valor1 = obtenerStat(poke1, stat);
  const valor2 = obtenerStat(poke2, stat);

  if (valor1 === null || valor2 === null) {
    console.log(`Error: La estadística "${stat}" no existe.`);
    console.log("Stats válidas: hp, attack, defense, special-attack, special-defense, speed");
    return;
  }

  console.log(`${poke1.name.toUpperCase()} tiene: ${valor1}`);
  console.log(`${poke2.name.toUpperCase()} tiene: ${valor2}`);

  if (valor1 > valor2) {
    console.log(`¡${poke1.name.toUpperCase()} gana en ${stat}!`);
  } else if (valor2 > valor1) {
    console.log(`¡${poke2.name.toUpperCase()} gana en ${stat}!`);
  } else {
    console.log("¡Es un empate exacto!");
  }
}


async function probarComparacion() {

  await compararPokemon("snorlax", "machamp", "attack");
  await compararPokemon("aggron", "steelix", "defense");
  await compararPokemon("pikachu", "eevee", "fuerza");
}

probarComparacion();