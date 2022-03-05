import React from 'react';
import PropTypes from 'prop-types';

import "./Page.css"

// libs
import PixelStreaming, {DebugData} from 'metaeditor';

export const Page = () => {

  const refPixelStreaming = React.useRef(null)
  const [serverData, setServerData] = React.useState({host: 'http://127.0.0.1', port: 80})

  const actionClass = new class {
    constructor() {
      this.ref = refPixelStreaming.current
    }

    _emit(type, value, verification_id=undefined) {
      this.ref.emit({type, value, verification_id})
    }

    emitTestCommand(value) {
      this._emit('test_command_type', value)
    }
  }

  const renderForm = ({state, initConnection}) => {
    if(state.loaded) {
      return (
        <button onClick={() => actionClass.emitTestCommand(11)}>
          Test command
        </button>
      )
    }

    return (
      <form onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()

        initConnection()
      }}>
        <input type="text" placeholder="http://127.0.0.1" value={serverData.host} onChange={(event) => setServerData(c => ({
          ...c, host: event.target.value
        }))} />
        <input style={{width: 50}} type="number" placeholder="80" value={serverData.port} onChange={(event) => setServerData(c => ({
          ...c, port: event.target.value
        }))} />
        <button type="submit">Connect</button>
      </form>
    )
  }

  return (
    <div>

      <PixelStreaming
        ref={refPixelStreaming}
        onLoad={(payload) => {
          console.warn('loaded', payload);
        }}
        onConnect={() => {
          console.warn('connected');
        }}
        onRestart={() => {
          // ...
        }}
        onError={(payload) => {
          console.error('error', payload);
        }}
        onClose={(payload) => {
          console.error('closed', payload);
        }}
        onCallback={(payload => {
          console.warn('callback', payload);
        })}
        onProgress={(payload) => {
          console.warn('progress', payload);
        }}
        onDebug={(payload) => {
          console.warn('debug', payload);
        }}
        secondsToStart={300}
        autoConnect={false}
        host={serverData.host}
        port={serverData.port} >
        {({state, initConnection}) => (
          <div style={{padding: 30}}>

            {renderForm({state, initConnection})}

            {<pre>{JSON.stringify(state, null, 4)}</pre>}

            <DebugData
              show
              style={{width: 300, backgroundColor: 'rgba(0,0,0,.2)'}}
            />

          </div>
        )}
      </PixelStreaming>

    </div>
  )
}


Page.propTypes = {
  // user: PropTypes.shape({}),
  // onLogin: PropTypes.func.isRequired,
  // onLogout: PropTypes.func.isRequired,
  // onCreateAccount: PropTypes.func.isRequired,
};

Page.defaultProps = {
  // user: null,
};
