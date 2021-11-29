import React  from 'react';

// Styles
import { BaseContainer, AccountViewSelect, ActionsSelect, DateSelect, TransactionListSelect } from './styles/App';
import './styles/App.css';

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
        <BaseContainer>
          <AccountViewSelect>
            <AccountView />
          </AccountViewSelect>
          <DateSelect>
            <DateSelector />
          </DateSelect>
        </BaseContainer>
        <BaseContainer>
          <div>
            <AccountDisplay />
          </div>
          <TransactionListSelect>
            <TransactionList />
          </TransactionListSelect>
          <ActionsSelect>
            <Actions />
          </ActionsSelect>
        </BaseContainer>
    
    </GlobalProvider>
  );
}

export default App;
