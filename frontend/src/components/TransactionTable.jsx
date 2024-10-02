import {
  Box,
  Chip,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import React from 'react';
import { format } from 'date-fns';
function Row(props) {
  const { row } = props;

  const [open, setOpen] = React.useState(false);
  const formateDate = function (date) {
    return format(new Date(date), 'dd/MM/yy');
  };
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {row.setlledAt ? (
            formateDate(row.setlledAt)
          ) : (
            <Chip
              variant="outlined"
              color="success"
              size="small"
              label="make payment"
              onClick={() => console.log('Settling transaction')}
            />
          )}
        </TableCell>
        <TableCell align="left">{row.payer.username}</TableCell>
        <TableCell align="left">{row.amount}</TableCell>
        <TableCell
          align="left"
          sx={{
            color:
              row.status.toLowerCase() === 'pending'
                ? 'warning.main'
                : 'success.main',
            textTransform: 'capitalize',
          }}
        >
          {row.status}
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Chip
                label="view less"
                size="small"
                variant="contained"
                color="primary"
              />
            ) : (
              <Chip
                label="view more"
                size="small"
                variant="outlined"
                color="primary"
              />
            )}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography
              variant="body1"
              color="initial"
              textAlign={'center'}
              sx={{ marginY: '10px' }}
            >
              Transaction Details
            </Typography>
            <TableContainer
              component={Box}
              sx={{
                maxWidth: 400,
                mx: 'auto',
                marginY: '10px',
                border: '1px solid',
                borderRadius: '10px',
                paddingY: '10px',
              }}
            >
              <Table size="small" stickyHeader={true}>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color="textSecondary">
                        TransactionId:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" color="textPrimary">
                        {row.transactionId}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color="textSecondary">
                        Amount
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" color="textPrimary">
                        {row.amount}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color="textSecondary">
                        Payer:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" color="textPrimary">
                        {row.payer.username}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color="textSecondary">
                        Recever
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" color="textPrimary">
                        {row.receiver.username}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color="textSecondary">
                        Status:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" color="textPrimary">
                        {row.status}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color="textSecondary">
                        Setteled At:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" color="textPrimary">
                        {row.setlledAt === null ? 'N/A' : row.setlledAt}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const TransactionTable = ({ transactions }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.common.white,
    fontWeight: 'normal',
    fontSize: '16px',
    whiteSpace: 'nowrap',
  }));
  return (
    <div>
      <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
        <Table aria-label="collapsible table" stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">
                Paid to / Recived from
              </StyledTableCell>
              <StyledTableCell align="left">Amount</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Details</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <Row key={transaction.transactionId} row={transaction} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TransactionTable;
