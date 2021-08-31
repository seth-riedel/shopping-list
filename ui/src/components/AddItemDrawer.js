import { useState } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toggleAddItemDrawer } from '../state/listSlice';
import { setError, saveItem } from '../state/addItemSlice';

// @TODO: this should be standardized and also checked on the backend
const formIsValid = (values) => {
  const quantity = parseInt(values.quantity, 10);
  if (quantity < 1 || quantity > 99) {
    return false;
  }

  return true;
};

export const AddItemDrawer = (props) => {
  const {
    error,
    isSaving,
    addItemOpen,
    dispatchToggleAddItemDrawer,
    dispatchSetError,
    dispatchSaveItem,
  } = props;

  const [formValues, setFormValues] = useState({});

  // @TODO: should use a form library to handle this
  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formIsValid(formValues)) {
      return dispatchSetError('Quantity must be between 1 and 99');
    }

    dispatchSaveItem(formValues);
    return true;
  };

  return (
    <Drawer
      anchor="right"
      open={ addItemOpen }
      onClose={ () => dispatchToggleAddItemDrawer() }
    >
      <form onSubmit={ handleSubmit }>
        <Box m={ 4 }>
          <Typography variant="h6">
            Add an Item
          </Typography>
        </Box>
        <Box m={ 2 }>
          <TextField
            id="add-item-name"
            name="name"
            label="Item Name"
            variant="outlined"
            autoFocus
            required
            fullWidth
            onChange={ handleInputChange }
          />
        </Box>
        <Box m={ 2 }>
          <TextField
            id="add-item-notes"
            name="notes"
            label="Notes"
            variant="outlined"
            rows={ 4 }
            multiline
            fullWidth
            onChange={ handleInputChange }
          />
        </Box>
        <Box m={ 2 }>
          <TextField
            id="add-item-quantity"
            name="quantity"
            label="Quantity"
            variant="outlined"
            required
            fullWidth
            type="number"
            defaultValue="1"
            onChange={ handleInputChange }
          />
        </Box>
        <Box m={ 2 } textAlign="right">
          {
            isSaving && <CircularProgress />
          }
          {
            !isSaving && (
              <>
                <Button onClick={ dispatchToggleAddItemDrawer }>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </>
            )
          }
        </Box>
        { error && <Box m={ 2 }><Alert elevation={ 6 } variant="filled" severity="error">{ error }</Alert></Box> }
      </form>
    </Drawer>
  );
};

// @TODO: should be using selectors here
const mapStateToProps = (state) => ({
  addItemOpen: state.list.addItemOpen,
  error: state.addItem.error,
  isSaving: state.addItem.isSaving,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchToggleAddItemDrawer: () => dispatch(toggleAddItemDrawer()),
  dispatchSetError: (payload) => dispatch(setError(payload)),
  dispatchSaveItem: (payload) => dispatch(saveItem(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddItemDrawer);
