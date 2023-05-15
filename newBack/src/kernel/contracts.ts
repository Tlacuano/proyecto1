//tipado de la firma de los contratos

export interface UseCase<TInput,TOutput>{
    execute(input: TInput): Promise<TOutput>;
}