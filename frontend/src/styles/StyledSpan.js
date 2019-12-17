import styled from 'styled-components'

export const StyledSpan = styled.span`
  font-family: ${props => (props.fontFamily ? props.fontFamily : 'Roboto')};
  font-size: 14px;
  font-weight: ${props => (props.fontWeigth ? props.fontWeigth : '400')};
  color: ${props => (props.color ? props.color : '#919191')};
`
