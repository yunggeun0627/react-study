/**
 * Emption(CSS in JS 라이브러리)
 * rsc
 * 1. 라이브러리 설치 -> npm install @emotion/react
 * 2. jsx 태그의 css속성 활성화 -> 주석으로 @jsxImportSource @react/emotion
 * 3. css 객체 import -> css`` 문자열로 css작성
 * 4. 확장프로그램으로 vscode-styled-components 설치
 */

/** @jsxImportSource @emotion/react */
import * as s from './style';
import React from "react";

function Emotion2(props) {

    return (
    <div>
        <div css={s.box1}></div>
        <div css={s.box2("gray")}></div>
    </div>
    );
}

export default Emotion2;