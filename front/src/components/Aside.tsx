import React, { FC, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import {
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  ListItem,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MyCheckbox from './Checkbox';

const useStyles = makeStyles({
  drawerPaper: {
    marginTop: '64px',
  },
});

interface IProps {
  open: boolean;
  onOpen: (e: any) => void;
}

enum CarWashType {
  ALL,
  CONTACT,
  MANUAL,
  SELF_SERVICE,
  FERRY,
  ROBOT,
}

type Filter = {
  id: number;
  label: string;
  value: CarWashType;
  name: string;
};

const filters: Filter[] = [
  {
    id: 1,
    label: 'Все',
    value: CarWashType.ALL,
    name: 'all',
  },
  {
    id: 2,
    label: 'Контактная мойка',
    value: CarWashType.CONTACT,
    name: 'contact',
  },
  {
    id: 3,
    label: 'Ручная мойка',
    value: CarWashType.MANUAL,
    name: 'manual',
  },
  {
    id: 4,
    label: 'Мойка самообслуживания',
    value: CarWashType.SELF_SERVICE,
    name: 'self',
  },
  { id: 5, label: 'Мойка паром', value: CarWashType.FERRY, name: 'ferry' },
  { id: 6, label: 'Робот мойка', value: CarWashType.ROBOT, name: 'robot' },
];

const Aside: FC<IProps> = ({ open, onOpen }) => {
  const classes = useStyles();
  const [state, setState] = React.useState<{ [props: string]: boolean }>({
    all: true,
    contact: true,
    manual: false,
    self: false,
    ferry: false,
    robot: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'all') {
      const keys = Object.keys(state);
      const newState: typeof state = {};
      for (const key of keys) {
        newState[key] = event.target.checked;
      }
      setState(newState);
    } else {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
      });
    }
  };

  useEffect(() => {
    const keys = Object.keys(state);
    const newState: typeof state = {};
    for (const key of keys) {
      newState[key] = true;
    }
    setState(newState);
  }, []);

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Box sx={{ width: 300, marginTop: '64px' }} role="presentation">
        <List>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Filters</FormLabel>
            <FormGroup>
              {filters.map((el: Filter, i) => (
                <ListItem>
                  <FormControlLabel
                    control={
                      <MyCheckbox
                        checked={
                          el.name === 'all'
                            ? Object.values(state)
                                .slice(1)
                                .every((item) => item)
                            : state[el.name]
                        }
                        onChange={handleChange}
                        name={el.name}
                      />
                    }
                    label={el.label}
                  />
                </ListItem>
              ))}
            </FormGroup>
            <Button variant="outlined">Найти</Button>
          </FormControl>
        </List>
      </Box>
    </Drawer>
  );
};

export default Aside;
