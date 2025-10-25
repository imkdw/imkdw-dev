import { getOAuthUrl, getCurrentMember } from '@imkdw-dev/api-client';
import { OAuthProvider } from '@imkdw-dev/consts';

export function useOAuth() {
  const handleSocialLogin = async (provider: OAuthProvider) => {
    const { url } = await getOAuthUrl(provider, window.location.href);
    window.location.href = url;
  };

  return {
    handleSocialLogin,
    getCurrentMember,
  };
}
