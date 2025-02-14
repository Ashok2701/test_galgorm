import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class DisplayProducts extends React.Component {

      documentBadgeLink = (docno, dtype) => {
              const docmvt = dtype;
              let url, content;

              if (docmvt == 'PICK') {
                   url = "https://tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/DEMOTMSFR/$sessions?f=GESPRH2/2//M/"+docno;
                                       // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                                   return (
                                            <a href={url} target='_blank'>{docno} </a>
                   );
              }
              if (docmvt == 'DLV') {

                       url = "https://tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/DEMOTMSFR/$sessions?f=GESSDH/2//M/"+docno;
                      // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                  return (
                           <a href={url} target='_blank'>{docno} </a>
                  );
              }
              if (docmvt == 'PRECEIPT') {
                   url = "https://tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/DEMOTMSFR/$sessions?f=GESXX10CPTH/2/M//"+docno;
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
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Product Details ({this.documentBadgeLink(this.props.docNum, this.props.doctype)})
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table class="table table-striped m-0">
                    <thead>
                        <tr class="">
                             <th width="6%">prodcode</th>
                             <th width="10%">prodname</th>
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
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default DisplayProducts;