import styled from 'styled-components';
import {View, Text, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

//colors
export const Colors = {
   
    primary: "#60615e", // שמנת
    secondary: "#f1f2eb", // לבן
    tertiary: "#181d29", // שחור
    quaternary: "#dff07a",  // צהוב בהיר
    background: "#ffffff",
    buttontext: "#000000",
    text: "#000000",
    space: "#666875",
    title: "#000000",
    holder: "#9698a3",
    button: "#666b85",
    icon: "#666b85",
    darklight: "#9CA3AF",
    blue: "#0b3054",
    green: "#10B981",
    red: "#EF4444",
    grey: "#6B7280",
    lightBlue: "#4EADBE",
    lightGreen: 'rgba(16, 185, 129, 0.1)',
};

const { background, buttontext, text, space, title, holder, button, icon, primary, secondary, tertiary, quaternary, darklight, blue, green, red, grey, lightBlue, lightGreen } = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight +30}px;
    background-color: ${background};
    
`;

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    background-color: ${background};
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
    padding: 25px;
    padding-top: 10px;   
    justify-content: center;
`;

export const PageLogo = styled.Image`
    width: 250px;
    height: 200px;
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${icon};
    margin-bottom 10px;
    margin-top: 10px;
`;

export const WelcomeImage = styled.ImageBackground`
    height: 50%;
    min-width: 100%;
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${title};
    padding: 10px;

    ${(props) => props.walcome && `
        font-size: 35px;
    `}
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${title};

    ${(props) => props.walcome && `
        margin-bottom: 5px;
        font-weight: normal;
    `}
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${space};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${text};
`;

export const StyledInputLabel = styled.Text`
    color: ${text};
    font-size: 13px; 
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;
export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${button};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;

    ${(props) => props.google == true &&`
        background-color: ${green};
        flex-direction: row;
        justify-content: center;
    `}
`;

export const ButtonText = styled.Text`
    color: ${buttontext};
    font-size: 16px;
    
    ${(props) => props.google == true &&`
        padding-right: 25px;
        padding-left: 25px;

    `}
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
    color: ${(props) => (props.type == 'SUCCESS' ? green : red)};
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${space};
    margin-vertical:10px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${text};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${icon};
    font-size: 15px;
    padding: 10px;
    ${(props) => {
        const { resendStatus } = props;
        if (resendStatus == 'Failed!') {
            return `color: ${Colors.red}`;
        } else if (resendStatus == 'Sent!') {
            return `color: ${Colors.green}`;
        }
    }}
`;

// verification components
export const TopHalf = styled.View`
    flex: 1;
    justify-content: center;
    padding: 20px;
`;

export const IconBg = styled.View`
    width: 250px;
    height: 250px;
    background-color: ${button};
    border-radius: 250px;
    justify-content: center;
    align-items: center;
`;

export const BottomHalf = styled(TopHalf)`
    justify-content: space-around;
`;

export const InfoText = styled.Text`
    color: ${Colors.grey};
    font-size: 15px;
    text-align: center;
`;

export const EmphasizeText = styled.Text`
    font-weight: bold;
    font-style: italic;

`;

export const InlineGroup = styled.View`
    flex-direction: row;
    padding: 10px;
    justify-content: center;
    align-items: center;
`;

// modal styles
export const ModalContainer = styled(StyledContainer)`
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
`;

export const ModalView = styled.View` 
    margin: 20px;
    backgroundColor: white;
    border-radius: 20px;
    padding: 35px;
    align-items: center;
    elevation: 5;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    width: 100%;
`;

// pin input styles
export const CodeInputSection = styled.View`
    flex = 1;
    align-items: center;
    justify-content: center;
    margin-vertical: 30px;
`;

export const HiddenTextInput = styled.TextInput`
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
`;

export const CodeInputContainer = styled.Pressable`
    width: 70%;
    flex-direction: row;
    justify-content: space-between;
`;

export const CodeInput = styled.View`
    border-color: ${Colors.lightBlue};
    min-width: 15%;
    border-width: 2px;
    border-radius: 5px;
    padding: 12px;
`;

export const CodeInputText = styled.Text`
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    color: ${Colors.lightBlue};
`;

export const CodeInputFocused = styled(CodeInput)`
    border-color: ${Colors.green};
`;

// Tab navigation
export const TabArea = styled.View`
    height: 60px;
    background-color: ${button};
    flex-direction: row;
`;

export const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 35px;
    border: 3px solid #4EADBE;
    margin-top: -20px;
`;

// Carousel Images
export const CarouselImage = styled.Image`    
    width: 100%;
    height: 320px;
  

`;
// border-bottom-left-radius: 90px;
// margin-bottom: -90px;
export const SwipeDot = styled.View`
    width: 10px;
    height: 10px;
    background-color: #ffffff;
    border-radius: 5px;
    margin: 3px;
`;

export const SwipeDotActive = styled.View`
    width: 10px;
    height: 10px;
    background-color: #000000;
    border-radius: 5px;
    margin: 3px;
`;

export const PageBody = styled.View`
    background-color: #ffffff;
    min-height: 590px;

`;
//     border-top-left-radius: 80px;
// margin-top: -40px;

// border-top-right-radius: -90px;
// Appointments
export const ModalItem = styled.View`
    borderWidth: 5px;
    border-style: solid;
    border-color: #000000;
    background-color: ${background};
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 10px;
`;

export const DateInfo = styled.View`
    flex-direction: row;
`;

export const DatePrevArea = styled.TouchableOpacity`
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end;
`;

export const DateNextArea = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-start;

`;
export const Repeat = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
    backgroundColor: white;
   

`;

export const DateTitleArea = styled.View`
    width: 140px;
    justify-content: center;
    align-items: center;

`;

export const DateTitle = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #000000;
`;

export const DateList = styled.ScrollView``;

export const DateItem = styled.TouchableOpacity`
    width: 50px;
    justify-content: center;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    align-items: center;
`;

export const DateItemWeekDay = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #000000;
`;

export const DateItemNumber = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #000000;

`;

export const TimeList = styled.ScrollView``;

export const TimeListV = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    

`;

export const TimeItem = styled.TouchableOpacity`
    width: 70px;
    height: 40px;
    justify-content: center;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    align-items: center;
`;

export const TimeItemText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #000000;
`;

export const AppointmentsList = styled.ScrollView`
    height: 500px;
`;

export const AppointmentsItem = styled.TouchableOpacity`
    justify-content: center;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    align-items: center;
`;

export const AppointmentsWeekDay = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #000000;
`;

export const AppointmentsTime = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #000000;

`;

export const DateAppointments = styled.ScrollView``;

export const DateAppointmentsItem = styled.TouchableOpacity`
    height: 50px;
    justify-content: center;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    align-items: center;
`;
export const DateAppointmentsDetails = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #000000;
`;

// export const CheckBoxContainer = styled.View`
//     flex-direction: row;
//     marginVertical: 30;
//     align-items: center;

// `;

// export const Checkbox = styled.CheckBox`
//     width: 30;
//     height: 30;
//     margin-right: 20;
// `;


// export const ServiceArea = styled.View`

// `;

// export const ServiceTitle = styled.Text`

// `;

// export const ServiceItem = styled.View`

// `;

// export const ServiceInfo = styled.View`

// `;

// export const ServiceName = styled.Text`

// `;

// export const ServicePrice = styled.Text`

// `;