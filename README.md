# PixelStreaming for ReactJS

Library for launching the player for Pixel Streaming (Unreal Engine v.5)

Connects to running [STUN and TURN Servers](https://docs.unrealengine.com/4.27/en-US/SharingAndReleasing/PixelStreaming/Hosting/).

---

<p align="center">
  <img src="https://github.com/markolofsen/pixel_streaming_sb/blob/main/stories/assets/preview.png?raw=true" width="100%" title="Pixel Streaming">
</p>

---

## Demo

https://markolofsen.github.io/pixel_streaming_sb/

## Installation

```bash
npm install pixel-streaming
# or
yarn add pixel-streaming
```

## Usage

```javascript
import React from 'react';

// libs
import PixelStreaming, {DebugData} from 'pixel-streaming';

function App() {
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

export default App
```

## Props

| Prop           | Description                                                                                                                                                                                                                                                                                                                 | Type       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| secondsToStart | Approximate stream start time in seconds.<br/>Default: `0`                                                                                                                                                                                                                                                                  | `int`      |
| autoConnect    | Connect to stream automatically. <br/>Default: `true`                                                                                                                                                                                                                                                                       | `bool`     |
| host           | String host to url with signal server.<br/>If host starts wih `https` then it will be used `wss` <br/>If starts with `http` then will be used `ws`<br/>Example: `https://uuid1234567890.streamdomain.com`                                                                                                                   | `string`   |
| port           | Port of signal server.<br/>Default: `80`                                                                                                                                                                                                                                                                                    | `int`      |
| children       | The function receives parameters and renders the nested component <br/>Example: `{(payload) => (...)}` <br/><br/>**Incoming parameters:** <br/>`state` — [Object with state data](#ps-state)<br/>`initConnection()` — If `autoConnect={false}`, then use the `initConnection()` function to manually connect to the stream. | `function` |
| onLoad         | When the stream started                                                                                                                                                                                                                                                                                                     | `function` |
| onConnect      | Called when the stream is running                                                                                                                                                                                                                                                                                           |            |
| onRestart      | Called when the stream is restarted                                                                                                                                                                                                                                                                                         | `function` |
| onError        | Called on errors in the webrtc connection                                                                                                                                                                                                                                                                                   |            |
| onClose        | Called if the webrtc connection is closed                                                                                                                                                                                                                                                                                   |            |
| onCallback     | Called when the stream server sends callbacks                                                                                                                                                                                                                                                                               |            |
| onProgress     | Return progress in percentage based on `secondsToStart`                                                                                                                                                                                                                                                                     | `function` |
| onDebug        | Incoming parameters:<br/>`onDebug={({type, payload}) => {...}}`<br/><br/>Types: `func, log, warn, info, error`                                                                                                                                                                                                              | `function` |


<h2 id="ps-state">Reference object data</h2>

`refPixelStreaming.current.state`

| Variable              | Default                 | Description |
| --------------------- | ----------------------- | ----------- |
| aggregated_stats      | `false`                 |             |
| callback_caller       | `false`                 |             |
| callback_loading      | `false`                 |             |
| closed                | `false`                 |             |
| connect               | `false`                 |             |
| error                 | `false`                 |             |
| last_interaction      | `null`                  |             |
| loaded                | `false`                 |             |
| mouse_moving          | `false`                 |             |
| quality_speed         | `false`                 |             |
| resolution_multiplier | `1.5`                   |             |
| stream_config         | `false`                 |             |
| users_count           | `0`                     |             |
| window_size           | `{width: 0, height: 0}` |             |

## Send command to stream server

```javascript
refPixelStreaming.current.emit({
 type: 'string', //key of command
 value: 0, //string, bool, number
 verification_id: undefined, //server response with execute command by verification id
})
```

## Attention!

- React v.`17.0.2`

- Apply style `pointerEvents: 'none'` to all JSX elements that overlap the stream.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Unreal Engine Pixel Streaming](https://docs.unrealengine.com/5.0/en-US) - Library for Unreal Engine.
- [Styled Jss](https://www.npmjs.com/package/styled-jss) - Styled Components on top of JSS

---

**Use with pleasure!**

[UnrealOS.com](http://unrealos.com/) Team
