import { useEffect } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import BackdropSpinner from './BackdropSpinner';
import AddItemDrawer from './AddItemDrawer';
import {
  fetchListData,
  clearError,
  toggleAddItemDrawer,
} from '../state/listSlice';

export const ShoppingList = (props) => {
  const {
    isFetching,
    // data: listData,
    dispatchClearError,
    error,
    dispatchFetchListData,
    dispatchToggleAddItemDrawer,
  } = props;

  useEffect(() => {
    dispatchFetchListData();
  }, []);

  return (
    <Box my={ 4 }>
      <BackdropSpinner visible={ isFetching } />
      <Grid container spacing={ 3 }>
        <Grid item xs={ 8 }>
          <Typography variant="h6">
            Your Items
          </Typography>
        </Grid>
        <Grid item xs={ 4 }>
          <Box textAlign="right">
            <Button variant="contained" color="primary" onClick={ dispatchToggleAddItemDrawer }>
              + Add Item
            </Button>
          </Box>
        </Grid>
      </Grid>
      <AddItemDrawer />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={ !!error }
        autoHideDuration={ 2000 }
        onClose={ dispatchClearError }
      >
        <Alert elevation={ 6 } variant="filled" severity="error">{ error }</Alert>
      </Snackbar>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  data: state.list.data,
  isFetching: state.list.isFetching,
  error: state.list.error,
  addItemOpen: state.list.addItemOpen,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchListData: () => dispatch(fetchListData()),
  dispatchClearError: () => dispatch(clearError()),
  dispatchToggleAddItemDrawer: () => dispatch(toggleAddItemDrawer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
