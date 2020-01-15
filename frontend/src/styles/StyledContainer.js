import styled from 'styled-components'

export const StyledContainer = styled.div`
  max-width: ${props => (props.maxWidth ? props.maxWidth : '840px')}; // 896px
  margin: auto;
  padding: 0 18px;
  position: relative;
  @media (max-width: 555px) {
    /* FIXME: */
    /* margin: 0 18px; */
  }
`
