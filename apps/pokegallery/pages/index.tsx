import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Observable, of, zip} from "rxjs";
import {combineAll, concatAll, concatMap, delay, map, mergeMap, tap} from "rxjs/operators";
import {fromFetch} from "rxjs/fetch";

const StyledPage = styled.div`
  .page {
  }
`;

function fetchPokemonData(pokemonUrl: string): Observable<any> {
  //console.log(pokemonUrl);
  return fromFetch(pokemonUrl).pipe(
    concatMap((response: any) => {
      if(response.ok) {
        return response.json();
      } else {
        return of({error: true});
      }
    }),
  );
}

function showPokemonsList(pokemons) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {
        pokemons.map((pokemon) => (
          <div key={pokemon.id}>
            <div>{pokemon.name}</div>
            <img src={  `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} width="250px" height="250px" />
          </div>
        ))
      }
    </div>
  );
}

export function Index() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fromFetch("https://pokeapi.co/api/v2/pokemon?limit=100000").pipe(
      concatMap((response) => {
        if(response.ok) {
          return response.json();
        } else{
          return of({ error: true});
        }
      }),
      mergeMap((val: any) => {
        return val.results;
      }),
      map((pokemonEntry: any) => {
        return fetchPokemonData(pokemonEntry.url);
      }),
      combineAll(), // Combine all of the observables
      tap((pokemonDetails) => {
        console.log(pokemonDetails);
        setPokemons([...pokemons, ...new Set(pokemonDetails)]);
      })
    ).subscribe({
      complete: () => {
        setLoading(false);
      }
    });
  }, []); // the empty arrow is there to avoid fetching data forever because of re-renders: https://www.andreasreiterer.at/react-useeffect-hook-loop/

  return (
    <StyledPage>
      <div>
        {loading? (
          <div>Chargement en cours...</div>
        ) : showPokemonsList(pokemons)
        }
      </div>
    </StyledPage>
  );
}

export default Index;
