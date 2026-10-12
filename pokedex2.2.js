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

function obtenerStat(datos, nombreStat) {
  for (const s of datos.stats) {
    if (s.stat.name === nombreStat) {
      return s.base_stat; 
    }
  }
  return null;
}

async function pokemonMasFuerte(listaNombres, stat) {
  console.log(`\nBuscando al más fuerte en '${stat}' de la lista...`);
  
  let mejorNombre = "";
  let mejorValor = -1; 

  for (const nombre of listaNombres) {
    const datos = await buscarPokemon(nombre);
    if (!datos) continue; 

    const valor = obtenerStat(datos, stat);
    if (valor === null) continue; 

    if (valor > mejorValor) {
      mejorValor = valor;
      mejorNombre = datos.name;
    }
  }

  console.log(`¡El más fuerte en ${stat} es ${mejorNombre.toUpperCase()} con ${mejorValor}!`);
  return mejorNombre;
}

async function desafioFinal() {
  const miEquipo = ["charizard", "gengar", "dragonite", "snorlax", "tyranitar", "metagross"];
  
  const ganadorAtaque = await pokemonMasFuerte(miEquipo, "attack");
  const ganadorDefensa = await pokemonMasFuerte(miEquipo, "defense");
  
  console.log(`\n--- Mostrando la ficha del campeón en ataque ---`);
  const datosGanadorAtaque = await buscarPokemon(ganadorAtaque);
  mostrarFicha(datosGanadorAtaque);
}

desafioFinal();