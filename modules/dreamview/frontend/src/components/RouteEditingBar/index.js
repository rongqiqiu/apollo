import React from "react";
import { inject, observer } from "mobx-react";

import EditingTip from "components/RouteEditingBar/EditingTip";

import removeAllIcon from "assets/images/icons/remove_all.png";
import removeLastIcon from "assets/images/icons/remove_last.png";
import sendRouteIcon from "assets/images/icons/send_request.png";
import addPoiIcon from "assets/images/icons/add_poi.png";


class RouteEditingButton extends React.Component {
    render() {
        const { label, icon, onClick } = this.props;

        return (
            <button onClick={onClick} className="button">
                <img src={icon} />
                <span>{label}</span>
            </button>
        );
    }
}

@inject("store") @observer
export default class RouteEditingMenu extends React.Component {
    render() {
        const { routeEditingManager, options } = this.props.store;

        return (
            <div className="route-editing-bar">
                <div className="editing-panel">
                    <RouteEditingButton label="Add Point of Interest"
                                        icon={addPoiIcon}
                                        onClick={() => {
                                            routeEditingManager.addDefaultEndPoint();
                                        }}/>
                    <RouteEditingButton label="Remove Last Point"
                                        icon={removeLastIcon}
                                        onClick={() => {
                                            routeEditingManager.removeLastRoutingPoint();
                                        }}/>
                    <RouteEditingButton label="Remove All Points"
                                        icon={removeAllIcon}
                                        onClick={() => {
                                            routeEditingManager.removeAllRoutingPoints();
                                        }}/>
                    <RouteEditingButton label="Send Routing Request"
                                      icon={sendRouteIcon}
                                      onClick={() => {
                                          if (routeEditingManager.sendRoutingRequest()) {
                                              options.showRouteEditingBar = false;
                                          }
                                        }}/>
                    <EditingTip />
                </div>
            </div>
        );
    }
}
