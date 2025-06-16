import React from "react";
import { Modal, Button } from "react-bootstrap";
import { withNamespaces } from "react-i18next";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { Label } from "reactstrap";
// x3 link from .env
const x3Url = process.env.REACT_APP_X3_URL;
const apiUrl = process.env.REACT_APP_API_URL;
// // class DisplayProducts extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       selectedOptions: null, // Default state as null
// //     };
// //     this.handleChange = this.handleChange.bind(this);
// //   }

// //   handleChange = (selected) => {
// //     
// //     this.setState({ selectedOptions: selected });
// //   };

// //   formatOptionLabel = (option) => {
// //     return (
// //       <>
// //         <span>{option.code} </span>
// //         <span>({option.description})</span>
// //       </>
// //     );
// //   };

// //   documentBadgeLink = (docno, dtype) => {
// //     const docmvt = dtype;
// //     let url, content;

// //     if (docmvt == "PICK") {
// //       url = `${x3Url}/$sessions?f=GESPRH2/2//M/` + docno;
// //       // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
// //       return (
// //         <a href={url} target="_blank">
// //           {docno}{" "}
// //         </a>
// //       );
// //     }
// //     if (docmvt == "DLV") {
// //       url = `${x3Url}/$sessions?f=GESSDH/2//M/` + docno;
// //       // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
// //       return (
// //         <a href={url} target="_blank">
// //           {docno}{" "}
// //         </a>
// //       );
// //     }
// //     if (docmvt == "PRECEIPT") {
// //       url = `${x3Url}/$sessions?f=GESXX10CPTH/2/M//` + docno;
// //       // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
// //       return (
// //         <a href={url} target="_blank">
// //           {docno}{" "}
// //         </a>
// //       );
// //     }
// //     if (docmvt == "RETURN") {
// //       url = `${x3Url}/$sessions?f=GESSRH/2/M//` + docno;
// //       // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
// //       return (
// //         <a href={url} target="_blank">
// //           {docno}{" "}
// //         </a>
// //       );
// //     }
// //   };

// //     // This will be triggered when the component mounts
// //     // componentDidMount() {
// //     //     const { currDropsPanel, docNum, pickersList } = this.props;
// //     //     
// //     //     const matchedDoc = currDropsPanel?.find((panel) => panel.docnum === docNum);

// //     //     if (matchedDoc && matchedDoc.picker) {
// //     //       // Find the picker option from the pickersList
// //     //       const defaultOption = pickersList.find(
// //     //         (option) => option.code === matchedDoc.picker
// //     //       );
// //     //       if (defaultOption) {
// //     //         this.setState({ selectedOptions: defaultOption });
// //     //       }
// //     //     }
// //     //   }

// //     // componentDidMount(){
// //     //     const { currDropsPanel, docNum, pickersList } = this.props;

// //     //     
// //     // }

// //   render() {


// //      // Check if the component needs to set the default selected option from currDropsPanel and pickersList
// //      const { currDropsPanel, docNum, pickersList } = this.props;

// //      // Check if selectedOptions is null and currDropsPanel exists
// //      if (this.state.selectedOptions === null && currDropsPanel) {
// //        const matchedDoc = currDropsPanel?.find((panel) => panel.docnum === docNum);

// //        if (matchedDoc && matchedDoc.picker) {
// //          // If there is a picker for this document, set the default option based on the picker code
// //          const defaultOption = pickersList.find((option) => option.code === matchedDoc.picker);
// //          if (defaultOption) {
// //            this.setState({ selectedOptions: defaultOption });
// //          }
// //        } else {
// //          // If there's no picker, select the first option from the pickersList
// //          if (pickersList.length > 0) {
// //            this.setState({ selectedOptions: pickersList[0] });
// //          }
// //        }
// //      }

// //     
// //     // Custom styles for the select component
// //     const customStyles = {
// //       control: (provided) => ({
// //         ...provided,
// //         borderColor: "gray",
// //         boxShadow: "none",
// //         "&:hover": {
// //           borderColor: "gray",
// //         },
// //       }),
// //       option: (provided, state) => ({
// //         ...provided,
// //         backgroundColor: state.isFocused ? "#f0f0f0" : "white",
// //         color: state.isSelected ? "#333" : "#000",
// //         cursor: "pointer",
// //         padding: "10px",
// //       }),
// //       singleValue: (provided) => ({
// //         ...provided,
// //         color: "#000",
// //       }),
// //     };

