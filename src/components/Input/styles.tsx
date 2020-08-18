import styled, { css } from 'styled-components'
import Tooltip from '../Tooltip'

interface Icontainer {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.div<Icontainer>`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  color: #666360;
  display: flex;
  align-items: center;

  svg {
    margin-right: 16px;
  }

  & + & {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border: 2px solid #ac3030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border: 2px solid #ff9000;
      color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  input {
    flex: 1;
    background: transparent;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }
`

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  span {
    background: #c53030;
    color: #f4ede8;

    &::before {
      border-color: #c53030 transparent;
    }
  }

  svg {
    margin: 0;
  }
`
