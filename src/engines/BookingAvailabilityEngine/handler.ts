export interface IHandler<TContext = any> {
  handle(ctx: TContext): Promise<void>;
}

export default IHandler;
