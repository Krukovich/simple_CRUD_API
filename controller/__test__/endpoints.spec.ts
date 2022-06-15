import { endpoints } from '../../router/endpoints';
import { router } from '../../router/router';
import { ERROR_MESSAGE, STATUS_CODE } from '../../constants';

const mockResponse = () => {
  const res: any = {};
  res.send = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.writeHead = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Check correct message if endpoint is invalid', () => {
  it('should return status 404 and correct message when endpoint is invalid', async () => {
    const mockRequest = () => {
      const req: any = {};
      req.body = jest.fn().mockReturnValue(req);
      req.params = jest.fn().mockReturnValue(req);
      req.url = `http://localhost/api/usersssssss/`;
      return req;
    };
    const mockResultMessage = JSON.stringify({ message: ERROR_MESSAGE.ENDPOINT_NOT_FOUND });
    const req = mockRequest();
    const res = mockResponse();

    await router(req, res);

    expect(res.writeHead).toHaveBeenCalledWith(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'application/json' });
    expect(res.end).toHaveBeenCalledWith(mockResultMessage);
  });
});

describe('Check endpoints methods GET ', () => {
  it('should return status 400 and return correct message when user ID is invalid', async () => {
    const mockWrongUserId: string = '123123';

    const mockRequest = () => {
      const req: any = {};
      req.body = jest.fn().mockReturnValue(req);
      req.params = jest.fn().mockReturnValue(req);
      req.url = `http://localhost/api/users/${mockWrongUserId}`;
      return req;
    };
    const mockResultMessage = JSON.stringify({ message: ERROR_MESSAGE.UUID_IS_INVALID });
    const req = mockRequest();
    const res = mockResponse();

    await endpoints.getUsersById(req, res);

    expect(res.writeHead).toHaveBeenCalledWith(STATUS_CODE.BAD_REQUEST, { 'Content-Type': 'application/json' });
    expect(res.end).toHaveBeenCalledWith(mockResultMessage);
  });

  it('should return status 404 and return correct message when user ID is valid but user not found', async () => {
    const mockRightUserId: string = '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed';

    const mockRequest = () => {
      const req: any = {};
      req.body = jest.fn().mockReturnValue(req);
      req.params = jest.fn().mockReturnValue(req);
      req.url = `http://localhost/api/users/${mockRightUserId}`;
      return req;
    };

    const mockResultMessage = JSON.stringify({ message: ERROR_MESSAGE.USER_NOT_FOUND });
    const req = mockRequest();
    const res = mockResponse();

    await endpoints.getUsersById(req, res);

    expect(res.writeHead).toHaveBeenCalledWith(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'application/json' });
    expect(res.end).toHaveBeenCalledWith(mockResultMessage);
  });
});
