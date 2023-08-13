import React, { useState, useEffect } from "react";

const DropDownWithSearch = ({ options, selected, onSelectComponent }) => {
  const [demoList, setDemoList] = useState(options);
  const [selectedOption, setSelectedOption] = useState(selected);
  const [listDisplay, setListDisplay] = useState(false)
  useEffect(() => {
    onSelectComponent(selectedOption);
  }, [selectedOption]);
  const handleSelect = (e) => {
    setSelectedOption(JSON.parse(e?.target?.dataset?.detail));
  }
  const searchList = (str) => {
    const searchedList = options.filter((ele) => {
      return ele.name?.toLowerCase().includes(str.toLowerCase());
    })
    // console.log(searchedList)
    setDemoList(searchedList);
  }
  return (
    <>
      <div className="dropdownwithsearch w-fit">
        <div className="text-xl bg-pink-50 w-fit relative pr-4">
          <div className={`bg-gray-50 bg-pink-50 p-2 w-52 border-2 border-pink-200 focus:outline-none `} onClick={() => setListDisplay(!listDisplay)}>{selectedOption.value}</div>
        </div>
        {listDisplay && <div className="max-h-64 overflow-y-auto mb-10" >
          <input className="w-52 focus:outline-none" placeholder="Search..." onChange={(e)=>searchList(e.target.value)} />
          {demoList.map((option) => (
            <div key={option?.id} data-detail={JSON.stringify(option)} className={` bg-pink-50 p-2 w-52 border-2 ${option.id === selectedOption.id ? 'border-black' : 'border-pink-200'}`} onClick={(e) => handleSelect(e)}>{option.value}</div>
          ))}
        </div>}
      </div>
    </>
  );
};
export default DropDownWithSearch;
