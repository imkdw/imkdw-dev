import { buildEndpoint } from '@imkdw-dev/consts';
import { withErrorHandling } from '../lib/error-handler';
import { getApiClient } from '../instance';
import { ITagDto } from '@imkdw-dev/types';

export const getTagList = withErrorHandling(async () => {
  return getApiClient().get<ITagDto[]>(buildEndpoint('GET_TAG_LIST'));
});
