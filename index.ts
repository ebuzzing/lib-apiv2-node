// Import
var process = require('process');
var jsonApi = require('./model');

let AUTH = {
    entityId: 6874,
    token: 'c5ca292765a540b197b44be85ec90207',
    profileId: 12152 
  };

function authorize() {
  jsonApi.headers['Authorization'] = 'Bearer ' + AUTH.token;
}

authorize();

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
    ad: { id: adId }
  });
}

export function getCreativesByStudioId(creativeId: number) {
  return jsonApi.findAll('creative', {filter: encodeURI(`{\"json\":{\"$regex\":\"${creativeId}\"}}`)});
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

export function findAllMyAds(): Promise<any> {
  return jsonApi.findAll('ad', {operatorProfile: {id: AUTH.profileId}}).then(r => console.log(r));
}

findAllMyAds();