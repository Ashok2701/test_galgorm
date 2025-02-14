import React from 'react'
import {Modal, Button} from 'react-bootstrap';
import {withNamespaces} from 'react-i18next';
import mockData from './ComboDetailMockData.json';

class ProductsComboList extends React.Component {

constructor(props)
{
  super(props);
}



getData = (type, prodList) => {
  console.log("inside getData,type",type);
if(type === 'COMBO1' || type === 'COMBO2' || type === 'NONCOMBO') {

return(
<>
<tr><td>TOTECOMBO1</td></tr>
<tr>
                                                                                                                                      <th>Prod code</th>
                                                                                                                                      <th>Prod Name</th>
                                                                                                                                      <th>Qty</th>
                                                                                                                                      <th>COMP1</th>
                                                                                                                                      <th>COMP2</th>
                                                                                                                                      <th>COMP3</th>
                                                                                                                                      <th>COMP4</th>
                                                                                                                                      <th>COMP5</th>
                                                                                                                                      <th>COMP6</th>

                                                                                                                                    </tr>
                                                                                                                                  {prodList.map((cmb1 ,index ) =>

                                                                                                                                 <tr style ={ index %2 ?  {background:'#fdffe0'}: {background:'white'}}>
                                                                                                                                    <td>{cmb1.productCode}</td>
                                                                                                                                    <td>{cmb1.productName}</td>
                                                                                                                                    <td>{cmb1.quantity} {cmb1.uom}</td>
                                                                                                                                    <td>{cmb1.combo1}</td>
                                                                                                                                    <td>{cmb1.combo2}</td>
                                                                                                                                    <td>{cmb1.combo3}</td>
                                                                                                                                    <td>{cmb1.combo4}</td>
                                                                                                                                    <td>{cmb1.combo5}</td>
                                                                                                                                    <td>{cmb1.combo6}</td>

                                                                                                                                  </tr>
 )};
 </>
)
}else if (type === 'TOTECOMBO1' || type === 'TOTECOMBO2' || type === 'TOTENONCOMBO')
{
   console.log("inside Tote club");
return(
  <>
   <h6>{type}</h6>
  <table class="table table-striped m-0">
      <thead>
         <tr>
                <th>Prod code</th>
                <th>Prod Name</th>
                <th>Qty</th>
                <th>tote1</th>
                <th>tote2</th>
                                                                                                                                                                               <th>tote3</th>
                                                                                                                                                                               <th>tote4</th>
                                                                                                                                                                               <th>tote5</th>
                                                                                                                                                                               <th>tote6</th>

         </tr>
      </thead>
      <tbody>
             {(prodList).map((cmb1 ,index ) =>

                                                                                                                                 <tr style ={ index %2 ?  {background:'#fdffe0'}: {background:'white'}}>
                                                                                                                                    <td>{cmb1.productCode}</td>
                                                                                                                                    <td>{cmb1.productName}</td>
                                                                                                                                    <td>{cmb1.quantity} {cmb1.uom}</td>
                                                                                                                                    <td>{cmb1.combo1}</td>
                                                                                                                                    <td>{cmb1.combo2}</td>
                                                                                                                                    <td>{cmb1.combo3}</td>
                                                                                                                                    <td>{cmb1.combo4}</td>
                                                                                                                                    <td>{cmb1.combo5}</td>
                                                                                                                                    <td>{cmb1.combo6}</td>


                                                                                                                               </tr>
 )};
  </tbody>
                 </table>
 </>
)
}
else {
}
}



