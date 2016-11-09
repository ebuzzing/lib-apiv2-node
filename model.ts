var JsonApi = require('devour-client');
const jsonApi = new JsonApi({apiUrl:'http://api-proxy.qa5.sandbox.teads.net/v2'})
/* DEFINE MODELS */
jsonApi.define('ad', {
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
    },
    creatives: {
        jsonApi: 'hasMany',
        type: 'creative'
    }
}, {
    type: 'ad'
});
jsonApi.define('creative', {
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

export {jsonApi as model};