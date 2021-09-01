import { connect } from 'react-redux';
import omit from 'lodash/omit';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
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
    color: theme.palette.text.primary,
  },
  strikethrough: {
    textDecoration: 'line-through',
  },
  verticalAlignMiddle: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
              <Box display="flex" bgcolor="background.paper">
                <Box>
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
                </Box>
                <Box flexGrow={ 1 }>
                  <Box className={ classes.verticalAlignMiddle }>
                    <Box fontWeight="fontWeightBold">{ item.name }</Box>
                    { item.notes && <Box>{ item.notes }</Box> }
                  </Box>
                </Box>
                <Box textAlign="right" mr={ 2 }>
                  <Box className={ classes.verticalAlignMiddle }>
                    qty
                    { ' ' }
                    { item.quantity }
                  </Box>
                </Box>
                <Box textAlign="right" mr={ 1 } ml={ 1 }>
                  <Box className={ classes.verticalAlignMiddle }>
                    <CreateOutlinedIcon
                      onClick={ () => {
                        dispatchSetFormValues(omit(item, 'isCompleting'));
                        dispatchToggleAddItemDrawer();
                      } }
                    />
                  </Box>
                </Box>
                <Box textAlign="right" mr={ 1 } ml={ 1 }>
                  <Box className={ classes.verticalAlignMiddle }>
                    <DeleteOutlineIcon />
                  </Box>
                </Box>
              </Box>
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
