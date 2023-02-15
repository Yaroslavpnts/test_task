import React, { useRef } from 'react';
import { IUserResponse } from '../../models/types';
import { Tooltip } from '../UI/tooltip/Tooltip';
import styles from './userCard.module.scss';

interface UserCardProps {
  user: IUserResponse;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const ref = useRef(null);

  return (
    <div className={styles.userCardContainer}>
      <div className={styles.userCard}>
        <img src={user.photo} alt="user-avatar" />
        <p className={styles.userName}>{user.name}</p>
        <div>
          <p>{user.position}</p>
          <Tooltip refProp={ref} tooltipText={user.email}>
            <p ref={ref} className={styles.hoverAble}>
              {user.email}
            </p>
          </Tooltip>
          <p>{user.phone}</p>
        </div>
      </div>
    </div>
  );
};
