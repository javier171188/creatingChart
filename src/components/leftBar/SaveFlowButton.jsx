import { AiOutlineDownload } from 'react-icons/ai'
import { useReactFlow } from '../../../../../react-flow/packages/reactflow/dist/esm'


export function SaveFlowButton(){
    const { toObject } = useReactFlow()
    function handleClick(){
        const objFlow = toObject()
        const jsonFlow = JSON.stringify(objFlow)

        const file = new Blob([jsonFlow], {type: 'text/plain'});
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = `flow-${(new Date()).toLocaleDateString()}.json`;
        document.body.appendChild(element);
        // simulate link click
        document.body.appendChild(element);
        // Required for this to work in FireFox
        element.click();
    }
    return <>
        <button style={styles.buttonTag} onClick={handleClick}>
            <AiOutlineDownload/>
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