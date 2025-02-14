import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';

// x3 link from .env
const x3Url = process.env.REACT_APP_X3_URL;

class DisplayProducts extends React.Component {

    documentBadgeLink = (docno, dtype) => {
        const docmvt = dtype;
        let url, content;

        if (docmvt == 'PICK') {
            url = { x3Url } + "/$sessions?f=GESPRH2/2//M/" + docno;
            // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
            return (
                <a href={url} target='_blank'>{docno} </a>
            );
        }
        if (docmvt == 'DLV') {

            url = { x3Url } + "/$sessions?f=GESSDH/2//M/" + docno;
            // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
            return (
                <a href={url} target='_blank'>{docno} </a>
            );
        }
        if (docmvt == 'PRECEIPT') {
            url = { x3Url } + "/$sessions?f=GESXX10CPTH/2/M//" + docno;
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
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Product Details ({this.documentBadgeLink(this.props.docNum, this.props.doctype)})
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
                                <th width="10%">{this.props.t('lineno')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(this.props.products || []).map((product) => {

                                return (
                                    <tr>
                                        <td width="6%">{product.productCode}</td>
                                        <td width="10%">{product.productName}</td>
                                        <td width="6%">{product.quantity}</td>
                                        <td width="6%">{product.uom}</td>
                                        <td width="10%">{product.docLineNum}</td>
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

export default withNamespaces()(DisplayProducts);