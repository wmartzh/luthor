const statusColor = {
  // fth Users
  in: 'linear-gradient(45deg, #92F1D5 30%, #08B1C5 90%)',
  out: 'linear-gradient(45deg,#45b649 20%, #dce35b 80%)',
  penalized: 'linear-gradient(45deg, #F45953 30%, #FF8E53 90%)',

  // fth Permissions
  allow: 'linear-gradient(45deg, #92F1D5 30%, #08B1C5 90%)',
  denied: 'linear-gradient(45deg, #F45953 30%, #FF8E53 90%)',

  // fth Assitances
  assistance: {
    present: '#1a936f', // #A1C010
    absent: '#ea5455', // #FF004C
    late: '#F3D62F'
  }
}

export const defaultColors = {
  primary: '#00A7CA',
  red: '#FF004C',
  green: '#A1C010',
  yellow: '#FBB13C'
}

export const userStatusColor = status => {
  return status === 'in'
    ? statusColor.in
    : status === 'out'
    ? statusColor.out
    : statusColor.penalized
}

export const assistanceStatusColor = status => {
  return status === 'present'
    ? statusColor.assistance.present
    : status === 'absent'
    ? statusColor.assistance.absent
    : statusColor.assistance.late
}
