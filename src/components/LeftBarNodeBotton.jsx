import {MdOutlineRectangle} from 'react-icons/md'


export function LeftBarNodeButton({onClick}){
    return <>
        <button style={styles.buttonTag} onClick={onClick}>
            <MdOutlineRectangle/>
        </button>
    </>
}

const styles = {
    buttonTag:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin: 10,
        borderRadius: 12,
        width: 28,
        height: 28,
        padding:0
    }
}