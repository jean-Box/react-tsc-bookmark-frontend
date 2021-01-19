import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {

    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        console.error("Uncaught error:", _.message);
        return { hasError: true};
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        //this.setState({errorInfo: error.message})
    }

    public render() {
        if (this.state.hasError) {
            return( <div>
                <h2>Something went wrong.</h2>
                <details style={{ whiteSpace: 'pre-wrap' }}>

                    <br />
                </details>
            </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;