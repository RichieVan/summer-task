import { TicketFormValues } from '../types/TicketForm';

class TicketService {
  public static async reserveTicket(ticket: TicketFormValues): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      if (process.env.REQUEST_ADDRESS) {
        const result = fetch(process.env.REQUEST_ADDRESS, {
          body: JSON.stringify(ticket),
          method: 'POST',
        });
        resolve(result);
      } else {
        reject(new Error('Не указан адрес запроса'));
      }
    });
  }
}

export default TicketService;
