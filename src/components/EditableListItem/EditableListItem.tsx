import React from 'react';
import styles from './EditableListItem.module.scss';
import EditModal from '../EditModal';
import moment from 'moment';

type EditableListItemProps = {
    item: { url: string, id: number, tags: string, authorName: string,title: string, createdAt: string },
    removeItem: (id: number) => void,
    updateItem: (id: number, url: string, tags: string) => void
}

export class EditableListItem extends React.Component<EditableListItemProps> {



    render() {
        const {url, id, tags, authorName, title, createdAt} = this.props.item
        return (
            <tr>
                <th scope="row">
                    {id}
                </th>
                <th scope="row">
                    {url}
                </th>
                <th scope="row">
                    {tags}
                </th>
                <th scope="row">
                    {authorName}
                </th>
                <th scope="row">
                    {title}
                </th>
                <th scope="row">
                    {moment(createdAt).format('YYYY-MM-DD')}
                </th>

                <th scope="row">
                    <button className={styles.delete}
                            onClick={() => this.props.removeItem(id)}>&#x2718;</button>
                </th>
                <th scope="row">
                    <EditModal
                        id={id}
                        url={url}
                        tags={tags}
                        updateItem={this.props.updateItem}/>
                </th>
            </tr>
        )
    }
}

export default EditableListItem;