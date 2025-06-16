import React, {useRef} from 'react';
import IdleTimer from 'react-idle-timer';
import { withRouter } from "react-router";
import history from './History';

function IdleTimerContainer (props) {

   const onIdle = () => {
   //  console.log("User is Idle");
     localStorage.clear();
     sessionStorage.clear();
      history.push('/login');
      window.location.reload();
   }

  const idleTimerRef = useRef(null)
  return(
       <div>
          <IdleTimer ref={idleTimerRef} timeout={15*60* 1000} onIdle={onIdle}></IdleTimer>
       </div>
  )
}
export default withRouter(IdleTimerContainer);