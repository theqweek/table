export const CONDITIONS = [
  {
    header: 'Равно',
    accessor: 'equal',
    sorter: (a, b) =>  a.toLowerCase() === String(b).toLowerCase()
  },
  {
    header: 'Содержит',
    accessor: 'contains',
    sorter: (a, b) => String(b).toLowerCase().includes(a.toLowerCase())
  },
  {
    header: 'Больше',
    accessor: 'more',
    sorter: (a, b) => 
      typeof b === 'string' ? a.toLowerCase() < b.toLowerCase() 
      : +a < b
  },
  {
    header: 'Меньше',
    accessor: 'less',
    sorter: (a, b) => 
      typeof b === 'string' ? a.toLowerCase() > b.toLowerCase() 
      : +a > b
  },
]