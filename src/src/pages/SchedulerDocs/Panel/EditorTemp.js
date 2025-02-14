import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';

class EditorTemp extends React.PureComponent {
  constructor(props) {
    super(props);
  }

       GetDeliveryStatus = (x) => {


                  switch (x) {
                      case '1':
                          return ("Scheduled");
                      case '2':
                          return ("On the Way");
                      case '3':
                          return ("In-progress");
                      case '4':
                          return ("Completed");
                      case '5':
                          return ("Skipped");
                      case '6':
                          return ("Re-Scheduled");
                      case '7':
                          return ("Cancelled");
                      case '8':
                          return ("To-Plan");
                      default:
                          return ("To-Plan");
                  }


              }


  render() {
     var tripData = this.props.SelectedDocData;
     console.log("data inside edtiort = ",this.props.SelectedTripData);
    return (
      <div className="EditTemp-main">

        <table
          className="custom-event-editor"
          style={{ width: '100%', cellpadding: '5' }}
        >
          <tbody>
          <tr>
                        <td className="e-textlabel">Document Number</td>
                        <td style={{ colspan: '4' }}>
                          <input
                            id="routeid"
                            className="e-field e-input"
                            type="text"
                            value = {tripData.docnum}
                            name="Subject"
                            style={{ width: '100%' }}

                          />
                        </td>
                      </tr>
            <tr>
              <td className="e-textlabel">Route Number</td>
              <td style={{ colspan: '4' }}>
                <input
                  id="routeid"
                  className="e-field e-input"
                  type="text"
                  value = {tripData.vrcode}
                  name="Subject"
                  style={{ width: '100%' }}

                />
              </td>
            </tr>
            <tr>
                          <td className="e-textlabel">Client</td>
                          <td style={{ colspan: '4' }}>
                            <input
                              id="routeid"
                              className="e-field e-input"
                              type="text"
                              value = {tripData.bpcode}
                              name="Subject"
                              style={{ width: '100%' }}

                            />
                          </td>
                        </tr>
            <tr>
                          <td className="e-textlabel">Client Name</td>
                          <td style={{ colspan: '4' }}>
                            <input
                              id="routeid"
                              className="e-field e-input"
                              type="text"
                              value = {tripData.bpname}
                              name="Subject"
                              style={{ width: '100%' }}

                            />
                          </td>
                        </tr>
            <tr>
                                      <td className="e-textlabel">Client Address</td>
                                      <td style={{ colspan: '4' }}>
                                        <input
                                          id="routeid"
                                          className="e-field e-input"
                                          type="text"
                                          value = {tripData.city}
                                          name="Subject"
                                          style={{ width: '100%' }}

                                        />
                                      </td>
                                    </tr>
            <tr>
                          <td className="e-textlabel">Vehicle</td>
                          <td style={{ colspan: '4' }}>
                            <input
                              id="vehicle"
                              className="e-field e-input"
                              type="text"
                               value = {tripData.vehiclecode}
                              name="Subject"
                              style={{ width: '100%' }}
                            />
                          </td>
                        </tr>
            <tr>
                          <td className="e-textlabel">Driver</td>
                          <td style={{ colspan: '4' }}>
                            <input
                              id="driver"
                              className="e-field e-input"
                              type="text"
                               value = {tripData.drivercode}
                              name="Subject"
                              style={{ width: '100%' }}
                            />
                          </td>
                        </tr>
              <tr>
                                       <td className="e-textlabel">Status</td>
                                       <td style={{ colspan: '4' }}>
                                         <input
                                           id="sts"
                                           className="e-field e-input"
                                           type="text"
                                             value = {this.GetDeliveryStatus(tripData.dlvystatus)}
                                           name="Subject"
                                           style={{ width: '100%' }}
                                         />
                                       </td>
                                     </tr>
            <tr>
              <td className="e-textlabel">StartTime</td>
              <td style={{ colspan: '4' }}>
                <DateTimePickerComponent
                  id="StartTime"
                  format="hh:mm a"
                    value = {tripData.arvtime}
                  data-name="StartTime"
                  className="e-field"
                />
              </td>
            </tr>
            <tr>
              <td className="e-textlabel">EndTime</td>
              <td style={{ colspan: '4' }}>
                <DateTimePickerComponent
                  id="EndTime"
                    value = {tripData.deptime}
                  format="hh:mm a"
                  data-name="EndTime"
                  className="e-field"
                  created={this.props.onCreated}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{}}>
        <Button className="btn-save" onClick={this.props.onSave}>Save</Button>
        <Button className="btn-close" onClick={this.props.onClose}>Close</Button>
        </div>
       </div>
    );
  }
}
export default EditorTemp;