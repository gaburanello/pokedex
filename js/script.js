const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonElement = document.querySelector('.pokemon__element');
const pokemonElement2 = document.querySelector('.pokemon__element2');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200 && pokemon < 650) {
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonElement2.src = '';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonElement.src = './images/elements/' + data['types'][0]['type']['name'] + '.png';
        if(data['types'][1]['type']['name'])
            pokemonElement2.src = './images/elements/' + data['types'][1]['type']['name'] + '.png';
    }else{
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
        pokemonElement.src = '';
        pokemonElement2.src = '';
        pokemonImage.src = '';
    }
}

form.addEventListener('submit', () => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
});

const nextPoke = async () => {
    event.preventDefault();
    input.value = input.value == 'NaN' ? 1: parseInt(input.value) + 1;
    renderPokemon(input.value);
}
const prevPoke = async () => {
    event.preventDefault();
    if(parseInt(input.value) > 0)
        input.value = input.value == 'NaN' ? 1: parseInt(input.value) - 1;
    renderPokemon(input.value);
}