import styled from 'styled-components'

export const StyledCard = styled.div`
  width: ${props => props.width};
  background: #fff;
  border-radius: ${props => (props.roundedTop ? '10px 10px 0 0' : '10px')};
  margin: ${props => (props.margin ? props.margin : 'auto')};
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: ${props =>
    props.flexDirection ? props.flexDirection : 'row'};
  align-items: ${props => (props.alignItems ? props.alignItems : 'center')};
  justify-content: ${props => props.justifyContent};
  position: relative;
`
