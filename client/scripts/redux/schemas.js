/**
 * Created by amitava on 25/05/16.
 */
import { Schema, arrayOf, normalize } from 'normalizr'

const playlistSchema = new Schema('playlists', {
    idAttribute: 'id'
});



export default {
    PLAYLIST: playlistSchema,
    PLAYLIST_ARRAY: arrayOf(playlistSchema)
};