const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const BASE_URL = "https://rickandmortyapi.com/api";


// endpoint raíz
app.get("/", (req, res) => {
    res.json({
        message: "API Rick and Morty funcionando",
        endpoints: {
            characters: "/api/characters",
            characterById: "/api/characters/:id",
            locations: "/api/locations",
            episodes: "/api/episodes"
        }
    });
});


// obtener personajes con filtros y paginación
app.get("/api/characters", async (req, res) => {
    try {

        const { page, name, status, species, gender, ids } = req.query;

        // si envían varios ids
        if (ids) {
            const response = await fetch(`${BASE_URL}/character/${ids}`);
            const data = await response.json();
            return res.json(data);
        }

        // construir query dinámicamente
        let query = [];

        if (page) query.push(`page=${page}`);
        if (name) query.push(`name=${name}`);
        if (status) query.push(`status=${status}`);
        if (species) query.push(`species=${species}`);
        if (gender) query.push(`gender=${gender}`);

        const queryString = query.length > 0 ? `?${query.join("&")}` : "";

        const response = await fetch(`${BASE_URL}/character${queryString}`);
        const data = await response.json();

        res.json(data);

    } catch (error) {
        res.status(500).json({
            error: "Error obteniendo personajes"
        });
    }
});


// personaje por id
app.get("/api/characters/:id", async (req, res) => {
    try {

        const { id } = req.params;

        const response = await fetch(`${BASE_URL}/character/${id}`);
        const data = await response.json();

        res.json(data);

    } catch (error) {
        res.status(500).json({
            error: "Error obteniendo personaje"
        });
    }
});


// locations
app.get("/api/locations", async (req, res) => {
    try {

        const { page, name, type, dimension } = req.query;

        let query = [];

        if (page) query.push(`page=${page}`);
        if (name) query.push(`name=${name}`);
        if (type) query.push(`type=${type}`);
        if (dimension) query.push(`dimension=${dimension}`);

        const queryString = query.length > 0 ? `?${query.join("&")}` : "";

        const response = await fetch(`${BASE_URL}/location${queryString}`);
        const data = await response.json();

        res.json(data);

    } catch (error) {
        res.status(500).json({
            error: "Error obteniendo locations"
        });
    }
});


// episodes
app.get("/api/episodes", async (req, res) => {
    try {

        const { page, name, episode } = req.query;

        let query = [];

        if (page) query.push(`page=${page}`);
        if (name) query.push(`name=${name}`);
        if (episode) query.push(`episode=${episode}`);

        const queryString = query.length > 0 ? `?${query.join("&")}` : "";

        const response = await fetch(`${BASE_URL}/episode${queryString}`);
        const data = await response.json();

        res.json(data);

    } catch (error) {
        res.status(500).json({
            error: "Error obteniendo episodios"
        });
    }
});


// iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});