import React from 'react';
import PropTypes from 'prop-types';

import "./Page.css"


// libs
import PixelStreaming from 'metaeditor2';


export const Page = () => {
  const refPixelStreaming = React.useRef(null)


  const [serverData, setServerData] = React.useState({ server: '', port: 80 })

  React.useEffect(() => {

    setTimeout(() => {
      const host = prompt('Input host')
      setServerData(c => ({ ...c, host }))
      refPixelStreaming.current.initConnection()
    }, 1000 * 1)

  }, [])

  return (
    <div style={{
      backgroundColor: 'rgba(0,0,0, 1)',
      height: 'var(--window-height)',
    }}>

      <PixelStreaming
        ref={refPixelStreaming}
        onLoad={(payload) => {
          // console.warn('loaded', payload);
        }}
        onConnect={() => {
          // console.warn('connected');
        }}
        onRestart={() => {
          // console.warn('onRestart');
        }}
        onError={(payload) => {
          // console.error('error', payload);
        }}
        onClose={(payload) => {
          // console.error('closed', payload);
        }}
        onCommand={(payload => {
          // console.warn('command', payload);
        })}
        onCallback={(payload => {
          // console.warn('callback', payload);
        })}
        onProgress={(payload) => {
          // console.warn('progress', payload);
        }}
        autoConnect={false}
        quality={1}
        isDev={true}
        host={serverData.host}
        port={serverData.port} >

        {(payload) => (
          <div>
            Content block
          </div>
        )}
      </PixelStreaming>

    </div>
  )
}

Page.propTypes = {
  // onLogin: PropTypes.func.isRequired,

};

Page.defaultProps = {
};

