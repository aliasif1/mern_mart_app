import ReactDOM from 'react-dom';

const ModalContainer = ({children}) => {
    const portalContainer = document.getElementById('modal-root');
    return ReactDOM.createPortal(children, portalContainer)
}

export default ModalContainer