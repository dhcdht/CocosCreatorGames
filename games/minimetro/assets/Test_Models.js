import {LineModel} from 'LineModel'
import {StationModel} from 'StationModel'

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        this.testLineModel();
    },

    testLineModel: function () {
        let lineMode = new LineModel();

        let station1 = new StationModel();
        station1.stationType = 'station1';
        let result = lineMode.pushStation(station1, 0);
        console.log(lineMode.nodesList);

        let station2 = new StationModel();
        station2.stationType = 'station2';
        result = lineMode.pushStation(station2, 100);
        console.log(lineMode.nodesList);

        let station3 = new StationModel();
        station3.stationType = 'station3';
        result = lineMode.insertStationAfterStation(station1, station3, 40, 50);
        console.log(lineMode.nodesList);

        let station4 = new StationModel();
        station4.stationType = 'station4';
        result = lineMode.insertStationAfterStation(station2, station4, 30, 1);
        console.log(lineMode.nodesList);

        let station5 = new StationModel();
        station5.stationType = 'station5';
        result = lineMode.insertStationBeforeStation(station1, station5, 1, 11);
        console.log(lineMode.nodesList);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