// //     return (
// //       <Modal
// //         {...this.props}
// //         size="lg"
// //         aria-labelledby="contained-modal-title-vcenter"
// //         centered
// //       >
// //         <Modal.Header>
// //           <Modal.Title id="contained-modal-title-vcenter">
// //             <div className="d-flex align-items-center ">
// //               <div>
// //                 {this.props.t("Product Details")} (
// //                 {this.documentBadgeLink(this.props.docNum, this.props.doctype)})
// //               </div>
// //               <div
// //                 className="bg-primary"
// //                 style={{ width: "290px", marginLeft: "15px" ,fontSize:"16px"}}
// //               >
// //                 <Select
// //                   value={this.state.selectedOptions}
// //                   onChange={this.handleChange}
// //                   options={this.props.pickersList}
// //                   formatOptionLabel={this.formatOptionLabel}
// //                   getOptionLabel={(option) =>
// //                     `${option.code} - ${option.description}`
// //                   }
// //                   styles={customStyles}
// //                 />
// //               </div>
// //             </div>
// //           </Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <table class="table table-striped m-0">
// //             <thead>
// //               <tr class="">
// //                 <th width="6%">{this.props.t("prodcode")}</th>
// //                 <th width="10%">{this.props.t("prodname")}</th>
// //                 <th width="6%">{this.props.t("qty")}</th>
// //                 <th width="6%">{this.props.t("UOM")}</th>
// //                 <th width="10%">lineno</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {(this.props.products || []).map((product) => {
// //                 return (
// //                   <tr>
// //                     <td width="6%">{product.productCode}</td>
// //                     <td width="10%">{product.productName}</td>
// //                     <td width="6%">
// //                       {parseFloat(product.quantity).toFixed(2)}
// //                     </td>
// //                     <td width="6%">{product.uom}</td>
// //                     <td width="10%">{product.docLineNum}</td>
// //                   </tr>
// //                 );
// //               })}
// //             </tbody>
// //           </table>
// //           <hr class="m-0 p-0" />

// //           {(() => {
// //             if (this.props.products.length <= 0) {
// //               return <div class="col-md-12">Products List is Empty</div>;
// //             }
// //           })()}
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button>Save</Button>
// //           <Button onClick={this.props.onHide}>Close</Button>
// //         </Modal.Footer>
// //       </Modal>
// //     );
// //   }
// // }

// class DisplayProducts extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         selectedOptions: null, // Default state as null
//       };
//       this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange = (selected) => {
//       
//       this.setState({ selectedOptions: selected });
//     };

//     formatOptionLabel = (option) => {
//       return (
//         <>
//           <span>{option.code} </span>
//           <span>({option.description})</span>
//         </>
//       );
//     };

//     documentBadgeLink = (docno, dtype) => {
//       const docmvt = dtype;
//       let url, content;

//       if (docmvt === "PICK") {
//         url = `${x3Url}/$sessions?f=GESPRH2/2//M/` + docno;
//         return (
//           <a href={url} target="_blank">
//             {docno}{" "}
//           </a>
//         );
//       }
//       if (docmvt === "DLV") {
//         url = `${x3Url}/$sessions?f=GESSDH/2//M/` + docno;
//         return (
//           <a href={url} target="_blank">
//             {docno}{" "}
//           </a>
//         );
//       }
//       if (docmvt === "PRECEIPT") {
//         url = `${x3Url}/$sessions?f=GESXX10CPTH/2/M//` + docno;
//         return (
//           <a href={url} target="_blank">
//             {docno}{" "}
//           </a>
//         );
//       }
//       if (docmvt === "RETURN") {
//         url = `${x3Url}/$sessions?f=GESSRH/2/M//` + docno;
//         return (
//           <a href={url} target="_blank">
//             {docno}{" "}
//           </a>
//         );
//       }
//     };

//     // Update the selected option when props change
//     componentDidUpdate(prevProps) {
//       const { currDropsPanel, docNum, pickersList } = this.props;

//       
//       // Check if docNum or currDropsPanel has changed
//       if (prevProps.docNum !== docNum || prevProps.currDropsPanel !== currDropsPanel) {
//         // Reset selectedOptions if it's null or if the picker code has changed
//         if (this.state.selectedOptions === null && currDropsPanel) {
//           const matchedDoc = currDropsPanel?.find((panel) => panel.docnum === docNum);

//           if (matchedDoc && matchedDoc.picker) {
//             const defaultOption = pickersList.find((option) => option.code === matchedDoc.picker);
//             if (defaultOption) {
//               this.setState({ selectedOptions: defaultOption });
//             }
//           } else {
//             if (pickersList.length > 0) {
//               this.setState({ selectedOptions: pickersList[0] });
//             }
//           }
//         }
//       }
//     }

//     render() {

//       

//       // Custom styles for the select component
//       const customStyles = {
//         control: (provided) => ({
//           ...provided,
//           borderColor: "gray",
//           boxShadow: "none",
//           "&:hover": {
//             borderColor: "gray",
//           },
//         }),
//         option: (provided, state) => ({
//           ...provided,
//           backgroundColor: state.isFocused ? "#f0f0f0" : "white",
//           color: state.isSelected ? "#333" : "#000",
//           cursor: "pointer",
//           padding: "10px",
//         }),
//         singleValue: (provided) => ({
//           ...provided,
//           color: "#000",
//         }),
//       };

