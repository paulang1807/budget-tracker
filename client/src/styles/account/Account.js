import styled from 'styled-components';

export const AccountTotal = styled.div`
  background-image: linear-gradient(180deg, #c9d9f1, #1a4482);
  color: #fff;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  margin: 10px 5px;
  border-radius: 10px;
  border-style: groove;
  font-weight: bold;
  cursor: default;

  & h1 {
    letter-spacing: 1px;
    margin: 0;
  }

  & h4 {
    margin: 0;
    text-transform: uppercase;
  }
`;

export const AccountListItem = styled.ul`
  list-style-type: none;
  padding: 0 5px;
  margin: 0 0 20px 0;

  & li {
    cursor: pointer;
    background-image: linear-gradient(180deg, #c9d9f1, #1a4482);
    box-shadow: var(--box-shadow);
    color: #dedede;
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 10px 25px;
    margin: 5px;
    border-radius: 5px;
    font-weight: bold;
  }

  & :hover {
    background-image: linear-gradient(180deg, #b7d5f5, #5990ca);
    color: #fff;
  }
`