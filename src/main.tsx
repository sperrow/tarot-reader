import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@fontsource-variable/playfair-display';
import './index.css';

const addMaximumScaleToMetaViewport = () => {
    const el = document.querySelector('meta[name=viewport]');

    if (el !== null) {
        let content = el.getAttribute('content');
        const re = /maximum-scale=[0-9.]+/g;

        if (content && re.test(content)) {
            content = content.replace(re, 'maximum-scale=1.0');
        } else {
            content = [content, 'maximum-scale=1.0'].join(', ');
        }

        el.setAttribute('content', content);
    }
};

const disableIosTextFieldZoom = addMaximumScaleToMetaViewport;

// https://stackoverflow.com/questions/9038625/detect-if-device-is-ios/9039885#9039885
const checkIsIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent);

if (checkIsIOS()) {
    disableIosTextFieldZoom();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
