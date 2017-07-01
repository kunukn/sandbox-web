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
                    {name}
                    - Error loading data, please try later.
                </div>
            );
        }
        if (isLoading) {
            return (
                <div className="loading-tracker loading-tracker--loading">
                    {name}
                    - Loading, please wait...
                </div>
            );
        }
        return React.Children.only(this.props.children);
    }
}

export default LoadingTracker;