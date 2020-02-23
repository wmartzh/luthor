import styled from 'styled-components'

export const StyledTypography = styled.div`
  font-family: ${props => (props.fontFamily ? props.fontFamily : 'Roboto')};
  font-size: ${props => (props.fontSize ? props.fontSize : '26px')};
  font-weight: ${props => (props.fontWeigth ? props.fontWeigth : '400')};
  color: ${props => (props.color ? props.color : '#000')};
`
