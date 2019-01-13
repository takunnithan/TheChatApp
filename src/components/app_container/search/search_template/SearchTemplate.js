import React, { Component } from 'react'
import Backdrop from '../../main/backdrop/Backdrop'
import Modal from '../../main/modal/Modal'
import {disableChatSearch} from '../../../../store/action/action';
import { connect } from 'react-redux';

class SearchTemplate extends Component{

  closeDeleteDialog = (event) => {
        if (this.search_dialog != null) {
        if (!this.search_dialog.contains(event.target)){
            document.removeEventListener('click', this.closeDeleteDialog);
            this.props.showDirectChatSearch(this.props.type);
        }      
        }
    }

    render() {
        return (
            <div >
                <Backdrop show={this.props.show} click={this.closeDeleteDialog}/>
                {
                this.props.show
                ? ( <div ref={(element) => {
                        this.search_dialog = element;
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

const mapDispatchToProps = dispatch => {
    return {
        showDirectChatSearch: (type) => { dispatch(disableChatSearch(type)) }      
        }
    }
export default connect(null, mapDispatchToProps)(SearchTemplate);