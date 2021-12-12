import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
  Accordion,
  AccordionSummary,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MyCheckbox from './Checkbox';
import { filterSearch } from '../store/actions';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles({
  drawerPaper: {
    marginTop: '64px',
  },
});

interface IProps {
  open: boolean;
  onOpen: (e: any) => void;
  onClose: any;
}

enum CarWashType {
  ALL = 'ALL',
  CONTACT = 'CONTACT',
  MANUAL = 'MANUAL',
  SELF_SERVICE = 'SELF_SERVICE',
  FERRY = 'FERRY',
  ROBOT = 'ROBOT',
  NEAR = 'NEAR',
}

type Filter = {
  id: number;
  label: string;
  value: CarWashType;
};

const filters: Filter[] = [
  {
    id: 1,
    label: 'Все',
    value: CarWashType.ALL,
  },
  {
    id: 2,
    label: 'Контактная мойка',
    value: CarWashType.CONTACT,
  },
  {
    id: 3,
    label: 'Ручная мойка',
    value: CarWashType.MANUAL,
  },
  {
    id: 4,
    label: 'Мойка самообслуживания',
    value: CarWashType.SELF_SERVICE,
  },
  { id: 5, label: 'Мойка паром', value: CarWashType.FERRY },
  { id: 6, label: 'Робот мойка', value: CarWashType.ROBOT },
  { id: 7, label: 'Рядом со мной', value: CarWashType.NEAR },
];

console.log(`filters`, filters[0].value);

const Aside: FC<IProps> = ({ open, onOpen, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = React.useState<{ [props: string]: boolean }>(() => {
    const o = {} as { [prop: string]: boolean };
    for (const item of filters) {
      o[item.value] = false;
    }
    return o;
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'ALL') {
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
      newState[key] = key === 'NEAR' ? false : true;
    }
    setState(newState);
  }, []);

  const handleClick = () => {
    window.navigator.geolocation.getCurrentPosition((data) => {
      const { latitude, longitude } = data.coords;
      const searchFilters = [];
      for (const key in state) {
        if (state[key] && key !== CarWashType.ALL) {
          searchFilters.push(key);
        }
      }
      dispatch(
        filterSearch({
          position: [latitude, longitude],
          filters: [...searchFilters],
        })
      );
    });
    onClose();
  };

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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Фильтры</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormGroup>
                  {filters.map((el: Filter, i) => (
                    <ListItem>
                      <FormControlLabel
                        control={
                          <MyCheckbox
                            checked={
                              el.value === 'ALL'
                                ? Object.values(state)
                                    .slice(1)
                                    .every((item) => item)
                                : state[el.value]
                            }
                            onChange={handleChange}
                            name={el.value}
                          />
                        }
                        label={el.label}
                      />
                    </ListItem>
                  ))}
                </FormGroup>
                <Button variant="outlined" onClick={handleClick}>
                  Найти
                </Button>
              </FormControl>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Мои брони</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Drawer>
  );
};

export default Aside;
