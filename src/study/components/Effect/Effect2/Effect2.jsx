/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";

const aa = (p1, p2) => css`
    display: flex;
    box-sizing: border-box;
    border: 5px solid ${p2 ? "green": "#222"};
    width: 200px;
    height: 200px;
    background-color: ${p1 ? "red" : "blue"};
`;

function Effect2(props) {
    const [ flag, setflag ] = useState(false);

    const handleOnClick = () => {
        setflag(prev => !prev);
    }

    return(<div>
        <div css={aa(flag, !flag)}>
        <button onClick={{handleOnClick}}>변경</button>
        </div>
    </div>
    );
}

export default Effect2;

// npm i @emotion/react, styled 설치
// "emotion": {
// 		"prefix": "ej",
// 		"body": [
// 			"/** @jsxImportSource @emotion/react */",
// 			"import * as s from './style';"
// 		],
// 		"description": "이모션 쉽게 쓸라고 만듬."
// 	}