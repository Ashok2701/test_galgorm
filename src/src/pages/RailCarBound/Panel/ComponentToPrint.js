import React from 'react';
import AgroLogo from '../../../assets/images/AgroLogo.jpg';
import moment from 'moment';
import railcar from '../../../assets/images/railcar.png';
import railcar2 from '../../../assets/images/railcar2.png';
import BolReport from './BolReport.css';


class ComponentToPrint extends React.Component {
    constructor(props) {
              super(props);
              }

   displayCalculations = (calc) => {
             let calData = calc.replace("&nbsp;"," ");
               return (
                               <h6>
                                  <pre>{calData}</pre>
                               </h6>
                           );
             }



    getRailCarImage = (boldata) => {
      var comp1 =  [];
       var  comp2 = [];


     {(this.props.comboData &&  this.props.comboData || []).map((combo_data, i) => {
        {(combo_data.prodList || []).map((prod, i) => {
           if(prod.combo1 > 0 ) {

               var prodlists = {
                                     prodName : '',
                                     prodmass : '',
                                }

              prodlists.prodName = prod.productName;
              prodlists.prodmass = prod.combo1 +" "+ prod.uom;
              console.log("print - inside combo1",prodlists);
              comp1.push(prodlists);
           }
           if(prod.combo2 > 0 ) {

               var prodlists = {
                                     prodName : '',
                                     prodmass : '',
                                }

              prodlists.prodName = prod.productName;
              prodlists.prodmass = prod.combo2 +" "+ prod.uom;
              console.log("print - inside combo2",prodlists);
             comp2.push(prodlists);
           }

      })}
     })}
         console.log("count of components - print final prodList - comp1",comp1);
         console.log("count of components - print final prodList - comp2",comp2);
      console.log("count of components =",boldata);
     console.log("count of combo data on image =",this.props.comboData);

       if(boldata.combCount == 2) {
        return(
          <div class="railcar">
           <img src={railcar2} alt="" class="img-fluid" />
            <div class="comp1-rightH">
                         <p style={{color : "Red", fontWeight:"bolder" }}>COMP #1</p>
            </div>
            <div class="comp1-left">
                     {comp1[0].prodName.length > 0 &&
                                       <p>{comp1[0].prodName}</p>
                                       }


            </div>
            <div class="comp1-right">
                 {comp1[0].prodmass.length > 0 &&
                                      <p>{comp1[0].prodmass}</p>
                                      }

            </div>

            <div class="comp2-rightH">
                                       <p style={{color : "Red", fontWeight:"bolder" }}>COMP #2</p>
            </div>
            <div class="comp2-left">
                           <p>{comp2[0].prodName}</p>
            </div>
            <div class="comp2-right">
                          <p>{comp2[0].prodmass}</p>
            </div>
          </div>
         );
       }
       else {

        return(
          <div class="railcar">
           <img src={railcar} alt="" class="img-fluid" />
           <div class="comp11-rightH">
                                    <p style={{color : "Red", fontWeight:"bolder" }}>COMP #1</p>
                       </div>
            <div class="comp1-left">
                   {comp1.length > 0 && comp1.map(c1 => (
                         <p>{c1.prodName}</p>
                   ))}
            </div>
            <div class="comp2-right">
                  {comp1.length > 0 &&
                                       <p>{comp1[0].prodmass}</p>
                                       }
                  {comp1.length > 1 &&
                                                         <p>{comp1[1].prodmass}</p>
                                                         }
                  {comp1.length > 2 &&
                                                         <p>{comp1[2].prodmass}</p>
                                                         }
                  {comp1.length > 3 &&
                                                         <p>{comp1[3].prodmass}</p>
                                                         }
                  {comp1.length > 4 &&
                                                         <p>{comp1[4].prodmass}</p>
                                                         }
                                     </div>
             </div>
           );

       }
    }
  render() {
      let bol = this.props.boldata;
      let combo = this.props.comboData;
      const boldate = moment(bol.boldate).format('MM-DD-YYYY');
      const properties = {header : 'Acme'}
    return (

         <React.Fragment>

                 <div class="my-5 page" size="A4">
                          <div class="p-5">
                            <section class="heading1">
                             <section class="graphic-path" >
                              <span class="bol">
                              <h4>{bol.bolnum}</h4>
                              </span>
                              <span class="title">
                              <h4>BILL OF LADING</h4>
                              </span>
                             </section>
                             </section>
                            <section class="top-content bb d-flex">
                                 <div class="logo-bol">
                                     <img src={AgroLogo} alt="" class="img-fluid" />
                                 </div>

                                 <div class="top-left">

                                     <ul>

                                      <li>3055 W. M-21</li>
                                       <li>Saint Johns, MI 48879</li>
                                       <li>United States of America</li>
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
                            </section>
                           <section class="shiping-section2 d-flex justify-content-between" >
                                <div class="second-right">
                                  <div class="column left">
                                      <p>Date</p>
                                      <p>BOL</p>
                                      <p>Shipping Site</p>
                                      <p>RailCar</p>

                                  </div>
                                  <div class="column middle">
                                      <p>:</p>
                                      <p>:</p>
                                      <p>:</p>
                                      <p>:</p>

                                  </div >
                                  <div class="column right">
                                      <p><span>{boldate}</span></p>
                                      <p><span>{bol.bolnum}</span></p>
                                      <p>{bol.ssite},{bol.ssname}</p>
                                      <p>{bol.railcode}</p>
                                 </div>
                                </div>

                            </section>

                            <section class="transport-section d-flex justify-content-between">
                                                                                        <div class="third-left">
                                                                                           <h4>Transportation Notes :</h4>
                                                                                           <span>{bol.transnote}</span>
                                                                                        </div>
                                                                                    </section>

                             <section class="transport-section2 d-flex justify-content-between">
                                <div class="third-right">

                                 {this.getRailCarImage(bol)}
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
                                                                        <div class="comboouter">
                                                                        <div class="comboh">
                                                                        <span style={{float: "left",width:"250px",fontWeight:"bold"}}><b>{doc.combotype}</b></span>
                                                                         <h5 style={{float: "center"}}> order #: {bol.sohnum}</h5>
                                                                         <h5 style={{float: "right"}}>PO order #: {bol.sohnum}</h5>
                                                                        </div>
                                                                          <table class="table table-striped m-0">
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
                                                                         )}
                                                                          </tbody>
                                                                                         </table>

