import React from "react";
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';

const defaultProps = {
  bgcolor: 'background.paper',
  position: 'relative',
  borderColor: 'text.primary',
  border: 1,
  style: { width: '15rem', height: '15rem', overflow: 'auto' },
};

const box1 = {
  bgcolor: '#222021',
  color: 'white'
}

const box2 = {
  bgcolor: '#808080',
  color: 'white'
}

const numberProps = {
  bgcolor: '#808080',
  color: 'white',
  borderColor: '#808080',
  m: 0,
  border: 2,
  padding: '2px',
  style: { width: 'auto', height: 'auto' },
  borderRadius: '50px'
}

const homeProps = {
  bgcolor: 'background.paper',
  position: 'relative',
  borderColor: 'text.primary',
  border: 1,
  style: { width: '10rem' },
};

class DisplayMapInfo extends React.Component {

  render() {
    var date;
    if (this.props.data && this.props.data.docdate) {
      date = new Date(this.props.data.docdate);
      date = date.getDate() + '-' + (Number(date.getMonth()) + 1) + '-' + date.getFullYear()
    }
    let data = [];
    data.push(this.props.data);

    return (
      <div>
        {this.props.type === "Home" ?
          <Box borderRadius="borderRadius" {...homeProps} textAlign="left" zIndex="tooltip" display="flex">
            <Box component="span" display="block" style={{ width: "100%", margin: '8px 0px 8px 8px' }} p={1} {...box1}>
              <div>
                <b>{this.props.site}</b>
                &nbsp;&nbsp; &nbsp;
                <span> <Box borderColor="text.primary"
                  {...numberProps} >  1
                </Box> </span>
              </div>
            </Box>
            <CancelTwoToneIcon style={{ color: "#7ace4c", float: 'right', fontSize: 20 }}
              onClick={() => this.props.OncloseClick("Home")} />
          </Box>
          : (this.props.type === "arrival") ?
            <Box borderRadius="borderRadius" {...homeProps} textAlign="left" zIndex="tooltip" display="flex">
              <Box component="span" display="block" style={{ width: "100%", margin: '8px 0px 8px 8px' }} p={1} {...box1}>
                <div>
                  <b>{this.props.site}</b>
                  &nbsp;&nbsp; &nbsp;
                  <span> <Box borderColor="text.primary"
                    {...numberProps} >  {this.props.num + 1}
                  </Box> </span>
                </div>
              </Box>
              <CancelTwoToneIcon style={{ color: "#7ace4c", float: 'right', fontSize: 20 }}
                onClick={() => this.props.OncloseClick("arrival")} />
            </Box>
            :
            <Box borderRadius="borderRadius" {...defaultProps} textAlign="left" zIndex="tooltip">
              {data && data.length > 0 &&
                data.map((info, i) => {
                  return (
                    <div>
                      <div style={{ display: "flex" }}>
                        <Box component="span" display="block" style={{ width: "100%", margin: '8px 0px 8px 8px' }} p={1} {...box1}>
                            <div>
                              {info.docnum} -  {info.bpname}
                              &nbsp;&nbsp; &nbsp;
                              <span> <Box borderColor="#FFFF00"
                                {...numberProps} >  {info.id ? info.id : this.props.num + 1}
                              </Box> </span>
                            </div>
                        </Box>
                        {i === 0 && <CancelTwoToneIcon style={{ color: "#7ace4c", float: 'right', fontSize: 20 }}
                          onClick={() => this.props.OncloseClick(this.props.type, this.props.num)} />}
                      </div>
                      <Box component="span" display="block" m={1} p={1} {...box2}>
                        <div> <p style={{ color: 'white' }}>DETAILS</p>
                          <div>RouteName: <span style={{ color: '#FFFF00' }}>{info.docnum}</span></div>
                          <div> Stop: <span style={{ color: '#FFFF00' }}>{info.id ? info.id : this.props.num + 1}</span></div>
                          <div>ETA: <span style={{ color: '#FFFF00' }}>{date + ' ' + info.arrival}</span></div>
                          <div> ETD: <span style={{ color: '#FFFF00' }}>{date + ' ' + info.end}</span></div>
                          <div>City: <span style={{ color: '#FFFF00' }}>{info.city}</span></div>
                          <div>Type: <span style={{ color: '#FFFF00' }}>{info.doctype}</span></div>
                          <div>Order Reference: <span style={{ color: '#FFFF00' }}></span></div>
                          <div>Weight: <span style={{ color: '#FFFF00' }}>{info.netweight + ' KG'}</span></div>
                          <div>Volume: <span style={{ color: '#FFFF00' }}>{info.volume}</span></div>
                        </div>
                      </Box>
                    </div>
                  )
                })}
            </Box>
        }
      </div>
    )
  }
}

export default DisplayMapInfo;