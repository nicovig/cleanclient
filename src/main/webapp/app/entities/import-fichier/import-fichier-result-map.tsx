import React from 'react';
import { Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { IResult } from 'app/shared/model/result.model';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './import-fichier-result-map.css';
import ResultMapInfo from './import-fichier-result-map-info';
import { ILocalisation } from 'app/shared/model/localisation.model';
import { IImportLigne } from 'app/shared/model/import-ligne.model';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
export interface IImportFichierResultMapProp {
  result: IResult;
}

export interface IImportFichierResultMapState {
  etablissementHover: ILocalisation;
}

export class ImportFichierResultMap extends React.Component<IImportFichierResultMapProp, IImportFichierResultMapState> {
  map = {};

  constructor(props) {
    super(props);
    this.state = {
      etablissementHover: {} as ILocalisation
    };
  }

  componentDidMount() {
    this.map = L.map('mapSite', { zoomControl: false, maxZoom: 15, minZoom: 6 }).setView([46.973622, 1.80852], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
<<<<<<< HEAD
    this.getMarkerClients();
    this.getLegend();
=======
>>>>>>> 56cdc83f16f884365c097bb5a80c43b5963ce842
  }
  
  componentDidUpdate(prevProps) {
    if (!prevProps.result.localisationClients || prevProps.result.localisationClients.length !== this.props.result.localisationClients.length) {
      this.getMarkerClients();
    }
    if (!prevProps.result.localisationProspects || prevProps.result.localisationProspects.length !== this.props.result.localisationProspects.length) {
      this.getMarkerProspects();
    }
    
  }

  getLegend(){
    var legend = L.control({position: 'topleft'});
    legend.onAdd = function () {
    var marker = L.DomUtil.create('marker');
                                                           
      marker.innerHTML = " <img class='markersLegend' src='https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png'> "
                       + " <div class='txtLegend'>Clients</div> "
                       + " <img class='markersLegend' src='https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png'> "
                       + " <div class='txtLegend'>Prospects</div> "
    return marker;
     };
    legend.addTo(this.map);
  }

  _handleMouseOver(item)  {
    this.setState({ etablissementHover:item });
  };
  _handleMouseOut(item)  {
    this.setState({ etablissementHover: {} });
  };

  getMarkerClients = () => {
    const { result } = this.props;
    if (result && result.localisationClients && result.localisationClients.length > 0) {
      const markers = result.localisationClients
        .filter(item1 => item1.latitude && item1.longitude)
        .map((item, i) => {
          return L.marker([item.latitude, item.longitude], { icon: blueIcon }).on({
            mouseover: () => this._handleMouseOver(item),
            mouseout: () => this._handleMouseOut(item)
          });
        });
      L.layerGroup(markers).addTo(this.map);
    }
  };

  getMarkerProspects() {
    const { result } = this.props;
    if (result && result.localisationProspects && result.localisationProspects.length > 0) {
      const markers = result.localisationProspects
        .filter(item1 => item1.latitude && item1.longitude)
        .map((item, i) => {
          return L.marker([item.latitude, item.longitude], { icon: yellowIcon }).on({
            mouseover: () => this.setState({ etablissementHover: item }),
            mouseout: () => this.setState({ etablissementHover: {} })
          });
        });
      L.layerGroup(markers).addTo(this.map);
    }
  }

  getMarkerDivIcon(elasticScore) {
    //const opacity = elasticScore / 10000;
    return L.divIcon({
      className: 'my-custom-pin',
      iconAnchor: [0, 24],
      labelAnchor: [-6, 0],
      popupAnchor: [0, -36],
      html: `<div><div class="pin2" /><div>`
    });
  }

  render() {
    return (
      <div>
        <div id="mapInfo" className="infoMap" >
          <ResultMapInfo localisation={this.state.etablissementHover} />
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