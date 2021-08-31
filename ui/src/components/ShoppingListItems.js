import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export const ShoppingListItems = ({ data }) => {
  const classes = useStyles();
  if (!data || !data.length) {
    return <box textAlign="middle">Nothing here yet!</box>;
  }

  return (
    <div className={ classes.root }>
      {
        data.map((item) => (
          <Box key={ item.id } mb={ 2 }>
            <Paper className={ classes.paper }>
              <Grid container spacing={ 3 }>
                <Grid item xs>
                  <FormControlLabel
                    control={ (
                      <Checkbox
                        checked={ item.completed }
                        color="primary"
                      />
                    ) }
                  />
                </Grid>
                <Grid item xs={ 10 }>
                  { item.name }
                </Grid>
                <Grid item xs>
                  <Box textAlign="right">
                    <CreateOutlinedIcon />
                    <DeleteOutlineIcon />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        ))
      }
    </div>
  );
};

export default ShoppingListItems;
