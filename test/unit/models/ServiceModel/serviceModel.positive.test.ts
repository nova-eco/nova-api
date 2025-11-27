import { Database } from '../../../../src/models/Database';
import { ServiceModel } from '../../../../src/models/ServiceModel';

describe('ServiceModel - positive', () => {
  beforeEach(() => jest.restoreAllMocks());

  test('getServiceLead returns lead staff rows', async () => {
    const serviceModel = new ServiceModel();
    const rows = [{ staffId: 's1' }];
    jest.spyOn(Database, 'query').mockResolvedValue(rows);
    const res = await serviceModel.getServiceLead('svc1');
    expect(res).toEqual(rows);
  });
});
