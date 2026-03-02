const express = require("express");

const app = express();

const PORT = 3000;

const BASE_URL = "https://rickandmortyapi.com/api";


// endpoint principal (para probar si funciona)
app.get("/", (req, res) => {
  res.json({
    message: "Rick and Morty API - Replica",
    endpoints: {
      characters: "/api/characters",
      characterById: "/api/characters/:id",
      locations: "/api/locations",
      episodes: "/api/episodes"
    }
  });
});



/* ========================================
   CHARACTERS
======================================== */


// obtener todos los personajes + filtros + paginación
app.get("/api/characters", async (req, res) => {

  try {

    const { name, status, species, gender, page, ids } = req.query;

    let url = `${BASE_URL}/character`;

    // múltiples IDs
    if (ids) {
      url = `${url}/${ids}`;
    }

    else {

      url += "?";

      if (name) url += `name=${name}&`;
      if (status) url += `status=${status}&`;
      if (species) url += `species=${species}&`;
      if (gender) url += `gender=${gender}&`;
      if (page) url += `page=${page}&`;

    }

    const response = await fetch(url);

    const data = await response.json();

    res.json(data);

  }

  catch (error) {

    res.status(500).json({
      error: "Error obteniendo personajes"
    });

  }

});



// personaje por ID
app.get("/api/characters/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const response = await fetch(`${BASE_URL}/character/${id}`);

    const data = await response.json();

    res.json(data);

  }

  catch (error) {

    res.status(500).json({
      error: "Error obteniendo personaje"
    });

  }

});



/* ========================================
   LOCATIONS
======================================== */


app.get("/api/locations", async (req, res) => {

  try {

    const { name, type, dimension, page } = req.query;

    let url = `${BASE_URL}/location/?`;

    if (name) url += `name=${name}&`;
    if (type) url += `type=${type}&`;
    if (dimension) url += `dimension=${dimension}&`;
    if (page) url += `page=${page}&`;

    const response = await fetch(url);

    const data = await response.json();

    res.json(data);

  }

  catch {

    res.status(500).json({
      error: "Error obteniendo locations"
    });

  }

});



app.get("/api/locations/:id", async (req, res) => {

  try {

    const response = await fetch(`${BASE_URL}/location/${req.params.id}`);

    const data = await response.json();

    res.json(data);

  }

  catch {

    res.status(500).json({
      error: "Error obteniendo location"
    });

  }

});



/* ========================================
   EPISODES
======================================== */


app.get("/api/episodes", async (req, res) => {

  try {

    const { name, episode, page } = req.query;

    let url = `${BASE_URL}/episode/?`;

    if (name) url += `name=${name}&`;
    if (episode) url += `episode=${episode}&`;
    if (page) url += `page=${page}&`;

    const response = await fetch(url);

    const data = await response.json();

    res.json(data);

  }

  catch {

    res.status(500).json({
      error: "Error obteniendo episodes"
    });

  }

});



app.get("/api/episodes/:id", async (req, res) => {

  try {

    const response = await fetch(`${BASE_URL}/episode/${req.params.id}`);

    const data = await response.json();

    res.json(data);

  }

  catch {

    res.status(500).json({
      error: "Error obteniendo episode"
    });

  }

});



/* ========================================
   START SERVER
======================================== */


app.listen(PORT, () => {

  console.log(`Servidor corriendo en:`);
  console.log(`http://localhost:${PORT}`);

});