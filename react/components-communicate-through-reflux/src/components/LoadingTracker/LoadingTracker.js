import React from 'react';

import {LOADING_STATES, LOADING_TYPES, LOADING_CONFIG} from '../../utils';

class LoadingTracker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingType: LOADING_TYPES.SHORT,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({loadingType: LOADING_TYPES.LONG})
        }, LOADING_CONFIG.LONG_LOADING_START_TIME)
    }

    render() {

        let {name, loadingState, ignoreLoadingTracker} = this.props;
        let isLongLoading = this.state.loadingType === LOADING_TYPES.LONG;

        if (ignoreLoadingTracker) {
            return React.Children.only(this.props.children);
        }

        const isLoadingState = loadingState === LOADING_STATES.LOADING;
        const isErrorState = loadingState === LOADING_STATES.LOADINGERROR;

        if (loadingState) {
            return (
                <div className="loading-tracker">
                    {isLoadingState && <div className="loading-tracker__overlay">
                        <div className="loading-tracker__box">
                            <div className="load-bar">
                                <div className="load-bar__item"></div>
                                <div className="load-bar__item"></div>
                            </div>
                            <span className="loading-tracker__name">{name}
                            </span>
                            <span className="loading-tracker__message">please wait... {isLongLoading && ' long loading'}</span>
                        </div>
                    </div>}

                    {isErrorState && <div className="loading-tracker__overlay loading-tracker__overlay--is-error">
                        <div className="loading-tracker__box">
                            <span className="loading-tracker__name">{name}
                            </span>
                            <span className="loading-tracker__message">Error, please try again later.</span>
                        </div>
                    </div>}

                    {this.props.children}
                </div>
            );
        }

        return React
            .Children
            .only(this.props.children);
    }
}

export default LoadingTracker;
