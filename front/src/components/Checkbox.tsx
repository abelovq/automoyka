import React, { FC } from 'react';
import Checkbox from '@mui/material/Checkbox';

interface IProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const MyCheckbox: FC<IProps> = ({ onChange, name, checked }) => {
  return (
    <Checkbox color="primary" checked={checked} defaultChecked name={name} />
  );
};

export default MyCheckbox;
