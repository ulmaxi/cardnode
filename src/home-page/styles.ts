import { makeStyles } from '@material-ui/core/styles';

const bgImgUrl = process.env.PUBLIC_URL + '/images/family-2791811_1920.jpg'

export const Theme = makeStyles(theme => {
    console.log(theme.breakpoints.between('xs', 'sm'));
    console.log(theme.breakpoints.up('sm'));
    return {
        root: {
            height: '90vh',
        },
        image: {
            backgroundImage: `url(${bgImgUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor:
                theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
        }
    }
});
