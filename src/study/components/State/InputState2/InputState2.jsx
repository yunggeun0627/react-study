import { useState } from "react";

function InputState2() {
    const [ inputValue, setInputValue ] = useState({
        t1: "",
        t2: "",
        t3: "",
    });

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(`name: ${name}, value: ${value}`);

        const newInputValue = {
            ...inputValue,
            [name]: value,
        }

        setInputValue(newInputValue);

        const addr = "address";
        const address = "부산 북구";
        
        const obj  = {
            name: "예영근",
            age: 21,
            ["address"]: address,
            address: "부산 부산진구",
        }
        
        // const obj2 = obj;    얇은 복사
        
        // const obj2  = {
        //     name: "예영근",
        //     age: 21,             깊은 복사
        //     ["address"]: address,
        //     address: "부산 부산진구",
        // }

        const obj2 = {
            ...obj,                 // spread, spread에서 남은 값은 rest
            address: "부산 해운대구"             
        };
    }


    return <div>
        <input type="text" name="t1" value={inputValue.t1} onChange={handleOnChange}/>     
        <input type="text" name="t2" value={inputValue.t2} onChange={handleOnChange}/>
        <input type="text" name="t3" value={inputValue.t3} onChange={handleOnChange}/>

        <input type="text" value={inputValue.t1} onChange={(e) => {console.log(e)}}/>
        <input type="text" value={inputValue.t2} onChange={(e) => {console.log(e)}}/>
        <input type="text" value={inputValue.t3} onChange={(e) => {console.log(e)}}/>
    </div>
}

export default InputState2;