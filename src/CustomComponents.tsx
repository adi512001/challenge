import styled from 'styled-components';
import { Dialog, Button, Toolbar, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import ContactlessIcon from '@material-ui/icons/Contactless';

export const Container = styled.div`
height: 80%;
position: relative;
display: flex;
justify-content: center;
align-items: center;
`;

export const LogoContainer = styled.div`
display: flex;
flex-grow: 3;
align-items: center;
`;

export const Card = styled.div`
border-radius: 15px;
width: 40%;
height: 30%;
padding: 15px;
box-shadow: 0px 2px 1px -1px #6519b575, 0px 1px 1px 0px #6519b575, 0px 1px 3px 0px #6519b575;
`;

export const WelcomeCard = styled(Card)`
position: relative;
`;

export const CustomToolbar = styled(Toolbar)`
display: flex;
justify-content: space-between;
`;

export const ModalDialog = styled(Dialog)`
.MuiDialog-paperWidthSm {
    max-width: 50%;
    width: 50%;
    height: 50%;
}
`;

export const CustomLogo = styled.img`
width: 7%;
margin-right: 2%;
`;

export const CustomLink = styled(Link)`
    :visited {
        color: white;
    }
    :link {
        text-decoration: none;
    }
`;

export const CustomButton = styled(Button)`
position: absolute;
    bottom: 0;
    right: 0;
    margin-right: 2%;
.MuiButton-label {
    text-transform: none;
}
`;

export const PreviousPageButton = styled(CustomButton)`
left: 0;
margin-right: 0%;
margin-left: 2%;
`;

export const SubscribeButton = styled(CustomButton)`
position: absolute;
margin: 0;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
height: 10%;
`;

export const AddUserButton = styled(CustomButton)`
position: inherit;
`;

export const SubmitButton = styled(CustomButton)`
position: absolute;
bottom: 10%;
right: 45%;
`;

export const WelcomeTitle = styled.h1`
margin: 0;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

export const Title = styled.h2`
position: absolute;
top: 5%;
`;

export const Message = styled.h3`
text-align: center;
`;

export const CustomForm = styled.form`
height: 100%;
position: relative;
`;

export const CustomP = styled.p`
display: inline;
`;

export const CustomHomeIcon = styled(HomeIcon)`
color: #ffffff;
`;

export const CustomSubscriptionIcon = styled(SubscriptionsIcon)`
color: #ffffff;
`;

export const CustomContactlessIcon = styled(ContactlessIcon)`
font-size: 5em;
`;

export const LogoTypography = styled(Typography)`
font-weight: 900;
`;

export const List = styled.ul`
list-style-type:none;
`;



