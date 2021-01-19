import React from 'react';
import Button from '../Button';
import TextInput from '../TextInput';
import List from '../List';
import axios, {AxiosResponse} from "axios";

type BookmarkItemProps = {
    id: number,
    url: string,
    tags: string,
    authorName: string,
    title: string,
    createdAt: string,
}

type BookmarkItemState = {
    bookmarkItems: [],
    inputText: string,
    inputTags: string,
    submitDisabled: boolean
}

class BookmarkList extends React.Component {
    constructor(props: any) {
        super(props);
        this.getBookmarks()
    }

    private bookmarkAPI: string = 'http://127.0.0.1:5000/bookmark/';

    public state: BookmarkItemState = {
        bookmarkItems: [],
        inputText: '',
        inputTags: '',
        submitDisabled: true
    }

    componentDidMount() {
        if (this.state.bookmarkItems.length !== 0) {
            Promise.all([
                this.postBookmark('https://www.flickr.com/photos/bees/9458825659/', 'Apple iPhone 5, ƒ/2.4'),
                this.postBookmark('https://www.flickr.com/photos/bees/9461606962/', 'Apple iPhone 4, ƒ/2.4'),
            ]).catch(err => console.log(err))
        }
    }

    async getBookmarks(): Promise<void> {
        await axios.get(this.bookmarkAPI,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response: AxiosResponse<[BookmarkItemProps]>) => {
            response.data.forEach((data: BookmarkItemProps) => {
                const id: number = data.id
                const url: string = data.url
                const tags: string = data.tags
                const authorName: string = data.authorName
                const title: string = data.title
                const createdAt: string = data.createdAt
                this.setState({bookmarkItems: [{id,url, tags,authorName, title, createdAt}, ...this.state.bookmarkItems], submitDisabled: true})
            })
        }).catch(err => alert(err));
    }

    async postBookmark(url: string, tags: string): Promise<void> {
        await axios.post(this.bookmarkAPI,
            {
                url, tags
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response: AxiosResponse<BookmarkItemProps>) => {
            const url: string = response.data.url
            const tags: string = response.data.tags
            const id: number = response.data.id
            this.setState({bookmarkItems: [{url, id, tags}, ...this.state.bookmarkItems], submitDisabled: true});
        }).catch(err => {
            throw new Error('Unexpected error' + err);
        });
    }

    async deleteBookmark(id: number): Promise<void> {
        await axios.delete(this.bookmarkAPI + id,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(()=>{
            return Promise.resolve();
        }).catch(err => Promise.reject(err.response.message));
    }

    async putBookmark(id: number, newUrl: string, newTags: string): Promise<any> {
        await axios.put(this.bookmarkAPI + id,
            {
                url: newUrl,
                tags: newTags,
                id
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response:AxiosResponse)=>{
            return response.data;
        }).catch(err => Promise.reject(err.response.message));
    }

    addBookmark = (url: string, tags: string) => {
        this.postBookmark(url, tags)
            .catch(err => console.log(err));
    }

    delBookmark = (id: number) => {
        this.deleteBookmark(id)
            .then(() => {
                this.setState({bookmarkItems: this.state.bookmarkItems.filter((bookmark: BookmarkItemProps) => bookmark.id !== id)})
            }).catch(err => console.log(err));
    }

    updateBookmark = (id: number, newUrl: string, newTags: string) => {
        this.putBookmark(id, newUrl, newTags)
            .then(() => {
                this.setState({
                    bookmarkItems: this.state.bookmarkItems.map((bookmark: BookmarkItemProps) => {
                        if (bookmark.id === id) {
                            bookmark.url = newUrl;
                            bookmark.tags = newTags;
                        }
                        return bookmark;
                    })
                })
            }).catch(err => console.log(err));
    }

    handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value.replace(/\s/g, '');
        this.setState({inputText: event.target.value})
        if (text) {
            this.setState({submitDisabled: false})
        } else {
            this.setState({submitDisabled: true})
        }
    }

    handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({inputTags: event.target.value})
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.addBookmark(this.state.inputText, this.state.inputTags);
        this.setState({inputText: '', inputTags: ''});
    }

    render() {
        const {inputText, inputTags, submitDisabled, bookmarkItems} = this.state;
        return (
            <div className="container">
                <form className="row g-3" onSubmit={this.handleSubmit}>

                    <label className="form-label" >URL</label>
                    <TextInput value={inputText} onChange={this.handleUrlChange} />

                    <br/>
                    <label className="form-label" >Tags</label>
                    <TextInput value={inputTags} onChange={this.handleTagChange} disabled={submitDisabled}/>

                    <div className="col-12">
                        <Button disabled={submitDisabled} className="btn btn-primary" type="submit">Add</Button>
                    </div>
                </form>
                <br/>
                <List items={bookmarkItems} removeItem={this.delBookmark} updateItem={this.updateBookmark}/>
            </div>
        )
    }
}

export default BookmarkList;