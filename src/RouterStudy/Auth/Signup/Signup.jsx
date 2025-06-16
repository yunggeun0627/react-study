/** @jsxImportSource @emotion/react */
import { CiCircleCheck } from 'react-icons/ci';
import * as s from './styles';
import React, { useEffect, useState } from 'react';
import { MdOutlineCheckCircle, MdOutlineErrorOutline } from 'react-icons/md';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { inputItem } from './styles';

/**
 *  유효성검사Validation Check)
 */

function useSignInAndUpInput({ type, name, placeholder, value, valid }) {
    const STATUS = {
        idle: "idle",
        success: "success",
        error: "error",
    }
    const [ inputvalue, setUnputValue ] = useState(value);
    const [ status, setStatus ] = useState(STATUS.idle); 

    const handleOnChange = (e) => {
        console.log(e.target.value)
        setValue(e.target.value);
    }

    const handleOnBlur = (e) => {
        if(isEmpty(e.target.value)){
            setStatus(STATUS.idle);
            return;
        }

        if(valid.enabled) {
            setStatus(valid.regex.test(e.target.value) ? STATUS.success : STATUS.error);
            return;
        }

        setStatus()
    }

    const isEmpty = (str) => {
        return !/^.+$/.test(str);
    }

    return {
        inputvalue,
        element: <useSignInAndUpInput
            type={type} 
            name={name} 
            placeholder={placeholder} 
            value={value} 
            onChange= {handleOnChange}
            onBlur={handleOnBlur}
            status={status}
            message={valid.defaultMessage} />
    }
}

function SighInAndUpInput({ type, name, placeholder, value, onChange, onBlur, status, message}) {

    return (
        <div css={s.inputItem}>
            <div css={s.inputContainer(status)}>
                <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur}/>
                    {
                        status !== "idle" 
                        && ( 
                            status === "success"
                            ? <div><MdOutlineCheckCircle /></div> 
                            : <div><MdOutlineErrorOutline /></div>
                        )
                    }
                </div>
            <InputValidatedMessage status={status} message={message} />
        </div>
    )
}

function PasswordInputHiddenButton() {
    const [isShow, setShow ] = useState(false);

    const handleOnClick = () => {
        setShow(prev => !prev);
    }
    return <p onClick={handleOnClick}>{isShow ? <IoEyeOff /> : <IoEye />}</p>
}

function useInputValidatedMessage({defaultMessage}) {
    const STATUS  = {
        idle: "idle",
        success: "success",
        error: "error",
    }
    const [ status, setStatus ] = useState(STATUS.idle);
    const [ message, setMessage ] = useState(defaultMessage || "");

    return {
        status,
        setStatus,
        message,
        setMessage,
        element: <InputValidatedMessage status={status} message={message} />
    }
}

function InputValidatedMessage({status, message}) {
    const ERROR = "error";

    if (status === "ERROR") {
        return <div css={s.messageContainer()}>{message}</div>
    }
    
    return <></>
}

function Signup(props) {
    
    const [ inputState, setInputState ] = useState({
        username: {
            value: "",
            message: "아이디는 영문, 숫자를 포함 4~20자여야 합니다.",
            regex: /^(?=.*[a-z])(?=.*\d).{4,20}$/,
            status: "idle", //success(성공), error(오류), idle(초기 대기상태)
        },
        password: {
            value: "",
            message: "비밀번호는 8~20자이며, 영문·숫자·특수문자를 모두 포함해야 합니다.",
            regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,20}$/,
            status: "idle",
        },
        checkPassword: {
            value: "",
            message: "비밀번호가 서로 일치하지 않습니다.",
            status: "idle",
        },
        fullName: {
            value: "",
            message: "이름은 한글 2~20자여야 합니다.",
            regex: /^[가-힣]{2,20}$/,
            status: "idle",
        },
        email: {
            value: "",
            message: "유효하지 않은 이메일 형식입니다.",
            regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            status: "idle",
        },
    });
    
    const [ showPassword, setShowPassword ] = useState(false);
    const [ submitDisabled, setSumbitDisabled ] = useState(true);

    const [ inputs, setInputs ] = useState([
        {
            type: "text",
            name: "username",
            placeholder: "사용자이름",
            value: "",
            valid: {
                regex: /^(?=.*[a-z])(?=.*\d).{4,20}$/,
                message: "비밀번호는 8~20자이며, 영문·숫자·특수문자를 모두 포함해야 합니다.",
            },
        },
        {
            type: "passwod",
            name: "password",
            placeholder: "비밀번호",
            value: "",
            valid: {
                enabled: true,
                regex: /^(?=.*[a-z])(?=.*\d).{4,20}$/,
                message: "아이디는 영문, 숫자를 포함 4~20자여야 합니다.",
            },
        },
        {
            type: "passwod",
            name: "checkPassword",
            placeholder: "비밀번호 확인",
            value: "",
            valid: {
                enabled: false,
                regex: null,
                message: "비밀번호가 서로 일치하지 않습니다.",
            },
        },
    ]);

    const inputItems = inputs.map(input => useSignInAndUpInput(input));

    const handleOnChange = (e) => {
        setInputState(prev => ({
            ...prev,
            [e.target.name]: {
                ...prev[e.target.name],
                value: e.target.value,
            }
        }));
    }

    const handleOnBlur = (e) => {
        if (!/^.+$/.test(inputState[e.target.name].value)) {
                setInputState(prev => ({
                 ...prev,
                [e.target.name]: {
                    ...prev[e.target.name],
                    status: "idle",
                }
            }));
            return;
        }

        if (e.target.name === "checkPassword") {
            if(inputState.password.status === "sucess") {
                setInputState(prev => ({
                    ...prev,
                    checkPassword: {
                        ...prev["checkPassword"],
                        status: prev["checkPassword"].value === prev["password"].value ? "success" : "error",
                }
                }));
            }
            return;
        }

        setInputState(prev => ({
            ...prev,
            [e.target.name]: {
                ...prev[e.target.name],
                status: prev[e.target.name].regex.test(prev[e.target.name].value) ? "success" : "error",
            }
        }));
    }

    useEffect(() => {
        setSumbitDisabled(!!Object.values(inputState).map(obj => obj.status).find(status => status !== "success"));
    }, [inputState]);

    return (
        <div css={s.layout}>
            <div css={s.container}>
                <h1 css={s.title}>회원가입</h1>
                {
                    inputItems.map(inputItem => inputItem.element)
                }
            </div>
            <button css={s.submitButton} disabled={submitDisabled}>가입하기</button>
        </div>   
    );
}

export default Signup;

/**
 * username, password, checkpassword, fullname(한글), email
 * javascript 정규표현식을 각각 만들어주고 error메서지도 만들어줘
 */