                                                                                         <h6>End of {doc.combotype}</h6>
                                                                                           </div>
                                                                                         )
                       }
                       else if(doc.combotype === 'COMBO2')
                       {
                            return(
                                              <div class="comboouter">
                                              <div class="comboh">
                                                                                                                      <span style={{float: "left",width:"250px",fontWeight:"bold"}}><b>{doc.combotype}</b></span>
                                                                                                                       <h5 style={{float: "center"}}> order #:{bol.sohnum}</h5>
                                                                                                                        <h5 style={{float: "right"}}>PO order #: {bol.sohnum}</h5>

                                                                                                                      </div>
                                                <table class="table table-striped m-0">
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

                                                               <h6>End of {doc.combotype}</h6>
                                                                </div>
                                                               )



                       }
                      else if(doc.combotype === 'TOTECOMBO1')
                      {
                         console.log("props combodata",doc);
                       // this.getData(doc.combotype, doc.prodList);
                      //  tote1flg = true;
                      return(
                      <div class="comboouter">
                      <div class="comboh">
                                                                                                                                           <span style={{float: "left",width:"250px",fontWeight:"bold"}}><b>{doc.combotype}</b></span>
                                                                                                                                            <h5 style={{float: "center"}}> order #:{bol.sohnum}</h5>
                                                                                                                                             <h5 style={{float: "right"}}>PO order #: {bol.sohnum}</h5>

                                                                                                                                           </div>
                        <table class="table table-striped m-0">
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
                                       </div>
                                       )
                        }

                      else if(doc.combotype === 'TOTECOMBO2') {
                       console.log("props combodata",doc);
                         return(
                                             <>
                                              <div class="comboh">
                                                                                                                                                                   <span style={{float: "left",width:"250px",fontWeight:"bold"}}><b>{doc.combotype}</b></span>
                                                                                                                                                                    <h5 style={{float: "center"}}> order #:{bol.sohnum}</h5>
                                                                                                                                                                     <h5 style={{float: "right"}}>PO order #: {bol.sohnum}</h5>

                                                                                                                                                                   </div>
                                               <table class="table table-striped m-0">
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
                                                                                               <div class="comboouter">
                                                                                               <div class="comboh">
                                                                                                                                                                                                                    <span style={{float: "left",width:"250px",fontWeight:"bold"}}><b>{doc.combotype}</b></span>
                                                                                                                                                                                                                     <h5 style={{float: "center", width:"1500px"}}> Order #:   {bol.sohnum} <span style={{paddingLeft : "220px"}}>PO number : adfasdfasdfsfsd </span> </h5>



                                                                                                                                                                                                                    </div>
                                                                                                 <table class="table table-striped m-0">
                                                                                                    <thead>
                                                                                                       <tr>
                                                                                                          <th style={{whiteSpace: "nowrap"}}>Product Name</th>
                                                                                                          <th></th>

                                                                                                          <th>COMBO1</th>
                                                                                                          <th>COMBO2</th>
                                                                                                          <th>COMBO3</th>
                                                                                                          <th>COMBO4</th>
                                                                                                          <th>COMBO5</th>
                                                                                                          <th>COMBO6</th>

                                                                                                       </tr>
                                                                                                    </thead>
                                                                                                     <tbody>
                                                                                                            {(doc.prodList).map((cmb1 ,index ) =>

                                                                                                                                                                                                                                <tr style ={ index %2 ?  {background:'#fdffe0'}: {background:'white'}}>

                                                                                                                                                                                                                                   <td style={{whiteSpace: "nowrap"}}>{cmb1.productName}</td>
                                                                                                                                                                                                                                   <td><pre style={{border : "0"}}>{cmb1.calBOL} </pre></td>


                                                                                                                                                                                                                                   <td> {(() => {
                                                                                                                                                                                                                                                                                                                                        if (cmb1.combo1  > 0) {
                                                                                                                                                                                                                                                                                                                                           return( <span> {cmb1.combo1} {cmb1.uom} </span>)
                                                                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                                                                return '';
                                                                                                                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                                                                                                                    })()}</td>
                                                                                                                                                                                                                                   <td>{cmb1.combo2} {cmb1.uom} </td>
                                                                                                                                                                                                                                   <td>{cmb1.combo3} {cmb1.uom}</td>
                                                                                                                                                                                                                                   <td>{cmb1.combo4} {cmb1.uom}</td>
                                                                                                                                                                                                                                   <td>{cmb1.combo5} {cmb1.uom}</td>
                                                                                                                                                                                                                                   <td>{cmb1.combo6} {cmb1.uom}</td>


                                                                                                                                                                                                                              </tr>
                                                                                                )}
                                                                                                 </tbody>
                                                                                                                </table>

                                                                                                                 <h6>End of {doc.combotype}</h6>
                                                                                                                  </div>
                                                                                                                )



                       }
                      else {
                              return(
                                    <>
                                       <h6>Tote/Twin Packs</h6>
                                          <table class="table table-striped m-0">
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
                           <div className="sealnumber">
                             <h4>Seal Numbers : </h4>
                             <p>{bol.seal1}</p>
                             <p>{bol.seal2}</p>
                             <p>{bol.seal3}</p>
                             <p>{bol.seal4}</p>
                             <p>{bol.seal5}</p>
                             <p>{bol.seal6}</p>
                             </div>
                            </section>
                            <section class="extrafooter-section">
                               <div class="we_heading"> <h5>WEIGHTMASTER CERTIFICATE </h5></div>
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
           </React.Fragment>
    );
  }
}

export default ComponentToPrint;
