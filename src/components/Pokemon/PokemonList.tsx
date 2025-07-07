import React from 'react'
import { Table, Button } from 'antd'
import { IPokemon } from '../../store/reducers/pokemon/pokemon.types'

interface PokemonListProps {
  pokemon: IPokemon[]
  onSelect: (name: string) => void
  page: number
  total: number
  limit: number
  onPageChange: (page: number) => void
}

const PokemonList: React.FC<PokemonListProps> = ({
  pokemon,
  onSelect,
  page,
  total,
  limit,
  onPageChange,
}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <Button type='link' onClick={() => onSelect(name)}>
          {name}
        </Button>
      ),
    },
  ]

  return (
    <Table
      dataSource={pokemon}
      columns={columns}
      rowKey='name'
      pagination={{
        current: page,
        pageSize: limit,
        total,
        onChange: onPageChange,
      }}
    />
  )
}

export default PokemonList