//       return (
//         <Modal
//           {...this.props}
//           size="lg"
//           aria-labelledby="contained-modal-title-vcenter"
//           centered
//         >
//           <Modal.Header>
//             <Modal.Title id="contained-modal-title-vcenter">
//               <div className="d-flex align-items-center ">
//                 <div>
//                   {this.props.t("Product Details")} (
//                   {this.documentBadgeLink(this.props.docNum, this.props.doctype)})
//                 </div>
//                 <div
//                   className="bg-primary"
//                   style={{ width: "290px", marginLeft: "15px", fontSize: "16px" }}
//                 >
//                   <Select
//                     value={this.state.selectedOptions}
//                     onChange={this.handleChange}
//                     options={this.props.pickersList}
//                     formatOptionLabel={this.formatOptionLabel}
//                     getOptionLabel={(option) =>
//                       `${option.code} - ${option.description}`
//                     }
//                     styles={customStyles}
//                   />
//                 </div>
//               </div>
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <table className="table table-striped m-0">
//               <thead>
//                 <tr>
//                   <th width="6%">{this.props.t("prodcode")}</th>
//                   <th width="10%">{this.props.t("prodname")}</th>
//                   <th width="6%">{this.props.t("qty")}</th>
//                   <th width="6%">{this.props.t("UOM")}</th>
//                   <th width="10%">lineno</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(this.props.products || []).map((product) => {
//                   return (
//                     <tr key={product.docLineNum}>
//                       <td width="6%">{product.productCode}</td>
//                       <td width="10%">{product.productName}</td>
//                       <td width="6%">{parseFloat(product.quantity).toFixed(2)}</td>
//                       <td width="6%">{product.uom}</td>
//                       <td width="10%">{product.docLineNum}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//             <hr className="m-0 p-0" />

//             {this.props.products.length <= 0 && (
//               <div className="col-md-12">Products List is Empty</div>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button>Save</Button>
//             <Button onClick={this.props.onHide}>Close</Button>
//           </Modal.Footer>
//         </Modal>
//       );
//     }
//   }

// export default withNamespaces()(DisplayProducts);

// class DisplayProducts extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         selectedOptions: null, // Default state as null
//       };
//       this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange = (selected) => {
//       
//       this.setState({ selectedOptions: selected });
//     };

//     formatOptionLabel = (option) => {
//       return (
//         <>
//           <span>{option.code} </span>
//           <span>({option.description})</span>
//         </>
//       );
//     };

//     documentBadgeLink = (docno, dtype) => {
//       const docmvt = dtype;
//       let url;

//       if (docmvt === "PICK") {
//         url = `${x3Url}/$sessions?f=GESPRH2/2//M/` + docno;
//         return <a href={url} target="_blank">{docno} </a>;
//       }
//       if (docmvt === "DLV") {
//         url = `${x3Url}/$sessions?f=GESSDH/2//M/` + docno;
//         return <a href={url} target="_blank">{docno} </a>;
//       }
//       if (docmvt === "PRECEIPT") {
//         url = `${x3Url}/$sessions?f=GESXX10CPTH/2/M//` + docno;
//         return <a href={url} target="_blank">{docno} </a>;
//       }
//       if (docmvt === "RETURN") {
//         url = `${x3Url}/$sessions?f=GESSRH/2/M//` + docno;
//         return <a href={url} target="_blank">{docno} </a>;
//       }
//     };

//     onSavePickers = (picker) => {


//         const pickerObj = {
//           docnum: this.props.docNum,
//           pickercode: this.state.selectedOptions.code,
//           type: this.props.doctype,
//         };
//         fetch(`${apiUrl}/api/v1/transport/updatepicker`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(pickerObj),
//         })
//           .then((response) => {
//             // this.setState({
//             //   pickerWindow: false,
//             // });

//             window.alert("update successfully")
//             // this.notifySucess("Picker updated successfully");
//             // this.props.fetchDocumentPanelDateChange(this.props.documentPanel_date);
//           })
//           .catch((err) => {
//             
//           });
//       };

//     // Update selectedOptions when props or state change
//     componentDidUpdate(prevProps) {
//       const { currDropsPanel, docNum, pickersList } = this.props;

//       // If the docNum or currDropsPanel has changed, reset the selectedOptions
//       if (
//         prevProps.docNum !== docNum ||
//         prevProps.currDropsPanel !== currDropsPanel
//       ) {
//         if (currDropsPanel && docNum) {
//           // Find the matched document
//           const matchedDoc = currDropsPanel.find((panel) => panel.docnum === docNum);

//           if (matchedDoc && matchedDoc.picker) {
//             // If there's a picker, set it as the selected option
//             const defaultOption = pickersList.find((option) => option.code === matchedDoc.picker);
//             if (defaultOption) {
//               this.setState({ selectedOptions: defaultOption });
//             }
//           } else {
//             // If there's no picker, select the first option from pickersList
//             if (pickersList.length > 0) {
//               this.setState({ selectedOptions: pickersList[0] });
//             }
//           }
//         }
//       }
//     }

//     // Check if selectedOptions should be set during the initial render
//     componentDidMount() {
//       const { currDropsPanel, docNum, pickersList } = this.props;
//       if (currDropsPanel && docNum && this.state.selectedOptions === null) {
//         // Match the document and set the default option
//         const matchedDoc = currDropsPanel.find((panel) => panel.docnum === docNum);
//         if (matchedDoc && matchedDoc.picker) {
//           const defaultOption = pickersList.find((option) => option.code === matchedDoc.picker);
//           if (defaultOption) {
//             this.setState({ selectedOptions: defaultOption });
//           }
//         } else {
//           // If no picker is found, select the first option
//           if (pickersList.length > 0) {
//             this.setState({ selectedOptions: pickersList[0] });
//           }
//         }
//       }
//     }

