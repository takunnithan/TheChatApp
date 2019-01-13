import React, { Component } from 'react'
import Backdrop from '../../backdrop/Backdrop'
import Modal from '../../modal/Modal'

class SearchTemplate extends Component{


    constructor(props) {
        super(props);
        this.state = {
          showDelete: true,
        };
    }


  closeDeleteDialog = (event) => {
        if (this.delete_dialog != null) {
        if (!this.delete_dialog.contains(event.target)){
            this.setState({ showDelete: false }, () => {
            document.removeEventListener('click', this.closeDeleteDialog);
            });  
        }      
        }
    }


    render() {
        return (
            <div >
                <Backdrop show={this.state.showDelete} click={this.closeDeleteDialog}/>
                {
                this.state.showDelete
                ? ( <div ref={(element) => {
                        this.delete_dialog = element;
                        }}>
                        <Modal>
                            {this.props.children}
                        </Modal>
                    </div>
                    )
                :(null)
                }
            </div>

        )

    }
}

export default SearchTemplate;