import { th } from 'date-fns/locale';
import React from 'react';
import {Modal, Button} from 'react-bootstrap';


class DisplayTripLogs extends React.Component {
    constructor(props) {
        super(props);

    }

    taskdetail(logtype){

       if(logtype === "create") {
         return (
                           <span> Trip is created</span>

                       );

       }
      else if(logtype === "modify") {
         return (
                          <span >Trip is modified</span>

                       );
       }
       else if (logtype === "route") {
         return (

                              <span>Trip is optimised</span>

                       );
       }
       else if(logtype === "lock") {
         return (
                           <span>Trip is locked, VR is created at X3</span>

                       );
        }
       else if(logtype === "unlock") {
         return (
                           <span>Trip is unlock , VR is deleted at X3</span>

                       );
       }
       else if(logtype === "Qty")  {
       return (
                                     <span>Quantity changed</span>

                                  );
       }

    }

    render() {
    console.log("T7 inside log window click",this.props.totObjects);
    const logdetails  = this.props.totObjects.logData;

        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Trip Log Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table class="table table-striped m-0">
                    <thead>
                        <tr class="">
                            <th width="24%">Task</th>
                            <th width="10%">UpdatedOn</th>
                            <th width="6%">UpdatedBy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(() => {
                            if (this.props.displayEdit) {
                                return (
                                    (this.props.totObjects.logData || []).map((log, i) => {
                                        return (
                                            <tr key={i}>
                                                <td width="24%">{this.taskdetail(log.type)}</td>
                                                <td width="10%">{ log.dateTime}</td>
                                                <td width="6%">{ log.loginUser}</td>
                                            </tr>
                                        );
                                    })
                                );
                            }else {
                                return (
                                    (this.props.totObjects.logData || []).map((log, i) => {
                                        return (
                                            <tr>
                                                     <td width="24%">{this.taskdetail(log.type)}</td>
                                                                                                    <td width="10%">{ log.dateTime}</td>
                                                                                                    <td width="6%">{ log.loginUser}</td>                                                                                           <td width="6%">{ log.user}</td>
                                            </tr>
                                        );
                                    })
                                );
                            }
                        })()}
                    </tbody>
                </table>
                <hr class="m-0 p-0" />
                    {(() => {
                        if (this.props.totObjects.logData && this.props.totObjects.logData.length <= 0) {
                           return (
                                <div class="col-md-12">
                                    No Log is recorded.
                                </div>
                           );
                        }
                    })()}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default DisplayTripLogs;