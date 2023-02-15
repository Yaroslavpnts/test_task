import React from 'react';
import { ButtonColors, CustomButton } from '../UI/customButton/CustomButton';
import { PageContainer } from '../UI/pageContainer/PageContainer';
import styles from './intro.module.scss';

export const Intro: React.FC = () => {
  return (
    <div className={styles.introBlock}>
      <PageContainer>
        <div className={styles.about}>
          <h1>Test assignment for front-end developer</h1>
          <p>
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS,
            JS with a vast understanding of User design thinking as they'll be building web
            interfaces with accessibility in mind. They should also be excited to learn, as the
            world of Front-End Development keeps evolving.
          </p>
          <CustomButton
            color={ButtonColors.YELLOW}
            onClick={() => (window.location.href = '#signUp')}
          >
            Sign up
          </CustomButton>
        </div>
      </PageContainer>
    </div>
  );
};
