import React  from 'react';

// Styles
import { RowBaseContainer, ColBaseContainer, DateSelect, TransactionListSelect } from './styles/App';
import './styles/App.css';

import { Header } from './components/header/Header';
import { Menu } from './components/menu/Menu';
import { DateSelector } from './components/date/DateSelector';
import { SidebarDisplay } from './components/common/SidebarDisplay';
import { TransactionList } from './components/transaction/TransactionList';

import { GlobalProvider } from './context/GlobalState';

function App() {

  return (
    <GlobalProvider>
      <Header />
      <Menu />
      <RowBaseContainer>
        <SidebarDisplay />
        <>
          <ColBaseContainer>
            <DateSelect>
              <DateSelector />
            </DateSelect>
            <TransactionListSelect>
              <TransactionList />
            </TransactionListSelect>
          </ColBaseContainer>
        </>
      </RowBaseContainer>
    </GlobalProvider>
  );
}

export default App;
