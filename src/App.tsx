import { useEffect } from 'react';
import { api } from './api/apiMethods';
import { PageContainer } from './components/UI/pageContainer/PageContainer';
import { Header } from './components/header/Header';
import { Intro } from './components/introBlock/IntroBlock';
import { UsersBlock } from './components/usersBlock/UsersBlock';
import { RegistrationBlock } from './components/registrationBlock/RegistrationBlock';
import { BlockWrapper } from './components/UI/blockWrapper/BlockWrapper';

import { setCookie } from './utils/cookies';
import styles from './App.module.scss';

const App = () => {
  useEffect(() => {
    const loadToken = async () => {
      const { data } = await api.getToken();
      if (data.success) {
        setCookie('token', data.token, { 'Max-Age': 2400 });
      }
    };
    loadToken();
  }, []);

  return (
    <div className={styles.app}>
      <Header />

      <main>
        <Intro />
        <PageContainer>
          <BlockWrapper>
            <UsersBlock />
            <RegistrationBlock />
          </BlockWrapper>
        </PageContainer>
      </main>
    </div>
  );
};

export default App;
