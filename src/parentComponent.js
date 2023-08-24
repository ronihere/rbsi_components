import React, { useState, useEffect } from "react";
import {options} from "./utils";
import DropDownWithSearch from "./dropdownwithsearch";
import CheckBoxDropDownWithSearch from "./checkboxDropdownWithSearch";

const ParentComponent = () => {
  const [selectedData, setSelectedData] = useState(options[0]);
  useEffect(() => {
  }, [selectedData]);
  const handleSelected = (data) => {
    setSelectedData(data);
    console.log(":::THE DATA RECEIVED from DropDownWithSearch:::", data);
  };

  const handleDataRecieved = (data) => {
    alert(JSON.stringify(data));
    console.log('Data Recieved from CheckBoxDropDownWithSearch:::', data);
  }
  return (
    <>
    {/* <DropDownWithSearch
      options={options}
      onSelectComponent={handleSelected}
      selected={selectedData}
    /> */}
      <CheckBoxDropDownWithSearch list={options.slice(10)} onDataSend={handleDataRecieved} />
      </>
  );
};
export default ParentComponent;
