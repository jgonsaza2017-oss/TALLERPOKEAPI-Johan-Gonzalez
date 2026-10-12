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

probarBusqueda();