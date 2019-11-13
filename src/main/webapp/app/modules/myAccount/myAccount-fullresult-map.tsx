import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MyAccountFullResultMapInfo from './myAccount-fullresult-map-info';
import { IImportLigne } from 'app/shared/model/import-ligne.model';
import './myAccount.scss';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
export interface IMyAccountFullResultMapProp {
  fullResult: IImportLigne[];
  mapped: boolean;
}

export interface IMyAccountFullResultMapState {
  etablissementHover: IImportLigne;
}

export class MyAccountFullResultMap extends React.Component<IMyAccountFullResultMapProp, IMyAccountFullResultMapState> {
  map = {};
  
  constructor(props) {
    super(props);
    this.state = {
      etablissementHover: {} as IImportLigne,
    };
  }

  componentDidMount() {
    this.map = L.map('mapSite', { zoomControl: false, maxZoom: 15, minZoom: 6 }).setView([46.973622, 1.80852], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    
  }
  
  componentDidUpdate(prevProps) {
    if (!prevProps.fullResult || prevProps.fullResult.length !== this.props.fullResult.length) {
      this.getMarkersLegend();
    }
  }

  _handleMouseOver(item)  {
    this.setState({ etablissementHover:item });
  };
  _handleMouseOut()  {
    this.setState({ etablissementHover: {} });
  };


  getMarkersLegend = () => {
    const { fullResult } = this.props;

    var markersClients, 
        markersProspects,
        layerClients, 
        layerProspects,
        legend;

    //CLIENTS
    if (fullResult && fullResult.length > 0) {
      markersClients = fullResult
                      .filter(item1 => item1.sireneLatitude && item1.sireneLongitude)
                      .map((item, i) => {
                                        return L.marker([item.sireneLatitude, item.sireneLongitude], { icon: blueIcon }).on({
                                          mouseover: () => this._handleMouseOver(item),
                                          mouseout: () => this._handleMouseOut()
                                        });
        });
      layerClients = L.layerGroup(markersClients).addTo(this.map);
    }
  
    //PROSPECTS
    const prospects = fullResult.flatMap(function callback(ligneResult){
      return ligneResult.ligneProspects
      })
    if (prospects && prospects.length > 0) {
      markersProspects = prospects
                      .filter(item1 => item1.sireneLatitude && item1.sireneLongitude)
                      .map((item) => {
                                        return L.marker([item.sireneLatitude, item.sireneLongitude], { icon: yellowIcon }).on({
                                          mouseover: () => this._handleMouseOver(item),
                                          mouseout: () => this._handleMouseOut()
                                        });
        });
      layerProspects = L.layerGroup(markersProspects).addTo(this.map);
    }

    var overlayMaps = {
      "Clients<img class='markersLegend' src='https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png'>": layerClients ,
      "Prospects<img class='markersLegend' src='https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png'>": layerProspects
    };

    legend = L.control.layers(null, overlayMaps, {position: 'topleft', collapsed: false, check: true } );
    legend.addTo(this.map);                                                           
  }

  render() {
    return (
      <div>
        <div id="mapInfo" className="infoMap" >
          <MyAccountFullResultMapInfo infoEts={this.state.etablissementHover} mapped={this.props.mapped}/>
        </div>
        <div id="mapSite" className="map"></div> 
      </div>
    );
  }
}
const blueIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const yellowIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});