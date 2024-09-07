const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 1500;
const pokemonsPerPage = 20; // Mostrar 20 pokémons por página
let currentPage = 1; // Página inicial

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};

const mainTypes = Object.keys(colors);
let allPokemons = []; // Para armazenar todos os pokémons



const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++){
        await getPokemons(i);
    }
};

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    createPokemonCard(data);
};

const createPokemonCard = (poke) => {
    const card = document.createElement('div');
    card.classList.add("pokemon");

    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const pokeTypes = poke.types.map(type => type.type.name);
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
    const color = colors[type]; 

    // Aplica a cor de fundo com base no tipo
card.style.backgroundColor = color;

// Adiciona uma classe ao Pokémon com o tipo correspondente
card.classList.add(type);

    card.style.backgroundColor = color;

    const pokemonInnerHTML = `
    <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>
    `;

    card.innerHTML = pokemonInnerHTML;

    pokeContainer.appendChild(card);
};

fetchPokemons();


function pesquisar() {
    let section = document.getElementById("resultados-pesquisa");
    let campoPesquisa = document.getElementById("campo-pesquisa").value;

    if (!campoPesquisa) {
        section.innerHTML = "<p>Nada foi encontrado. Você precisa digitar o nome de um atleta ou esporte</p>";
        return;
    }

    campoPesquisa = campoPesquisa.toLowerCase();

    let resultados = "";
    let titulo = ""; 
    let descricao = "";
    let tags = "";

    for (let dado of dados) {
        titulo = dado.titulo.toLowerCase();
        descricao = dado.descricao.toLowerCase();
        tags = dado.tags.toLowerCase();

        if (titulo.includes(campoPesquisa) || descricao.includes(campoPesquisa) || tags.includes(campoPesquisa)) {
            resultados += `
            <div class="item-resultado">
                <h2>
                    <a href="#" target="_blank">${dado.titulo}</a>
                </h2>
                <p class="descricao-meta">${dado.descricao}</p>
                <a href=${dado.link} target="_blank">Mais informações</a>
            </div>
        `;
        }
    }

    if (!resultados) {
        resultados = "<p>Nada foi encontrado</p>";
    }

    section.innerHTML = resultados;
}


//função de filtragem
function filterPokemons() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const allPokemons = document.querySelectorAll(".pokemon");

    allPokemons.forEach((pokemon) => {
        const name = pokemon.querySelector(".name").innerText.toLowerCase();
        const type = pokemon.querySelector(".type span").innerText.toLowerCase();
        const number = pokemon.querySelector(".number").innerText.toLowerCase();

        if (name.includes(searchInput) || type.includes(searchInput) || number.includes(searchInput)) {
            pokemon.style.display = "block";
        } else {
            pokemon.style.display = "none";
        }
    });
}

//função para filtrar por tipo
function filterByType(type) {
    const allPokemons = document.querySelectorAll(".pokemon");

    allPokemons.forEach((pokemon) => {
        const pokeType = pokemon.querySelector(".type span").innerText.toLowerCase();

        if (type === 'all' || pokeType.includes(type)) {
            pokemon.style.display = "block";
        } else {
            pokemon.style.display = "none";
        }
    });
}


