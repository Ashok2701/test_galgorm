import React, { Component } from 'react';
import { Col, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

const expandRow = {
  renderer: row => (
    <>
      Action :
      <Link to="#" className="me-3 text-primary"><i className="mdi mdi-pencil font-size-18"></i></Link>
      <Link to="#" className="text-danger" ><i className="mdi mdi-trash-can font-size-18"></i></Link>
    </>
  ),
  showExpandColumn: true,
  expandByColumnOnly: true
};

class LatestTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      columns: [
              {
                dataField: 'product',
                text: 'Product'
              },
              {
                dataField: "desc",
                text: "Description"
              },
              {
                dataField: "orderCount",
                text: "Service Orders"
              },
              {
                dataField: "tqty",
                text: "Total Qty"
              },
              {
                dataField: "dqty",
                text: "Delviered Qty"
              }
            ],
      rows : [],
    }
  }

   componentDidUpdate(prevProps) {
          if (prevProps.dash !== this.props.dash) {
            console.log("Some props changed. Rendering...");
          //  ApexCharts.exec('routestatus-pie')

              this.setState({
                  rows : this.props.dash &&  this.props.dash.productDashVOList,

              })

          }
        }




  render() {

    const options = {
      // pageStartIndex: 0,
      hideSizePerPage: false,
      hidePageListOnlyOnePage: false,
      sizePerPageList:
        [{
          text: '5th', value: 5
        }, {
          text: '10th', value: 10
        }, {
          text: 'All', value: this.state.rows && this.state.rows.length
        }]

    };

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true
    };

    return (
      <React.Fragment>
        <Col lg={8}>
          <Card>
            <CardBody>
            
              <h4 className="card-title mb-4">Product Details</h4>
              <div className="table-responsive">

              <BootstrapTable
                keyField='id'
                data={this.state.rows}
                columns={this.state.columns}
                pagination={paginationFactory(options)}

              />
              </div>

            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    );
  }
}

export default LatestTransactions;