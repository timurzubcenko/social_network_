export default function authHeader() {
    const localAdmin = localStorage.getItem('userData');
    if (localAdmin) {
        const admin = JSON.parse(localAdmin)
        if (admin && admin.token) {
            return { Authorization: 'Bearer ' + admin.token };
        }
    }
    return {};
}