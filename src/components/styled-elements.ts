import styled from 'styled-components';

const Button = styled.button`
  background: #f5f4f4;
  margin-right: 5px;
  border: 1px solid #f1ebeb;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    border-color: #d0caca;
  }

  &.active {
    background: #e8e6e6;
    border-color: #d0caca;
  }
`;

export { Button };
