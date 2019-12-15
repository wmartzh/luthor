import styled from 'styled-components'

export const StyledAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-bottom: 10px;
  background: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`
