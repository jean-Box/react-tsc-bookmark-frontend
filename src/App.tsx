import BookmarkList from './components/BookmarkList';
import ErrorBoundary from './components/ErrorBoundary';
import React, {Component} from 'react'


class App extends Component {

    render() {
        return (
            <div className="container">
                <ErrorBoundary>
                    <h1 className="align-middle">React with TS Bookmark App</h1>
                    <BookmarkList/>
                </ErrorBoundary>
            </div>
        )
    }
}

export default App;
