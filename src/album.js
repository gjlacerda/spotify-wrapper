
export default function() {
    return {
        getAlbum: id => this.request(`${this.apiURL}/albums/${id}`),
        getAlbums: ids => this.request(`${this.apiURL}/albums/?ids=${ids}`),
        getAlbumsTracks: id => this.request(`${this.apiURL}/albums/${id}/tracks`),
    };
}