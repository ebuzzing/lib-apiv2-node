// Import 
var JsonApi = require('devour-client');
var axios = require('axios');
var process = require('process');

// Bootstrap
const jsonApi = new JsonApi({apiUrl:'http://api-proxy.qa5.sandbox.teads.net/v2'})

function getAuthToken() {
  return 'cb3ca40dcfa54cbca060e6027eb7b3ed';
}

function authorize(jsonApi) {
  jsonApi.headers['Authorization'] = 'Bearer ' + getAuthToken();
}

/* DEFINE MODELS */
jsonApi.define('ad', {
  id: '',
  name: '',
  status: '',
  adType: '',
  entity: {
    jsonApi: 'hasOne',
    type: 'entity'
  },
  sellerProfile: {
    jsonApi: 'hasOne',
    type: 'profile'
  },
  buyer: {
    jsonApi: 'hasOne',
    type: 'entity'
  },
  advertiser: {
    jsonApi: 'hasOne',
    type: 'advertiser'
  },
  operatorProfile: {
    jsonApi: 'hasOne',
    type: 'profile'
  }
}, {
  type: 'ad'
});
jsonApi.define('creative', {
  id:'',
  name: '',
  status: '',
  json: '',
  ad: {
    jsonApi: 'hasOne',
    type: 'ad'
  }
}, {
  type: 'creative'
});

jsonApi.define('insertion', {
  id: '',
  name:'',
  status:'',
  category:'',
  budget:'',
  visibility:'',
  ad: {
    jsonApi: 'hasOne',
    type: 'ad'
  },
  broadcast: {
    jsonApi: 'hasOne',
    type: 'broadcast'
  },
  format: {
    jsonApi: 'hasOne',
    type: 'format'
  },
  rule: {
    jsonApi: 'hasOne',
    type: 'rule'
  },
  insertionOrderLine: {
    jsonApi: 'hasOne',
    type: 'insertionOrderLine'
  }
}, {
  type:'insertion'
});


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

export function newAd()



// newCreative(jsonApi, 38741, {name: "Andrei Test", "id": 5648887335354368})
// .then(r => console.log(r));


// updateCreative(98076, 38741, {name: "Andrei Test (update)", "id": 5648887335354368})
// .then(r => console.log(r));

// Define Model 
// To find many... 
// jsonApi.findAll('ad').then((r) => console.log(r));