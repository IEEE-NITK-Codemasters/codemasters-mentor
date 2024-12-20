
export async function getRunOutput(userId: number, questionId: number) {
    
    let url = import.meta.env.VITE_BACKEND_URL + '/question/run';
    const queryParams = new URLSearchParams({questionId: questionId.toString(), userId: userId.toString()})
    url += '?' + queryParams.toString()

    return fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    },)
}