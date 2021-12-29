import { http } from './database'

export default {

    ListAnalysts: () => {
        return http.get('analyst');
    },

    getAnalystWithName: (name) => {
        return http.get('analyst/' + name);
    },

    getAnalystWithId: (id) => {
        return http.get('analyst/' + id);
    },

    getAnalystWithTeam: (teamId) => {
        return http.get('analyst/team/' + teamId);
    },

    saveAnalyst: (Analyst) => {
        return http.post('analyst', Analyst);
    },

    updateAnalyst: (Analyst) => {
        return http.put('analyst', Analyst);
    },

    deleteAnalyst: (Analyst) => {
        return http.delete('analyst', { data: Analyst });
    },
}