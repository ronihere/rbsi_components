import { useEffect, useState } from "react";

const CheckBoxDropDownWithSearch = ({ list, onDataSend }) => {
    const [copiedList, setCopiedList] = useState(structuredClone(list));
    const [selectedObjects, setSelectedObjects] = useState(new Map());
    useEffect(() => {
        const tempMap = new Map();
        copiedList.forEach((element) => {
            if (element.checked) {
                tempMap.set(element.id, element.name);
            }
        })
        setSelectedObjects(tempMap);
    }, []);
    const dispatchToParent = () => {
        onDataSend(copiedList);
    }
    const handleSearch = (searchString) => {
        const tempList = list.filter((element) => {
            return element.name.toLowerCase().includes(searchString);
        })
        setCopiedList(tempList);
    }
    return (
        <div className="w-1/5">
            <div className=" h-12 bg-gray-200 rounded-md flex justify-start items-center px- space-x-2">
                {
                    selectedObjects?.size ?
                        <>
                            {
                                Array.from(selectedObjects.keys()).slice(0,2).map((key, index) => {
                                    return (
                                        <div key={key} className="bg-white rounded-lg w-fit p-2">{selectedObjects.get(key)}</div>
                                    )
                               })
                            }{
                                selectedObjects.size > 2 ?
                                    <p>...{selectedObjects.size - 2} Others</p>
                                    :
                                    null
                                    
                            }
                        </>
                        :
                        null
                }
            </div>
            <div className="max-h-96 overflow-y-auto">
                <input className=" bg-yellow-50 focus:outline-none h-12 overflow-hidden w-full sticky top-0 my-1" placeholder="Search..." onKeyUp={(e)=>handleSearch(e.target.value.toLowerCase())}></input>
                {copiedList.map((element) => {
                    return (
                        <div key={element.id} className="mt-1 h-12 overflow-hidden  bg-red-200 rounded-md flex justify-start items-center px-4">
                            <input type="checkbox" value={element.checked} checked={element.checked} onChange={(e) => {
                                element.checked = e.target.checked;
                                if (e.target.checked) {
                                    const newEntry = [element.id, element.name];
                                    const tempMap = new Map([newEntry, ...selectedObjects]);
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
            <div className="flex items-center justify-between px-2 bg-slate-300">
                <p>{copiedList.length} results</p>
                <div >
                    <button className="py-2 px-2 m-1 rounded-md bg-pink-500" onClick={()=>setCopiedList(structuredClone(list))}>Reset</button>
                    <button className="py-2 px-2 m-1 rounded-md bg-pink-500"onClick={()=>dispatchToParent()}>Apply</button>
                </div>
            </div>
        </div>
    )
}
export default CheckBoxDropDownWithSearch;