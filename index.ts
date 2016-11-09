// Import
var process = require('process');
var axios = require('axios');
var jsonApi = require('./model');

let API = {
  endpoint: 'qa5.sandbox.teads.net'
}

let AUTH = {
  token: null,
  entityId: 6874,
  profileId: 12152,
  username: 'user@tradingdesk.com',
  password: 'test1234' 
};

function ensureAuthorized() {
  if (!AUTH.token) {
    return axios.post(`http://${API.endpoint}:18081/oauth/auth?client_id=manager&redirect_uri=http%3A%2F%2Fmanager.teads.tv%2F&response_type=token&state=14513&email=${AUTH.username}&password=${AUTH.password}`)
      .then(r => r.data)
      .then(responseBody => responseBody.substring(responseBody.indexOf("access_token=") + 13,responseBody.indexOf("&token_type")))
      .then(token => {
        jsonApi.headers['Authorization'] = 'Bearer ' + token;
        AUTH.token = token;
      });
  } 

  return Promise.resolve(AUTH.token);
}

export function newCreative(adId: Number, studioCreative: {name: String, id: Number}): Promise<any> {
  return ensureAuthorized().then(() => jsonApi.create('creative', {
    name: studioCreative.name,
    status: 2,
    json: `{\"Linear\":{\"Extensions\":{\"type\":\"\",\"wrap\":\"https://tag.brainient.com/vast/${studioCreative.id}\",\"script\":[],\"iframe\":[],\"code_html\":[]},\"VideoClicks\":{\"ClickTracking\":[{\"status\":1,\"data\":\"[PROTOCOL]://t.teads.tv/track?action=click&vid=[VID]&cid=[CID]&gid=[GID]&pid=[PID]&[RND]\"}],\"CustomClick\":[]},\"Duration\":0}}`,
    ad: { id: adId }
  }));
}

export function updateCreative(creativeId: number, adId: Number, studioCreative: {name: String, id: Number}): Promise<any> {
  return ensureAuthorized().then(() => jsonApi.update('creative', {
    id: creativeId,
    name: studioCreative.name,
    status: 2,
    ad: { id: adId }
  }));
}

export function newAd(ad: any): Promise<any> {
  return ensureAuthorized().then(() => jsonApi.create('ad', {
    name: ad.name,
    status: 2,
    adType: "media",
    entity: {id: AUTH.entityId},
    sellerProfile: {id: 12156},
    buyer: {id: AUTH.entityId},
    advertiser: {id: 3900},
    operatorProfile: {id: AUTH.profileId}
  }));
}

function getCreativesByStudioId(creativeId: number) {
  return jsonApi.findAll('creative', {filter: encodeURI(`{\"json\":{\"$regex\":\"${creativeId}\"}}`)});
} 

ensureAuthorized().then(() => jsonApi.findAll('creative').then(r => console.log(r)));


