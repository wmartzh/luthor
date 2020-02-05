import React from 'react'
import styled from 'styled-components'
import { LinkComponent } from './LinkComponent'

export const BigButtonComponent = ({
  label,
  content,
  color = '#292929',
  width = '150px',
  height = '150px',
  to = '/'
}) => {
  const StyledBigButtonComponent = styled.div`
    height: ${props => props.height};
    width: ${props => props.width};
    position: relative;
    padding: 16px;
    margin-bottom: 20px;
    background: #fff;
    border-radius: 5px 5px 10px 10px;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048);
    overflow: hidden;
    .bg-content {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 60px;
      background: ${props => props.color};
      .label {
        display: flex;
        justify-content: center;
        span {
          background: #fff;
          color: ${props => props.color};
          margin-top: -20px;
          padding: 8px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 5px;
          box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048);
        }
      }
    }
    @media (max-width: 555px) {
      width: 100%;
    }
  `

  const button = (
    <StyledBigButtonComponent color={color} width={width} height={height}>
      <div className="label">{label}</div>
      <div className="bg-content">
        <div className="label">
          <span>{content || '0'}</span>
        </div>
      </div>
    </StyledBigButtonComponent>
  )

  return <LinkComponent to={to}>{button}</LinkComponent>
}
