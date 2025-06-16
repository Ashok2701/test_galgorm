import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import FloatingLabelInput from 'react-floating-label-input';
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow
} from "@material-ui/core";

const data = [
  {
    id: 1,
    name: "tom1"
  },
  {
    id: 2,
    name: "tom2"
  },
  {
    id: 3,
    name: "tom3"
  },
  {
    id: 4,
    name: "mike"
  }
];

class DisplaySealNumbers extends React.Component {
   // var sealarray : [];
    constructor(props) {
        super(props);
        this.state = {
            notes: "",
            sealnumbers : ['','','','','',''],
        };
//        this.handleChange = this.handleChange.bind(this);
    }



    _handleChangeEvent = (event,arrval)  => {
     //  var arrval = 1
        
        
        let seararr = this.state.sealnumbers;
        seararr[arrval] = event.target.value;

        this.setState({
            sealnumbers : seararr
        })

    }



    OnSubmitSeal = (sealarray) => {
 


   

let resultSealnumbers = [];
let propsdata = this.props.sealnumbers;
let statedata = this.state.sealnumbers;






  for (let i = 0; i < 6; i++) {

      if(statedata[i] == '') {
          resultSealnumbers[i] = propsdata[i];
      }else {
          resultSealnumbers[i] = statedata[i];
      }
  }

  
this.props.onSaveSealnumbers(resultSealnumbers,this.props.dlvyno)
      this.setState({
                sealnumbers : ['','','','','','']
            })
    }




    render() {

    let  sealarray = this.props.sealnumbers;
        
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Seal Numbers for {this.props.dlvyno}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                   <>
<div style={{ fontSize: 22 }}>
                     <FloatingLabelInput
                                                                  id="example5"
                                                                  defaultValue = {sealarray[0]}
                                                                  onChange={(e) => this._handleChangeEvent(e,0)}


                                                                />
</div>
                     <div style={{ fontSize: 22 }}>
                                            <FloatingLabelInput
                                              id="example-3"
                                              defaultValue = {sealarray[1]}
                                                onChange={(e) => this._handleChangeEvent(e,1)}

                                            />
                      </div>
                      <div style={{ fontSize: 22 }}>
                                                                 <FloatingLabelInput
                                                                   id="example-23"
                                                                   defaultValue = {sealarray[2]}
                                                                    onChange={(e) => this._handleChangeEvent(e,2)}



                                                                 />
                                                               </div>
                                                               <div style={{ fontSize: 22 }}>
                                                                                      <FloatingLabelInput
                                                                                        id="example-3"
                                                                                        defaultValue = {sealarray[3]}
onChange={(e) => this._handleChangeEvent(e,3)}

                                                                                      />
                                                                                    </div>
                                        <div style={{ fontSize: 22 }}>
                                                                                                           <FloatingLabelInput
                                                                                                             id="example-3"
                                                                                                  defaultValue = {sealarray[4]}
                                                                                                           onChange={(e) => this._handleChangeEvent(e,4)}
                                                                                                           />
                                        </div>
                                       <div style={{ fontSize: 22 }}>
                                             <FloatingLabelInput
                                                id="example-3"
                                                defaultValue = {sealarray[5]}
                                                onChange={(e) => this._handleChangeEvent(e,5)}

                                                                                                                                />
                                      </div>
                         </>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() =>  this.OnSubmitSeal(sealarray)  /**/}>Save</Button>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default DisplaySealNumbers;