import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [Pokemons, setPokemons] = useState({});
  const [Search, setSearch] = useState("");

  const getPokemons = (id) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
      const pokemon = response.data;
      setPokemons((prevPokemons) => ({ ...prevPokemons, [id]: pokemon }));
    });
  };

  const arrayPokemons = () =>
    Array(150)
      .fill()
      .map((_, index) => getPokemons(index + 1));

  const searchPokemons = Object.values(Pokemons).filter(
    (pokemon) =>
      pokemon.name.toLocaleLowerCase().includes(Search.toLocaleLowerCase()) ||
      pokemon.id === parseInt(Search)
  );

  useEffect(() => {
    arrayPokemons();
  }, []);

  return (
    <div className="container">
      <h1>Pokedex</h1>

      <div>
        <input
          className="search"
          type="search"
          placeholder="To look for"
          value={Search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </div>

      <ul className="list">
        {searchPokemons.map(({ id, name, types }) => (
          <li className="card">
            <img
              className="card-image"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={name}
            />
            <h2>
              {id}.{name}{" "}
            </h2>
            <p className="type">
              {types.map((item) => item.type.name).join(" || ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
