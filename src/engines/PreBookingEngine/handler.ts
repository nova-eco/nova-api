export interface IHandler<Ctx> {
  /**
   * Perform a single step using and modifying the shared context.
   * Throw to abort the chain with an error (preserve original messages).
   */
  handle(ctx: Ctx): Promise<void>;
}
