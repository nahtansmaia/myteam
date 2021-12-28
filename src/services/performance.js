import { http } from './database'

export default {

    ListPerformances: () => {
        return http.get('performance');
    },

    getPerformanceWithSupervisor: (supervisorId) => {
        return http.get('performance/' + supervisorId);
    },

    getPerformanceWithId: (id) => {
        return http.get('performance/' + id);
    },

    savePerformance: (Performance) => {
        return http.post('performance', Performance);
    },

    updatePerformance: (Performance) => {
        return http.put('performance', Performance);
    },

    deletePerformance: (Performance) => {
        return http.delete('performance', { data: Performance });
    },
}