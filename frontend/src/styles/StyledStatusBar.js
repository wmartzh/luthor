import styled from 'styled-components'
export const StyledStatusBar = styled.div`
  width: ${props => props.width};
  height: 14px;
  margin: ${props => props.margin};
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
  background: ${props => props.background};
  cursor: pointer;
`
