import React, { useState, useEffect } from "react";
import options from "./utils";
import DropDownWithSearch from "./dropdownwithsearch";

const ParentComponent = () => {
  const [selectedData, setSelectedData] = useState(options[0]);
  useEffect(() => {
    // console.log(':::FROM PAPA COMPONENET USEEFFECT__> selectedData', selectedData);
  }, [selectedData]);
  const handleSelected = (data) => {
    setSelectedData(data);
    console.log(":::FROM PAPA COMPONENT, THE DATA RECEIVED IS:::", data);
  };
  return (
    <DropDownWithSearch
      options={options}
      onSelectComponent={handleSelected}
      selected={selectedData}
    />
  );
};
export default ParentComponent;
