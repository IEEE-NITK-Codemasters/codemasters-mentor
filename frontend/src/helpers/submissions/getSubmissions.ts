export async function getSubmissions(userId: number, questionId: number) {

    const queryParams = new URLSearchParams({
        userId: userId.toString(),
        questionId: questionId.toString()
    })

    const url = `${import.meta.env.VITE_BACKEND_URL}/submissions?${queryParams.toString()}`
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}