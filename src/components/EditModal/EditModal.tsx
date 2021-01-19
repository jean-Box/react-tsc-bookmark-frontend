import React from 'react';
import TextInput from "../TextInput";

import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

type EditModalProps = {
    id: number,
    url: string,
    tags: string,
    updateItem: (id: number, url: string, tags: string) => void
};

type EditModalState = {
    newUrl: string,
    newTags: string,
    isOpen:  boolean
}

export class EditModal extends React.Component<EditModalProps, EditModalState> {

    state: EditModalState = {
        newUrl: this.props.url,
        newTags: this.props.tags,
        isOpen: false
    };


    handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({newUrl: event.target.value})
    }
    handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({newTags: event.target.value})
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.updateItem(this.props.id, this.state.newUrl, this.state.newTags)
        this.setState({newUrl: '', newTags: '', isOpen: false});
    }

    showModal = () => {
        this.setState({isOpen: true})
    };

    hideModal = () => {
        this.setState({isOpen: false})
    };


    render() {
        return (
            <>
                <button className="btn" onClick={this.showModal}>&#x270e;</button>
                <Modal show={this.state.isOpen} onHide={this.hideModal}>
                    <Modal.Header>Update Bookmark</Modal.Header>
                    <form onSubmit={this.handleSubmit}>
                        <Modal.Body>
                            URL : <TextInput defaultValue={this.props.url} onChange={this.handleUrlChange}/>
                            Tags: <TextInput defaultValue={this.props.tags} onChange={this.handleTagChange}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-secondary" onClick={this.hideModal}>Close</button>
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        )
    }
}

export default EditModal;