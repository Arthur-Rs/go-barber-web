import styled, { css } from 'styled-components'

interface Icontainer {
  isFocused: boolean
  isFilled: boolean
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
