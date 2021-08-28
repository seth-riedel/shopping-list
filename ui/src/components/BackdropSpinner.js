import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

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
