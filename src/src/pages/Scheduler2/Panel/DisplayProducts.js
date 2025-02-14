import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';

class DisplayProducts extends React.Component {

      documentBadgeLink = (docno, dtype) => {
              const docmvt = dtype;
              let url, content;

                   url = "https://tmsx3.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSDEVN/$sessions?f=GESSRE/2//M/"+docno;
                                       // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                                   return (
                                            <a href={url} target='_blank'>{docno} </a>
                   );
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
                    {this.props.t('Product Details')} ({this.documentBadgeLink(this.props.docNum, this.props.doctype)})
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table class="table table-striped m-0">
                    <thead>
                        <tr class="">
                             <th width="6%">{this.props.t('prodcode')}</th>
                             <th width="10%">{this.props.t('prodname')}</th>
                             <th width="6%">{this.props.t('qty')}</th>
                             <th width="6%">{this.props.t('UOM')}</th>
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
                <hr />
                <h4>Skills : {this.props.skills}</h4>

                {(() => {
                    if (this.props.products.length <= 0) {
                        return (
                            <div class="col-md-12">
                                Products List is Empty
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

export default withNamespaces()(DisplayProducts);