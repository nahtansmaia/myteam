import { http } from './database'

export default {

    ListFaults: () => {
        return http.get('fault');
    },

    getFaultWithName: (name) => {
        return http.get('fault/' + name);
    },

    getFaultWithId: (id) => {
        return http.get('fault/' + id);
    },

    saveFault: (Fault) => {
        return http.post('fault', Fault);
    },

    updateFault: (Fault) => {
        return http.put('fault', Fault);
    },

    deleteFault: (Fault) => {
        return http.delete('fault', { data: Fault });
    },
}