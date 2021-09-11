import React  from 'react';

import './styles/App.css';
import './styles/account/AccountView.css';
import './styles/date/DateSelector.css';
import './styles/account/AccountList.css';
import './styles/transaction/TransactionList.css';
import './styles/action/Actions.css';

import { Header } from './components/header/Header';
import { Menu } from './components/menu/Menu';
import { AccountView } from './components/account/AccountView';
import { DateSelector } from './components/date/DateSelector';
import { AccountDisplay } from './components/account/AccountDisplay';
import { TransactionList } from './components/transaction/TransactionList';
import { Actions } from './components/action/Actions';

import { GlobalProvider } from './context/GlobalState';

function App() {

  return (
    <GlobalProvider>
      <Header />
      <Menu />
        <div className="base-container">
          <div className="accountView">
            <AccountView />
          </div>
          <div className="dateSelect">
            <DateSelector />
          </div>
        </div>
        <div className="base-container">
          <div className="accountList">
            <AccountDisplay />
          </div>
          <div className="transactionList">
            <TransactionList />
          </div>
          <div className="actions">
            <Actions />
          </div>
        </div>
    
    </GlobalProvider>
  );
}

export default App;
