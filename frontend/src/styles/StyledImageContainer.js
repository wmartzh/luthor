import styled from 'styled-components'

export const StyledImageContainer = styled.div`
  background: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: ${props => props.height};
  width: ${props => props.width};
`
