import React from 'react';
import {Modal, Button} from 'react-bootstrap';



/*
   url = "https://burbanprod-x3.ccsage.gfi.fr/syracuse-main/html/main.html?url=/trans/x3/erp/BURV12PRD_BURPILOT/$sessions?f=GESPRH2/2//M/"+docno;
   url = "https://burbanprod-x3.ccsage.gfi.fr/syracuse-main/html/main.html?url=/trans/x3/erp/BURV12PRD_BURPILOT/$sessions?f=GESSDH/2//M/"+docno;
 url = "https://burbanprod-x3.ccsage.gfi.fr/syracuse-main/html/main.html?url=/trans/x3/erp/BURV12PRD_BURPILOT/$sessions?f=GESXX10CPTH/2/M//"+docno;

   url = "https://galgormx3.cpio.cloud/syracuse-main/html/main.html?url=/trans/x3/erp/TEST/$sessions?f=GESPRH2/2//M/"+docno;


*/

class DisplayProducts extends React.Component {

      documentBadgeLink = (docno, dtype) => {
              const docmvt = dtype;
              let url, content;

              if (docmvt == 'PICK') {
                   url = "https://galgormx3.cpio.cloud/syracuse-main/html/main.html?url=/trans/x3/erp/TEST/$sessions?f=GESPRH2/2//M/"+docno;
                                       // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                                   return (
                                            <a href={url} target='_blank'>{docno} </a>
                   );
              }
              if (docmvt == 'DLV') {

                       url = "https://galgormx3.cpio.cloud/syracuse-main/html/main.html?url=/trans/x3/erp/TEST/$sessions?f=GESSDH/2//M/"+docno;
                      // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                  return (
                           <a href={url} target='_blank'>{docno} </a>
                  );
              }
              if (docmvt == 'PRECEIPT') {
                   url = "https://galgormx3.cpio.cloud/syracuse-main/html/main.html?url=/trans/x3/erp/TEST/$sessions?f=GESXX10CPTH/2/M//"+docno;
                                       // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                                   return (
                                            <a href={url} target='_blank'>{docno} </a>
                                   );
              }
          }

    render() {

        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    prodList ({this.documentBadgeLink(this.props.docnum, this.props.doctype)})
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table class="table table-striped m-0">
                    <thead>
                        <tr class="">
                             <th width="6%">prodcode</th>
                             <th width="10%" style={{textAlign : "left"}}>prodname</th>
                             <th width="6%">qty</th>
                             <th width="6%">UOM</th>
                             <th width="10%">lineno</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.props.products || []).map((product) => {

                            return (
                                <tr>
                                    <td width="6%">{ product.productCode}</td>
                                    <td width="10%">{ product.productName}</td>
                                    <td width="6%">{ product.quantity}</td>
                                    <td width="6%">{ product.uom}</td>
                                    <td width="10%">{ product.docLineNum}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <hr class="m-0 p-0" />
                {(() => {
                    if (this.props.products.length <= 0) {
                        return (
                            <div class="col-md-12">
                                No trailers are configured, you can configure up to 2 trailers
                            </div>
                        );
                    }
                })()}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.warningWindowClose}>Close</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default DisplayProducts;