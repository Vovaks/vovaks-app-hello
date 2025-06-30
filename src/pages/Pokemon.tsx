import React, { useState } from 'react';
import { Input, Row, Col, Spin, Alert } from 'antd';
import PokemonList from '../components/Pokemon/PokemonList';
import PokemonCard from '../components/Pokemon/PokemonCard';
import { useGetPokemonListQuery } from '../store/reducers/pokemon/pokemonAPI';

const Pokemon: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 20;


  const { data, error, isLoading } = useGetPokemonListQuery({ page, limit });

  const filteredPokemon = data?.results.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pokemon-page">
      <h1>Pokémon Explorer</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Input
            placeholder="Search Pokémon by name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {isLoading && <Spin tip="Loading Pokémon..." />}
          {error && <Alert message="Error fetching Pokémon" type="error" />}
          {filteredPokemon && (
            <PokemonList
              pokemon={filteredPokemon}
              onSelect={setSelectedPokemon}
              page={page}
              total={data?.count || 0}
              onPageChange={setPage}
              limit={limit}
            />
          )}
        </Col>
        <Col xs={24} md={12}>
          {selectedPokemon && <PokemonCard pokemonName={selectedPokemon} />}
        </Col>
      </Row>
    </div>
  );
};

export default Pokemon;