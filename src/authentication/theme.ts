import { makeStyles } from '@material-ui/core/styles';

export const Theme = makeStyles(theme => ({
    root: {
        height: '90vh',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    centeredPaper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyItems: 'center',
        padding: '15vh 5vw',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        // margin: theme.spacing(3, 0, 2),
    },
}));
