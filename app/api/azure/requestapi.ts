/**
 *
 * @export
 * @interface AzureCompletionResponse
 */
export interface AzureCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<AzureCompletionResponseChoicesInner>;
  usage?: AzureCompletionResponseUsage;
}

export interface AzureCompletionResponseChoicesInner {
  index?: number;
  text?: string;
  finish_reason?: string;
}

export interface AzureCompletionResponseUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export type ChatReponse = AzureCompletionResponse;
