import { useEffect, useState } from "react";

const CheckBoxDropDownWithSearch = ({ list, onDataSend }) => {
    const [copiedList, setCopiedList] = useState(structuredClone(list));//changing the checked unchecked state in a copied list of the original one
    const [searchString, setSearchString] = useState('');
    const [selectedObjects, setSelectedObjects] = useState(new Map());//For the changing checked and unchecked state
    const [defaultSelectedObjects, setDefaultSelectedObjects] = useState(new Map());//For the initial checked values when the component renders

    //getting the default checked objects once the component renders
    useEffect(() => {
        const tempMap = new Map();
        copiedList.forEach((element) => {
            if (element.checked) {
                tempMap.set(element.id, element.name);
            }
        })
        setSelectedObjects(tempMap);
        setDefaultSelectedObjects(tempMap);
    }, []);

    //sending the data to parent
    const dispatchToParent = () => {
        onDataSend(Object.assign(list,copiedList));
    }
    

    //searching
    const handleSearch = (searchString) => {
        const tempList = list.filter((element) => {
            return element.name.toLowerCase().includes(searchString);
        })
        setCopiedList(tempList);
    }

    //reset to the previous state when the component rendered
    const resetSelection = () => {
        setCopiedList(structuredClone(list));
        setSearchString('');
        setSelectedObjects(defaultSelectedObjects);
    }
    return (
        <div className="w-1/5">
            <div className=" h-12 bg-gray-200 rounded-md flex justify-start items-center px- space-x-2">
                {
                    selectedObjects?.size ?
                        <>
                            {
                                //selected Objects Name Bubble element
                                Array.from(selectedObjects.keys()).slice(0,2).map((key, index) => {
                                    return (
                                        <div key={key} className="bg-white rounded-lg w-fit px-2 mx-2">{selectedObjects.get(key)}</div>
                                    )
                               })
                            }{
                                //on hover , all the selected objects' name will be shown
                                selectedObjects.size > 2 ?
                                    <div className="relative group">...{selectedObjects.size - 2} Others
                                        <div className="absolute hidden top-0 left-32 w-fit whitespace-nowrap text-gray-50 opacity-0 bg-gray-500 group-hover:opacity-100 group-hover:block">
                                            {Array.from(selectedObjects.values()).slice(2).join(', ')}
                                        </div>
                                    </div>
                                    :
                                    null
                                    
                            }
                        </>
                        :
                        null
                }
            </div>
            <div className="max-h-96 overflow-y-auto">
                <input className=" bg-white-50 focus:outline-none h-12 overflow-hidden w-full sticky top-0 my-1 px-2" placeholder="Search..." value={searchString} onChange={(e) => {
                    setSearchString(e.target.value);
                    handleSearch(e.target.value.toLowerCase());
                }
                }></input>
                {copiedList.map((element) => {
                    return (
                        <div key={element.id} className="mt-1 h-12 overflow-hidden  bg-red-200 rounded-md flex justify-start items-center px-4">
                            <input type="checkbox" value={element.checked} checked={element.checked} onChange={(e) => {
                                element.checked = e.target.checked;
                                if (e.target.checked) {
                                    const newEntry = [element.id, element.name];
                                    const tempMap = new Map([newEntry, ...selectedObjects]);//once a element gets checked , by default it will be inserted at the front of the map
                                    setSelectedObjects(tempMap);
                                } else {
                                    const tempMap = new Map(selectedObjects);
                                    tempMap.delete(element.id);
                                    setSelectedObjects(tempMap);
                                }
                            }}></input>{element.name}
                        </div>
                    )
                })}
            </div>
            <div className="flex items-center justify-between px-2 bg-white-300 border border-solid border-gray-400 p-1">
                <p>{selectedObjects.size }/{copiedList.length} selected</p>
                <div >
                    <button className="py-2 px-2 m-1 rounded-md bg-pink-500" onClick={()=>resetSelection()}>Reset</button>
                    <button className="py-2 px-2 m-1 rounded-md bg-pink-500"onClick={()=>dispatchToParent()}>Apply</button>
                </div>
            </div>
        </div>
    )
}
export default CheckBoxDropDownWithSearch;