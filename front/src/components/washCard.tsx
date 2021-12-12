import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { FC, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { bookCarWash } from '../store/actions';

interface IProps {
  open: boolean;
  onOpen: (e: any) => void;
  wash: any;
  addRoute: any;
  onClose: () => void;
}
const WashCard: FC<IProps> = ({ wash, open, onOpen, onClose, addRoute }) => {
  const freeTimes = useSelector(
    (data: any) => data.carWashesReducer.carWashFreeTime
  );
  const [checkedTime, setCheckedTime] = useState<string | null>(null);

  const formatTime = (time: Date): string => {
    const minutes = time
      .toLocaleDateString("ru-RU", { minute: "2-digit" })
      .split(" ")[1];
    return `${
      time.toLocaleDateString("ru-RU", { hour: "2-digit" }).split(" ")[1]
    }:${minutes == "0" ? "00" : minutes}`;
  };
  if (Object.keys(freeTimes).length) {
  }

  const formatedTimes = useMemo(() => {
    const boxes = Object.keys(freeTimes);

    if (boxes.length) {
      return boxes.reduce((prev: object, cur: string) => {
        return {
          ...prev,
          [cur]: freeTimes[cur as typeof freeTimes].map((time: string) => ({
            initial: time,
            formated: formatTime(new Date(time)),
          })),
        };
      }, {});
    }
  }, [freeTimes]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedTime((event.target as HTMLInputElement).value);
  };

  const Time: FC<{
    box: string;
    times: { formated: string; initial: string }[];
  }> = ({ box, times }) => (
    <CardContent>
      Номер бокса: {box}
      <List>
        {times.map((t) => (
          <ListItem sx={{ p: 0, m: 0, height: 24 }}>
            <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
              <Radio sx={{ display: "none" }} />
              <FormControlLabel
                label={t.formated}
                labelPlacement="end"
                control={<Radio />}
                value={`${box} ${t.initial}`}
              />
            </FormControl>
          </ListItem>
        ))}
      </List>
    </CardContent>
  );

  const LisOfBoxes: FC<{
    box: string;
  }> = ({ box }) => {
    return (
      <RadioGroup value={checkedTime} onChange={handleChange}>
        <Time box={box} times={formatedTimes![box]} />
      </RadioGroup>
    );
  };

  console.log(formatedTimes);
  const handleTakeTime = () => {
    addRoute(wash.coordinates);
    onClose();
  };
  const useStyles = makeStyles({
    root: {
      marginTop: "64px",
    },
  });
  const classes = useStyles();
  return (
    <Drawer
      anchor="right"
      classes={{ paper: classes.root }}
      open={open}
      onClose={onOpen}
    >
      <Box sx={{ width: 300 }} role="presentation">
        <Card sx={{ boxShadow: "none", mb: 10 }}>
          <CardHeader
            title={
              <div>
                <Typography component="h4">{wash.name}</Typography>
                <Typography variant="caption">{wash.adress}</Typography>
              </div>
            }
            avatar={<Avatar />}
          ></CardHeader>
          <CardActions sx={{ p: 2, display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" sx={{ px: 12 }} onClick={handleTakeTime}>
              забронировать
            </Button>
          </CardActions>
          <CardContent>
            {formatedTimes
              ? Object.keys(formatedTimes).map((box) => (
                  <LisOfBoxes box={box} />
                ))
              : "Loading..."}
          </CardContent>
        </Card>
      </Box>
    </Drawer>
  );
};
export default React.memo(WashCard);
