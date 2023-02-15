import React from 'react';
import { ButtonColors, CustomButton } from '../UI/customButton/CustomButton';
import Logo from '../../Assets/Logo.svg';
import styles from './header.module.scss';
import { PageContainer } from '../UI/pageContainer/PageContainer';

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <PageContainer>
        <div className={styles.headerBlock}>
          <img src={Logo} alt="" />
          <div className={styles.buttonsContainer}>
            <CustomButton
              color={ButtonColors.YELLOW}
              onClick={() => (window.location.href = '#usersBlock')}
            >
              Users
            </CustomButton>
            <CustomButton
              color={ButtonColors.YELLOW}
              onClick={() => (window.location.href = '#signUp')}
            >
              Sign up
            </CustomButton>
          </div>
        </div>
      </PageContainer>
    </header>
  );
};
