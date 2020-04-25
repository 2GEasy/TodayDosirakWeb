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
function deliveryState(delivery) {
    if(delivery===0) {
        return <Button color="primary" value="1">배달 시작</Button>
    }else if(delivery===1) {
        return <Button color="secondary" onClick={onClick} value="2">배달 종료</Button>
    }else if(delivery===2) {
        return <Button disabled>완료</Button>
    }
}
export default function Orders() {
    const classes = useStyles();
    const [delivery,setDelivery] = useState(0);
    onClick =(e)=> {
        setDelivery = e.target.value
    }
  return (
    <React.Fragment>
      <Title>주문 내역</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>날짜</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>배송지</TableCell>
            <TableCell>결제 방법</TableCell>
            <TableCell align="right">결제</TableCell>
            <TableCell>배달</TableCell>
            <TableCell>취소</TableCell>
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
              <TableCell>{deliveryState(delivery)}</TableCell>
              <TableCell><Button color="secondary">주문 취소</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}