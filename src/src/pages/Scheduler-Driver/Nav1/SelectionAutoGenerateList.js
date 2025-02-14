import React from 'react'
import {Modal, Button} from 'react-bootstrap';
import {withTranslation} from 'react-i18next';
import CheckBoxList1 from './CheckBoxList';


class SelectionAutoGenerateList extends React.Component {

constructor(props)
{
  super(props);
}




    render() {
       console.log("Tttt inside modal - vehicle list", this.props.Vehiclelist.vehicles)
           return (
              <Modal
                     {...this.props}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Selection Vehicles for Auto Optimisation
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>

                       <CheckBoxList1
                       options={this.props.Vehiclelist.vehicles} />

                     </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                );
        }

}
export default SelectionAutoGenerateList;