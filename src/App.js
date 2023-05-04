import React from "react";
import styled from "@emotion/styled";
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

import "./App.css";

import PokemonInfo from "./components/PokemonInfo";
import PokemonTable from "./components/PokemonTable";
import PokemonFilter from "./components/PokemonFilter";

const pokemonReducer = (
  state = {
    pokemon: [],
    filter: "",
    selectedPokemon: null,
  },
  action
) => {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    case "SET_POKEMON":
      return {
        ...state,
        pokemon: action.payload,
      };
    case "SET_SELECTED_POKEMON":
      return {
        ...state,
        selectedPokemon: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(pokemonReducer);

const Title = styled.h1`
  text-align: center;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  grid-column-gap: 1rem;
`;

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;

function App() {

  const dispatch = useDispatch();
  const pokemon = useSelector(state => state.pokemon);

  React.useEffect(() => {
    fetch("/starting-react/pokemon.json")
      .then((resp) => resp.json())
      .then((data) =>
        dispatch({
          type: "SET_POKEMON",
          payload: data,
        })
      );
  }, [dispatch]);

  if (!pokemon) {
    return <div>Loading data</div>;
  }

  return (
      <Container>
        <Title>Pokemon Search</Title>

        <TwoColumnLayout>
          <div>
            <PokemonFilter />
            <PokemonTable />
          </div>
          <PokemonInfo />
        </TwoColumnLayout>
      </Container>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
