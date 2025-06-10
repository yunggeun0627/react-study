import { useState } from "react";

function InputState1() {
    const [ inputValue, setInputValue ] = useState("");
    const [ h1Text, seth1Text ] = useState("");

    const [ inputValue2, setInputValue2 ] = useState("");
    const [ h1Text2, seth1Text2 ] = useState("");

    console.log("렌더링");

    
    const headleOnChange = (e) => {
        console.log(e);
        setInputValue(e.target.value);      // e.target.value = event객체
    }

    const headleOnChange2 = (e) => {
        setInputValue2(e.target.value);
    }
    
    const headleOnClick = () => {
        seth1Text(inputValue);
        seth1Text2(inputValue2);
    }

    return <div>
        <h1>{h1Text}</h1>
        <h1>{h1Text2}</h1>
        <input className="input" type="text" value={inputValue} onChange={headleOnChange} />
        <input className="input" type="text" value={inputValue2} onChange={headleOnChange} />
        <button onClick={headleOnClick}>확인</button>
    </div>
}

export default InputState1;