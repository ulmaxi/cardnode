import {
  CardMemberRequest,
  UlmaxCard,
  UlmaxFullCard,
} from '@ulmax/frontend';
import Fetch from 'src/fetch';
import { Dispatcher, dispatchError, RootState, ThunkedAction } from 'src/store';
import {
  AwaitMap,
  awaitTo,
  LocalStatusAction,
  localStatusAction,
} from 'src/util';
import { userActions, UpsertBiodataError } from './users-slice';
import { AuthorizedUserCard } from './users-util';

const {
  batchUpsertMember,
  error,
  loading,
  removeMember,
  upsertMember,
} = userActions;

/**
 * request to get all card members
 */
export function retriveCardMembers({
  onError,
  onSuccess,
}: LocalStatusAction<UlmaxFullCard[]>): ThunkedAction {
  return async function(dispatch, getState) {
    dispatch(loading());
    const response = await awaitTo(
      Fetch.GET<UlmaxFullCard[]>(
        `cardnode/cards/${currentCardNo(getState())}/members`,
      ),
    );
    localStatusAction(response, {
      onSuccess: members => dispatch(batchUpsertMember(members)),
      onError: err => dispatchError(dispatch, error)(err),
    });
    localStatusAction(response, {
      onError,
      onSuccess,
    });
  };
}

/**
 * interface to request for the principal
 * user after signup
 */
export interface RequestCard
  extends LocalStatusAction<UlmaxFullCard, UpsertBiodataError> {
  biodatas: CardMemberRequest;
}

/**
 * request to create an ulmax full card
 * for the first principal user
 */
export function requestPrincipalCard(req: RequestCard): ThunkedAction {
  return async function(dispatch) {
    dispatch(loading());
    const response = await awaitToUpsertError(
       Fetch.POST<UlmaxFullCard, CardMemberRequest>(
        `cardnode/admin/request/primarycard`,
        req.biodatas,
      ),
    );
    memberUpdateActions(dispatch, response)(req);
  };
}

/** select the current user card no */
export const currentCardNo = (state: RootState) =>
  AuthorizedUserCard(state)?.card.cardNo;

/**
 * dispatch actions that alter's the getState
 * and update members informations
 */
const memberUpdateActions = (
  dispatch: Dispatcher<any>,
  response: AwaitMap<UlmaxFullCard, UpsertBiodataError>,
) => ({
  onSuccess,
  onError,
}: LocalStatusAction<UlmaxFullCard, UpsertBiodataError>) => {
  localStatusAction(response, {
    onSuccess: val => dispatch(upsertMember(val as UlmaxFullCard)),
    onError: err => dispatchError(dispatch, error)(err),
  });
  localStatusAction(response, {
    onError,
    onSuccess,
  });
};

/**
 * dispatch actions to create a new member
 */
export function addCardMember(req: RequestCard): ThunkedAction {
  return async function(dispatch, getState) {
    dispatch(loading());
    const response = await awaitToUpsertError(
      Fetch.POST<UlmaxFullCard, CardMemberRequest>(
        `cardnode/cards/${currentCardNo(getState())}/members`,
        req.biodatas,
      ),
    );
    memberUpdateActions(dispatch, response)(req);
  };
}

/**
 * dispatch actions to update them member full card
 */
export function updateCardMember(
  cardId: string,
  req: RequestCard,
): ThunkedAction {
  return async function(dispatch, getState) {
    dispatch(loading());
    const response = await awaitToUpsertError(
       Fetch.PUT<UlmaxFullCard, CardMemberRequest>(
        `cardnode/cards/${currentCardNo(getState())}/members/${cardId}`,
        req.biodatas,
      ),
    );
    memberUpdateActions(dispatch, response)(req);
  };
}

// Deleted the card response
type DeletedCardResponse = { status: boolean; card: UlmaxCard };

// options to delete a card member
type DeleteCardMember = {
  cardIdToRemove: string;
} & LocalStatusAction<DeletedCardResponse>;

/**
 * deletes a particular card member
 */
export function deleteCardMember({
  cardIdToRemove,
  onError,
  onSuccess,
}: DeleteCardMember): ThunkedAction {
  return async function(dispatch, getState) {
    const response = await awaitTo(
      Fetch.Delete<DeletedCardResponse>(
        `/cards/${currentCardNo(getState())}/members/${cardIdToRemove}`,
      ),
    );
    localStatusAction(response, {
      onSuccess: val => dispatch(removeMember(val.card.id)),
      onError: (err) => dispatchError(dispatch, error)(err),
    });
    localStatusAction(response, {
      onError,
      onSuccess,
    });
  };
}

/**
 * maps a promise to an array text
 */
async function awaitToUpsertError(promise: Promise<UlmaxFullCard>): Promise<AwaitMap<UlmaxFullCard, UpsertBiodataError>> {
  try {
    return [await promise, null];
  } catch (error) {
    return [null, error];
  }
}