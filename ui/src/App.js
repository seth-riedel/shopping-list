import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ShoppingList from './components/ShoppingList';

import './App.css';

const App = () => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          SHOPPING LIST
        </Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth="lg">
      <ShoppingList />
    </Container>
  </>
);

export default App;
