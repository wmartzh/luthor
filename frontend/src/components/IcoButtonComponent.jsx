import React from 'react'
import styled from 'styled-components'
import { LinkComponent } from './LinkComponent'
import { StyledImageContainer } from '../styles/StyledImageContainer'

export const IcoButtonComponent = ({
  label,
  ico,
  svg,
  color = '#292929',
  width = '100%',
  height = '50px',
  to = '/'
}) => {
  const StyledBigButtonComponent = styled.div`
    height: ${props => props.height};
    width: ${props => props.width};
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 16px;
    margin-bottom: 20px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048);
    overflow: hidden;
    .label {
      position: absolute;
      left: 60px;
      top: 14px;
      font-size: 16px;
      font-weight: 500;
      color: ${props => props.color};
    }
    .bg-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      height: 100%;
      background: ${props => props.color};
      display: flex;
      justify-content: center;
      align-items: center;
      svg,
      .ico {
        color: white;
        height: 1.6em;
        width: 1.6em;
      }
    }
    @media (max-width: 555px) {
      .big-btn {
        flex-basis: 100%;
      }
    }
  `

  const button = (
    <StyledBigButtonComponent color={color} width={width} height={height}>
      <div className="bg-content">
        {!svg && <>{ico}</>}
        {svg && <StyledImageContainer image={svg} className="ico" />}
      </div>
      <div className="label">{label}</div>
    </StyledBigButtonComponent>
  )

  return <LinkComponent to={to}>{button}</LinkComponent>
}
