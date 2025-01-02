export class FieldError extends Error {
  constructor(
    public fieldErrors: Record<string, string[]>,
    public formErrors: [],
  ) {
    super();
  }
}
