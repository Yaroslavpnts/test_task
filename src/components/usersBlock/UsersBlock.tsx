import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IDispatchUsersOption } from '../../models/types';
import {
  getUsersAsync,
  usersNextPageUrlSelector,
  usersSelector,
} from '../../redux/usersSlice/usersSlice';
import { USERS_PER_PAGE } from '../../utils/constants';
import { ButtonColors, CustomButton } from '../UI/customButton/CustomButton';
import { UserCard } from '../userCard/UserCard';
import styles from './usersBlock.module.scss';

export const UsersBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(usersSelector);
  const nextPageUrl = useAppSelector(usersNextPageUrlSelector);

  const refBtn = useRef<HTMLButtonElement>(null);

  const [page, setPage] = useState(1);

  const showMoreUsers = () => {
    setPage(page => page + 1);
  };

  useEffect(() => {
    const query = { page, count: USERS_PER_PAGE, onlyLast: false } as IDispatchUsersOption;

    dispatch(getUsersAsync(query));
  }, [page, dispatch]);

  useEffect(() => {
    if (users.length > USERS_PER_PAGE) {
      refBtn.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }, [users]);

  return (
    <>
      <h1 id="usersBlock">Working with GET request</h1>

      <div className={styles.usersCardsContainer}>
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {nextPageUrl && (
        <CustomButton color={ButtonColors.YELLOW} onClick={showMoreUsers} refEl={refBtn}>
          Show more
        </CustomButton>
      )}
    </>
  );
};
