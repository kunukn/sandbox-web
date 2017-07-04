import React from 'react';

class LoadingTracker extends React.Component {

    render() {
        
        let {name, isLoading, isLoadingLong, isLoadingFailed, isLoadingSpinner,ignoreLoadingTracker} = this.props;
        
        if(ignoreLoadingTracker){
            return React.Children.only(this.props.children);
        }

            let loadingState = isLoading && isLoadingSpinner;
            let errorState = isLoadingFailed;

        if(loadingState || errorState){
         return (
                <div className="loading-tracker">
                    {loadingState &&
                    <div className="loading-tracker__overlay">
                        <div className="loading-tracker__box">
                        <div className="load-bar">
                            <div className="load-bar__item"></div>
                            <div className="load-bar__item"></div>
                        </div>
                            <span className="loading-tracker__name">{name} </span>
                            <span className="loading-tracker__message">please wait... {isLoadingLong && ' long loading'}</span>
                        </div>
                    </div>}
                    
                    {errorState && 
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
