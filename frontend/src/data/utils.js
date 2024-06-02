
export async function handle_response(response){
    if (!response.ok){
        throw new Error(`${response.status}`);
    }
    const data = await response.json();

    return data
}

export async function handle_get_request(url){
    const response = await fetch(url)
    const data = await handle_response(response)
    return data.data
}

export async function handle_post_request(url, body){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    return response;
}

export async function handle_delete_request(url){
    const response = await fetch(url, {
        method: 'DELETE'
    })

    return response;
}