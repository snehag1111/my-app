import { FocusTrap } from "focus-trap-react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import ReactDOM from 'react-dom';

    const Dialog = ({ title, children, onClose }) => {

        const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    dialog: {
        backgroundColor: 'rgb(41 38 38)',
        width: '700px',
        maxWidth: '90%',
        animation: 'fadeIn 0.3s ease-out',
        padding: '40px',
        height: '600px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        color: '#dcdada',
        fontSize: '24px',
    },
    title: {
        flex: 1,
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        color: '#999',
    },
    body: {
        padding: '16px',
        color: 'rgb(174 60 60)',
        fontSize: '20px',
        height: '600px',
    },
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return ReactDOM.createPortal(
        <div style={styles.overlay}>
            <FocusTrap
                focusTrapOptions={{
                    fallbackFocus: '#fallback-node',
                }}>
            <div id="fallback-node" style={styles.dialog} className="fade-in">
                <div style={styles.header}>
                    <div style={styles.title}>{title}</div>
                    <button style={styles.closeButton} onClick={onClose} aria-label="Close Dialog">
                        x
                    </button>
                </div>
                <div style={styles.body}>
                    {children}
                </div>
            </div>
            </FocusTrap>
        </div>,
        document.body
    );
};

Dialog.propTypes = {
    title: PropTypes.oneOf([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Dialog;