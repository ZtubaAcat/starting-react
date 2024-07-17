import logo from "./logo.svg";
import "./App.css";
import PropTypes from "prop-types";
import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr key={pokemon.id}>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onSelect(pokemon)}
      >
        Select!
      </Button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
};

const PokemonInfo = ({ name, base }) => (
  <div>
    <Name>{name.english}</Name>
    <table>
      {Object.keys(base).map((key) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{base[key]}</td>
        </tr>
      ))}
    </table>
  </div>
);

PokemonInfo.propTypes = {
  name: PropTypes.shape({ english: PropTypes.string }),
  base: PropTypes.shape({
    HP: PropTypes.number,
    Attack: PropTypes.number,
    Defense: PropTypes.number,
    SpAttack: PropTypes.number,
    SpDefense: PropTypes.number,
    Speed: PropTypes.number,
  }),
};

const Title = styled.h1`
  text-align: center;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  gridcolumngap: 1rem;
`;

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: large;
  margin-bottom: 10px;
  padding: 0.2rem;
`;

const Name = styled.h1`
  margin-top: 50px;
  margin-bottom: 0px;
`;
function App() {
  const [filter, filterSet] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState("");
  const [pokemon, pokemonSet] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => pokemonSet(data));
  }, []);
  return (
    <Container>
      <Title> Pokemon Search</Title>

      <TwoColumnLayout>
        <div>
          <Input value={filter} onChange={(e) => filterSet(e.target.value)} />
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>

            <tbody>
              {pokemon
                .filter((pokemon) =>
                  pokemon.name.english.toLowerCase().includes(filter)
                )
                .slice(0, 20)
                .map((pokemon) => (
                  <PokemonRow
                    pokemon={pokemon}
                    key={pokemon.id}
                    onSelect={(pokemon) => setSelectedItem(pokemon)}
                  />
                ))}
            </tbody>
          </table>
        </div>
        {selectedItem && <PokemonInfo {...selectedItem} />}
      </TwoColumnLayout>
    </Container>
  );
}

export default App;
