import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-materialize/lib/Button';

class Modal extends Component {    
    render() {   
        const { title, children, buttons,isShowModal,modalId } = this.props;    
        return (
            <Fragment>
                
                <div  id={modalId} className={isShowModal ? 'modal modelShow ': 'modal'}>
                <div className="modal-content">              
                {title && <h5 >{title}</h5>}
                    {children}
                </div>              
                <div className="modal-footer">
                   {buttons.map((button,i)=>{
                       return( 
                        button.showbtn && <Button className={button.btnClass} onClick={button.action} >{button.name}</Button>
                       );                    
                   })}
                </div>
                </div>                
                { isShowModal && <div className="modalOverlay"></div> }
            </Fragment>
        );
   }
}
export default Modal;
Modal.propTypes = {
    buttons:PropTypes.array
};
Modal.defaultProps = {
    buttons:[] ,    
}; 