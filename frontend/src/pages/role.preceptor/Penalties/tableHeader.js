export const tableHeader = role => [
  {
    size: '160px',
    title: 'Code',
    display: true,
    displayMd: true,
    displaySm: true,
    color: '#FF719B'
  },
  {
    size: '320px',
    title: role === '4' || role === '6' ? 'Name' : 'Reazon',
    display: true,
    displayMd: true,
    displaySm: true,
    color: '#FF719B'
  },
  {
    size: '120px',
    title: 'End',
    display: true,
    displayMd: false,
    displaySm: false,
    color: '#FF719B'
  },
  {
    size: '100px',
    title: '',
    display: true,
    displayMd: true,
    displaySm: true,
    color: '#FF719B'
  }
]
