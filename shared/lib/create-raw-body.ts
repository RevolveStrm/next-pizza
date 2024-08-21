export const createRawBody = async (
    stream: ReadableStream<Uint8Array>,
): Promise<Buffer> => {
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];

    let done = false;

    while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        if (value) {
            chunks.push(value);
        }
    }

    const rawBody = Buffer.concat(chunks);

    return rawBody;
};
