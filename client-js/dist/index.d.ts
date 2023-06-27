type CreateParams = {
    input: string;
    model: 'gpt-3.5-turbo' | 'gpt-4';
    collectionId: string;
};
type AskParams = {
    question: string;
    collectionId: string;
    model?: 'gpt-3.5-turbo' | 'gpt-4';
    onUpdate?: (output: string) => void;
    onComplete?: (output: string) => void;
};
export declare const createClient: (apiKey: string) => {
    ask: ({ question, collectionId, model, onUpdate, onComplete, }: AskParams) => Promise<void>;
    fragments: {
        create: (params: CreateParams) => Promise<any>;
        read: (uuid: string) => Promise<any>;
        polling: (fragmentId: string, onUpdate?: ((output: string) => void) | undefined, onComplete?: ((output: string) => void) | undefined) => Promise<void>;
    };
};
export {};
