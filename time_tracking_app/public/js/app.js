class TimerDashboard extends React.Component {
    render() {
        return (
            <div className="ui three column centered grid">
                <div className="column">
                    Hello World!
                </div>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('content'));
root.render(<TimerDashboard />);