    render() {
        let combo1flg = false;
                        let combo2flg = false;
                        let tote1flg = false;
                        let tote2flg = false;
                        let totnon = false;
                        let noncombo = false;
            console.log("props data",this.props.vedetail);
            console.log("props combodata", this.props.comboData);
           return (
              <Modal

                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Compartment Detail for (STCA12201SDH00000115) <br />
                        Client : USC00062 , SCHURMAN SOIL SERVICE <br />
                        City : WEBSTER CITY

                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow': 'auto'}}>
                      <table class="table table-striped m-0">
                                         <thead>

                                                                                           </thead>
                                                                                           <tbody>
                    {(this.props.comboData && this.props.comboData).map((doc, i) => {

                       if(doc.combotype === 'COMBO1')  {
                          return(
                                                                        <>
                                                                        <h6>{doc.combotype}</h6>
                                                                          <table class="table table-striped m-0">
                                                                              <thead>
                                                                                 <tr>
                                                                                        <th>Prod code</th>
                                                                                        <th>Prod Name</th>
                                                                                        <th>Qty</th>
                                                                                        <th>COMP1</th>
                                                                                        <th>COMP2</th>
                                                                                                                                                                                                                                                       <th>COMP3</th>
                                                                                                                                                                                                                                                       <th>COMP4</th>
                                                                                                                                                                                                                                                       <th>COMP5</th>
                                                                                                                                                                                                                                                       <th>COMP6</th>

                                                                                 </tr>
                                                                              </thead>
                                                                              <tbody>
                                                                                     {(doc.prodList).map((cmb1 ,index ) =>

                                                                                                                                                                                                         <tr style ={ index %2 ?  {background:'#fdffe0'}: {background:'white'}}>
                                                                                                                                                                                                            <td>{cmb1.productCode}</td>
                                                                                                                                                                                                            <td>{cmb1.productName}</td>
                                                                                                                                                                                                            <td>{cmb1.quantity} {cmb1.uom}</td>
                                                                                                                                                                                                            <td>{cmb1.combo1}</td>
                                                                                                                                                                                                            <td>{cmb1.combo2}</td>
                                                                                                                                                                                                            <td>{cmb1.combo3}</td>
                                                                                                                                                                                                            <td>{cmb1.combo4}</td>
                                                                                                                                                                                                            <td>{cmb1.combo5}</td>
                                                                                                                                                                                                            <td>{cmb1.combo6}</td>


                                                                                                                                                                                                       </tr>
                                                                         )};
                                                                          </tbody>
                                                                                         </table>
                                                                                         </>
                                                                                         )




                          }
                       else if(doc.combotype === 'COMBO2')
                       {
                            return(
                                              <>
                                              <h6>{doc.combotype}</h6>
                                                <table class="table table-striped m-0">
                                                    <thead>
                                                       <tr>
                                                              <th>Prod code</th>
                                                              <th>Prod Name</th>
                                                              <th>Qty</th>
                                                              <th>COMP1</th>
                                                              <th>COMP2</th>
                                                                                                                                                                                                                             <th>COMP3</th>
                                                                                                                                                                                                                             <th>COMP4</th>
                                                                                                                                                                                                                             <th>COMP5</th>
                                                                                                                                                                                                                             <th>COMP6</th>

                                                       </tr>
                                                    </thead>
                                                    <tbody>
                                                           {(doc.prodList).map((cmb1 ,index ) =>

                                                                                                                                                                               <tr style ={ index %2 ?  {background:'#fdffe0'}: {background:'white'}}>
                                                                                                                                                                                  <td>{cmb1.productCode}</td>
                                                                                                                                                                                  <td>{cmb1.productName}</td>
                                                                                                                                                                                  <td>{cmb1.quantity} {cmb1.uom}</td>
                                                                                                                                                                                  <td>{cmb1.combo1}</td>
                                                                                                                                                                                  <td>{cmb1.combo2}</td>
                                                                                                                                                                                  <td>{cmb1.combo3}</td>
                                                                                                                                                                                  <td>{cmb1.combo4}</td>
                                                                                                                                                                                  <td>{cmb1.combo5}</td>
                                                                                                                                                                                  <td>{cmb1.combo6}</td>


                                                                                                                                                                             </tr>
                                               )};
                                                </tbody>
                                                               </table>
                                                               </>
                                                               )



                       }
                      else if(doc.combotype === 'TOTECOMBO1')
                      {
                         console.log("props combodata",doc);
                       // this.getData(doc.combotype, doc.prodList);
                      //  tote1flg = true;
                      return(
                      <>
                      <h6>{doc.combotype}</h6>
                        <table class="table table-striped m-0">
                            <thead>
                               <tr>
                                      <th>Prod code</th>
                                      <th>Prod Name</th>
                                      <th>Qty</th>
                                      <th>tote1</th>
                                      <th>tote2</th>
                                                                                                                                                                                                     <th>tote3</th>
                                                                                                                                                                                                     <th>tote4</th>
                                                                                                                                                                                                     <th>tote5</th>
                                                                                                                                                                                                     <th>tote6</th>

                               </tr>
                            </thead>
                            <tbody>
                                   {(doc.prodList).map((cmb1 ,index ) =>

                                                                                                                                                       <tr style ={ index %2 ?  {background:'#fdffe0'}: {background:'white'}}>
                                                                                                                                                          <td>{cmb1.productCode}</td>
                                                                                                                                                          <td>{cmb1.productName}</td>
                                                                                                                                                          <td>{cmb1.quantity} {cmb1.uom}</td>
                                                                                                                                                          <td>{cmb1.combo1}</td>
                                                                                                                                                          <td>{cmb1.combo2}</td>
                                                                                                                                                          <td>{cmb1.combo3}</td>
                                                                                                                                                          <td>{cmb1.combo4}</td>
                                                                                                                                                          <td>{cmb1.combo5}</td>
                                                                                                                                                          <td>{cmb1.combo6}</td>


                                                                                                                                                     </tr>
                       )};
                        </tbody>
                                       </table>
                                       </>
                                       )
                        }

                      else if(doc.combotype === 'TOTECOMBO2') {
                       console.log("props combodata",doc);
                         return(
                                             <>
                                             <h6>{doc.combotype}</h6>
                                               <table class="table table-striped m-0">
                                                   <thead>
                                                      <tr>
                                                             <th>Prod code</th>
                                                             <th>Prod Name</th>
                                                             <th>Qty</th>
                                                             <th>tote1</th>
                                                             <th>tote2</th>
                                                                                                                                                                                                                            <th>tote3</th>
                                                                                                                                                                                                                            <th>tote4</th>
                                                                                                                                                                                                                            <th>tote5</th>
                                                                                                                                                                                                                            <th>tote6</th>

                                                      </tr>
                                                   </thead>
                                                   <tbody>
                                                          {(doc.prodList).map((cmb1 ,index ) =>

                                                                                                                                                                              <tr style ={ index %2 ?  {background:'#fdffe0'}: {background:'white'}}>
                                                                                                                                                                                 <td>{cmb1.productCode}</td>
                                                                                                                                                                                 <td>{cmb1.productName}</td>
                                                                                                                                                                                 <td>{cmb1.quantity} {cmb1.uom}</td>
                                                                                                                                                                                 <td>{cmb1.combo1}</td>
                                                                                                                                                                                 <td>{cmb1.combo2}</td>
                                                                                                                                                                                 <td>{cmb1.combo3}</td>
                                                                                                                                                                                 <td>{cmb1.combo4}</td>
                                                                                                                                                                                 <td>{cmb1.combo5}</td>
                                                                                                                                                                                 <td>{cmb1.combo6}</td>


                                                                                                                                                                            </tr>
                                              )};
                                               </tbody>
                                                              </table>
                                                              </>
                                                              )



                      }
                      else if(doc.combotype === 'TOTENONCOMBO')
                      {
                               console.log("props combodata",doc);
                          return(
                                              <>
                                              <h6>{doc.combotype}</h6>
                                                <table class="table table-striped m-0">
                                                    <thead>
                                                       <tr>
                                                              <th>Prod code</th>
                                                              <th>Prod Name</th>
                                                              <th>Qty</th>
                                                              <th>tote1</th>
                                                              <th>tote2</th>
                                                                                                                                                                                                                             <th>tote3</th>
                                                                                                                                                                                                                             <th>tote4</th>
                                                                                                                                                                                                                             <th>tote5</th>
                                                                                                                                                                                                                             <th>tote6</th>

                                                       </tr>
                                                    </thead>
                                                    <tbody>
                                                           {(doc.prodList).map((cmb1 ,index ) =>

                                                                                                                                                                               <tr style ={ index %2 ?  {background:'#fdffe0'}: {background:'white'}}>
                                                                                                                                                                                  <td>{cmb1.productCode}</td>
                                                                                                                                                                                  <td>{cmb1.productName}</td>
                                                                                                                                                                                  <td>{cmb1.quantity} {cmb1.uom}</td>
                                                                                                                                                                                  <td>{cmb1.combo1}</td>
                                                                                                                                                                                  <td>{cmb1.combo2}</td>
                                                                                                                                                                                  <td>{cmb1.combo3}</td>
                                                                                                                                                                                  <td>{cmb1.combo4}</td>
                                                                                                                                                                                  <td>{cmb1.combo5}</td>
                                                                                                                                                                                  <td>{cmb1.combo6}</td>


                                                                                                                                                                             </tr>
                                               )};
                                                </tbody>
                                                               </table>
                                                               </>
                                                               )

                      }
                      else if(doc.combotype === 'NONCOMBO')
                      {
                         return(
                                                                                               <>
                                                                                               <h6>{doc.combotype}</h6>
                                                                                                 <table class="table table-striped m-0">
                                                                                                     <thead>
                                                                                                        <tr>
                                                                                                               <th>Prod code</th>
                                                                                                               <th>Prod Name</th>
                                                                                                               <th>Qty</th>
                                                                                                               <th>COMP1</th>
                                                                                                               <th>COMP2</th>
                                                                                                                                                                                                                                                                              <th>COMP3</th>
                                                                                                                                                                                                                                                                              <th>COMP4</th>
                                                                                                                                                                                                                                                                              <th>COMP5</th>
                                                                                                                                                                                                                                                                              <th>COMP6</th>

                                                                                                        </tr>
                                                                                                     </thead>
                                                                                                     <tbody>
                                                                                                            {(doc.prodList).map((cmb1 ,index ) =>

                                                                                                                                                                                                                                <tr style ={ index %2 ?  {background:'#fdffe0'}: {background:'white'}}>
                                                                                                                                                                                                                                   <td>{cmb1.productCode}</td>
                                                                                                                                                                                                                                   <td>{cmb1.productName}</td>
                                                                                                                                                                                                                                   <td>{cmb1.quantity} {cmb1.uom}</td>
                                                                                                                                                                                                                                   <td>{cmb1.combo1}</td>
                                                                                                                                                                                                                                   <td>{cmb1.combo2}</td>
                                                                                                                                                                                                                                   <td>{cmb1.combo3}</td>
                                                                                                                                                                                                                                   <td>{cmb1.combo4}</td>
                                                                                                                                                                                                                                   <td>{cmb1.combo5}</td>
                                                                                                                                                                                                                                   <td>{cmb1.combo6}</td>


                                                                                                                                                                                                                              </tr>
                                                                                                )};
                                                                                                 </tbody>
                                                                                                                </table>
                                                                                                                </>
                                                                                                                )



                       }
                      else {
                              return(
                                    <>
                                       <h6>Tote/Twin Packs</h6>
                                          <table class="table table-striped m-0">
                                               <thead>
                                               <tr>
                                                                                                               <th>Prod code</th>
                                                                                                               <th>Prod Name</th>
                                                                                                               <th>Qty</th>
                                                                                                              </tr>
                                                                                                     </thead>
                                                                                                     <tbody>
                                                                                                            {(doc.prodList).map((cmb1 ,index ) =>

                                                                                                                                                                                                                                <tr style ={ index %2 ?  {background:'#fdffe0'}: {background:'white'}}>
                                                                                                                                                                                                                                   <td>{cmb1.productCode}</td>
                                                                                                                                                                                                                                   <td>{cmb1.productName}</td>
                                                                                                                                                                                                                                   <td>{cmb1.quantity} {cmb1.uom}</td>
                                                                                                                                                                                                                                   </tr>
                                                                                                )};
                                                                                                 </tbody>
                                                                                                                </table>
                                                                                                                </>
                                                                                                                )


                      }
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
export default ProductsComboList;