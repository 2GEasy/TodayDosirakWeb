import React,{Component, Fragment} from 'react';
import Category from '../component/Category';
import BottomNav from '../component/BottomNav';
import Bottom from '../component/Bottom';
import Appbar from '../component/Appbar';


class Main extends Component {
    render() {
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
        return(
          <>
          <div style={styles.root}>
          <Appbar>
            <Category />
          </Appbar>
          <BottomNav />
          </div>
          </>
        );
    }
}
export default Main;