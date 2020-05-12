import React, { useEffect, useState } from 'react'
import throttle from 'lodash/throttle'
import './index.css'

const getWebViewType = (): {
  _isInWKWebView: boolean
  _isInUIWebView: boolean
  _others: boolean
} => {
  const result = {
    _isInWKWebView: false,
    _isInUIWebView: false,
    _others: false
  }
  if (navigator.platform.substr(0, 2) === 'iP') {
    //iOS (iPhone, iPod or iPad)
    const lte9 = /constructor/i.test(HTMLElement.toString());
    const nav = window.navigator;
    const ua = nav.userAgent;
    const idb = !!window.indexedDB;
    if (ua.indexOf('Safari') !== -1 && ua.indexOf('Versionpn') !== -1 && !(nav as any).standalone) {
      result._others = true;
    } else if ((!idb && lte9) || !window.statusbar.visible) {
      result._isInUIWebView = true;
    } else if (((window as any).webkit && (window as any).webkit.messageHandlers) || !lte9 || idb) {
      result._isInWKWebView = true;
    }
  }
  return result;
}

const getWindowScrollTop = (): number => {
  return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
}

interface Props {
  children: React.ReactElement | React.ReactElement[];
  top?: number;
}

const Sticky = ({ children, top }: Props): React.ReactElement => {

  const [fixedClass, setFixedClass] = useState('');
  const [ctnHeight, setCtnHeight] = useState(0);

  useEffect(() => {

    const $ctn = window.document.querySelector('.sticky-container');
    const $innerCtn = window.document.querySelector('.sticky-inner-container');

    const commonHandler = throttle(() => {
      const scrollTop = getWindowScrollTop() + (top || 0)
      setFixedClass(scrollTop > ($ctn as HTMLElement).offsetTop ? 'fixed' : '');
    }, 30);


    const iOSUIWebViewHandler = (): void => {
      const scrollTop = getWindowScrollTop() + (top || 0)
      const shouldBeFixed = scrollTop > ($ctn as HTMLElement).offsetTop;
      setFixedClass(getWindowScrollTop() > ($ctn as HTMLElement).offsetTop ? 'fixed' : '');
      ($innerCtn as HTMLElement).style.position = shouldBeFixed ? 'fixed' : 'relative';
      ($innerCtn as HTMLElement).style.top = top ? `${top}px` : '0px';
    }

    const onScroll = () => {
      getWebViewType()._isInUIWebView ? iOSUIWebViewHandler() : commonHandler();
    }

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);

  },[])

  useEffect(() => {
    const $innerCtn = window.document.querySelector('.sticky-inner-container');
    setCtnHeight(($innerCtn as HTMLElement).offsetHeight);
  }, [])

  return (
    <div
      className="sticky-container"
      style={{height: `${ctnHeight}px`}}
    >
      <div className={`sticky-inner-container ${fixedClass}`} style={{top: top || 0}}>
        {children}
      </div>
    </div>)
}

export default Sticky
