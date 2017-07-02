import React from 'react';

class LoadingTracker extends React.Component {

    render() {
        
        let {name,isLoading, isLoadingLong, isLoadingFailed, isLoadingSpinner,ignoreLoadingTracker} = this.props;
        
        if(ignoreLoadingTracker){
            return React.Children.only(this.props.children);
        }

         return (
                <div className="loading-tracker">
                    {isLoading && isLoadingSpinner &&
                    <div key={'isLoading'} className="loading-tracker__overlay">
                        <div className="loading-tracker__box">
                        <div className="load-bar">
                            <div className="load-bar__item"></div>
                            <div className="load-bar__item"></div>
                        </div>
                            <span className="loading-tracker__name">{name} </span>
                            <span className="loading-tracker__message">please wait... {isLoadingLong && ' some more...'}</span>
                        </div>
                    </div>}
                    
                    {isLoadingFailed && 
                    <div key={'isLoadingFailed'} className="loading-tracker__overlay">
                        <div className="loading-tracker__box">
                        <div className="load-bar">
                            <div className="load-bar__item"></div>
                            <div className="load-bar__item"></div>
                        </div>
                            <span className="loading-tracker__name">{name} </span>
                            <span className="loading-tracker__message">Error, please try again later.</span>
                        </div>
                    </div>}
                    
                    {this.props.children}
                </div>
            );
    }
}

export default LoadingTracker;
