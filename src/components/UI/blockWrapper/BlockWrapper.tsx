import React from 'react';
import styled from './blockWrapper.module.scss';

interface BlockWrapper {
  children: React.ReactNode;
}

export const BlockWrapper: React.FC<BlockWrapper> = ({ children }) => {
  return <div className={styled.blockWrapper}>{children}</div>;
};
