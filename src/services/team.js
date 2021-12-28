import { http } from './database'

export default {

    ListTeams: () => {
        return http.get('team');
    },

    getTeamWithName: (name) => {
        return http.get('team/' + name);
    },

    getTeamWithId: (id) => {
        return http.get('team/' + id);
    },

    saveTeam: (Team) => {
        return http.post('team', Team);
    },

    updateTeam: (Team) => {
        return http.put('team', Team);
    },

    deleteTeam: (Team) => {
        return http.delete('team', { data: Team });
    },
}