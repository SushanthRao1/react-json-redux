import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '45ch',
        },
    },
}));


export const AddUser = () => {
    const classes = useStyles();
    let history = useHistory();
    let dispatch = useDispatch();

    const [state, setState] = useState(
        {
            name: "",
            email: "",
            contact: "",
            address: "",
        });

    const [error, setError] = useState("");

    //below function is to store the state
    const handleInpurChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !address || !email || !contact) {
            setError("Please input all inpur field")
        }
        else {
            dispatch(addUser(state));
            history.push("/");
            setError("");
        }
    };


    const { name, email, contact, address } = state; //destructering the values
    return (
        <div>
            <Button variant="contained" color="secondary" type="submit"
                onClick={() => history.push("/")}>Go Back</Button>
            <h2> Add User</h2>
            {error && <h3 style={{ color: "red" }}>{error}</h3>}
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField id="standard-basic" label="Name" value={name} name="name" type="text" onChange={handleInpurChange} /><br />
                <TextField id="standard-basic" label="Email" value={email} name="email" type="email" onChange={handleInpurChange} /><br />
                <TextField id="standard-basic" label="Contact" value={contact} type="number" name="contact" onChange={handleInpurChange} /><br />
                <TextField id="standard-basic" label="Address" value={address} type="text" name="address" onChange={handleInpurChange} /><br />
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
        </div>
    )
}
