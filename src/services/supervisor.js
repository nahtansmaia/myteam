import { http } from './database'

export default {

    ListSupervisors: () => {
        return http.get('supervisor');
    },

    getSupervisorWithName: (name) => {
        return http.get('supervisor/' + name);
    },

    getSupervisorWithId: (id) => {
        return http.get('supervisor/' + id);
    },

    saveSupervisor: (Supervisor) => {
        return http.post('supervisor', Supervisor);
    },

    updateSupervisor: (Supervisor) => {
        return http.put('supervisor', Supervisor);
    },

    deleteSupervisor: (Supervisor) => {
        return http.delete('supervisor', { data: Supervisor });
    },
}