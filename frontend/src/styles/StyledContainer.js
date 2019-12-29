import styled from 'styled-components'

export const StyledContainer = styled.div`
  max-width: ${props => (props.maxWidth ? props.maxWidth : '800px')}; // 896px
  margin: auto;
  position: relative;
  @media (max-width: 555px) {
    /* FIXME: */
    margin: 0 18px;
  }
`
