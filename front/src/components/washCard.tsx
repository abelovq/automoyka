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
  Paper,
  Radio,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { FC } from "react";
interface IProps {
  open: boolean;
  onOpen: (e: any) => void;
}
const WashCard: FC<IProps> = ({ open, onOpen }) => {
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
        <Card sx={{ boxShadow: "none" }}>
          <CardHeader
            title={
              <div>
                <Typography component="h4">wash name</Typography>
                <Typography variant="caption">wash adress</Typography>
              </div>
            }
            avatar={<Avatar />}
          ></CardHeader>
          <CardContent>
            <List>
              <ListItem>
                <FormControl
                  sx={{ m: 2 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormGroup>
                    <Radio sx={{ display: "none" }} />
                    <FormControlLabel
                      label="11-20"
                      labelPlacement="end"
                      control={<Radio />}
                    />
                  </FormGroup>
                </FormControl>
              </ListItem>
            </List>
          </CardContent>
          <CardActions sx={{ p: 2, display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" sx={{ px: 12 }}>
              get time
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Drawer>
  );
};
export default WashCard;
