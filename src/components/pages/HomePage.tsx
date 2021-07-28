import React, { ChangeEvent, useState } from "react";
import GenericTemplate from "../templates/GenericTemplate";
import { Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { createExpenseItem } from '../../api';
const useStyles = makeStyles({
  root: {
    marginTop: 80,
    margin: 20,
    flexGrow: 1
  },
  list: {
    marginTop: 20
  }
});


const HomePage: React.FC = () => {
  const classes = useStyles();
  const [expenseDetail, setExpenseDetail] = useState('');
  const [expenses, setExpenses] = useState([]);

  function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    createExpenseItem(expenseDetail);
    resetInputField();
  }

  function resetInputField() {
    setExpenseDetail('');
  }

  function handleExpenseDetailChange(event:ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    setExpenseDetail(event.target.value);
  }
  

  return (
    <GenericTemplate title="トップページ">
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ margin: 16, padding: 16 }}>
            <Grid container>
              <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
                <TextField
                  type="text"
                  name={expenseDetail}
                  value={expenseDetail}
                  placeholder="Add your expense here"
                  fullWidth
                  onChange={handleExpenseDetailChange}
                />
              </Grid>
              <Grid xs={2} md={1} item>
                <Button
                  fullWidth
                  color="secondary"
                  variant="outlined"
                  onClick={handleSubmit}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5} className={classes.list}>
          <Typography>List of Expenses</Typography>
        </Grid>
      </Grid>
    </GenericTemplate>
  );
};

export default HomePage;