const EventListFilter = {

    events(filters, events, loggedUser) {
        const { tags, room, going, tracks, levels, favorites, eventtypes, trackgroups, recorded } = filters;
        const {schedule_summit_events, favorite_summit_events} = loggedUser || {};

        const unmatchedEvents = events.filter(event => {
            return (
                trackgroups.length && !this.matchTrackGroups(event, trackgroups) ||
                eventtypes.length  && !this.matchEventTypes(event, eventtypes) ||
                tracks.length      && !this.matchTracks(event, tracks) ||
                levels.length      && !this.matchLevels(event, levels) ||
                tags.length        && !this.matchTags(event, tags) ||
                room               && !this.matchRoom(event, room) ||
                going              && !this.matchGoing(event, going, schedule_summit_events) ||
                recorded           && !this.matchRecorded(event, recorded) ||
                favorites          && !this.matchFavorites(event, favorites, favorite_summit_events)
            )
        });

        return unmatchedEvents.map(event => event.id)
    },

    matchTrackGroups(event, filterValue) {
        if ( !event.hasOwnProperty('track')) return false;
        return filterValue.some(groupId => event.track.track_groups.includes(groupId));
    },

    matchEventTypes(event, filterValue) {
        return filterValue.includes(event.type.id);
    },

    matchTracks(event, filterValue) {
        if ( !event.hasOwnProperty('track')) return false;
        return filterValue.includes(event.track.id);
    },

    matchLevels(event, filterValue) {
        if ( !event.hasOwnProperty('level')) return false;
        return filterValue.includes(event.level.toLowerCase());
    },

    matchTags(event, filterValue) {
        return event.tags.some(tag => filterValue.includes(tag.id));
    },

    matchRoom(event, filterValue) {
        if ( !event.hasOwnProperty('location')) return false;
        return (filterValue === event.location.id);
    },

    matchGoing(event, filterValue, eventsGoing) {
        return eventsGoing ? eventsGoing.find(ev => ev.id === event.id) : false;
    },

    matchFavorites(event, filterValue, eventsFav) {
        return eventsFav ? eventsFav.find(ev => ev.id === event.id) : false;
    },

    matchRecorded(event, filterValue) {
        return event.to_record === true
    },
}

export default EventListFilter
