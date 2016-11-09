// Import
var process = require('process');

import {model} from './model';
let jsonApi = model;

let AUTH = {
  entityId: 6874,
    token: '5a84899a4605433882bab00fd5086524',
    profileId: 12152 
  };

function authorize(jsonApi) {
  jsonApi.headers['Authorization'] = 'Bearer ' + AUTH.token;
}

authorize(jsonApi);

export function newCreative(adId: Number, studioCreative: {name: String, id: Number}): Promise<any> {
  return jsonApi.create('creative', {
    name: studioCreative.name,
    status: 2,
    json: `{\"Linear\":{\"Extensions\":{\"type\":\"\",\"wrap\":\"https://tag.brainient.com/vast/${studioCreative.id}\",\"script\":[],\"iframe\":[],\"code_html\":[]},\"VideoClicks\":{\"ClickTracking\":[{\"status\":1,\"data\":\"[PROTOCOL]://t.teads.tv/track?action=click&vid=[VID]&cid=[CID]&gid=[GID]&pid=[PID]&[RND]\"}],\"CustomClick\":[]},\"Duration\":0}}`,
    ad: { id: adId }
  });
}

export function updateCreative(creativeId: number, adId: Number, studioCreative: {name: String, id: Number}): Promise<any> {
  return jsonApi.update('creative', {
    id: creativeId,
    name: studioCreative.name,
    status: 2,
    json: `{\"Linear\":{\"Extensions\":{\"type\":\"\",\"wrap\":\"https://tag.brainient.com/vast/${studioCreative.id}\",\"script\":[],\"iframe\":[],\"code_html\":[]},\"VideoClicks\":{\"ClickTracking\":[{\"status\":1,\"data\":\"[PROTOCOL]://t.teads.tv/track?action=click&vid=[VID]&cid=[CID]&gid=[GID]&pid=[PID]&[RND]\"}],\"CustomClick\":[]},\"Duration\":0}}`,
    ad: { id: adId }
  });
}

export function newAd(ad: any): Promise<any> {
  return jsonApi.create('ad', {
    name: ad.name,
    status: 2,
    adType: "media",
    entity: {id: AUTH.entityId},
    sellerProfile: {id: 12156},
    buyer: {id: AUTH.entityId},
    advertiser: {id: 3900},
    operatorProfile: {id: AUTH.profileId}
  });
}


// newAd({name: "Andrei Ad"}).then((ad) => ad.id);

// jsonApi.find('ad', 38741, {include: 'creatives'})
// .then((ad) => console.log(ad));


// newCreative(jsonApi, 38741, {name: "Andrei Test", "id": 5648887335354368})
// .then(r => console.log(r));


// updateCreative(98076, 38741, {name: "Andrei Test (update)", "id": 5648887335354368})
// .then(r => console.log(r));

// Define Model 
// To find many... 
// jsonApi.findAll('ad').then((r) => console.log(r));