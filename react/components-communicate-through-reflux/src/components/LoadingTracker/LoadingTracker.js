import React from 'react';

import {LOADINGSTATES} from '../../utils';

class LoadingTracker extends React.Component {

    render() {
        
        let {name, loadingState, ignoreLoadingTracker} = this.props;
        
        if(ignoreLoadingTracker){
            return React.Children.only(this.props.children);
        }

        const isLoadingState = loadingState === LOADINGSTATES.LOADING;
        const isLongLoadingState = loadingState === LOADINGSTATES.LONGLOADING;
        const isErrorState = loadingState === LOADINGSTATES.LOADINGERROR;

        if(loadingState){
         return (
                <div className="loading-tracker">
                    {(isLoadingState || isLongLoadingState) &&
                    <div className="loading-tracker__overlay">
                        <div className="loading-tracker__box">
                        <div className="load-bar">
                            <div className="load-bar__item"></div>
                            <div className="load-bar__item"></div>
                        </div>
                            <span className="loading-tracker__name">{name} </span>
                            <span className="loading-tracker__message">please wait... {isLongLoadingState && ' long loading'}</span>
                        </div>
                    </div>}
                    
                    {isErrorState && 
                    <div className="loading-tracker__overlay loading-tracker__overlay--is-error">
                        <div className="loading-tracker__box">
                            <span className="loading-tracker__name">{name} </span>
                            <span className="loading-tracker__message">Error, please try again later.</span>
                        </div>
                    </div>}
                    
                    {this.props.children}
                </div>
            );
        }

        return React.Children.only(this.props.children);
    }
}

export default LoadingTracker;
