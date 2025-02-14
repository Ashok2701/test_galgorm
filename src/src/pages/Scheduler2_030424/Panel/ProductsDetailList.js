import React from 'react'
import {Modal, Button} from 'react-bootstrap';
import {withTranslation} from 'react-i18next';


class ProductsDetailList extends React.Component {

constructor(props)
{
  super(props);
}


    getBgcolor(t) {
        let color = 'lightblue';

        let breakCondition = false;
        this.props.vehiclePanel.vehicles.map((vehicle) => {

            if (vehicle.techId === t && !breakCondition) {
               // var myStr = vehicle.color;
               // var subStr = myStr.match("background-color:(.*)");
                color = '#1cbb8c';
                breakCondition = true;
            }
        });

        return color;
    }

    render() {
      console.log("props data  = ", this.props.Datalist)
      console.log("props trips data  = ", this.props.tripDetails)
           return (
              <Modal
                     {...this.props}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Route Detail List
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
                      <table class="table table-striped text-xsmall" id="diagnosis_list">
                                                                                           <thead style = {{textAlign: 'left'}}>
                                                                                               <tr>
                                                                                                   <th width="3%" class="pl-2"> {'Seq'}</th>
                                                                                                   <th width="6%"> {'Route'}</th>
                                                                                                   <th width="6%"> {'Tech'}</th>
                                                                                                   <th width="6%"> {'Transaction No'}</th>
                                                                                                   <th width="auto"> {'ProductLists'}</th>
                                                                                                   <th width="6%"> {'Type'}</th>
                                                                                                   <th width="6%"> {'Client Code'}</th>
                                                                                                   <th width="6%"> {'Client'}</th>
                                                                                                   <th width="6%"> {'City'}</th>

                                                                                               </tr>
                                                                                           </thead>
                                                                                           <tbody>
                                                                                               {this.props.Datalist  && this.props.Datalist.length > 0 &&
                                                                                               ( this.props.Datalist || []).map((data, i) => {
                                                                                                   return (
                                                                                                       <tr key={data.docnum} style={{ backgroundColor: '##1cbb8c', textAlign: 'left' }} >
                                                                                                           <td width="3%" class='priority'><span class='badge badge-primary text-uppercase'>{i+1}</span></td>
                                                                                                           <td width="6%" name="itemCod">{this.props.tripDetails[0].itemCode}</td>
                                                                                                           <td width="6%" name="itemCode">{this.props.tripDetails[0].code}</td>
                                                                                                           <td width="6%" name="docNum">
                                                                                                               {data.docnum}
                                                                                                           </td>

                                                                                                           <td>
                                                                                                             <tr>
                                                                                                                <th>Prod code</th>
                                                                                                                <th>Prod Name</th>
                                                                                                                <th>Qty</th>
                                                                                                              </tr>
                                                                                                            {data.products.map((prd) =>
                                                                                                           <tr>
                                                                                                              <td>{prd.productCode}</td>
                                                                                                              <td>{prd.productName}</td>
                                                                                                              <td>{prd.quantity}</td>
                                                                                                           </tr>
                                                                                                           )}</td>
                                                                                                           <td width="6%">Order</td>
                                                                                                           <td width="6%">{data.bpcode}</td>
                                                                                                           <td width="6%">{data.bpname}</td>
                                                                                                           <td width="6%">{ data.poscode} , {data.city}</td>

                                                                                                       </tr>
                                                                                                   );
                                                                                               })}
                                                                                           </tbody>
                                                                                       </table>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                );
        }

}
export default ProductsDetailList;