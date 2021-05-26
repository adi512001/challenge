import React from 'react';
import { useParams } from "react-router-dom";
import ModalForm from '../components/ModalForm';
import { Container, CustomLink, SubscribeButton, PreviousPageButton, Title } from '../CustomComponents';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

interface Props {
    selectedOptions: ({ name: string; })[],
    setSelectedOptions: React.Dispatch<React.SetStateAction<({
        name: string;
    })[]>>;
    users: ({ name: string; })[];
    setUsers: React.Dispatch<React.SetStateAction<{
        name: string;
    }[]>>
}

const Subscribe: React.FC<Props> = (props) => {
    const { id } = useParams<{ id: string }>();

    const { selectedOptions, setSelectedOptions, users, setUsers } = props;

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleClickOpen = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <Container>
            <Title>{id === 'subscribe' ? 'Subscribe' : id}</Title>
            <SubscribeButton variant="contained" color="primary" onClick={handleClickOpen}>Subscribe to our channel</SubscribeButton>
            <PreviousPageButton variant="contained" color="primary"><ArrowBackIcon /><CustomLink to="/"> To the previous page</CustomLink></PreviousPageButton>
            {<ModalForm selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} isOpen={isModalOpen} handleClose={handleClose} users={users} setUsers={setUsers} />}
        </Container>
    )
}

export default Subscribe;