//     render() {
//       const { currDropsPanel, docNum, pickersList, products } = this.props;
//       

//       // Custom styles for the select component
//       const customStyles = {
//         control: (provided) => ({
//           ...provided,
//           borderColor: "gray",
//           boxShadow: "none",
//           "&:hover": {
//             borderColor: "gray",
//           },
//         }),
//         option: (provided, state) => ({
//           ...provided,
//           backgroundColor: state.isFocused ? "#f0f0f0" : "white",
//           color: state.isSelected ? "#333" : "#000",
//           cursor: "pointer",
//           padding: "10px",
//         }),
//         singleValue: (provided) => ({
//           ...provided,
//           color: "#000",
//         }),
//       };

//       return (
//         <Modal
//           {...this.props}
//           size="lg"
//           aria-labelledby="contained-modal-title-vcenter"
//           centered
//         >
//           <Modal.Header>
//             <Modal.Title id="contained-modal-title-vcenter">
//               <div className="d-flex align-items-center ">
//                 <div>
//                   {this.props.t("Product Details")} (
//                   {this.documentBadgeLink(this.props.docNum, this.props.doctype)})
//                 </div>
//                 <div
//                   className="bg-primary"
//                   style={{ width: "290px", marginLeft: "15px", fontSize: "16px" }}
//                 >
//                   <Select
//                     value={this.state.selectedOptions}
//                     onChange={this.handleChange}
//                     options={this.props.pickersList}
//                     formatOptionLabel={this.formatOptionLabel}
//                     getOptionLabel={(option) =>
//                       `${option.code} - ${option.description}`
//                     }
//                     styles={customStyles}
//                   />
//                 </div>
//               </div>
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <table className="table table-striped m-0">
//               <thead>
//                 <tr>
//                   <th width="6%">{this.props.t("prodcode")}</th>
//                   <th width="10%">{this.props.t("prodname")}</th>
//                   <th width="6%">{this.props.t("qty")}</th>
//                   <th width="6%">{this.props.t("UOM")}</th>
//                   <th width="10%">lineno</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(this.props.products || []).map((product) => {
//                   return (
//                     <tr key={product.docLineNum}>
//                       <td width="6%">{product.productCode}</td>
//                       <td width="10%">{product.productName}</td>
//                       <td width="6%">{parseFloat(product.quantity).toFixed(2)}</td>
//                       <td width="6%">{product.uom}</td>
//                       <td width="10%">{product.docLineNum}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//             <hr className="m-0 p-0" />
//             {this.props.products.length <= 0 && (
//               <div className="col-md-12">Products List is Empty</div>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={this.onSavePickers}>Save</Button>
//             <Button onClick={this.props.onHide}>Close</Button>
//           </Modal.Footer>
//         </Modal>
//       );
//     }
//   }

// class DisplayProducts extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         selectedOptions: null, // Default state as null
//       };
//       this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange = (selected) => {
//       
//       this.setState({ selectedOptions: selected });
//     };

//     formatOptionLabel = (option) => {
//       return (
//         <>
//           <span>{option.code} </span>
//           <span>({option.description})</span>
//         </>
//       );
//     };

//     documentBadgeLink = (docno, dtype) => {
//       const docmvt = dtype;
//       let url;

//       if (docmvt === "PICK") {
//         url = `${x3Url}/$sessions?f=GESPRH2/2//M/` + docno;
//         return <a href={url} target="_blank">{docno} </a>;
//       }
//       if (docmvt === "DLV") {
//         url = `${x3Url}/$sessions?f=GESSDH/2//M/` + docno;
//         return <a href={url} target="_blank">{docno} </a>;
//       }
//       if (docmvt === "PRECEIPT") {
//         url = `${x3Url}/$sessions?f=GESXX10CPTH/2/M//` + docno;
//         return <a href={url} target="_blank">{docno} </a>;
//       }
//       if (docmvt === "RETURN") {
//         url = `${x3Url}/$sessions?f=GESSRH/2/M//` + docno;
//         return <a href={url} target="_blank">{docno} </a>;
//       }
//     };

//     onSavePickers = (picker) => {
//       const pickerObj = {
//         docnum: this.props.docNum,
//         pickercode: this.state.selectedOptions.code,
//         type: this.props.doctype,
//       };
//       fetch(`${apiUrl}/api/v1/transport/updatepicker`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(pickerObj),
//       })
//         .then((response) => {
//         //   window.alert("Update successful");
//         this.props.fetchDocumentPanelDateChange(this.props.documentPanel_date);
//         this.notifySucess("Picker updated successfully");
//           this.props.onHide()
//         })
//         .catch((err) => {
//           
//         });
//     };

//      // Close handler that resets selectedOptions
//    handleClose = () => {
//     // Reset selectedOptions to null when modal is closed
//     this.setState({ selectedOptions: null });

//     // Call the provided onHide function (passed from parent)
//     this.props.onHide();
//   };
//     // Set the first picker as default if no picker is found
//     componentDidMount() {
//       const { currDropsPanel, docNum, pickersList } = this.props;

//       if (currDropsPanel && docNum && this.state.selectedOptions === null) {
//         // Match the document and set the default option if no picker is set
//         const matchedDoc = currDropsPanel.find((panel) => panel.docnum === docNum);

