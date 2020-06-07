import React,{useState} from 'react';
import {Button, Dialog, DialogTitle, DialogContent} from '@material-ui/core';
import DaumPostcode from 'react-daum-postcode';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


const Postcode = (props) => {
  const [open,setOpen] = useState(false);
  const handleComplete = (data) => {
    console.log(data);
    let fullAddress = data.address;
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    props.setAddr(fullAddress);

    
    handleClose();
  }
  const handleClickOpen = () => {
      setOpen(true);
  }
  const handleClose = () => {
      setOpen(false);
  }

  return (
    <>
                <Button variant="contained" color="primary" onClick={handleClickOpen} style={{backgroundColor:'#f57c00',color:'#ffffff',fontSize:'1em'}}><b>{props.title}</b><ArrowDropDownIcon/></Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>주소 검색</DialogTitle>
                    <DialogContent>
                    <DaumPostcode
                      onComplete={handleComplete}
                      { ...props }
                    />
                    </DialogContent>
                    {/* <DialogActions>
                        <Button variant="contained" color="primary" onClick={onSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                    </DialogActions> */}
                </Dialog>
    </>
  );
}
export default Postcode;