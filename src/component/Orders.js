import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '4월 22일, 2020', '김하나', '상인동 이편한세상 202/104', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '4월 22일, 2020', '박둘', '도원동 미리샘 203/706', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '4월 22일, 2020', '이삼', '상인동 현대맨션 101/101', 'MC ⠀•••• 1253', 100.81),
  createData(3, '4월 22일, 2020', '손사', '도원동 강산타운 402/503', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '4월 21일, 2020', '최오', '진천동 진천타운 505/204', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>최근 주문</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>날짜</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>배송지</TableCell>
            <TableCell>결제 방법</TableCell>
            <TableCell align="right">결제</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          상세보기
        </Link>
      </div>
    </React.Fragment>
  );
}