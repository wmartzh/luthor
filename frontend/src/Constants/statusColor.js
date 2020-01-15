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
    present: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    absent: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    late: 'linear-gradient(45deg, #82E9E4 30%, #F3D62F 90%)'
  }
}

// linear-gradient(45deg,#82E9E4,#F3D62F)

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
