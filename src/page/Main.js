import React,{Component} from 'react';

import Appbar from '../component/Appbar';
import BottomNav from '../component/BottomNav';
import Bottom from '../component/Bottom';

export default function Main(props) {
    const styles={
      root: {
        width: '1200px',
        margin: '0 auto',
        fontSize: '10px',
      },
      contents: {
        
          width:'100%',
          height:'80%',
          marin: '0 auto',
      },
      botnav: {
        width:'100%',
        height:'5%'
      },
      footer: {
        width: '100%',
        height: '10%',
      }
    }
  return (
    <React.Fragment style={styles.root}>
      <Appbar />
      <div style={styles.contents}>
            
            {[...new Array(30)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')}
            <Bottom style={styles.footer} />
            </div>
            <BottomNav style={styles.botnav} />
    </React.Fragment>
  );
}

