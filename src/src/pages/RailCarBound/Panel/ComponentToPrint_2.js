import React from 'react';
import AgroLogo from '../../../assets/images/AgroLogo.jpg';
import moment from 'moment';
import railcar from '../../../assets/images/railcar.png';
import BolReport from './BolReport.css';


class ComponentToPrint extends React.Component {
    constructor(props) {
              super(props);
              }
  render() {
      let bol = this.props.boldata;
      let combo = this.props.comboData;
      const boldate = moment(bol.boldate).format('MM-DD-YYYY');
    return (

         <>
                 <div class="my-5 page" size="A4">
                          <div class="p-5">
                            <section class="heading">
                             <div class="graphic-path">
                               <p>RAILCAR BILL OF LADING</p>
                             </div>
                            </section>
                            <section class="top-content bb d-flex">
                                 <div class="logo">
                                     <img src={AgroLogo} alt="" class="img-fluid" />
                                 </div>

                                 <div class="top-left">

                                     <ul>
                                      <li>3055 W. M-21</li>
                                       <li>Saint Johns, MI 48879</li>
                                       <li>United States of America</li>
                                       <li>PHONE :</li>
                                       <li>Toll Free:</li>
                                     </ul>

                                 </div>
                            </section>
                            <section class="shiping-section d-flex justify-content-between" >
                                <div class="second-left">
                                   <div class="site">
                                     <ul>
                                       <li>{bol.addcode}</li>
                                       <li>{bol.bpadd1}</li>
                                       <li>{bol.city}, {bol.state} {bol.poscod}</li>
                                       <li>{bol.cry}</li>
                                       <li></li>
                                     </ul>
                                   </div>
                                   <div class="site-info">
                                       <p>Primary Number : <span>{bol.primno}</span></p>
                                       <p>Secondary Number : <span>{bol.secno}</span></p>
                                       <p>Customer : <span></span> </p>
                                   </div>

                                 </div>

                                <div class="second-right">
                                 <p>Date          : <span>{boldate}</span></p>
                                 <p>BOL Number    : <span>{bol.bolnum}</span></p>
                                 <p>Shipping Site : <span>{bol.ssite},{bol.ssname}</span> </p>
                                 <p>RailCar       : <span>{bol.railcode}</span></p>
                                 <p>Route Code    : <span></span></p>
                                 <p>Loaded By     : <span></span></p>
                                 <p> Loaded At    : <span></span></p>



                                </div>

                            </section>
                            <section class="transport-section d-flex justify-content-between">
                                <div class="third-left">
                                   <p>Transportation Notes :</p>
                                   <span>{bol.transnote}</span>
                                </div>
                                <div class="third-right">
                                 <div class="railcar">
                                 <img src={railcar} alt="" class="img-fluid" />
                                 </div>
                                </div>
                            </section>
                            <section class="Maindata">
<table class="mytable">
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


                            </section>
                            <section class="extrafooter-section">
                               <div class="we_heading"> WEIGHTMASTER CERTIFICATE</div>
                               <p>THIS IS TO CERTIFY that the following described commodity was weighed, measure, or counted by a weightmaster, whose signature is on this certificate, who is a recognized authority of accuracy, as prescribed by Chapter 7 (commencing with section 12700) of Division 5 of California Business and Professions Code, administered by the Division of Measurement Standards of the California Department of Food and Agriculture
                               </p>
                               <div class="deputysign">
                                 <p>Deputy Weightmaster Signature
                                 </p>
                              </div>
                            </section>


                            <footer>
                                 <p>Note: Above information that is blank is because related infomation was not provided by customer.</p>
                                  <p>Disclaimer: Product sold "as is" and "with all faults". AgroLiquid, division of COG Marketers, Ltd., does not warrant the performance of this product in any given usage. COG Marketers, Ltd.'s liability for any performance failure of this product shall be limited to the amount charged for the product subject to this bill of lading
                                 </p>
                                 <section class="signature-section d-flex justify-content-between">
                                     <div class="customersign">

                                        <p>Customer Signature</p>
                                     </div>
                                     <div class="driversign">
                                        <p>Driver Signature</p>

                                     </div>

                                 </section>
                                 <section class="final-footer ">
                                 <p>For maximum acceptable application rates & components of this fertilizer write the guarantor and reference the load number.</p>
                                 <p>      Analysis Guaranteed by: </p>
                                  <p> AgroLiquid</p>
                      <p>Division of COG Marketers, Ltd.</p>
                  <p>3055 West M-21 St. Johns. MI 48879</p>
                               </section>
                            </footer>

                          </div>


                      </div>
                      <div class="my-5 page" size="A4">
                      <div class="p-5">

                       <section class="top-content bb d-flex">
                            <div class="logo">
                                <img src={AgroLogo} alt="" class="img-fluid" />
                            </div>

                            <div class="top-left">

                                <ul>
                                 <li>3055 W. M-21</li>
                                  <li>Saint Johns, MI 48879</li>
                                  <li>United States of America</li>
                                  <li>PHONE :</li>
                                  <li>Toll Free:</li>
                                </ul>

                            </div>
                       </section>
                       <section class="driver-section">
                           <div>
                           <div class="driverdirections">

                             <p>
                             </p>
                             <p>
                             </p>
                             <p>
                             </p>
                             <p>
                             </p>
                             <p>
                             </p>
                             <p>
                             </p>
                           </div>
                           </div>
                       </section>
                       <section class="Maindata">

                       </section>

                       <footer>
                            <p>Note: Above information that is blank is because related infomation was not provided by customer.</p>
                             <p>Disclaimer: Product sold "as is" and "with all faults". AgroLiquid, division of COG Marketers, Ltd., does not warrant the performance of this product in any given usage. COG Marketers, Ltd.'s liability for any performance failure of this product shall be limited to the amount charged for the product subject to this bill of lading
                            </p>
                            <section class="signature-section d-flex justify-content-between">
                                <div class="customersign">

                                   <p>Customer Signature</p>
                                </div>
                                <div class="driversign">
                                   <p>Driver Signature</p>

                                </div>

                            </section>
                            <section class="final-footer ">
                            <p>For maximum acceptable application rates & components of this fertilizer write the guarantor and reference the load number.</p>
                            <p>      Analysis Guaranteed by: </p>
                             <p> AgroLiquid</p>
                 <p>Division of COG Marketers, Ltd.</p>
                 <p>3055 West M-21 St. Johns. MI 48879</p>
                          </section>
                       </footer>

                     </div>

                 </div>
           </>
    );
  }
}

export default ComponentToPrint;
