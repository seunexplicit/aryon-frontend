type QueryEffectProps = {
    children: React.ReactElement | React.ReactElement[];
    isLoading?: boolean;
    error?: Record<string, string>;
}

export const QueryEffect = ({ children, isLoading, error }: QueryEffectProps) => {
    return (
        <>
            {isLoading && <p className="italic text-primary/90">Loading...</p>}
            {error && !isLoading && (
                <p className="italic text-xl text-destructive/90">
                    Error: {error?.message}
                </p>
            )}
            {!isLoading && !error && children}
        </>
    )
}