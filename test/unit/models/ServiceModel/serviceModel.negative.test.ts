import { ServiceModel } from '../../../../src/models/ServiceModel';
import { Database } from '../../../../src/models/Database';

describe('ServiceModel - negative', () => {
  beforeEach(() => jest.restoreAllMocks());

  test('getServiceLead returns empty array when no lead', async () => {
    const serviceModel = new ServiceModel();
    jest.spyOn(Database, 'query').mockResolvedValue([]);
    const res = await serviceModel.getServiceLead('svc1');
    expect(res).toEqual([]);
  });
});
