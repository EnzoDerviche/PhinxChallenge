import Alert from '@mui/material/Alert';
import styles from './alert.module.css';

interface props {
  winner: string | null;
}

function AlertWinner(props:props) {
  return (
    <Alert className={styles.alert} icon={false}>
      {props.winner} wins!
    </Alert>
  );
}

export default AlertWinner;