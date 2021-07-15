import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, loadUsers } from '../redux/actions';
import { Button, ButtonGroup } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


const useButtonStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

/*function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}*/

/*const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];*/

const useStyles = makeStyles({
    table: {
        marginTop: 100,
        minWidth: 900,
    },
});


const Home = () => {
    const classes = useStyles();
    const buttonStyles = useButtonStyles();
    let history = useHistory();
    let dispatch = useDispatch();  //dispatch an action, to check the reducer will store the uesr details or not

    ///To  fetch state of the store use useSelector
    const { users } = useSelector(state => state.data) //users data destructured from ror-reducres

    useEffect(() => {   ///to make the API call
        dispatch(loadUsers());
    }, [dispatch])
    const handleDelete = (id) => {
        if (window.confirm("Are you sure wanted to delete the user?")) {
            dispatch(deleteUser(id))
        }
    }
    return (<>
        <div>
            <Button variant="contained" color="primary"
                onClick={() => { history.push("/addUser") }}>  {/*add user is a new router page*/}
                Add User
            </Button></div>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>User Name</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Contact</StyledTableCell>
                        <StyledTableCell align="center">Address</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users && users.map((user) => (
                        <StyledTableRow key={user.id}>
                            <StyledTableCell component="th" scope="row">
                                {user.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{user.email}</StyledTableCell>
                            <StyledTableCell align="center">{user.contact}</StyledTableCell>
                            <StyledTableCell align="center">{user.address}</StyledTableCell>
                            <StyledTableCell align="center">
                                <div className={buttonStyles.root}>
                                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                        <Button
                                            onClick={() => { history.push(`/editUser/${user.id}`) }}>Edit</Button>
                                        <Button color="secondary"
                                            onClick={() => handleDelete(user.id)}>Delit</Button>
                                    </ButtonGroup>
                                </div>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
    )
}

export default Home
