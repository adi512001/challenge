import React from 'react';
import { CustomLink, CustomButton, CustomP, Container, Title, Message, Card, WelcomeCard, WelcomeTitle } from '../CustomComponents';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

interface Props {
    selectedOptions: ({ name: string; })[];
    userSubscribed: string;
}

const Home: React.FC<Props> = (props) => {

    const { selectedOptions, userSubscribed } = props;

    return (
        <Container>
            <Title>Home</Title>
            {userSubscribed !== 'false' && selectedOptions?.length > 0 ?
                <Card>
                    <h3>You selected these users:</h3>
                    {selectedOptions?.map((option, index) => <CustomP key={index + option.name}>{index === selectedOptions.length - 1 ? option.name : `${option.name}, `}</CustomP>)}
                    <Message>User subscribed</Message>
                </Card>
                :
                <WelcomeCard>
                    <WelcomeTitle>Welcome!</WelcomeTitle>
                </WelcomeCard>
            }
            <CustomButton variant="contained" color="primary"><CustomLink to="/subscribe">To the next page </CustomLink><ArrowForwardIcon /></CustomButton>
        </Container>
    )
}

export default Home;