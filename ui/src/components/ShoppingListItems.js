import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { completeItem } from '../state/listSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export const ShoppingListItems = ({ data, dispatchCompleteItem }) => {
  const classes = useStyles();
  if (!data || !data.length) {
    return <Box textAlign="middle">Nothing here yet!</Box>;
  }

  return (
    <div className={ classes.root }>
      {
        data.map((item) => (
          <Box key={ item.id } mb={ 2 }>
            <Paper className={ classes.paper }>
              <Grid container spacing={ 3 }>
                <Grid item xs>
                  { item.isCompleting && <CircularProgress size={ 24 } /> }
                  {
                    !item.isCompleting && (
                      <FormControlLabel
                        control={ (
                          <Checkbox
                            checked={ item.completed }
                            color="primary"
                            onClick={ () => {
                              dispatchCompleteItem({ id: item.id, complete: !item.completed });
                            } }
                          />
                        ) }
                      />
                    )
                  }
                </Grid>
                <Grid item xs={ 10 }>
                  <Box>{ item.name }</Box>
                  { item.notes && <Box>{ item.notes }</Box> }
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

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => ({
  dispatchCompleteItem: (payload) => dispatch(completeItem(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListItems);
