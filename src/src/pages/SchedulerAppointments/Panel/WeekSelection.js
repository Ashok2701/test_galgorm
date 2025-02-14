import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';


function CheckBoxList ({options, isCheckedAll, onCheck}) {
                const checkBoxOptions = (
                    <div className="checkbox-list">
                        {options.map((option, index) => {
                            return (
                                <CheckBox key={index} name={option.name} value={option.value} tick={option.checked} onCheck={(e) => onCheck(option.value, e.target.checked)} />
                            );
                        })}
                    </div>
                );

                return (
                    <div className="checkbox-list">
                        <CheckBox name="select-all" value="ALL" tick={isCheckedAll} onCheck={(e) => onCheck('all', e.target.checked)} />
                        {checkBoxOptions}
                    </div>
                );
            }


function CheckBox({name, value, tick, onCheck}) {
                return (
                    <label>
                        <input
                            name={name}
                            type="checkbox"
                            value={value}
                            checked={tick || false}
                            onChange={onCheck}
                        />
                        {value}
                    </label>
                );
            }



class WeekSelection extends React.Component {

constructor(props)
{
  super(props);
  this.state = {
 isAllSelected: false,
                        checkList: [
                            {
                                name: "Monday",
                                value: "1",
                                checked: false,
                            },
                            {
                                name: "Tuesday",
                                value: "2",
                                checked: false,
                            },
                            {
                                name: "Wednesday",
                                value: "3",
                                checked: false,
                            },
                            {
                                 name: "Thursday",
                                 value: "4",
                                 checked: false,
                              },
                             {
                                   name: "Friday",
                                   value: "5",
                                   checked: false,
                              }
                        ]
                    }
  }

       onCheckBoxChange(checkName, isChecked) {
                    let isAllChecked = (checkName === 'all' && isChecked);
                    let isAllUnChecked = (checkName === 'all' && !isChecked);
                    const checked = isChecked;

                    const checkList = this.state.checkList.map((day, index) => {
                        if(isAllChecked || day.value === checkName) {
                            return Object.assign({}, day, {
                                checked,
                            });
                        } else if (isAllUnChecked) {
                            return Object.assign({}, day, {
                                checked: false,
                            });
                        }

                        return day;
                    });

                    let isAllSelected = (checkList.findIndex((item) => item.checked === false) === -1) || isAllChecked;

                    this.setState({
                        checkList,
                        isAllSelected,
                    });

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
                    Please choose the below days to consider
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <CheckBoxList options={this.state.checkList} isCheckedAll={this.state.isAllSelected} onCheck={this.onCheckBoxChange.bind(this)} />);
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => this.props.confirmDelete(this.props.index, this.props.docnum)}>{'Yes'}</Button>
                <Button onClick={this.props.onHide}>{'No'}</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default  withNamespaces()(WeekSelection);