//         if (matchedDoc && matchedDoc.picker) {
//           // If there's a picker, set it as the selected option
//           const defaultOption = pickersList.find((option) => option.code === matchedDoc.picker);
//           if (defaultOption) {
//             this.setState({ selectedOptions: defaultOption });
//           }
//         } else {
//           // If no picker is found, select the first option from pickersList
//         //   if (pickersList.length > 0 && this.state.selectedOptions === null) {
//             this.setState({ selectedOptions: pickersList[0] });
//         //   }
//         }
//       }
//     }

//     // Update selectedOptions when props or state change
//     componentDidUpdate(prevProps) {
//       const { currDropsPanel, docNum, pickersList } = this.props;

//       // If the docNum or currDropsPanel has changed, reset the selectedOptions
//       if (
//         prevProps.docNum !== docNum ||
//         prevProps.currDropsPanel !== currDropsPanel ||
//         prevProps.pickersList !== pickersList
//       ) {
//         // Check if selectedOptions is null or undefined, then set it to the first picker
//         if (this.state.selectedOptions === null && pickersList.length > 0) {
//           this.setState({ selectedOptions: pickersList[0] });
//         }

//         if (currDropsPanel && docNum) {
//           // Find the matched document
//           const matchedDoc = currDropsPanel.find((panel) => panel.docnum === docNum);

//           if (matchedDoc && matchedDoc.picker) {
//             // If there's a picker, set it as the selected option
//             const defaultOption = pickersList.find((option) => option.code === matchedDoc.picker);
//             if (defaultOption) {
//               this.setState({ selectedOptions: defaultOption });
//             }
//           } else {
//             // If no picker is found, select the first option from pickersList
//             // if (pickersList.length > 0 && this.state.selectedOptions === null) {
//               this.setState({ selectedOptions: pickersList[0] });
//             // }
//           }
//         }
//       }
//     }

//     notifySucess = (message) => toast.success(message, { autoClose: 3000 });

//     render() {
//       const { currDropsPanel, docNum, pickersList, products } = this.props;
//       
//       // Custom styles for the select component
//       const customStyles = {
//         control: (provided) => ({
//           ...provided,
//           borderColor: "gray",
//           boxShadow: "none",
//           "&:hover": {
//             borderColor: "gray",
//           },
//         }),
//         option: (provided, state) => ({
//           ...provided,
//           backgroundColor: state.isFocused ? "#f0f0f0" : "white",
//           color: state.isSelected ? "#333" : "#000",
//           cursor: "pointer",
//           padding: "10px",
//         }),
//         singleValue: (provided) => ({
//           ...provided,
//           color: "#000",
//         }),
//       };

//       return (
//         <Modal
//           {...this.props}
//           size="lg"
//           aria-labelledby="contained-modal-title-vcenter"
//           centered
//         >
//           <Modal.Header>
//             <Modal.Title id="contained-modal-title-vcenter">
//               <div className="d-flex align-items-center">
//                 <div>
//                   {this.props.t("Product Details")} (
//                   {this.documentBadgeLink(this.props.docNum, this.props.doctype)})
//                 </div>
//                 <div
//                   className="bg-primary"
//                   style={{ width: "290px", marginLeft: "15px", fontSize: "16px" }}
//                 >
//                   <Select
//                     value={this.state.selectedOptions}
//                     onChange={this.handleChange}
//                     options={this.props.pickersList}
//                     formatOptionLabel={this.formatOptionLabel}
//                     getOptionLabel={(option) =>
//                       `${option.code} - ${option.description}`
//                     }
//                     styles={customStyles}
//                   />
//                 </div>
//               </div>
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <table className="table table-striped m-0">
//               <thead>
//                 <tr>
//                   <th width="6%">{this.props.t("prodcode")}</th>
//                   <th width="10%">{this.props.t("prodname")}</th>
//                   <th width="6%">{this.props.t("qty")}</th>
//                   <th width="6%">{this.props.t("UOM")}</th>
//                   <th width="10%">lineno</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(this.props.products || []).map((product) => {
//                   return (
//                     <tr key={product.docLineNum}>
//                       <td width="6%">{product.productCode}</td>
//                       <td width="10%">{product.productName}</td>
//                       <td width="6%">{parseFloat(product.quantity).toFixed(2)}</td>
//                       <td width="6%">{product.uom}</td>
//                       <td width="10%">{product.docLineNum}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//             <hr className="m-0 p-0" />
//             {this.props.products.length <= 0 && (
//               <div className="col-md-12">Products List is Empty</div>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={this.onSavePickers}>Save</Button>
//             <Button onClick={this.handleClose}>Close</Button>
//           </Modal.Footer>
//         </Modal>
//       );
//     }
//   }

class DisplayProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: null, // Default state as null
      selectedRouteCode: null,
      document: null,
      routeCodeChangeFlg:false,
      pickerChangeFlg:false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (selected) => {
    
    this.setState({ selectedOptions: selected,pickerChangeFlg:true });
  };

  setSelectedRouteCode = (routeCode) => {
    
    this.setState({
      selectedRouteCode: routeCode,
      routeCodeChangeFlg:true
    });
  };

  formatOptionLabel = (option) => {
    return (
      <>
        <span>{option.code} </span>
        <span>({option.description})</span>
      </>
    );
  };

  documentBadgeLink = (docno, dtype) => {
    const docmvt = dtype;
    let url;

    if (docmvt === "PICK") {
      url = `${x3Url}/$sessions?f=GESPRH2/2//M/` + docno;
      return (
        <a className="text-white" href={url} target="_blank">
          {docno}{" "}
        </a>
      );
    }
    if (docmvt === "DLV") {
      url = `${x3Url}/$sessions?f=GESSDH/2//M/` + docno;
      return (
        <a className="text-white" href={url} target="_blank">
          {docno}{" "}
        </a>
      );
    }
    if (docmvt === "PRECEIPT") {
      url = `${x3Url}/$sessions?f=GESXX10CPTH/2/M//` + docno;
      return (
        <a className="text-white" href={url} target="_blank">
          {docno}{" "}
        </a>
      );
    }
    if (docmvt === "RETURN") {
      url = `${x3Url}/$sessions?f=GESSRH/2/M//` + docno;
      return (
        <a className="text-white" href={url} target="_blank">
          {docno}{" "}
        </a>
      );
    }
  };

  // for picker
  onSavePickers = (picker) => {
    // const pickerObj = {
    //   docnum: this.props.docNum,
    //   pickercode: this.state.selectedOptions.code,
    //   type: this.props.doctype,
    // };
    const { selectedDocs } = this.props;

    // Map over the documents array to create update payloads for each document
    // const updates = selectedDocs?.map((doc) => ({
    //   docnum: doc.docnum, // Use docnum from the current document
    //   type: doc.type, // Use type from the current document
    //   pickercode: this.state.selectedOptions.code, // Consistent pickercode for all
    // }));

    const defaultPayload = {
      docnum: this.props.docNum, // Fallback docnum from props
      type: this.props.doctype, // Fallback type from props
      pickercode: this.state.selectedOptions.code, // Consistent pickercode
    };

    const updates = selectedDocs && selectedDocs.length > 0
    ? selectedDocs.map((doc) => ({
        docnum: doc.docnum,
        type: doc.type,
        pickercode: this.state.selectedOptions.code,
      }))
    : [defaultPayload]; // If no selectedDocs, use the default object

    // fetch(`${apiUrl}/api/v1/transport/updatepicker`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(pickerObj),
    // })
    //   .then((response) => {
    //     this.props.fetchDocumentPanelDateChange(this.props.documentPanel_date);
    //     this.notifySucess("Picker updated successfully");
    //     this.props.onHide();
    //   })
    //   .catch((err) => {
    //     
    //   });

    // updates.forEach((updatePayload) => {
    //   // Replace with your update logic
    //   fetch(`${apiUrl}/api/v1/transport/updatepicker`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(updatePayload),
    //   })
    //     .then((response) => {
    //       this.props.fetchDocumentPanelDateChange(
    //         this.props.documentPanel_date
    //       );
    //       this.notifySucess("Picker updated successfully");
    //       this.props.onHide();
    //     })
    //     .catch((err) => {
    //       
    //     });
    // });

    const updatePromises = updates.map((updatePayload) =>
      fetch(`${apiUrl}/api/v1/transport/updatepicker`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      })
    );
    
    // Wait for all update requests to complete
    Promise.all(updatePromises)
      .then(() => {
        // Call the functions after all updates are done
        this.props.fetchDocumentPanelDateChange(this.props.documentPanel_date);
        this.notifySucess("Picker updated successfully");
        this.props.onHide();
        this.setState({pickerChangeFlg:false})
      })
      .catch((err) => {
        
      });
    
  };

  // for route code
  onSaveRouteCode = (code) => {
    const { selectedDocs } = this.props;
  
    // Default object to be used if selectedDocs is empty or undefined
    const defaultPayload = {
      docnum: this.props.docNum, // Fallback docnum from props
      type: this.props.doctype, // Fallback type from props
      routecode: this.state.selectedRouteCode.value, // Consistent routecode
    };
  
    // Create an array of updates if selectedDocs exists and has elements, otherwise use the default object
    const updates = selectedDocs && selectedDocs.length > 0
      ? selectedDocs.map((doc) => ({
          docnum: doc.docnum,
          type: doc.type,
          routecode: this.state.selectedRouteCode.value,
        }))
      : [defaultPayload]; // If no selectedDocs, use the default object
  
    // Create an array of promises for the updates
    const updatePromises = updates.map((updatePayload) =>
      fetch(`${apiUrl}/api/v1/transport/updateroutecode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      })
    );
  
    // Wait for all update requests to complete
    Promise.all(updatePromises)
      .then(() => {
        // Call functions after all updates are done
        this.props.fetchDocumentPanelDateChange(this.props.documentPanel_date);
        this.notifySucess("Route Code updated successfully");
        this.props.onHide();
        this.setState({routeCodeChangeFlg:false})
      })
      .catch((err) => {
        
      });
  };
  

  // Close handler that resets selectedOptions
  handleClose = () => {
    // Reset selectedOptions to null when modal is closed
    this.setState({ selectedOptions: null,routeCodeChangeFlg:false,pickerChangeFlg:false });

    // Call the provided onHide function (passed from parent)
    this.props.onHide();
  };

  // Set the first picker as default if no picker is found
  componentDidMount() {
    this.setDefaultPicker();
  }

  // setDefaultPicker = () => {
  //   const { currDropsPanel, docNum, pickersList } = this.props;

  //   if (currDropsPanel && docNum) {
  //     const matchedDoc = currDropsPanel.find(
  //       (panel) => panel.docnum === docNum
  //     );

  //     
  //     if(matchedDoc.routeCodeDesc!=""){
  //       this.setState({ selectedRouteCode: matchedDoc.routeCodeDesc });
  //     }

  //     

  //     
  //     
  //     if (matchedDoc && matchedDoc.picker && matchedDoc.picker !== "") {
  //       // If there's a picker assigned, set it as the selected option
  //       const defaultOption = pickersList.find(
  //         (option) => option.code === matchedDoc.picker
  //       );

  //       if (defaultOption) {
  //         
  //         this.setState({ selectedOptions: defaultOption });
  //       } else {
  //         
  //         // No picker assigned, select the first option from pickersList
  //         if (pickersList.length > 0 && !this.state.selectedOptions) {
  //           
  //           this.setState({ selectedOptions: pickersList[0] });
  //         }
  //       }
  //     }
  //   }
  // };

  setDefaultPicker = () => {
    const { currDropsPanel, docNum, pickersList, routeCodes } = this.props;

    if (currDropsPanel && docNum) {
      const matchedDoc = currDropsPanel.find(
        (panel) => panel.docnum === docNum
      );

      if (matchedDoc) {
        this.setState({
          document: matchedDoc,
        });
      }

      

      if (matchedDoc && matchedDoc.routeCodeDesc) {
        
        const routeCode = routeCodes?.find(
          (route) => route.routeDesc === matchedDoc.routeCodeDesc
        );

        
        if (routeCode) {
          this.setState({
            selectedRouteCode: {
              value: routeCode.routeNo,
              label: routeCode.routeDesc || `Route ${routeCode.routeNo}`,
            },
          });
        }
      }

      if (matchedDoc && matchedDoc.picker && matchedDoc.picker !== "") {
        const defaultOption = pickersList.find(
          (option) => option.code === matchedDoc.picker
        );

        if (defaultOption) {
          this.setState({ selectedOptions: defaultOption });
        }

        // else if (pickersList.length > 0 && !this.state.selectedOptions) {
        //   this.setState({ selectedOptions: pickersList[0] });
        // }
      }
    }
  };

  componentDidUpdate(prevProps) {
    const { currDropsPanel, docNum, show, pickersList } = this.props;

    // Check if the modal is being opened (show prop changes)
    if (
      (show && // Modal is open
        prevProps.show !== show) || // It was previously closed, now it's open
      prevProps.docNum !== docNum || // If document number has changed
      prevProps.currDropsPanel !== currDropsPanel // If drops panel has changed
    ) {
      this.setDefaultPicker();
    }
  }

  notifySucess = (message) => toast.success(message, { autoClose: 3000 });

  render() {
   
    const { currDropsPanel, docNum, pickersList, products } = this.props;

    const customStyles = {
      control: (provided) => ({
        ...provided,
        borderColor: "gray",
        boxShadow: "none",
        "&:hover": {
          borderColor: "gray",
        },
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#f0f0f0" : "white",
        color: state.isSelected ? "#333" : "#000",
        cursor: "pointer",
        padding: "10px",
      }),
      singleValue: (provided) => ({
        ...provided,
        color: "#000",
      }),
    };

    // let optionRouteCodeItems = [];

  

    const { routeCodes } = this.props;

    
    if (!Array.isArray(routeCodes) || routeCodes.length === 0) {
      return <div>No routes available</div>;
    }

    // Convert the routeCodes into the format that React Select expects
    const options = routeCodes.map((route) => ({
      value: route.routeNo, // React Select uses 'value' to track selected option
      label: route.routeDesc || `Route ${route.routeNo}`, // 'label' is what will be displayed in the dropdown
    }));

    // let detaultSelectRC=this.state.selectedRouteCode ? this.state.selectedRouteCode :""

    // 

    
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        
      >
        <div className="bg-white">
          <Modal.Header className="modal-header-bg">
            <Modal.Title
              id="contained-modal-title-vcenter"
              style={{ width: "100%" }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ width: "100%" }}
              >
                <div className=" text-white">
                  Product Details ({" "}
                  {this.documentBadgeLink(
                    this.props.docNum,
                    this.props.doctype
                  )}
                  )
                </div>

                <div
                // className="mt-2"
                // style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button variant="danger" onClick={this.handleClose}>
                    Close
                  </Button>
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ height: "270px", overflowY: "scroll" }}>
            <table className="table table-striped m-0">
              <thead>
                <tr>
                  <th width="6%">Product Code</th>
                  <th width="10%">Product Desc</th>
                  <th width="10%">Weight</th>
                  {/* <th width="10%">{this.props.t("volume")}</th> */}
                  <th width="6%">Quantity</th>
                  <th width="6%">UOM</th>
                  {/* <th width="10%">lineno</th> */}
                </tr>
              </thead>
              <tbody>
                {(this.props.products || []).map((product) => (
                  <tr key={product.docLineNum}>
                    <td width="6%">{product.productCode}</td>
                    <td width="10%">{product.productName}</td>
                    <td>
                      <span className="mr-2">
                        {Number(product?.pweight).toFixed(2)}
                      </span>{" "}
                      {product.pwunit}
                    </td>
                    {/* <td><span className="mr-2">{product.pvolume}</span> {product.pvunit}</td> */}

                    <td width="6%">
                      {parseFloat(product.quantity).toFixed(2)}
                    </td>
                    <td width="6%">{product.uom}</td>
                    {/* <td width="10%">{product.docLineNum}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            <hr className="m-0 p-0" />
            {this.props.products.length <= 0 && (
              <div className="col-md-12">Products List is Empty</div>
            )}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-between">
            <div
              style={{
                // display: "flex",
                // justifyContent: "space-between",
                // alignItems: "flex-end",
                width: "100%",
              }}
            >
              {/* <div className="" style={{ width: "100%", fontSize: "16px" }}>
                {this.props.doctype == "PICK" &&
                  this.props.viewMode == "documentpanel" && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "10px",
                      }}
                    >
                      <span style={{ width: "90%" }}>
                        <Label className="text-primary">Picker</Label>
                        <Select
                         isDisabled={this.state.document?.dlvystatus !== "8"} 
                          value={this.state.selectedOptions}
                          onChange={this.handleChange}
                          options={this.props.pickersList}
                          formatOptionLabel={this.formatOptionLabel}
                          getOptionLabel={(option) =>
                            `${option.code} - ${option.description}`
                          }
                          styles={customStyles}
                        />
                      </span>

                      <span>
                  
                          <Button
                          disabled={this.state.document?.dlvystatus != "8"}
                          className="mr-1" onClick={this.onSavePickers}>
                            Save
                          </Button>
                      
                      </span>
                    </div>
                  )}
              </div> */}

              <div className="" style={{ width: "100%", fontSize: "16px" }}>
                {this.state.document?.dlvystatus !== "8" ? (
                  <>
                    <Label className="text-primary">Picker : </Label>
                    <span>
                      {" "}
                      {this.state.selectedOptions
                        ? `${this.state.selectedOptions.code} - ${this.state.selectedOptions.description}`
                        : "None"}
                    </span>
                  </>
                ) : (
                  this.props.doctype == "PICK" &&
                  this.props.viewMode == "documentpanel" && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "10px",
                      }}
                    >
                      <span style={{ width: "90%" }}>
                        <Label className="text-primary">Picker</Label>
                        <Select
                          isDisabled={this.state.document?.dlvystatus !== "8"}
                          value={this.state.selectedOptions}
                          onChange={this.handleChange}
                          options={this.props.pickersList}
                          formatOptionLabel={this.formatOptionLabel}
                          getOptionLabel={(option) =>
                            `${option.code} - ${option.description}`
                          }
                          styles={customStyles}
                        />
                      </span>
                      <span>
                        <Button
                          disabled={this.state.document?.dlvystatus !== "8" || !this.state.pickerChangeFlg}
                          className="mr-1"
                          onClick={this.onSavePickers}
                        >
                          Save
                        </Button>
                      </span>
                    </div>
                  )
                )}
              </div>

              {this.state.document?.dlvystatus !== "8" ? (
                <>
                  <Label className="text-primary" htmlFor="route-select">
                    Route Code :
                  </Label>

                  <span className="ml-1">
                    {this.state.selectedRouteCode &&
                      this.state.selectedRouteCode.label}
                  </span>
                </>
              ) : (
                <>
                  {this.props.doctype == "PICK" &&
                    this.props.viewMode == "documentpanel" && (
                      <div
                        className="mt-2"
                        style={{ width: "100%", fontSize: "16px" }}
                      >
                        {this.props.doctype == "PICK" &&
                          this.props.viewMode == "documentpanel" && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                gap: "10px",
                              }}
                            >
                              <span style={{ width: "90%" }}>
                                <Label
                                  className="text-primary"
                                  htmlFor="route-select"
                                >
                                  Route Code
                                </Label>
                                <Select
                                  isDisabled={
                                    this.state.document?.dlvystatus !== "8"
                                  }
                                  id="route-select"
                                  value={this.state.selectedRouteCode}
                                  options={options} // Pass the formatted options to React Select
                                  onChange={this.setSelectedRouteCode}
                                  placeholder="Select a route"
                                  styles={customStyles}
                                />
                              </span>
                              <span>
                                {/* {this.state.document?.dlvystatus != "8" && ( */}
                                <Button
                                  disabled={
                                    this.state.document?.dlvystatus != "8" || !this.state.routeCodeChangeFlg
                                  }
                                  className="mr-1"
                                  onClick={this.onSaveRouteCode}
                                >
                                  Save
                                </Button>
                                {/* )} */}
                              </span>
                            </div>
                          )}
                      </div>
                    )}
                </>
              )}
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    );
  }
}

//   export default withNamespaces()(DisplayProducts);

export default withNamespaces()(DisplayProducts);
