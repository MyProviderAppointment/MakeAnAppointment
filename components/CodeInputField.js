import React, { useState, useRef, useEffect } from "react";

import {
    CodeInputSection,
    HiddenTextInput,
    CodeInputContainer,
    CodeInput,
    CodeInputText,
    CodeInputFocused,
} from './styles';

const CodeInputField = ({ setPinReady, code, setCode, maxLength }) => {
    const CodeDigitsArray = new Array(maxLength).fill(0);
    const textInputRef = useRef(null);
    
    const handleOnPress = () => {
        setInputContainerIsFocused(true);
        textInputRef?.current?.focus();
    };

    const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);
    
    const handleOnBlur = () => {
        setInputContainerIsFocused(false);
    };
    
    useEffect(() => {
        setPinReady(code.length === maxLength);
        return () => setPinReady(false);
    }, [code]);

    const toCodeDigitInput = (_value, index) => {
        const emptyInputChar = ' ';
        const digit = code[index] || emptyInputChar;

        const isCurrentDigit = index === code.length;
        const isLastDigit = index === maxLength - 1;
        const isCodeFull = code.length === maxLength;

        const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

        const StyledCodeInput = inputContainerIsFocused && isDigitFocused ? CodeInputFocused : CodeInput;
        
        return (
            <StyledCodeInput key={index}>
                <CodeInputText>{digit}</CodeInputText>
            </StyledCodeInput>
        );
    };

    return (
        <CodeInputSection>
            <CodeInputContainer onPress={handleOnPress}>
                {CodeDigitsArray.map(toCodeDigitInput)}
            </CodeInputContainer>
            <HiddenTextInput 
                ref={textInputRef}
                value={code}
                onChangeText={setCode} 
                onSubmitEditing={handleOnBlur}
                keyboardType="number-pad"
                returnKeyType="done"
                textContentType="oneTimeCode"
                maxLength={maxLength}
            />
        </CodeInputSection>
    );
};

export default CodeInputField;