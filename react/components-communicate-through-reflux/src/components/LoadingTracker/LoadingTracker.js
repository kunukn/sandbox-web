import React from 'react';

class LoadingTracker extends React.Component {
    render() {
        let {name,isLoading,isLoadingFailed,ignoreLoadingTracker} = this.props;
        
        if(ignoreLoadingTracker){
            return React.Children.only(this.props.children);
        }
        if (isLoadingFailed) {
            return (
                <div className="loading-tracker loading-tracker--error">
                    <div className="loading-tracker__content">
                        <span className="loading-tracker__name">{name}</span>
                        <span className="loading-tracker__message"> - Error loading data, please try later.</span>
                    </div>
                </div>
            );
        }
        if (isLoading) {
            return (
                <div className="loading-tracker loading-tracker--loading">
                    <div className="loading-tracker__content">
                        <span className="loading-tracker__name">{name}</span>
                        <span className="loading-tracker__message"> - Loading, please wait...</span>
                    </div>
                </div>
            );
        }
        return React.Children.only(this.props.children);
    }
}

export default LoadingTracker;