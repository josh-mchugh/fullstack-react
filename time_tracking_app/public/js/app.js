class TimerDashboard extends React.Component {
    render() {
        return (
            <div className="ui three column centered grid">
                <div className="column">
                    <EditableTimerList />
                </div>
            </div>
        );
    }
}

class EditableTimerList extends React.Component {
    render() {
        return (
            <div id="timers">
                Hello World!
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('content'));
root.render(<TimerDashboard />);
