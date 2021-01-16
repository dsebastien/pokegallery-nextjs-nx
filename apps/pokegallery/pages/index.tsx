import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
      .then((res) => res.json())
      .then((data) => setPokemons(data.results));
  });

  return (
    <StyledPage>
      <div>
        {pokemons.map((pokemon) => (
          <div key={pokemon.name}> { /* pokemon.url */ }
            <div>{pokemon.name}</div>
          </div>
        ))}
      </div>
    </StyledPage>
  );
}

export default Index;
