import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    // root: {
    //     maxWidth: '100%',
    // },
    // media: {
    //     height: 0,
    //     paddingTop: '56.25%',

    // },
    // cardActions: {
    //     display: 'flex',
    //     justifyContent: 'flex-end',

    // },
    // cardContent: {
    //     display: 'flex',
    //     justifyContent: 'space-between',

    // },
    // content: {
    //     width: '100%',

    // }
    root: {
        // maxWidth: 345, original width style
        maxWidth: '100%',
    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9,
        marginTop: '30',
        backgroundSize: 'cover',

    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));