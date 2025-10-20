export type SecurityRuleContext = {
    path: string;
    operation: 'get' | 'list' | 'create' | 'update' | 'delete';
    requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
    public readonly context: SecurityRuleContext;

    constructor(context: SecurityRuleContext) {
        const jsonContext = JSON.stringify(context, null, 2);
        const message = `FirestoreError: Missing or insufficient permissions: The following request was denied by Firestore Security Rules:\n${jsonContext}`;
        super(message);
        this.name = 'FirestorePermissionError';
        this.context = context;

        // This is necessary for custom errors to work correctly in TypeScript.
        Object.setPrototypeOf(this, FirestorePermissionError.prototype);
    }
}
