import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import BackdropSpinner from './BackdropSpinner';

export const ShoppingList = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box my={ 4 }>
      <BackdropSpinner visible={ false } />
      <Grid container spacing={ 3 }>
        <Grid item xs={ 8 }>
          <Typography variant="h6">
            Your Items
          </Typography>
        </Grid>
        <Grid item xs={ 4 }>
          <Box textAlign="right">
            <Button variant="contained" color="primary" onClick={ () => setDrawerOpen(true) }>
              + Add Item
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Drawer
        anchor="right"
        open={ drawerOpen }
        onClose={ () => setDrawerOpen(false) }
      >
        <Box m={ 4 }>
          <Box mb={ 2 }>
            <FormControl>
              <InputLabel htmlFor="my-input">Item Name</InputLabel>
              <Input
                variant="outlined"
                id="add-item-name"
                aria-describedby="Item Name"
                autoFocus
              />
            </FormControl>
          </Box>
          <Box mb={ 2 }>
            <FormControl>
              <InputLabel htmlFor="my-input">Notes</InputLabel>
              <Input
                variant="outlined"
                id="add-item-notes"
                aria-describedby="Item Notes or Description"
                multiline
              />
            </FormControl>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ShoppingList;
