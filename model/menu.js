import { mockIp, mockReqId } from '../utils/mock';

export function genMenuData() {
  return {
    data: {
      foodIds: ['1'],
      amounts: [1],
    },
    code: 'Success',
    msg: null,
    requestId: mockReqId(),
    clientIp: mockIp(),
    rt: 269,
    success: true,
  };
}