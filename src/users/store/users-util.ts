import { RootState } from 'src/store';
import { UlmaxCardLevel } from '@ulmax/frontend';

/**
 * gets the authorized user trackID
 */
export const AuthorizedUserCard = (state: RootState) => {
  const authTrackId = state.authReducer.authorized?.data.trackId;
  return Object.values(state.userReducer.members).find(
    ({ card }) =>
      card.level === UlmaxCardLevel.Admin && card.trackId === authTrackId,
  );
};
