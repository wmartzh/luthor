import styled from 'styled-components'

export const StyledBackButton = styled.div`
  position: absolute;
  left: ${props => (props.left ? props.left : '23px')};
  top: ${props => (props.top ? props.top : '23px')};
  cursor: pointer;
`
