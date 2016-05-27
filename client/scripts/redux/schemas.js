/**
 * Created by amitava on 25/05/16.
 */
import { Schema, arrayOf, normalize } from 'normalizr'

const playlistSchema = new Schema('playlists', {
    idAttribute: 'id'
});

const watchlistSchema = new Schema('watchlist', {
    idAttribute: '_id'
});



export default {
    PLAYLIST: playlistSchema,
    PLAYLIST_ARRAY: arrayOf(playlistSchema),
    WATCHLIST: watchlistSchema,
    WATCHLIST_ARRAY: arrayOf(watchlistSchema)
};