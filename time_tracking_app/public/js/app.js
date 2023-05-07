class TimerDashboard extends React.Component {
    render() {
        return (
            <div className="ui three column centered grid">
              <div className="column">
                <EditableTimerList />
                <ToggleableTimerForm
                  isOpen={true}
                />
              </div>
            </div>
        );
    }
}

class EditableTimerList extends React.Component {
    render() {
        return (
            <div id="timers">
              <EditableTimer
                title="Learn React"
                project="Web Domination"
                elapsed="8986300"
                runningSince={null}
                editFormOpen={false}
              />
              <EditableTimer
                title="Learning Extreme Ironing"
                project="World Domincation"
                elapsed="3890985"
                runningSince={null}
                editFormOpen={true}
              />
            </div>
        );
    }
}

class EditableTimer extends React.Component {
    render() {
        if (this.props.editFormOpen) {
          return (
            <TimerForm
              title={this.props.title}
              project={this.props.project}
            />
          );
        } else {
          return (
            <div>Hello World!</div>
          );
        }
    }
}

class TimerForm extends React.Component {
    render() {
        const submitText = this.props.title ? 'Update' : 'Create';
        return (
            <div className="ui centered card">
              <div className="content">
                <div className="ui form">
                  <div className="field">
                    <label>Title</label>
                    <input type="text" defaultValue={this.props.title} />
                  </div>
                  <div className="field">
                    <label>Project</label>
                    <input type="text" defaultValue={this.props.project} />
                  </div>
                  <div className="ui two button attached buttons">
                    <button className="ui basic blue button">
                      {submitText}
                    </button>
                    <button className="ui basic red button">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

class ToggleableTimerForm extends React.Component {
    render() {
        if (this.props.isOpen) {
            return (
                <TimerForm />
            );
        } else {
            return (
                <div className="ui basic content center aligned segment">
                  <button className="ui basic button icon">
                    <i class="plus icon" />
                  </button>
                </div>
            );
        }
    }
}

const root = ReactDOM.createRoot(document.getElementById('content'));
root.render(<TimerDashboard />);
