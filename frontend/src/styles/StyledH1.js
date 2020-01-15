import styled from 'styled-components'

export const StyledH1 = styled.h1`
  font-size: 24px;
  font-weight: ${props => (props.fontWeigth ? props.fontWeigth : 400)};
  color: ${props => (props.color ? props.color : '#000')};
`
