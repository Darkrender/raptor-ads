import { ADD_MAP_MARKER, CHANGE_CENTER, CHANGE_MARKER_SHOW_INFO, CHANGE_CENTER_SUCCESS, ADD_MAP_MARKERS_SUCCESS } from '../constants';
import concatAddress from '../components/helpers/concatAddress';

const geoCode = (data) => {
  const geocoder = new google.maps.Geocoder();
  return geocoder.geocode({ address: concatAddress(action.data.user)})
};


export const addMapMarker = location =>
  ({
    type: ADD_MAP_MARKER,
    location,
  });

export const changeCenterSuccess = newCenter =>
  ({
    type: CHANGE_CENTER_SUCCESS,
    location: newCenter,
  });

export const addMapMarkersSuccess = markerArray =>
  ({
    type: ADD_MAP_MARKERS_SUCCESS,
    markerArray,
  });

export const changeCenter = data =>
  (dispatch) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': concatAddress(data)}, (results) => {
      const newCenter = {
        lat: results[0].geometry.bounds.f.f,
        lng: results[0].geometry.bounds.b.b,
      };
      dispatch(changeCenterSuccess(newCenter));
    });
  };

export const changeMarkerShowInfo = index =>
  ({
    type: CHANGE_MARKER_SHOW_INFO,
    index,
  });

export const addMapMarkers = data =>
  (dispatch) => {
    const markerArray = [];
    const geocoder = new google.maps.Geocoder();
    if (Array.isArray(data)) {
      console.log('INSIDE THE ARRAY');
      for (let i = 0; i < data.length; i++) {
        geocoder.geocode({ 'address': concatAddress(data[i])}, (results) => {
          console.log('address', concatAddress(data[i]));
          const newCenter = {
            position: results[0].geometry.location,
            defaultAnimation: 2,
            key: data[i].id,
          };
          markerArray.push(newCenter);
          if (i === data.length - 1) {
            dispatch(addMapMarkersSuccess(markerArray));
          }
        });
      }
    } else {
      geocoder.geocode({ 'address': concatAddress(data)}, (results) => {
        const newCenter = {
          position: results[0].geometry.location,
          defaultAnimation: 2,
          key: data.id,
        };
        markerArray.push(newCenter);
        dispatch(addMapMarkersSuccess(markerArray));
      });
    }
  };
