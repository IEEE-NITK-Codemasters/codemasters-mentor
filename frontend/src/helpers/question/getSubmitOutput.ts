export async function getSubmitOutput(userId: number, questionId: number, submissionId: number) {

    const queryParams = new URLSearchParams({
        userId: userId.toString(),
        questionId: questionId.toString(),
        submissionId: submissionId.toString(),
    });

    let url = `${import.meta.env.VITE_BACKEND_URL}/question/submit?${queryParams.toString()}`;
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
}