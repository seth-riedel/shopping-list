import { connect } from 'react-redux';
import omit from 'lodash/omit';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { completeItem, toggleAddItemDrawer } from '../state/listSlice';
import { setFormValues } from '../state/addItemSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  strikethrough: {
    textDecoration: 'line-through',
  },
}));

export const ShoppingListItems = (props) => {
  const {
    data,
    dispatchCompleteItem,
    dispatchSetFormValues,
    dispatchToggleAddItemDrawer,
  } = props;
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
                  <FormControlLabel
                    control={ (
                      <Checkbox
                        checked={ item.completed }
                        color="primary"
                        disabled={ item.isCompleting }
                        onClick={ () => {
                          dispatchCompleteItem({ id: item.id, complete: !item.completed });
                        } }
                      />
                    ) }
                  />
                </Grid>
                <Grid item xs={ 10 } className={ (item.completed) ? classes.strikethrough : '' }>
                  <Box>{ item.name }</Box>
                  { item.notes && <Box>{ item.notes }</Box> }
                </Grid>
                <Grid item xs>
                  <Box textAlign="right">
                    <CreateOutlinedIcon
                      onClick={ () => {
                        dispatchSetFormValues(omit(item, 'isCompleting'));
                        dispatchToggleAddItemDrawer();
                      } }
                    />
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
  dispatchSetFormValues: (payload) => dispatch(setFormValues(payload)),
  dispatchToggleAddItemDrawer: () => dispatch(toggleAddItemDrawer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListItems);
