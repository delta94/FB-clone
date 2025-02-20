export const CometSSRClientRenderError = 'CometSSRClientRenderError';

export const CometSSRClientRender = (message) => {
  throw new ClientRenderSentinel(message);
};

export class ClientRenderSentinel {
  constructor(message) {
    this.message = CometSSRClientRenderError + ': ' + message;
    this.name = 'CometSSRClientRenderError';
  }
}
