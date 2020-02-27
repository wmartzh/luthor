export const tableHeader = role => [
  {
    size: '110px',
    title: 'State',
    display: true,
    displayMd: true,
    displaySm: true,
    color: '#77B0C8'
  },
  {
    size: '340px',
    title: 'Name',
    display: true,
    displayMd: true,
    displaySm: true,
    color: '#77B0C8'
  },
  {
    size: '340px',
    title: role === '4' ? 'Vicerector' : 'Preceptor',
    display: true,
    displayMd: false,
    displaySm: false,
    color: '#77B0C8'
  },
  {
    size: '100px',
    title: '',
    display: true,
    displayMd: true,
    displaySm: true,
    color: '#77B0C8'
  }
]
