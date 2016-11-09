import jsonApi;
class CreativeService {
    function newCreative(adId: Number, studioCreative: {name: String, id: Number}): Promise<any> {
    return jsonApi.create('creative', {
        name: studioCreative.name,
        status: 2,
        json: `{\"Linear\":{\"Extensions\":{\"type\":\"\",\"wrap\":\"https://tag.brainient.com/vast/${studioCreative.id}\",\"script\":[],\"iframe\":[],\"code_html\":[]},\"VideoClicks\":{\"ClickTracking\":[{\"status\":1,\"data\":\"[PROTOCOL]://t.teads.tv/track?action=click&vid=[VID]&cid=[CID]&gid=[GID]&pid=[PID]&[RND]\"}],\"CustomClick\":[]},\"Duration\":0}}`,
        ad: { id: adId }
    });
}

    function updateCreative(creativeId: number, adId: Number, studioCreative: {name: String, id: Number}): Promise<any> {
    return jsonApi.update('creative', {
        id: creativeId,
        name: studioCreative.name,
        status: 2,
        json: `{\"Linear\":{\"Extensions\":{\"type\":\"\",\"wrap\":\"https://tag.brainient.com/vast/${studioCreative.id}\",\"script\":[],\"iframe\":[],\"code_html\":[]},\"VideoClicks\":{\"ClickTracking\":[{\"status\":1,\"data\":\"[PROTOCOL]://t.teads.tv/track?action=click&vid=[VID]&cid=[CID]&gid=[GID]&pid=[PID]&[RND]\"}],\"CustomClick\":[]},\"Duration\":0}}`,
        ad: { id: adId }
    });
}
}