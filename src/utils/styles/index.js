import {colors} from '../colors'

const styles = {
    wrapper: {
        page: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            flex: 1,
        },
        ilustration: {
            width: 250,
            height: 178,
            marginBottom: 7,
        },
    },
    text: {
        welcome: {
            fontSize: 15,
            fontWeight: 'bold',
            color: colors.default,
            marginBottom: 46,
        },
    },

    form:{   
        label:{
            fontSize: 16,
            color: colors.default,
            marginBottom: 10
        },

        formGroup:{
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,

        },
        formControl:{
            height: 43,
            fontSize: 14,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#eaeaea',
            backgroundColor: '#fafafa',
            paddingLeft: 10,
            marginLeft: 15,
            marginRight: 15,
            marginTop: 5,
            color: 'black',
            marginBottom: 5,
        }

    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
};

export default styles