import { OAuthProvider } from '@imkdw-dev/consts';
import { IResponseGetOAuthUrlDto } from '@imkdw-dev/types';
import {} from '@imkdw-dev/api-client';

export function useAuth() {
  const handleSocialLogin = async (provider: OAuthProvider) => {
    const { url } = await getOAuthUrl<IResponseGetOAuthUrlDto>(provider);
    window.location.href = url;
  };

  return { handleSocialLogin };
}
