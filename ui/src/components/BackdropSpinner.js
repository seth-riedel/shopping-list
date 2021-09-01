import CircularProgress from '@material-ui/core/CircularProgress';
import BackdropMui from '@material-ui/core/Backdrop';
import { withStyles } from '@material-ui/core/styles';

const Backdrop = withStyles({
  root: {
    position: 'absolute',
    zIndex: 1,
  },
})(BackdropMui);

export const BackdropSpinner = ({ visible = false }) => {
  if (!visible) {
    return null;
  }

  return (
    <Backdrop open>
      <CircularProgress />
    </Backdrop>
  );
};

export default BackdropSpinner;
