import React from 'react';

import './App.css';

import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { Income } from './components/Income';
import { Expense } from './components/Expense';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';

import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <div className="inc-exp-container">
          <Income />
          <Expense />
        </div>
        <TransactionList />
        <AddTransaction />
      </div>
    
    </GlobalProvider>
  );
}

export default App;
