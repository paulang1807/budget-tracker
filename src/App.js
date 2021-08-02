import React from 'react';

import './App.css';

import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { Income } from './components/Income';
import { Expense } from './components/Expense';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';

function App() {
  return (
    <div>
      <Header />
      <div class="container">
        <Balance />
        <div class="inc-exp-container">
          <Income />
          <Expense />
        </div>
        <TransactionList />
        <AddTransaction />
      </div>
    
    </div>
  );
}

export default App;
