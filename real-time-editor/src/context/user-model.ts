export declare interface UserInfo {
    readonly username: string | null;
    readonly email: string | null;
    readonly photoURL: string | null;
    readonly uid: string;
}

export declare interface UserMetadata {
    /** Time the user was created. */
    readonly creationTime?: string;
    /** Time the user last signed in. */
    readonly lastSignInTime?: string;
}

export declare interface User extends UserInfo {
    /**
     * Whether the email has been verified with {@link sendEmailVerification} and
     * {@link applyActionCode}.
     */
    readonly emailVerified: boolean;
    /**
     * Whether the user is authenticated using the {@link ProviderId}.ANONYMOUS provider.
     */
    readonly isAnonymous: boolean;
    /**
     * Additional metadata around user creation and sign-in times.
     */
    readonly metadata: UserMetadata;
    /**
     * Additional per provider such as displayName and profile information.
     */
    readonly providerData: UserInfo[];
    /**
     * Refresh token used to reauthenticate the user. Avoid using this directly and prefer
     * {@link User.getIdToken} to refresh the ID token instead.
     */
    readonly refreshToken: string;
    /**
     * The user's tenant ID.
     *
     * @remarks
     * This is a read-only property, which indicates the tenant ID
     * used to sign in the user. This is null if the user is signed in from the parent
     * project.
     *
     * @example
     * ```javascript
     * // Set the tenant ID on Auth instance.
     * auth.tenantId = 'TENANT_PROJECT_ID';
     *
     * // All future sign-in request now include tenant ID.
     * const result = await signInWithEmailAndPassword(auth, email, password);
     * // result.user.tenantId should be 'TENANT_PROJECT_ID'.
     * ```
     */
    readonly tenantId: string | null;
    /**
     * Deletes and signs out the user.
     *
     * @remarks
     * Important: this is a security-sensitive operation that requires the user to have recently
     * signed in. If this requirement isn't met, ask the user to authenticate again and then call
     * one of the reauthentication methods like {@link reauthenticateWithCredential}.
     *
     * This method is not supported on any {@link User} signed in by {@link Auth} instances
     * created with a {@link @firebase/app#FirebaseServerApp}.
     */
    delete(): Promise<void>;
    /**
     * Returns a JSON Web Token (JWT) used to identify the user to a Firebase service.
     *
     * @remarks
     * Returns the current token if it has not expired or if it will not expire in the next five
     * minutes. Otherwise, this will refresh the token and return a new one.
     *
     * @param forceRefresh - Force refresh regardless of token expiration.
     */
    // getIdToken(forceRefresh?: boolean): Promise<string>;
    /**
     * Returns a deserialized JSON Web Token (JWT) used to identify the user to a Firebase service.
     *
     * @remarks
     * Returns the current token if it has not expired or if it will not expire in the next five
     * minutes. Otherwise, this will refresh the token and return a new one.
     *
     * @param forceRefresh - Force refresh regardless of token expiration.
     */
    // getIdTokenResult(forceRefresh?: boolean): Promise<IdTokenResult>;
    /**
     * Refreshes the user, if signed in.
     */
    reload(): Promise<void>;
    /**
     * Returns a JSON-serializable representation of this object.
     *
     * @returns A JSON-serializable representation of this object.
     */
    toJSON(): object;
}