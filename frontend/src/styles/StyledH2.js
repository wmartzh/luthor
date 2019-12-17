import styled from 'styled-components'

export const StyledH2 = styled.div`
  font-size: 16px;
  font-weight: ${props => (props.fontWeigth ? props.fontWeigth : 400)};
  color: ${props => (props.color ? props.color : '#000')};
`
