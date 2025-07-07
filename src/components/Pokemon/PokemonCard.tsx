import React from 'react'
import { Card, Spin, Alert } from 'antd'
import { useGetPokemonByNameQuery } from '../../store/reducers/pokemon/pokemonAPI'

interface PokemonCardProps {
  pokemonName: string
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonName }) => {
  const { data, error, isLoading } = useGetPokemonByNameQuery(pokemonName)

  if (isLoading) return <Spin tip={`Loading ${pokemonName}...`} />
  if (error) return <Alert message={`Error loading ${pokemonName}`} type='error' />
  if (!data) return null

  return (
    <Card
      title={data.name.toUpperCase()}
      cover={<img alt={data.name} src={data.sprites?.front_default ?? undefined} />}
      className='pokemon-card'
    >
      <p>
        <strong>Height:</strong> {data.height}
      </p>
      <p>
        <strong>Weight:</strong> {data.weight}
      </p>
      <p>
        <strong>Types:</strong> {data.types?.map((t) => t.type.name).join(', ')}
      </p>
    </Card>
  )
}

export default PokemonCard
