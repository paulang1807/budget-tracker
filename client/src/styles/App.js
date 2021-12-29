import styled from 'styled-components';
import "./App.css";

export const Title = styled.h2`
  padding-top: 5px;
  text-align: center;
  margin: 0;
  padding: 5px 0;
  background-color: var(--title-background);
  color: var(--title-text);
  font-size: 30px;
  font-weight: bold; 
`;

export const AccountViewSelect = styled.div`
  text-align: center;
  padding: 0 4px;
`;

export const ActionsSelect = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: 0 0 20px 0;
`;

export const DateSelect = styled.div`
  flex-grow: 7;
`;

export const TransactionListSelect = styled.div`
  flex-grow: 6;
  text-align: center;
  margin: 5px 2px 0 2px;
`;

export const BaseContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;