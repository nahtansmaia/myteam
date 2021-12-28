import { http } from './database'

export default {

    ListAudits: () => {
        return http.get('audit');
    },

    getAuditWithAnalystAndDateBetween: (analystId, initialDate, finalDate) => {
        return http.get('audit/' + analystId + '/' + initialDate + '/' + finalDate);
    },

    getAuditWithId: (id) => {
        return http.get('audit/' + id);
    },

    saveAudit: (Audit) => {
        return http.post('audit', Audit);
    },

    updateAudit: (Audit) => {
        return http.put('audit', Audit);
    },

    deleteAudit: (Audit) => {
        return http.delete('audit', { data: Audit });
    },
}