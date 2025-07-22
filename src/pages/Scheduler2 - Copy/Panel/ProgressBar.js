import ProgressBar from 'react-bootstrap/ProgressBar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function ProgressBar3(props) {
 //  let VehMax = props.vehmax
  // let DocMax = props.docmax

  const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" className="my-tooltip" >
          <h6>Document {props.from} : {props.doc}</h6>
          <h6>Total {props.from} : {props.tot} </h6>
          <h6>{props.from} : {props.per} % </h6>


      </Tooltip>
    );

  const now = 75.8;
  return(
  <div>
   <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip(props)}
      >
  <ProgressBar style={{height : "4rem", border : "1px solid"}} animated now={props.per} label={`${props.per}%`} />
    </OverlayTrigger>

   </div>
  );
}

export default ProgressBar3;