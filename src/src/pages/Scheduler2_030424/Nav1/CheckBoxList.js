 import React, { useState } from "react";
 import Checkbox from "@material-ui/core/Checkbox";


 function CheckBoxList1 ({options, isSelectedAll, onCheck}) {
                const checkBoxOptions = (
                    <div className="checkbox-list">
                        {options.map((option, index) => {
                            return (
                                <Checkbox key={index} name={option.codeyve} value={option.codeyve} tick={option.checked} onCheck={(e) => onCheck(option.codeyve, e.target.checked)} />
                            );
                        })}
                    </div>
                );
}

export default CheckBoxList1;