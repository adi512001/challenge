import React, { useState } from 'react';
import { Button, Slide, DialogTitle, DialogContent, DialogActions, TextField, Avatar, Chip } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { ModalDialog, CustomForm, SubmitButton, AddUserButton } from '../CustomComponents';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface Props {
    selectedOptions: ({ name: string; })[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<({
        name: string;
    })[]>>;
    isOpen: boolean;
    handleClose: () => void;
    users: ({ name: string; })[];
    setUsers: React.Dispatch<React.SetStateAction<{
        name: string;
    }[]>>
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        purple: {
            color: '#ffffff',
            backgroundColor: '#6519b575',
        }
    }),
);

const ModalForm: React.FC<Props> = (props) => {
    const { selectedOptions, setSelectedOptions, isOpen, handleClose, users, setUsers } = props;

    const [text, setText] = useState('');

    const classes = useStyles();

    const history = useHistory();

    const handleTextChange = (event: React.ChangeEvent<{}>, value: string) => {
        setText(value);
    }

    const handleAddOption = () => {
        setUsers([...users, { name: text }]);
        setSelectedOptions([...selectedOptions, { name: text }]);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleAddOption();
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
        localStorage.setItem('userSubscribed', 'true');
        history.push('/');
    }

    const onChange = (values: (string | { name: string; })[]) => {
        const newValues: ({ name: string; })[] = [];
        values.forEach(value => {
            if (typeof value === 'string') {
                newValues.push({ name: value });
            }
            else if (value.name) {
                newValues.push(value);
            }
        })
        setSelectedOptions(newValues);
    }

    return (
        <ModalDialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>Subscription</DialogTitle>
            <DialogContent>
                <CustomForm
                    onSubmit={handleSubmit}
                >
                    <Autocomplete
                        multiple
                        value={selectedOptions ? selectedOptions : []}
                        onChange={(event, value) => onChange(value)}
                        limitTags={2}
                        options={users}
                        freeSolo
                        getOptionLabel={(option: { name: string }) => option.name}
                        disableCloseOnSelect
                        onKeyDown={handleKeyDown}
                        onInputChange={handleTextChange}
                        renderTags={(tagValue, getTagProps) => {
                            return tagValue.map((option, index) => (
                                <Chip {...getTagProps({ index })} label={option.name}
                                    avatar={<Avatar className={classes.purple}>{option.name?.charAt(0).toUpperCase()}</Avatar>} />
                            ));
                        }}
                        getLimitTagsText={(more: number) =>
                            <Chip label={`${more} more`} />}
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Select users" value={text} />
                        )}
                    />
                    {text !== '' && <AddUserButton variant="contained" color="secondary" onClick={handleAddOption}>{`Add ${text} to the users list`}</AddUserButton>}
                    <SubmitButton variant="contained" color="primary" type="submit">Submit</SubmitButton>
                </CustomForm>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Close
                    </Button>
            </DialogActions>
        </ModalDialog>
    )
}

export default ModalForm;