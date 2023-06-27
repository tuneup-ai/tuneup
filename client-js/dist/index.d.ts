type CreateParams = {
    input: string;
    model: 'gpt-3.5-turbo' | 'gpt-4';
    collectionId: string;
};
type AskParams = {
    question: string;
    onReceiveContent: (content: string) => void;
    onCompleted?: (content: string) => void;
    collectionId: string;
    model?: 'gpt-3.5-turbo' | 'gpt-4';
};
export declare const createClient: (apiKey: string) => {
    ask: ({ question, onReceiveContent, onCompleted, collectionId, model }: AskParams) => Promise<void>;
    fragments: {
        create: (params: CreateParams) => Promise<any>;
        read: (uuid: string) => Promise<any>;
        polling: (fragmentId: string, onReceiveContent: (content: string) => void, onCompleted?: ((content: string) => void) | undefined) => Promise<void>;
    };
};
export {};
