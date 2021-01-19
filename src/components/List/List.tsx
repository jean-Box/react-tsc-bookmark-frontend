import React from 'react';
import EditableListItem from '../EditableListItem';

export type ListProps = {
    items: { url: string, id: number, tags: string, authorName: string,title: string, createdAt: string }[],
    removeItem: (id: number) => void,
    updateItem: (id: number, url: string, tags: string) => void
}

const List: React.FC<ListProps> = ({items, removeItem,updateItem }: ListProps) => {
    return (
        <table  className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">URL</th>
                    <th scope="col">titre</th>
                    <th scope="col">auteur</th>
                    <th scope="col">date d'ajout</th>
                    <th scope="col">delete</th>
                    <th scope="col">edit</th>
                </tr>
            </thead>
            <tbody>
            {items.map(item =>
                <EditableListItem item={item} key={item.id} removeItem={removeItem} updateItem={updateItem}/>
            )}
            </tbody>
        </table >
    )
}

export default List;