import { Worker } from 'node:worker_threads';
import { readImportInput } from './citation-model.js';
export async function parseCitationInput(value, signal) {
    const input = readImportInput(value);
    signal?.throwIfAborted();
    const worker = new Worker(new URL('./citation-worker.js', import.meta.url), { workerData: input, execArgv: [], env: {}, resourceLimits: { maxOldGenerationSizeMb: 64 } });
    try {
        return await new Promise((resolve, reject) => {
            const timer = setTimeout(() => finish(new Error('本地解析超过 5 秒，请拆分输入后重试。')), 5000);
            const cancel = () => finish(signal?.reason instanceof Error ? signal.reason : new Error('本地解析已取消。'));
            const finish = (error, rows) => { clearTimeout(timer); signal?.removeEventListener('abort', cancel); if (error)
                reject(error);
            else
                resolve(rows); };
            signal?.addEventListener('abort', cancel, { once: true });
            if (signal?.aborted) {
                cancel();
                return;
            }
            worker.once('message', result => result.ok ? finish(undefined, result.rows) : finish(new Error('BibTeX / DOI 解析失败：' + result.message)));
            worker.once('error', finish);
            worker.once('exit', code => { if (code !== 0)
                finish(new Error('本地解析未完成，请拆分或检查输入。')); });
        });
    }
    finally {
        await worker.terminate();
    }
}
